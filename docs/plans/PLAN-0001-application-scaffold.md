# PLAN-0001: Application Scaffold

Status: Ready for Implementation
Maturity: M4
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0001-application-scaffold.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Add behavior-free application directories, shared contract files, local environment defaults, and README setup guidance.

**Architecture:** Create stable backend/frontend/shared/test/tooling paths first. The shared JSON contract defines future cross-boundary constants but no route implementation, backend API behavior, level data, validation logic, or gameplay behavior is added in this plan.

**Tech stack:** Markdown, JSON, plain HTML/CSS, Python JSON validation, existing shell preflight.

## Document state

- `SPEC-0001` remains the requirements source and must be accepted before Implementation mode begins.
- This plan is M4 and ready to execute once `SPEC-0001` is accepted.
- `BATCH-0001` may reference this plan as the executable implementation contract, but the batch must not override this plan's scope.

## Preconditions

- [ ] `SPEC-0001` is accepted or the implementation prompt explicitly states it is accepted.
- [ ] `git status --short` has been run and pre-existing dirty files, if any, are noted.
- [ ] No dependency, network, CI, deployment, lockfile, backend behavior, frontend gameplay, or product UI behavior work is included.

## File structure

### Create now

- `backend/app/__init__.py` - empty Python package marker.
- `backend/app/services/__init__.py` - empty Python package marker.
- `backend/app/data/.gitkeep` - preserve future level data directory.
- `frontend/index.html` - behavior-free static shell using the exact content below.
- `frontend/style.css` - minimal behavior-free shell styling using the exact content below.
- `frontend/js/.gitkeep` - preserve future JavaScript directory.
- `shared/app_contract.json` - executable shared contract using the exact JSON below.
- `shared/COMMUNICATION_CONTRACT.md` - human-readable mirror using the exact content below.
- `.env.example` - non-secret local defaults using the exact content below.
- `tests/.gitkeep`, `tests/js/.gitkeep`, `tools/.gitkeep` - preserve future directories.

### Modify now

- `README.md` - replace the starter-kit README with the exact project README below.
- `.gitignore` - add `.local/` under a new local app data section if it is not already present.

### Do not create in this batch

The following paths appear in `docs/repo-map.md` as expected future application structure, but they are intentionally deferred because they imply backend APIs, gameplay, validation, tests, or tooling behavior:

- `backend/app/main.py`
- `backend/app/settings.py`
- `backend/app/schemas.py`
- `backend/app/middleware.py`
- `backend/app/services/level_service.py`
- `backend/app/services/progress_service.py`
- `backend/app/data/levels.json`
- `frontend/js/app.js`
- `frontend/js/api.js`
- `frontend/js/contract.js`
- `frontend/js/engine.js`
- `frontend/js/physics.js`
- `frontend/js/renderer.js`
- `frontend/js/input.js`
- `frontend/js/storage.js`
- `frontend/js/ui.js`
- `tests/test_api.py`
- `tests/test_level_validation.py`
- `tests/js/engine.test.js`
- `tests/js/physics.test.js`
- `tools/validate_levels.py`
- `tools/generate_levels.py`

Modify `docs/repo-map.md` only if implementation cannot preserve this create-now/defer-later split.

## Contracts to implement

### `shared/app_contract.json`

Create `shared/app_contract.json` with exactly:

```json
{
  "version": "0.1.0",
  "appName": "Block Builder",
  "api": {
    "origin": "",
    "prefix": "/api/v1",
    "routes": {
      "health": "/health",
      "config": "/config",
      "levels": "/levels",
      "levelById": "/levels/{levelId}",
      "progress": "/progress"
    }
  },
  "static": {
    "frontendRoot": "frontend",
    "entrypoint": "index.html",
    "stylesheet": "style.css"
  },
  "tiles": {
    "empty": ".",
    "wall": "#",
    "player": "P",
    "block": "B",
    "goal": "G"
  },
  "actions": {
    "moveLeft": "moveLeft",
    "moveRight": "moveRight",
    "jump": "jump",
    "reset": "reset",
    "undo": "undo",
    "selectLevel": "selectLevel"
  },
  "keyboard": {
    "moveLeft": ["ArrowLeft", "KeyA"],
    "moveRight": ["ArrowRight", "KeyD"],
    "jump": ["ArrowUp", "KeyW", "Space"],
    "reset": ["KeyR"],
    "undo": ["KeyZ"]
  },
  "storageKeys": {
    "progress": "block-builder:progress",
    "settings": "block-builder:settings"
  },
  "gameplay": {
    "implementationStatus": "deferred",
    "engineOwner": "frontend",
    "stateModel": "grid"
  },
  "ui": {
    "implementationStatus": "deferred",
    "rendererOwner": "frontend",
    "rootElementId": "app"
  }
}
```

The `gameplay` and `ui` sections are intentionally minimal. Add no win rules, physics constants, layout constants, level schema, or renderer behavior in this batch.

### `shared/COMMUNICATION_CONTRACT.md`

Create `shared/COMMUNICATION_CONTRACT.md` with exactly:

```markdown
# Communication Contract

Status: Scaffold
Source: `shared/app_contract.json`

`shared/app_contract.json` is the machine-readable contract shared by future Python backend code and vanilla JavaScript frontend code.

## Current Scope

This scaffold declares stable names, paths, and ownership boundaries only. It does not implement backend routes, gameplay state transitions, level validation, or progress persistence.

## Sections

| Section | Purpose |
|---|---|
| `version` | Contract version for future compatibility checks. |
| `appName` | Human-readable application name. |
| `api` | Same-origin API prefix and route patterns future backend/frontend code must share. |
| `static` | Static frontend entry paths future backend serving code can reference. |
| `tiles` | Canonical symbols for future level data and engine tests. |
| `actions` | Canonical action names for future input and engine code. |
| `keyboard` | Default keyboard bindings for future input handling. |
| `storageKeys` | Browser storage keys reserved for local progress and settings. |
| `gameplay` | Deferred gameplay ownership metadata. |
| `ui` | Deferred UI ownership metadata and root element id. |

## Python Usage

Future backend code should load this JSON file from `SHARED_CONTRACT_PATH` and derive public config responses or route metadata from it. This scaffold does not add that loader yet.

## JavaScript Usage

Future frontend code should derive route construction, action names, keyboard bindings, and storage keys from this contract. This scaffold does not add JavaScript loaders yet.

## Change Rule

Any future change to route names, tile symbols, action names, storage keys, gameplay constants, or UI constants is a cross-boundary contract change and should be backed by an accepted spec or Change Request.
```

### `.env.example`

Create `.env.example` with exactly:

```dotenv
# Local, non-secret defaults for future backend/frontend development.
APP_ENV=local
HOST=127.0.0.1
PORT=8000
SHARED_CONTRACT_PATH=shared/app_contract.json
LEVELS_PATH=backend/app/data/levels.json
PROGRESS_PATH=.local/progress.json
CORS_ALLOWED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
TRUSTED_HOSTS=127.0.0.1,localhost
ENABLE_PROGRESS_API=false
```

Do not create `.env` in this batch.

### `frontend/index.html`

Create `frontend/index.html` from the decoded form of this HTML-escaped content. The escaped block exists only so planning-doc lint does not treat HTML tags as placeholder syntax; implementation must convert `&lt;` and `&gt;` entities to literal HTML tag brackets when creating the file.

```html
&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;Block Builder&lt;/title&gt;
    &lt;link rel="stylesheet" href="./style.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;main id="app" data-app="block-builder"&gt;
      &lt;h1&gt;Block Builder&lt;/h1&gt;
      &lt;p&gt;Application scaffold only. Gameplay is implemented by later specs.&lt;/p&gt;
    &lt;/main&gt;
  &lt;/body&gt;
&lt;/html&gt;
```

Do not add script tags in this batch.

### `frontend/style.css`

Create `frontend/style.css` with exactly:

```css
:root {
  color-scheme: light dark;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f6f7f9;
  color: #1f2933;
}

body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  place-items: center;
}

main {
  width: min(36rem, calc(100% - 2rem));
  padding: 2rem 0;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: 2rem;
}

p {
  margin: 0;
  line-height: 1.5;
}
```

Do not add gameplay layout, board styles, animation, or responsive game UI in this batch.

### `README.md`

Replace the existing starter-kit README with exactly:

````markdown
# Block Builder

Block Builder is a local-first deterministic grid block puzzle game. The project is managed through controlled specs, implementation plans, and execution batches so application behavior is added in small, reviewable slices.

## Current Status

- Governance and planning docs exist.
- `BATCH-0001` creates the behavior-free application scaffold.
- Backend APIs, level data, validation, frontend gameplay, and playable UI are deferred to later accepted specs.

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
2. Use `.env.example` as the source for future local environment defaults.
3. Do not commit `.env`, `.local/`, generated data, dependency directories, or logs.
4. Do not install dependencies until a later accepted spec requests them and the required approval is granted.

## Verification

Current scaffold checks:

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
```

Expected application commands such as `pytest`, `uvicorn`, and JavaScript tests become valid only after later specs add dependency manifests and implementation files.

## Planning Sources

- `docs/project-charter.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0001-application-scaffold.md`
- `docs/plans/PLAN-0001-application-scaffold.md`
- `docs/plans/batches/BATCH-0001-application-scaffold.md`
- `docs/adr/ADR-0000-architecture-direction.md`
````

### `.gitignore`

Keep the existing `.gitignore` entries. Add this section after the local env/secrets block if `.local/` is not already ignored:

```gitignore
# Local app data
.local/
```

## Tasks

### Task 0: Preflight

**Files:** none

- [ ] Run:

```bash
git status --short
```

- [ ] Note any pre-existing dirty files before editing.

### Task 1: Directory skeleton

**Files:** `backend/app/__init__.py`, `backend/app/services/__init__.py`, `backend/app/data/.gitkeep`, `frontend/js/.gitkeep`, `tests/.gitkeep`, `tests/js/.gitkeep`, `tools/.gitkeep`

- [ ] Create the listed directories and marker files.
- [ ] Leave Python package markers empty.
- [ ] Leave `.gitkeep` marker files empty.
- [ ] Do not create deferred backend modules, JavaScript modules, tests, level data, or tools.

### Task 2: Shared contract

**Files:** `shared/app_contract.json`, `shared/COMMUNICATION_CONTRACT.md`

- [ ] Create both files using the exact contents in this plan.
- [ ] Run:

```bash
python3 -m json.tool shared/app_contract.json >/dev/null
```

- [ ] Expected result: command exits 0 and prints no output.

### Task 3: Static frontend shell

**Files:** `frontend/index.html`, `frontend/style.css`

- [ ] Create both files using the exact contents in this plan.
- [ ] Confirm `frontend/index.html` has no script tag.
- [ ] Confirm `frontend/style.css` has no game board, tile, animation, or gameplay layout selectors.

### Task 4: Local setup docs

**Files:** `README.md`, `.env.example`, `.gitignore`

- [ ] Replace `README.md` with the exact project README in this plan.
- [ ] Create `.env.example` using the exact content in this plan.
- [ ] Add `.local/` to `.gitignore` if missing.
- [ ] Do not create `.env`.

### Task 5: Final verification

**Files:** all changed files

- [ ] Run every command in the Validation section.
- [ ] Inspect `git diff --stat` and `git diff` to confirm only planned files changed.
- [ ] Confirm the diff contains no dependency manifests, lockfiles, backend route behavior, gameplay modules, level data, CI changes, deployment changes, or secrets.

## Validation

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
git diff --stat
git diff
```

Expected pass conditions:

- `shared/app_contract.json` parses as JSON.
- `agent_preflight.sh` exits 0.
- `git diff --check` reports no whitespace errors.
- `git diff --stat` shows only files listed in this plan unless `docs/repo-map.md` required the documented fallback update.
- `git diff` shows no behavior implementation.

## Documentation updates

- `README.md` is updated by replacing the starter-kit README with the project README above.
- `shared/COMMUNICATION_CONTRACT.md` is created as the human-readable contract mirror.
- `docs/repo-map.md` is updated only if implementation cannot preserve the planned create-now/defer-later split.

## Rollback plan

Revert the scaffold commit or remove only files created by this plan, then restore the prior `README.md` and `.gitignore` versions from Git. Leave prior seed docs intact.

## Risks

- Risk: scaffold marker files imply product completion.
  - Mitigation: exact README, contract, HTML, and CSS content identify the scaffold as behavior-free.
- Risk: contract drift.
  - Mitigation: exact JSON is specified here; future contract changes require an accepted spec or Change Request.
- Risk: `docs/repo-map.md` appears to require more files than this scaffold creates.
  - Mitigation: this plan explicitly separates create-now files from deferred future files.

## Stop conditions

- `SPEC-0001` is not accepted when Implementation mode starts.
- A dependency, install, lockfile, CI, deployment, network, or security-policy action is needed.
- Product behavior, backend route behavior, gameplay code, level data, validation logic, or tests become necessary.
- A file outside this plan must be modified, except the documented `docs/repo-map.md` fallback.
- The exact file contents in this plan conflict with accepted requirements.
