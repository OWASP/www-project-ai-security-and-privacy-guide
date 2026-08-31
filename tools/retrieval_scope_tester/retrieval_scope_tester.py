#!/usr/bin/env python3
"""Provider-agnostic retrieval-scope security tester.

Tests retrieval/index authorisation before any LLM or generation layer is involved.

Exit codes:
  0 - all test cases passed
  2 - one or more retrieval-scope violations were detected
  1 - configuration or execution error
"""

from __future__ import annotations

import argparse
import json
import shlex
import subprocess
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Protocol


@dataclass(frozen=True)
class Identity:
    subject: str
    tenant: str | None
    roles: tuple[str, ...]


@dataclass(frozen=True)
class ResourceRef:
    document_id: str
    chunk_id: str | None = None

    @property
    def key(self) -> str:
        return (
            f"{self.document_id}#{self.chunk_id}"
            if self.chunk_id is not None
            else self.document_id
        )


@dataclass(frozen=True)
class QueryStep:
    name: str
    identity: Identity
    query: str
    allowed_resources: frozenset[ResourceRef]
    denied_resources: frozenset[ResourceRef]
    allowed_document_ids: frozenset[str]
    denied_document_ids: frozenset[str]
    expected_tenant: str | None
    mutation: dict[str, Any] | None = None


@dataclass(frozen=True)
class TestCase:
    name: str
    steps: tuple[QueryStep, ...]


class Retriever(Protocol):
    def query(self, case_name: str, step: QueryStep) -> list[dict[str, Any]]:
        ...


class Mutator(Protocol):
    def apply(self, case_name: str, step: QueryStep) -> None:
        ...


class NoopMutator:
    def __init__(self, strict: bool = True) -> None:
        self.strict = strict

    def apply(self, case_name: str, step: QueryStep) -> None:
        if self.strict and step.mutation is not None:
            raise RuntimeError(
                f"case {case_name!r} step {step.name!r} declares a mutation "
                "but no mutator is configured"
            )


class FixtureRetriever:
    def __init__(self, fixture_path: Path) -> None:
        raw = load_json(fixture_path)
        responses = raw.get("responses")
        if not isinstance(responses, dict):
            raise ValueError("fixture must contain an object named 'responses'")
        self.responses = responses

    def query(self, case_name: str, step: QueryStep) -> list[dict[str, Any]]:
        case_response = self.responses.get(case_name, [])
        if isinstance(case_response, dict):
            chunks = case_response.get(step.name, [])
        else:
            chunks = case_response
        if not isinstance(chunks, list):
            raise ValueError(
                f"fixture response for {case_name!r}/{step.name!r} must be a list"
            )
        return normalise_chunks(chunks)


class CommandRetriever:
    """Runs an external retrieval adapter once per query step."""

    def __init__(self, command: str, timeout: float) -> None:
        self.argv = shlex.split(command)
        if not self.argv:
            raise ValueError("adapter command cannot be empty")
        self.timeout = timeout

    def query(self, case_name: str, step: QueryStep) -> list[dict[str, Any]]:
        payload = build_request_payload(case_name, step)
        proc = subprocess.run(
            self.argv,
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            timeout=self.timeout,
            check=False,
        )
        if proc.returncode != 0:
            detail = proc.stderr.strip() or proc.stdout.strip() or "no output"
            raise RuntimeError(
                f"adapter exited with {proc.returncode} for "
                f"{case_name!r}/{step.name!r}: {detail}"
            )
        return parse_adapter_response(proc.stdout, case_name, step.name)


class CommandMutator:
    """Runs an external state-change hook before a step is queried."""

    def __init__(self, command: str, timeout: float) -> None:
        self.argv = shlex.split(command)
        if not self.argv:
            raise ValueError("mutator command cannot be empty")
        self.timeout = timeout

    def apply(self, case_name: str, step: QueryStep) -> None:
        if step.mutation is None:
            return
        payload = {
            "case": case_name,
            "step": step.name,
            "mutation": step.mutation,
            "identity": identity_dict(step.identity),
        }
        proc = subprocess.run(
            self.argv,
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            timeout=self.timeout,
            check=False,
        )
        if proc.returncode != 0:
            detail = proc.stderr.strip() or proc.stdout.strip() or "no output"
            raise RuntimeError(
                f"mutator exited with {proc.returncode} for "
                f"{case_name!r}/{step.name!r}: {detail}"
            )


class HTTPRetriever:
    """Generic JSON-over-HTTP retriever.

    Sends POST requests directly to a retrieval/index endpoint. This intentionally
    does not assume OpenAI, an LLM provider, or a specific vector database.
    """

    def __init__(self, config_path: Path, timeout: float) -> None:
        config = load_json(config_path)
        self.url = require_string(config, "url")
        self.timeout = timeout
        headers = config.get("headers", {})
        if not isinstance(headers, dict) or not all(
            isinstance(k, str) and isinstance(v, str)
            for k, v in headers.items()
        ):
            raise ValueError("http config 'headers' must be an object of strings")
        self.headers = headers
        self.chunks_field = config.get("chunks_field", "chunks")
        if not isinstance(self.chunks_field, str) or not self.chunks_field:
            raise ValueError("http config 'chunks_field' must be a non-empty string")

    def query(self, case_name: str, step: QueryStep) -> list[dict[str, Any]]:
        payload = build_request_payload(case_name, step)
        body = json.dumps(payload).encode("utf-8")
        headers = {
            "Content-Type": "application/json",
            **{
                key: render_header(value, step.identity)
                for key, value in self.headers.items()
            },
        }
        request = urllib.request.Request(
            self.url,
            data=body,
            headers=headers,
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                text = response.read().decode("utf-8")
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(
                f"http retriever returned {exc.code} for "
                f"{case_name!r}/{step.name!r}: {detail}"
            ) from exc
        except urllib.error.URLError as exc:
            raise RuntimeError(
                f"http retriever failed for {case_name!r}/{step.name!r}: {exc.reason}"
            ) from exc

        try:
            parsed = json.loads(text)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"http retriever returned invalid JSON for "
                f"{case_name!r}/{step.name!r}"
            ) from exc
        if not isinstance(parsed, dict):
            raise ValueError("http retriever response must be a JSON object")
        chunks = parsed.get(self.chunks_field)
        if not isinstance(chunks, list):
            raise ValueError(
                f"http retriever response must contain a "
                f"{self.chunks_field!r} list"
            )
        return normalise_chunks(chunks)


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return value


def identity_dict(identity: Identity) -> dict[str, Any]:
    return {
        "subject": identity.subject,
        "tenant": identity.tenant,
        "roles": list(identity.roles),
    }


def build_request_payload(case_name: str, step: QueryStep) -> dict[str, Any]:
    return {
        "case": case_name,
        "step": step.name,
        "query": step.query,
        "identity": identity_dict(step.identity),
    }


def render_header(template: str, identity: Identity) -> str:
    replacements = {
        "{subject}": identity.subject,
        "{tenant}": identity.tenant or "",
        "{roles}": ",".join(identity.roles),
    }
    rendered = template
    for token, value in replacements.items():
        rendered = rendered.replace(token, value)
    return rendered


def parse_adapter_response(
    text: str, case_name: str, step_name: str
) -> list[dict[str, Any]]:
    try:
        response = json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"adapter returned invalid JSON for {case_name!r}/{step_name!r}"
        ) from exc

    if not isinstance(response, dict):
        raise ValueError("adapter response must be a JSON object")
    chunks = response.get("chunks")
    if not isinstance(chunks, list):
        raise ValueError(
            f"adapter response for {case_name!r}/{step_name!r} "
            "must contain a 'chunks' list"
        )
    return normalise_chunks(chunks)


def parse_identity(value: Any, context: str) -> Identity:
    if not isinstance(value, dict):
        raise ValueError(f"{context}: identity must be an object")
    roles_raw = value.get("roles", [])
    if not isinstance(roles_raw, list) or not all(
        isinstance(role, str) and role for role in roles_raw
    ):
        raise ValueError(f"{context}: identity.roles must be a list of strings")
    tenant = value.get("tenant")
    if tenant is not None and not isinstance(tenant, str):
        raise ValueError(f"{context}: identity.tenant must be a string or null")
    return Identity(
        subject=require_string(value, "subject"),
        tenant=tenant,
        roles=tuple(roles_raw),
    )


def parse_resource(value: Any, context: str) -> ResourceRef:
    if isinstance(value, str):
        if "#" in value:
            document_id, chunk_id = value.split("#", 1)
            if not document_id or not chunk_id:
                raise ValueError(f"{context}: invalid resource reference {value!r}")
            return ResourceRef(document_id=document_id, chunk_id=chunk_id)
        return ResourceRef(document_id=value)

    if not isinstance(value, dict):
        raise ValueError(f"{context}: resource must be a string or object")
    document_id = require_string(value, "document_id")
    chunk_id = value.get("chunk_id")
    if chunk_id is not None and (not isinstance(chunk_id, str) or not chunk_id):
        raise ValueError(f"{context}: chunk_id must be a non-empty string or null")
    return ResourceRef(document_id=document_id, chunk_id=chunk_id)


def parse_resource_set(value: dict[str, Any], key: str, context: str) -> set[ResourceRef]:
    raw = value.get(key, [])
    if not isinstance(raw, list):
        raise ValueError(f"{context}: {key} must be a list")
    return {parse_resource(item, context) for item in raw}


def parse_string_set(value: dict[str, Any], key: str, context: str) -> set[str]:
    raw = value.get(key, [])
    if not isinstance(raw, list) or not all(
        isinstance(item, str) and item for item in raw
    ):
        raise ValueError(f"{context}: {key} must be a list of strings")
    return set(raw)


def parse_step(
    case_name: str,
    item: dict[str, Any],
    default_identity: Identity | None = None,
    default_query: str | None = None,
) -> QueryStep:
    step_name = item.get("name", "query")
    if not isinstance(step_name, str) or not step_name.strip():
        raise ValueError(f"case {case_name!r}: step name must be a non-empty string")
    context = f"case {case_name!r} step {step_name!r}"

    identity = (
        parse_identity(item["identity"], context)
        if "identity" in item
        else default_identity
    )
    if identity is None:
        raise ValueError(f"{context}: identity is required")

    query = item.get("query", default_query)
    if not isinstance(query, str) or not query.strip():
        raise ValueError(f"{context}: query must be a non-empty string")

    allowed_resources = parse_resource_set(item, "allowed_resources", context)
    denied_resources = parse_resource_set(item, "denied_resources", context)
    allowed_document_ids = parse_string_set(item, "allowed_document_ids", context)
    denied_document_ids = parse_string_set(item, "denied_document_ids", context)

    if not allowed_resources and not allowed_document_ids:
        raise ValueError(
            f"{context}: define allowed_resources or allowed_document_ids"
        )

    if allowed_resources & denied_resources:
        overlap = ", ".join(sorted(resource.key for resource in allowed_resources & denied_resources))
        raise ValueError(f"{context}: resources cannot be both allowed and denied: {overlap}")
    if allowed_document_ids & denied_document_ids:
        overlap = ", ".join(sorted(allowed_document_ids & denied_document_ids))
        raise ValueError(f"{context}: documents cannot be both allowed and denied: {overlap}")

    expected_tenant = item.get("expected_tenant", identity.tenant)
    if expected_tenant is not None and not isinstance(expected_tenant, str):
        raise ValueError(f"{context}: expected_tenant must be a string or null")

    mutation = item.get("mutation")
    if mutation is not None and not isinstance(mutation, dict):
        raise ValueError(f"{context}: mutation must be an object")

    return QueryStep(
        name=step_name,
        identity=identity,
        query=query,
        allowed_resources=frozenset(allowed_resources),
        denied_resources=frozenset(denied_resources),
        allowed_document_ids=frozenset(allowed_document_ids),
        denied_document_ids=frozenset(denied_document_ids),
        expected_tenant=expected_tenant,
        mutation=mutation,
    )


def parse_test_plan(path: Path) -> list[TestCase]:
    raw = load_json(path)
    items = raw.get("cases")
    if not isinstance(items, list) or not items:
        raise ValueError("test plan must contain a non-empty 'cases' list")

    cases: list[TestCase] = []
    seen_names: set[str] = set()

    for index, item in enumerate(items, start=1):
        if not isinstance(item, dict):
            raise ValueError(f"case #{index} must be an object")

        name = require_string(item, "name")
        if name in seen_names:
            raise ValueError(f"duplicate case name: {name!r}")
        seen_names.add(name)

        default_identity = (
            parse_identity(item["identity"], f"case {name!r}")
            if "identity" in item
            else None
        )
        default_query = item.get("query")
        if default_query is not None and (
            not isinstance(default_query, str) or not default_query.strip()
        ):
            raise ValueError(f"case {name!r}: query must be a non-empty string")

        steps_raw = item.get("steps")
        if steps_raw is None:
            steps = (parse_step(name, item, default_identity, default_query),)
        else:
            if not isinstance(steps_raw, list) or not steps_raw:
                raise ValueError(f"case {name!r}: steps must be a non-empty list")
            parsed_steps = []
            seen_steps: set[str] = set()
            for step_raw in steps_raw:
                if not isinstance(step_raw, dict):
                    raise ValueError(f"case {name!r}: each step must be an object")
                step = parse_step(name, step_raw, default_identity, default_query)
                if step.name in seen_steps:
                    raise ValueError(
                        f"case {name!r}: duplicate step name {step.name!r}"
                    )
                seen_steps.add(step.name)
                parsed_steps.append(step)
            steps = tuple(parsed_steps)

        cases.append(TestCase(name=name, steps=steps))

    return cases


def require_string(value: dict[str, Any], key: str) -> str:
    result = value.get(key)
    if not isinstance(result, str) or not result.strip():
        raise ValueError(f"{key!r} must be a non-empty string")
    return result


def normalise_chunks(chunks: list[Any]) -> list[dict[str, Any]]:
    result: list[dict[str, Any]] = []
    for index, chunk in enumerate(chunks, start=1):
        if not isinstance(chunk, dict):
            raise ValueError(f"chunk #{index} must be an object")
        document_id = chunk.get("document_id")
        if not isinstance(document_id, str) or not document_id:
            raise ValueError(f"chunk #{index} must contain a non-empty document_id")
        chunk_id = chunk.get("chunk_id")
        if chunk_id is not None and (not isinstance(chunk_id, str) or not chunk_id):
            raise ValueError(
                f"chunk #{index}: chunk_id must be a non-empty string or null"
            )
        tenant = chunk.get("tenant")
        if tenant is not None and not isinstance(tenant, str):
            raise ValueError(f"chunk #{index}: tenant must be a string or null")
        result.append(chunk)
    return result


def resource_matches(allowed: ResourceRef, actual: ResourceRef) -> bool:
    if allowed.document_id != actual.document_id:
        return False
    return allowed.chunk_id is None or allowed.chunk_id == actual.chunk_id


def is_resource_allowed(step: QueryStep, actual: ResourceRef) -> bool:
    if step.allowed_resources:
        return any(resource_matches(allowed, actual) for allowed in step.allowed_resources)
    return actual.document_id in step.allowed_document_ids


def is_resource_denied(step: QueryStep, actual: ResourceRef) -> bool:
    if any(resource_matches(denied, actual) for denied in step.denied_resources):
        return True
    return actual.document_id in step.denied_document_ids


def evaluate_step(
    case_name: str, step: QueryStep, chunks: list[dict[str, Any]]
) -> dict[str, Any]:
    violations: list[dict[str, Any]] = []
    retrieved_resources: list[dict[str, Any]] = []

    for chunk in chunks:
        actual = ResourceRef(
            document_id=chunk["document_id"],
            chunk_id=chunk.get("chunk_id"),
        )
        tenant = chunk.get("tenant")
        reasons = []

        if not is_resource_allowed(step, actual):
            reasons.append("outside_authorised_scope")
        if is_resource_denied(step, actual):
            reasons.append("explicitly_denied")
        if (
            step.expected_tenant is not None
            and tenant is not None
            and tenant != step.expected_tenant
        ):
            reasons.append("cross_tenant")

        retrieved_resources.append(
            {
                "document_id": actual.document_id,
                "chunk_id": actual.chunk_id,
                "tenant": tenant,
            }
        )
        if reasons:
            violations.append(
                {
                    "document_id": actual.document_id,
                    "chunk_id": actual.chunk_id,
                    "tenant": tenant,
                    "reasons": sorted(set(reasons)),
                }
            )

    return {
        "case": case_name,
        "step": step.name,
        "status": "FAIL" if violations else "PASS",
        "identity": identity_dict(step.identity),
        "expected_tenant": step.expected_tenant,
        "retrieved_resources": retrieved_resources,
        "violations": violations,
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Test retrieval-scope enforcement directly at the retriever/index layer."
        )
    )
    parser.add_argument(
        "--plan",
        required=True,
        type=Path,
        help="JSON test plan defining identities, queries, authorised resources and steps.",
    )

    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument(
        "--fixture",
        type=Path,
        help="Offline fixture JSON containing retrieved chunks per case/step.",
    )
    source.add_argument(
        "--command",
        help=(
            "External retrieval adapter command. Request JSON is sent on stdin and "
            "the adapter must return {'chunks': [...]} JSON on stdout."
        ),
    )
    source.add_argument(
        "--http-config",
        type=Path,
        help="JSON configuration for a generic direct retrieval HTTP endpoint.",
    )

    parser.add_argument(
        "--mutator-command",
        help=(
            "Optional external hook used for lifecycle mutations such as ACL revoke "
            "or role change propagation. Mutation JSON is sent on stdin."
        ),
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=15.0,
        help="Adapter/mutator timeout in seconds (default: 15).",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional path for the JSON report. Report is always printed to stdout.",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        cases = parse_test_plan(args.plan)

        retriever: Retriever
        if args.fixture:
            retriever = FixtureRetriever(args.fixture)
        elif args.command:
            retriever = CommandRetriever(args.command, args.timeout)
        else:
            retriever = HTTPRetriever(args.http_config, args.timeout)

        mutator: Mutator = (
            CommandMutator(args.mutator_command, args.timeout)
            if args.mutator_command
            else NoopMutator(strict=not bool(args.fixture))
        )

        results = []
        for case in cases:
            step_results = []
            for step in case.steps:
                mutator.apply(case.name, step)
                chunks = retriever.query(case.name, step)
                step_results.append(evaluate_step(case.name, step, chunks))
            case_failed = any(result["status"] == "FAIL" for result in step_results)
            results.append(
                {
                    "name": case.name,
                    "status": "FAIL" if case_failed else "PASS",
                    "steps": step_results,
                }
            )

        failed_cases = sum(1 for result in results if result["status"] == "FAIL")
        failed_steps = sum(
            1
            for result in results
            for step in result["steps"]
            if step["status"] == "FAIL"
        )
        total_steps = sum(len(result["steps"]) for result in results)

        report = {
            "summary": {
                "cases": len(results),
                "passed_cases": len(results) - failed_cases,
                "failed_cases": failed_cases,
                "steps": total_steps,
                "failed_steps": failed_steps,
            },
            "results": results,
        }
        rendered = json.dumps(report, indent=2, sort_keys=False)
        print(rendered)

        if args.output:
            args.output.write_text(rendered + "\n", encoding="utf-8")

        return 2 if failed_cases else 0

    except (
        OSError,
        ValueError,
        RuntimeError,
        subprocess.SubprocessError,
    ) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
