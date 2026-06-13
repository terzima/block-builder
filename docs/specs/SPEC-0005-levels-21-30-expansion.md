# SPEC-0005: Levels 21-30 Expansion

Status: Accepted
Approval Class: A2
Maturity: M2
Owner: Unassigned
Created: 2026-06-12
Updated: 2026-06-12
Related plan: `docs/plans/PLAN-0005-levels-21-30-expansion.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `AGENTS.md`, `docs/repo-map.md`, `docs/status/CURRENT_STATE.md`, `docs/project-charter.md`, `docs/roadmap.md`, `docs/glossary.md`, `docs/adr/ADR-0000-architecture-direction.md`, `SPEC-0003`, `SPEC-0004`, `shared/app_contract.json`, `backend/app/services/level_service.py`, `backend/app/schemas.py`, `tests/js/level-solutions.test.js`, and `docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Current evidence from `docs/status/CURRENT_STATE.md`: `SPEC-0004` is Accepted, `PLAN-0004` is Ready for Implementation and partially implemented, levels 1-20 are manually confirmed solvable, and current automated solution evidence is blocked only by missing replayable level 20 evidence.
- Current evidence from source: `backend/app/data/levels.json` currently contains exactly levels 1-20; `backend/app/services/level_service.py` currently validates canonical IDs 1-20 and candidate IDs 6-20.
- Current evidence from source: `tests/js/level-solutions.test.js` requires exact replay-certified solution coverage for every canonical level in `backend/app/data/levels.json`.
- Current evidence from intake: `docs/intake/block_builder_levels_20_30_rebuilt.json` contains IDs 20-30. ID 20 is overlap context for the current end of `SPEC-0004`; this spec's new level content scope is IDs 21-30 only.
- Why this slice now: the roadmap calls for continuing level creation in batches of 10 toward the 100-level target after first playable validation and the first expanded level set.

`docs/intake/PROJECT_OVERVIEW_RAW.md` was not read for this spec because the seeded docs, current state, existing specs, shared contract, and new intake source were sufficient.

## Problem

The project needs a controlled requirements slice for expanding the canonical level set from levels 1-20 to levels 1-30 without reopening accepted mechanics, importing overlapping level 20 by accident, or depending on an unreliable solver as the only proof of solvability. The new levels must use the provided intake source for IDs 21-30, but implementation must still produce replay-certified evidence before the levels are accepted as canonical.

## Goals

- Expand the canonical local level set from levels 1-20 to levels 1-30 using `docs/intake/block_builder_levels_20_30_rebuilt.json` for levels 21-30.
- Treat the intake file's level 20 entry as overlap/source context only; do not replace canonical level 20 under this spec.
- Preserve existing mechanics, tile symbols, API route shapes, shared contract actions, and frontend-owned gameplay logic.
- Update validation contracts so canonical data can validate exactly IDs 1-30 and the rebuilt intake source can validate exactly IDs 20-30 as a candidate/reference file.
- Require replay-certified solution evidence for levels 21-30 before this expansion can be accepted as complete.
- Allow solution evidence to come from either current solver output or manual trace capture, as long as the final action list replays through `createInitialState(...)` and `dispatchGameAction(...)`.
- Keep solver/analyzer output design-facing and advisory for this slice; a solver `SOLVED` result is useful evidence but not the only accepted proof.
- Extend resource analysis for the expanded level range so obvious block deficits are caught before human review.
- Preserve the level selector, API responses, local progress, reset/undo, and completion behavior for existing levels.
- Require an A2 product review for difficulty curve, visual legibility, and puzzle feel after automated checks pass.

## Non-goals

- Replacing, redesigning, or revalidating canonical level 20 beyond the existing `SPEC-0004`/`PLAN-0004` evidence gate.
- Levels 31-100.
- New gameplay mechanics, new tile types, continuous physics, pushing blocks, multiple players, multiple goals, hazards, doors, keys, switches, timers, moving platforms, enemies, or score systems.
- Runtime solver behavior, production hint systems, AI-assisted level generation, external solver packages, formal proof tooling, or new dependencies.
- Changing API route names, response envelope shapes, shared action names, keyboard bindings, or localStorage progress keys.
- Serving `docs/intake/block_builder_levels_20_30_rebuilt.json` directly at runtime.
- Treating manual traces as hidden solver hints for validity mode.
- Reading or importing `docs/intake/PROJECT_OVERVIEW_RAW.md` during routine implementation.
- UI art-direction overhaul, sound, analytics, accounts, deployment, hosting, CI, or security policy changes.

## Users / actors

- Local player: selects and plays levels 1-30 in the browser.
- Level author: imports and revises level data only through accepted spec/plan scope.
- Backend API: validates and serves expanded level metadata and details.
- Frontend app: renders variable-size boards and preserves gameplay behavior across the expanded level list.
- Local validation tooling: verifies canonical data, candidate data, resources, API behavior, and replay-certified solution evidence.
- Solver/analyzer tooling: may provide diagnostics and candidate action lists, but does not mutate level files.
- Project owner: reviews levels 21-30 for product fit, difficulty curve, and clarity.

## Behavioral contract

- User-visible behavior: the level selector exposes levels 1-30 after implementation, and levels 21-30 load through the same browser UI as earlier levels.
- User-visible level shape: levels 21-30 may use larger boards than tutorial levels, but the UI must render the full board and controls without clipping or hidden completion flow.
- Puzzle behavior: levels 21-30 remain deterministic side-view block-placement puzzles using existing move, jump, interact, gravity, reset, undo, completion, and progress rules.
- Canonical data behavior: levels 1-20 remain governed by accepted `SPEC-0004` scope. This spec appends canonical IDs 21-30 only.
- Candidate-source behavior: `docs/intake/block_builder_levels_20_30_rebuilt.json` is an implementation source and validation fixture. It is not runtime data and is not served by the API.
- Level 20 overlap behavior: the intake entry for ID 20 must not overwrite `backend/app/data/levels.json` level 20 unless a later accepted Change Request explicitly changes level 20.
- Solution-evidence behavior: every canonical level must have at least one non-empty action list in `tests/fixtures/level_solutions.json`; the list must replay without invalid actions and finish with `state.status === "completed"`.
- Solver behavior: solver/analyzer commands may be run for diagnostics and candidate actions. A non-solved solver result for levels 21-30 does not by itself block acceptance when replay-valid manual trace evidence exists.
- Resource behavior: resource analysis must report available blocks, deterministic required blocks, and surplus/deficit for the expanded resource range. Any deterministic deficit blocks acceptance until fixed by a new accepted spec/plan or Change Request.
- Explicitly unchanged behavior: the backend does not own gameplay simulation; the frontend engine remains the authoritative runtime transition system; API error responses remain `{ "error": { "code": "...", "message": "...", "details": {} } }`.

## Interface and data contract

- Source intake file:
  - `docs/intake/block_builder_levels_20_30_rebuilt.json`
- Canonical runtime data:
  - `backend/app/data/levels.json`
- Backend validation and API helpers:
  - `backend/app/services/level_service.py`
  - `backend/app/schemas.py`
- Shared contract:
  - `shared/app_contract.json`
- Frontend/runtime replay APIs:
  - `frontend/js/engine.js`
  - `frontend/js/physics.js`
- Tooling and tests:
  - `tools/validate_levels.py`
  - `tools/solve-levels.mjs`
  - `tests/test_api.py`
  - `tests/test_level_validation.py`
  - `tests/js/run-tests.mjs`
  - `tests/js/level-solutions.test.js`
  - `tests/js/solver.test.js`
  - `tests/fixtures/level_solutions.json`
  - `tests/fixtures/level_resource_requirements.json`
  - `tests/fixtures/manual_traces/*.json` only when replay-valid trace fixtures are needed
- Durable docs:
  - `docs/repo-map.md`
  - `docs/status/CURRENT_STATE.md`

### API Contract

Existing routes remain unchanged:

- `GET /api/v1/config`
- `GET /api/v1/levels`
- `GET /api/v1/levels/{levelId}`
- `GET /shared/app_contract.json`

`GET /api/v1/levels` returns metadata for exactly 30 canonical levels after implementation. Each item keeps the existing `LevelMeta` shape:

```json
{
  "id": 21,
  "slug": "level-21",
  "title": "Recover the First Step",
  "width": 14,
  "height": 11,
  "difficulty": 21
}
```

`GET /api/v1/levels/{levelId}` returns the existing `LevelDefinition` shape with `grid` for IDs 1-30. `LEVEL_NOT_FOUND` remains the error for IDs outside the canonical set.

### Canonical Level Data Contract

`backend/app/data/levels.json` keeps the existing top-level shape:

```json
{
  "levels": []
}
```

For this slice:

- The canonical file contains exactly 30 levels.
- IDs are exactly the integer sequence `1` through `30`.
- Slugs are exactly `level-{id}`.
- Titles are non-empty and unique.
- `difficulty` is exactly equal to `id` for all canonical levels.
- Levels 1-20 remain unchanged except for separate accepted `SPEC-0004`/`PLAN-0004` work.
- Levels 21-30 use the exact IDs, slugs, titles, dimensions, difficulties, and grid strings from `docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Every grid has exactly `height` rows, and every row has exactly `width` characters.
- Boundary rows and columns are all `#`.
- Legal symbols remain exactly `.`, `#`, `P`, `B`, and `G`.
- Every level has exactly one `P`, exactly one `G`, and at least one `B`.
- Every raw `P` and `B` cell must be directly supported by `#` or `B` in the row below before initial engine gravity runs.
- Level data does not include solution metadata, resource metadata, solver diagnostics, or trace data inside API responses.

### Level 21-30 Content Contract

The implementation plan must treat this table as the accepted content target for new canonical levels:

| ID | Slug | Title | Size | Difficulty | Movable blocks |
|---:|---|---|---|---:|---:|
| 21 | `level-21` | Recover the First Step | 14x11 | 21 | 3 |
| 22 | `level-22` | The Pit Toll | 16x12 | 22 | 4 |
| 23 | `level-23` | The Higher Base | 17x12 | 23 | 4 |
| 24 | `level-24` | Shelf Before Scaffold | 17x13 | 24 | 4 |
| 25 | `level-25` | Quarry Toll | 17x12 | 25 | 5 |
| 26 | `level-26` | Bring the Exit Block | 20x14 | 26 | 4 |
| 27 | `level-27` | Harvest Before Climb | 22x15 | 27 | 4 |
| 28 | `level-28` | Carry Into the Basin | 24x15 | 28 | 5 |
| 29 | `level-29` | Shelf Before Crossing | 24x14 | 29 | 5 |
| 30 | `level-30` | Two Quarries, One Crossing | 26x14 | 30 | 6 |

The source file also contains:

| ID | Slug | Title | Scope decision |
|---:|---|---|---|
| 20 | `level-20` | Final Scaffold Yard | Overlap/reference only; do not import or replace canonical level 20 in this spec. |

### Candidate Source Validation Contract

`docs/intake/block_builder_levels_20_30_rebuilt.json` must validate as an array of exactly IDs 20-30 in order.

The future implementation plan must either extend existing candidate validation to support this intake source or name a focused validator path for it. Validation errors should reuse existing `LevelValidationError` codes where possible:

- `LEVEL_ID_SEQUENCE_INVALID`
- `LEVEL_TITLE_INVALID`
- `LEVEL_DIFFICULTY_INVALID`
- `LEVEL_SLUG_INVALID`
- `LEVEL_GRID_DIMENSIONS_INVALID`
- `LEVEL_GRID_SYMBOL_INVALID`
- `LEVEL_GRID_BOUNDARY_INVALID`
- `LEVEL_ENTITY_COUNT_INVALID`
- `LEVEL_INITIAL_STATE_UNSTABLE`

### Resource Analysis Contract

`tests/fixtures/level_resource_requirements.json` must cover the expanded resource-analysis range after implementation. The preferred contract is one manifest covering IDs 6-30 in order so the project keeps one resource evidence source for all expanded levels.

The manifest shape remains:

```json
{
  "version": "0.1.0",
  "levels": [
    {
      "levelId": 21,
      "segments": [
        { "name": "example-segment", "fromRow": 8, "toRow": 5 }
      ]
    }
  ]
}
```

Rules:

- Each resource entry must include one or more named segments.
- Segment names are non-empty and unique within a level.
- `fromRow` and `toRow` are zero-based integers within the level height.
- Segment `rise` is `max(0, fromRow - toRow)`.
- Segment `requiredBlocks` is `rise * (rise + 1) / 2`.
- Level `availableBlocks` is the count of `B` cells in the canonical level grid.
- Level `surplusBlocks` is `availableBlocks - requiredBlocks`.
- A negative surplus is a blocking resource deficit.
- Surplus blocks are allowed when replay-certified solution evidence and A2 review pass.

### Solution Evidence Contract

`tests/fixtures/level_solutions.json` remains the replay-certified completion source:

```json
{
  "version": "0.1.0",
  "contractVersion": "0.1.0",
  "solutions": [
    {
      "levelId": 21,
      "note": "Replay-certified solution source.",
      "actions": ["moveRight", "jump", "interact"]
    }
  ]
}
```

Rules:

- The fixture must include exactly one entry per canonical level in `backend/app/data/levels.json`.
- For this spec's completion state, entries must cover IDs 1-30 exactly.
- `actions` must be a non-empty array.
- Every action must be one of `moveLeft`, `moveRight`, `jump`, or `interact`.
- Replaying every action through `createInitialState(...)` and `dispatchGameAction(...)` must never produce `invalid: true`.
- The final replayed state must have `status === "completed"`.
- Manual trace sources may be copied into focused fixtures only after replay validation. Manual traces remain evidence inputs, not runtime data and not solver hints.

## Requirements

### Functional

- FR-1: Append levels 21-30 to canonical level data using the intake source's exact grid strings and metadata for IDs 21-30.
- FR-2: Preserve canonical level 20 and all earlier levels unless separate accepted scope changes them.
- FR-3: Update level validation to accept canonical IDs 1-30 exactly.
- FR-4: Add or extend intake-source validation for `docs/intake/block_builder_levels_20_30_rebuilt.json` as IDs 20-30 exactly.
- FR-5: Extend API tests so level metadata/detail behavior covers levels 21-30 and exact canonical count 30.
- FR-6: Extend resource requirements and resource validation to levels 21-30.
- FR-7: Add replay-certified solution fixture entries for levels 21-30.
- FR-8: Preserve exact solution fixture coverage for all canonical levels. If level 20 evidence is still missing, resolve that existing gate before claiming levels 1-30 complete or stop with a clear handoff.
- FR-9: Keep solver/analyzer diagnostics optional for acceptance when replay-certified evidence exists, but preserve existing solver regression tests.
- FR-10: Update durable status/repo-map docs only for commands, active state, and resume context changed by this expansion.

### Non-functional

- Performance: level loading and validation remain local-file operations; `GET /api/v1/levels` and `GET /api/v1/levels/{levelId}` stay responsive for 30 levels.
- Security/privacy: no cloud, account, analytics, or external telemetry is introduced; manual traces and solution fixtures remain local repo files.
- Accessibility: expanded boards must preserve existing keyboard/on-screen controls, status feedback, and completion flow.
- Observability: validator and solution replay failures must identify the level ID and the failing invariant or action step.
- Maintainability: new level evidence should reuse existing JSON fixtures and no-dependency Node/Python checks instead of adding dependencies.

## Dependencies and approvals

- Prerequisite specs/plans: accepted `SPEC-0003`; accepted `SPEC-0004`; `PLAN-0004` must no longer block exact solution fixture coverage for level 20 before this expansion can be marked complete.
- Existing files to read first in the implementation plan: `backend/app/data/levels.json`, `docs/intake/block_builder_levels_20_30_rebuilt.json`, `backend/app/services/level_service.py`, `tools/validate_levels.py`, `tests/test_api.py`, `tests/test_level_validation.py`, `tests/js/level-solutions.test.js`, `tests/js/solver.test.js`, `tests/fixtures/level_solutions.json`, and `tests/fixtures/level_resource_requirements.json`.
- Approval class: A2 because new playable levels require human product judgment after automated checks pass.
- Approval-required actions: none expected for the default implementation path. A new dependency, network access, lockfile change, CI/deployment change, or mechanics change would require separate approval or a Change Request.

## Acceptance gates

### Automated

The future implementation plan must include exact commands. At minimum, completion requires:

```bash
python3 -m json.tool docs/intake/block_builder_levels_20_30_rebuilt.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
```

Expected automated outcomes:

- Canonical validation reports exactly 30 canonical levels.
- Candidate-source validation reports IDs 20-30 from `docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Resource validation reports no deficit for levels 21-30.
- API tests prove level list/detail behavior for levels 1, 20, 21, and 30 at minimum.
- JS tests prove exact solution fixture coverage for IDs 1-30 and replay completion for every canonical level.

### Human

- Required? Yes.
- Reason: levels 21-30 are playable content and need product judgment for difficulty curve, visual legibility, and whether the puzzle logic feels appropriately challenging.

### Manual checks

- Start the local app.
- Load levels 21-30 from the level selector.
- Verify the board, controls, status text, reset/undo, completion modal, and progress behavior remain usable on the largest new board.
- Review whether the levels feel like a coherent next batch after levels 1-20.

## Risks and open questions

- Risk: the rebuilt intake source may include a level that validates structurally but lacks replay-certified completion evidence.
  - Mitigation: stop and return to Spec/Change Request mode before editing mechanics or silently redesigning the level.
- Risk: current solver limitations may make automated synthesis unavailable for a valid level.
  - Mitigation: use manual trace capture plus replay certification for this slice; keep stronger solver proof as future roadmap work.
- Risk: appending levels 21-30 before resolving level 20 solution evidence will keep `node tests/js/run-tests.mjs` failing exact coverage.
  - Mitigation: require level 20 solution evidence or an accepted sequencing plan before claiming this expansion complete.
- Risk: boards 21-30 change layout pressure because width/height range differs from levels 18-20.
  - Mitigation: include browser/manual A2 review and keep UI changes limited to rendering existing level data cleanly.
- Open question: no product question blocks spec approval. Implementation may discover a specific source level needs a Change Request if replay evidence cannot be produced without mechanics or geometry changes.

## Stop conditions

- Stop if implementation would replace or redesign canonical level 20 under this spec.
- Stop if any level 21-30 source grid fails structural validation and cannot be fixed without changing the accepted content contract.
- Stop if replay-certified solution evidence cannot be produced for any level 21-30.
- Stop if level 20 solution evidence remains missing and the implementation plan cannot maintain exact canonical solution coverage.
- Stop if a level appears to require new mechanics, new tile symbols, changed gravity, changed pickup/place rules, or backend-owned gameplay simulation.
- Stop if completing the slice requires new dependencies, network access, lockfile changes, CI/deployment changes, or files outside the accepted plan.
- Stop if solver/analyzer output is being treated as runtime behavior or hidden hint data.
