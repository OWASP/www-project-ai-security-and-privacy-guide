const fs = require('fs');
const path = require('path');

const {
  getOpenCreBaseUrl,
  getMatchScoreThreshold,
  isStrictEnrich,
} = require('./opencre-enrich/config');
const {
  discoverAllReferenceRegions,
  splitFrontmatter,
} = require('./opencre-enrich/discovery');
const { stripSectionCreBlocks } = require('./opencre-enrich/markers');
const {
  fetchOwaspAiExchangeCatalog,
  fetchCreById,
  textSearch,
  clearOpenCreCaches,
} = require('./opencre-enrich/opencre-client');
const { matchRegion } = require('./opencre-enrich/match');
const { applySectionCreJobs, markerSlug } = require('./opencre-enrich/section-cre-inject');

const PROJECT_ROOT = path.join(__dirname, '..');
const REPORT_MD = path.join(PROJECT_ROOT, 'tmp', 'opencre-section-enrich-report.md');
const REPORT_JSON = path.join(PROJECT_ROOT, 'tmp', 'opencre-section-enrich-report.json');

function ensureTmp() {
  const dir = path.dirname(REPORT_MD);
  fs.mkdirSync(dir, { recursive: true });
}

function groupByFile(regions) {
  const m = new Map();
  for (const r of regions) {
    if (!m.has(r.filePath)) m.set(r.filePath, []);
    m.get(r.filePath).push(r);
  }
  return m;
}

function hasTopicAiTag(tags) {
  if (!Array.isArray(tags)) return false;
  return tags.some((t) => String(t).includes('topic:ai'));
}

/**
 * Human-readable guide appended to each Markdown report (see tmp/opencre-section-enrich-report.md).
 * @param {number} threshold effective match score minimum (0–1)
 */
function reportUserGuideLines(threshold) {
  return [
    '## How to read this report',
    '',
    'This file is produced by `scripts/enrich-opencre-section-cre.js`. It lists every **references-style** block found under `content/ai_exchange/**/*.md`, tries to map each block to an OpenCRE **Standard** from the `source:owasp_ai_exchange` catalog, and injects CRE links (when confident) between HTML comment markers in the markdown.',
    '',
    'For each injected CRE, the tool calls `GET …/rest/v1/id/<cre-id>` and adds linked **non–AI-Exchange** standards (ETSI, NIST, MITRE, etc.) as nested bullets (four spaces) under that CRE. Duplicates: if two CREs in the **same** reference block point at the same linked standard, only the **first** occurrence is kept.',
    '',
    '### Slug and title',
    '',
    '- **Slug** comes from the latest `Permalink: https://owaspai.org/go/<slug>/` seen *before* that references line (blockquotes count). Several `**References**` blocks in the same appendix can share one slug.',
    '- **Title** is the nearest `####` / `###` / `##` heading *above* the references line. A subsection such as “Culture-aware explanation of output refusal” can therefore appear with the appendix slug `culturesensitivealignment` — that is expected.',
    '',
    '### Matching (when no LLM key)',
    '',
    '1. **Tier A (exact):** catalog `sectionID` equals the slug → high confidence.',
    '2. **Tier B (fuzzy):** token overlap between the section title + deterministic summary and each catalog row (`section`, `sectionID`, etc.).',
    '3. **Tier C (search):** `text_search` on the summary/title, then overlap on OWASP AI Exchange hits.',
    '',
    `The **best** score must be **≥ the match threshold** (this run: **${threshold}**, from \`OPENCRE_SECTION_MATCH_THRESHOLD\`; default 0.35). Otherwise the row is **\`match_mode: none\`** and **no CRE links** are injected for that block (see **Alerts**).`,
    '',
    '### Match modes (`Mode` column)',
    '',
    '- **`deterministic`** — Tier A/B/C produced a match above the threshold (CRE links may still be empty if the Standard has no CRE links; then **no_cre_links** in Alerts).',
    '- **`llm`** — optional OpenAI-compatible step chose a `sectionID` from a candidate list (only when an API key is set).',
    '- **`llm_failed_fallback`** — LLM failed or picked an invalid id; the tool fell back to deterministic matching for that section.',
    '- **`none`** — nothing scored at or above the threshold; **unmatched** in Alerts.',
    '',
    '### Alerts',
    '',
    '- **`unmatched`** — `match_mode` is `none`. Usually the fuzzy/search score was below the threshold, or there is no catalog row whose `sectionID` matches the slug and nothing else scored high enough.',
    '- **`no_cre_links`** — a Standard was chosen but it has no linked CRE documents in the API response.',
    '',
    '### Line numbers',
    '',
    '- **Line** is 1-based in the markdown **body** (after YAML front matter). Re-running the enricher or editing files can shift line numbers; use **file + slug + title** to find the block if the line no longer matches.',
    '',
    '### What you can do for an unmatched block',
    '',
    '- Confirm the OpenCRE catalog actually contains a Standard with `sectionID` equal to your slug (Tier A).',
    '- Optionally lower `OPENCRE_SECTION_MATCH_THRESHOLD` (accepts more false positives).',
    '- Set `OPENCRE_ENRICH_LLM_API_KEY` / `OPENAI_API_KEY` for optional LLM assist (still validated against the catalog).',
    '- Add or fix the correct CRE link manually in the doc if you know the mapping.',
    '',
  ];
}

async function main() {
  ensureTmp();
  clearOpenCreCaches();

  const baseUrl = getOpenCreBaseUrl();
  let catalog;
  try {
    catalog = await fetchOwaspAiExchangeCatalog(baseUrl);
  } catch (e) {
    const msg = e && e.message ? e.message : String(e);
    console.warn(
      `[opencre-section-cre] OpenCRE unavailable after retries; skipping section enrichment and leaving content unchanged. (${msg})`
    );
    return;
  }

  const textSearchFn = (q) => textSearch(baseUrl, q);

  const regions = discoverAllReferenceRegions();
  const reportRows = [];
  const alerts = [];
  let strictFail = false;

  const byFile = groupByFile(regions);

  for (const [filePath, fileRegions] of byFile) {
    const jobs = [];

    for (const region of fileRegions) {
      const result = await matchRegion(region, catalog, textSearchFn);
      const slugKey = markerSlug(region);
      const lineNo = region.refLineIndex + 1;

      const creDocs = result.creDocuments || [];
      const creIds = creDocs.map((c) => c.id);
      const applied =
        result.match_mode !== 'none' && creIds.length > 0;
      const std = applied && result.match ? result.match.standard : null;
      const stdLabel = std
        ? `${std.name || 'OWASP AI Exchange'}: ${std.section || std.sectionID || ''}`
        : '';
      const topicAiNotes = creDocs
        .filter((c) => hasTopicAiTag(c.tags))
        .map((c) => c.id);

      const row = {
        file: region.relPath,
        line: lineNo,
        slug: region.slug,
        markerSlug: slugKey,
        title: region.title,
        match_mode: result.match_mode,
        tier: result.match ? result.match.tier : null,
        score: result.match ? result.match.score : null,
        reason: result.match ? result.match.reason : '',
        standardLabel: stdLabel,
        sectionID: std && std.sectionID ? std.sectionID : null,
        creIds,
        llmRationale: result.llmRationale || '',
        topicAiReview: topicAiNotes,
      };
      reportRows.push(row);

      if (result.match_mode === 'none') {
        alerts.push({ kind: 'unmatched', ...row });
        if (isStrictEnrich()) strictFail = true;
      } else if (creIds.length === 0) {
        alerts.push({ kind: 'no_cre_links', ...row });
      }

      jobs.push({
        region,
        creDocs,
        skip: creIds.length === 0,
      });
    }

    jobs.sort((a, b) => b.region.refLineIndex - a.region.refLineIndex);

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { front, body } = splitFrontmatter(raw);
    const working = stripSectionCreBlocks(body);

    let nextBody;
    try {
      nextBody = await applySectionCreJobs(working, jobs, baseUrl, (creId) =>
        fetchCreById(baseUrl, creId)
      );
    } catch (e) {
      if (e && e.code === 'MANUAL_CONTENT_CHECKPOINT') {
        console.error(`[opencre-section-cre] ${filePath}: ${e.message}`);
        process.exit(1);
      }
      throw e;
    }

    const nextFull = `${front}${nextBody}`;
    if (nextFull !== raw) {
      fs.writeFileSync(filePath, nextFull, 'utf-8');
    }
  }

  const threshold = getMatchScoreThreshold();

  const md = [];
  md.push('# OpenCRE section enrichment report');
  md.push('');
  md.push(...reportUserGuideLines(threshold));
  md.push('---');
  md.push('');
  md.push('## Run summary');
  md.push('');
  md.push(`- OpenCRE base: \`${baseUrl}\``);
  md.push(`- Regions processed: ${reportRows.length}`);
  md.push(`- Catalog standards (source:owasp_ai_exchange): ${catalog.length}`);
  md.push(`- Match score threshold: ${threshold} (\`OPENCRE_SECTION_MATCH_THRESHOLD\`)`);
  md.push('');

  md.push('## Matched sections');
  md.push('');
  md.push(
    '| File | Line | Slug | Mode | Tier | Score | sectionID | CRE ids |'
  );
  md.push(
    '|------|------|------|------|------|-------|-----------|---------|'
  );
  for (const r of reportRows) {
    md.push(
      `| ${r.file} | ${r.line} | ${r.slug || '—'} | ${r.match_mode} | ${r.tier || '—'} | ${r.score != null ? r.score.toFixed(3) : '—'} | ${r.sectionID || '—'} | ${r.creIds.join(', ') || '—'} |`
    );
  }
  md.push('');

  md.push('## Alerts');
  md.push('');
  if (alerts.length === 0) {
    md.push('None.');
  } else {
    for (const a of alerts) {
      md.push(
        `- **${a.kind}**: \`${a.file}\` line ${a.line} (slug ${a.slug || '—'}) title "${a.title}" — mode ${a.match_mode}`
      );
    }
  }
  md.push('');

  md.push('## CREs tagged topic:ai (review)');
  md.push('');
  const topicRows = reportRows.filter((r) => r.topicAiReview.length > 0);
  if (topicRows.length === 0) {
    md.push('None in this run.');
  } else {
    for (const r of topicRows) {
      md.push(
        `- \`${r.file}\` L${r.line}: CRE ${r.topicAiReview.join(', ')}`
      );
    }
  }

  fs.writeFileSync(REPORT_MD, md.join('\n'), 'utf-8');

  const jsonPayload = {
    generatedAt: new Date().toISOString(),
    openCreBaseUrl: baseUrl,
    catalogSize: catalog.length,
    rows: reportRows,
    alerts,
  };
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(jsonPayload, null, 2)}\n`, 'utf-8');

  console.log(
    `[opencre-section-cre] Wrote ${reportRows.length} row(s); alerts ${alerts.length}. Report: tmp/opencre-section-enrich-report.md`
  );

  if (strictFail && alerts.length > 0) {
    console.error(
      '[opencre-section-cre] STRICT_OPENCRE_ENRICH: failing due to unmatched or empty CRE list.'
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[opencre-section-cre] Failed:', err);
  process.exit(1);
});
