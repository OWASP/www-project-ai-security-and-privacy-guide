const assert = require('node:assert/strict');
const test = require('node:test');
const { formatExternalByPage } = require('../scripts/link-report');

test('groups broken links under every affected page and sorts the output', () => {
  const pages = new Map([
    ['https://example.org/b', new Set(['/docs/z/', '/docs/a/'])],
    ['https://example.org/a', new Set(['/docs/a/'])]
  ]);
  const output = formatExternalByPage('Broken external links', [
    { url: 'https://example.org/b', status: 404 },
    { url: 'https://example.org/a', status: 502 }
  ], pages);

  assert.match(output, /2 unique URLs/);
  assert.ok(output.indexOf('/docs/a/') < output.indexOf('/docs/z/'));
  assert.ok(output.indexOf('https:\/\/example.org\/a') < output.indexOf('https:\/\/example.org\/b'));
  assert.equal(output.split('https://example.org/b').length - 1, 2);
});

test('labels unverified statuses as informational without hiding their source page', () => {
  const output = formatExternalByPage('Could not verify', [
    { url: 'https://blocked.example/doc', status: 403 }
  ], new Map([['https://blocked.example/doc', new Set(['/docs/privacy/'])]]), true);

  assert.match(output, /informational; does not fail the check/);
  assert.match(output, /\/docs\/privacy\/[\s\S]*403: https:\/\/blocked.example\/doc/);
  assert.equal(formatExternalByPage('Broken', [], new Map()), '');
});
