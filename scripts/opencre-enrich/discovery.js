const fs = require('fs');
const path = require('path');

const { stripSectionCreBlocks } = require('./markers');

const PROJECT_ROOT = path.join(__dirname, '..', '..');

/**
 * @typedef {Object} ReferenceRegion
 * @property {string} filePath absolute path
 * @property {string} relPath relative to project root
 * @property {number} refLineIndex 0-based line index of the reference marker line
 * @property {string} kind 'bold_references'|'h2_references'|'h2_further'|'further_colon'|'genai'|'other'
 * @property {string|null} slug permalink slug or null
 * @property {string} title best-effort section title
 * @property {string} summarySnippet deterministic excerpt for matching
 */

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(end + 4).replace(/^\n/, '');
}

/**
 * @returns {{ front: string, body: string }}
 */
function splitFrontmatter(text) {
  if (!text.startsWith('---')) return { front: '', body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { front: '', body: text };
  const front = `${text.slice(0, end + 4)}\n`;
  const body = text.slice(end + 4).replace(/^\n/, '');
  return { front, body };
}

function extractSlugFromLine(line) {
  if (!/ermalink/i.test(line)) return null;
  const m = line.match(/owaspai\.org\/go\/([a-z0-9]+)\/?/i);
  return m ? m[1].toLowerCase() : null;
}

function lookaheadSlug(lines, fromIdx, maxLook = 12) {
  for (let j = fromIdx; j < Math.min(lines.length, fromIdx + maxLook); j += 1) {
    const s = extractSlugFromLine(lines[j]);
    if (s) return s;
  }
  return null;
}

function findHeadingLineIndex(lines, startIdx) {
  for (let j = startIdx; j >= 0; j -= 1) {
    const line = lines[j];
    if (/^####\s+/.test(line) || /^###\s+/.test(line) || /^##\s+/.test(line)) {
      return j;
    }
  }
  return -1;
}

function headingTextAt(lines, idx) {
  if (idx < 0 || idx >= lines.length) return '';
  return lines[idx].replace(/^#{2,4}\s+/, '').trim().slice(0, 200);
}

/**
 * Deterministic excerpt: after title/blockquotes until structural **Heading** or **References**,
 * else first paragraph after **Description**.
 */
function buildSummary(lines, titleIdx, refIdx, maxChars = 800) {
  if (refIdx <= 0) return '';
  let start = titleIdx >= 0 ? titleIdx + 1 : 0;
  while (start < refIdx && /^\s*>/.test(lines[start])) start += 1;

  const parts = [];
  let n = 0;
  let i = start;
  while (i < refIdx && n < maxChars) {
    const t = lines[i].trim();
    if (!t) {
      i += 1;
      continue;
    }
    if (/^\*\*References/.test(t)) break;
    if (/^\*\*[A-Za-z][^\n]*\*\*\s*$/.test(t) || /^\*\*Description\*\*/.test(t)) {
      if (/^\*\*Description\*\*/.test(t) && parts.length === 0) {
        i += 1;
        while (i < refIdx && /^\s*>/.test(lines[i])) i += 1;
        continue;
      }
      if (parts.length > 0) break;
      if (/^\*\*Description\*\*/.test(t)) {
        i += 1;
        continue;
      }
      break;
    }
    if (/^\s*>\s/.test(lines[i])) {
      i += 1;
      continue;
    }
    parts.push(t);
    n += t.length + 1;
    i += 1;
  }

  let s = parts.join(' ').slice(0, maxChars);
  if (!s && titleIdx >= 0) {
    const fb = [];
    let m = 0;
    let sawDesc = false;
    let j = titleIdx + 1;
    while (j < refIdx && m < maxChars) {
      const t = lines[j].trim();
      if (/^\*\*Description\*\*/.test(t)) {
        sawDesc = true;
        j += 1;
        continue;
      }
      if (sawDesc && t && !/^\s*>/.test(lines[j])) {
        if (/^\*\*[A-Za-z]/.test(t)) break;
        fb.push(t);
        m += t.length + 1;
      }
      j += 1;
    }
    s = fb.join(' ').slice(0, maxChars);
  }
  return s;
}

function classifyRefLine(stripped, raw) {
  if (stripped.startsWith('**References')) return 'bold_references';
  if (/^##\s+References\b/.test(raw)) return 'h2_references';
  if (/^##\s+Further reading\b/i.test(raw)) return 'h2_further';
  if (stripped === 'Further reading:') return 'further_colon';
  if (stripped === 'GenAI References:') return 'genai';
  return 'other';
}

/**
 * Discover reference-style regions in a single markdown body (no frontmatter).
 * @returns {ReferenceRegion[]}
 */
function discoverRegionsInBody(relPath, filePath, body) {
  const lines = body.split(/\r?\n/);
  const regions = [];
  let slug = null;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const ps = extractSlugFromLine(line);
    if (ps) slug = ps;

    const stripped = line.trim();
    let kind = null;
    if (stripped.startsWith('**References')) kind = classifyRefLine(stripped, line);
    else if (/^##\s+References\b/.test(line)) kind = 'h2_references';
    else if (/^##\s+Further reading\b/i.test(line)) kind = 'h2_further';
    else if (stripped === 'Further reading:') kind = 'further_colon';
    else if (stripped === 'GenAI References:') kind = 'genai';

    if (!kind) continue;

    let effSlug = slug;
    if (effSlug === null || effSlug === '') {
      effSlug = lookaheadSlug(lines, i + 1);
    }

    let titleLineIdx = /^##\s+/.test(lines[i])
      ? i
      : findHeadingLineIndex(lines, i - 1);
    const title =
      titleLineIdx >= 0
        ? headingTextAt(lines, titleLineIdx)
        : stripped.slice(0, 120);
    const summary = buildSummary(lines, titleLineIdx, i);

    regions.push({
      filePath,
      relPath,
      refLineIndex: i,
      kind,
      slug: effSlug,
      title: title || stripped.slice(0, 120),
      summarySnippet: summary || title || stripped,
    });
  }

  return regions;
}

function walkMarkdownFiles(rootDir) {
  const out = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (name.endsWith('.md')) out.push(full);
    }
  }
  walk(rootDir);
  return out.sort();
}

/**
 * All reference regions under content/ai_exchange (site-wide).
 */
function discoverAllReferenceRegions() {
  const base = path.join(PROJECT_ROOT, 'content', 'ai_exchange');
  const files = walkMarkdownFiles(base);
  const all = [];
  for (const filePath of files) {
    const relPath = path.relative(PROJECT_ROOT, filePath);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const body = stripFrontmatter(raw);
    const working = stripSectionCreBlocks(body);
    const regions = discoverRegionsInBody(relPath, filePath, working);
    all.push(...regions);
  }
  return all;
}

module.exports = {
  discoverAllReferenceRegions,
  discoverRegionsInBody,
  stripFrontmatter,
  splitFrontmatter,
  PROJECT_ROOT,
};
