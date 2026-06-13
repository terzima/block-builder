# SPEC-0001: Application Scaffold

Status: Draft
Approval Class: A1
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0001-application-scaffold.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `docs/repo-map.md`, `docs/adr/ADR-0000-architecture-direction.md`, and seeded project docs derived from `docs/intake/PROJECT_OVERVIEW_RAW.md`.
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

- Files or modules created by this slice: `backend/app/__init__.py`, `backend/app/services/__init__.py`, `backend/app/data/.gitkeep`, `frontend/index.html`, `frontend/style.css`, `frontend/js/.gitkeep`, `shared/app_contract.json`, `shared/COMMUNICATION_CONTRACT.md`, `.env.example`, `tests/.gitkeep`, `tests/js/.gitkeep`, and `tools/.gitkeep`.
- Existing files modified by this slice: `README.md` and `.gitignore`.
- Deferred files: backend route/config/schema/service modules, level data, frontend gameplay modules, tests, validators, and generators listed in `docs/repo-map.md` are not created by this scaffold.
- Public functions/classes: none in this scaffold slice.
- API routes/events: `shared/app_contract.json` declares same-origin `api.origin`, `/api/v1` as `api.prefix`, and route names `health`, `config`, `levels`, `levelById`, and `progress`. These routes are not implemented here.
- Data shapes/schemas: initial contract includes `version`, `appName`, `api`, `static`, `tiles`, `actions`, `keyboard`, `storageKeys`, `gameplay`, and `ui`. Tile symbols are exactly `.`, `#`, `P`, `B`, and `G`.
- Config keys/env vars: `.env.example` includes only local non-secret defaults for `APP_ENV`, `HOST`, `PORT`, `SHARED_CONTRACT_PATH`, `LEVELS_PATH`, `PROGRESS_PATH`, `CORS_ALLOWED_ORIGINS`, `TRUSTED_HOSTS`, and `ENABLE_PROGRESS_API`.
- Error codes/messages: none.

## Requirements

### Functional

- FR-1: Create backend/frontend/shared/tests/tools directories required by later specs.
- FR-2: Create package markers or `.gitkeep` files only where needed.
- FR-3: Create `shared/app_contract.json` as valid JSON using the contract names and boundaries in this spec.
- FR-4: Create `shared/COMMUNICATION_CONTRACT.md` explaining contract fields.
- FR-5: Create `.env.example` with non-secret local defaults.
- FR-6: Update the existing `README.md` with local-first purpose, scaffold status, setup sequence, and dependency-approval note.
- FR-7: Update `.gitignore` only for local/generated files relevant to the scaffold, including `.local/` for future local progress data.

### Non-functional

- Performance: not applicable.
- Security/privacy: no secrets or user-specific data are introduced.
- Accessibility: no behavior yet.
- Observability: validation commands must prove JSON and scaffold sanity.
- Maintainability: scaffold paths should match `docs/repo-map.md`.

## Dependencies and approvals

- Prerequisite specs/plans: `SPEC-0000`.
- Existing files to read first: `docs/repo-map.md`, `docs/adr/ADR-0000-architecture-direction.md`, existing `README.md`, and existing `.gitignore`.
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

- Risk: scaffold marker files are mistaken for implementation.
  - Mitigation: keep scaffold marker files minimal and explicitly behavior-free.
- Open questions: none for this scaffold slice.

## Stop conditions

- Completing the scaffold requires a dependency, network, CI, deployment, or security-policy action.
- Product behavior or gameplay code becomes necessary.
- Shared contract values require invention beyond the contract names and boundaries in this spec.
