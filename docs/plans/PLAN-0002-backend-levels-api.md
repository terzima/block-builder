# PLAN-0002: Backend Levels API

Status: Draft
Maturity: M3
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0002-backend-levels-api.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Implement local FastAPI config/static/levels APIs and validator-backed first-five level data.

**Architecture:** Backend reads the shared contract, registers routes under the contract prefix, serves static/shared assets, validates level JSON at startup, and exposes level metadata/detail without owning gameplay moves.

**Tech stack:** Python, FastAPI, Pydantic, Uvicorn, pytest after explicit dependency approval.

## Preconditions

- [ ] `SPEC-0002` is accepted.
- [ ] `PLAN-0001` is complete.
- [ ] Backend dependency and network/install approvals are granted before manifest or install work.

## File structure

- Create/modify: `pyproject.toml` - approved Python metadata/dependencies.
- Create/modify: `backend/app/main.py` - app factory/routes/static serving/startup validation.
- Create/modify: `backend/app/settings.py` - environment parsing and defaults.
- Create/modify: `backend/app/schemas.py` - Pydantic schemas.
- Create/modify: `backend/app/middleware.py` - CORS/trusted-host/logging/structured error setup.
- Create/modify: `backend/app/services/level_service.py` - load, validate, list, and fetch levels.
- Create/modify: `backend/app/data/levels.json` - first-five levels.
- Create/modify: `tools/validate_levels.py` - CLI validator.
- Create/modify: `tests/test_api.py`, `tests/test_level_validation.py` - backend tests.
- Modify: `README.md`, `docs/repo-map.md` - actual backend commands.

## Contracts to implement

- API:
  - `GET /api/v1/health` returns `status`, `appName`, `version`.
  - `GET /api/v1/config` returns public contract.
  - `GET /api/v1/levels` returns metadata list without full grids.
  - `GET /api/v1/levels/{levelId}` returns one full level.
- Schemas: `LevelMeta`, `LevelDefinition`, `ProgressState`, `ApiError`.
- Error: unknown level returns `LEVEL_NOT_FOUND`.
- Validation rules: unique/sequential IDs, rectangular legal-symbol grids, one `P`, one `G`, matching dimensions, boundary warnings/errors.

## Tasks

### Task 0: Preflight and approval

**Files:** None

- [ ] Run `git status --short`.
- [ ] Stop for dependency/network approval before editing dependency manifests or installing packages.

### Task 1: Tests and fixtures

**Files:** `tests/test_api.py`, `tests/test_level_validation.py`, `backend/app/data/levels.json`

- [ ] Add first-five level JSON.
- [ ] Write tests for health, config, levels list/detail, unknown level, and invalid validation fixtures.
- [ ] Run focused tests and confirm expected failures before implementation.

### Task 2: Level service and schemas

**Files:** `backend/app/services/level_service.py`, `backend/app/schemas.py`, `tools/validate_levels.py`

- [ ] Implement schema models and validation rules.
- [ ] Share validation logic between service and CLI.
- [ ] Run JSON validation and validator CLI.

### Task 3: App wiring

**Files:** `backend/app/main.py`, `settings.py`, `middleware.py`

- [ ] Load settings and contract.
- [ ] Register middleware, API routes, static frontend root, and shared contract route.
- [ ] Return structured errors.
- [ ] Run backend tests.

### Task 4: Documentation

**Files:** `README.md`, `docs/repo-map.md`

- [ ] Add actual approved backend setup/run/test commands.
- [ ] Document any skipped optional progress API work.

## Validation

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

Optional smoke after approved setup:

```bash
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

## Documentation updates

- `README.md`
- `docs/repo-map.md`

## Rollback plan

Revert the backend commit. Revert dependency manifest/lockfile changes together if they were approved and created.

## Risks

- Risk: dependency approval blocks implementation.
  - Mitigation: stop before manifest/install work.
- Risk: first-five level data has source mistakes.
  - Mitigation: validator catches structural issues; gameplay solvability remains frontend/manual.

## Stop conditions

- Dependency approval is denied.
- API paths must diverge from `shared/app_contract.json`.
- Level data requires gameplay-rule changes.
- CI, deployment, secrets, external services, or frontend gameplay are needed.
