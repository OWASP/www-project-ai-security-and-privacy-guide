# OpenCRE per-section enrichment

Build-time helpers used by [`../enrich-opencre-section-cre.js`](../enrich-opencre-section-cre.js) and [`../enrich-opencre-references.js`](../enrich-opencre-references.js).

## User-facing explanation

Each run writes **`tmp/opencre-section-enrich-report.md`**. The report begins with **“How to read this report”**, which explains slugs vs titles, tiers A/B/C, match modes, the score threshold, alerts, and line numbers. Prefer that section as the canonical documentation for editors.

## CRE by id (API)

Full CRE nodes (including `links` to other standards) use:

`GET {OPENCRE_BASE_URL}/rest/v1/id/<cre-id>` — e.g. `https://opencre.org/rest/v1/id/123-456`

Implemented as `fetchCreById(baseUrl, creId)` in [`opencre-client.js`](opencre-client.js). Section injection ([`section-cre-inject.js`](section-cre-inject.js)) uses that response to append linked standards under each CRE line (excluding OWASP AI Exchange); **deduplication is per reference block** by OpenCRE Standard `id`.

## Configuration (environment)

| Variable | Purpose |
|----------|---------|
| `OPENCRE_BASE_URL` / `OPENCRE_HOST` | OpenCRE API host (default `https://opencre.org`) |
| `OPENCRE_SECTION_MATCH_THRESHOLD` | Minimum fuzzy/search score (0–1) to auto-inject CRE links (default `0.35`) |
| `STRICT_OPENCRE_ENRICH` | Set to `1` to exit non-zero if any section is unmatched |
| `OPENCRE_FETCH_MAX_ATTEMPTS` | Max HTTP attempts per OpenCRE call (default `5`) |
| `OPENCRE_FETCH_INITIAL_MS` | Initial backoff cap in ms before jitter (default `400`) |
| `OPENCRE_FETCH_MAX_DELAY_MS` | Max backoff cap in ms (default `12000`) |
| `OPENCRE_FETCH_BACKOFF_MULTIPLIER` | Exponential multiplier (default `2`) |
| `OPENCRE_ENRICH_LLM_API_KEY` / `OPENAI_API_KEY` | Optional LLM assist (OpenAI-compatible chat completions) |
| `OPENCRE_ENRICH_LLM_MODEL` / `OPENCRE_ENRICH_LLM_BASE_URL` | LLM model and API base URL |

## Tests

See [`../../test/opencre-enrich/README.md`](../../test/opencre-enrich/README.md) — `npm test` / `npm run test:opencre-enrich`.
