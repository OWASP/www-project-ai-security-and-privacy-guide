const test = require('node:test');
const assert = require('node:assert');
const { stampPageCountHtml } = require('../../scripts/pdf-page-count');

test('stamps the count and date into the source markup', () => {
  const html = '<strong><span class="page-count" data-pdf-pages>300+</span> pages</strong>';
  assert.strictEqual(
    stampPageCountHtml(html, 412, '2026-11-01'),
    '<strong><span class="page-count" data-pdf-pages="412" data-pdf-date="2026-11-01">412</span> pages</strong>'
  );
});

test('stamps minified markup', () => {
  const html = '<span class=page-count data-pdf-pages>300+</span> pages';
  assert.strictEqual(
    stampPageCountHtml(html, 7, '2026-11-01'),
    '<span class=page-count data-pdf-pages="7" data-pdf-date="2026-11-01">7</span> pages'
  );
});

test('fails when the front page has no count element', () => {
  assert.throws(() => stampPageCountHtml('<p>300+ pages</p>', 412, '2026-11-01'), /data-pdf-pages/);
});

test('fails on an invalid page count', () => {
  const html = '<span data-pdf-pages>300+</span>';
  assert.throws(() => stampPageCountHtml(html, 0, '2026-11-01'), /Invalid PDF page count/);
});
