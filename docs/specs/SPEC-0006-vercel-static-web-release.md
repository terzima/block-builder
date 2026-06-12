# SPEC-0006: Vercel Static Web Release

Status: Accepted
Approval Class: A3
Maturity: M2
Owner: Unassigned
Created: 2026-06-12
Updated: 2026-06-12
Related plan: `docs/plans/PLAN-0006-vercel-static-web-release.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `AGENTS.md`, `docs/repo-map.md`, `docs/status/CURRENT_STATE.md`, `docs/project-charter.md`, `docs/roadmap.md`, `docs/glossary.md`, `docs/adr/ADR-0000-architecture-direction.md`, `SPEC-0002`, `SPEC-0003`, `SPEC-0004`, `SPEC-0005`, `shared/app_contract.json`, `frontend/index.html`, `frontend/js/api.js`, `frontend/js/app.js`, `frontend/js/input.js`, `frontend/js/ui.js`, `frontend/js/trace-recorder.js`, `backend/app/main.py`, `backend/app/settings.py`, `backend/app/middleware.py`, `package.json`, and `pyproject.toml`.
- Recent project-owner direction: the next major shipped step is making the game available on `block-builder.terzima.com` through Vercel, preferably as a static web deployment that can be linked from `terzima.com`. After this release slice, work should return to level design.
- Product decisions after draft review: ship all 50 canonical levels, keep redeploys easy and repeatable on Vercel, disable undo only in deployed mode, exclude trace recorder tooling from the shipped product, and use a separate Vercel project for the game.
- Current evidence from `docs/status/CURRENT_STATE.md`: canonical runtime data has levels 1-50. Levels 1-19 and 21-30 have replay-certified evidence, level 20 is intentionally marked `UNPROVEN_REPLAY_EVIDENCE` by owner override, and levels 31-50 are structurally validated for local browser play with replay evidence intentionally unproven.
- Current evidence from `docs/repo-map.md` and `backend/app/main.py`: the local app is a FastAPI service that serves `/`, frontend static files, `/shared/app_contract.json`, and JSON API routes under `/api/v1`.
- Current evidence from `frontend/js/api.js`: the frontend API client derives server URLs from `shared/app_contract.json` and currently expects JSON from same-origin API routes.
- Current evidence from `frontend/index.html`, `frontend/js/app.js`, `frontend/js/ui.js`, and `frontend/js/trace-recorder.js`: the browser UI currently includes dev-facing manual trace recorder controls (`Record`, `Copy Trace`, `Download Trace`) and always imports/wires trace recorder logic.
- Current evidence from `frontend/index.html`, `frontend/js/input.js`, and `shared/app_contract.json`: the browser UI currently exposes an Undo button and `KeyZ` keyboard undo through the shared contract.
- Current evidence from `package.json` and `pyproject.toml`: there is no current static export/build command. The project uses vanilla JavaScript, FastAPI, local Python tooling, and no frontend bundler.
- Current evidence from repo inspection: the root `package.json` exists, but there is no `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lockb`, `vercel.json`, or framework config such as `next.config.js` or `vite.config.js`.
- `docs/intake/PROJECT_OVERVIEW_RAW.md` was not read because the seeded docs, current state, existing specs, shared contract, and directly relevant source files were sufficient.

## Problem

The game is currently a local FastAPI-hosted prototype with API-backed JSON routes and dev tooling visible in the browser. To ship it on `block-builder.terzima.com` through Vercel, the project needs a static web release path that preserves gameplay, serves level/config data without a Python runtime, hides local trace tooling from the public build, and removes player-facing undo affordances before deployment.

## Goals

- Create a deployable static web release path for Vercel that can serve the game at `https://block-builder.terzima.com/`.
- Preserve the current local FastAPI development workflow unless the implementation plan explicitly changes it.
- Replace production reliance on FastAPI JSON endpoints with static JSON files generated from the repo's canonical data and shared contract.
- Keep the shared game data source authoritative: production static JSON must be generated from `backend/app/data/levels.json` and `shared/app_contract.json`, not from intake files or hand-copied data.
- Ship all 50 canonical levels in the public static release.
- Keep redeployment easy: the Vercel release must be reproducible from source files by rerunning the static export/build path, without manual edits to generated output.
- Make the GitHub repository Vercel-ready with a minimal root package manifest, committed lockfile, build script, web source files, and explicit Vercel configuration only where needed.
- Exclude trace recorder tooling from the shipped product while preserving dev-only trace capture for local development if the runtime mode allows it.
- Disable player-facing Undo only in deployed mode. In deployed mode, there must be no visible Undo button and no keyboard-accessible undo action; local development may keep undo.
- Keep Reset available as the player recovery mechanism.
- Add a local static-export validation path so the release can be tested before any Vercel or DNS action.
- Define the Vercel/domain deployment contract while keeping remote account, DNS, and network operations behind an A3 approval gate.
- Require a human browser checkpoint before treating the public release as product-ready.

## Non-goals

- Native mobile apps, app store packaging, Electron, Capacitor, React Native, or mobile push notifications.
- PWA install behavior, service workers, offline caching, or app icons unless a later accepted spec adds them.
- Changing level design, level count, solver behavior, replay evidence policy, or puzzle mechanics.
- Requiring solver proof before deployment.
- Adding analytics, accounts, cloud saves, payments, leaderboards, telemetry, cookies, or server-side persistence.
- Embedding the game inside a `terzima.com` blog post. This slice only needs a stable public game URL that a blog post can link to.
- Deploying a Python/FastAPI runtime to Vercel.
- Installing new dependencies or introducing a frontend bundler unless a later plan identifies an approved need.
- Reading or serving `docs/intake/*` files in production.
- Changing CI/CD workflows, secrets, credentials, Vercel project settings, or DNS records without explicit A3 approval.

## Users / actors

- Public player: opens the game on `block-builder.terzima.com` and plays in a desktop or mobile browser.
- Project owner: validates the public-facing release, connects the domain in Vercel, and links to the game from `terzima.com`.
- Local developer: runs the FastAPI app and optional dev trace tools during development.
- Static export tool: generates deployment artifacts from canonical repo data.
- Vercel static host: serves generated static files and JSON without a Python runtime.
- Frontend app: loads runtime config, level/config JSON, renders the board, handles input, and stores progress in `localStorage`.

## Behavioral contract

- Public URL behavior: `https://block-builder.terzima.com/` loads the playable game directly, over HTTPS, without requiring a backend Python process.
- Production data behavior: deployed gameplay uses static JSON generated from current canonical repo data.
- Production level behavior: deployed gameplay exposes all canonical levels 1-50 from `backend/app/data/levels.json`.
- Local data behavior: local development may continue to use FastAPI routes under `/api/v1` and `/shared/app_contract.json`.
- Runtime mode behavior: frontend boot chooses between API-backed local mode and static-data deployed mode from an explicit runtime config. It must not infer production behavior from hostname alone.
- Trace behavior: the shipped static artifact must not include trace recorder controls or trace recorder implementation files. Dev mode may keep trace recording because it is useful for local diagnostics.
- Undo behavior: deployed mode must not expose an Undo button, must not bind `KeyZ` to undo, and must not dispatch undo from player-accessible UI. Local development may keep undo. Reset remains visible and functional.
- Game behavior: movement, facing, jump, interact, gravity, stack-stability, completion, level selection, replay/reset, and local progress behavior remain consistent with accepted specs except for deployed-mode undo removal.
- Redeploy behavior: Vercel redeploys should use the same repo-local static export path each time so level or UI updates can be shipped by regenerating `dist` from source.
- Blog behavior: a `terzima.com` blog post can link to `https://block-builder.terzima.com/`. Editing the blog is outside this spec.
- Explicitly unchanged behavior: no production server persistence, no accounts, no cloud save, no network APIs beyond static file fetches, and no hidden trace upload endpoint.

## Interface and data contract

- Existing local runtime files:
  - `frontend/index.html`
  - `frontend/style.css`
  - `frontend/js/app.js`
  - `frontend/js/api.js`
  - `frontend/js/input.js`
  - `frontend/js/ui.js`
  - `frontend/js/trace-recorder.js`
  - `shared/app_contract.json`
  - `backend/app/data/levels.json`
- Expected new or changed release files:
  - `package.json`
  - `package-lock.json`
  - `tools/export_static_site.py` or an equivalent no-dependency repo-local export script.
  - `dist/` as the generated static output directory. `dist/` is generated output and must not become source of truth.
  - `dist/index.html`
  - `dist/style.css`
  - `dist/js/*.js`
  - `dist/js/trace-recorder.js` must not exist in the shipped artifact.
  - `dist/shared/app_contract.json`
  - `dist/static-data/config.json`
  - `dist/static-data/levels.json`
  - `dist/static-data/levels/{levelId}.json`
  - `vercel.json` only if required to make Vercel use the intended static output, routing, redirects, headers, or clean URLs.
- Existing local API routes remain available in development:
  - `GET /api/v1/health`
  - `GET /api/v1/config`
  - `GET /api/v1/levels`
  - `GET /api/v1/levels/{levelId}`
  - `GET /shared/app_contract.json`
- Static data routes for deployed mode:
  - `GET /shared/app_contract.json`
  - `GET /static-data/config.json`
  - `GET /static-data/levels.json`
  - `GET /static-data/levels/{levelId}.json`

### Runtime Config Contract

The frontend must read an explicit runtime config before wiring API, inputs, trace tools, or controls. The exact source may be an inline script in `index.html` or a static JSON/module file, but the public object must normalize to this shape:

```json
{
  "mode": "dev",
  "dataSource": "api",
  "dataBasePath": "/static-data",
  "enableTraceRecorder": true,
  "enableUndo": true
}
```

Allowed values:

- `mode`: `"dev"` or `"deployed"`
- `dataSource`: `"api"` or `"static"`
- `dataBasePath`: non-empty absolute path beginning with `/`
- `enableTraceRecorder`: boolean
- `enableUndo`: boolean

Required defaults:

- If runtime config is absent, local development defaults to:

```json
{
  "mode": "dev",
  "dataSource": "api",
  "dataBasePath": "/static-data",
  "enableTraceRecorder": true,
  "enableUndo": true
}
```

- The generated Vercel/static release must set:

```json
{
  "mode": "deployed",
  "dataSource": "static",
  "dataBasePath": "/static-data",
  "enableTraceRecorder": false,
  "enableUndo": false
}
```

### Static JSON Contract

`dist/static-data/config.json` must contain:

```json
{
  "contract": {}
}
```

`contract` must be the same data as `shared/app_contract.json`, except for any explicitly planned release-mode overrides such as disabling undo key bindings for deployed mode.

`dist/static-data/levels.json` must contain:

```json
{
  "levels": []
}
```

The generated `levels` array must include exactly 50 items with IDs `1` through `50`.

Each `levels` item must match the existing `LevelMeta` API shape:

```json
{
  "id": 1,
  "slug": "level-1",
  "title": "First Block",
  "width": 8,
  "height": 6,
  "difficulty": 1
}
```

`dist/static-data/levels/{levelId}.json` must contain one full `LevelDefinition` object using the existing API detail shape:

```json
{
  "id": 1,
  "slug": "level-1",
  "title": "First Block",
  "width": 8,
  "height": 6,
  "difficulty": 1,
  "grid": []
}
```

The export must generate one level detail JSON file for every ID `1` through `50`.

### Vercel Deployment Contract

- Deployment target: a separate Vercel project for Block Builder.
- Public domain target: `block-builder.terzima.com`.
- Domain routing: Vercel routes `block-builder.terzima.com` directly to the static output for this separate project.
- Build command target: a repo-local static export command defined by the implementation plan.
- Output directory target: `dist`.
- Remote Vercel project linking, domain connection, DNS changes, environment settings, and production deploys are A3 actions.
- The deployed app must not require Python, FastAPI, Uvicorn, API serverless functions, or private environment variables at runtime.

### Vercel Repository Contract

The linked GitHub repository must be organized so Vercel can build the game repeatably:

- Root package manifest: `package.json` must remain at the repository root.
- Build script: `package.json` must define a `build` script that generates the static release artifact into `dist`.
- Dependency definitions: any build/runtime package dependency required by the web release must be declared in `package.json`. This spec does not approve adding new package dependencies; the plan must keep dependencies empty/unchanged unless a later accepted A3 dependency approval names the package and rationale.
- Lockfile: the repository must include exactly one Node package-manager lockfile for the Vercel build path. The default target is root `package-lock.json` for npm. Do not introduce `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb` unless the plan explicitly changes the package manager.
- Web source files: the repository must contain the HTML, CSS, JavaScript, shared contract, level data, and export tooling needed to regenerate `dist` from source.
- Framework preset: because this app is vanilla static HTML/CSS/JavaScript with a repo-local export command, the Vercel project should use a static/other preset rather than relying on framework detection. The repo must not add `next.config.js`, `vite.config.js`, `nuxt.config.js`, `svelte.config.js`, or a framework scaffold solely for deployment.
- Optional Vercel config: if Vercel cannot infer the intended build command/output cleanly from `package.json` and project settings, add a minimal root `vercel.json` for output directory, clean URLs, routing, redirects, or headers. Do not put secrets in `vercel.json`.
- Git deployment behavior: once the Vercel project is linked to GitHub, new pushes to the configured branch may trigger Preview or Production deployments. The plan must document which branch is expected to deploy and where the owner should verify previews before production/domain routing.

### Error and Validation Contract

Static export must fail before writing a releasable `dist` when:

- `backend/app/data/levels.json` is invalid.
- `shared/app_contract.json` is invalid JSON.
- A level detail file cannot be generated for every exported level.
- `config.json`, `levels.json`, or any `levels/{levelId}.json` would be malformed JSON.
- Runtime config has unsupported values.
- Production runtime config enables trace recording.
- Production runtime config enables undo.
- The generated public HTML contains visible trace recorder controls or visible Undo controls.
- The generated static artifact contains trace recorder implementation files.
- The generated static artifact does not contain exactly 50 level metadata entries and detail files for IDs `1` through `50`.

Failure output must include a concise message naming the failing file or contract field. The implementation plan may choose exact exception names, but test assertions must check stable message text for the production-safety failures above.

## Requirements

### Functional

- FR-1: Add a no-dependency local static export path that generates `dist/` from canonical source files.
- FR-2: Add frontend data-loading support for both API-backed local mode and static-data deployed mode.
- FR-3: Keep local FastAPI development mode functional after static export work.
- FR-4: Generate static config and level JSON from `shared/app_contract.json` and `backend/app/data/levels.json`.
- FR-5: Ensure the shipped artifact excludes trace recorder UI, trace recorder event wiring, and trace recorder implementation files.
- FR-6: Preserve local dev trace recording when running in dev/API mode.
- FR-7: Ensure deployed mode disables visible Undo and keyboard undo while local development may keep undo.
- FR-8: Ensure Reset remains visible and usable in deployed mode.
- FR-9: Ship all 50 canonical levels in static JSON.
- FR-10: Keep `package.json` at the repo root and add a `build` script that generates `dist`.
- FR-11: Add a root `package-lock.json` for npm-based Vercel repeatability unless an accepted plan chooses a different package manager.
- FR-12: Avoid adding framework configs or framework dependencies solely for Vercel deployment.
- FR-13: Add `vercel.json` only if needed for output directory, clean URLs, routing, redirects, or headers.
- FR-14: Keep player progress in browser `localStorage`; no server persistence is added.
- FR-15: Add tests that prove static JSON shapes match existing API response contracts.
- FR-16: Add tests that prove local/dev defaults still allow API mode and dev trace capture.
- FR-17: Add tests that prove deployed mode uses static data and excludes player-facing Record/Undo controls.
- FR-18: Add tests that prove Reset remains available in deployed mode.
- FR-19: Document local static preview, GitHub-to-Vercel build expectations, preview/production deployment behavior, and Vercel project/domain setup steps without requiring credentials in the repo.

### Non-functional

- Performance: the static release must load levels without an API server. The implementation plan must include a local static preview smoke test.
- Security/privacy: deployed mode must not expose trace capture/upload behavior, secrets, environment files, or dev-only endpoints. The app must not read cookies or send gameplay data to a server.
- Accessibility: removing Undo must not remove keyboard access to movement, interact, reset, level selection, completion, or status announcements.
- Maintainability: generated `dist/` must be reproducible from source files and must not become canonical data. Any Vercel config must be small and explicit.
- Mobile web: the release must remain playable in a mobile browser viewport. Native-app packaging is deferred.

## Dependencies and approvals

- Prerequisite specs/plans:
  - `SPEC-0002` for backend level/config API contracts.
  - `SPEC-0003` for frontend gameplay and input contracts.
  - `SPEC-0004` and `SPEC-0005` for current canonical level-expansion context.
- Existing files to read before planning:
  - `AGENTS.md`
  - `docs/repo-map.md`
  - `docs/status/CURRENT_STATE.md`
  - `docs/specs/SPEC-0006-vercel-static-web-release.md`
  - `frontend/index.html`
  - `frontend/js/app.js`
  - `frontend/js/api.js`
  - `frontend/js/input.js`
  - `frontend/js/ui.js`
  - `frontend/js/trace-recorder.js`
  - `shared/app_contract.json`
  - `backend/app/data/levels.json`
  - `backend/app/services/level_service.py`
  - relevant tests named by the plan
- Approval-required A3 actions:
  - Accessing the network.
  - Installing or updating dependencies.
  - Running Vercel CLI commands that talk to Vercel.
  - Connecting or modifying `block-builder.terzima.com`.
  - Changing DNS records.
  - Creating, modifying, or reading deployment secrets.
  - Pushing branches or opening pull requests.
- The implementation plan may complete local code/docs/export/test work before the A3 deployment gate if automated checks pass and no remote action is attempted.

## Acceptance gates

### Automated

The implementation plan must include exact commands, but the final gate set must cover:

```bash
python3 tools/export_static_site.py
python3 -m json.tool package-lock.json
python3 -m json.tool dist/static-data/config.json
python3 -m json.tool dist/static-data/levels.json
node -e "const p=require('./package.json'); if (!p.scripts?.build) throw new Error('missing build script')"
node tests/js/run-tests.mjs
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
git diff --check
```

Additional automated gates required by the plan:

- Static export validation proves every generated level detail file is valid JSON.
- Static export validation proves the generated level metadata includes exactly IDs `1` through `50`.
- Static export validation proves deployed-mode runtime config has `dataSource: "static"`, `enableTraceRecorder: false`, and `enableUndo: false`.
- Static export validation proves trace recorder implementation files are absent from `dist`.
- Repository validation proves `package.json` has a root `build` script for Vercel.
- Repository validation proves exactly one supported Node lockfile is present for the chosen package manager.
- Repository validation proves no framework config is added unless a later accepted plan explicitly changes the app framework.
- Tests prove local dev defaults still support API mode.
- Tests prove deployed mode does not render player-facing Record controls.
- Tests prove deployed mode does not render or dispatch player-facing Undo.
- Tests prove Reset remains available in deployed mode.

### Manual checks

- Serve the generated `dist/` locally with a static file server.
- Open the static preview in a desktop browser and confirm the game loads, level selection works, level 1 can be completed, Reset works, no Record controls are visible, and no Undo control is visible or keyboard-accessible.
- Open the static preview in a mobile-size viewport and confirm the board and controls are usable.
- After A3 deployment approval and deploy, open `https://block-builder.terzima.com/` and repeat the smoke test.
- After public URL validation, the project owner may link to the game from a `terzima.com` blog post.

### Human

- Required: Yes.
- Reason: Vercel deployment, custom domain setup, DNS, and public-release UX are external-service and product-judgment gates.
- A3 stop: do not run remote Vercel, DNS, or network deployment commands until the project owner explicitly approves that action.
- A2 stop: after local static preview passes automated checks, stop for product-owner browser review before treating the release as ready for public deployment.

## Risks and open questions

- Risk: shipping all canonical levels 1-50 may expose local playtest levels 31-50 whose replay evidence is intentionally unproven; this is accepted for this release so the owner can test and iterate quickly after deployment.
- Risk: excluding trace recorder code from `dist` while preserving dev trace behavior may require a small frontend module boundary or export-copy rule.
- Risk: removing undo from public input can make a mistake feel harsher. Reset remains available, and puzzle design already assumes restructuring rather than undo.
- Risk: adding a lockfile for Vercel repeatability may look like a dependency change even if no dependencies are added; the plan must keep dependency additions separate from the lockfile requirement.
- Risk: Vercel project settings and DNS ownership cannot be verified without account access and network actions.

## Stop conditions

- Stop if implementation requires new dependencies, a frontend bundler, CI/deployment config changes, or network access not already approved.
- Stop if static deployment cannot preserve existing gameplay without changing accepted mechanics.
- Stop if production runtime cannot be proven to disable trace recording and undo.
- Stop if the public release cannot include all 50 canonical levels without changing accepted level data.
- Stop if Vercel, DNS, or domain setup requires account credentials or remote commands.
- Stop if local static preview fails and cannot be fixed within the accepted plan.
