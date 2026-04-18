# OpenCRE enrich — unit tests

Regression and safety tests for [`scripts/opencre-enrich/`](../../scripts/opencre-enrich/) (marker stripping, checkpoints, topic:ai injection, per-section CRE blocks).

- **Run:** `npm test` or `npm run test:opencre-enrich`
- **Fixtures:** [`fixtures/`](fixtures/) — sample markdown for manual vs machine-managed regions
- **Per-section report (for humans):** after `npm run enrich:opencre` or `node scripts/enrich-opencre-section-cre.js`, read **`tmp/opencre-section-enrich-report.md`**. It starts with **How to read this report** (slugs, titles, tiers, thresholds, alerts). Module overview: [`scripts/opencre-enrich/README.md`](../../scripts/opencre-enrich/README.md).

**Invariant under test:** machine enrichment must not change content outside `<!-- OPENCRE_* -->` markers (manual references and prose stay intact).
