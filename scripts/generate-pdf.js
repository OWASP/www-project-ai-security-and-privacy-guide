const fs = require('fs');
const http = require('http');
const path = require('path');
const { JSDOM } = require('jsdom');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const PROJECT_ROOT = path.join(__dirname, '..');
const SITE_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/public');
const STATIC_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/static');
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

// Resolve a URL path (e.g. /images/foo.png or /content/ai_exchange/public/images/foo.png) to a local file path.
// Returns the path to use for serving, or null if not found. Tries public then static.
// Known content mistakes: HTML sometimes references a filename that doesn't exist; we try the correct one.
const IMAGE_ALIASES = {
  'threatscontrols2-readymodel-hosted.png': 'threatscontrols-readymodel-hosted.png',
};

function normalizeImgSrcForParity(src) {
  if (!src) return '';
  const s = src.split('?')[0].trim();
  const m = s.match(/(images\/[^/]+|assets\/images\/[^/]+)$/);
  return m ? m[1] : s.replace(/^https?:\/\/[^/]+/, '').replace(/^\/content\/ai_exchange\/(?:public|static)\//, '').replace(/^\//, '');
}

function assertContentParity(printHtmlPath) {
  const printHtml = fs.readFileSync(printHtmlPath, 'utf-8');
  const printDom = new JSDOM(printHtml);
  const content = printDom.window.document.getElementById('content') || printDom.window.document.body;
  const printImages = new Set();
  content.querySelectorAll('img').forEach((img) => {
    const norm = normalizeImgSrcForParity(img.getAttribute('src') || '');
    if (norm) printImages.add(norm);
  });
  const printTables = content.querySelectorAll('table').length;

  let totalWebsiteImages = 0;
  const allWebsiteImageNorms = new Set();
  let totalWebsiteTables = 0;

  for (const pagePath of PAGES) {
    const fullPath = path.join(SITE_DIR, pagePath);
    if (!fs.existsSync(fullPath)) continue;
    const html = fs.readFileSync(fullPath, 'utf-8');
    const dom = new JSDOM(html);
    const container = dom.window.document.querySelector('.docs-content') || dom.window.document.body;
    container.querySelectorAll('img').forEach((img) => {
      const norm = normalizeImgSrcForParity(img.getAttribute('src') || '');
      if (norm) {
        allWebsiteImageNorms.add(norm);
        totalWebsiteImages++;
      }
    });
    totalWebsiteTables += container.querySelectorAll('table').length;
  }

  const missingInPdf = [...allWebsiteImageNorms].filter((n) => !printImages.has(n));
  if (missingInPdf.length > 0) {
    throw new Error(`Content parity failed: images in website but missing from PDF: ${missingInPdf.join(', ')}`);
  }
  if (printImages.size < totalWebsiteImages) {
    throw new Error(`Content parity failed: website has ${totalWebsiteImages} images, PDF has ${printImages.size}`);
  }
  if (printTables < totalWebsiteTables) {
    throw new Error(`Content parity failed: website has ${totalWebsiteTables} tables, PDF has ${printTables}`);
  }
  console.log(`Content parity OK: ${printImages.size} images, ${printTables} tables`);
}

function resolveImagePath(urlPath) {
  let clean = urlPath.replace(/^\//, '').split('?')[0];
  const base = path.basename(clean);
  if (IMAGE_ALIASES[base]) {
    clean = clean.replace(base, IMAGE_ALIASES[base]);
  }
  if (clean.startsWith('content/ai_exchange/public/')) {
    const p = path.join(PROJECT_ROOT, clean);
    if (fs.existsSync(p)) return p;
    const staticPath = path.join(PROJECT_ROOT, clean.replace('content/ai_exchange/public/', 'content/ai_exchange/static/'));
    if (fs.existsSync(staticPath)) return staticPath;
    return null;
  }
  if (clean.startsWith('content/ai_exchange/static/')) {
    const p = path.join(PROJECT_ROOT, clean);
    if (fs.existsSync(p)) return p;
    const publicPath = path.join(PROJECT_ROOT, clean.replace('content/ai_exchange/static/', 'content/ai_exchange/public/'));
    if (fs.existsSync(publicPath)) return publicPath;
    return null;
  }
  if (clean.startsWith('assets/')) {
    const p = path.join(PROJECT_ROOT, clean);
    return fs.existsSync(p) ? p : null;
  }
  if (clean.startsWith('images/')) {
    const inPublic = path.join(SITE_DIR, clean);
    if (fs.existsSync(inPublic)) return inPublic;
    const inStatic = path.join(STATIC_DIR, clean);
    if (fs.existsSync(inStatic)) return inStatic;
    return null;
  }
  return null;
}

// Simple static file server: strict path resolution, binary-safe for images
function startServer(rootDir) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url;
    const queryIdx = reqPath.indexOf('?');
    if (queryIdx !== -1) reqPath = reqPath.slice(0, queryIdx);
    if (reqPath === '/') reqPath = '/index.html';
    if (reqPath === '/favicon.ico') reqPath = '/content/ai_exchange/static/favicon.ico';

    const relativePath = reqPath.replace(/^\//, '');
    let filePath = path.join(rootDir, relativePath);

    // If this looks like an image path we resolve, use resolveImagePath for consistent lookup
    const normalized = relativePath.replace(/\\/g, '/');
    if (normalized.startsWith('content/ai_exchange/') && /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(normalized)) {
      const resolved = resolveImagePath(reqPath);
      if (resolved) filePath = resolved;
    } else if (normalized.startsWith('assets/') || normalized.startsWith('images/')) {
      const resolved = resolveImagePath('/' + normalized);
      if (resolved) filePath = resolved;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.ico': 'image/x-icon',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    const isText = /^(text\/|application\/json)/.test(contentType);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found', 'utf-8');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(isText ? content.toString('utf-8') : content);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
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

    // Validate front page image exists
    const frontPageImg = frontPage.querySelector('img');
    if (frontPageImg) {
      const src = frontPageImg.getAttribute('src') || '';
      const pathOnly = src.split('?')[0];
      if (pathOnly.startsWith('/assets') || pathOnly.startsWith('/images')) {
        if (!resolveImagePath(pathOnly)) {
          throw new Error(`Missing front page image: ${pathOnly}. Cannot generate PDF.`);
        }
        frontPageImg.setAttribute('src', `http://127.0.0.1:${port}${pathOnly}`);
      }
    }

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
      const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5');
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

      // Resolve and validate image paths before appending; fail if any local image is missing
      const missingImages = [];
      mainContent.querySelectorAll('img').forEach(img => {
        let src = img.getAttribute('src');
        if (!src) return;
        const originalSrc = src.split('?')[0];

        if (originalSrc.startsWith('http')) {
          // Rewrite owaspai.org/images/* to local so we can validate and serve
          if (originalSrc.startsWith('https://owaspai.org/images/') || originalSrc.startsWith('http://owaspai.org/images/')) {
            const localPath = '/images/' + originalSrc.replace(/^https?:\/\/owaspai\.org\/images\//, '');
            const resolved = resolveImagePath(localPath);
            if (!resolved) {
              missingImages.push({ src: originalSrc, context: pagePath });
            } else {
              img.setAttribute('src', `http://127.0.0.1:${port}/content/ai_exchange/public${localPath}`);
            }
          }
        } else if (originalSrc.startsWith('//')) {
          img.setAttribute('src', `https:${originalSrc}`);
        } else if (originalSrc.startsWith('/')) {
          const base = originalSrc.startsWith('/assets') ? '' : '/content/ai_exchange/public';
          const localPathForResolve = base ? base + originalSrc : originalSrc;
          const resolved = resolveImagePath(localPathForResolve);
          if (originalSrc.startsWith('/assets') || originalSrc.startsWith('/images')) {
            if (!resolved) {
              missingImages.push({ src: originalSrc, context: pagePath });
            } else {
              img.setAttribute('src', `http://127.0.0.1:${port}${base || ''}${originalSrc}`);
            }
          } else {
            if (resolved) img.setAttribute('src', `http://127.0.0.1:${port}${localPathForResolve}`);
          }
        }
        img.removeAttribute('loading');
      });

      if (missingImages.length > 0) {
        missingImages.forEach(({ src, context }) => console.error(`Missing image: ${src} (in ${context})`));
        throw new Error(`Missing ${missingImages.length} image(s) on disk. Cannot generate PDF. Fix paths or add files.`);
      }

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

    // Mark wide tables (6+ cols = pdf-wide-table, 8+ cols = pdf-extra-wide)
    contentDiv.querySelectorAll('table').forEach((table) => {
      const colCount = table.querySelector('tr')?.querySelectorAll('th, td').length || 0;
      if (colCount >= 8) table.classList.add('pdf-wide-table', 'pdf-extra-wide');
      else if (colCount >= 6) table.classList.add('pdf-wide-table');
    });

    // Wrap images with captions (figcaption or alt)
    contentDiv.querySelectorAll('img').forEach((img) => {
      const parent = img.parentNode;
      if (!parent || parent === contentDiv) return;
      const fig = parent.closest('figure');
      const existingCaption = fig ? fig.querySelector('figcaption') : null;
      const captionText = existingCaption
        ? existingCaption.textContent.trim()
        : (img.getAttribute('alt') || '').trim();
      if (!captionText) return;
      if (fig && existingCaption) return;
      const wrapper = document.createElement('figure');
      wrapper.className = 'pdf-figure';
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      const cap = document.createElement('figcaption');
      cap.className = 'pdf-figcaption';
      cap.textContent = captionText;
      wrapper.appendChild(cap);
    });

    const style = document.createElement('style');
    style.textContent = `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 15.5px; line-height: 1.65; color: #333; }
    h1, h2, h3, h4, h5 { color: #002843; page-break-after: avoid; margin-top: 1.2em; margin-bottom: 0.6em; }
    p, li { break-inside: avoid-page; margin-bottom: 0.8em; }
    p { margin-top: 0.4em; }
    pre { white-space: pre-wrap; break-inside: avoid; margin: 1em 0; padding: 0.8em; }
    table { width: 100%; border-collapse: collapse; margin: 1.5em 0; break-inside: auto; border: 1px solid #333; }
    table th, table td { border: 1px solid #333; padding: 0.6em 0.8em; text-align: left; }
    tr { break-inside: avoid; }
    table.pdf-wide-table { font-size: 0.82em; table-layout: fixed; }
    table.pdf-wide-table th, table.pdf-wide-table td { word-break: break-word; overflow-wrap: break-word; }
    table.pdf-wide-table tr { break-inside: auto; }
    table.pdf-extra-wide { font-size: 0.72em; }
    table.pdf-extra-wide th, table.pdf-extra-wide td { padding: 0.35em 0.5em; }
    .pdf-figure { margin: 2em auto; break-inside: avoid; }
    .pdf-figure img { width: 100%; max-width: 100%; height: auto; display: block; margin: 0 auto; }
    .pdf-figcaption { font-size: 0.9em; color: #555; text-align: center; margin-top: 0.6em; font-style: italic; }
    img { width: 100%; max-width: 100%; height: auto; display: block; margin: 2em auto; }
    .front-page { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; page-break-after: always; }
    .docs-content { page-break-inside: avoid; }
    blockquote { margin: 1em 0; padding: 0.6em 1em; }
    ul, ol { margin: 0.6em 0; padding-left: 1.5em; }
  `;
    document.head.appendChild(style);

    const finalHtml = fullHtml.serialize();
    const tempHtmlPath = path.join(PROJECT_ROOT, 'scripts', 'print.html');
    fs.writeFileSync(tempHtmlPath, finalHtml);
    console.log(`HTML saved to ${tempHtmlPath}`);

    assertContentParity(tempHtmlPath);

    console.log('Generating PDF with Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'] });
    const page = await browser.newPage();

    const failedUrls = []; // 404 or request failed
    page.on('response', (response) => {
      if (response.status() === 404) {
        failedUrls.push({ url: response.url(), reason: '404 Not Found' });
      }
    });
    page.on('requestfailed', (request) => {
      const failure = request.failure();
      failedUrls.push({ url: request.url(), reason: failure ? failure.errorText : 'request failed' });
    });

    await page.goto(`http://127.0.0.1:${port}/scripts/print.html`, { waitUntil: 'networkidle0' });

    // Wait for all images to load and decode
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          if (img.complete) resolve();
        });
      }));
      return new Promise((r) => setTimeout(r, 300));
    });

    if (failedUrls.length > 0) {
      console.error('Resource(s) failed to load (PDF generation aborted):');
      failedUrls.forEach(({ url, reason }) => console.error(`  ${reason}: ${url}`));
      await browser.close();
      throw new Error(`${failedUrls.length} resource(s) failed to load. Aborting PDF generation.`);
    }

    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => img.src);
    });
    if (brokenImages.length > 0) {
      console.error('Image(s) failed to decode (PDF generation aborted):');
      brokenImages.forEach((src) => console.error(`  ${src}`));
      await browser.close();
      throw new Error(`${brokenImages.length} image(s) failed to load or decode. Aborting PDF generation.`);
    }

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

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.setTitle('OWASP AI Exchange');
    pdfDoc.setAuthor('OWASP AI Exchange');
    pdfDoc.setSubject('AI security and privacy - threats, controls, and best practices');
    pdfDoc.setKeywords(['AI security', 'AI privacy', 'OWASP', 'threats', 'controls', 'machine learning', 'LLM']);
    pdfDoc.setCreator('OWASP AI Exchange');
    pdfDoc.setProducer('OWASP AI Exchange');
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfPath, modifiedPdfBytes);

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
