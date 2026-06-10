# Repo Map

Status: Backend implemented (BATCH-0002 complete)
Maturity: M3
Last updated: 2026-06-10

## Purpose

This repository currently contains the controlled documentation and agent-governance scaffold for a deterministic grid block puzzle game. Application structure is planned but not implemented yet.

## Current top-level structure

- `AGENTS.md`: required operating modes, change control, permission policy, and quality gates.
- `docs/`: project charter, glossary, roadmap, specs, plans, ADRs, standards, worklogs, and intake material.
- `docs/status/CURRENT_STATE.md`: active project dashboard for future session startup.
- `docs/handoff/`: concise handoff notes for incomplete, interrupted, blocked, or complex work.
- `docs/worklog/`: session notes and durable discoveries.
- `scripts/agent/`: deterministic helper scripts for preflight, policy checks, seeding, and finalization.
- `.githooks/`: local Git hooks. Do not bypass with `--no-verify` unless explicitly approved.
- `.github/`: repository policy, pull request, and CI/dependency-review scaffold.
- `.agents/`, `.codex/`, `.claude/`, `.cursor/`, `tooling/`: agent/tool adapters and helper configuration.

## Expected application structure

The first implementation batch should create this skeleton before product behavior is implemented:

```text
backend/
  app/
    __init__.py
    main.py
    settings.py
    schemas.py
    middleware.py
    services/
      __init__.py
      level_service.py
      progress_service.py
    data/
      levels.json
frontend/
  index.html
  style.css
  js/
    app.js
    api.js
    contract.js
    engine.js
    physics.js
    renderer.js
    input.js
    storage.js
    ui.js
shared/
  app_contract.json
  COMMUNICATION_CONTRACT.md
tests/
  test_api.py
  test_level_validation.py
  js/
    engine.test.js
    physics.test.js
tools/
  validate_levels.py
  generate_levels.py
```

`tools/generate_levels.py` is a future placeholder for level expansion after the first five levels are validated; it should not be implemented during the scaffold batch unless a later spec accepts it.

## Architectural boundaries

- Backend layer: FastAPI app responsible for static serving, public config, level metadata/detail APIs, validation, structured API errors, and optional local progress persistence.
- Shared contract layer: JSON source of truth for API prefixes/routes, tile symbols, actions, keyboard bindings, storage keys, gameplay constants, and UI constants.
- Frontend API layer: route construction and fetch wrappers derived from the shared contract.
- Frontend engine layer: pure deterministic game state transitions, win detection, reset, and undo. It must not manipulate the DOM directly.
- Frontend physics layer: collision, solid/empty checks, grounded checks, and gravity resolution.
- Frontend renderer/UI layer: DOM/CSS grid rendering, HUD, controls, status messages, level selector, completion modal, responsive layout, and accessibility affordances.
- Frontend storage layer: localStorage progress and settings.
- Tooling layer: level validation and later level generation.

## Files future agents should read first

- `AGENTS.md`
- `docs/repo-map.md`
- `docs/status/CURRENT_STATE.md`
- The active spec, plan, and batch listed in `docs/status/CURRENT_STATE.md`
- Directly relevant source files for the active task

## Files future agents should not casually modify

- `docs/intake/PROJECT_OVERVIEW_RAW.md`: raw source material; do not rewrite during implementation.
- `AGENTS.md`: repo operating policy; changes require explicit intent.
- `.github/` and `.githooks/`: CI and hook behavior; approval may be required.
- `shared/app_contract.json` once created: shared Python/JavaScript source of truth; changes should be spec-backed.
- `backend/app/data/levels.json` once created: level schema and first-five content should stay validator-backed.
- `.env`, secrets, key files, and local progress data: do not read or commit secrets/user data.
- Lockfiles and dependency manifests: dependency policy applies.

## Current local verification commands

```bash
git status --short
bash scripts/agent/agent_preflight.sh
bash -n scripts/agent/*.sh .githooks/*
python3 -m py_compile scripts/agent/*.py .codex/hooks/*.py
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
```

## Backend setup and run commands (current — BATCH-0002 complete)

A3 dependency/network approval is required before running install commands.

```bash
# Install (run from repo root, use repo .venv only):
.venv/bin/python -m pip install -e ".[dev]"

# Validate level data:
.venv/bin/python tools/validate_levels.py

# Run backend tests:
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py

# Start local server:
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

## Expected frontend commands (deferred — BATCH-0003)

These commands become valid only after BATCH-0003 frontend implementation.

```bash
node tests/js/run-tests.mjs
```

Do not run network-backed installs until dependency and network approval are explicitly granted.

## Common patterns to establish

- Error handling: API errors should return `{ "error": { "code": "...", "message": "..." } }`.
- Logging: concise request logging with method, path, status, and elapsed time.
- Configuration: environment variables read through backend settings and shared public constants read from `shared/app_contract.json`.
- Testing: backend with `pytest`; frontend engine/physics with dependency-light JavaScript tests or an accepted runner.
- Documentation: update specs/plans or open a Change Request before changing accepted scope.
