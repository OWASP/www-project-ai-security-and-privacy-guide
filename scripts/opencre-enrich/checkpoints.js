const { stripAllMachineBlocks } = require('./markers');

/**
 * Checkpoint: machine enrichment must not change any text outside machine-managed markers.
 * Compares "manual" snapshots (all OPENCRE marker blocks stripped) before vs after.
 *
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
function verifyManualContentPreserved(contentBefore, contentAfter) {
  const manualBefore = stripAllMachineBlocks(contentBefore);
  const manualAfter = stripAllMachineBlocks(contentAfter);
  if (manualBefore === manualAfter) {
    return { ok: true };
  }
  // Help debug: first differing line index
  const a = manualBefore.split('\n');
  const b = manualAfter.split('\n');
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i += 1) {
    if (a[i] !== b[i]) {
      return {
        ok: false,
        reason: `Manual content diverges at line ${i + 1}: expected ${JSON.stringify(a[i])}, got ${JSON.stringify(b[i])}`,
      };
    }
  }
  return { ok: false, reason: 'Manual content length or trailing newline mismatch' };
}

module.exports = {
  verifyManualContentPreserved,
};
