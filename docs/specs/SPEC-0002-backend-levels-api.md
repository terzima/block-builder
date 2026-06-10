# SPEC-0002: Backend Levels API

Status: Draft
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0002-backend-levels-api.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `SPEC-0001`, `docs/repo-map.md`, `docs/intake/PROJECT_OVERVIEW_RAW.md`.
- Current evidence: backend app and shared contract are expected from `SPEC-0001`.
- Why this slice now: frontend gameplay needs contract/config and level data served consistently.

## Problem

The frontend needs a local FastAPI backend that serves public config, static files, first-five level data, and validator-backed level APIs without owning gameplay rules.

## Goals

- Implement FastAPI app setup and route registration under the shared contract prefix.
- Serve shared contract, static frontend root, level metadata, and level detail.
- Validate first-five level data and expose structured API errors.
- Cover backend behavior with tests.

## Non-goals

- Frontend gameplay, backend movement logic, accounts, cloud saves, analytics, deployment, TLS, levels 6-100, generator/solver tooling.

## Users / actors

- Frontend app: loads contract and levels.
- Developer/agent: runs validation and backend tests.
- Local player: indirectly receives level data through the frontend.

## Behavioral contract

- User-visible behavior: visiting `/` loads the static frontend shell once present.
- System responsibilities: backend serves assets/config/levels and validates data; frontend remains responsible for gameplay.
- Explicitly unchanged behavior: no backend-owned game loop or movement calculation.

## Interface and data contract

- Files or modules: `backend/app/main.py`, `settings.py`, `schemas.py`, `middleware.py`, `services/level_service.py`, `backend/app/data/levels.json`, `tools/validate_levels.py`.
- Public functions/classes: level service exposes contract loading, level loading, metadata list, level detail lookup, and validation.
- API routes:
  - `GET /api/v1/health` -> `{ "status": "ok", "appName": string, "version": string }`
  - `GET /api/v1/config` -> public shared contract fields.
  - `GET /api/v1/levels` -> `{ "levels": LevelMeta[] }`
  - `GET /api/v1/levels/{levelId}` -> `LevelDefinition`
- Data shapes/schemas: `LevelMeta`, `LevelDefinition`, `ProgressState` shape for future optional use, and `ApiError`.
- Config keys/env vars: names from `.env.example`.
- Error codes/messages: unknown level returns `LEVEL_NOT_FOUND`; malformed data errors must name the failed validation rule.

## Requirements

### Functional

- FR-1: Load `shared/app_contract.json` at startup.
- FR-2: Register API routes under `contract.api.prefix`.
- FR-3: Serve `/shared/app_contract.json`.
- FR-4: Serve `/` from `frontend/index.html`.
- FR-5: Provide health, config, level list, and level detail endpoints.
- FR-6: Add levels 1-5 exactly from the raw overview unless a Change Request accepts a correction.
- FR-7: Validate unique sequential IDs, rectangular grids, legal symbols, one `P`, one `G`, dimensions, and boundary expectations.
- FR-8: Add CLI validation using the same core rules.
- FR-9: Add backend API and validation tests.
- FR-10: Keep optional progress API deferred unless it remains local and small.

### Non-functional

- Performance: level loading can be file-based for first-five data.
- Security/privacy: no secrets, accounts, or cloud persistence.
- Accessibility: not applicable to backend.
- Observability: concise request logging and structured errors.
- Maintainability: route paths come from the shared contract.

## Dependencies and approvals

- Prerequisite specs/plans: `SPEC-0001`.
- Existing files to read first: `shared/app_contract.json`, `frontend/index.html`, raw first-five levels.
- Approval-required actions: dependency declaration/install for FastAPI, Uvicorn, Pydantic, pytest, and any lockfile/network work.

## Acceptance gates

### Automated

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
git diff --check
```

### Human

- Required? No after dependency approval
- Reason: API and validation behavior are machine-verifiable.

### Manual checks

- Optional local smoke: start Uvicorn and visit health/config/levels endpoints.

## Risks and open questions

- Risk: dependency installation requires network approval.
- Risk: copied level grids may contain source mistakes; validator should catch structural issues, not prove solvability.
- Open question: optional progress API timing remains deferred.

## Stop conditions

- Dependency approval is not granted.
- Backend route structure must diverge from the contract.
- Level data requires gameplay-rule changes.
- CI, deployment, secrets, external services, or frontend gameplay become necessary.
