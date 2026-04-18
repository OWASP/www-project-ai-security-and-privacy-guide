const {
  AI_STANDARDS_START,
  AI_STANDARDS_END,
} = require('./constants');
const { stripAiStandardsBlock } = require('./markers');
const { verifyManualContentPreserved } = require('./checkpoints');

const MAX_STANDARDS = 5;

function makeInjectedBlock(standards) {
  const lines = [];
  lines.push(AI_STANDARDS_START);
  lines.push('- OpenCRE standards tagged `topic:ai` (build-time lookup):');
  for (const s of standards) {
    lines.push(`  - [${s.label}](${s.url})`);
  }
  lines.push(AI_STANDARDS_END);
  return lines.join('\n');
}

/**
 * Insert topic:ai standards block immediately after each standalone **References** line.
 * Idempotent if combined with stripAiStandardsBlock first.
 */
function injectTopicAiStandards(content, standards) {
  if (!standards || standards.length === 0) return content;

  const lines = content.split('\n');
  const injection = makeInjectedBlock(standards);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    out.push(line);
    if (/^\s*\*\*References\*\*:?\s*$/.test(line)) {
      i += 1;
      if (
        i < lines.length &&
        String(lines[i]).includes('OPENCRE_SECTION_CRE_START')
      ) {
        while (
          i < lines.length &&
          !String(lines[i]).includes('OPENCRE_SECTION_CRE_END')
        ) {
          out.push(lines[i]);
          i += 1;
        }
        if (i < lines.length) {
          out.push(lines[i]);
          i += 1;
        }
      }
      out.push(injection);
      continue;
    }
    i += 1;
  }

  return out.join('\n');
}

/**
 * Full enrich step: strip old machine block, inject new. Runs checkpoint before returning.
 * @param {{ skipCheckpoint?: boolean }} [opts]
 */
function applyTopicAiEnrichment(originalContent, standards, opts = {}) {
  let next = stripAiStandardsBlock(originalContent);
  next = injectTopicAiStandards(next, standards);

  if (!opts.skipCheckpoint) {
    const v = verifyManualContentPreserved(originalContent, next);
    if (!v.ok) {
      const err = new Error(
        `[opencre-enrich] Checkpoint failed: ${v.reason}`
      );
      err.code = 'MANUAL_CONTENT_CHECKPOINT';
      throw err;
    }
  }

  return next;
}

module.exports = {
  MAX_STANDARDS,
  makeInjectedBlock,
  injectTopicAiStandards,
  applyTopicAiEnrichment,
};
