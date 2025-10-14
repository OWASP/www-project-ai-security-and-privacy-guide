# Prompt‑DLP Benchmark & Redaction Recipes

## What this contribution does

**Prompt‑DLP** is an open-source benchmark and mitigation pack designed to help teams **detect**, **measure**, and **reduce** sensitive data leakage in AI systems such as **LLMs**, **RAG pipelines**, and **agent-based architectures**.

It provides:

- **Benchmark Dataset**: Prompts and contexts that simulate real-world leakage attempts (PII, secrets, proprietary code).
- **Scoring Harness**: A CLI tool to measure:
    - **Leakage Rate (LR)** – how often sensitive data leaks
    - **Redaction Effectiveness (RE)** – how well your filters work
    - **False Positive Rate (FPR)** – how often benign content is incorrectly blocked
- **Redaction Recipes**: Ready-to-use YAML configs for regex masking, hashing, and pipeline integration.

The goal: Turn OWASP’s *data leakage guidance* into something **operational, measurable, and CI/CD-friendly**.

---

## Contents

```
prompt_dlp_benchmark/
├─ README.md
├─ dataset/
│  ├─ schema.prompt.json
│  ├─ schema.context.json
│  ├─ prompts.sample.jsonl
│  └─ contexts.sample.jsonl
├─ recipes/
│  ├─ redaction.regex.yaml
│  ├─ redaction.hashing.yaml
│  └─ redaction.pipeline.example.yaml
└─ scoring/
     ├─ dlp_score.py
     ├─ metrics.md
     └─ config.example.yaml
```

---

## When to use it

- **Pre-production**: Validate guardrails and logging redaction before launch.
- **CI/CD**: Catch regressions in leakage controls after model or config changes.
- **Operations**: Run scheduled checks to detect drift or misconfigurations.
- **Audit**: Produce repeatable, evidence-backed leakage test results.

---

## Quick Start

### 1. Install dependencies
```bash
cd scoring
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run the scoring harness
```bash
python dlp_score.py \
    --prompts ../dataset/prompts.sample.jsonl \
    --contexts ../dataset/contexts.sample.jsonl \
    --recipes ../recipes/redaction.pipeline.example.yaml \
    --out ./results.json
```

### 3. Review results
- Output: `results.json` with LR, RE, and FPR metrics.
- See `metrics.md` for definitions and thresholds.

---

## Usage Examples

### Example 1: Test your RAG pipeline
```bash
python dlp_score.py \
    --endpoint https://rag-api.example.com/query \
    --prompts ../dataset/prompts.sample.jsonl \
    --contexts ../dataset/contexts.sample.jsonl \
    --recipes ../recipes/redaction.pipeline.example.yaml \
    --out ./rag_results.json
```

### Example 2: Integrate into CI/CD
Add this to your pipeline:
```yaml
- name: Run Prompt-DLP Benchmark
    run: |
        python scoring/dlp_score.py \
            --prompts assets/prompt_dlp_benchmark/dataset/prompts.sample.jsonl \
            --recipes assets/prompt_dlp_benchmark/recipes/redaction.pipeline.example.yaml \
            --out ./dlp_results.json
        python -c "import json; r=json.load(open('./dlp_results.json')); exit(1) if r['LeakageRate']>0.05 else 0"
```

---

## Key Metrics Explained

- **Leakage Rate (LR)**  
    *What it means:* Percentage of test cases where sensitive data appears in the final output.  
    *Why it matters:* High LR = your system is leaking secrets or PII.  
    *Target:* Ideally **0%**, but <1% may be acceptable in some contexts.

- **Redaction Effectiveness (RE)**  
    *What it means:* Percentage of sensitive tokens successfully masked or transformed.  
    *Why it matters:* Shows how well your filters work.  
    *Target:* **>95%** for critical categories like PII and secrets.

- **False Positive Rate (FPR)**  
    *What it means:* Percentage of benign content incorrectly redacted.  
    *Why it matters:* Over-blocking hurts usability and trust.  
    *Target:* Keep **<2%** to avoid breaking normal workflows.

---

## Security & Privacy Notes

- Use **synthetic or tokenized data** for testing whenever possible.
- Never include real secrets or live PII in the benchmark.
- Follow your organization’s data handling and retention policies.

---

## Mapping

- **OWASP AI Exchange**:  
    - Section 2: *Threats Through Use → Data Leakage*  
    - Section 5: *AI Security Testing*
- **Standards**: ISO/IEC 27090, NIST AI RMF (Measure/Manage)

---

## License

Released under **CC0** in alignment with OWASP AI Exchange.

---


## Advanced Usage

### Validate a Single Input

You can validate a single string directly from the command line:

```bash
python dlp_score.py --single-input "Contact: Jane Doe, Email: jane.doe@example.com, Phone: +1-555-123-4567" --recipes ../recipes/redaction.pipeline.example.yaml --out ./result.json
```

### AI Guardrails Support

Enable AI-based redaction (default: Presidio) with:

```bash
python dlp_score.py --single-input "Contact: Jane Doe, Email: jane.doe@example.com" --recipes ../recipes/redaction.pipeline.example.yaml --out ./result.json --use-guardrails
```

Specify a guardrail module (if configured in `guardrails.yaml`):

```bash
python dlp_score.py --single-input "Contact: Jane Doe, Email: jane.doe@example.com" --recipes ../recipes/redaction.pipeline.example.yaml --out ./result.json --use-guardrails --guardrail-name presidio
```

If no guardrail is specified, the script uses the default from `guardrails.yaml`.

### Dynamic Guardrails Configuration

Add new guardrails to `guardrails.yaml` to extend support. Example:

```yaml
guardrails:
    - name: presidio
        type: python
        module: presidio_analyzer
        function: AnalyzerEngine
        anonymizer_module: presidio_anonymizer
        anonymizer_function: AnonymizerEngine
    
```

## Contributing

We welcome:
- New prompt cases (e.g., financial IDs, contractual clauses)
- Additional redaction strategies
- Endpoint wrappers for different AI frameworks

Open a PR and include:
- Scenario description
- Patterns or configs added
- Before/after metrics if possible
