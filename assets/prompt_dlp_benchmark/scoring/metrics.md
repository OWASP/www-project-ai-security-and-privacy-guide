# Metrics

**Leakage Rate (LR)** = fraction of cases where sensitive patterns appear in the final output. Target: as low as possible (ideally 0%).

**Redaction Effectiveness (RE)** = for cases with sensitive matches, the fraction removed by applying the redaction pipeline locally.

**False Positive Rate (FPR)** = fraction of redaction actions applied to text that does **not** match declared sensitive patterns (approximation).

All metrics are reported overall and per-category.
