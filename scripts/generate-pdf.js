const fs = require('fs');
const http = require('http');
const path = require('path');
const { JSDOM } = require('jsdom');
const puppeteer = require('puppeteer');

const PROJECT_ROOT = path.join(__dirname, '..');
const SITE_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/public');
const FIREBASE_JSON = path.join(PROJECT_ROOT, 'content/ai_exchange/firebase.json');

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

// Simple static file server
function startServer(rootDir) {
  const server = http.createServer((req, res) => {
    const filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if(error.code == 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404: File Not Found', 'utf-8');
        } else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}


async function main() {
  const server = await startServer(PROJECT_ROOT);
  const { port } = server.address();
  console.log(`Started temporary server on http://127.0.0.1:${port}`);

  try {
    console.log('Loading firebase.json redirects...');
    const firebaseData = JSON.parse(fs.readFileSync(FIREBASE_JSON, 'utf-8'));
    const redirects = firebaseData.hosting.redirects;

    const getRedirectTarget = (source) => {
      for (const r of redirects) {
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

    const frontPageHtmlPath = path.join(__dirname, 'pdf_frontpage.html');
    let frontPageContent = '';
    if (fs.existsSync(frontPageHtmlPath)) {
        frontPageContent = fs.readFileSync(frontPageHtmlPath, 'utf-8')
            .replace(/\{\{ASSETS_DIR\}\}/g, `/assets`)
            .replace(/\{\{DATE\}\}/g, new Date().toLocaleDateString());
    } else {
        frontPageContent = `...`; // Fallback
    }

    const frontPage = document.createElement('div');
    frontPage.className = 'front-page';
    frontPage.innerHTML = frontPageContent;
    contentDiv.appendChild(frontPage);

    const tocDiv = document.createElement('div');
    tocDiv.id = 'table-of-contents';
    tocDiv.innerHTML = `<h1>Table of Contents</h1><ul id="toc-list"></ul>`;
    contentDiv.appendChild(tocDiv);
    const tocList = tocDiv.querySelector('#toc-list');

    const explicitPageBreak = document.createElement('div');
    explicitPageBreak.style.pageBreakBefore = 'always';
    contentDiv.appendChild(explicitPageBreak);

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
      mainContent.querySelectorAll('a[title="Suggest an improvement via GitHub"]').forEach(el => el.remove());
      const headings = mainContent.querySelectorAll('h1, h2, h3');
      headings.forEach(h => {
        const id = h.id || h.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        h.id = id;
        const level = parseInt(h.tagName.substring(1));
        const li = document.createElement('li');
        li.style.marginLeft = `${(level - 1) * 20}px`;
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = h.textContent.trim();
        li.appendChild(a);
        tocList.appendChild(li);
      });

      // Now, resolve paths for the content we are about to append
      mainContent.querySelectorAll('img').forEach(img => {
        let src = img.getAttribute('src');
        if (!src) return;
        
        // Strip query strings for local file lookups
        const originalSrc = src.split('?')[0];

        if (originalSrc.startsWith('http')) {
            // already absolute
        } else if (originalSrc.startsWith('//')) {
            img.setAttribute('src', `https:${originalSrc}`);
        } else if (originalSrc.startsWith('/')) {
            // Path is relative to the project root
            img.setAttribute('src', `http://127.0.0.1:${port}${originalSrc.startsWith('/assets') ? '' : '/content/ai_exchange/public'}${originalSrc}`);
        }
      });

      contentDiv.appendChild(mainContent);
    }
    
    // Final pass on any remaining links in the assembled doc (like TOC)
    document.querySelectorAll('a').forEach(a => {
        let href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('/go/') || href.startsWith('/goto/')) {
            const dest = getRedirectTarget(href);
            if (dest) {
                const hashIdx = dest.indexOf('#');
                if (hashIdx !== -1) a.href = dest.substring(hashIdx);
                else a.href = '#' + dest.split('/').filter(Boolean).pop();
            }
        } else if (href.startsWith('/docs/')) {
            const hashIdx = href.indexOf('#');
            if (hashIdx !== -1) a.href = href.substring(hashIdx);
        }
    });

    const style = document.createElement('style');
    style.textContent = `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; }
    h1, h2, h3, h4, h5 { color: #002843; page-break-after: avoid; }
    p, li { break-inside: avoid-page; }
    pre { white-space: pre-wrap; break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1em; break-inside: auto; }
    tr { break-inside: avoid; }
    img { max-width: 100%; height: auto; display: block; margin: 1em auto; }
    .front-page { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; page-break-after: always; }
    .docs-content { page-break-inside: avoid; }
  `;
    document.head.appendChild(style);

    const finalHtml = fullHtml.serialize();
    const tempHtmlPath = path.join(PROJECT_ROOT, 'scripts', 'print.html');
    fs.writeFileSync(tempHtmlPath, finalHtml);
    console.log(`HTML saved to ${tempHtmlPath}`);

    console.log('Generating PDF with Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'] });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/scripts/print.html`, { waitUntil: 'networkidle0' });

    const pdfPath = path.join(SITE_DIR, 'OWASP-AI-Exchange.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `<div style="width: 100%; font-size: 10px; text-align: center; color: #777;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
        printBackground: true,
        generateDocumentOutline: true,
        tagged: true
    });
    
    await browser.close();
    console.log(`PDF saved to ${pdfPath}`);
    console.log('PDF generation complete.');

  } finally {
    server.close(() => {
      console.log('Temporary server shut down.');
    });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
