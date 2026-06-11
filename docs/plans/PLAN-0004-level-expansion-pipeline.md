# PLAN-0004: Level Expansion Pipeline

Status: Ready for Implementation
Approval Class: A2
Maturity: M4
Owner: Unassigned
Created: 2026-06-11
Updated: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Expand the local canonical game from 5 levels to 20 levels using the accepted SPEC-0004 candidate source, with validator-backed data, engine-replayed solution evidence, and variable-board rendering support.

**Architecture:** Keep backend responsibilities limited to JSON loading, validation, static serving, and API responses. Keep gameplay state and solution replay in the existing vanilla JavaScript engine. Treat `docs/intake/candidate_levels_6_20.json` as planning/import source only; canonical runtime data remains `backend/app/data/levels.json`.

**Tech stack:** Existing Python/FastAPI/Pydantic/pytest backend, existing vanilla JavaScript ES modules, existing no-dependency Node assertion harness. No new dependencies, lockfiles, network access, CI changes, deployment work, generator, or production solver.

## Preconditions

- [ ] `SPEC-0004` is accepted.
- [ ] First-playable A2 UX/product checkpoint for levels 1-5 is explicitly accepted before Implementation mode begins.
- [ ] Existing first-five level data remains unchanged unless an accepted Change Request from the first-playable A2 review says otherwise.
- [ ] `docs/intake/candidate_levels_6_20.json` exists and remains planning/intake source only.
- [ ] Stop before any dependency addition, dependency installation, lockfile creation, network-backed command, CI/deployment change, generator, solver dependency, or frontend framework/build-tool adoption.
- [ ] Stop if implementation needs to read `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide level behavior.

## File structure

| Action | Path | Responsibility |
|---|---|---|
| Read | `docs/specs/SPEC-0004-level-expansion-pipeline.md` | Accepted behavior, data, validation, and gate contract. |
| Read | `docs/intake/candidate_levels_6_20.json` | Exact accepted candidate data source for levels 6-20; never runtime input. |
| Modify | `backend/app/data/levels.json` | Canonical runtime level data, levels 1-20. |
| Modify | `backend/app/services/level_service.py` | Canonical/candidate validation, SPEC-0004 error codes, exact ID expectations. |
| Modify | `tools/validate_levels.py` | CLI validation for canonical levels plus optional candidate source validation. |
| Modify | `tests/test_level_validation.py` | Backend validation assertions for 20 canonical levels, candidate source, and SPEC-0004 failure codes. |
| Modify | `tests/test_api.py` | API list/detail assertions for levels 1-20 and variable-size level metadata/detail. |
| Create | `tests/fixtures/level_solutions.json` | Machine-readable solution manifest for levels 1-20. |
| Create | `tests/js/level-solutions.test.js` | Replays solution manifest through the existing JS engine. |
| Modify | `tests/js/run-tests.mjs` | Runs physics, engine, and solution evidence tests in order. |
| Modify | `frontend/js/renderer.js` | Exposes variable board dimensions to CSS/ARIA while preserving render contract. |
| Modify | `frontend/style.css` | Makes larger boards legible and controls usable on desktop and mobile widths. |
| Modify | `docs/repo-map.md` | Update current verification commands and level-expansion status after implementation. |
| Modify | `docs/status/CURRENT_STATE.md` | Update active implementation status, checks, gates, and next action after implementation. |

No changes are planned for API route names, shared contract keys, engine mechanics, physics mechanics, dependency manifests, lockfiles, hooks, CI, deployment, generated files, or secrets.

## Contracts to implement

### Canonical level data

`backend/app/data/levels.json` keeps this shape:

```json
{
  "levels": []
}
```

Implementation must:

- Preserve existing level objects for IDs 1-5 byte-for-byte unless first-playable A2 feedback has an accepted Change Request.
- Append levels 6-20 from `docs/intake/candidate_levels_6_20.json`.
- Produce exactly IDs `1` through `20` in ascending order.
- Keep `slug` exactly `level-{id}`.
- Keep `difficulty` exactly equal to `id`.
- Keep one `P`, one `G`, and at least one `B` per level.
- Keep boundary rows and columns fully `#`.
- Keep legal symbols exactly `.`, `#`, `P`, `B`, `G`.
- Keep every raw `P` and `B` directly supported by `#` or `B` in the row below.
- Keep solution metadata out of API-served level objects.

Candidate source contract for levels 6-20:

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

### Backend validation functions

Preserve these public functions:

- `load_levels(path: str | Path) -> list[LevelDefinition]`
- `validate_levels(levels: Any, contract: Mapping[str, Any]) -> list[LevelDefinition]`
- `list_level_meta(levels: Sequence[LevelDefinition]) -> list[LevelMeta]`
- `get_level(levels: Sequence[LevelDefinition], level_id: int) -> LevelDefinition`

Add one public validation helper for intake checks:

```python
def validate_candidate_levels(
    levels: Any,
    contract: Mapping[str, Any],
) -> list[LevelDefinition]:
    """Validate candidate levels 6-20 from the intake source."""
```

Implementation detail:

- Set canonical expected IDs to `list(range(1, 21))`.
- Set candidate expected IDs to `list(range(6, 21))`.
- Use one internal helper such as `_validate_level_sequence(levels, contract, expected_ids)` so canonical and candidate validation cannot drift.
- Stop on the first validation failure.

### Validation error code mapping

Update validation to use SPEC-0004 codes where applicable:

| Code | Expected implementation assertion |
|---|---|
| `LEVEL_ID_SEQUENCE_INVALID` | IDs are missing, duplicated, out of order, or not exactly the expected sequence. |
| `LEVEL_SLUG_INVALID` | Slug is missing, duplicated, or not exactly `level-{id}`. |
| `LEVEL_TITLE_INVALID` | Title is empty, non-string, or duplicated. |
| `LEVEL_DIFFICULTY_INVALID` | Difficulty is not an integer equal to ID. |
| `LEVEL_GRID_DIMENSIONS_INVALID` | Grid missing/empty, ragged rows, width/height invalid, row count mismatch, or row width mismatch. |
| `LEVEL_GRID_BOUNDARY_INVALID` | Any boundary cell is not `#`. |
| `LEVEL_GRID_SYMBOL_INVALID` | Any grid character is outside `.`, `#`, `P`, `B`, `G`. |
| `LEVEL_ENTITY_COUNT_INVALID` | Entity count is not exactly one `P`, exactly one `G`, and at least one `B`. |
| `LEVEL_INITIAL_STATE_UNSTABLE` | Any raw `P` or `B` has neither `#` nor `B` below it. |
| `LEVEL_SOLUTION_MANIFEST_INVALID` | Solution manifest shape, version, ID coverage, or action names are invalid. |
| `LEVEL_SOLUTION_INVALID` | Solution replay returns invalid or does not complete the level. |

Keep existing file/root/not-found codes:

- `LEVELS_FILE_NOT_FOUND`
- `LEVELS_JSON_INVALID`
- `LEVELS_ROOT_INVALID`
- `LEVEL_NOT_FOUND`

Messages should be concise and include enough details to diagnose. Details dictionaries should include `levelId` when available, plus `row`, `col`, `expected`, `got`, `step`, or `action` when relevant.

### CLI contract

`tools/validate_levels.py` must support:

```bash
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py backend/app/data/levels.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
```

Expected successful output:

```text
Validated 20 levels from backend/app/data/levels.json
Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json
```

For failures, print the validation code, a colon, a space, and the validation message to stderr, then exit `1`.

### Solution manifest

Create `tests/fixtures/level_solutions.json`:

```json
{
  "version": "0.1.0",
  "contractVersion": "0.1.0",
  "solutions": [
    {
      "levelId": 1,
      "actions": ["moveRight"],
      "note": "Human-readable solution intent."
    }
  ]
}
```

Rules:

- Exactly one solution entry for each ID `1` through `20`.
- `actions` is non-empty.
- Legal solution actions are only `moveLeft`, `moveRight`, `jump`, and `interact`.
- `reset`, `undo`, and `selectLevel` are invalid in solution evidence.
- Known traces for levels 2-5 may be copied from `docs/status/CURRENT_STATE.md`.
- For levels 6-20, author concrete actions by replaying against `frontend/js/engine.js`; do not change mechanics to make a candidate solvable.
- If a candidate cannot be completed with accepted mechanics, stop and create a Spec-mode Change Request rather than replacing the level during implementation.

Known accepted traces:

| Level | Actions |
|---:|---|
| 2 | `interact`, `moveRight`, `jump`, `jump`, `interact`, `jump` |
| 3 | `interact`, `moveRight`, `interact`, `jump`, `jump`, `jump`, `moveRight` |
| 4 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump` |
| 5 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump`, `jump` |

Level 1 must have a replayed solution in the fixture; do not assume the shortest path without running the solution test.

### JS solution test

Create `tests/js/level-solutions.test.js` exporting `run()` and using only Node built-ins:

- Import `readFileSync` from `node:fs`.
- Import `assert` from `node:assert/strict`.
- Import `createInitialState` and `dispatchGameAction` from `../../frontend/js/engine.js`.
- Read `shared/app_contract.json`.
- Read `backend/app/data/levels.json`.
- Read `tests/fixtures/level_solutions.json`.
- Validate manifest `version === "0.1.0"` and `contractVersion === contract.version`.
- Validate exactly one solution per canonical level ID.
- Validate every action is one of `contract.actions.moveLeft`, `moveRight`, `jump`, `interact`.
- Reject `reset`, `undo`, `selectLevel`, missing actions, duplicate IDs, or missing IDs.
- Replay each solution:
  - start with `createInitialState(level, contract)`;
  - for each action, call `dispatchGameAction(state, { type: action }, level, contract)`;
  - fail immediately if `result.invalid === true`;
  - assign `state = result.state`;
  - after all actions, assert `state.status === "completed"`.

Update `tests/js/run-tests.mjs` to import and run it after engine tests:

```js
import { run as runLevelSolutions } from './level-solutions.test.js';
```

Expected final output:

```text
ok physics
ok engine
ok level solutions
All JS tests passed
```

### API contract

Route shapes remain unchanged:

- `GET /api/v1/levels`
- `GET /api/v1/levels/{levelId}`
- `GET /api/v1/config`
- `GET /shared/app_contract.json`

Expected API assertions:

- Level list returns 20 metadata entries.
- Level list IDs are exactly `1..20`.
- Level list omits `grid`.
- `GET /api/v1/levels/20` returns `title === "Final Scaffold Yard"`, `width === 34`, `height === 17`, and `grid.length === 17`.
- `GET /api/v1/levels/99` keeps the existing `LEVEL_NOT_FOUND` error envelope.

### Variable board rendering contract

Update `frontend/js/renderer.js`:

- In `renderBoard`, set:
  - `boardEl.style.setProperty("--board-cols", parsedLevel.width);`
  - `boardEl.style.setProperty("--board-rows", parsedLevel.height);`
  - `boardEl.dataset.width = String(parsedLevel.width);`
  - `boardEl.dataset.height = String(parsedLevel.height);`
  - `boardEl.style.gridTemplateColumns = \`repeat(${parsedLevel.width}, minmax(0, 1fr))\`;`
- Keep `aria-rowcount` and `aria-colcount` based on parsed dimensions.
- Do not change tile priority, cell classes, data attributes, facing indicator, or carry indicator.

Update `frontend/style.css` exactly enough to preserve the existing visual language while allowing larger boards:

- Increase desktop app width: `#app { width: min(72rem, 100%); }`.
- Keep the board centered and constrained:
  - `.board { align-self: center; width: min(100%, calc(var(--board-cols, 8) * 2rem)); max-width: 100%; }`
  - keep cells square through `.cell { aspect-ratio: 1; }`.
- Preserve existing mobile control layout.
- In the existing `@media (max-width: 480px)` block, keep `#app` at full available width and ensure `.board { width: 100%; }`.

Do not introduce a canvas renderer, virtual scrolling, frontend framework, build tool, or image assets.

## Tasks

### Task 0: Preflight and gates

**Files:** None

- [ ] Run:

```bash
git status --short
```

- [ ] Confirm `docs/specs/SPEC-0004-level-expansion-pipeline.md` says `Status: Accepted`.
- [ ] Confirm the implementation prompt explicitly says the first-playable A2 UX/product checkpoint is accepted.
- [ ] If first-playable A2 is not accepted, stop before editing application code.
- [ ] Note pre-existing dirty/untracked files, especially `docs/status/CURRENT_STATE.md`, `docs/specs/SPEC-0004-level-expansion-pipeline.md`, `docs/intake/candidate_levels_6_20.json`, and `.superpowers/`.

### Task 1: Backend validation tests first

**Files:**

- Modify `tests/test_level_validation.py`
- Read `docs/intake/candidate_levels_6_20.json`

- [ ] Add assertions that canonical `load_levels(LEVELS_PATH)` returns IDs `1..20`.
- [ ] Add assertions that level 20 has `width == 34`, `height == 17`, `title == "Final Scaffold Yard"`.
- [ ] Add a candidate-source happy path using `validate_candidate_levels(raw_candidate_levels, contract)` and assert IDs `6..20`.
- [ ] Replace stale expected validation codes with SPEC-0004 codes:
  - dimensions/grid empty/ragged -> `LEVEL_GRID_DIMENSIONS_INVALID`;
  - invalid tile -> `LEVEL_GRID_SYMBOL_INVALID`;
  - open boundary -> `LEVEL_GRID_BOUNDARY_INVALID`;
  - missing or duplicate player/goal/block cases -> `LEVEL_ENTITY_COUNT_INVALID`.
- [ ] Add failure builders and assertions for:
  - duplicate title -> `LEVEL_TITLE_INVALID`;
  - empty title -> `LEVEL_TITLE_INVALID`;
  - wrong difficulty -> `LEVEL_DIFFICULTY_INVALID`;
  - unsupported raw `B` -> `LEVEL_INITIAL_STATE_UNSTABLE`;
  - unsupported raw `P` -> `LEVEL_INITIAL_STATE_UNSTABLE`.
- [ ] Run the focused test and confirm expected failures before implementation:

```bash
.venv/bin/python -m pytest tests/test_level_validation.py
```

Expected before implementation: failures for 20-level count, missing `validate_candidate_levels`, and new error codes.

### Task 2: Implement backend validator and CLI

**Files:**

- Modify `backend/app/services/level_service.py`
- Modify `tools/validate_levels.py`

- [ ] Update expected canonical IDs to `1..20`.
- [ ] Add `validate_candidate_levels(levels, contract)`.
- [ ] Add internal shared sequence validation so canonical and candidate paths reuse the same row/dimension/entity/support checks.
- [ ] Add title uniqueness and non-empty string validation.
- [ ] Add `difficulty == id` validation.
- [ ] Add exactly-one-goal validation.
- [ ] Add raw support validation for every `P` and `B`.
- [ ] Update validation error codes to the SPEC-0004 mapping.
- [ ] Update `tools/validate_levels.py` to parse optional `--candidate-source docs/intake/candidate_levels_6_20.json`.
- [ ] Run:

```bash
.venv/bin/python -m pytest tests/test_level_validation.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
```

Expected after Task 2 and before canonical data update:

- Candidate validation passes and prints `Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json`.
- Canonical tests may still fail because `backend/app/data/levels.json` has only 5 levels.

### Task 3: Expand canonical level data

**Files:**

- Modify `backend/app/data/levels.json`

- [ ] Preserve level objects for IDs 1-5.
- [ ] Append exact objects from `docs/intake/candidate_levels_6_20.json` for IDs 6-20.
- [ ] Ensure top-level shape remains `{ "levels": [...] }`.
- [ ] Run:

```bash
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_level_validation.py
```

Expected output:

```text
Validated 20 levels from backend/app/data/levels.json
```

Expected tests: `tests/test_level_validation.py` passes.

### Task 4: API tests for expanded metadata/detail

**Files:**

- Modify `tests/test_api.py`

- [ ] Update `test_levels_list_omits_grids` to expect 20 levels and IDs `1..20`.
- [ ] Add or update detail assertion for level 20:
  - `title == "Final Scaffold Yard"`;
  - `width == 34`;
  - `height == 17`;
  - `len(grid) == 17`;
  - every row length is 34.
- [ ] Keep `LEVEL_NOT_FOUND` envelope assertion unchanged.
- [ ] Run:

```bash
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
```

Expected: all backend tests pass with the known Starlette deprecation warning only if it already appears locally.

### Task 5: Solution evidence harness

**Files:**

- Create `tests/fixtures/level_solutions.json`
- Create `tests/js/level-solutions.test.js`
- Modify `tests/js/run-tests.mjs`

- [ ] Create the fixture with version `0.1.0`, contractVersion `0.1.0`, and exactly one solution entry per level ID `1..20`.
- [ ] Add known traces for levels 2-5 from this plan.
- [ ] Author concrete replay actions for levels 1 and 6-20 by running the existing JS engine locally.
- [ ] Create `tests/js/level-solutions.test.js` using the JS solution test contract above.
- [ ] Update `tests/js/run-tests.mjs` to run physics, engine, and level solution suites.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

Expected output:

```text
ok physics
ok engine
ok level solutions
All JS tests passed
```

If any candidate level cannot be completed without invalid actions or mechanics changes, stop and create a Spec-mode Change Request. Do not replace candidate geometry during implementation.

### Task 6: Variable-board UI rendering

**Files:**

- Modify `frontend/js/renderer.js`
- Modify `frontend/style.css`

- [ ] Update `renderBoard` with the CSS custom properties, data attributes, and `minmax(0, 1fr)` grid template from the rendering contract.
- [ ] Update CSS so wide boards fit desktop layouts more comfortably and shrink on narrow viewports without overlapping controls.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

Expected: JS tests still pass.

- [ ] Start the local server for manual review:

```bash
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

- [ ] In browser at `http://127.0.0.1:8000/`, manually inspect levels 1, 6, 14, 18, and 20:
  - selector loads the level;
  - board does not overlap HUD, controls, or completion dialog;
  - controls remain usable;
  - status text remains visible;
  - level 20 board is legible enough for A2 review.

This manual inspection is not the final A2 acceptance gate; it is an implementation smoke check.

### Task 7: Documentation updates

**Files:**

- Modify `docs/repo-map.md`
- Modify `docs/status/CURRENT_STATE.md`

- [ ] Update `docs/repo-map.md` current verification commands to include:

```bash
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
node tests/js/run-tests.mjs
```

- [ ] Update `docs/status/CURRENT_STATE.md` to record:
  - `SPEC-0004` accepted;
  - `PLAN-0004` active/implemented status;
  - canonical level count is 20 after implementation;
  - solution evidence fixture exists after implementation;
  - automated checks run;
  - remaining A2 expanded-level human checkpoint.
- [ ] Do not include `.superpowers/brainstorm/` as implementation context.

### Task 8: Full validation and final report

**Files:** None unless a previous validation failure requires in-scope fixes.

- [ ] Run:

```bash
git status --short
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

Expected pass evidence:

- `tools/validate_levels.py` prints `Validated 20 levels from backend/app/data/levels.json`.
- Candidate source validation prints `Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json`.
- Backend tests pass.
- JS tests print `ok physics`, `ok engine`, `ok level solutions`, and `All JS tests passed`.
- `git diff --check` reports no whitespace errors.

## Validation

Required automated validation for implementation completion:

```bash
git status --short
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
```

Required manual smoke check before final implementation summary:

```bash
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
# visit http://127.0.0.1:8000/
```

Manual smoke check covers level selector and board layout for levels 1, 6, 14, 18, and 20.

## Approval gates

- A2 prerequisite gate: first-playable UX/product checkpoint for levels 1-5 must be accepted before implementation edits begin.
- A2 completion gate: after automated checks pass, the project owner reviews expanded levels 6-20 for difficulty curve, scaffold feel, visual legibility, and product fit.
- A3 stop gate: any dependency install/addition, lockfile, network access, generator, solver dependency, CI/deployment change, or frontend framework/build tool requires explicit separate approval and is not part of this plan.

## Documentation updates

- `docs/repo-map.md`: update level count, commands, and SPEC/PLAN-0004 status after implementation.
- `docs/status/CURRENT_STATE.md`: update active objective, active contract, current checks, remaining A2 gate, files changed, and next action.

## Rollback plan

- Revert `backend/app/data/levels.json` to the 5-level version.
- Revert `backend/app/services/level_service.py`, `tools/validate_levels.py`, and backend tests to 5-level validation expectations.
- Remove `tests/fixtures/level_solutions.json` and `tests/js/level-solutions.test.js`; revert `tests/js/run-tests.mjs`.
- Revert variable-board CSS/renderer changes if they cause regressions.
- Restore `docs/repo-map.md` and `docs/status/CURRENT_STATE.md` to their pre-PLAN-0004 implementation state.

## Risks

- Risk: candidate levels are structurally valid but not solvable with accepted mechanics.
  - Mitigation: solution replay is mandatory; unsolved candidates stop implementation and require Spec revision.
- Risk: solution authoring becomes large enough to obscure code changes.
  - Mitigation: keep solution evidence in a separate fixture and validate it with one focused JS test module.
- Risk: variable boards expose layout assumptions from the first 8x6 UI.
  - Mitigation: renderer exposes dimensions and CSS constrains board width; manual smoke check covers representative large levels.
- Risk: validation error code migration breaks older tests.
  - Mitigation: update backend tests in the same task and preserve file/root/not-found codes.
- Risk: difficulty quality cannot be proven automatically.
  - Mitigation: keep expanded-level A2 human review after automated completion.

## Stop conditions

- First-playable A2 checkpoint is not explicitly accepted before implementation.
- `docs/intake/candidate_levels_6_20.json` is missing, malformed, or differs from SPEC-0004's candidate table.
- Levels 1-5 need edits without an accepted Change Request.
- Any level 6-20 cannot be completed by a concrete action sequence through the existing engine.
- Implementation requires new mechanics, new tile symbols, changed action names, changed API route shapes, or backend-owned gameplay simulation.
- Implementation requires reading `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide behavior.
- Implementation requires dependency/network/lockfile/CI/deployment/framework/generator/solver work.
- Manual smoke check shows large boards cannot be made usable within the existing vanilla DOM/CSS approach.
