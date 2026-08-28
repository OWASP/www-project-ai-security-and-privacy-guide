import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "retrieval_scope_tester.py"
SPEC = importlib.util.spec_from_file_location("retrieval_scope_tester", MODULE_PATH)
rst = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
sys.modules["retrieval_scope_tester"] = rst
SPEC.loader.exec_module(rst)


class RetrievalScopeTesterTests(unittest.TestCase):
    def test_exact_chunk_scope_passes(self):
        step = rst.QueryStep(
            name="query",
            identity=rst.Identity("alice", "tenant-a", ("reader",)),
            query="q",
            allowed_resources=frozenset({
                rst.ResourceRef("doc-a", "chunk-1"),
                rst.ResourceRef("doc-a", "chunk-2"),
            }),
            denied_resources=frozenset(),
            allowed_document_ids=frozenset(),
            denied_document_ids=frozenset(),
            expected_tenant="tenant-a",
        )
        result = rst.evaluate_step(
            "case",
            step,
            [{"document_id": "doc-a", "chunk_id": "chunk-1", "tenant": "tenant-a"}],
        )
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["violations"], [])

    def test_wrong_chunk_of_allowed_document_fails(self):
        step = rst.QueryStep(
            name="query",
            identity=rst.Identity("alice", "tenant-a", ("reader",)),
            query="q",
            allowed_resources=frozenset({rst.ResourceRef("doc-a", "chunk-1")}),
            denied_resources=frozenset(),
            allowed_document_ids=frozenset(),
            denied_document_ids=frozenset(),
            expected_tenant="tenant-a",
        )
        result = rst.evaluate_step(
            "case",
            step,
            [{"document_id": "doc-a", "chunk_id": "chunk-99", "tenant": "tenant-a"}],
        )
        self.assertEqual(result["status"], "FAIL")
        self.assertIn("outside_authorised_scope", result["violations"][0]["reasons"])

    def test_cross_tenant_fails_even_when_document_is_allowlisted(self):
        step = rst.QueryStep(
            name="query",
            identity=rst.Identity("alice", "tenant-a", ("reader",)),
            query="q",
            allowed_resources=frozenset({rst.ResourceRef("shared-doc")}),
            denied_resources=frozenset(),
            allowed_document_ids=frozenset(),
            denied_document_ids=frozenset(),
            expected_tenant="tenant-a",
        )
        result = rst.evaluate_step(
            "case",
            step,
            [{"document_id": "shared-doc", "chunk_id": "c1", "tenant": "tenant-b"}],
        )
        self.assertEqual(result["status"], "FAIL")
        self.assertIn("cross_tenant", result["violations"][0]["reasons"])

    def test_explicit_deny_is_reported(self):
        step = rst.QueryStep(
            name="query",
            identity=rst.Identity("alice", "tenant-a", ("reader",)),
            query="q",
            allowed_resources=frozenset({rst.ResourceRef("doc-a")}),
            denied_resources=frozenset({rst.ResourceRef("doc-a", "secret")}),
            allowed_document_ids=frozenset(),
            denied_document_ids=frozenset(),
            expected_tenant="tenant-a",
        )
        result = rst.evaluate_step(
            "case",
            step,
            [{"document_id": "doc-a", "chunk_id": "secret", "tenant": "tenant-a"}],
        )
        self.assertEqual(result["status"], "FAIL")
        self.assertIn("explicitly_denied", result["violations"][0]["reasons"])

    def test_backward_compatible_document_allowlist(self):
        step = rst.QueryStep(
            name="query",
            identity=rst.Identity("alice", "tenant-a", ("reader",)),
            query="q",
            allowed_resources=frozenset(),
            denied_resources=frozenset(),
            allowed_document_ids=frozenset({"doc-a"}),
            denied_document_ids=frozenset(),
            expected_tenant="tenant-a",
        )
        result = rst.evaluate_step(
            "case",
            step,
            [{"document_id": "doc-a", "chunk_id": "any", "tenant": "tenant-a"}],
        )
        self.assertEqual(result["status"], "PASS")

    def test_parse_multistep_lifecycle_plan(self):
        plan = {
            "cases": [{
                "name": "revocation",
                "identity": {
                    "subject": "alice",
                    "tenant": "tenant-a",
                    "roles": ["reader"],
                },
                "query": "forecast",
                "steps": [
                    {
                        "name": "before-revoke",
                        "allowed_resources": ["doc-a#c1"],
                    },
                    {
                        "name": "after-revoke",
                        "mutation": {
                            "type": "revoke",
                            "document_id": "doc-a",
                            "subject": "alice",
                        },
                        "allowed_resources": ["public#c1"],
                        "denied_resources": ["doc-a#c1"],
                    },
                ],
            }]
        }
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "plan.json"
            path.write_text(json.dumps(plan), encoding="utf-8")
            cases = rst.parse_test_plan(path)
        self.assertEqual(len(cases), 1)
        self.assertEqual(len(cases[0].steps), 2)
        self.assertEqual(cases[0].steps[1].mutation["type"], "revoke")

    def test_fixture_retriever_supports_step_responses(self):
        fixture = {
            "responses": {
                "revocation": {
                    "before": [{"document_id": "doc-a", "chunk_id": "c1"}],
                    "after": [{"document_id": "public", "chunk_id": "c1"}],
                }
            }
        }
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "fixture.json"
            path.write_text(json.dumps(fixture), encoding="utf-8")
            retriever = rst.FixtureRetriever(path)
            identity = rst.Identity("alice", "tenant-a", ("reader",))
            common = dict(
                identity=identity,
                query="q",
                allowed_resources=frozenset({rst.ResourceRef("doc-a", "c1")}),
                denied_resources=frozenset(),
                allowed_document_ids=frozenset(),
                denied_document_ids=frozenset(),
                expected_tenant="tenant-a",
            )
            before = rst.QueryStep(name="before", **common)
            after = rst.QueryStep(name="after", **common)
            self.assertEqual(retriever.query("revocation", before)[0]["document_id"], "doc-a")
            self.assertEqual(retriever.query("revocation", after)[0]["document_id"], "public")

    def test_header_templates(self):
        identity = rst.Identity("alice", "tenant-a", ("reader", "finance"))
        rendered = rst.render_header("user={subject};tenant={tenant};roles={roles}", identity)
        self.assertEqual(
            rendered,
            "user=alice;tenant=tenant-a;roles=reader,finance",
        )


if __name__ == "__main__":
    unittest.main()
