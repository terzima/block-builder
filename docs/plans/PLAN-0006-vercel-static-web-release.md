# PLAN-0006: Vercel Static Web Release

Status: Ready for Implementation
Approval Class: A3
Maturity: M4
Owner: Unassigned
Created: 2026-06-12
Updated: 2026-06-12
Related spec: `docs/specs/SPEC-0006-vercel-static-web-release.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Prepare Block Builder for a repeatable static Vercel release at `block-builder.terzima.com` by exporting all 50 canonical levels to static JSON, keeping local FastAPI development intact, excluding trace recorder tooling from the shipped artifact, disabling undo only in deployed mode, and documenting the separate Vercel project setup without performing remote deployment actions.

**Architecture:** Keep runtime gameplay in the existing vanilla JavaScript frontend. Keep local development on FastAPI API routes. Add an explicit runtime config that selects API mode for dev and static JSON mode for deployed builds. Generate `dist/` from canonical source files with a no-dependency Python export tool; `dist/` is reproducible generated output, not source of truth.

**Tech stack:** Existing Python stdlib tooling, existing FastAPI/Pydantic backend for local development, existing vanilla JavaScript ES modules, existing no-dependency Node test harness, npm package metadata with no package dependencies, and Vercel static hosting. No dependency additions, frontend framework, bundler, network access, Vercel CLI, CI changes, secrets, or PR/push work are part of this plan.

## Preconditions

- [ ] `SPEC-0006` is accepted.
- [ ] This plan is marked ready for implementation before code or config edits begin.
- [ ] Existing worktree changes are understood with `git status --short`; do not revert unrelated dirty files.
- [ ] The implementation prompt explicitly approves local creation of `package-lock.json` with no dependency additions. If not, stop before editing or creating any lockfile.
- [ ] Do not run a dependency-install command. If a package-manager command is needed to regenerate the lockfile, use only a package-lock-only/offline form and stop if it attempts network access or writes `node_modules/`.
- [ ] Do not create `vercel.json` in this plan. Vercel build/output settings are documented for the separate Vercel project instead.
- [ ] Stop before any network access, Vercel CLI command, Vercel project linking, DNS/domain action, deployment, branch push, PR creation, secret access, dependency addition, framework config, or CI change.

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| Read | `docs/specs/SPEC-0006-vercel-static-web-release.md` | Accepted scope, runtime config, static JSON, Vercel repository, and gate contracts. |
| Modify | `package.json` | Add `name`, `version`, and root `build` script while preserving `private`, `type`, and `test:js`. No dependencies. |
| Create | `package-lock.json` | Minimal npm lockfile for repeatable Vercel install/build behavior with no dependencies. |
| Create | `tools/export_static_site.py` | No-dependency static exporter and production artifact validator. |
| Create | `frontend/js/runtime-config.js` | Runtime config defaults, normalization, and access helpers. |
| Modify | `frontend/js/api.js` | Add static-data mode while preserving API mode. |
| Modify | `frontend/js/input.js` | Add disabled-action support for deployed undo blocking. |
| Modify | `frontend/js/app.js` | Read runtime config, pass it to API/input wiring, guard undo dispatch, and load trace tooling only in dev mode. |
| Create | `frontend/js/trace-dev.js` | Dev-only trace controller that imports `trace-recorder.js` and owns trace UI wiring. Excluded from `dist/`. |
| Modify | `frontend/js/ui.js` | Remove trace-specific helpers after they move into `trace-dev.js`; keep generic status/dialog/busy helpers. |
| Modify | `frontend/index.html` | Add export-removal markers around undo and trace UI blocks; source dev UI remains unchanged visually. |
| Read | `frontend/js/trace-recorder.js` | Preserve pure trace recorder tests and dev behavior; exclude file from shipped artifact. |
| Create | `tests/js/static-release.test.js` | Runtime config, static API client, and disabled undo input tests. |
| Modify | `tests/js/run-tests.mjs` | Run static release tests in the existing JS suite. |
| Create | `tests/test_static_export.py` | Python tests for export output, static JSON shape, 50-level coverage, trace exclusion, undo exclusion, and package metadata. |
| Read | `backend/app/data/levels.json` | Canonical source for all 50 shipped levels. Do not edit level data. |
| Read | `shared/app_contract.json` | Source contract copied to static release and used for generated config. |
| Create | `docs/deployment/vercel-static-release.md` | Local preview and separate Vercel project setup checklist without credentials or remote commands. |
| Modify | `docs/repo-map.md` | Add static export/build/test commands and Vercel release orientation. |
| Modify | `docs/status/CURRENT_STATE.md` | Record PLAN-0006 status, checks, A2 local preview checkpoint, and A3 deployment stop. |

No changes are planned for `backend/app/main.py`, `backend/app/settings.py`, `backend/app/middleware.py`, `backend/app/services/level_service.py`, `backend/app/schemas.py`, `backend/app/data/levels.json`, `shared/app_contract.json`, `.github/`, `.githooks/`, `.env*`, `docs/intake/*`, generated `dist/` tracking, or secrets.

## Contracts To Implement

### Runtime Config

Create `frontend/js/runtime-config.js` with these exports:

```js
export const DEFAULT_RUNTIME_CONFIG = Object.freeze({
  mode: 'dev',
  dataSource: 'api',
  dataBasePath: '/static-data',
  enableTraceRecorder: true,
  enableUndo: true,
});

export function normalizeRuntimeConfig(rawConfig = {}) {}

export function getRuntimeConfig(globalObj = globalThis) {}
```

Required behavior:

- `getRuntimeConfig()` reads `globalThis.BLOCK_BUILDER_RUNTIME_CONFIG`.
- Missing config returns `DEFAULT_RUNTIME_CONFIG`.
- `mode` must be `dev` or `deployed`.
- `dataSource` must be `api` or `static`.
- `dataBasePath` must be a non-empty absolute path beginning with `/`; remove one trailing slash except for `/`.
- `enableTraceRecorder` and `enableUndo` must be booleans.
- Invalid values throw `Error` with message prefix `Invalid runtime config:`.

### Static API Client

Update `frontend/js/api.js`:

```js
export function createApiClient(contract, fetchImpl = fetch, runtimeConfig = DEFAULT_RUNTIME_CONFIG) {}
```

Behavior:

- API mode preserves current route construction from `contract.api.origin`, `contract.api.prefix`, and `contract.api.routes`.
- Static mode uses `runtimeConfig.dataBasePath`:
  - `getConfig()` fetches `${dataBasePath}/config.json`.
  - `listLevels()` fetches `${dataBasePath}/levels.json` and returns `data.levels`.
  - `getLevel(levelId)` fetches `${dataBasePath}/levels/${levelId}.json`.
- JSON parse and non-OK error behavior remains equivalent to the current API client.

### Input Disable Contract

Update `frontend/js/input.js`:

```js
export function bindInputs(root, contract, dispatch, options = {}) {}
```

Supported options:

```js
{
  disabledActions: new Set(),
  documentObj: document
}
```

Behavior:

- Keyboard bindings skip disabled actions.
- Click delegation ignores buttons whose `data-action` is disabled.
- Existing callers without options keep current behavior.
- Deployed mode passes `disabledActions = new Set([contract.actions.undo])`.

### App Runtime Wiring

Update `frontend/js/app.js`:

- Import `getRuntimeConfig`.
- Remove static imports from `./trace-recorder.js`.
- Read runtime config before API/input/trace wiring.
- Create API client with `createApiClient(contract, fetch, runtimeConfig)`.
- Disable undo dispatch when `runtimeConfig.enableUndo === false`, even if a stale DOM element or keyboard event tries to dispatch it.
- In completed state, allow `reset`; allow `undo` only when runtime config enables undo.
- Load dev trace tooling with `await import('./trace-dev.js')` only when `runtimeConfig.enableTraceRecorder === true`.
- Use a no-op trace controller when trace recording is disabled.

Create `frontend/js/trace-dev.js`:

```js
export function createTraceDevController({
  contract,
  getCurrentRawLevel,
}) {}
```

The returned controller must provide:

```js
{
  reset(levelId) {},
  invalidate(reason) {},
  record(actionType, beforeState, result) {},
  complete(finalState) {},
  wireControls() {}
}
```

Trace dev behavior must match the existing `app.js` trace behavior:

- Record button starts a trace for the current level.
- Copy/Download buttons operate on completed trace JSON.
- `reset`, `undo`, and level changes invalidate active recording.
- Completion exports replay-valid trace JSON and attempts clipboard copy with visible fallback.

### Source HTML and Export Markers

Modify `frontend/index.html` to add non-visible export markers.

- Place comment marker text `deploy-remove:start undo-control` immediately before the existing undo button.
- Place comment marker text `deploy-remove:end undo-control` immediately after the existing undo button.
- Place comment marker text `deploy-remove:start trace-panel` immediately before the existing `trace-panel` section.
- Place comment marker text `deploy-remove:end trace-panel` immediately after the existing `trace-panel` section.

Local source HTML keeps the visible Undo and trace controls for dev mode. `tools/export_static_site.py` removes those marked blocks in `dist/index.html`.

### Static Export Tool

Create `tools/export_static_site.py` using only Python stdlib.

CLI:

```bash
python3 tools/export_static_site.py
python3 tools/export_static_site.py --output /tmp/block-builder-dist
```

Default output is `dist`.

Implementation contract:

- Resolve repo root from the script path.
- Refuse output paths outside the repo or `/tmp` unless a future plan approves it.
- Delete and recreate only the selected output directory.
- Copy `frontend/` to output root, excluding:
  - `js/trace-recorder.js`
  - `js/trace-dev.js`
- Transform copied `index.html`:
  - Remove both deploy-marker blocks.
  - Inject an inline runtime-config script immediately before the existing module script that loads `./js/app.js`.
  - The injected script must set `window.BLOCK_BUILDER_RUNTIME_CONFIG` to `{ mode: "deployed", dataSource: "static", dataBasePath: "/static-data", enableTraceRecorder: false, enableUndo: false }`.

- Copy `shared/app_contract.json` to `dist/shared/app_contract.json`.
- Generate `dist/static-data/config.json` as an object with `contract` set to the parsed shared contract.
- Generate `dist/static-data/levels.json` as an object with `levels` set to the generated `LevelMeta` array.
- Generate `dist/static-data/levels/{levelId}.json` for each canonical level.
- Require canonical level IDs to be exactly `1..50`.
- Validate generated JSON files by reading them back with `json.loads`.
- Fail with a concise message prefixed by `Static export failed:` and exit non-zero if:
  - source JSON is invalid;
  - levels are not exactly `1..50`;
  - runtime config fields are wrong;
  - undo marker block or trace marker block is missing from source HTML;
  - `dist/index.html` still contains `trace-record-button`, `Copy Trace`, `Download Trace`, `data-action="undo"`, or `KeyZ`;
  - `dist/js/trace-recorder.js` or `dist/js/trace-dev.js` exists.

Expected success output:

```text
Exported static site to dist
Exported 50 levels
```

### Package and Lockfile

Modify `package.json` to this shape, preserving existing script names:

```json
{
  "name": "block-builder",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "python3 tools/export_static_site.py",
    "test:js": "node tests/js/run-tests.mjs"
  }
}
```

Create `package-lock.json` with no package dependencies. Expected minimum shape:

```json
{
  "name": "block-builder",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "block-builder",
      "version": "0.1.0"
    }
  }
}
```

Do not add `dependencies`, `devDependencies`, `node_modules/`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb`.

### Tests

Create `tests/js/static-release.test.js`:

- `normalizeRuntimeConfig()` accepts default/missing config.
- Invalid runtime config throws `Invalid runtime config:`.
- API mode still fetches `/api/v1/levels` and `/api/v1/levels/{id}`.
- Static mode fetches `/static-data/levels.json` and `/static-data/levels/{id}.json`.
- `bindInputs(root, contract, dispatch, { disabledActions: new Set(['undo']), documentObj })` does not dispatch undo for `KeyZ` or a `[data-action="undo"]` click.
- Reset still dispatches when undo is disabled.

Modify `tests/js/run-tests.mjs` to import and run `static-release.test.js` after engine tests and before trace recorder tests:

```text
ok static release
```

Create `tests/test_static_export.py`:

- Run the export tool against `tmp_path / "dist"` via its `main` function or subprocess.
- Assert exit code `0` for happy path.
- Assert `static-data/levels.json` has exactly IDs `1..50`.
- Assert each `static-data/levels/{id}.json` exists and has matching `id`.
- Assert `static-data/config.json` contains `contract.version == "0.1.0"`.
- Assert `index.html` contains `BLOCK_BUILDER_RUNTIME_CONFIG`, `dataSource: "static"` or equivalent JSON, `enableTraceRecorder: false`, and `enableUndo: false`.
- Assert `index.html` does not contain `trace-record-button`, `Copy Trace`, `Download Trace`, `data-action="undo"`, or `KeyZ`.
- Assert `js/trace-recorder.js` and `js/trace-dev.js` do not exist in output.
- Assert `package.json` has `scripts.build == "python3 tools/export_static_site.py"`.
- Assert exactly one supported lockfile exists and it is `package-lock.json`.
- Assert no framework config file exists among `next.config.js`, `vite.config.js`, `nuxt.config.js`, and `svelte.config.js`.

## Tasks

### Task 0: Preflight

**Files:** none

- [ ] Run:

```bash
git status --short
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0006-vercel-static-web-release.md
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool shared/app_contract.json >/dev/null
```

- [ ] Confirm `docs/specs/SPEC-0006-vercel-static-web-release.md` is `Status: Accepted`.
- [ ] Confirm no unplanned source files need to be reverted.
- [ ] Stop if the implementation prompt did not explicitly approve creating `package-lock.json`.

### Task 1: Runtime Config and Static API Tests

**Files:**

- Create: `frontend/js/runtime-config.js`
- Modify: `frontend/js/api.js`
- Modify: `tests/js/run-tests.mjs`
- Create: `tests/js/static-release.test.js`

- [ ] Add `runtime-config.js` with the exact exports named in this plan.
- [ ] Update `api.js` to accept a runtime config and support static JSON mode.
- [ ] Add `static-release.test.js` coverage for runtime config and API URL selection.
- [ ] Add the new test suite to `run-tests.mjs`.
- [ ] Run:

```bash
node --input-type=module -e "import { run } from './tests/js/static-release.test.js'; await run(); console.log('ok static release');"
node tests/js/run-tests.mjs
```

- [ ] Expected pass includes `ok static release` and `All JS tests passed`.

### Task 2: Deployed Undo Gate and Dev Trace Module Boundary

**Files:**

- Modify: `frontend/js/input.js`
- Modify: `frontend/js/app.js`
- Modify: `frontend/js/ui.js`
- Create: `frontend/js/trace-dev.js`
- Read: `frontend/js/trace-recorder.js`
- Modify: `tests/js/static-release.test.js`
- Read/update only if needed: `tests/js/trace-recorder.test.js`

- [ ] Update `bindInputs` with `disabledActions` and `documentObj` options.
- [ ] Move trace-specific UI helper code out of `ui.js` and into `trace-dev.js`.
- [ ] Remove static trace-recorder imports from `app.js`.
- [ ] Add dynamic `await import('./trace-dev.js')` only when `runtimeConfig.enableTraceRecorder` is true.
- [ ] Add a no-op trace controller path for deployed mode.
- [ ] Guard undo dispatch in `app.js` when `runtimeConfig.enableUndo` is false.
- [ ] Extend `static-release.test.js` to prove disabled undo blocks `KeyZ` and undo button dispatch while reset still dispatches.
- [ ] Run:

```bash
node --input-type=module -e "import { run } from './tests/js/static-release.test.js'; await run(); console.log('ok static release');"
node --input-type=module -e "import { run } from './tests/js/trace-recorder.test.js'; await run(); console.log('ok trace recorder');"
node tests/js/run-tests.mjs
```

- [ ] Expected pass includes `ok static release`, `ok trace recorder`, and `All JS tests passed`.

### Task 3: Source HTML Markers and Static Export Tool

**Files:**

- Modify: `frontend/index.html`
- Create: `tools/export_static_site.py`
- Create: `tests/test_static_export.py`

- [ ] Add deploy-removal markers around the existing Undo button and trace panel in source HTML.
- [ ] Implement `tools/export_static_site.py` exactly as the static export contract above.
- [ ] Add `tests/test_static_export.py` happy-path and artifact-safety assertions.
- [ ] Run:

```bash
python3 tools/export_static_site.py --output /tmp/block-builder-dist
python3 -m json.tool /tmp/block-builder-dist/static-data/config.json >/dev/null
python3 -m json.tool /tmp/block-builder-dist/static-data/levels.json >/dev/null
.venv/bin/python -m pytest tests/test_static_export.py
```

- [ ] Expected export output includes `Exported 50 levels`.
- [ ] Expected pytest result passes `tests/test_static_export.py`.

### Task 4: Package Metadata and Lockfile

**Files:**

- Modify: `package.json`
- Create: `package-lock.json`
- Read: `.gitignore`

- [ ] Update `package.json` to include `name`, `version`, `build`, and existing `test:js` exactly as the package contract above.
- [ ] Create `package-lock.json` with no dependency entries.
- [ ] Confirm `.gitignore` already excludes `dist/` and `node_modules/`; do not change it unless a check proves it is stale.
- [ ] Run:

```bash
python3 -m json.tool package.json >/dev/null
python3 -m json.tool package-lock.json >/dev/null
node -e "const p=require('./package.json'); if (p.scripts?.build !== 'python3 tools/export_static_site.py') throw new Error('missing build script')"
python3 tools/export_static_site.py
```

- [ ] Expected export output includes `Exported static site to dist` and `Exported 50 levels`.
- [ ] Stop if any package-manager command attempts network access, creates `node_modules/`, or changes dependencies.

### Task 5: Full Static Artifact Validation

**Files:**

- Generated only: `dist/` (must remain ignored)
- Read: `dist/index.html`
- Read: `dist/static-data/*`

- [ ] Run:

```bash
python3 -m json.tool dist/static-data/config.json >/dev/null
python3 -m json.tool dist/static-data/levels.json >/dev/null
test ! -f dist/js/trace-recorder.js
test ! -f dist/js/trace-dev.js
! rg -n "trace-record-button|Copy Trace|Download Trace|data-action=\"undo\"|KeyZ" dist/index.html
```

- [ ] Run a 50-level detail-file check:

```bash
node --input-type=module -e "import { existsSync, readFileSync } from 'node:fs'; const levels=JSON.parse(readFileSync('dist/static-data/levels.json','utf8')).levels; if (levels.length!==50) throw new Error('expected 50 levels'); for (let i=1;i<=50;i++){ if(!existsSync(`dist/static-data/levels/${i}.json`)) throw new Error(`missing level ${i}`); } console.log('ok static level files');"
```

- [ ] Expected outputs:
  - no trace/undo grep matches;
  - `ok static level files`.

### Task 6: Regression Checks

**Files:** source and tests touched by Tasks 1-5

- [ ] Run:

```bash
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py tests/test_static_export.py
node tests/js/run-tests.mjs
python3 tools/export_static_site.py
git diff --check
```

- [ ] Expected pass conditions:
  - level validator reports `Validated 50 levels from backend/app/data/levels.json`;
  - pytest passes with only the known Starlette/httpx warning if present;
  - JS tests print `All JS tests passed`;
  - export tool exports 50 levels;
  - diff check has no output.

### Task 7: Deployment Documentation

**Files:**

- Create: `docs/deployment/vercel-static-release.md`
- Modify: `docs/repo-map.md`

- [ ] Create `docs/deployment/vercel-static-release.md` with:
  - local build script name: `build`;
  - local static preview command: `python3 -m http.server 4173 --directory dist`;
  - Vercel project: separate project for Block Builder;
  - GitHub repository root: repo root;
  - Vercel framework preset: Other/static;
  - Vercel install behavior: clean install from the committed npm lockfile;
  - Vercel build command: run the root package `build` script;
  - output directory: `dist`;
  - domain target: `block-builder.terzima.com`;
  - preview/production note: Vercel may deploy pushes from the configured branch after the owner links the project;
  - A3 note: project linking, DNS/domain, remote deployment, secrets, and pushes are outside this local implementation batch.
- [ ] Update `docs/repo-map.md` with:
  - root package `build` script;
  - `python3 tools/export_static_site.py`;
  - `python3 -m http.server 4173 --directory dist`;
  - static release doc link.
- [ ] Run:

```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/plans/PLAN-0006-vercel-static-web-release.md
git diff --check
```

### Task 8: Current State and A2 Local Preview Stop

**Files:**

- Modify: `docs/status/CURRENT_STATE.md`

- [ ] Update `docs/status/CURRENT_STATE.md` with:
  - PLAN-0006 local implementation status;
  - generated static export status;
  - exact checks run;
  - A2 local static browser review pending;
  - A3 Vercel/domain/deploy gate still not approved.
- [ ] Run final automated validation:

```bash
git status --short
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/plans/PLAN-0006-vercel-static-web-release.md
python3 -m json.tool package.json >/dev/null
python3 -m json.tool package-lock.json >/dev/null
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py tests/test_static_export.py
node tests/js/run-tests.mjs
python3 tools/export_static_site.py
python3 -m json.tool dist/static-data/config.json >/dev/null
python3 -m json.tool dist/static-data/levels.json >/dev/null
test ! -f dist/js/trace-recorder.js
test ! -f dist/js/trace-dev.js
! rg -n "trace-record-button|Copy Trace|Download Trace|data-action=\"undo\"|KeyZ" dist/index.html
node --input-type=module -e "import { existsSync, readFileSync } from 'node:fs'; const levels=JSON.parse(readFileSync('dist/static-data/levels.json','utf8')).levels; if (levels.length!==50) throw new Error('expected 50 levels'); for (let i=1;i<=50;i++){ if(!existsSync(`dist/static-data/levels/${i}.json`)) throw new Error(`missing level ${i}`); } console.log('ok static level files');"
git diff --check
git diff --stat
```

- [ ] Stop after automated validation and ask for A2 local browser/static preview review. Do not deploy.

## Validation

Required final automated checks:

```bash
git status --short
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/plans/PLAN-0006-vercel-static-web-release.md
python3 -m json.tool package.json >/dev/null
python3 -m json.tool package-lock.json >/dev/null
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py tests/test_static_export.py
node tests/js/run-tests.mjs
python3 tools/export_static_site.py
python3 -m json.tool dist/static-data/config.json >/dev/null
python3 -m json.tool dist/static-data/levels.json >/dev/null
test ! -f dist/js/trace-recorder.js
test ! -f dist/js/trace-dev.js
! rg -n "trace-record-button|Copy Trace|Download Trace|data-action=\"undo\"|KeyZ" dist/index.html
node --input-type=module -e "import { existsSync, readFileSync } from 'node:fs'; const levels=JSON.parse(readFileSync('dist/static-data/levels.json','utf8')).levels; if (levels.length!==50) throw new Error('expected 50 levels'); for (let i=1;i<=50;i++){ if(!existsSync(`dist/static-data/levels/${i}.json`)) throw new Error(`missing level ${i}`); } console.log('ok static level files');"
git diff --check
git diff --stat
```

Expected final state:

- `dist/` exists locally but remains ignored.
- `package.json` has the root `build` script.
- `package-lock.json` exists and contains no dependencies.
- Static JSON includes all 50 canonical levels.
- Shipped artifact has no trace recorder files and no visible Record/Undo controls.
- Local dev mode still supports API mode, trace recorder, and undo.
- A2 local browser/static preview is pending.
- A3 Vercel/domain/deploy action remains blocked.

Manual A2 preview command after automated checks:

```bash
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/` and verify:

- game loads;
- level selector includes levels 1-50;
- level 1 can be completed;
- Reset works;
- Undo is absent and `Z` does not undo;
- Record/Copy Trace/Download Trace are absent;
- mobile-size viewport remains usable.

## Documentation Updates

- `docs/deployment/vercel-static-release.md`: new local preview and Vercel project setup checklist.
- `docs/repo-map.md`: add static export/build/preview commands.
- `docs/status/CURRENT_STATE.md`: update active status, completed checks, A2 manual preview checkpoint, and A3 deployment stop.

## Rollback Plan

- Revert source/runtime changes:
  - `frontend/js/runtime-config.js`
  - `frontend/js/api.js`
  - `frontend/js/input.js`
  - `frontend/js/app.js`
  - `frontend/js/ui.js`
  - `frontend/js/trace-dev.js`
  - `frontend/index.html`
- Remove static release tooling/tests/docs:
  - `tools/export_static_site.py`
  - `tests/js/static-release.test.js`
  - `tests/test_static_export.py`
  - `docs/deployment/vercel-static-release.md`
- Revert `package.json` and remove `package-lock.json`.
- Remove ignored generated `dist/` locally if needed.
- Restore `tests/js/run-tests.mjs`, `docs/repo-map.md`, and `docs/status/CURRENT_STATE.md` to their prior content.

## Risks

- Risk: Vercel's build environment might not have a compatible `python3`.
  - Mitigation: export tool uses only Python stdlib; if Vercel build cannot run it, stop and open a Change Request to switch the export command to a Node script or add approved Vercel config.
- Risk: excluding trace files from `dist` while preserving dev trace behavior can break local trace capture.
  - Mitigation: keep trace tests in `tests/js/trace-recorder.test.js` and run them in the full JS suite.
- Risk: deployed undo removal could leave stale undo paths through keyboard or dialog/event delegation.
  - Mitigation: test disabled keyboard and click dispatch, export-time HTML removal, and runtime dispatch guard.
- Risk: package-lock creation can be mistaken for dependency addition.
  - Mitigation: package-lock must contain no dependencies and validation must assert no package deps are added.
- Risk: shipping levels 31-50 exposes unproven replay evidence.
  - Mitigation: SPEC-0006 accepts this for public iteration; release validation only checks structural/static export safety.

## Stop Conditions

- Stop if `SPEC-0006` is not accepted.
- Stop if implementation prompt does not explicitly approve creating `package-lock.json`.
- Stop if any new dependency, framework config, bundler, lockfile package entry, network command, Vercel CLI command, CI change, secret, branch push, PR, or remote deployment is required.
- Stop if static export cannot include exactly levels 1-50 from canonical data.
- Stop if source HTML cannot keep local dev trace/undo while shipped HTML removes trace/undo.
- Stop if local dev mode loses API loading, trace recorder, or undo.
- Stop if deployed/static mode cannot be proven to exclude trace recorder files and player-facing undo.
- Stop after local static preview is ready for A2 browser review.
