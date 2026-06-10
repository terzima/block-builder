# SPEC-0000: Project Foundation

Status: Completed
Approval Class: A1
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0000-repo-bootstrap.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `AGENTS.md`, `docs/intake/PROJECT_OVERVIEW_RAW.md`.
- Current evidence: governance docs, seeded project docs, architecture direction, and the behavior-free application scaffold now exist.
- Why this slice existed: future implementation needed stable source-of-truth docs so agents would not repeatedly load the raw overview.

## Problem

The raw game overview needed to be converted into controlled project context, boundaries, and the first implementable slices without prematurely specifying the entire product.

## Goals

- Capture confirmed product and technical boundaries.
- Define the first implementation slice.
- Keep late-stage work as roadmap candidates until prerequisites are validated.

## Non-goals

- Deliver product behavior.
- Fully plan all 100 levels.
- Choose hosting, analytics, accounts, or final art direction.

## Users / actors

- Project owner: reviews scope, playability, and future product decisions.
- Agentic implementer: follows accepted specs/plans without rereading the raw overview.
- Local player: validates later playable milestones.

## Behavioral contract

- User-visible behavior: no product behavior is delivered by this foundation spec.
- System responsibilities: docs identify stable context, boundaries, first slices, gates, and deferred questions.
- Explicitly unchanged behavior: raw overview remains intake material and is not rewritten.

## Interface and data contract

- Files or modules: project docs under `docs/`; no product modules were required by this foundation slice.
- Public functions/classes: none.
- API routes/events: none.
- Data shapes/schemas: shared contract ownership is specified by `SPEC-0001` and later feature specs.
- Config keys/env vars: `.env.example` ownership is specified by `SPEC-0001`.
- Error codes/messages: none.

## Requirements

### Functional

- FR-1: `docs/project-charter.md`, `docs/glossary.md`, `docs/repo-map.md`, and `docs/roadmap.md` summarize the project for future agents.
- FR-2: `docs/specs/SPEC-0001-application-scaffold.md` defines the first implementation-safe scaffold spec.
- FR-3: Early specs/plans cover scaffold, backend level APIs, and the first playable frontend slice only.
- FR-4: Future and speculative work remains in roadmap/spec-candidate form.
- FR-5: Architecture direction is recorded because the raw overview fixes stack and component ownership.

### Non-functional

- Performance: not applicable.
- Security/privacy: no secrets or user data are introduced by the foundation docs.
- Accessibility: first UI accessibility belongs to `SPEC-0003`.
- Observability: docs identify validation commands and stop conditions.
- Maintainability: docs avoid repeating `AGENTS.md` policy.

## Dependencies and approvals

- Prerequisite specs/plans: none.
- Existing files to read first: `AGENTS.md`, `docs/intake/PROJECT_OVERVIEW_RAW.md`.
- Approval-required actions: none for this docs-only foundation work.

## Acceptance gates

### Automated

```bash
git status --short
bash scripts/agent/agent_preflight.sh
git diff --check
```

### Human

- Required? No
- Reason: this is foundation documentation; no user-testable behavior is produced.

### Manual checks

- Confirm seed docs link to first specs/plans and keep open questions explicit.

## Risks and open questions

- Risk: future agents over-read the raw overview.
  - Mitigation: use project charter, repo map, active spec, and active plan as normal context.
- Open questions: future test runner, hosting target, art direction, and level-generation strategy remain deferred to later specs.

## Stop conditions

- A contradiction in the raw overview blocks decomposition.
- A major architecture decision is required but not specified or strongly implied.
- Work would need to leave approved documentation paths.
