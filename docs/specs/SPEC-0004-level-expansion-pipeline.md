# SPEC-0004: Level Expansion Pipeline

Status: Accepted
Approval Class: A2
Maturity: M2
Owner: Unassigned
Created: 2026-06-11
Updated: 2026-06-11
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `docs/project-charter.md`, `docs/roadmap.md`, `docs/glossary.md`, `docs/repo-map.md`, `docs/status/CURRENT_STATE.md`, `docs/adr/ADR-0000-architecture-direction.md`, `SPEC-0002`, `SPEC-0003`, and `docs/intake/candidate_levels_6_20.json`.
- Current evidence: commit `96545e9` contains the first playable UI, backend level APIs, first-five level data, CR-0002, and CR-0003 level redesign. The repo is on branch `codex/application-scaffold`.
- Current evidence: `backend/app/data/levels.json` contains exactly five validated 8x6 levels. `backend/app/services/level_service.py` currently validates the exact ID sequence `[1, 2, 3, 4, 5]`.
- Current evidence: `tests/js/run-tests.mjs` exercises engine and physics behavior with no frontend dependencies. `tools/validate_levels.py` validates the canonical level file through backend service logic.
- Current evidence: `docs/intake/candidate_levels_6_20.json` contains candidate definitions for IDs 6-20, with variable board sizes from 16x9 through 34x17 and block counts from 4 through 17. These candidates are intake source material for this spec, not accepted production data and not a runtime input.
- Current gate: the first playable A2 human UX/product checkpoint is still open in `docs/status/CURRENT_STATE.md`. This spec is accepted and `PLAN-0004` is ready, but implementation must not begin until that checkpoint is accepted.
- Why this slice next: the roadmap names level expansion as the next candidate after first-five validation, and the project charter preserves a path toward a 100-level target after the first five are playable.

## Problem

The project needs a controlled way to expand from five tutorial/prototype levels to the first 20 levels without weakening validator guarantees, inventing mechanics, or leaving the next plan to guess level data. The new levels must become real construction puzzles: later levels should require substantial player-built scaffolds, not merely larger versions of the first-five tutorial path.

## Goals

- Expand the canonical local level set from levels 1-5 to levels 1-20 using the candidate source defined by this spec.
- Preserve levels 1-5 unless the A2 first-playable review opens an accepted Change Request.
- Allow variable board dimensions for levels 6-20 so scaffold-building puzzles are not constrained to the first-five 8x6 tutorial size.
- Make later levels construction-first: the intended difficulty comes from staging, carrying, placing, climbing, retrieving, and reusing blocks to build a larger structure.
- Define durable solution evidence for every canonical level.
- Validate that level data does not visually depend on immediate initial gravity correction: raw `P` and `B` cells must start supported.
- Keep the level expansion path dependency-light and compatible with the existing FastAPI and vanilla JavaScript architecture.
- Keep API route shapes and frontend gameplay mechanics unchanged.
- Create acceptance gates that prove level data validity, API compatibility, engine-level solvability, and human product review for the expanded level set.

## Non-goals

- Levels 21-100.
- Procedural generation, AI-assisted generation, production solver search, formal SAT/pathfinding tooling, or new production dependencies.
- New tiles, hazards, enemies, keys, doors, switches, timers, moving platforms, pushing blocks, multiple goals, multiple players, or continuous physics.
- Frontend art direction, sound, music, analytics, accounts, cloud saves, deployment, hosting, or HTTPS.
- Backend-owned gameplay simulation beyond validation and level serving.
- Reworking the accepted first-playable mechanics from `SPEC-0003`.
- Using `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts as routine implementation inputs.
- Serving `docs/intake/candidate_levels_6_20.json` directly at runtime.

## Users / actors

- Local player: plays and completes the expanded level list in the browser.
- Level author: adds and revises level definitions and solution evidence.
- Frontend app: loads metadata and selected level details through existing API routes.
- Backend API: validates and serves the expanded level data.
- Agent/developer: runs validation, API tests, JS tests, and solution evidence checks.
- Project owner: reviews difficulty curve, clarity, and product feel before accepting the expanded level batch.

## Behavioral contract

- User-visible behavior: the level selector exposes levels 1-20, each level can be loaded, and each level can be completed with the existing movement, jump, interact, gravity, reset, undo, and progress behavior.
- User-visible level shape: levels 6-20 may be larger than the first-five tutorial boards. The browser UI must render each board from its declared `width` and `height` without clipping controls, hiding the completion modal, or requiring a new route.
- Difficulty behavior: levels 6-9 introduce larger multi-block staging; levels 10-13 introduce split stockpiles/workbenches; levels 14-16 require larger vertical construction; levels 17-20 are endgame construction yards with many blocks and non-obvious scaffold planning.
- System responsibilities: backend validates and serves levels 1-20; frontend continues to derive API URLs and input mappings from `shared/app_contract.json`; automated checks verify level schema, API compatibility, and engine-level solution traces.
- Explicitly unchanged behavior: API route names, response envelope shapes, shared tile symbols, action names, keyboard bindings, localStorage progress format, and frontend-owned gameplay state remain unchanged unless a later accepted spec or Change Request says otherwise.

## Interface and data contract

- Files or modules likely affected by this slice:
  - `docs/intake/candidate_levels_6_20.json`
  - `backend/app/data/levels.json`
  - `backend/app/services/level_service.py`
  - `tools/validate_levels.py`
  - `tests/test_api.py`
  - `tests/test_level_validation.py`
  - `tests/js/run-tests.mjs`
  - `tests/js/level-solutions.test.js`
  - `tests/fixtures/level_solutions.json`
  - `docs/repo-map.md`
  - `docs/status/CURRENT_STATE.md`
- Public backend functions remain:
  - `load_levels(path)`
  - `validate_levels(levels, contract)`
  - `list_level_meta(levels)`
  - `get_level(levels, level_id)`
- Public frontend engine functions reused by solution checks remain:
  - `createInitialState(level, contract)`
  - `dispatchGameAction(state, action, level, contract)`
- API routes remain:
  - `GET /api/v1/levels`
  - `GET /api/v1/levels/{levelId}`
  - `GET /api/v1/config`
  - `GET /shared/app_contract.json`
- Config keys/env vars: unchanged.
- API error response shape remains `{ "error": { "code": "...", "message": "..." } }`.
- Validation and solution-check failures must expose stable code/message pairs. Existing validation error families remain valid; new or clarified codes for this slice are listed below.
- `docs/intake/candidate_levels_6_20.json` is an input to planning and implementation only. It must not be imported, fetched, bundled, or served by backend or frontend runtime code.

### Level Data Contract

`backend/app/data/levels.json` keeps the existing top-level shape:

```json
{
  "levels": []
}
```

For this slice:

- The canonical file contains exactly 20 levels.
- IDs are exactly the integer sequence `1` through `20`.
- Slugs are exactly `level-{id}`.
- Titles are non-empty and unique.
- `difficulty` is exactly equal to `id` for levels 1-20.
- Levels 1-5 remain exactly as committed in the first playable baseline unless an accepted Change Request from A2 review changes them.
- Levels 6-20 are sourced from `docs/intake/candidate_levels_6_20.json` and must use the exact IDs, slugs, titles, dimensions, difficulties, and grids from that source unless this spec is revised before planning.
- Levels 6-20 may use variable board sizes. The candidate source currently defines widths 16-34 and heights 9-17.
- Every grid has exactly `height` rows, and every row has exactly `width` characters.
- Boundary rows and columns are all `#`.
- Legal symbols remain exactly `.`, `#`, `P`, `B`, and `G`.
- Every level has exactly one `P`, exactly one `G`, and at least one `B`.
- Every raw `P` and `B` cell must be directly supported by `#` or `B` in the row below before initial engine gravity runs. This prevents the visual source grid from disagreeing with the settled initial state.
- Levels 6-20 use only mechanics accepted by `SPEC-0003` and CR-0003.
- Level data does not include solution metadata inside the API response.

### Candidate Level Source Contract

`docs/intake/candidate_levels_6_20.json` is the active non-runtime source for the new level content. It has this shape:

```json
[
  {
    "id": 6,
    "slug": "level-6",
    "title": "First Real Scaffold",
    "width": 16,
    "height": 9,
    "difficulty": 6,
    "grid": []
  }
]
```

The implementation plan must treat the following candidate table as the level-content contract for IDs 6-20:

| ID | Slug | Title | Size | Difficulty | Movable blocks |
|---:|---|---|---|---:|---:|
| 6 | `level-6` | First Real Scaffold | 16x9 | 6 | 4 |
| 7 | `level-7` | The Sunken Step | 18x10 | 7 | 5 |
| 8 | `level-8` | Basin Lift | 20x11 | 8 | 6 |
| 9 | `level-9` | Pit Supply | 21x11 | 9 | 7 |
| 10 | `level-10` | Shelf Stockpile | 22x12 | 10 | 7 |
| 11 | `level-11` | Across and Up | 24x12 | 11 | 8 |
| 12 | `level-12` | Build on the Workbench | 24x13 | 12 | 8 |
| 13 | `level-13` | Double Bench | 25x14 | 13 | 10 |
| 14 | `level-14` | Ten Block Pyramid | 26x14 | 14 | 10 |
| 15 | `level-15` | Crater Logistics | 28x14 | 15 | 11 |
| 16 | `level-16` | Raised Worksite | 30x15 | 16 | 10 |
| 17 | `level-17` | Split Hoist Yard | 31x16 | 17 | 11 |
| 18 | `level-18` | Lower Yard Cache | 32x17 | 18 | 17 |
| 19 | `level-19` | Two-Level Tower Yard | 32x16 | 19 | 13 |
| 20 | `level-20` | Final Scaffold Yard | 34x17 | 20 | 15 |

If any candidate level cannot be made solver-verifiable with the accepted mechanics, implementation must stop and return to Spec mode rather than inventing replacement level content during planning or implementation.

### Validation Error Contract

Validation failures must use these codes where applicable:

| Code | Applies when |
|---|---|
| `LEVEL_ID_SEQUENCE_INVALID` | Canonical IDs are not exactly `1..20` in order, or candidate IDs are not exactly `6..20` in order. |
| `LEVEL_SLUG_INVALID` | A slug is missing, duplicated, or not exactly `level-{id}`. |
| `LEVEL_TITLE_INVALID` | A title is empty or duplicated. |
| `LEVEL_DIFFICULTY_INVALID` | `difficulty` is not an integer equal to `id`. |
| `LEVEL_GRID_DIMENSIONS_INVALID` | Row count, row width, `width`, or `height` disagree. |
| `LEVEL_GRID_BOUNDARY_INVALID` | Any boundary cell is not `#`. |
| `LEVEL_GRID_SYMBOL_INVALID` | A grid contains a character outside `.`, `#`, `P`, `B`, `G`. |
| `LEVEL_ENTITY_COUNT_INVALID` | A level does not contain exactly one `P`, exactly one `G`, and at least one `B`. |
| `LEVEL_INITIAL_STATE_UNSTABLE` | A raw `P` or `B` cell is not supported by `#` or `B` below it. |
| `LEVEL_SOLUTION_MANIFEST_INVALID` | Solution manifest shape, version, IDs, or action names are invalid. |
| `LEVEL_SOLUTION_INVALID` | Replaying a solution returns an invalid action or does not complete the target level. |

Tools may add context such as `levelId`, `row`, `col`, `step`, and `action`, but the stable code and human-readable message are required.

### Solution Evidence Contract

`tests/fixtures/level_solutions.json` is the machine-readable solution manifest:

```json
{
  "version": "0.1.0",
  "contractVersion": "0.1.0",
  "solutions": [
    {
      "levelId": 1,
      "actions": ["moveRight", "interact"],
      "note": "Short human-readable intent."
    }
  ]
}
```

Rules:

- There is exactly one solution entry for every level ID `1` through `20`.
- `levelId` refers to an existing level.
- `actions` is a non-empty array.
- Action values are restricted to `moveLeft`, `moveRight`, `jump`, and `interact`.
- `reset`, `undo`, and `selectLevel` are not valid solution actions.
- Replaying the action sequence from `createInitialState(level, contract)` through `dispatchGameAction` must finish with `state.status === "completed"`.
- A solution step that returns `invalid: true` fails the solution evidence check.
- A solution that completes only after manually invoking `reset`, `undo`, or browser state mutation fails the solution evidence check.
- `note` is a short explanation for maintainers and is not surfaced to players.

### Runtime Mechanics Contract

Level expansion must use the accepted runtime behavior from `SPEC-0003`:

- Direction keys may turn in place before movement.
- Jump is diagonal: one row up and one column in the current facing direction.
- Interact picks up or places one adjacent block in the facing direction.
- Gravity settles uncarried blocks before the player.
- Completion occurs when the player occupies the goal after gravity resolves.
- Reset and undo remain player affordances, not required solution actions.
- A player may stand on a placed block while carrying another block, then place that carried block at the higher row. Levels 14-20 should rely on this construction primitive for meaningful scaffold-building difficulty.
- Level design must not require block pushing, multi-block carrying, vertical pickup, any-direction pickup, or action timing outside the deterministic turn model.

## Requirements

### Functional

- FR-1: Keep levels 1-5 unchanged unless an accepted Change Request from first-playable A2 review requires edits.
- FR-2: Add levels 6-20 to `backend/app/data/levels.json` using the candidate level source contract above.
- FR-3: Update level validation so the canonical level file requires exactly IDs `1` through `20`.
- FR-4: Keep level metadata and detail API response shapes unchanged while returning the expanded level set.
- FR-5: Add solution evidence for levels 1-20 in `tests/fixtures/level_solutions.json`.
- FR-6: Add a dependency-light JS solution evidence check that replays every solution through the existing engine.
- FR-7: Keep JS engine and physics behavior unchanged unless a separate accepted Change Request changes mechanics.
- FR-8: Update backend validation and API tests to reflect the expanded canonical level count.
- FR-9: Update durable docs that describe current verification commands and active project state.
- FR-10: Validate `docs/intake/candidate_levels_6_20.json` during planning/implementation checks, but do not import or serve it from runtime application code.
- FR-11: Ensure the browser UI can display variable-size levels 6-20 from API data without overlapping controls, hiding status text, or breaking keyboard/on-screen controls.
- FR-12: If any candidate level proves unsolvable or too weak to satisfy the construction-first goal, stop for Spec revision rather than substituting unreviewed level data.

### Non-functional

- Performance: loading and validating 20 small JSON levels remains file-based and synchronous at startup.
- Security/privacy: no player data, secrets, accounts, network calls, or cloud storage are introduced.
- Accessibility: no new UI controls are required; existing level selector behavior must remain keyboard reachable.
- Observability: validation failures continue to use structured `LevelValidationError` codes and messages.
- Maintainability: solution evidence is machine-readable, versioned, and kept separate from served API level data.
- UI resilience: large boards may scroll or scale within the existing play surface, but surrounding controls and status regions must remain usable on desktop and mobile-width layouts.

## Dependencies and approvals

- Prerequisite specs/plans: accepted and completed `SPEC-0002`/`PLAN-0002` and `SPEC-0003`/`PLAN-0003`.
- Prerequisite human gate: first-playable A2 UX/product checkpoint accepted for levels 1-5.
- Existing files to read first during planning: this spec, `backend/app/data/levels.json`, `backend/app/services/level_service.py`, `tests/test_level_validation.py`, `tests/test_api.py`, `tests/js/run-tests.mjs`, `frontend/js/engine.js`, and `shared/app_contract.json`.
- Active intake source for this slice: `docs/intake/candidate_levels_6_20.json`. Read this file only for level-content transcription/validation; do not use raw intake overview files for routine planning or implementation.
- Approval class: A2 because expanded level design and difficulty curve require human product judgment after automated checks pass.
- Approval-required actions: any dependency addition, dependency installation, lockfile change, network-backed command, generator tool, solver dependency, frontend framework, build tool, deployment change, or CI change.

## Acceptance gates

### Automated

```bash
git status --short
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
```

Expected evidence:

- Level validator reports 20 levels from `backend/app/data/levels.json`.
- Candidate intake validation confirms IDs 6-20, exact table fields, valid grid dimensions, valid symbols, boundary walls, required entity counts, and no unsupported raw `P`/`B` cells.
- Backend API tests prove list/detail routes handle levels 1-20 and preserve not-found behavior.
- JS tests include level solution evidence and complete every level without invalid actions.
- Variable-size levels render in the browser from declared `width`/`height`; no level may silently assume an 8x6 board.
- No new dependency or lockfile is introduced by the default path.

### Human

- Required? Yes
- Reason: levels 6-20 are player-facing puzzle content with difficulty, clarity, and product-feel judgment.

### Manual checks

- Start the local server and load `http://127.0.0.1:8000/`.
- Confirm the level selector exposes levels 1-20.
- Complete levels 6-20 manually, or have the project owner review a documented playthrough for any level they do not personally complete.
- Confirm reset, undo, invalid feedback, completion modal, and best-moves persistence still work after selecting later levels.
- Confirm the difficulty curve does not rely on unexplained mechanics outside `SPEC-0003`.
- Confirm levels 14-20 feel like construction/scaffold puzzles rather than simple path-following or single-block bridge puzzles.
- Confirm larger boards remain legible and controllable on desktop and mobile-width layouts.

## Risks and open questions

- Risk: first-playable A2 review changes mechanics or early levels before expansion begins.
  - Mitigation: do not implement this spec until A2 is accepted, or open a Change Request if A2 feedback changes the prerequisite mechanics.
- Risk: variable-size grids expose renderer, layout, or selector assumptions that were harmless for 8x6 levels.
  - Mitigation: require API compatibility tests, browser manual checks, and no hardcoded 8x6 assumptions in new solution/validation checks.
- Risk: hand-authored solution manifests can drift from level data.
  - Mitigation: replay all solution manifests through the engine in automated checks.
- Risk: difficulty curve quality cannot be fully machine-verified.
  - Mitigation: keep A2 human review for the expanded level batch.
- Risk: candidate levels from `docs/intake/candidate_levels_6_20.json` are structurally valid but not yet solver-proven.
  - Mitigation: solution evidence is mandatory before acceptance; unsolved candidates trigger Spec revision.
- Open question: should the project owner require personal manual completion of all 15 new levels, or accept a combination of automated solution evidence and reviewed playthrough notes?
- Open question: should human review accept the current candidate level names, or should titles be revised before implementation while keeping the same level geometry?

## Stop conditions

- First-playable A2 checkpoint is not accepted.
- `docs/intake/candidate_levels_6_20.json` is missing, malformed, or does not match the candidate table in this spec.
- Level expansion requires a new gameplay mechanic, tile symbol, action name, API response shape, or frontend route behavior.
- The existing engine cannot replay solution evidence without modifying accepted mechanics.
- A generator, solver, package install, lockfile, network access, CI change, or deployment change becomes necessary.
- Levels 1-5 need edits outside an accepted Change Request.
- Product judgment is needed on difficulty curve, tutorial language, or level feel before accepting the expanded batch.
- Implementation would need to read `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide level behavior.
