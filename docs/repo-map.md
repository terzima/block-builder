# Repo Map

Status: Seeded
Maturity: M1/M2
Last updated: 2026-06-10

## Purpose

This repository currently contains the controlled documentation and agent-governance scaffold for a deterministic grid block puzzle game. Application structure is planned but not implemented yet.

## Current top-level structure

- `AGENTS.md`: required operating modes, change control, permission policy, and quality gates.
- `docs/`: project charter, glossary, roadmap, specs, plans, ADRs, standards, worklogs, and intake material.
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
- `docs/project-charter.md`
- `docs/roadmap.md`
- `docs/specs/SPEC-0000-project-foundation.md`
- The active spec in `docs/specs/`
- The active plan in `docs/plans/`
- `docs/adr/ADR-0000-architecture-direction.md`

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
```

## Expected application commands after scaffold/backend setup

These commands become valid only after the relevant implementation specs have created the files and any required dependency approvals have been granted.

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
pytest
python tools/validate_levels.py
node tests/js/run-tests.mjs
```

Do not run network-backed installs until dependency and network approval are explicitly granted.

## Common patterns to establish

- Error handling: API errors should return `{ "error": { "code": "...", "message": "..." } }`.
- Logging: concise request logging with method, path, status, and elapsed time.
- Configuration: environment variables read through backend settings and shared public constants read from `shared/app_contract.json`.
- Testing: backend with `pytest`; frontend engine/physics with dependency-light JavaScript tests or an accepted runner.
- Documentation: update specs/plans or open a Change Request before changing accepted scope.
