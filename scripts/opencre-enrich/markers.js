const {
  AI_STANDARDS_START,
  AI_STANDARDS_END,
  SECTION_CRE_START_PREFIX,
  SECTION_CRE_END_PREFIX,
} = require('./constants');

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Remove the legacy topic:ai standards block (single pair).
 */
function stripAiStandardsBlock(content) {
  const re = new RegExp(
    `${escapeRe(AI_STANDARDS_START)}[\\s\\S]*?${escapeRe(AI_STANDARDS_END)}\\n?`,
    'g'
  );
  return content.replace(re, '');
}

/**
 * Remove all OPENCRE_SECTION_CRE_* blocks (supports attributes in comments).
 */
function stripSectionCreBlocks(content) {
  // Do not use \\s* after END: it would swallow blank lines before manual content.
  const full = new RegExp(
    `${escapeRe(SECTION_CRE_START_PREFIX)}[^>]*-->[\\s\\S]*?${escapeRe(SECTION_CRE_END_PREFIX)}[^>]*-->(?:\\r?\\n)?`,
    'g'
  );
  return content.replace(full, '');
}

/**
 * Strip all machine-managed OpenCRE blocks from markdown.
 * Result is "manual" content only — use for preservation checks.
 */
function stripAllMachineBlocks(content) {
  let out = String(content);
  out = stripAiStandardsBlock(out);
  out = stripSectionCreBlocks(out);
  return out;
}

module.exports = {
  stripAiStandardsBlock,
  stripSectionCreBlocks,
  stripAllMachineBlocks,
};
