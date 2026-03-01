const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const SITE_DIR = path.join(__dirname, '../content/ai_exchange/public');
const FIREBASE_JSON = path.join(__dirname, '../content/ai_exchange/firebase.json');

const PAGES = [
  '/docs/ai_security_overview/index.html',
  '/docs/1_general_controls/index.html',
  '/docs/2_threats_through_use/index.html',
  '/docs/3_development_time_threats/index.html',
  '/docs/4_runtime_application_security_threats/index.html',
  '/docs/5_testing/index.html',
  '/docs/6_privacy/index.html',
  '/docs/ai_security_references/index.html',
  '/docs/ai_security_index/index.html'
];

async function main() {
  console.log('Loading firebase.json redirects...');
  const firebaseData = JSON.parse(fs.readFileSync(FIREBASE_JSON, 'utf-8'));
  const redirects = firebaseData.hosting.redirects;

  const getRedirectTarget = (source) => {
    // Exact match or prefix match depending on your needs. For now, try a naive match:
    for (const r of redirects) {
      // Remove trailing / from both for comparison
      const src = r.source.replace(/\/+$/, '').toLowerCase();
      const s = source.replace(/\/+$/, '').toLowerCase();
      if (src === s || src + '/**' === s) {
        return r.destination;
      }
    }
    return null;
  };

  const fullHtml = new JSDOM('<!DOCTYPE html><html><head><meta charset="utf-8"><title>OWASP AI Exchange</title></head><body><div id="content"></div></body></html>');
  const document = fullHtml.window.document;
  const contentDiv = document.getElementById('content');

  // Add front page
  const frontPage = document.createElement('div');
  frontPage.className = 'front-page';
  frontPage.innerHTML = `
    <div style="text-align: center; margin-top: 100px;">
      <img src="file://${path.join(__dirname, '../assets/images/aixlogo.jpg')}" style="max-width: 300px;"/>
      <h1>OWASP AI Security and Privacy Guide</h1>
      <h2>AI Exchange</h2>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
    </div>
    <div style="page-break-after: always;"></div>
  `;
  contentDiv.appendChild(frontPage);

  // TOC placeholder
  const tocDiv = document.createElement('div');
  tocDiv.id = 'table-of-contents';
  tocDiv.innerHTML = `<h1>Table of Contents</h1><ul id="toc-list"></ul><div style="page-break-after: always;"></div>`;
  contentDiv.appendChild(tocDiv);
  const tocList = tocDiv.querySelector('#toc-list');

  let outline = [];

  console.log('Processing pages...');
  for (const pagePath of PAGES) {
    const fullPath = path.join(SITE_DIR, pagePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }
    
    console.log(`Reading ${pagePath}...`);
    const html = fs.readFileSync(fullPath, 'utf-8');
    const dom = new JSDOM(html);
    
    const mainContent = dom.window.document.querySelector('.docs-content');
    if (!mainContent) {
      console.warn(`No .docs-content found in ${pagePath}`);
      continue;
    }

    // Remove breadcrumbs
    const breadcrumbs = mainContent.querySelector('.breadcrumbs');
    if (breadcrumbs) breadcrumbs.remove();
    
    // Remove edit links
    mainContent.querySelectorAll('a[title="Suggest an improvement via GitHub"]').forEach(el => el.remove());
    
    // Process headings for TOC and bookmarks
    const headings = mainContent.querySelectorAll('h1, h2, h3');
    headings.forEach(h => {
      const id = h.id || h.textContent.trim().replace(/\s+/g, '-').toLowerCase();
      h.id = id;
      
      const level = parseInt(h.tagName.substring(1));
      const li = document.createElement('li');
      li.style.marginLeft = `\${(level - 1) * 20}px`;
      const a = document.createElement('a');
      a.href = `#\${id}`;
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      tocList.appendChild(li);
      
      outline.push({ title: a.textContent, id, level });
    });

    contentDiv.appendChild(mainContent);
  }

  // Resolve links
  console.log('Resolving links...');
  const links = document.querySelectorAll('a');
  links.forEach(a => {
    let href = a.getAttribute('href');
    if (!href) return;
    
    if (href.startsWith('/go/') || href.startsWith('/goto/')) {
      const dest = getRedirectTarget(href);
      if (dest) {
        // e.g. /docs/ai_security_overview/#threats-overview
        const hashIdx = dest.indexOf('#');
        if (hashIdx !== -1) {
          a.href = dest.substring(hashIdx);
        } else {
          a.href = '#' + dest.split('/').filter(Boolean).pop(); // fallback
        }
      }
    } else if (href.startsWith('/docs/')) {
       const hashIdx = href.indexOf('#');
       if (hashIdx !== -1) {
         a.href = href.substring(hashIdx);
       }
    }
  });

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; }
    h1, h2, h3, h4, h5 { color: #002843; break-after: avoid; page-break-after: avoid; }
    h1 { font-size: 24px; margin-top: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.5em; }
    h2 { font-size: 20px; margin-top: 1.5em; }
    p, li { break-inside: avoid-page; }
    pre, code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
    pre { padding: 1em; white-space: pre-wrap; break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1em; break-inside: auto; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    tr { break-inside: avoid; page-break-inside: avoid; }
    img { max-width: 100%; height: auto; display: block; margin: 1em auto; }
    a { color: #006284; text-decoration: none; }
    .front-page { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
    .docs-content { margin-bottom: 2em; }
    /* Hide some elements not needed for print */
    .anchor-link { display: none; }
  `;
  document.head.appendChild(style);

  const finalHtml = fullHtml.serialize();
  const htmlPath = path.join(__dirname, 'print.html');
  fs.writeFileSync(htmlPath, finalHtml);
  console.log(`HTML saved to \${htmlPath}`);

  console.log('Generating PDF with Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(SITE_DIR, 'OWASP-AI-Exchange.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width: 100%; font-size: 10px; text-align: center; color: #777;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>`,
    printBackground: true
  });
  
  await browser.close();
  console.log(`PDF saved to \${pdfPath}`);
  console.log('PDF generation complete. Note: Bookmarks require pdf-lib logic which can be added if needed, but TOC provides navigation.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
