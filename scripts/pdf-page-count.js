const fs = require('fs');

// Matches the hero's page count span, quoted or minified: <span class=page-count data-pdf-pages>300+</span>
const COUNT_SPAN = /(<span\b[^>]*\bdata-pdf-pages)\b[^>]*?>[^<]*<\/span>/;

function stampPageCountHtml(html, pages, date) {
  if (!Number.isInteger(pages) || pages < 1) {
    throw new Error(`Invalid PDF page count: ${pages}`);
  }
  if (!COUNT_SPAN.test(html)) {
    throw new Error('Front page has no data-pdf-pages element to update.');
  }
  return html.replace(COUNT_SPAN, `$1="${pages}" data-pdf-date="${date}">${pages}</span>`);
}

// Writes the real page count into the built front page, so it is correct before any script runs
function stampPageCount(indexPath, pages, date = new Date().toISOString().slice(0, 10)) {
  fs.writeFileSync(indexPath, stampPageCountHtml(fs.readFileSync(indexPath, 'utf8'), pages, date));
}

module.exports = { stampPageCount, stampPageCountHtml };
