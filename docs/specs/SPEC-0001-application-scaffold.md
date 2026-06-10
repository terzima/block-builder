# SPEC-0001: Application Scaffold

Status: Draft
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0001-application-scaffold.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `docs/repo-map.md`, `docs/adr/ADR-0000-architecture-direction.md`, `docs/intake/PROJECT_OVERVIEW_RAW.md`.
- Current evidence: only governance/docs scaffold exists; application directories do not.
- Why this slice now: backend/frontend work needs stable paths, shared contract files, and setup docs first.

## Problem

The repo needs an application skeleton and shared contract foundation before product behavior can be implemented safely.

## Goals

- Create behavior-free backend, frontend, shared, tests, and tools skeletons.
- Seed the executable shared contract and human-readable mirror.
- Document local environment defaults and setup expectations.

## Non-goals

- Implementing FastAPI routes, frontend gameplay, validation logic, or product UI.
- Installing dependencies, creating lockfiles, or changing CI/deployment.
- Adding real secrets, accounts, auth, external integrations, or production config.

## Users / actors

- Agentic implementer: uses predictable paths for later specs.
- Project owner: reviews local setup expectations and shared contract shape.

## Behavioral contract

- User-visible behavior: none; scaffold files must not claim playable behavior.
- System responsibilities: provide stable paths and contract docs for later backend/frontend work.
- Explicitly unchanged behavior: existing governance, hooks, CI, and operator docs remain unchanged unless explicitly listed.

## Interface and data contract

- Files or modules: `backend/app/`, `frontend/`, `shared/`, `tests/`, `tools/`.
- Public functions/classes: none in this scaffold slice.
- API routes/events: declared in `shared/app_contract.json`, not implemented here.
- Data shapes/schemas: initial contract includes `version`, `appName`, `api`, `static`, `tiles`, `actions`, `keyboard`, `storageKeys`, `gameplay`, and `ui`.
- Config keys/env vars: `.env.example` includes only local non-secret defaults for app env, host, port, paths, CORS, trusted hosts, and progress toggle.
- Error codes/messages: none.

## Requirements

### Functional

- FR-1: Create backend/frontend/shared/tests/tools directories required by later specs.
- FR-2: Create package markers or `.gitkeep` files only where needed.
- FR-3: Create `shared/app_contract.json` as valid JSON using raw-overview values.
- FR-4: Create `shared/COMMUNICATION_CONTRACT.md` explaining contract fields.
- FR-5: Create `.env.example` with non-secret local defaults.
- FR-6: Create or update README with local-first purpose, setup sequence, and dependency-approval note.
- FR-7: Update `.gitignore` only for local/generated files relevant to the scaffold.

### Non-functional

- Performance: not applicable.
- Security/privacy: no secrets or user-specific data are introduced.
- Accessibility: no behavior yet.
- Observability: validation commands must prove JSON and scaffold sanity.
- Maintainability: scaffold paths should match `docs/repo-map.md`.

## Dependencies and approvals

- Prerequisite specs/plans: `SPEC-0000`.
- Existing files to read first: `docs/repo-map.md`, `docs/adr/ADR-0000-architecture-direction.md`.
- Approval-required actions: dependency install, network access, CI/hook/deployment edits, or product behavior.

## Acceptance gates

### Automated

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
```

### Human

- Required? No
- Reason: scaffold-only work is machine-verifiable.

### Manual checks

- Confirm README and contract docs do not imply backend or gameplay is complete.

## Risks and open questions

- Risk: placeholder files are mistaken for implementation.
  - Mitigation: keep placeholders minimal and explicitly behavior-free.
- Open question: exact dependency versions are deferred to backend implementation approval.

## Stop conditions

- Completing the scaffold requires a dependency, network, CI, deployment, or security-policy action.
- Product behavior or gameplay code becomes necessary.
- Shared contract values require invention beyond accepted source docs.
