# BATCH-0000 - Project Initialization

Status: Draft
Approval Class: A1
Batch Type: Documentation
User-testable: No
Human gate: No

## Purpose

Convert raw project source material into controlled project documentation, architecture direction, first specs/plans, and a roadmap. This batch produces no application code.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0000-project-foundation.md` | Foundation requirements and boundaries. |
| Plan | `docs/plans/PLAN-0000-repo-bootstrap.md` | Repo/bootstrap control-plane work. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Initial architecture direction. |

## Scope summary

### In scope

- Project charter, glossary, repo map, roadmap, seed results, and worklog.
- Foundation spec and initial implementation slice identification.
- Architecture direction if clearly implied by source material.

### Out of scope

- Application code.
- Production services or business logic.
- Dependency installation.
- Deployment or infrastructure.

## Execution contract

- Agent may continue automatically: Yes
- Dependency/network approval required before start: No
- Human checkpoint timing: none for this docs-only batch.
- Special constraints beyond `AGENTS.md`: do not routinely load the raw overview during later implementation.

## Required checks

```bash
git status --short
bash scripts/agent/agent_preflight.sh
git diff --check
```

## Human checks

- None.

## Stop conditions

- Raw overview contradictions block useful decomposition.
- Major architecture choices are required but not present or strongly implied.
- Work would require application code, dependencies, network access, or files outside approved docs.

## Commit strategy

- Suggested local commit: `docs(seed): add project decomposition`
- Remote push/PR: requires explicit approval.

## Final report

Report:

1. Documents created or updated.
2. Specs/plans/batches created.
3. Assumptions and open questions.
4. Checks run and skipped.
5. Recommended first implementation batch.
