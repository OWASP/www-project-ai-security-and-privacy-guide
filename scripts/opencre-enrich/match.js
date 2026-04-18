const {
  getMatchScoreThreshold,
  getLlmApiKey,
  getLlmModel,
  getLlmBaseUrl,
} = require('./config');

function normTokens(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function tokenOverlapScore(a, b) {
  const ta = new Set(normTokens(a));
  const tb = new Set(normTokens(b));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const x of ta) if (tb.has(x)) inter += 1;
  return inter / Math.sqrt(ta.size * tb.size);
}

function combinedHaystack(std) {
  const parts = [
    std.sectionID,
    std.section,
    std.name,
    std.hyperlink,
  ].filter(Boolean);
  return parts.join(' ');
}

/** @typedef {{ tier: 'A'|'B'|'C', score: number, standard: object, reason: string }} TierMatch */

/**
 * @param {{ slug: string|null, title: string, summarySnippet: string }} region
 * @param {object[]} catalog
 */
function tierExact(region, catalog) {
  const slug = region.slug ? String(region.slug).toLowerCase().trim() : '';
  if (!slug) return null;
  for (const std of catalog) {
    const sid = std.sectionID ? String(std.sectionID).toLowerCase() : '';
    if (sid && sid === slug) {
      return {
        tier: 'A',
        score: 1,
        standard: std,
        reason: `sectionID matches slug "${slug}"`,
      };
    }
  }
  return null;
}

/**
 * @param {{ slug: string|null, title: string, summarySnippet: string }} region
 * @param {object[]} catalog
 */
function tierFuzzy(region, catalog) {
  const needle = `${region.title}\n${region.summarySnippet}`;
  let best = null;
  for (const std of catalog) {
    const hay = combinedHaystack(std);
    const sc = tokenOverlapScore(needle, hay);
    if (!best || sc > best.score) {
      best = {
        tier: 'B',
        score: sc,
        standard: std,
        reason: `token overlap ${sc.toFixed(3)}`,
      };
    }
  }
  return best;
}

function scoreCandidate(region, std) {
  const needle = `${region.title}\n${region.summarySnippet}`;
  return tokenOverlapScore(needle, combinedHaystack(std));
}

/**
 * @param {{ slug: string|null, title: string, summarySnippet: string }} region
 * @param {object[]} searchHits
 */
function tierSearchHits(region, searchHits) {
  let best = null;
  for (const std of searchHits) {
    const sc = scoreCandidate(region, std);
    if (!best || sc > best.score) {
      best = {
        tier: 'C',
        score: sc,
        standard: std,
        reason: `text_search overlap ${sc.toFixed(3)}`,
      };
    }
  }
  return best;
}

function catalogIndexBySectionId(catalog) {
  const m = new Map();
  for (const std of catalog) {
    if (std.sectionID) m.set(String(std.sectionID).toLowerCase(), std);
  }
  return m;
}

function collectCreDocuments(std) {
  const out = [];
  const links = Array.isArray(std.links) ? std.links : [];
  for (const ln of links) {
    const doc = ln && ln.document;
    if (doc && doc.doctype === 'CRE' && doc.id) {
      out.push({
        id: String(doc.id),
        name: doc.name ? String(doc.name) : doc.id,
        tags: Array.isArray(doc.tags) ? doc.tags : [],
      });
    }
  }
  return out;
}

/**
 * @returns {Promise<{ match_mode: 'llm'|'deterministic'|'llm_failed_fallback'|'none', match: TierMatch|null, creDocuments: object[] }>}
 */
async function matchRegionDeterministic(region, catalog, textSearchFn) {
  const a = tierExact(region, catalog);
  if (a) {
    return {
      match_mode: 'deterministic',
      match: a,
      creDocuments: collectCreDocuments(a.standard),
    };
  }

  const b = tierFuzzy(region, catalog);
  const query = [region.summarySnippet, region.title].filter(Boolean).join(' ').slice(0, 400);
  let searchHits = [];
  if (textSearchFn && query.trim()) {
    searchHits = await textSearchFn(query);
  }
  const c = tierSearchHits(region, searchHits);

  const candidates = [b, c].filter(Boolean);
  let best = null;
  for (const x of candidates) {
    if (!best || x.score > best.score) best = x;
  }

  const threshold = getMatchScoreThreshold();
  if (!best || best.score < threshold) {
    return { match_mode: 'none', match: best, creDocuments: [] };
  }

  return {
    match_mode: 'deterministic',
    match: best,
    creDocuments: collectCreDocuments(best.standard),
  };
}

async function callLlmJson(system, user) {
  const key = getLlmApiKey();
  if (!key) return null;
  const base = getLlmBaseUrl();
  const model = getLlmModel();
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const txt = data?.choices?.[0]?.message?.content;
  if (!txt || typeof txt !== 'string') return null;
  try {
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

function buildLlmCandidates(region, catalog, searchHits, limit = 32) {
  const scored = [];
  for (const std of catalog) {
    scored.push({
      std,
      s: scoreCandidate(region, std),
    });
  }
  scored.sort((x, y) => y.s - x.s);
  const out = scored.slice(0, limit).map((x) => x.std);
  for (const std of searchHits) {
    if (!out.includes(std)) out.push(std);
  }
  return out.slice(0, limit);
}

/**
 * @returns {Promise<{ match_mode: 'llm'|'deterministic'|'llm_failed_fallback'|'none', match: TierMatch|null, creDocuments: object[], llmRationale?: string }>}
 */
async function matchRegion(region, catalog, textSearchFn) {
  const query = [region.summarySnippet, region.title].filter(Boolean).join(' ').slice(0, 400);
  let searchHits = [];
  if (textSearchFn && query.trim()) {
    searchHits = await textSearchFn(query);
  }

  const key = getLlmApiKey();
  if (key) {
    const candidates = buildLlmCandidates(region, catalog, searchHits, 36);
    const allowed = new Set(
      candidates
        .map((s) => (s.sectionID ? String(s.sectionID).toLowerCase() : ''))
        .filter(Boolean)
    );
    const byId = catalogIndexBySectionId(catalog);

    const payload = {
      section_title: region.title,
      summary: region.summarySnippet,
      candidates: candidates.map((s) => ({
        sectionID: s.sectionID,
        section: s.section,
        name: s.name,
      })),
    };

    const system =
      'You pick the single best OWASP AI Exchange OpenCRE standard for the section. ' +
      'Reply with JSON only: {"sectionID":"<id>","confidence":0.0-1.0,"rationale":"<short>"}. ' +
      'sectionID MUST be exactly one of the candidate sectionID values.';
    const user = JSON.stringify(payload);

    let parsed = await callLlmJson(system, user);
    let mode = 'llm';
    if (
      !parsed ||
      typeof parsed.sectionID !== 'string' ||
      typeof parsed.confidence !== 'number'
    ) {
      mode = 'llm_failed_fallback';
    } else {
      const sid = String(parsed.sectionID).toLowerCase();
      if (!allowed.has(sid) || !byId.has(sid)) {
        mode = 'llm_failed_fallback';
      } else {
        const std = byId.get(sid);
        const threshold = getMatchScoreThreshold();
        if (parsed.confidence < threshold) {
          const det = await matchRegionDeterministic(region, catalog, null);
          return {
            ...det,
            match_mode: 'llm_failed_fallback',
            llmRationale: parsed.rationale
              ? String(parsed.rationale)
              : 'low confidence',
          };
        }
        return {
          match_mode: 'llm',
          match: {
            tier: 'B',
            score: parsed.confidence,
            standard: std,
            reason: 'LLM choice',
          },
          creDocuments: collectCreDocuments(std),
          llmRationale: parsed.rationale ? String(parsed.rationale) : '',
        };
      }
    }

    const det = await matchRegionDeterministic(region, catalog, textSearchFn);
    return {
      ...det,
      match_mode: 'llm_failed_fallback',
      llmRationale: parsed && parsed.rationale ? String(parsed.rationale) : '',
    };
  }

  return matchRegionDeterministic(region, catalog, textSearchFn);
}

module.exports = {
  matchRegion,
  matchRegionDeterministic,
  collectCreDocuments,
  tokenOverlapScore,
};
