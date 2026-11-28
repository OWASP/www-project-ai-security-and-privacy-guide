function formatExternalByPage(title, rows, pagesByUrl, informational = false) {
  if (!rows.length) return '';

  const byPage = new Map();
  for (const { url, status } of rows) {
    for (const page of pagesByUrl.get(url) || []) {
      if (!byPage.has(page)) byPage.set(page, []);
      byPage.get(page).push({ url, status });
    }
  }

  const label = informational ? ' — informational; does not fail the check' : '';
  const lines = [`\n${title} (${rows.length} unique URLs${label}):`];
  for (const page of [...byPage.keys()].sort()) {
    lines.push(`  ${page}`);
    for (const { url, status } of byPage.get(page).sort((a, b) => a.url.localeCompare(b.url))) {
      lines.push(`    ${status}: ${url}`);
    }
  }
  return lines.join('\n') + '\n';
}

module.exports = { formatExternalByPage };
