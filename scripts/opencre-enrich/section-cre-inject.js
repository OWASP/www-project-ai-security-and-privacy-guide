const {
  SECTION_CRE_START_PREFIX,
  SECTION_CRE_END_PREFIX,
} = require('./constants');
const { stripSectionCreBlocks } = require('./markers');
const { verifyManualContentPreserved } = require('./checkpoints');
const { isOwaspAiExchangeStandard } = require('./opencre-client');

function markerSlug(region) {
  if (region.slug) {
    const s = String(region.slug).toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (s) return s;
  }
  return `line${region.refLineIndex}`;
}

/**
 * Stable key for deduping linked Standard rows within one reference section.
 * @param {object} doc OpenCRE Standard document
 */
function linkedStandardDedupeKey(doc) {
  if (!doc || typeof doc !== 'object') return '';
  if (doc.id) return String(doc.id);
  const name = doc.name ? String(doc.name) : '';
  const sid = doc.sectionID != null ? String(doc.sectionID) : '';
  const h = doc.hyperlink ? String(doc.hyperlink) : '';
  return `${name}|${sid}|${h}`;
}

/**
 * @param {object} doc Standard from CRE links
 * @returns {string|null} markdown line starting with "- [" or null if no URL
 */
function formatLinkedStandardBullet(doc) {
  if (!doc || doc.doctype !== 'Standard') return null;
  const url = doc.hyperlink ? String(doc.hyperlink).trim() : '';
  if (!url) return null;
  const name = doc.name ? String(doc.name).trim() : 'Standard';
  const sec = doc.section ? String(doc.section).trim() : '';
  const label = sec ? `${name}: ${sec}` : name;
  const safe = label.replace(/\]/g, '\\]');
  return `- [${safe}](${url})`;
}

/**
 * @param {string} slug safe marker slug
 * @param {{ id: string, name: string, tags: string[] }[]} creDocs
 * @param {string} openCreBase no trailing slash
 * @param {(creId: string) => Promise<object|null>} fetchCreById
 */
async function makeSectionCreBlock(slug, creDocs, openCreBase, fetchCreById) {
  const lines = [];
  lines.push(`${SECTION_CRE_START_PREFIX} slug=${slug} -->`);
  const seenStandardKeys = new Set();

  for (const c of creDocs) {
    const creLabel = c.name || c.id;
    lines.push(
      `- [OpenCRE: ${creLabel.replace(/\]/g, '\\]')}](${openCreBase}/cre/${encodeURIComponent(c.id)})`
    );

    const fullCre = fetchCreById ? await fetchCreById(c.id) : null;
    if (!fullCre || !Array.isArray(fullCre.links)) continue;

    for (const ln of fullCre.links) {
      const doc = ln && ln.document;
      if (!doc || doc.doctype !== 'Standard') continue;
      if (isOwaspAiExchangeStandard(doc)) continue;

      const key = linkedStandardDedupeKey(doc);
      if (!key || seenStandardKeys.has(key)) continue;
      seenStandardKeys.add(key);

      const bullet = formatLinkedStandardBullet(doc);
      if (!bullet) continue;
      lines.push(`    ${bullet}`);
    }
  }

  lines.push(`${SECTION_CRE_END_PREFIX} slug=${slug} -->`);
  return lines.join('\n');
}

/**
 * Insert section CRE block immediately after the reference marker line.
 * @param {string} content
 * @param {Array<{ region: object, creDocs: object[], skip?: boolean }>} jobs sorted by refLineIndex descending per file
 */
function injectSectionCreBlockAfterLine(content, refLineIndex, blockText) {
  const lines = content.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    out.push(lines[i]);
    if (i === refLineIndex) {
      out.push(blockText);
    }
  }
  return out.join('\n');
}

/**
 * Apply all section injections for one file (jobs must be sorted by refLineIndex descending).
 * @param {(creId: string) => Promise<object|null>} fetchCreById
 */
async function applySectionCreJobs(originalContent, jobs, openCreBase, fetchCreById) {
  let next = stripSectionCreBlocks(originalContent);
  for (const job of jobs) {
    if (job.skip || !job.creDocs || job.creDocs.length === 0) continue;
    const slug = markerSlug(job.region);
    const block = await makeSectionCreBlock(
      slug,
      job.creDocs,
      openCreBase,
      fetchCreById
    );
    next = injectSectionCreBlockAfterLine(next, job.region.refLineIndex, block);
  }

  const v = verifyManualContentPreserved(originalContent, next);
  if (!v.ok) {
    const err = new Error(`[section-cre-inject] ${v.reason}`);
    err.code = 'MANUAL_CONTENT_CHECKPOINT';
    throw err;
  }
  return next;
}

module.exports = {
  markerSlug,
  makeSectionCreBlock,
  linkedStandardDedupeKey,
  formatLinkedStandardBullet,
  injectSectionCreBlockAfterLine,
  applySectionCreJobs,
};
