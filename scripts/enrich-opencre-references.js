const fs = require('fs');
const path = require('path');

const { applyTopicAiEnrichment } = require('./opencre-enrich/injection');
const { getOpenCreBaseUrl } = require('./opencre-enrich/config');
const { openCreFetch } = require('./opencre-enrich/opencre-client');

const PROJECT_ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/content/docs');
const OPENCRE_TOPIC_QUERY = 'topic:ai';
const OPENCRE_HOST_BASE = getOpenCreBaseUrl();
const OPENCRE_SEARCH_URL = `${OPENCRE_HOST_BASE}/rest/v1/text_search?text=${encodeURIComponent(OPENCRE_TOPIC_QUERY)}`;
const { MAX_STANDARDS } = require('./opencre-enrich/injection');

function isDocFile(fileName) {
  return fileName.endsWith('.md');
}

function loadDocPaths() {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter(isDocFile)
    .map((name) => path.join(DOCS_DIR, name));
}

function hasOpenCreReference(content) {
  return /opencre\.org|\bCRE\b/i.test(content);
}

function normalizeSearchResponse(json) {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== 'object') return [];
  // OpenCRE can return numeric-keyed objects.
  return Object.keys(json)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => json[k])
    .filter(Boolean);
}

function toStandardUrl(item) {
  if (item && typeof item.hyperlink === 'string' && item.hyperlink.trim()) {
    return item.hyperlink.trim();
  }
  const name = item?.name ? String(item.name) : '';
  const section = item?.section ? String(item.section) : '';
  if (!name) return '';
  const encodedName = encodeURIComponent(name);
  const encodedSection = encodeURIComponent(section);
  return `${OPENCRE_HOST_BASE}/node/standard/${encodedName}/section/${encodedSection}`;
}

function toStandardLabel(item) {
  const name = item?.name ? String(item.name).trim() : 'OpenCRE Standard';
  const section = item?.section ? String(item.section).trim() : '';
  return section ? `${name}: ${section}` : name;
}

async function fetchTopicAiStandards() {
  const res = await openCreFetch(OPENCRE_SEARCH_URL, {
    headers: {
      'User-Agent': 'OWASP-AI-Exchange-Build-Hook',
    },
  });

  if (!res.ok) {
    // Requirement: if topic:ai is not resolving, do nothing.
    return [];
  }

  let json;
  try {
    json = await res.json();
  } catch {
    return [];
  }

  const items = normalizeSearchResponse(json);
  const standards = items.filter((item) => item && item.doctype === 'Standard');

  const dedup = new Set();
  const selected = [];
  for (const item of standards) {
    const url = toStandardUrl(item);
    const label = toStandardLabel(item);
    if (!url || !label) continue;
    const key = `${label}::${url}`;
    if (dedup.has(key)) continue;
    dedup.add(key);
    selected.push({ label, url });
    if (selected.length >= MAX_STANDARDS) break;
  }

  return selected;
}

async function run() {
  const docs = loadDocPaths();
  if (docs.length === 0) {
    console.log('[opencre-enrich] No docs found, skipping.');
    return;
  }

  const standards = await fetchTopicAiStandards();
  if (standards.length === 0) {
    console.log('[opencre-enrich] topic:ai not resolved; leaving content unchanged.');
  } else {
    console.log(`[opencre-enrich] Retrieved ${standards.length} topic:ai standard(s).`);
  }

  let changed = 0;
  for (const docPath of docs) {
    const original = fs.readFileSync(docPath, 'utf-8');
    if (!hasOpenCreReference(original)) continue;

    let next;
    try {
      next = applyTopicAiEnrichment(original, standards);
    } catch (e) {
      if (e && e.code === 'MANUAL_CONTENT_CHECKPOINT') {
        console.error(`[opencre-enrich] ${docPath}: ${e.message}`);
        process.exit(1);
      }
      throw e;
    }

    if (next !== original) {
      fs.writeFileSync(docPath, next, 'utf-8');
      changed += 1;
    }
  }

  console.log(`[opencre-enrich] Processed ${docs.length} docs, updated ${changed}.`);
}

run().catch((err) => {
  console.error('[opencre-enrich] Failed:', err);
  process.exit(1);
});
