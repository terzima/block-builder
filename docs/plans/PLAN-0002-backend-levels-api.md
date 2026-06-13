# PLAN-0002: Backend Levels API

Status: Ready for Implementation
Approval Class: A3
Maturity: M4
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0002-backend-levels-api.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Implement local FastAPI config/static/levels APIs and validator-backed first-five level data.

**Architecture:** The backend loads `shared/app_contract.json`, registers routes under the contract prefix, serves static/shared files, validates `backend/app/data/levels.json`, and exposes level metadata/detail without owning gameplay state or movement rules.

**Tech stack:** Python 3.11+, FastAPI, Pydantic, Uvicorn, pytest, standard-library JSON/path/env helpers.

## Preconditions

- [ ] `SPEC-0002` is accepted.
- [ ] `PLAN-0001` and `BATCH-0001` are complete.
- [ ] Root `.env.example`, `frontend/index.html`, `shared/app_contract.json`, and backend package marker files exist from the scaffold batch.
- [ ] Stop before editing `pyproject.toml`, installing packages, creating lockfiles, or running network-backed commands until A3 dependency/network approval is granted.

## File structure

| Action | Path | Responsibility |
|---|---|---|
| Create | `pyproject.toml` | Python project metadata, exact approved dependency declarations, pytest config. |
| Create | `backend/app/main.py` | Module-level `app = FastAPI(...)`, lifespan data loading, API routes, static file responses, exception handlers. |
| Create | `backend/app/settings.py` | Environment parsing, repo-root path defaults, settings dataclass, `get_settings()`. |
| Create | `backend/app/schemas.py` | Pydantic response/data models and `LevelValidationError`. |
| Create | `backend/app/middleware.py` | Request logging and optional CORS/trusted-host middleware registration. |
| Modify | `backend/app/services/level_service.py` | Contract/level loading, validation rules, metadata/detail helpers. |
| Create | `backend/app/data/levels.json` | Exact first-five level fixture from this plan. |
| Create | `tools/validate_levels.py` | CLI validator that reuses `level_service` validation. |
| Create | `tests/test_api.py` | FastAPI route tests and error-envelope assertions. |
| Create | `tests/test_level_validation.py` | Validation success and failure-code assertions. |
| Modify | `README.md` | Backend setup, run, validator, and test commands after approval. |
| Modify | `docs/repo-map.md` | Update backend commands from expected to current once implemented. |

No other files are in scope for this plan.

## Dependency approval stop point

Before dependency manifest edits or install commands, request A3 approval for this package set:

| Package | Version constraint | Scope | Why needed | License note | Rollback |
|---|---|---|---|---|---|
| `fastapi` | `==0.115.6` | production | ASGI routing, response models, static/file responses. | Known as MIT in public package metadata; verify during approved install. | Remove from `pyproject.toml` and backend route code. |
| `pydantic` | `==2.10.4` | production | Direct model validation imports used by `schemas.py`. | Known as MIT in public package metadata; verify during approved install. | Replace with dataclass/manual validation or remove backend slice. |
| `uvicorn` | `==0.34.0` | production/local run | Local ASGI server for smoke testing. | Known as BSD-3-Clause in public package metadata; verify during approved install. | Remove run command and dependency. |
| `pytest` | `==8.3.4` | dev | Backend API and validation tests. | Known as MIT in public package metadata; verify during approved install. | Remove dev dependency and tests cannot run. |

Approval request must also state:

- Alternatives considered: Flask was rejected because ADR/spec expect FastAPI; unittest-only was rejected because API tests need concise fixtures; no-backend was rejected because frontend requires same-origin API/contract serving.
- Security/advisory consideration: run approved package metadata/advisory review if available in the environment; otherwise record that advisory verification was not available locally.
- Lockfile impact: no lockfile is planned for this batch; do not create or commit one unless separately approved.
- Network impact: `python -m pip install -e ".[dev]"` may access package indexes.

Exact `pyproject.toml` target after approval:

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "block-builder"
version = "0.1.0"
description = "Local Block Builder puzzle prototype"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
  "fastapi==0.115.6",
  "pydantic==2.10.4",
  "uvicorn==0.34.0",
]

[project.optional-dependencies]
dev = [
  "pytest==8.3.4",
]

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["."]
```

## Contracts to implement

### Settings

`backend/app/settings.py`:

- `Settings` is a frozen dataclass with fields:
  - `app_env: str = "local"`
  - `host: str = "127.0.0.1"`
  - `port: int = 8000`
  - `repo_root: Path`
  - `shared_contract_path: Path`
  - `levels_path: Path`
  - `progress_path: Path`
  - `cors_allowed_origins: tuple[str, ...] = ()`
  - `trusted_hosts: tuple[str, ...] = ("127.0.0.1", "localhost")`
  - `enable_progress_api: bool = False`
- `get_settings(env: Mapping[str, str] | None = None) -> Settings`
  - Defaults `repo_root` to `Path(__file__).resolve().parents[2]`.
  - Reads only the environment variables named in `SPEC-0002`.
  - Resolves relative paths from `repo_root`.
  - Parses comma-separated CORS/trusted-host lists by trimming blanks.
  - Parses `ENABLE_PROGRESS_API` as true only for `1`, `true`, or `yes`.
  - Does not read `.env`.

### Schemas and errors

`backend/app/schemas.py`:

- `class ApiErrorDetail(BaseModel)`: `code: str`, `message: str`, `details: dict[str, Any] = Field(default_factory=dict)`.
- `class ApiError(BaseModel)`: `error: ApiErrorDetail`.
- `class HealthResponse(BaseModel)`: `status: Literal["ok"]`, `appName: str`, `version: str`.
- `class ConfigResponse(BaseModel)`: `contract: dict[str, Any]`.
- `class LevelMeta(BaseModel)`: `id: int`, `slug: str`, `title: str`, `width: int`, `height: int`, `difficulty: int`.
- `class LevelDefinition(LevelMeta)`: `grid: list[str]`.
- `class LevelListResponse(BaseModel)`: `levels: list[LevelMeta]`.
- `class LevelValidationError(Exception)`:
  - Constructor accepts `code: str`, `message: str`, `details: dict[str, Any] | None = None`.
  - Public attributes are `code`, `message`, and `details`.

Do not add `ProgressState`; progress API is out of scope for `SPEC-0002`.

### Level service

`backend/app/services/level_service.py` exports:

- `load_contract(path: str | Path) -> dict[str, Any]`
  - Missing file raises `LevelValidationError("LEVELS_FILE_NOT_FOUND", "Contract file not found.", {"path": str(path)})`.
  - Invalid JSON raises `LevelValidationError("LEVELS_JSON_INVALID", "Contract JSON is invalid.", {"path": str(path)})`.
- `load_levels(path: str | Path) -> list[LevelDefinition]`
  - Missing file raises `LEVELS_FILE_NOT_FOUND`.
  - Invalid JSON raises `LEVELS_JSON_INVALID`.
  - Invalid top-level shape raises `LEVELS_ROOT_INVALID`.
  - Calls `validate_levels(raw_levels, load_contract(get_settings().shared_contract_path))`.
- `validate_levels(levels: Any, contract: Mapping[str, Any]) -> list[LevelDefinition]`
  - Applies every invariant and error code from `SPEC-0002`.
  - Returns `LevelDefinition` instances sorted by `id`.
  - Stops on the first validation failure.
- `list_level_meta(levels: Sequence[LevelDefinition]) -> list[LevelMeta]`
  - Returns all fields except `grid`, sorted by `id`.
- `get_level(levels: Sequence[LevelDefinition], level_id: int) -> LevelDefinition`
  - Missing ID raises `LevelValidationError("LEVEL_NOT_FOUND", "Level not found.", {"levelId": level_id})`.

Validation details:

- Legal tile symbols are read from `contract["tiles"]` values and must equal the accepted set `{".", "#", "P", "B", "G"}`.
- Boundary validation fails if any cell in the first row, last row, first column, or last column is not `#`.
- Dimension validation fails if `width` or `height` is not an integer, is less than 3, or does not match `grid`.
- Slug validation requires exactly `level-{id}` for levels 1-5.
- ID validation requires exactly `[1, 2, 3, 4, 5]`.

### Middleware

`backend/app/middleware.py` exports:

- `configure_middleware(app: FastAPI, settings: Settings) -> None`
  - Adds CORS middleware only when `settings.cors_allowed_origins` is non-empty.
  - Adds trusted-host middleware only when `settings.trusted_hosts` is non-empty.
- `install_request_logging(app: FastAPI) -> None`
  - Adds middleware that logs one line per request with method, path, status, and elapsed milliseconds.

### FastAPI app

`backend/app/main.py`:

- Defines `settings = get_settings()`.
- Defines an async lifespan function that stores:
  - `app.state.contract = load_contract(settings.shared_contract_path)`
  - `app.state.levels = load_levels(settings.levels_path)`
- Defines exactly `app = FastAPI(title="Block Builder", version="0.1.0", lifespan=lifespan)`.
- Does not define or export `create_app`.
- Calls `configure_middleware(app, settings)` and `install_request_logging(app)`.
- Registers exception handling for `LevelValidationError`:
  - `LEVEL_NOT_FOUND` -> HTTP 404 and the `ApiError` envelope.
  - Other `LEVEL_*` errors -> HTTP 500 and the `ApiError` envelope.
- Registers routes:
  - `GET /api/v1/health` -> `HealthResponse(status="ok", appName=contract["appName"], version=contract["version"])`.
  - `GET /api/v1/config` -> `ConfigResponse(contract=contract)`.
  - `GET /api/v1/levels` -> `LevelListResponse(levels=list_level_meta(levels))`.
  - `GET /api/v1/levels/{level_id}` -> `get_level(levels, level_id)`.
  - `GET /shared/app_contract.json` -> repo contract file response.
  - `GET /` -> `frontend/index.html` file response.
- Route paths must come from `shared/app_contract.json` route values where present; `/` is the static frontend root.
- Does not register progress routes even when `ENABLE_PROGRESS_API=true`.

## Exact level data

Create `backend/app/data/levels.json` with exactly:

```json
{
  "levels": [
    {
      "id": 1,
      "slug": "level-1",
      "title": "First Steps",
      "width": 8,
      "height": 6,
      "difficulty": 1,
      "grid": [
        "########",
        "#......#",
        "#......#",
        "#..B...#",
        "#P...G.#",
        "########"
      ]
    },
    {
      "id": 2,
      "slug": "level-2",
      "title": "Low Bridge",
      "width": 8,
      "height": 6,
      "difficulty": 2,
      "grid": [
        "########",
        "#......#",
        "#......#",
        "#.B....#",
        "#P.#.G.#",
        "########"
      ]
    },
    {
      "id": 3,
      "slug": "level-3",
      "title": "Stacked Path",
      "width": 8,
      "height": 6,
      "difficulty": 3,
      "grid": [
        "########",
        "#......#",
        "#..B...#",
        "#.B....#",
        "#P...G.#",
        "########"
      ]
    },
    {
      "id": 4,
      "slug": "level-4",
      "title": "Carry Over",
      "width": 8,
      "height": 6,
      "difficulty": 4,
      "grid": [
        "########",
        "#......#",
        "#......#",
        "#..B...#",
        "#P.#.G.#",
        "########"
      ]
    },
    {
      "id": 5,
      "slug": "level-5",
      "title": "Final Lift",
      "width": 8,
      "height": 6,
      "difficulty": 5,
      "grid": [
        "########",
        "#......#",
        "#..B...#",
        "#......#",
        "#P.#G..#",
        "########"
      ]
    }
  ]
}
```

If these fixtures are rejected for product reasons, stop and update the plan before implementation.

## Test fixtures and assertions

### `tests/test_level_validation.py`

Use `pytest`, `tmp_path`, `json`, and direct service imports.

- `test_plan_level_file_is_valid`
  - Calls `load_levels(Path("backend/app/data/levels.json"))`.
  - Asserts IDs `[1, 2, 3, 4, 5]`.
  - Asserts every returned item is a `LevelDefinition`.
- `test_list_level_meta_omits_grid`
  - Calls `list_level_meta(load_levels(...))`.
  - Asserts no serialized meta object contains `grid`.
- `test_get_level_returns_exact_level`
  - Calls `get_level(levels, 1)`.
  - Asserts `slug == "level-1"` and `title == "First Steps"`.
- `test_get_level_missing_raises_level_not_found`
  - Calls `get_level(levels, 99)`.
  - Asserts `exc.value.code == "LEVEL_NOT_FOUND"` and `details == {"levelId": 99}`.
- Parameterized validation failures:

| Case | Fixture mutation | Expected code |
|---|---|---|
| missing file | call `load_levels(tmp_path / "missing.json")` | `LEVELS_FILE_NOT_FOUND` |
| invalid JSON | write `{` | `LEVELS_JSON_INVALID` |
| invalid root | write `[]` | `LEVELS_ROOT_INVALID` |
| duplicate ID | set level 2 `id` to `1` | `LEVEL_ID_SEQUENCE_INVALID` |
| bad slug | set level 1 `slug` to `bad` | `LEVEL_SLUG_INVALID` |
| bad dimensions | set level 1 `width` to `99` | `LEVEL_DIMENSIONS_INVALID` |
| empty grid | set level 1 `grid` to `[]` | `LEVEL_GRID_EMPTY` |
| ragged grid | append `"#"` to one row | `LEVEL_GRID_NOT_RECTANGULAR` |
| invalid tile | replace one `.` with `X` | `LEVEL_TILE_INVALID` |
| missing player | replace `P` with `.` | `LEVEL_PLAYER_COUNT_INVALID` |
| missing goal | replace `G` with `.` | `LEVEL_GOAL_COUNT_INVALID` |
| missing block | replace all `B` with `.` | `LEVEL_BLOCK_COUNT_INVALID` |
| open boundary | replace first row first char with `.` | `LEVEL_BOUNDARY_INVALID` |

Each parameterized case asserts `exc.value.code == expected_code`.

### `tests/test_api.py`

Use `fastapi.testclient.TestClient` with `backend.app.main.app`.

- `test_health_response`
  - `GET /api/v1/health`.
  - Asserts status `200` and body exactly has `status: "ok"`, `appName: "Block Builder"`, `version: "0.1.0"`.
- `test_config_response_is_public_contract`
  - `GET /api/v1/config`.
  - Asserts status `200`.
  - Asserts response has `contract.version`, `contract.appName`, `contract.api`, `contract.tiles`, `contract.actions`, `contract.keyboard`, `contract.storageKeys`, `contract.gameplay`, and `contract.ui`.
  - Asserts no top-level private env keys such as `HOST`, `PORT`, or `LEVELS_PATH`.
- `test_levels_list_omits_grids`
  - `GET /api/v1/levels`.
  - Asserts five levels, IDs `[1, 2, 3, 4, 5]`, and no `grid` key in any item.
- `test_level_detail_returns_grid`
  - `GET /api/v1/levels/1`.
  - Asserts title `First Steps`, dimensions `8` by `6`, and grid length `6`.
- `test_unknown_level_uses_error_envelope`
  - `GET /api/v1/levels/99`.
  - Asserts status `404`.
  - Asserts body equals:

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

- `test_shared_contract_file_route`
  - `GET /shared/app_contract.json`.
  - Asserts status `200` and JSON `appName == "Block Builder"`.
- `test_frontend_root_serves_html`
  - `GET /`.
  - Asserts status `200`, content type contains `text/html`, and body contains `<main`.

## Tasks

### Task 0: Preflight and A3 stop

**Files:** None

- [ ] Run:

```bash
git status --short
```

- [ ] Confirm only expected local docs/worktree changes are present.
- [ ] Request and receive A3 dependency/network approval using the dependency approval stop point above.
- [ ] Stop if approval is denied or package/version choices must change.

### Task 1: Dependency manifest after approval

**Files:** `pyproject.toml`

- [ ] Create `pyproject.toml` with the exact target content above.
- [ ] Run approved install:

```bash
python -m pip install -e ".[dev]"
```

- [ ] Expected result: command exits `0`; no lockfile is created.

### Task 2: Backend tests first

**Files:** `tests/test_api.py`, `tests/test_level_validation.py`, `backend/app/data/levels.json`

- [ ] Create `backend/app/data/levels.json` with the exact fixture in this plan.
- [ ] Add tests and validation fixtures exactly as listed.
- [ ] Run:

```bash
pytest tests/test_api.py tests/test_level_validation.py
```

- [ ] Expected result before implementation: failing tests due missing app/service behavior, not syntax errors in the tests.

### Task 3: Schemas and level service

**Files:** `backend/app/schemas.py`, `backend/app/services/level_service.py`, `tools/validate_levels.py`

- [ ] Implement schemas, `LevelValidationError`, level loading, level validation, metadata, and lookup contracts.
- [ ] Implement CLI:
  - Default path: `backend/app/data/levels.json`.
  - Optional first argument overrides path.
  - Success prints exactly `Validated 5 levels from backend/app/data/levels.json`.
  - Failure prints `ERROR_CODE: Error message.` to stderr and exits non-zero.
- [ ] Run:

```bash
python3 -m json.tool backend/app/data/levels.json >/dev/null
python tools/validate_levels.py
pytest tests/test_level_validation.py
```

- [ ] Expected result: all commands exit `0`; validator prints the exact success line.

### Task 4: App wiring

**Files:** `backend/app/main.py`, `backend/app/settings.py`, `backend/app/middleware.py`

- [ ] Implement settings, middleware registration, lifespan data loading, route handlers, static file responses, and error handlers exactly as contracted.
- [ ] Run:

```bash
pytest tests/test_api.py tests/test_level_validation.py
```

- [ ] Expected result: all backend tests pass.

### Task 5: Documentation

**Files:** `README.md`, `docs/repo-map.md`

- [ ] Update README backend section with:
  - A3 dependency approval prerequisite.
  - `python -m pip install -e ".[dev]"`.
  - `python tools/validate_levels.py`.
  - `pytest tests/test_api.py tests/test_level_validation.py`.
  - `uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000`.
- [ ] Update repo map so backend commands are marked current after implementation.
- [ ] Do not document progress API as implemented.

## Validation

Required after implementation:

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

Expected pass evidence:

- JSON commands exit `0`.
- Validator prints `Validated 5 levels from backend/app/data/levels.json`.
- Pytest exits `0` with no failures.
- `git diff --check` prints no output.

Optional smoke after approved setup:

```bash
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Expected smoke:

- Uvicorn starts without import errors.
- `GET /` returns HTML.
- `GET /api/v1/health` returns `200`.
- `GET /api/v1/config` returns `200`.
- `GET /api/v1/levels` returns five level metadata records.
- `GET /api/v1/levels/1` returns a grid.

## Documentation updates

- `README.md`
- `docs/repo-map.md`

## Rollback plan

Revert the backend commit. Revert `pyproject.toml` and any approved dependency metadata together with backend code and tests. Remove uncommitted local virtualenv artifacts if they were created outside git-tracked files.

## Risks

- Risk: dependency approval blocks implementation.
  - Mitigation: this plan stops before manifest/install work.
- Risk: package versions are unavailable in the approved install environment.
  - Mitigation: stop and update the dependency approval request before changing versions.
- Risk: first-five level fixtures are product-rejected.
  - Mitigation: stop and update this plan before implementation.

## Stop conditions

- A3 dependency/network approval is denied.
- Package/version choices need to change.
- API paths must diverge from `shared/app_contract.json`.
- Level data requires gameplay-rule changes.
- CI, deployment, secrets, external services, frontend gameplay, or progress API behavior become necessary.
