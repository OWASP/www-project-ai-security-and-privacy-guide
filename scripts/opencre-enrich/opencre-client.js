const { getOpenCreFetchRetryOptions } = require('./config');

const TAG_QUERY = 'source:owasp_ai_exchange';

const DEFAULT_FETCH_INIT = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'OWASP-AI-Exchange-OpenCRE-Enrich',
  },
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Full jitter: wait uniform random in [0, capMs].
 * @param {number} capMs
 */
function backoffDelayMs(attemptIndex, opts) {
  const cap = Math.min(
    opts.maxDelayMs,
    opts.initialDelayMs * opts.multiplier ** Math.max(0, attemptIndex - 1)
  );
  return Math.floor(Math.random() * cap);
}

function isRetryableHttpStatus(status) {
  return [408, 429, 500, 502, 503, 504].includes(status);
}

/**
 * Fetch with retries on network errors and transient HTTP statuses.
 * @param {string} url
 * @param {RequestInit} [init]
 */
async function openCreFetch(url, init = {}) {
  const merged = {
    ...DEFAULT_FETCH_INIT,
    ...init,
    headers: {
      ...DEFAULT_FETCH_INIT.headers,
      ...(init.headers || {}),
    },
  };
  const opts = getOpenCreFetchRetryOptions();
  const { maxAttempts } = opts;

  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const res = await fetch(url, merged);
      if (res.ok) return res;
      if (!isRetryableHttpStatus(res.status) || attempt === maxAttempts) {
        return res;
      }
      await sleep(backoffDelayMs(attempt, opts));
    } catch (err) {
      lastErr = err;
      if (attempt === maxAttempts) throw err;
      await sleep(backoffDelayMs(attempt, opts));
    }
  }
  throw lastErr || new Error('[opencre-client] openCreFetch exhausted retries');
}

function normalizeSearchPayload(json) {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== 'object') return [];
  if (Array.isArray(json.data)) return json.data;
  return Object.keys(json)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => json[k])
    .filter(Boolean);
}

/**
 * @param {string} baseUrl no trailing slash
 */
async function fetchOwaspAiExchangeCatalog(baseUrl) {
  const url = `${baseUrl}/rest/v1/tags?tag=${encodeURIComponent(TAG_QUERY)}`;
  const res = await openCreFetch(url);
  if (!res.ok) {
    throw new Error(
      `[opencre-client] tags request failed ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();
  const items = normalizeSearchPayload(json);
  return items.filter((x) => x && x.doctype === 'Standard');
}

const textSearchCache = new Map();

function isOwaspAiExchangeStandard(item) {
  if (!item || item.doctype !== 'Standard') return false;
  const tags = item.tags;
  if (Array.isArray(tags) && tags.includes('source:owasp_ai_exchange')) {
    return true;
  }
  const h = item.hyperlink ? String(item.hyperlink) : '';
  if (/owaspai\.org\/go\//i.test(h)) return true;
  const name = item.name ? String(item.name) : '';
  return /OWASP AI Exchange/i.test(name);
}

/**
 * @param {string} baseUrl
 * @param {string} query
 */
async function textSearch(baseUrl, query) {
  const key = String(query).slice(0, 400);
  if (textSearchCache.has(key)) return textSearchCache.get(key);

  const url = `${baseUrl}/rest/v1/text_search?text=${encodeURIComponent(key)}`;
  const res = await openCreFetch(url);
  if (!res.ok) {
    textSearchCache.set(key, []);
    return [];
  }
  let json;
  try {
    json = await res.json();
  } catch {
    textSearchCache.set(key, []);
    return [];
  }
  const items = normalizeSearchPayload(json);
  const standards = items.filter(
    (x) => x && x.doctype === 'Standard' && isOwaspAiExchangeStandard(x)
  );
  textSearchCache.set(key, standards);
  return standards;
}

const creByIdCache = new Map();

/**
 * Full CRE node by id, including `links` to Standards and other CREs.
 * Request shape: `GET {baseUrl}/rest/v1/id/123-456` (HTTP/1.1; same path on staging/production).
 *
 * @param {string} baseUrl no trailing slash
 * @param {string} creId e.g. `187-083`
 * @returns {Promise<object|null>} CRE document or null if not found / error
 */
async function fetchCreById(baseUrl, creId) {
  const id = String(creId).trim();
  if (!id) return null;
  if (creByIdCache.has(id)) return creByIdCache.get(id);

  const url = `${baseUrl}/rest/v1/id/${encodeURIComponent(id)}`;
  const res = await openCreFetch(url);
  if (!res.ok) {
    creByIdCache.set(id, null);
    return null;
  }
  let json;
  try {
    json = await res.json();
  } catch {
    creByIdCache.set(id, null);
    return null;
  }
  const data = json && json.data;
  const cre =
    data && data.doctype === 'CRE' ? data : null;
  creByIdCache.set(id, cre);
  return cre;
}

function clearTextSearchCache() {
  textSearchCache.clear();
}

function clearCreByIdCache() {
  creByIdCache.clear();
}

function clearOpenCreCaches() {
  textSearchCache.clear();
  creByIdCache.clear();
}

module.exports = {
  openCreFetch,
  fetchOwaspAiExchangeCatalog,
  textSearch,
  fetchCreById,
  clearTextSearchCache,
  clearCreByIdCache,
  clearOpenCreCaches,
  isOwaspAiExchangeStandard,
};
