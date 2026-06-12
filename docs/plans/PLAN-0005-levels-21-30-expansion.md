# PLAN-0005: Levels 21-30 Expansion

Status: Ready for Implementation
Approval Class: A2
Maturity: M4
Owner: Unassigned
Created: 2026-06-12
Updated: 2026-06-12
Related spec: `docs/specs/SPEC-0005-levels-21-30-expansion.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Expand the canonical local game from 20 levels to 30 levels using the accepted SPEC-0005 intake source for levels 21-30, with validator-backed data, resource reporting, replay-certified solution evidence, API coverage, and an A2 product review checkpoint.

**Architecture:** Keep backend responsibilities limited to JSON loading, validation, static serving, and API responses. Keep gameplay state and solution replay in the existing vanilla JavaScript engine. Treat `docs/intake/block_builder_levels_20_30_rebuilt.json` as planning/import source only; canonical runtime data remains `backend/app/data/levels.json`. Do not replace canonical level 20 in this plan.

**Tech stack:** Existing Python/FastAPI/Pydantic/pytest backend, existing vanilla JavaScript ES modules, existing no-dependency Node assertion harness, and existing local solver/analyzer tooling. No new dependencies, lockfiles, network access, CI changes, deployment work, runtime solver behavior, generator work, frontend framework, or build-tool adoption.

## Preconditions

- [ ] `SPEC-0005` is accepted.
- [ ] `PLAN-0004` solution evidence is complete enough that `tests/fixtures/level_solutions.json` contains a replay-certified level 20 entry before PLAN-0005 implementation starts.
- [ ] `node tests/js/run-tests.mjs` passes against canonical levels 1-20 before appending levels 21-30. If it fails only because level 20 is missing, stop and complete PLAN-0004 Task 5 first.
- [ ] `docs/intake/block_builder_levels_20_30_rebuilt.json` exists and validates as JSON.
- [ ] Existing worktree changes are understood before implementation. Do not revert unrelated dirty files.
- [ ] This plan is marked ready for implementation using the repo's established status wording before code/data edits begin.
- [ ] Stop before any dependency addition, dependency installation, lockfile creation, network-backed command, CI/deployment change, generator work, mechanics change, or runtime solver behavior.

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| Read | `docs/specs/SPEC-0005-levels-21-30-expansion.md` | Accepted behavior, scope, data, evidence, and A2 gate. |
| Read | `docs/intake/block_builder_levels_20_30_rebuilt.json` | Exact intake source. ID 20 is overlap/reference only; IDs 21-30 are imported. |
| Modify | `backend/app/data/levels.json` | Canonical runtime level data, exactly IDs 1-30. Append levels 21-30 only. |
| Modify | `backend/app/services/level_service.py` | Canonical, candidate-source, and resource validation ID ranges. |
| Modify | `tools/validate_levels.py` | Candidate-source CLI validation for both 6-20 and 20-30 sources. |
| Modify | `tests/test_level_validation.py` | Backend validation assertions for canonical 1-30, candidate 20-30, resources 6-30, and error codes. |
| Modify | `tests/test_api.py` | API list/detail assertions for exact 30-level metadata and level 30 detail. |
| Modify | `tests/fixtures/level_resource_requirements.json` | Resource manifest entries for levels 6-30. |
| Modify | `tests/fixtures/level_solutions.json` | Replay-certified solution entries for levels 1-30. |
| Read or modify only if required by failing tests | `tests/js/level-solutions.test.js` | Existing replay contract should already support exact canonical coverage. |
| Read only unless regression fails | `tools/solve-levels.mjs` | Existing local solver is used to generate candidate actions; do not redesign solver in this plan. |
| Read only unless regression fails | `tests/js/solver.test.js` | Preserve current solver regression behavior. |
| Read only | `frontend/js/renderer.js` | Existing variable-board renderer should support levels 21-30. |
| Read only | `frontend/style.css` | Existing board styling already supports level 20 width 34; levels 21-30 max width is 26. |
| Modify | `docs/repo-map.md` | Update verification commands and current status after implementation. |
| Modify | `docs/status/CURRENT_STATE.md` | Update active implementation status, checks, gates, and next action after implementation. |

No changes are planned for `shared/app_contract.json`, `backend/app/schemas.py`, `frontend/js/engine.js`, `frontend/js/physics.js`, trace recorder code, dependency manifests, lockfiles, hooks, CI, deployment, generated files, secrets, or `docs/intake/PROJECT_OVERVIEW_RAW.md`.

## Contracts To Implement

### Canonical Level Data

`backend/app/data/levels.json` keeps this shape:

```json
{
  "levels": []
}
```

Implementation must:

- Preserve IDs 1-20 exactly, including canonical level 20.
- Append IDs 21-30 from `docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Ignore the intake file's ID 20 entry except as overlap/reference evidence.
- Produce exactly IDs `1` through `30` in ascending order.
- Keep `slug` exactly `level-{id}`.
- Keep `difficulty` exactly equal to `id`.
- Keep one `P`, one `G`, and at least one `B` per level.
- Keep boundary rows and columns fully `#`.
- Keep legal symbols exactly `.`, `#`, `P`, `B`, `G`.
- Keep every raw `P` and `B` directly supported by `#` or `B` in the row below.
- Keep solution, resource, solver, and trace metadata out of API-served level objects.

Level 21-30 content target:

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

### Backend Validation

Preserve public helpers:

- `load_levels(path: str | Path) -> list[LevelDefinition]`
- `validate_levels(levels: Any, contract: Mapping[str, Any]) -> list[LevelDefinition]`
- `validate_candidate_levels(levels: Any, contract: Mapping[str, Any], expected_ids: Sequence[int] | None = None) -> list[LevelDefinition]`
- `analyze_level_resources(levels: Sequence[LevelDefinition], resource_manifest: Mapping[str, Any]) -> list[LevelResourceAnalysis]`
- `list_level_meta(levels: Sequence[LevelDefinition]) -> list[LevelMeta]`
- `get_level(levels: Sequence[LevelDefinition], level_id: int) -> LevelDefinition`

Implementation details:

- Set canonical expected IDs to `list(range(1, 31))`.
- Keep candidate 6-20 support for `docs/intake/candidate_levels_6_20.json`.
- Add candidate 20-30 support for `docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Keep one internal `_validate_level_sequence(levels, contract, expected_ids)` path.
- Set resource expected IDs to `list(range(6, 31))` after canonical levels 21-30 are appended.
- Reuse existing validation error codes from SPEC-0005. Do not create new error families unless a test requires a distinct invariant.

CLI behavior for `tools/validate_levels.py`:

- `--candidate-source docs/intake/candidate_levels_6_20.json` validates exactly IDs 6-20.
- `--candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json` validates exactly IDs 20-30.
- Any other candidate ID sequence raises `LEVEL_ID_SEQUENCE_INVALID`.
- Successful rebuilt-source output includes:

```text
Validated 30 levels from backend/app/data/levels.json
Validated 11 candidate levels from docs/intake/block_builder_levels_20_30_rebuilt.json
```

### API Contract

Routes remain unchanged:

- `GET /api/v1/config`
- `GET /api/v1/levels`
- `GET /api/v1/levels/{levelId}`
- `GET /shared/app_contract.json`

Expected post-implementation API behavior:

- `GET /api/v1/levels` returns exactly 30 metadata entries, IDs `1..30`, with no `grid` field.
- `GET /api/v1/levels/30` returns:

```json
{
  "id": 30,
  "slug": "level-30",
  "title": "Two Quarries, One Crossing",
  "width": 26,
  "height": 14,
  "difficulty": 30,
  "grid": ["actual level 30 row strings from backend/app/data/levels.json"]
}
```

- `GET /api/v1/levels/99` continues to return `404` with `LEVEL_NOT_FOUND`.

### Resource Manifest

`tests/fixtures/level_resource_requirements.json` remains:

```json
{
  "version": "0.1.0",
  "levels": []
}
```

After implementation it must contain exactly one entry for each level ID `6..30` in ascending order.

Append these entries for levels 21-30:

| Level | Segments | Available | Required | Surplus |
|---:|---|---:|---:|---:|
| 21 | `ground-to-first-step`: `fromRow=8`, `toRow=6` | 3 | 3 | 0 |
| 22 | `pit-to-exit-shelf`: `8 -> 6`; `shelf-to-goal`: `6 -> 5` | 4 | 4 | 0 |
| 23 | `lower-base-to-higher-base`: `9 -> 7`; `higher-base-to-goal`: `7 -> 6` | 4 | 4 | 0 |
| 24 | `lower-yard-to-shelf`: `10 -> 8`; `shelf-to-goal`: `8 -> 7` | 4 | 4 | 0 |
| 25 | `quarry-to-exit-shelf`: `8 -> 6`; `shelf-to-goal`: `6 -> 5` | 5 | 4 | 1 |
| 26 | `ground-to-exit-platform`: `10 -> 8`; `platform-to-goal`: `8 -> 7` | 4 | 4 | 0 |
| 27 | `lower-yard-to-worksite`: `12 -> 10`; `worksite-to-goal-shelf`: `10 -> 9` | 4 | 4 | 0 |
| 28 | `basin-to-exit-platform`: `10 -> 8`; `platform-to-goal`: `8 -> 7` | 5 | 4 | 1 |
| 29 | `lower-yard-to-shelf`: `10 -> 8`; `shelf-to-goal`: `8 -> 7` | 5 | 4 | 1 |
| 30 | `lower-yard-to-quarries`: `10 -> 8`; `quarries-to-goal`: `8 -> 7` | 6 | 4 | 2 |

Resource analysis remains a deterministic deficit screen, not a solvability proof.

### Solution Evidence

`tests/fixtures/level_solutions.json` remains:

```json
{
  "version": "0.1.0",
  "contractVersion": "0.1.0",
  "solutions": []
}
```

Post-implementation:

- Entries cover exactly IDs `1..30`.
- Existing entries for IDs 1-20 remain in ascending order and replay-valid.
- New entries for IDs 21-30 are appended in ascending order.
- Each new note should follow this exact pattern: `Replayed local solver solution for level 21 from SPEC-0005 intake source.` Replace `21` with the entry's level ID.
- Each new action list uses only `moveLeft`, `moveRight`, `jump`, and `interact`.
- `tests/js/level-solutions.test.js` must replay every canonical solution through `createInitialState(...)` and `dispatchGameAction(...)`.

The current solver probe against the SPEC-0005 intake source returned `SOLVED` for all levels 21-30. Expected action lengths when regenerated after canonical import:

| Level | Expected status | Expected action length |
|---:|---|---:|
| 21 | `SOLVED` | 43 |
| 22 | `SOLVED` | 98 |
| 23 | `SOLVED` | 40 |
| 24 | `SOLVED` | 57 |
| 25 | `SOLVED` | 97 |
| 26 | `SOLVED` | 93 |
| 27 | `SOLVED` | 52 |
| 28 | `SOLVED` | 38 |
| 29 | `SOLVED` | 98 |
| 30 | `SOLVED` | 51 |

If any level 21-30 does not produce `SOLVED` after canonical import, stop and use the existing trace recorder/manual replay path. Do not change level geometry or mechanics inside this plan without a Change Request.

## Tasks

### Task 0: Preflight and Level 20 Gate

**Files:** none

- [ ] Run:

```bash
git status --short
python3 -m json.tool docs/intake/block_builder_levels_20_30_rebuilt.json >/dev/null
node tests/js/run-tests.mjs
```

- [ ] Expected `node tests/js/run-tests.mjs` result before PLAN-0005 implementation: pass against canonical levels 1-20.
- [ ] If it fails because `tests/fixtures/level_solutions.json` lacks level 20, stop with `BLOCKED: complete PLAN-0004 level 20 solution evidence before PLAN-0005`.
- [ ] Confirm current uncommitted files and do not revert unrelated PLAN-0004 work.

### Task 1: Extend Candidate Validation

**Files:**

- Modify: `backend/app/services/level_service.py`
- Modify: `tools/validate_levels.py`
- Modify: `tests/test_level_validation.py`

- [ ] Add test constants:

```python
REBUILT_LEVELS_PATH = Path("docs/intake/block_builder_levels_20_30_rebuilt.json")
```

- [ ] Add or update tests:
  - `test_plan_level_file_is_valid` expects `list(range(1, 31))`.
  - `test_candidate_source_validates_ids_6_through_20` remains.
  - `test_rebuilt_candidate_source_validates_ids_20_through_30` expects `list(range(20, 31))`.
  - Candidate-source ID mismatch still raises `LEVEL_ID_SEQUENCE_INVALID`.
- [ ] Run the focused check and confirm expected failure before implementation:

```bash
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json
```

Expected current failure:

```text
LEVEL_ID_SEQUENCE_INVALID: Level IDs must be exactly [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] in order.
```

- [ ] Implement candidate ID selection:
  - `validate_candidate_levels(levels, contract, expected_ids=None)` defaults to IDs 6-20.
  - CLI reads candidate IDs and passes IDs 6-20 or IDs 20-30 explicitly.
  - Other candidate sequences raise `LEVEL_ID_SEQUENCE_INVALID`.
- [ ] Run focused checks:

```bash
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json
.venv/bin/python -m pytest tests/test_level_validation.py
```

Expected post-task outputs before canonical append:

```text
Validated 20 levels from backend/app/data/levels.json
Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json
Validated 20 levels from backend/app/data/levels.json
Validated 11 candidate levels from docs/intake/block_builder_levels_20_30_rebuilt.json
```

### Task 2: Append Canonical Levels 21-30

**Files:**

- Modify: `backend/app/data/levels.json`
- Modify: `backend/app/services/level_service.py`
- Modify: `tests/test_level_validation.py`
- Modify: `tests/test_api.py`

- [ ] Update canonical expected IDs to `list(range(1, 31))`.
- [ ] Append only intake IDs 21-30 to `backend/app/data/levels.json`.
- [ ] Do not change canonical level 20.
- [ ] Add backend validation assertions:
  - `test_plan_level_file_is_valid` expects IDs `1..30`.
  - `test_level_30_matches_expansion_contract` asserts title `Two Quarries, One Crossing`, width `26`, height `14`.
- [ ] Add API assertions:
  - `test_levels_list_omits_grids` expects length `30` and IDs `1..30`.
  - `test_level_30_detail_returns_variable_grid` asserts title, width, height, row count, and row width.
  - Keep `test_level_20_detail_returns_variable_grid` so the overlap boundary remains visible.
- [ ] Run:

```bash
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
```

Expected output includes:

```text
Validated 30 levels from backend/app/data/levels.json
```

### Task 3: Extend Resource Manifest to 6-30

**Files:**

- Modify: `tests/fixtures/level_resource_requirements.json`
- Modify: `backend/app/services/level_service.py`
- Modify: `tests/test_level_validation.py`

- [ ] Update resource expected IDs to `list(range(6, 31))`.
- [ ] Append resource entries for levels 21-30 exactly as listed in the Resource Manifest section.
- [ ] Update `test_resource_analysis_reports_levels_6_through_20` to `test_resource_analysis_reports_levels_6_through_30`.
- [ ] Assert:
  - resource report IDs are `6..30`.
  - level 21 has `availableBlocks=3`, `requiredBlocks=3`, `surplusBlocks=0`.
  - level 30 has `availableBlocks=6`, `requiredBlocks=4`, `surplusBlocks=2`.
  - all reports have `surplusBlocks >= 0`.
- [ ] Run:

```bash
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_level_validation.py
```

Expected output includes:

```text
Validated resources for 25 levels from tests/fixtures/level_resource_requirements.json
```

### Task 4: Add Replay-Certified Solutions for 21-30

**Files:**

- Modify: `tests/fixtures/level_solutions.json`
- Read only unless regression appears: `tests/js/level-solutions.test.js`
- Read only unless regression appears: `tools/solve-levels.mjs`

- [ ] Confirm `tests/fixtures/level_solutions.json` already contains replay-valid IDs 1-20. If not, stop and finish PLAN-0004 Task 5 first.
- [ ] Generate local solver actions for levels 21-30 after canonical import:

```bash
node --input-type=module -e "import { runSolver } from './tools/solve-levels.mjs'; const ids = Array.from({ length: 10 }, (_, i) => i + 21); const solutions = []; for (const levelId of ids) { const report = runSolver({ mode: 'validity', level: levelId, maxStates: 1000000 }); if (report.status !== 'SOLVED') { throw new Error('level ' + levelId + ' not solved: ' + report.status); } solutions.push({ levelId, note: 'Replayed local solver solution for level ' + levelId + ' from SPEC-0005 intake source.', actions: report.actions }); console.log(JSON.stringify({ levelId, status: report.status, actions: report.actions.length }, null, 2)); } console.log(JSON.stringify({ solutions }, null, 2));"
```

- [ ] Append the printed `solutions` entries for IDs 21-30 to `tests/fixtures/level_solutions.json` in ascending order.
- [ ] Run:

```bash
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
node tests/js/run-tests.mjs
```

Expected JS result:

```text
ok physics
ok engine
ok trace recorder
ok solver
ok level solutions
All JS tests passed
```

### Task 5: Solver Smoke Diagnostics for New Levels

**Files:** none expected

- [ ] Run one smoke solver command per new level:

```bash
node tools/solve-levels.mjs --mode validity --level 21 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 22 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 23 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 24 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 25 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 26 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 27 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 28 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 29 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 30 --max-states 1000000
```

- [ ] Expected status for each command: `SOLVED`.
- [ ] Do not modify solver code in this task. If any command fails after solution replay passes, record the diagnostic in `docs/status/CURRENT_STATE.md`; if solution replay fails, stop and open a Change Request or request manual trace evidence.

### Task 6: Documentation and A2 Checkpoint

**Files:**

- Modify: `docs/repo-map.md`
- Modify: `docs/status/CURRENT_STATE.md`

- [ ] Update `docs/repo-map.md` commands:
  - Add `python3 -m json.tool docs/intake/block_builder_levels_20_30_rebuilt.json >/dev/null`.
  - Add `.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json`.
  - Update canonical validation text from 20 to 30 levels.
  - Keep existing candidate 6-20 commands until a later cleanup spec removes them.
- [ ] Update `docs/status/CURRENT_STATE.md`:
  - Mark `SPEC-0005` as Accepted.
  - Record `PLAN-0005` implementation status.
  - Record checks run and whether levels 21-30 solution evidence exists.
  - Set next action to the A2 level-review checkpoint after automated gates pass.
- [ ] Stop at the A2 human checkpoint after automated validation passes. Do not continue into a next level batch in the same implementation pass.

## Required Automated Validation

Run before final implementation response:

```bash
git status --short
python3 -m json.tool docs/intake/block_builder_levels_20_30_rebuilt.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tools/solve-levels.mjs --mode validity --level 21 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 22 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 23 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 24 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 25 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 26 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 27 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 28 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 29 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 30 --max-states 1000000
node tests/js/run-tests.mjs
git diff --check
```

Expected pass conditions:

- JSON commands exit `0`.
- Canonical validation reports `Validated 30 levels from backend/app/data/levels.json`.
- Rebuilt candidate validation reports `Validated 11 candidate levels from docs/intake/block_builder_levels_20_30_rebuilt.json`.
- Resource validation reports `Validated resources for 25 levels from tests/fixtures/level_resource_requirements.json`.
- Pytest passes.
- Solver smoke commands return `SOLVED` for levels 21-30.
- JS test runner prints `All JS tests passed`.
- `git diff --check` exits `0`.

## Manual and Human Validation

After automated checks pass:

- Start the local app:

```bash
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

- Load levels 21-30 from the selector.
- Verify board rendering, controls, status text, reset/undo, completion modal, and progress behavior.
- Project owner reviews difficulty curve, visual legibility, and puzzle feel.
- Stop at this A2 checkpoint. Do not proceed to levels 31-40 without a new accepted spec/plan.

## Documentation Updates

- `docs/repo-map.md`: update command list and current level count after implementation.
- `docs/status/CURRENT_STATE.md`: record implementation status, validation results, A2 checkpoint, and next safest action.
- Handoff file: create under `docs/handoff/` only if implementation stops before automated gates pass or if manual trace evidence is needed.

## Rollback Plan

- Revert the smallest coherent set of PLAN-0005 files:
  - `backend/app/data/levels.json`
  - `backend/app/services/level_service.py`
  - `tools/validate_levels.py`
  - `tests/test_api.py`
  - `tests/test_level_validation.py`
  - `tests/fixtures/level_resource_requirements.json`
  - `tests/fixtures/level_solutions.json`
  - `docs/repo-map.md`
  - `docs/status/CURRENT_STATE.md`
- Leave existing PLAN-0004 files untouched unless the failed change explicitly modified them inside PLAN-0005 scope.
- If only one new level's solution evidence is invalid, remove the unverified level entries and stop with a handoff rather than changing mechanics or geometry ad hoc.

## Risks and Mitigations

- Risk: PLAN-0004 level 20 solution evidence is still missing when PLAN-0005 starts.
  - Mitigation: Task 0 blocks implementation before appending levels.
- Risk: a level 21-30 solver action list changes after canonical import.
  - Mitigation: regenerate from canonical data and replay through `tests/js/level-solutions.test.js`.
- Risk: resource manifest math is mistaken for a solvability proof.
  - Mitigation: keep resource checks as deficit screens and require replay-certified actions.
- Risk: implementing candidate 20-30 validation breaks candidate 6-20 validation.
  - Mitigation: keep focused tests and CLI checks for both candidate sources.
- Risk: level 20 is accidentally overwritten from the rebuilt intake file.
  - Mitigation: Task 2 imports only IDs 21-30 and keeps level 20 API/detail tests.
- Risk: UI review reveals board or control issues.
  - Mitigation: stop at A2 checkpoint and open a Change Request if fixes exceed rendering polish already named in SPEC-0005.

## Stop Conditions

- Stop if `SPEC-0005` is not accepted.
- Stop if `node tests/js/run-tests.mjs` does not pass for canonical levels 1-20 before PLAN-0005 data import.
- Stop if implementation would replace or redesign canonical level 20.
- Stop if any level 21-30 source grid fails structural validation and cannot be fixed without changing accepted content.
- Stop if replay-certified solution evidence cannot be produced for any level 21-30.
- Stop if a level appears to require new mechanics, new tile symbols, changed gravity, changed pickup/place rules, or backend-owned gameplay simulation.
- Stop if completing the slice requires dependencies, network access, lockfile changes, CI/deployment changes, secrets, generated files, or files outside this plan.
- Stop if solver/analyzer output is being treated as runtime behavior or hidden hint data.
- Stop at the A2 product-review checkpoint after automated gates pass.
