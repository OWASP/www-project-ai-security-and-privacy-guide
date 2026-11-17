#!/usr/bin/env node
/**
 * Link checker for the built site (content/ai_exchange/public).
 *
 *   node scripts/check-links.js             internal links, anchors and /go/ redirects (offline, ~1s)
 *   node scripts/check-links.js --external  also checks external URLs (slow, run on a schedule)
 *
 * /go/ links are resolved through the redirects in firebase.json, so a /go/ link
 * fails if it has no redirect or if its redirect points to a missing page or anchor.
 */
const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..', 'content/ai_exchange');
const PUBLIC_DIR = path.join(SITE_DIR, 'public');
const ORIGIN = 'https://owaspai.org';
const OWN_HOSTS = new Set(['owaspai.org', 'www.owaspai.org']);
// Pages that are not linked from the site, and build output generated after this check
const SKIP_PAGES = ['/homepage_old/', '/media_old/', '/categories/', '/tags/', '/404.html'];
const SKIP_PATHS = ['/pagefind/'];
// Hosts whose HTTP status says nothing about the link: preconnect-only hosts, and
// MITRE ATLAS, which serves every page (valid or not) with status 404 and renders it in the browser
const SKIP_EXTERNAL_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com', 'atlas.mitre.org']);
// Statuses from sites that block automated requests: reported, but not a failure
const UNVERIFIABLE_STATUSES = new Set([401, 403, 429, 999]);

const redirects = JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'firebase.json'), 'utf8')).hosting.redirects;
const exactRedirects = new Map(
  redirects.filter(r => r.source).map(r => [r.source.replace(/\/$/, '').toLowerCase(), r.destination])
);
const regexRedirects = redirects.filter(r => r.regex).map(r => [new RegExp(r.regex), r.destination]);

function resolveRedirect(urlPath) {
  const exact = exactRedirects.get(urlPath.replace(/\/$/, '').toLowerCase());
  if (exact) return exact;
  for (const [regex, destination] of regexRedirects) {
    const match = urlPath.match(regex);
    if (match) return destination.replace(/:(\d)/g, (_, n) => match[Number(n)]);
  }
  return null;
}

function findFile(urlPath) {
  const rel = decodeURIComponent(urlPath).replace(/^\//, '');
  for (const candidate of [rel, path.join(rel, 'index.html')]) {
    const full = path.join(PUBLIC_DIR, candidate);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return null;
}

const idCache = new Map();
function pageIds(file) {
  if (!idCache.has(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const ids = new Set();
    for (const m of html.matchAll(/\bid=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) ids.add(decodeEntities(m[1] ?? m[2] ?? m[3]));
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&#43;/g, '+').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function listPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPages(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

const problems = [];
const external = new Map();

function checkInternal(url, page, viaGo = null, hops = 0) {
  if (SKIP_PATHS.some(p => url.pathname.startsWith(p))) return;
  const shown = viaGo ? `${viaGo} -> ${url.pathname}${url.hash}` : `${url.pathname}${url.hash}`;
  if (url.pathname.startsWith('/go/') || url.pathname.startsWith('/goto/')) {
    const destination = resolveRedirect(url.pathname);
    if (!destination) return problems.push({ page, link: shown, problem: 'no /go/ redirect' });
    if (hops > 3) return problems.push({ page, link: shown, problem: 'redirect loop' });
    const target = new URL(destination, ORIGIN);
    if (!OWN_HOSTS.has(target.hostname)) return addExternal(target.href, page);
    return checkInternal(target, page, viaGo || url.pathname, hops + 1);
  }
  const file = findFile(url.pathname);
  if (!file) return problems.push({ page, link: shown, problem: 'page does not exist' });
  const anchor = decodeURIComponent(url.hash.slice(1));
  if (anchor && file.endsWith('.html') && !pageIds(file).has(anchor)) {
    problems.push({ page, link: shown, problem: 'anchor does not exist' });
  }
}

function addExternal(href, page) {
  const url = href.split('#')[0];
  if (!external.has(url)) external.set(url, new Set());
  external.get(url).add(page);
}

for (const file of listPages(PUBLIC_DIR)) {
  const page = '/' + path.relative(PUBLIC_DIR, file).split(path.sep).join('/').replace(/index\.html$/, '');
  if (SKIP_PAGES.some(p => page.startsWith(p))) continue;
  const html = fs.readFileSync(file, 'utf8').replace(/<script\b[\s\S]*?<\/script>/g, '');
  for (const m of html.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const raw = decodeEntities((m[1] ?? m[2] ?? m[3]).trim());
    if (!raw || /^(mailto|javascript|data|tel):/i.test(raw)) continue;
    let url;
    try { url = new URL(raw, ORIGIN + page); } catch { problems.push({ page, link: raw, problem: 'invalid URL' }); continue; }
    if (OWN_HOSTS.has(url.hostname)) {
      if (raw.startsWith('#')) {
        const anchor = decodeURIComponent(url.hash.slice(1));
        if (anchor && !pageIds(file).has(anchor)) problems.push({ page, link: raw, problem: 'anchor does not exist' });
      } else {
        checkInternal(url, page);
      }
    } else if (/^https?:$/.test(url.protocol)) {
      addExternal(url.href, page);
    }
  }
}

// Every /go/ rule is shared outside the site too, so check rules that no page links to as well
for (const r of redirects.filter(r => r.source && !/[:*]/.test(r.source))) {
  const target = new URL(r.destination, ORIGIN);
  if (OWN_HOSTS.has(target.hostname)) checkInternal(target, 'firebase.json', r.source);
}

async function checkExternal() {
  const results = { broken: [], unverified: [] };
  const urls = [...external.keys()].filter(u => !SKIP_EXTERNAL_HOSTS.has(new URL(u).hostname));
  const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
  };
  async function check(url) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(20000) });
        res.body?.cancel();
        if (res.ok) return;
        if (attempt === 0 && (res.status === 429 || res.status >= 500)) { await new Promise(r => setTimeout(r, 3000)); continue; }
        const bucket = UNVERIFIABLE_STATUSES.has(res.status) ? results.unverified : results.broken;
        return bucket.push({ url, status: res.status });
      } catch (err) {
        if (attempt === 0) continue;
        const code = err.cause?.code || err.name;
        // A missing domain is a dead link; timeouts and resets may be temporary
        const bucket = code === 'ENOTFOUND' ? results.broken : results.unverified;
        return bucket.push({ url, status: code });
      }
    }
  }
  const queue = [...urls];
  await Promise.all(Array.from({ length: 8 }, async () => { while (queue.length) await check(queue.shift()); }));
  console.log(`External: checked ${urls.length} URLs`);
  return results;
}

function report(title, rows, format) {
  if (!rows.length) return '';
  const lines = [`\n${title} (${rows.length}):`, ...rows.map(format)];
  console.log(lines.join('\n'));
  return lines.join('\n') + '\n';
}

(async () => {
  let summary = report('Broken internal links', problems, p => `  ${p.problem}: ${p.link}  (on ${p.page})`);
  console.log(`Internal: ${problems.length} problem(s)`);
  let failed = problems.length > 0;
  if (process.argv.includes('--external')) {
    const { broken, unverified } = await checkExternal();
    const pagesOf = url => [...external.get(url)].join(', ');
    summary += report('Broken external links', broken, r => `  ${r.status}: ${r.url}  (on ${pagesOf(r.url)})`);
    summary += report('Could not verify (site blocks automated checks, or timed out)', unverified, r => `  ${r.status}: ${r.url}`);
    failed = failed || broken.length > 0;
  }
  if (process.env.GITHUB_STEP_SUMMARY && summary) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '## Link check\n```\n' + summary + '```\n');
  }
  process.exit(failed ? 1 : 0);
})();
