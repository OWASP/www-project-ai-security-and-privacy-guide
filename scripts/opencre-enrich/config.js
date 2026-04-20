/**
 * @returns {string} Base URL without trailing slash
 */
function getOpenCreBaseUrl() {
  const raw =
    process.env.OPENCRE_BASE_URL ||
    process.env.OPENCRE_HOST ||
    'https://opencre.org';
  return String(raw).replace(/\/$/, '');
}

function getMatchScoreThreshold() {
  const t = Number(process.env.OPENCRE_SECTION_MATCH_THRESHOLD);
  if (Number.isFinite(t) && t >= 0 && t <= 1) return t;
  return 0.35;
}

function isStrictEnrich() {
  return process.env.STRICT_OPENCRE_ENRICH === '1' || process.env.STRICT_OPENCRE_ENRICH === 'true';
}

function getLlmApiKey() {
  return (
    process.env.OPENCRE_ENRICH_LLM_API_KEY ||
    process.env.OPENAI_API_KEY ||
    ''
  ).trim();
}

function getLlmModel() {
  return process.env.OPENCRE_ENRICH_LLM_MODEL || 'gpt-4o-mini';
}

function getLlmBaseUrl() {
  return (
    process.env.OPENCRE_ENRICH_LLM_BASE_URL || 'https://api.openai.com/v1'
  ).replace(/\/$/, '');
}

/**
 * Retry/backoff for OpenCRE HTTP calls (exponential cap + full jitter on delay).
 * Env: OPENCRE_FETCH_MAX_ATTEMPTS, OPENCRE_FETCH_INITIAL_MS, OPENCRE_FETCH_MAX_DELAY_MS, OPENCRE_FETCH_BACKOFF_MULTIPLIER
 */
function getOpenCreFetchRetryOptions() {
  const maxAttempts = Number.parseInt(
    process.env.OPENCRE_FETCH_MAX_ATTEMPTS || '5',
    10
  );
  const initialDelayMs = Number.parseInt(
    process.env.OPENCRE_FETCH_INITIAL_MS || '400',
    10
  );
  const maxDelayMs = Number.parseInt(
    process.env.OPENCRE_FETCH_MAX_DELAY_MS || '12000',
    10
  );
  const multiplier = Number(process.env.OPENCRE_FETCH_BACKOFF_MULTIPLIER || '2');
  return {
    maxAttempts: Math.min(20, Math.max(1, Number.isFinite(maxAttempts) ? maxAttempts : 5)),
    initialDelayMs: Math.max(50, Number.isFinite(initialDelayMs) ? initialDelayMs : 400),
    maxDelayMs: Math.max(200, Number.isFinite(maxDelayMs) ? maxDelayMs : 12000),
    multiplier:
      Number.isFinite(multiplier) && multiplier >= 1 ? multiplier : 2,
  };
}

module.exports = {
  getOpenCreBaseUrl,
  getMatchScoreThreshold,
  isStrictEnrich,
  getLlmApiKey,
  getLlmModel,
  getLlmBaseUrl,
  getOpenCreFetchRetryOptions,
};
