# SPEC-0002: Backend Levels API

Status: Accepted
Approval Class: A3
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0002-backend-levels-api.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `SPEC-0001`, `docs/repo-map.md`, `docs/adr/ADR-0000-architecture-direction.md`, `shared/app_contract.json`.
- Current evidence: `BATCH-0001` created the backend package markers, static frontend shell, shared contract, `.env.example`, and placeholder test/tool directories.
- Why this slice now: frontend gameplay needs same-origin config, static serving, validator-backed level data, and stable level API responses.

## Problem

The frontend needs a local FastAPI backend that serves public config, static files, first-five level data, and validator-backed level APIs without owning gameplay rules.

## Goals

- Implement FastAPI app setup and route registration under the shared contract prefix.
- Serve the static frontend shell and shared contract file.
- Serve level metadata and level detail for levels 1-5.
- Validate level data through shared service logic and a CLI validator.
- Expose structured API errors and request logging.
- Cover backend API and validation behavior with tests.

## Non-goals

- Frontend gameplay or movement logic.
- Backend-owned game state transitions, movement validation, solving, or level completion checks.
- Optional progress API implementation.
- Accounts, cloud saves, analytics, deployment, TLS, levels 6-100, generator tooling, solver tooling, CI changes, or production hosting.

## Users / actors

- Frontend app: loads contract, config, level list, and selected level.
- Developer/agent: runs validator and backend tests.
- Local player: indirectly receives level data through the frontend.

## Behavioral contract

- User-visible behavior: visiting `/` returns the static frontend shell; API clients can retrieve health, config, level list, and level detail.
- System responsibilities: backend serves assets/config/levels, validates level data, logs concise request metadata, and returns structured errors.
- Explicitly unchanged behavior: frontend remains responsible for input, movement, gravity, win detection, reset, undo, and progress storage.

## Interface and data contract

- Files or modules: `pyproject.toml`, `backend/app/main.py`, `backend/app/settings.py`, `backend/app/schemas.py`, `backend/app/middleware.py`, `backend/app/services/level_service.py`, `backend/app/data/levels.json`, `tools/validate_levels.py`, `tests/test_api.py`, `tests/test_level_validation.py`.
- Public functions/classes:
  - `app`: the module-level FastAPI application instance in `backend/app/main.py`.
  - `get_settings()`: returns resolved local settings.
  - `load_contract(path)`: reads and returns the shared contract JSON.
  - `load_levels(path)`: reads level JSON and returns validated level definitions.
  - `validate_levels(levels, contract)`: returns validated levels or raises a validation error with a rule code and message.
  - `list_level_meta(levels)`: returns metadata without grids.
  - `get_level(levels, level_id)`: returns one level or raises `LEVEL_NOT_FOUND`.
- API routes:
  - `GET /api/v1/health` returns `HealthResponse`.
  - `GET /api/v1/config` returns `ConfigResponse`.
  - `GET /api/v1/levels` returns `LevelListResponse`.
  - `GET /api/v1/levels/{levelId}` returns `LevelDefinition`.
  - `GET /shared/app_contract.json` returns the contract file.
  - `GET /` returns `frontend/index.html`.
- Config keys/env vars: `APP_ENV`, `HOST`, `PORT`, `SHARED_CONTRACT_PATH`, `LEVELS_PATH`, `PROGRESS_PATH`, `CORS_ALLOWED_ORIGINS`, `TRUSTED_HOSTS`, `ENABLE_PROGRESS_API`.

### Response Shapes

`HealthResponse`:

```json
{
  "status": "ok",
  "appName": "Block Builder",
  "version": "0.1.0"
}
```

`ConfigResponse`:

```json
{
  "contract": {
    "version": "0.1.0",
    "appName": "Block Builder",
    "api": {},
    "static": {},
    "tiles": {},
    "actions": {},
    "keyboard": {},
    "storageKeys": {},
    "gameplay": {},
    "ui": {}
  }
}
```

The empty objects above represent the exact corresponding objects loaded from `shared/app_contract.json`; implementation must not add private settings to this response.

`LevelMeta`:

```json
{
  "id": 1,
  "slug": "level-1",
  "title": "Level 1",
  "width": 8,
  "height": 6,
  "difficulty": 1
}
```

`LevelDefinition`:

```json
{
  "id": 1,
  "slug": "level-1",
  "title": "Level 1",
  "width": 8,
  "height": 6,
  "difficulty": 1,
  "grid": [
    "########",
    "#......#",
    "#..B...#",
    "#..P.G.#",
    "#......#",
    "########"
  ]
}
```

`LevelListResponse`:

```json
{
  "levels": [
    {
      "id": 1,
      "slug": "level-1",
      "title": "Level 1",
      "width": 8,
      "height": 6,
      "difficulty": 1
    }
  ]
}
```

`ApiError` envelope:

```json
{
  "error": {
    "code": "LEVEL_NOT_FOUND",
    "message": "Level not found.",
    "details": {
      "levelId": 99
    }
  }
}
```

### Level Data Invariants

- `backend/app/data/levels.json` top-level shape is `{ "levels": LevelDefinition[] }`.
- Exactly five levels are present for this slice.
- Level IDs are integers `1`, `2`, `3`, `4`, and `5`.
- `slug` is unique, lowercase kebab-case, and matches `level-{id}` for the first-five slice.
- `title` is non-empty.
- `difficulty` is an integer from `1` through `5`.
- `width` equals every grid row length.
- `height` equals the number of grid rows.
- Grid rows are rectangular and non-empty.
- Legal symbols are exactly the shared contract tile symbols: `.`, `#`, `P`, `B`, `G`.
- Each level has exactly one `P` and exactly one `G`.
- Each level has at least one `B`.
- Boundary rows and boundary columns are all `#`.
- No level contains additional symbols or gameplay entities.
- The exact first-five level grids must be carried by the accepted M4 plan or a durable fixture doc created before implementation. Implementation must not reread `docs/intake/PROJECT_OVERVIEW_RAW.md` to invent level data.

### Validation Error Codes

- `LEVELS_FILE_NOT_FOUND`: level JSON path does not exist.
- `LEVELS_JSON_INVALID`: level JSON cannot be parsed.
- `LEVELS_ROOT_INVALID`: top-level JSON is not an object with a `levels` array.
- `LEVEL_ID_SEQUENCE_INVALID`: IDs are missing, duplicated, or not sequential `1` through `5`.
- `LEVEL_SLUG_INVALID`: slug is missing, duplicated, or does not match the accepted slug rule.
- `LEVEL_DIMENSIONS_INVALID`: width/height are missing or do not match the grid.
- `LEVEL_GRID_EMPTY`: grid is empty.
- `LEVEL_GRID_NOT_RECTANGULAR`: grid rows have inconsistent lengths.
- `LEVEL_TILE_INVALID`: grid contains a symbol outside the shared contract tile set.
- `LEVEL_PLAYER_COUNT_INVALID`: grid does not contain exactly one player tile.
- `LEVEL_GOAL_COUNT_INVALID`: grid does not contain exactly one goal tile.
- `LEVEL_BLOCK_COUNT_INVALID`: grid does not contain at least one block tile.
- `LEVEL_BOUNDARY_INVALID`: outer grid boundary is not fully walled.
- `LEVEL_NOT_FOUND`: requested level ID does not exist.

## Requirements

### Functional

- FR-1: Load `shared/app_contract.json` at startup or app creation.
- FR-2: Register API routes under `contract.api.prefix`.
- FR-3: Serve `/shared/app_contract.json` from the repo contract file.
- FR-4: Serve `/` from `frontend/index.html`.
- FR-5: Provide health, config, level list, and level detail endpoints with the response shapes in this spec.
- FR-6: Add exactly five validated levels using durable plan-provided level JSON.
- FR-7: Validate all level data invariants in this spec before serving level API responses.
- FR-8: Add CLI validation using the same core rules as backend startup validation.
- FR-9: Add backend API and validation tests for happy paths and each validation error family.
- FR-10: Keep progress API out of scope even though the shared contract reserves a route name.

### Non-functional

- Performance: file-based contract and level loading is acceptable for first-five data.
- Security/privacy: no secrets, accounts, cloud persistence, or user-specific progress files are introduced.
- Accessibility: not applicable to backend.
- Observability: request logging includes method, path, status, and elapsed time; API errors use the structured envelope.
- Maintainability: route paths derive from `shared/app_contract.json`, and validation logic is shared between backend service and CLI.

## Dependencies and approvals

- Prerequisite specs/plans: accepted and completed `SPEC-0001`/`PLAN-0001`.
- Existing files to read first: `shared/app_contract.json`, `frontend/index.html`, `README.md`, `.env.example`, `docs/repo-map.md`.
- Approval class: A3 before dependency declaration, dependency installation, lockfile creation, or network-backed commands.
- Dependency rationale:
  - FastAPI: required for local API routing and static serving.
  - Pydantic: required for response/data validation if not bundled by the selected FastAPI version.
  - Uvicorn: required local ASGI server for smoke testing.
  - pytest: required backend automated tests.
  - Any version choices, license notes, advisory checks, lockfile impact, and rollback plan must be included in the A3 dependency approval request before editing dependency manifests.

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

- Optional local smoke after approved dependency setup: start Uvicorn and visit `/`, `/api/v1/health`, `/api/v1/config`, `/api/v1/levels`, and `/api/v1/levels/1`.

## Risks and open questions

- Risk: dependency installation requires A3 approval.
  - Mitigation: stop before manifest or install work until approval is granted.
- Risk: first-five level grids are not yet durable outside raw intake material.
  - Mitigation: the M4 plan must include exact level JSON or create a durable fixture doc before implementation.
- Open questions: none for progress API timing; progress API is out of scope for this spec.

## Stop conditions

- Dependency approval is not granted.
- API paths must diverge from `shared/app_contract.json`.
- Level data requires gameplay-rule changes.
- Exact first-five level grids are not available in the accepted plan or a durable fixture doc.
- CI, deployment, secrets, external services, or frontend gameplay become necessary.
