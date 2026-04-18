/**
 * Machine-managed regions in AI Exchange markdown (build-time OpenCRE enrichment).
 * Manual edits must stay outside these markers; the enrich script only rewrites inside them.
 */

/** Legacy: topic:ai standards list under **References** */
const AI_STANDARDS_START = '<!-- OPENCRE_AI_STANDARDS_START -->';
const AI_STANDARDS_END = '<!-- OPENCRE_AI_STANDARDS_END -->';

/** Planned: per-slug CRE links (section enrich); keep in sync with future enrich-opencre-section-cre.js */
const SECTION_CRE_START_PREFIX = '<!-- OPENCRE_SECTION_CRE_START';
const SECTION_CRE_END_PREFIX = '<!-- OPENCRE_SECTION_CRE_END';

module.exports = {
  AI_STANDARDS_START,
  AI_STANDARDS_END,
  SECTION_CRE_START_PREFIX,
  SECTION_CRE_END_PREFIX,
};
