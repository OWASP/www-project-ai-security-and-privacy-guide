#!/usr/bin/env python3
import argparse, json, re, sys
from pathlib import Path
from typing import Dict, Any, List
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
try:
    import yaml
except ImportError:
    print('Missing dependency: pyyaml. Run `pip install -r requirements.txt`.')
    sys.exit(1)

def load_pipeline(recipes_path: Path) -> List[Dict[str, Any]]:
    data = yaml.safe_load(recipes_path.read_text(encoding='utf-8'))
    steps = data.get('steps', [])
    order = data.get('order', [])
    base_dir = recipes_path.parent
    rules = {}
    for s in steps:
        fn = s.get('load')
        y = yaml.safe_load((base_dir / fn).read_text(encoding='utf-8'))
        for r in y.get('rules', []):
            rules[r['id']] = r
    ordered = [rules[i] for i in order if i in rules] + [r for i,r in rules.items() if i not in order]
    return ordered

def apply_rules(text: str, rules: List[Dict[str, Any]]):
    total_actions = 0
    per_rule = {}
    out = text
    for r in rules:
        pattern = r.get('pattern')
        flags = re.IGNORECASE if r.get('flags','').lower() == 'i' or '(?i)' in pattern else 0
        rx = re.compile(pattern, flags)
        if r.get('action') == 'hash256':
            import hashlib
            def _repl(m):
                s = m.group(0)
                salt = r.get('salt','')
                h = hashlib.sha256((salt + s).encode('utf-8')).hexdigest()[:16]
                return f"[HASH:{h}]"
            new_out, n = rx.subn(_repl, out)
        else:
            repl = r.get('replace', '[REDACTED]')
            new_out, n = rx.subn(repl, out)
        if n:
            total_actions += n
            per_rule[r['id']] = per_rule.get(r['id'], 0) + n
            out = new_out
    return out, total_actions, per_rule

def count_sensitive(text: str, patterns: List[str]) -> int:
    total = 0
    for pat in patterns or []:
        flags = re.IGNORECASE if '(?i)' in pat else 0
        rx = re.compile(pat, flags)
        total += len(rx.findall(text))
    return total

def call_model_stub(prompt: str, context_text: str = '') -> str:
    if context_text:
        return '[SIMULATED] Summary produced with redaction in place.'
    return '[SIMULATED] No sensitive content present.'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--prompts', required=False)
    ap.add_argument('--contexts', default=None)
    ap.add_argument('--single-input', type=str, default=None, help='Validate a single input string instead of files')
    ap.add_argument('--recipes', required=True)
    ap.add_argument('--config', default='config.example.yaml')
    ap.add_argument('--endpoint', default=None)
    ap.add_argument('--out', required=True)
    ap.add_argument('--use-guardrails', action='store_true', help='Use AI guardrails for redaction')
    ap.add_argument('--guardrail-name', type=str, default=None, help='Specify which AI guardrail to use (default: presidio)')
    args = ap.parse_args()

    cfg = {}
    if Path(args.config).exists():
        cfg = yaml.safe_load(Path(args.config).read_text(encoding='utf-8')) or {}

    endpoint = args.endpoint or cfg.get('endpoint')

    contexts: Dict[str, Dict[str, Any]] = {}
    if args.contexts and Path(args.contexts).exists():
        with open(args.contexts, 'r', encoding='utf-8') as fh:
            for line in fh:
                if line.strip():
                    obj = json.loads(line)
                    contexts[obj['id']] = obj

    prompts = []
    if args.single_input:
        # Create a synthetic prompt object for single input
        prompts = [{
            'id': 'single-input',
            'category': 'manual',
            'surface': 'manual',
            'prompt': args.single_input,
            'context_ids': [],
            'sensitivity': {'policy_label': 'manual', 'match_patterns': [
                # Add common patterns for demo; user can edit as needed
                '(?i)[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}',
                '(?i)\\b\\+?[0-9][0-9\\-\\s]{6,}\\b',
                '(?i)\\b(sk|api|token)[A-Za-z0-9-_]{12,}\\b',
                '(?i)password'
            ]}
        }]
    elif args.prompts:
        with open(args.prompts, 'r', encoding='utf-8') as fh:
            for line in fh:
                if line.strip():
                    prompts.append(json.loads(line))

    rules = load_pipeline(Path(args.recipes))

    # Dynamic guardrail selection
    guardrail_config = None
    if args.use_guardrails:
        import yaml as pyyaml
        guardrails_path = Path(__file__).parent / "guardrails.yaml"
        if guardrails_path.exists():
            with open(guardrails_path, "r", encoding="utf-8") as f:
                config = pyyaml.safe_load(f)
                guardrails = config.get("guardrails", [])
                selected = None
                if args.guardrail_name:
                    for g in guardrails:
                        if g.get("name") == args.guardrail_name:
                            selected = g
                            break
                if not selected:
                    # Default to presidio
                    selected = next((g for g in guardrails if g.get("name") == "presidio"), None)
                guardrail_config = selected
        else:
            print("guardrails.yaml not found. Using default Presidio.")
            guardrail_config = {
                "name": "presidio",
                "type": "python",
                "module": "presidio_analyzer",
                "function": "AnalyzerEngine",
                "anonymizer_module": "presidio_anonymizer",
                "anonymizer_function": "AnonymizerEngine"
            }

        if guardrail_config and guardrail_config["name"] == "presidio":
            try:
                from presidio_analyzer import AnalyzerEngine
                from presidio_anonymizer import AnonymizerEngine
                analyzer = AnalyzerEngine()
                anonymizer = AnonymizerEngine()
            except ImportError:
                print('Presidio not installed. Run `pip install presidio-analyzer presidio-anonymizer`.')
                sys.exit(1)

            def ai_guardrails_redact(text):
                results = analyzer.analyze(text=text, entities=[], language='en')
                anonymized = anonymizer.anonymize(text=text, analyzer_results=results)
                return anonymized.text
        # Future: add elif for other guardrails
        else:
            def ai_guardrails_redact(text):
                print("Selected guardrail not implemented. Returning input unchanged.")
                return text

    total_cases = len(prompts)
    leak_cases = 0
    total_sensitive_before = 0
    total_sensitive_after = 0
    total_actions_fp = 0
    details = []

    for p in prompts:
        ctx_texts = [contexts[cid]['content'] for cid in p.get('context_ids', []) if cid in contexts]
        ctx_joined = ''.join(ctx_texts)

        raw = p['prompt']
        if ctx_joined:
            raw += " " + ctx_joined

        patterns = p.get('sensitivity',{}).get('match_patterns', [])

        sens_before = count_sensitive(raw, patterns)
        total_sensitive_before += sens_before

        if args.use_guardrails:
            redacted = ai_guardrails_redact(raw)
            actions = None
            per_rule = {}
        else:
            redacted, actions, per_rule = apply_rules(raw, rules)

        sens_after = count_sensitive(redacted, patterns)
        total_sensitive_after += sens_after
        leaked = sens_after > 0
        if leaked:
            leak_cases += 1

        # Approx FP: actions from rules whose patterns are not in declared sensitive patterns
        fp_actions = 0
        if not args.use_guardrails:
            for rid, n in per_rule.items():
                rule_pat = next((r['pattern'] for r in rules if r['id']==rid), '')
                if rule_pat not in patterns:
                    fp_actions += n
            total_actions_fp += fp_actions
        else:
            fp_actions = None

        details.append({
            'id': p['id'],
            'category': p['category'],
            'surface': p['surface'],
            'leaked': leaked,
            'sensitive_matches_before': sens_before,
            'sensitive_matches_after': sens_after,
            'redaction_actions': actions,
            'approx_false_positive_actions': fp_actions,
            'raw_preview': raw[:120]
        })

    lr = leak_cases / max(total_cases,1)
    re_val = 0.0
    if total_sensitive_before > 0:
        re_val = (total_sensitive_before - total_sensitive_after) / total_sensitive_before
    denom = (total_sensitive_before - (total_sensitive_before - total_sensitive_after))
    fpr = total_actions_fp / max(denom, 1)

    result = {
        'TotalCases': total_cases,
        'LeakageRate': round(lr, 4),
        'RedactionEffectiveness': round(re_val, 4),
        'FalsePositiveRateApprox': round(fpr, 4),
        'Details': details
    }

    Path(args.out).write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({k:result[k] for k in ['TotalCases','LeakageRate','RedactionEffectiveness','FalsePositiveRateApprox']}, indent=2))

if __name__ == '__main__':
    main()
