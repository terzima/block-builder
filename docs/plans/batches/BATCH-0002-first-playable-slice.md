# BATCH-0002 - Backend Levels API

Status: Draft
Approval Class: A3
Batch Type: Backend API
User-testable: No
Human gate: No after dependency approval

## Purpose

Execute the backend prerequisite for the first playable slice: approved Python dependencies, FastAPI config/static/levels APIs, exact first-five level data, validator, and backend tests.

Filename note: this file previously bundled the entire first playable slice. It now represents only the backend/API batch so dependency approval and frontend UX review are not mixed in one execution gate.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0002-backend-levels-api.md` | Accepted backend API and validation requirements. |
| Plan | `docs/plans/PLAN-0002-backend-levels-api.md` | M4 backend executable tasks, dependency stop point, fixtures, and checks. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Stack and component ownership. |

## Scope summary

### In scope

- A3 dependency/network approval request and approved dependency declaration.
- FastAPI module-level `app`.
- Public config, health, static root, shared contract, levels list, and level detail routes.
- Exact first-five level fixture from `PLAN-0002`.
- Level validation service and CLI.
- Backend API and validation tests.
- README and repo-map backend command updates.

### Out of scope

- Frontend gameplay or UI behavior.
- Optional progress API.
- Levels 6-100, generator, solver, accounts, cloud saves, analytics, deployment, hosting, TLS, CI changes, frontend frameworks, build steps, and lockfiles unless separately approved.

## Execution contract

- Agent may continue automatically: only after A3 dependency/network approval is granted.
- Dependency/network approval required before start: Yes, before dependency manifest edits or install commands.
- Human checkpoint timing: none after dependency approval because API/validation behavior is machine-verifiable.
- Special constraints:
  - Use `PLAN-0002` exact level JSON.
  - Keep backend out of gameplay state transitions.
  - Do not register progress routes.
  - Do not proceed into `PLAN-0003` frontend work under this batch.

## Required checks

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
git diff --check
git diff --stat
git diff
```

Expected evidence:

- Validator prints `Validated 5 levels from backend/app/data/levels.json`.
- Pytest exits `0`.
- No lockfile is created unless separately approved.

## Human checks

- None after dependency approval.

## Stop conditions

- A3 dependency/network approval is denied.
- Package/version choices need to change.
- API paths must diverge from `shared/app_contract.json`.
- Level data requires gameplay-rule changes.
- Frontend gameplay, progress API, CI, deployment, secrets, external services, or files outside `PLAN-0002` become necessary.

## Commit strategy

- Suggested local commit: `feat(backend): add levels API`
- Remote push/PR: requires explicit approval.

## Final report

Report:

1. Batch status.
2. A3 dependency approval outcome.
3. Files changed.
4. Exact backend routes implemented.
5. Validator and pytest results.
6. Lockfile status.
7. Deviations and Change Requests.
8. Whether `BATCH-0003` is unblocked.
