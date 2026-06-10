# Current State

## Active Objective

`BATCH-0002` backend levels API is complete. Next step is `BATCH-0003` frontend gameplay UI.

## Active Contract

- Spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md` (Accepted)
- Plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
- Batch: `docs/plans/batches/BATCH-0003-first-playable-ui.md`
- Branch: `codex/application-scaffold`

## Current Status

- `BATCH-0002` complete. All 24 backend tests pass. Level validator passes. No lockfile created.
- Uncommitted working tree contains all BATCH-0002 implementation files plus prior doc remediation.
- `BATCH-0003` frontend work has not started.

## Last Completed Work

`BATCH-0002` — backend levels API:
- `pyproject.toml`: fastapi==0.115.6, pydantic==2.13.4 (resolved from `>=2.10.4,<3.0` for Python 3.14 wheel compatibility), uvicorn==0.34.0, pytest==8.3.4, httpx>=0.27.
- `backend/app/schemas.py`: Pydantic response models and `LevelValidationError`.
- `backend/app/settings.py`: frozen `Settings` dataclass and `get_settings()`.
- `backend/app/middleware.py`: CORS, trusted-host, and request-logging middleware.
- `backend/app/main.py`: lifespan data loading, all contracted routes, static file responses, error handlers.
- `backend/app/services/level_service.py`: contract/level loading, full validation suite, metadata/lookup helpers.
- `backend/app/data/levels.json`: exact first-five level fixture from PLAN-0002.
- `tools/validate_levels.py`: CLI validator.
- `tests/test_api.py`: 7 API route tests (module-scoped fixture).
- `tests/test_level_validation.py`: 17 service-layer tests.
- `README.md`, `docs/repo-map.md`: updated with backend commands.

## Known Deviations from PLAN-0002

- `pydantic==2.10.4` has no pre-built wheel for Python 3.14 macOS arm64; resolved to `pydantic==2.13.4` with user A3 approval.
- `httpx` added as dev dependency (required by `fastapi.testclient.TestClient`); approved by user.
- `[tool.setuptools.packages.find]` added to prevent setuptools flat-layout error.
- `test_api.py` uses module-scoped pytest fixture and `base_url="http://localhost"` to satisfy lifespan and TrustedHostMiddleware.
- `docs/operator/PROMPT_LIBRARY.md` has pre-existing uncommitted changes; not modified.
- Post-BATCH-0002 maintenance: `fastapi` upgraded `0.115.6→0.136.3` (A3 approved) to fix `asyncio.iscoroutinefunction` deprecation warnings from Python 3.14. Transitively pulled starlette `0.41.3→1.2.1` and `annotated-doc==0.0.4`. All 24 tests pass.
- Residual warning: `StarletteDeprecationWarning: Using httpx with starlette.testclient is deprecated; install httpx2 instead.` — test-only, does not affect runtime. Requires a separate A3 approval to swap `httpx→httpx2`.

## Next Action

Commit BATCH-0002 changes with `feat(backend): add levels API`. Then plan or start BATCH-0003.

## Stop Conditions (BATCH-0003)

- Frontend work requires gameplay-rule changes to level data or backend API.
- A dependency or network action is needed without explicit approval.
- Scope expands beyond `PLAN-0003` accepted files.

## Human Context Needed

- A2 UX/product review required at the BATCH-0003 first-playable checkpoint.
- Human decision needed on whether to update `docs/roadmap.md` to reflect the backend/frontend batch split.

## Last Updated

2026-06-10
