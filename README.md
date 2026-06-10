# Block Builder

Block Builder is a local-first deterministic grid block puzzle game. The project is managed through controlled specs, implementation plans, and execution batches so application behavior is added in small, reviewable slices.

## Current Status

- `BATCH-0001` complete: behavior-free application scaffold.
- `BATCH-0002` complete: backend levels API, level validation, and first-five level data.
- Frontend gameplay and playable UI are deferred to `BATCH-0003`.

## Scaffold Created By BATCH-0001

```text
backend/
  app/
    __init__.py
    services/
      __init__.py
    data/
      .gitkeep
frontend/
  index.html
  style.css
  js/
    .gitkeep
shared/
  app_contract.json
  COMMUNICATION_CONTRACT.md
tests/
  .gitkeep
  js/
    .gitkeep
tools/
  .gitkeep
.env.example
```

## Future Application Files

`docs/repo-map.md` lists the expected backend modules, frontend JavaScript modules, tests, level data, and tooling that later specs may add. Those files are intentionally not created by the scaffold batch because they imply behavior.

## Local Setup

1. Review `AGENTS.md` before starting agent work.
2. Use `.env.example` as the source for local environment overrides.
3. Do not commit `.env`, `.local/`, generated data, dependency directories, or logs.
4. A3 dependency/network approval is required before running install commands.

## Backend Setup (BATCH-0002)

Use only the repo `.venv`. Do not use system Python, global pip, or sudo.

```bash
# Install dependencies:
.venv/bin/python -m pip install -e ".[dev]"

# Validate level data:
.venv/bin/python tools/validate_levels.py

# Run backend tests:
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py

# Start local server:
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Routes available after server start:

- `GET /` — frontend HTML
- `GET /api/v1/health` — health check
- `GET /api/v1/config` — public app contract
- `GET /api/v1/levels` — level metadata list (no grids)
- `GET /api/v1/levels/{id}` — level detail with grid
- `GET /shared/app_contract.json` — raw contract file

Progress API is not implemented; `ENABLE_PROGRESS_API` is reserved for a future spec.

## Verification

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
git diff --check
```

## Planning Sources

- `docs/project-charter.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0002-backend-levels-api.md`
- `docs/plans/PLAN-0002-backend-levels-api.md`
- `docs/plans/batches/BATCH-0002-first-playable-slice.md`
- `docs/adr/ADR-0000-architecture-direction.md`
