# Retrieval Scope Tester

A provider-agnostic reference implementation for testing **retrieval-scope enforcement** in RAG systems before any LLM or generation layer is involved.

It addresses the gap described in OWASP AI Exchange issue #211: a RAG application can appear safe at the prompt/model layer while its retriever or vector index still returns chunks that the current identity should not be able to access.

## Security property

For every retrieval result:

```text
authorised(identity, document_id, chunk_id, tenant) == true
```

The tester evaluates the retrieval result itself. A downstream model refusing to quote or use an unauthorised chunk does not make the retrieval safe because the data has already crossed the retrieval trust boundary.

## Baseline checks

The bundled plan covers:

- `RAG-AUTH-001` Cross-tenant retrieval isolation.
- `RAG-AUTH-002` Chunk-level ACL enforcement, including different chunks from the same document.
- `RAG-AUTH-003` Role downgrade / least-privilege propagation.
- `RAG-AUTH-004` Permission revocation / stale-index access.

The lifecycle cases run multiple query steps so access can be compared before and after a role or ACL change.

## Requirements

Python 3.10+. No third-party Python packages are required.

## Offline demonstration

Secure fixture:

```bash
python tools/retrieval_scope_tester/retrieval_scope_tester.py \
  --plan tools/retrieval_scope_tester/examples/test_plan.json \
  --fixture tools/retrieval_scope_tester/examples/fixture_secure.json
```

Expected exit code: `0`.

Deliberately vulnerable fixture:

```bash
python tools/retrieval_scope_tester/retrieval_scope_tester.py \
  --plan tools/retrieval_scope_tester/examples/test_plan.json \
  --fixture tools/retrieval_scope_tester/examples/fixture_vulnerable.json
```

Expected exit code: `2`.

The vulnerable fixture demonstrates four failures: cross-tenant leakage, an unauthorised chunk from an otherwise allowed document, stale finance access after role downgrade, and stale access after permission revocation.

## Direct HTTP retrieval adapter

For a retriever or vector-search service that exposes a JSON endpoint, use the built-in HTTP adapter:

```bash
python tools/retrieval_scope_tester/retrieval_scope_tester.py \
  --plan tools/retrieval_scope_tester/examples/test_plan.json \
  --http-config tools/retrieval_scope_tester/examples/http_config.example.json
```

Example configuration:

```json
{
  "url": "http://localhost:8080/retrieve",
  "chunks_field": "chunks",
  "headers": {
    "X-User-ID": "{subject}",
    "X-Tenant-ID": "{tenant}",
    "X-Roles": "{roles}"
  }
}
```

The placeholders `{subject}`, `{tenant}` and `{roles}` are populated from each test identity.

The endpoint receives a JSON POST containing the case, step, query and identity, and must return a chunk list such as:

```json
{
  "chunks": [
    {
      "document_id": "a-finance-1",
      "chunk_id": "revenue-q4",
      "tenant": "tenant-a"
    }
  ]
}
```

This adapter is intentionally generic. It does not require OpenAI, an OpenAI SDK, an LLM provider, or any particular vector database.

## Command adapter

For systems that need custom authentication, SDKs, query filters or provider-specific calls, use `--command`:

```bash
python tools/retrieval_scope_tester/retrieval_scope_tester.py \
  --plan my_test_plan.json \
  --command "python my_retriever_adapter.py"
```

The request JSON is written to the adapter on stdin. The adapter prints a JSON object containing `chunks`.

This keeps the evaluator independent of Pinecone, Weaviate, Qdrant, Elasticsearch, OpenSearch, pgvector, Chroma, or any other retrieval backend.

## Chunk-level scope

Prefer `allowed_resources` and `denied_resources` for new tests.

A resource can be written as:

```json
"allowed_resources": [
  "a-handbook#public-benefits",
  {
    "document_id": "a-public-1",
    "chunk_id": "overview"
  }
]
```

A document-only reference such as `a-public-1` authorises any returned chunk from that document. A `document_id#chunk_id` reference authorises only that exact chunk.

The older `allowed_document_ids` and `denied_document_ids` fields remain supported for compatibility.

## Lifecycle testing

A case can contain multiple steps. This allows the same test to prove that a security state change is enforced by the retrieval layer instead of merely checking an already-changed static identity.

For offline fixtures, the before/after states are modelled directly in the fixture.

For a live target, provide `--mutator-command` when a step contains a `mutation`. The mutator receives JSON describing the case, step, requested mutation and identity. It can update a source ACL, IAM binding, application policy or test fixture. After the hook succeeds, the tester queries the retriever again and evaluates the post-change result.

Example mutation:

```json
{
  "type": "revoke",
  "subject": "alice",
  "document_id": "a-finance-revoked"
}
```

## Result reasons

Each violating resource can report one or more reasons:

- `outside_authorised_scope`
- `explicitly_denied`
- `cross_tenant`

A returned chunk may carry multiple reasons at the same time.

## Tests

Run the regression suite:

```bash
python -m unittest discover \
  -s tools/retrieval_scope_tester/tests \
  -v
```

The tests cover exact chunk matching, same-document chunk isolation, cross-tenant detection, explicit deny handling, backward-compatible document allow-lists, multi-step lifecycle parsing, fixture step selection and HTTP header templating.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | All retrieval-scope cases passed |
| `1` | Configuration, adapter, HTTP or mutation execution error |
| `2` | One or more retrieval-scope violations were detected |

This makes the tester suitable for CI and scheduled security regression checks.

## Scope

This reference implementation tests retrieval authorisation, tenant isolation and security-state propagation. It does not test prompt injection, generation behaviour, model safety, embedding inversion, corpus poisoning or parser vulnerabilities. Those require separate RAG security tests.
