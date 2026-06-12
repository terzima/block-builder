# PLAN-0004: Level Expansion Pipeline

Status: Completed
Approval Class: A2
Maturity: M4
Owner: Unassigned
Created: 2026-06-11
Updated: 2026-06-12
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: `docs/change-requests/CR-0004-level-1-support-geometry-fix.md`, `docs/change-requests/CR-0005-solution-evidence-capture.md`, `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md`, `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md`, `docs/change-requests/CR-0009-physics-certified-macro-solver.md`, `docs/change-requests/CR-0010-construction-ledger-solver-remediation.md`, `docs/change-requests/CR-0011-trace-informed-endgame-solver-reset.md`

**Goal:** Expand the local canonical game from 5 levels to 20 levels using the accepted SPEC-0004 candidate source, with validator-backed data, stack-stable pickup physics, deterministic block-resource reporting, an engine-backed canonical state-space solver guided by construction-ledger and region-logistics planning, trace capture and trace macro analysis for development evidence, layered design-facing solver reporting, engine-replayed solution evidence, and variable-board rendering support.

**Completion note:** Closed by owner override on 2026-06-12 with level 20 replay evidence marked as `UNPROVEN_REPLAY_EVIDENCE` in `tests/fixtures/level_solutions.json`. Levels 1-19 have replay-certified solution evidence; level 20 is intentionally recorded as a failed/unproven replay-evidence case so PLAN-0005 can proceed without more solver time.

**Architecture:** Keep backend responsibilities limited to JSON loading, validation, static serving, and API responses. Keep gameplay state and solution replay in the existing vanilla JavaScript engine. Treat `docs/intake/candidate_levels_6_20.json` as planning/import source only; canonical runtime data remains `backend/app/data/levels.json`.

**Tech stack:** Existing Python/FastAPI/Pydantic/pytest backend, existing vanilla JavaScript ES modules, existing no-dependency Node assertion harness. No new dependencies, lockfiles, network access, CI changes, deployment work, generator, production/runtime solver, solver package, PDDL planner, external solver package, or dependency-backed pathfinding engine.

## Preconditions

- [ ] `SPEC-0004` is accepted, including CR-0011's trace-informed endgame solver reset, manual trace capture/analyzer contract, anti-overfit rules, region-logistics planner contract, and benchmark requirements for levels 10, 13, 14, 16, and 17.
- [ ] First-playable A2 UX/product checkpoint for levels 1-5 was accepted by the project owner on 2026-06-11 before PLAN-0004 implementation began.
- [ ] The project owner has confirmed current levels 1-20 are manually solvable; current level 13 is a known-solvable solver benchmark, not an open geometry-validity question.
- [ ] Existing first-five level data remains unchanged unless an accepted Change Request from the first-playable A2 review says otherwise.
- [ ] `docs/intake/candidate_levels_6_20.json` exists and remains planning/intake source only.
- [ ] `CR-0004`, `CR-0005`, `CR-0006`, `CR-0007`, `CR-0008`, `CR-0009`, `CR-0010`, and `CR-0011` are accepted.
- [ ] This plan is marked ready for implementation using the repo's established status wording before implementation resumes from Task 4F.
- [ ] Stop before any dependency addition, dependency installation, lockfile creation, network-backed command, CI/deployment change, generator, solver dependency, or frontend framework/build-tool adoption.
- [ ] Stop if implementation needs to read `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide level behavior.

## File structure

| Action | Path | Responsibility |
|---|---|---|
| Read | `docs/specs/SPEC-0004-level-expansion-pipeline.md` | Accepted behavior, data, validation, and gate contract. |
| Read | `docs/intake/candidate_levels_6_20.json` | Exact accepted candidate data source for levels 6-20; never runtime input. |
| Modify | `docs/intake/candidate_levels_6_20.json` | Update level 13 to the accepted CR-0008 15-block lower-yard revision. |
| Modify | `backend/app/data/levels.json` | Canonical runtime level data, levels 1-20, with CR-0004, CR-0006, and CR-0008 revisions. |
| Modify | `backend/app/services/level_service.py` | Canonical/candidate/resource validation, SPEC-0004 error codes, exact ID expectations, resource analysis. |
| Modify | `tools/validate_levels.py` | CLI validation for canonical levels, optional candidate source validation, and optional resource source validation/reporting. |
| Modify | `tests/test_level_validation.py` | Backend validation assertions for 20 canonical levels, candidate source, resource analysis, and SPEC-0004 failure codes. |
| Modify | `tests/test_api.py` | API list/detail assertions for levels 1-20 and variable-size level metadata/detail. |
| Modify | `frontend/js/engine.js` | Enforce stack-stability pickup rule. |
| Modify | `tests/js/engine.test.js` | JS engine assertions for supporting-block pickup behavior. |
| Create or modify | `tests/fixtures/level_resource_requirements.json` | Machine-readable resource requirement segments for levels 6-20. |
| Create or modify | `tests/fixtures/level_solutions.json` | Machine-readable solution manifest for levels 1-20. |
| Create or modify | `tests/js/level-solutions.test.js` | Replays solution manifest through the existing JS engine. |
| Create or modify | `tools/solve-levels.mjs` | No-dependency deterministic solver/analyzer CLI using the existing JS engine as transition authority, canonical whole-board state keys, construction-ledger planning, tactical replay, and layered reporting. |
| Create or modify | `tests/js/solver.test.js` | Solver preflight, canonical state-key, construction-ledger, macro planner, tactical replay, layered reporting, validity, analyzer, determinism, and performance assertions. |
| Create or modify | `tests/fixtures/level_solver_expectations.json` | Expected solver statuses, budgets, layered diagnostics, failure categories, construction-ledger fixtures, canonical-state fixtures, macro fixtures, benchmark definitions, and synthetic fixture definitions. |
| Create | `frontend/js/trace-recorder.js` | Dev-facing trace recorder state machine and export helpers; records only successful forward actions and exposes copy/download payloads. |
| Modify | `frontend/js/app.js` | Wires trace recorder lifecycle to game actions, completion, undo/reset, and level selection. |
| Modify | `frontend/js/ui.js` | Adds dev trace recorder controls and visible/selectable JSON fallback without changing core gameplay controls. |
| Modify | `frontend/index.html` | Adds trace recorder control/fallback containers with stable IDs for tests and browser use. |
| Modify | `frontend/style.css` | Styles trace recorder controls and fallback JSON compactly while preserving existing visual language. |
| Create | `tests/js/trace-recorder.test.js` | Unit tests for trace recorder state transitions, invalidation, export shape, replay validity, and clipboard fallback model. |
| Create or modify | `tests/fixtures/manual_traces/level_17_trace.json` | Replay-valid manual level 17 trace captured through the dev recorder and used only for replay/analyzer tests. |
| Modify | `tests/js/run-tests.mjs` | Runs physics, engine, trace recorder, solver, and solution evidence tests in order. |
| Modify | `frontend/js/renderer.js` | Exposes variable board dimensions to CSS/ARIA while preserving render contract. |
| Modify | `frontend/style.css` | Makes larger boards legible and controls usable on desktop and mobile widths. |
| Modify | `docs/repo-map.md` | Update current verification commands and level-expansion status after implementation. |
| Modify | `docs/status/CURRENT_STATE.md` | Update active implementation status, checks, gates, and next action after implementation. |

No changes are planned for API route names, shared contract keys, tile symbols, action names, physics gravity, dependency manifests, lockfiles, hooks, CI, deployment, generated files, secrets, or runtime/browser solver behavior.

## Contracts to implement

### Canonical level data

`backend/app/data/levels.json` keeps this shape:

```json
{
  "levels": []
}
```

Implementation must:

- Preserve existing level objects for IDs 1-5 except the accepted CR-0004 level 1 source-geometry fix.
- Append levels 6-20 from `docs/intake/candidate_levels_6_20.json`, with the accepted CR-0008 level 13 revision applied to both the intake source and canonical runtime data.
- Produce exactly IDs `1` through `20` in ascending order.
- Keep `slug` exactly `level-{id}`.
- Keep `difficulty` exactly equal to `id`.
- Keep one `P`, one `G`, and at least one `B` per level.
- Keep boundary rows and columns fully `#`.
- Keep legal symbols exactly `.`, `#`, `P`, `B`, `G`.
- Keep every raw `P` and `B` directly supported by `#` or `B` in the row below.
- Keep solution metadata out of API-served level objects.
- Keep resource metadata out of API-served level objects.
- Allow surplus blocks. Solution evidence does not need to use every available block.
- Treat resource deficits as validation failures before solution replay.

Level 13 CR-0008 row update:

```json
"#PBBBBBB.B.B.B.B.B.B.B..#"
```

This replaces only level 13 row 12 in both `docs/intake/candidate_levels_6_20.json` and `backend/app/data/levels.json`. It adds exactly three supported, reachable lower-yard blocks while preserving the Double Bench structure, raising level 13 from 12 to 15 movable blocks. All other level 13 rows stay unchanged unless a later accepted Change Request says otherwise.

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
| 13 | `level-13` | Double Bench | 25x14 | 13 | 15 |
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

Add one public resource-analysis helper for tooling and tests:

```python
def analyze_level_resources(
    levels: Sequence[LevelDefinition],
    resource_manifest: Mapping[str, Any],
) -> list[LevelResourceAnalysis]:
    """Compare available blocks against deterministic scaffold requirements."""
```

Implementation detail:

- Keep `LevelResourceAnalysis` as a typed dictionary or small dataclass local to `level_service.py`; it does not become part of API responses.
- Validate the resource manifest shape, version, ID coverage, segment names, and row values before returning analysis.
- Require exactly one resource entry for each level ID `6..20`.
- Compute `requiredBlocksForSegment = rise * (rise + 1) // 2`, where `rise = max(0, fromRow - toRow)`.
- Compute `requiredBlocks`, `availableBlocks`, and `surplusBlocks` for each level.
- Raise `LEVEL_RESOURCE_DEFICIT` when `surplusBlocks < 0`.
- Do not use this helper as a production solver. It is a deterministic design diagnostic; JS replay remains the solvability proof.

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
| `LEVEL_RESOURCE_MANIFEST_INVALID` | Resource manifest shape, version, ID coverage, row values, or segment names are invalid. |
| `LEVEL_RESOURCE_DEFICIT` | A level has fewer available blocks than the deterministic resource requirement. |
| `LEVEL_SOLUTION_MANIFEST_INVALID` | Solution manifest shape, version, ID coverage, or action names are invalid. |
| `LEVEL_SOLUTION_INVALID` | Solution replay returns invalid or does not complete the level. |

Keep existing file/root/not-found codes:

- `LEVELS_FILE_NOT_FOUND`
- `LEVELS_JSON_INVALID`
- `LEVELS_ROOT_INVALID`
- `LEVEL_NOT_FOUND`

Messages should be concise and include enough details to diagnose. Details dictionaries should include `levelId` when available, plus `row`, `col`, `expected`, `got`, `step`, `action`, `availableBlocks`, `requiredBlocks`, or `surplusBlocks` when relevant.

### CLI contract

`tools/validate_levels.py` must support:

```bash
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py backend/app/data/levels.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json
```

Expected successful output:

```text
Validated 20 levels from backend/app/data/levels.json
Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json
Validated resources for 15 levels from tests/fixtures/level_resource_requirements.json
```

For failures, print the validation code, a colon, a space, and the validation message to stderr, then exit `1`.

### Resource manifest

Create or update `tests/fixtures/level_resource_requirements.json`:

```json
{
  "version": "0.1.0",
  "levels": [
    {
      "levelId": 13,
      "segments": [
        { "name": "ground-to-workbench", "fromRow": 12, "toRow": 9 },
        { "name": "workbench-to-goal", "fromRow": 9, "toRow": 6 }
      ]
    }
  ]
}
```

Rules:

- Exactly one resource entry exists for each ID `6..20`.
- `segments` is non-empty.
- Segment `name` is a non-empty string and is unique within the level.
- `fromRow` and `toRow` are zero-based integers within the canonical level height.
- For each segment, `rise = max(0, fromRow - toRow)`.
- For each segment, `requiredBlocksForSegment = rise * (rise + 1) / 2`.
- For each level, `requiredBlocks = sum(requiredBlocksForSegment)`.
- For each level, `availableBlocks = count("B")` in the canonical grid.
- For each level, `surplusBlocks = availableBlocks - requiredBlocks`.
- `surplusBlocks < 0` fails with `LEVEL_RESOURCE_DEFICIT`.
- `surplusBlocks >= 0` passes the resource gate but does not prove solvability.
- Level 13 must include the two segments shown above, report `availableBlocks = 15`, `requiredBlocks = 12`, and `surplusBlocks = 3` after the CR-0008 row update.

### Stack-stability engine contract

Update `frontend/js/engine.js` so block pickup follows the CR-0006 rule:

- When the player is not carrying a block and uses `interact`, first find the adjacent block in the facing direction as today.
- If no adjacent block exists, keep the existing invalid/no-op behavior.
- If an adjacent block exists and any uncarried block has the same column and `row === adjacent.row - 1`, return an invalid result with:
  - `invalid: true`
  - `changed: false`
  - unchanged `moves`
  - unchanged `history`
  - message exactly `Block is supporting another block.`
- If the adjacent block has no block directly above it, existing pickup behavior still applies.
- Placement behavior and gravity behavior remain unchanged.

### Solution manifest

Create or update `tests/fixtures/level_solutions.json`:

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

### Deterministic solver/analyzer CLI

Create or update `tools/solve-levels.mjs` as a no-dependency Node ES module. It must export these functions for tests:

```js
export function runPreflight(level, contract, options = {}) {}
export function planLevel(level, contract, options = {}) {}
export function solveLevel(level, contract, options = {}) {}
export function analyzeLevel(level, contract, solutionReport, options = {}) {}
export function runSolver(options = {}) {}
export function canonicalizeState(state, levelId) {}
export function createStateKey(state) {}
export function expandLegalActions(state, level, contract) {}
export function createFailureSignature(report) {}
export function isFailureDominated(candidateSignature, priorSignature) {}
export function createConstructionLedger(context, candidatePlan = {}) {}
export function scoreConstructionLedger(ledger, context = {}) {}
export function isLedgerDominated(candidateLedger, priorLedger) {}
export function scheduleLedgerMacros(context, ledger) {}
export function identifySupportedScaffoldTargets(context) {}
export function classifyBlocks(context) {}
export function collectLegalFreeBlock(context, blockSelector) {}
export function placeSupportedBlock(context, targetCell) {}
export function buildStairOrScaffold(context, scaffoldTargets) {}
export function climbToWorkPlatform(context, platformTarget) {}
export function recoverTemporaryBlock(context, blockSelector) {}
export function completeFinalGoalApproach(context, approachCell) {}
export function executeMacroStep(context, macroStep) {}
export function createDefaultReport(report) {}
export function createDebugTrace(report) {}
export function replayTraceActions(trace, level, contract) {}
export function analyzeTrace(level, contract, trace, options = {}) {}
export function decodeTracePhases(replayFrames, context = {}) {}
export function detectRegionTransfers(replayFrames, regions = []) {}
export function detectTemporaryScaffolds(replayFrames, regions = []) {}
export function createTraceSolverRecommendations(traceAnalysis, solverReport = {}) {}
export function assertValidityDoesNotUseTrace(options = {}) {}
export function buildRegionGraph(level, settledState, contract) {}
export function classifyRegionStockpiles(regionGraph, settledState) {}
export function planRegionTransfers(context, finalBuildReadiness) {}
export function checkFinalBuildReadiness(context, candidatePlan) {}
export function solveEndgameLogisticsLevel(level, contract, options = {}) {}
```

Implementation rules:

- Read `shared/app_contract.json` and `backend/app/data/levels.json` through Node built-ins.
- Use `createInitialState(level, contract)` and `dispatchGameAction(state, { type: action }, level, contract)` from `frontend/js/engine.js`.
- Search only `moveLeft`, `moveRight`, `jump`, and `interact`.
- Never use or emit `reset`, `undo`, or `selectLevel`.
- Never write level, intake, solution, or expectation fixtures.
- Keep output deterministic for identical inputs and budgets.
- Use a three-layer solver: an engine-backed canonical state-space layer, a construction ledger that chooses scaffold and resource subgoals, and a tactical executor that decomposes each ledger/macro step into raw engine actions.
- A macro may propose a target state, but only a replayed raw action list through `dispatchGameAction(...)` can commit the macro result.
- Reject any macro that creates a floating block, teleports a block, picks up a supporting block, places into an invalid cell, mismatches its promised state after gravity, or cannot replay through legal engine actions.
- Treat every emitted `SOLVED` action list as candidate evidence only until `tests/js/level-solutions.test.js` replays it from the solution fixture.
- Treat blocks as interchangeable in solver state keys. Engine-internal block IDs may be present in runtime objects, but they must not affect canonical solver equality or repeated-state pruning.

CLI arguments:

| Flag | Values | Meaning |
|---|---|---|
| `--mode` | `validity`, `analyze`, `analyze-trace` | `validity` searches for completion; `analyze` reports metrics/recommendations; `analyze-trace` decodes replay-valid manual traces into strategic solver guidance. |
| `--level` | integer ID | Run one level. Mutually exclusive with `--all`. |
| `--all` | boolean | Run all canonical levels. Mutually exclusive with `--level`. |
| `--max-states` | positive integer | Global state expansion budget per level. |
| `--format` | `json`, `text` | Optional; default `json`. Tests use `json`. |
| `--debug-trace` | boolean | Include detailed macro, tactical replay, pruning, scoring, and raw state diagnostics. |
| `--trace` | path | Required only with `--mode analyze-trace`; invalid for `validity` mode. |

Default JSON output shape:

```json
{
  "version": "0.1.0",
  "mode": "validity",
  "levelId": 13,
  "status": "SOLVED",
  "phase": "complete_final_goal_approach",
  "failedInvariant": null,
  "failureCategory": null,
  "cause": null,
  "topRecommendations": [],
  "summary": {
    "blocksAvailable": 15,
    "blocksStaged": 0,
    "finalScaffoldCellsBuilt": 15,
    "temporaryBlocksUsed": 6,
    "recoverableBlocksRemaining": 3,
    "statesExpanded": 124,
    "maxQueueSize": 41,
    "macrosAccepted": 42,
    "macrosRejected": 0,
    "solutionLength": 230
  },
  "actions": [],
  "debugTraceAvailable": true
}
```

Allowed statuses:

- `SOLVED`
- `FAILED_PREFLIGHT`
- `UNPROVEN_WITHIN_LIMIT`
- `UNSOLVABLE_EXHAUSTED`
- `ANALYZED`

Validity mode must reject `--trace` with a non-zero exit and a concise `TRACE_INPUT_NOT_ALLOWED` error. Validity mode must not read `tests/fixtures/manual_traces/` by convention, hidden level-action arrays, or per-level trace shortcut files.

Default output rules:

- Always include `status`, `levelId`, `phase`, `failedInvariant`, `failureCategory`, `cause`, `topRecommendations`, and `summary`.
- Include `actions` when status is `SOLVED`; the actions must be the flattened raw action replay from the accepted macro plan.
- `topRecommendations` contains at most three entries, each with `type`, `priority`, `reason`, and `action`.
- `summary` includes at least `blocksAvailable`, `blocksStaged`, `finalScaffoldCellsBuilt`, `temporaryBlocksUsed`, `recoverableBlocksRemaining`, `statesExpanded`, `maxQueueSize`, `macrosAccepted`, `macrosRejected`, and `solutionLength` when solved.
- Default output must not include large rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, or full macro step traces.
- Detailed diagnostics are emitted only with `--debug-trace`, including `macroPlan.steps`, `macroPlan.rejectedSteps`, failed tactical replays, failure signatures, pruned equivalent states or failure counts, candidate scaffold scoring, raw canonical state keys, rejected candidate plans, and per-macro preconditions/targets/raw actions/start/end keys.
- Solved `--debug-trace` output may include optional state-by-state replay text for human inspection; default output must not include that replay text.

Non-solved `failureCategory` values:

- `RESOURCE_DEFICIT`
- `NO_GOAL_APPROACH`
- `UNREACHABLE_STOCKPILE`
- `NEEDED_BLOCK_COVERED`
- `TEMPORARY_BLOCK_NOT_RECOVERABLE`
- `PLAYER_TRAP_RISK`
- `FINAL_SCAFFOLD_UNBUILDABLE`
- `TACTICAL_REPLAY_FAILED`
- `MACRO_INVARIANT_FAILED`
- `SEARCH_BUDGET_UNPROVEN`

Every failure category must map to at least one concrete redesign or solver-improvement lever. Default output exposes only the top three recommendations.

Preflight implementation:

- Run structural validation before search.
- Build candidate final approach scaffolds from the planner.
- For each final vertical scaffold candidate with `rise`, compute `requiredFinalScaffoldBlocks = rise * (rise + 1) / 2`.
- Fail with `FAILED_PREFLIGHT`, `reason: "FINAL_SCAFFOLD_BLOCK_DEFICIT"`, and `statesExpanded: 0` only when every valid final committed scaffold candidate exceeds available blocks.
- Include `deficitBlocks = requiredFinalScaffoldBlocks - availableBlocks` when `requiredFinalScaffoldBlocks > availableBlocks`.
- Report `temporaryAccessEstimate`, `recoverableTemporaryBlocks`, and `reuseRequired` as diagnostics. Do not hard-fail on recoverable temporary scaffold estimates.
- For current canonical level 13 after the CR-0008 15-block revision, run preflight before macro search and explicitly report the lowest non-deficient final scaffold candidate that caused macro solving to continue.

Physics-certified construction-ledger planner implementation:

- Start from the settled state returned by `createInitialState(...)`.
- Locate the goal and enumerate completion approach cells that can legally move or jump into the goal.
- Reject blocked approach cells and cells with no possible scaffold candidate.
- Generate triangular-stair and terrain-assisted scaffold candidates from plausible origins:
  - nearest existing platform edge;
  - lower ground under or near the goal shelf;
  - reachable workbenches;
  - terrain shelves that reduce final height.
- Identify initially reachable platform regions without moving blocks.
- Group blocks by stockpile region.
- Classify each block as:
  - immediately free and reachable;
  - reachable after temporary scaffold;
  - covered or supporting another block;
  - likely recoverable after use;
  - likely stranded if used too early.
- Build `constructionLedger` objects for candidate plans. Each ledger contains `finalScaffoldCells`, `stagingCells`, `reservedBlocks`, `temporaryCells`, `committedCells`, `workPlatforms`, `requiredCarryUpBlocks`, and `riskFlags`.
- Represent `reservedBlocks` with canonical block-position selectors, stockpile-region reservations, or reserved block counts. Do not represent reservations with stable block IDs.
- Build ordered subgoals that collect useful free blocks, place scaffold targets, climb to new work positions, recover temporary access blocks when supply requires reuse, preserve reserved blocks until their ledger phase, and complete the final approach scaffold.
- Rank candidate plans deterministically by final committed block count, travel from useful stockpiles, stranded/buried block risk, blocked pickup paths, recoverability, and final approach alignment.
- Preserve rejected plan reasons and try the next ranked plan when the current candidate fails or reaches its local budget.
- Treat a ledger as dominated when it reaches no additional committed final cells, preserves no better reserved-block set, improves no staging or work-platform reachability, lowers no risk flag, and has no lower action cost than an already explored ledger.
- Implement and test construction-ledger helpers:
  - `createConstructionLedger(context, candidatePlan = {})`;
  - `scoreConstructionLedger(ledger, context = {})`;
  - `isLedgerDominated(candidateLedger, priorLedger)`;
  - `scheduleLedgerMacros(context, ledger)`.
- Implement these required macro operators as named functions with tests:
  - `identifySupportedScaffoldTargets(context)`;
  - `classifyBlocks(context)`;
  - `collectLegalFreeBlock(context, blockSelector)`;
  - `placeSupportedBlock(context, targetCell)`;
  - `buildStairOrScaffold(context, scaffoldTargets)`;
  - `climbToWorkPlatform(context, platformTarget)`;
  - `recoverTemporaryBlock(context, blockSelector)`;
  - `completeFinalGoalApproach(context, approachCell)`.
- Represent every macro step with `macroId`, `type`, `preconditions`, `target`, optional `blockSelector`, `startStateKey`, accepted `endStateKey`, `rawActions`, `status`, and rejected `reason` when applicable.
- Accept a macro step only after `executeMacroStep(...)` replays raw actions from `startStateKey` through `dispatchGameAction(...)` and confirms the promised state after gravity.
- Reject macros that propose unsupported scaffold cells, unreachable or covered blocks, supporting-block pickup, invalid placement, player trap risk, block creation/deletion/teleport, or promised-state mismatch.

Validity search implementation:

- Use a deterministic priority queue guided by macro planner rank and active subgoal score.
- Use raw-action search only inside the tactical executor for the current ledger/macro step, bounded by the macro's preconditions, target, reachable region, and local budget.
- Implement `canonicalizeState(state, levelId)` so it returns the normalized fields used by solver equality and debug output.
- Implement `createStateKey(state)` so it returns a deterministic string containing `levelId`, `status`, player row/col, `facing`, carried-block state as carrying/not-carrying with no persistent block ID, and sorted uncarried block positions as `{row,col}` pairs.
- Implement `expandLegalActions(state, level, contract)` so it calls `dispatchGameAction(...)` for only `moveLeft`, `moveRight`, `jump`, and `interact`, drops `invalid: true` transitions, and returns engine-settled next states.
- Skip states already reached with an equal or lower action count.
- Penalize equivalent no-progress pickup/place cycles while preserving legal reuse that changes world state.
- `createFailureSignature(report)` returns an object with `candidatePlanId`, `approachCell`, `committedScaffoldCells`, `filledScaffoldTargets`, `reachableRegions`, `strandedBlocks`, `blockedPickupCells`, `unrecoverableTemporaryBlocks`, and `reason`.
- `isFailureDominated(candidateSignature, priorSignature)` returns true only when the candidate has no additional filled scaffold target, no additional reachable region, no fewer stranded blocks, no fewer blocked pickup cells, and no lower action count than the prior signature.
- Skip equivalent failure signatures and dominated candidate plans; increment `prunedSimilarFailures` for each skipped retry.
- Return `UNSOLVABLE_EXHAUSTED` only after all candidate plans have no remaining unvisited non-dominated states. Return `UNPROVEN_WITHIN_LIMIT` when the state budget ends before that condition.
- Stop on the first completed state.
- Emit replayable actions and planner diagnostics.
- Do not hardcode benchmark-specific action lists or mutate board state outside engine replay. A reported `SOLVED` result for levels 10, 13, or 14 must come from the shared solver architecture.

Current canonical benchmark implementation:

- Current canonical level 13 means `levelId === 13` after the accepted CR-0008 row update, with `availableBlocks === 15`, resource-manifest `requiredBlocks === 12`, resource-manifest `surplusBlocks === 3`, and solver preflight `requiredFinalScaffoldBlocks === 15`.
- The project owner has manually completed current level 13 in roughly 230 moves, so final validity mode for current canonical level 13 must return `SOLVED` with macro-plan steps plus a flattened replayable raw action list.
- Current canonical levels 10 and 14 are required generalization benchmarks. They must return `SOLVED` with replayable raw actions through the same canonical state-space solver, construction-ledger rules, tactical executor, and output contract as level 13.
- Treat final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` for current canonical level 13 as `LEVEL_SOLVER_LEVEL13_UNPROVEN` and `LEVEL_SOLVER_BENCHMARK_UNPROVEN`, then stop implementation for solver-plan revision or a solver-focused Change Request.
- Treat final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` for current canonical level 10 or 14 as `LEVEL_SOLVER_BENCHMARK_UNPROVEN`, then stop implementation for solver-plan revision or a solver-focused Change Request.
- Do not propose current-level geometry redesign from a non-solved Level 13 solver result unless a later Change Request supersedes the manual solvability evidence.
- If current level 13 is not `SOLVED` during development, default output must include `phase`, `failedInvariant`, `failureCategory`, `cause`, `topRecommendations` capped at three, and summary metrics for block availability, staging, scaffold progress, temporary blocks, recoverable blocks, states expanded, accepted macros, and rejected macros.
- If `--debug-trace` is passed for current level 13, output must include the failed macro operator, rejected macro steps, failed tactical replay details, failure signatures, pruned equivalent states, candidate scaffold scoring, and raw state keys needed to revise the solver.
- Do not special-case level 13 with hardcoded action lists, board mutations, or assumptions that fail level 10 or level 14.

Analyzer implementation:

- Run after a solved validity report or an explicitly requested diagnostic report.
- Compute summary metrics: `shortestFoundActions`, `pickups`, `placements`, `uniqueBlocksUsed`, `reusedBlockCount`, `unusedBlocks`, `maxStackHeight`, `maxPlayerElevation`, `peakCommittedBlocks`, and `statesExpanded`.
- Compute difficulty signals: `irreversibleDeadEndsFound`, `lateDeadEndsFound`, `nearGoalDeadEndsFound`, `resourceStrandingDeadEnds`, `misleadingProgressStates`, `solutionOrderSensitivity`, and unintended bypass evidence.
- Emit recommendations with `type`, `priority`, `reason`, and `action`.
- Recommendation actions must be copy-ready design guidance such as add reachable blocks, remove surplus blocks, move a stockpile, raise/lower a shelf, force platform order, make block reuse necessary, reduce a bypass route, or rerun validity after an edit.

### Trace recorder contract

Create `frontend/js/trace-recorder.js` as a no-dependency ES module exporting:

```js
export function createTraceRecorder({ levelId, contractVersion }) {}
export function startTraceRecording(recorder) {}
export function recordTraceAction(recorder, action, beforeState, afterState, result) {}
export function stopTraceRecording(recorder, finalState) {}
export function invalidateTraceRecording(recorder, reason) {}
export function exportTraceRecording(recorder) {}
export async function copyTraceToClipboard(traceJson, clipboard = navigator.clipboard) {}
export function createTraceDownloadBlob(traceJson) {}
```

Recorder state:

- `createTraceRecorder(...)` returns `{ levelId, contractVersion, recording: false, completed: false, invalidated: false, invalidationReason: null, actions: [], summary: { actionCount: 0, pickups: 0, placements: 0 } }`.
- `startTraceRecording(...)` clears prior actions and sets `recording: true`.
- `recordTraceAction(...)` appends only `moveLeft`, `moveRight`, `jump`, and `interact` when `result.invalid !== true`.
- Facing-only turns must be recorded when the action result is a non-invalid replay-relevant state transition, even when `moves` does not increment.
- For `interact`, compare `beforeState.carrying` and `afterState.carrying` to increment `summary.pickups` or `summary.placements`.
- `invalidateTraceRecording(...)` stops recording, sets `invalidated: true`, and preserves the reason for UI display.
- `stopTraceRecording(...)` succeeds only when `finalState.status === "completed"` and the recorder is not invalidated.
- `exportTraceRecording(...)` returns the SPEC-0004 shape with `source: "manual-trace"`, `completed`, `invalidated`, `actions`, and summary counts.

Wire UI with these stable DOM IDs:

| ID | Purpose |
|---|---|
| `trace-record-button` | Starts a new recording for the selected level. |
| `trace-copy-button` | Copies completed trace JSON from the fallback panel. |
| `trace-download-button` | Downloads completed trace JSON from the fallback panel. |
| `trace-status` | Shows compact recorder state, completion, copy success/failure, or invalidation reason. |
| `trace-output` | Visible/selectable completed JSON fallback; hidden while no completed trace exists. |

`frontend/js/app.js` integration rules:

- Create a fresh recorder on level load and when the selected level changes.
- Only call `recordTraceAction(...)` after the existing game action path has called `dispatchGameAction(...)`.
- Do not record invalid actions.
- Invalidate recording on `undo`, `reset`, or level change.
- On completion, call `stopTraceRecording(...)`, stringify the export with two-space indentation, attempt `copyTraceToClipboard(...)`, and keep the JSON visible/selectable regardless of clipboard success.
- Do not write trace files automatically, send trace data over the network, or store traces in localStorage progress data.

### Trace macro analyzer contract

`tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json` must:

- Read the trace file only in `analyze-trace` mode.
- Validate `version`, `contractVersion`, `source`, `levelId`, `completed`, `invalidated`, and `actions`.
- Call `replayTraceActions(trace, level, contract)` from `createInitialState(...)` through `dispatchGameAction(...)`.
- Return `FAILED_PREFLIGHT` with `reason: "TRACE_REPLAY_INVALID"`, `traceReplay.valid: false`, and `traceReplay.invalidStep` when replay fails.
- Return `ANALYZED` only when replay reaches `state.status === "completed"` with no invalid action.

Default `ANALYZED` output shape:

```json
{
  "version": "0.1.0",
  "mode": "analyze-trace",
  "levelId": 17,
  "status": "ANALYZED",
  "traceReplay": {
    "valid": true,
    "completed": true,
    "invalidStep": null
  },
  "observedPhaseSequence": ["collect", "stage", "transfer_between_regions", "build_final_scaffold", "complete_goal_approach"],
  "regionTransfers": [
    { "fromRegion": "lower-yard", "toRegion": "upper-worksite", "blocksMoved": 3 }
  ],
  "temporaryScaffolds": [],
  "recoveryPoints": [],
  "finalScaffoldBuildOrder": [{ "row": 10, "col": 18 }],
  "solverFacingRecommendations": []
}
```

`observedPhaseSequence` values are restricted to `collect`, `stage`, `build_temporary_access`, `climb_to_platform`, `recover_temporary_blocks`, `transfer_between_regions`, `build_final_scaffold`, and `complete_goal_approach`.

Each `solverFacingRecommendations[]` item has exactly these implementation-required fields:

- `type`
- `priority`
- `reason`
- `action`
- `observedPhaseSequence`
- `requiredRegionTransfers`
- `temporaryScaffoldPattern`
- `recoveryPoint`
- `finalScaffoldBuildOrderClue`
- `missingPlannerCapability`
- `proposedGenericOperatorOrInvariant`
- `replacedBadBehavior`
- `regressionTestExpectation`

Recommendation tests must prove analyzer output is strategic and order-agnostic: it may name region transfers, readiness checks, scaffold dependencies, recovery requirements, and final-build readiness, but it must not expose or require a raw human action-order script.

### Region-logistics solver additions

Extend the CR-0010 construction-ledger solver instead of replacing the CLI/reporting/replay scaffolding.

Implement:

- `buildRegionGraph(level, settledState, contract)`: derives named terrain/platform regions from reachable standing cells and vertical transfer boundaries. At minimum, current endgame levels must distinguish lower-yard stockpiles, intermediate work platforms, and final goal-side work areas.
- `classifyRegionStockpiles(regionGraph, settledState)`: returns per-region block counts and per-block classifications: `free`, `covered`, `supporting`, `staged`, `temporary`, `committed`, `recoverable`, or `stranded`.
- `checkFinalBuildReadiness(context, candidatePlan)`: returns final approach cell, final scaffold cells, required staged blocks per target region, missing staged blocks, temporary access requirements, recovery requirements, and `ready: boolean`.
- `planRegionTransfers(context, finalBuildReadiness)`: creates deterministic subgoals such as `stage N blocks from lower-yard to upper-worksite before final climb`.
- `solveEndgameLogisticsLevel(level, contract, options = {})`: plans from final goal/scaffold requirements backward to stockpile, staging, transfer, temporary-access, recovery, and final-build readiness, then certifies forward through the existing tactical executor and engine replay.

Rules:

- Level 16 remains a regression benchmark and must stay `SOLVED`.
- Level 17 is the first endgame benchmark and must return `SOLVED` with replayable raw actions in validity mode without `--trace`.
- Levels 18-20 must either return `SOLVED` or a precise planner-gap diagnostic that maps to the accepted failure categories and names the missing strategic capability.
- Trace-derived solver changes must become generic operators, invariants, or scoring rules. Each change must include a test naming the replaced bad behavior and proving validity mode no longer repeats it without reading trace exports.
- Do not add per-level raw action arrays, per-level board mutations, trace-specific shortcuts, or solver branches that special-case level 17.

### JS solution test

Create or update `tests/js/level-solutions.test.js` exporting `run()` and using only Node built-ins:

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

Update `tests/js/run-tests.mjs` to import and run it after solver tests:

```js
import { run as runLevelSolutions } from './level-solutions.test.js';
```

Expected final output:

```text
ok physics
ok engine
ok trace recorder
ok solver
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

### Task 4A: Stack-stability engine behavior

**Files:**

- Modify `frontend/js/engine.js`
- Modify `tests/js/engine.test.js`

- [ ] Add an engine test where the player faces a lower block that has another block directly above it.
- [ ] Assert `interact` returns `invalid: true`, `changed: false`, unchanged `moves`, unchanged `history`, and message `Block is supporting another block.`
- [ ] Add or preserve an engine test proving pickup still succeeds when the adjacent block has no block directly above it.
- [ ] Run the JS suite and confirm the new stack-stability test fails before implementation:

```bash
node tests/js/run-tests.mjs
```

Expected before implementation: the supporting-block pickup assertion fails because current pickup logic checks only the adjacent cell.

- [ ] Implement the stack-stability guard in `frontend/js/engine.js` without changing placement, gravity, movement, jump, reset, or undo behavior.
- [ ] Re-run:

```bash
node tests/js/run-tests.mjs
```

Expected after implementation: existing physics/engine tests and the new stack-stability assertions pass.

### Task 4B: Resource manifest, level 13 revision, and resource validation

**Files:**

- Create or update `tests/fixtures/level_resource_requirements.json`
- Modify `tests/test_level_validation.py`
- Modify `backend/app/services/level_service.py`
- Modify `tools/validate_levels.py`
- Modify `docs/intake/candidate_levels_6_20.json`
- Modify `backend/app/data/levels.json`

- [ ] Create or update `tests/fixtures/level_resource_requirements.json` with exactly one entry for each level ID `6..20`.
- [ ] For level 13, include exactly these segments:

```json
[
  { "name": "ground-to-workbench", "fromRow": 12, "toRow": 9 },
  { "name": "workbench-to-goal", "fromRow": 9, "toRow": 6 }
]
```

- [ ] Add backend validation tests for:
  - happy-path resource analysis returns 15 reports;
  - level 13 reports `availableBlocks == 15`, `requiredBlocks == 12`, and `surplusBlocks == 3`;
  - a synthetic under-resourced manifest/level raises `LEVEL_RESOURCE_DEFICIT`;
  - malformed resource manifest shape or ID coverage raises `LEVEL_RESOURCE_MANIFEST_INVALID`.
- [ ] Update level 13 row 12 in both `docs/intake/candidate_levels_6_20.json` and `backend/app/data/levels.json` to:

```json
"#PBBBBBB.B.B.B.B.B.B.B..#"
```

- [ ] Implement `analyze_level_resources(...)` in `backend/app/services/level_service.py`.
- [ ] Update `tools/validate_levels.py` to parse optional `--resource-source tests/fixtures/level_resource_requirements.json`.
- [ ] Make CLI resource validation run against the canonical level file, not the intake candidate file.
- [ ] Run:

```bash
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_level_validation.py
```

Expected output includes:

```text
Validated 20 levels from backend/app/data/levels.json
Validated resources for 15 levels from tests/fixtures/level_resource_requirements.json
```

Expected tests: resource tests and existing level-validation tests pass.

### Task 4C: Solver tests and expectations

**Files:**

- Create or update `tests/fixtures/level_solver_expectations.json`
- Create or update `tests/js/solver.test.js`
- Modify `tests/js/run-tests.mjs`

- [ ] Create or update `tests/fixtures/level_solver_expectations.json` with version `0.1.0`.
- [ ] Include expected solver budgets:
  - level 1: `SOLVED`, `maxStates=500`, `maxTimeMs=1000`;
  - levels 2-10: `SOLVED` with deterministic per-level `maxStates` budgets chosen after the first local benchmark and kept comfortably above observed counts;
  - level 10: `SOLVED`, `maxStates=1000000`, `maxTimeMs=30000`, `requiresConstructionLedger=true`, and `requiresReplay=true`;
  - under-resourced synthetic fixture: `FAILED_PREFLIGHT`, `failureCategory="RESOURCE_DEFICIT"`, `cause` naming the final scaffold deficit, and `summary.statesExpanded=0`;
  - current canonical level 13: `status="SOLVED"`, `maxStates=1000000`, `maxTimeMs=30000`, `minActions=1`, `maxActions=1000`, `requiresConstructionLedger=true`, `requiresMacroPlan=true`, `requiresReplay=true`, and `requiresCarryUpReservation=true`;
  - level 14: `SOLVED`, `maxStates=1000000`, `maxTimeMs=30000`, `requiresConstructionLedger=true`, and `requiresReplay=true`;
  - level 16: `SOLVED`, `maxStates=1000000`, `maxTimeMs=30000`, `requiresRegionLogisticsRegression=true`, and `requiresReplay=true`;
  - level 17: `SOLVED`, `maxStates=1000000`, `maxTimeMs=30000`, `requiresRegionLogistics=true`, `requiresTraceInput=false`, `requiresReplay=true`, and `requiresFinalBuildReadiness=true`;
  - levels 18-20: `SOLVED` or non-solved output with accepted failure category, precise planner-gap diagnostic, and at least one concrete solver-improvement or future-level design lever;
  - manual trace fixture for level 17: `ANALYZED` through `--mode analyze-trace`, `traceReplay.valid=true`, phase sequence includes at least one of `transfer_between_regions`, `build_temporary_access`, or `recover_temporary_blocks`, and recommendations are strategic/order-agnostic;
  - validity-mode overfit fixture: passing `--trace` to validity mode exits non-zero with `TRACE_INPUT_NOT_ALLOWED`, and normal validity mode does not read `tests/fixtures/manual_traces/`;
  - synthetic tiny solved fixture: `SOLVED` and replayable actions;
  - canonical-state permutation fixture: two states with identical player row/col, facing, carry presence, level status, and sorted uncarried block positions but different engine-internal block IDs produce the same state key;
  - invalid-action fixture: invalid `moveLeft`, `moveRight`, `jump`, or `interact` results are not enqueued as solver states;
  - construction-ledger fixtures: reserved block consumed early, unrecoverable temporary block marked recoverable, committed scaffold cell disturbed, and dominated ledger pruned;
  - synthetic no-progress stress fixture: state-key deduplication prevents repeated equivalent pickup/place cycles from dominating search;
  - synthetic repeated-bad-plan fixture: failure-signature dominance pruning skips equivalent or dominated failed candidate plans and reports `prunedSimilarFailures > 0`.
- [ ] Include required default output fields:
  - `status`;
  - `levelId`;
  - `phase`;
  - `failedInvariant`;
  - `failureCategory`;
  - `cause`;
  - `topRecommendations`;
  - `summary.blocksAvailable`;
  - `summary.blocksStaged`;
  - `summary.finalScaffoldCellsBuilt`;
  - `summary.temporaryBlocksUsed`;
  - `summary.recoverableBlocksRemaining`;
  - `summary.statesExpanded`;
  - `summary.maxQueueSize`;
  - `summary.macrosAccepted`;
  - `summary.macrosRejected`;
  - `summary.solutionLength` when solved;
  - `debugTraceAvailable`.
- [ ] Include required debug-trace field lists:
  - `macroPlan.steps`;
  - `macroPlan.rejectedSteps`;
  - failed tactical replay records;
  - failure signatures;
  - pruned equivalent state or failure counts;
  - candidate scaffold scoring;
  - raw canonical state keys.
  - optional state-by-state text replay for solved benchmark results.
- [ ] Include the allowed non-solved failure categories exactly:
  - `RESOURCE_DEFICIT`;
  - `NO_GOAL_APPROACH`;
  - `UNREACHABLE_STOCKPILE`;
  - `NEEDED_BLOCK_COVERED`;
  - `TEMPORARY_BLOCK_NOT_RECOVERABLE`;
  - `PLAYER_TRAP_RISK`;
  - `FINAL_SCAFFOLD_UNBUILDABLE`;
  - `TACTICAL_REPLAY_FAILED`;
  - `MACRO_INVARIANT_FAILED`;
  - `SEARCH_BUDGET_UNPROVEN`.
- [ ] Add `tests/js/solver.test.js` using Node built-ins only.
- [ ] Import solver functions from `../../tools/solve-levels.mjs`.
- [ ] Assert solver output statuses are restricted to the SPEC-0004 status vocabulary.
- [ ] Assert `canonicalizeState(...)` captures only `levelId`, `status`, player row/col, facing, carrying/not-carrying, and sorted uncarried block positions.
- [ ] Assert `createStateKey(...)` returns identical keys for block-identity permutations and equivalent states reached by different no-progress action sequences.
- [ ] Assert `createStateKey(...)` returns distinct keys when player row/col, facing, carry presence, level status, or sorted uncarried block positions differ.
- [ ] Assert `expandLegalActions(...)` enqueues only engine-settled legal `moveLeft`, `moveRight`, `jump`, and `interact` transitions and drops `invalid: true` results.
- [ ] Assert construction ledgers include `finalScaffoldCells`, `stagingCells`, `reservedBlocks`, `temporaryCells`, `committedCells`, `workPlatforms`, `requiredCarryUpBlocks`, and `riskFlags`.
- [ ] Assert ledger fixtures reject early reserved-block consumption, unrecoverable temporary recovery claims, disturbed committed cells, and dominated ledgers.
- [ ] Assert `createFailureSignature(...)` includes `candidatePlanId`, `approachCell`, `committedScaffoldCells`, `filledScaffoldTargets`, `reachableRegions`, `strandedBlocks`, `blockedPickupCells`, `unrecoverableTemporaryBlocks`, and `reason`.
- [ ] Assert `isFailureDominated(...)` returns true for an equivalent or worse failed plan and false when a candidate unlocks a new reachable region, fills a new scaffold target, reduces stranded blocks, reduces blocked pickup cells, or has a lower action count.
- [ ] Assert level 1 solves under 500 expanded states and under 1000 ms locally.
- [ ] Assert known solved levels 2-10 return `SOLVED` within their fixture budgets.
- [ ] Assert the under-resourced fixture returns `FAILED_PREFLIGHT`, `failureCategory === "RESOURCE_DEFICIT"`, and `summary.statesExpanded === 0`.
- [ ] Assert current canonical level 10 returns `SOLVED` within `maxStates=1000000` and `maxTimeMs=30000`.
- [ ] Assert current canonical level 13 returns `SOLVED` within `maxStates=1000000` and `maxTimeMs=30000`.
- [ ] Assert current canonical level 13 returns accepted macro steps and a flattened raw action list.
- [ ] Assert current canonical level 13 raw actions replay through `dispatchGameAction(...)` from `createInitialState(...)` and complete the level.
- [ ] Assert current canonical level 14 returns `SOLVED` within `maxStates=1000000` and `maxTimeMs=30000`.
- [ ] Assert current canonical level 16 remains `SOLVED` within `maxStates=1000000` and `maxTimeMs=30000` after trace/logistics changes.
- [ ] Assert current canonical level 17 returns `SOLVED` within `maxStates=1000000` and `maxTimeMs=30000` without trace input.
- [ ] Assert current canonical levels 18-20 either return `SOLVED` or a precise planner-gap diagnostic with an accepted failure category and concrete solver-improvement or future-level design lever.
- [ ] Assert solved benchmark outputs include `solutionLength`, `statesExpanded`, `maxQueueSize`, and `actions`.
- [ ] Assert any non-solved synthetic output uses one of the allowed failure categories and includes at least one and at most three `topRecommendations`.
- [ ] Assert every allowed failure category has at least one mapped redesign or solver-improvement recommendation lever.
- [ ] Assert default non-solved output does not include rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, or full macro traces.
- [ ] Assert `--debug-trace` output includes macro-plan steps, rejected macro steps, tactical replay failures, failure signatures, pruned equivalent states, candidate scoring, and raw state keys.
- [ ] Assert the repeated-bad-plan fixture reports `prunedSimilarFailures > 0`.
- [ ] Assert a solved report's actions replay through `dispatchGameAction(...)` and complete the level.
- [ ] Assert running the same solver command twice returns the same status, first action sequence, state count, planner chosen candidate rank, and recommendation types.
- [ ] Assert macro planner diagnostics include supported scaffold targets, block classifications, goal approach cells, candidate scaffolds, chosen candidate rank, stockpile regions, subgoals, and rejected candidate reasons when `--debug-trace` is used.
- [ ] Assert `buildRegionGraph(...)`, `classifyRegionStockpiles(...)`, `checkFinalBuildReadiness(...)`, and `planRegionTransfers(...)` derive final goal/scaffold requirements before region transfers and staging.
- [ ] Assert region-logistics fixtures reject starting final climb before required target-region staged block counts are satisfied.
- [ ] Assert `solveEndgameLogisticsLevel(...)` emits actions that replay through `dispatchGameAction(...)` and does not consume trace exports.
- [ ] Assert trace analyzer output for `tests/fixtures/manual_traces/level_17_trace.json` reports `ANALYZED`, replay validity, observed phases, region transfers or temporary scaffold evidence, and strategic `solverFacingRecommendations`.
- [ ] Assert trace analyzer recommendations name `missingPlannerCapability`, `proposedGenericOperatorOrInvariant`, `replacedBadBehavior`, and `regressionTestExpectation`.
- [ ] Assert trace analyzer recommendations do not include raw human move-order scripts or require the solver to reproduce chronological trace order.
- [ ] Assert validity mode rejects `--trace` and that solving level 17 does not read `tests/fixtures/manual_traces/level_17_trace.json`.
- [ ] Add synthetic invalid macro fixtures for floating target placement, supporting-block pickup, promised-state mismatch, unreachable covered block, temporary block not recoverable, player trap risk, and tactical replay failure.
- [ ] Assert solver output for levels 10, 13, and 14 is not generated from per-level hardcoded action lists or per-level board mutations by checking the same exported planning functions are called and the final actions replay from the unmodified level data.
- [ ] Assert analyzer reports summary metrics, difficulty signals, and actionable recommendations with `type`, `priority`, `reason`, and `action`.
- [ ] Update `tests/js/run-tests.mjs` so solver tests run before solution replay tests.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

Expected before solver implementation: solver test import or assertion failures. Existing physics and engine assertions should still pass.

### Task 4D: Implement deterministic solver/analyzer CLI

**Files:**

- Create or update `tools/solve-levels.mjs`

- [ ] Implement the CR-0010 construction-ledger exported functions from the deterministic solver/analyzer CLI contract. Trace analyzer exports are implemented in Task 4G; region-logistics exports are implemented in Task 4H.
- [ ] Implement CLI parsing for `--mode`, `--level`, `--all`, `--max-states`, optional `--format`, and optional `--debug-trace`.
- [ ] Implement structural preflight and final committed scaffold lower-bound checks.
- [ ] Implement default layered output with `status`, `levelId`, `phase`, `failedInvariant`, `failureCategory`, `cause`, capped `topRecommendations`, `summary`, optional `actions`, and `debugTraceAvailable`.
- [ ] Implement `createDefaultReport(report)` so default output omits large rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, and full macro step traces.
- [ ] Implement `createDebugTrace(report)` so `--debug-trace` adds macro-plan steps, rejected macro steps, failed tactical replays, failure signatures, pruned equivalent states, candidate scaffold scoring, raw canonical state keys, rejected candidates, and per-macro preconditions/targets/raw actions/start/end keys.
- [ ] Implement optional debug-only state-by-state replay text for solved benchmark results.
- [ ] Implement `canonicalizeState(state, levelId)`, `createStateKey(state)`, and `expandLegalActions(state, level, contract)` before macro or ledger search logic.
- [ ] Ensure canonical solver equality treats blocks as interchangeable and excludes engine-internal block IDs.
- [ ] Ensure `expandLegalActions(...)` uses only `dispatchGameAction(...)` results, does not enqueue `invalid: true` transitions, and does not implement independent gravity, collision, support, pickup, placement, or completion logic.
- [ ] Implement goal approach enumeration, scaffold candidate generation, stockpile/platform region detection, block classification, subgoal generation, candidate ranking, and rejected candidate reasons.
- [ ] Implement `createConstructionLedger(context, candidatePlan = {})`, `scoreConstructionLedger(ledger, context = {})`, `isLedgerDominated(candidateLedger, priorLedger)`, and `scheduleLedgerMacros(context, ledger)`.
- [ ] Ensure each construction ledger contains `finalScaffoldCells`, `stagingCells`, `reservedBlocks`, `temporaryCells`, `committedCells`, `workPlatforms`, `requiredCarryUpBlocks`, and `riskFlags`.
- [ ] Ensure `reservedBlocks` uses canonical block-position selectors, stockpile-region reservations, or reserved block counts, never stable block IDs.
- [ ] Implement `identifySupportedScaffoldTargets(context)` to enumerate in-bounds empty candidate scaffold cells that are supported by terrain or a block after replay.
- [ ] Implement `classifyBlocks(context)` to classify blocks as reachable, free, covered, useful, temporary, recoverable, stranded, or final-committed for the active plan.
- [ ] Implement `collectLegalFreeBlock(context, blockSelector)` so it rejects unreachable, covered, or supporting blocks before tactical replay.
- [ ] Implement `placeSupportedBlock(context, targetCell)` so it rejects target cells that are occupied, unsupported, unreachable, or fail replay after gravity settles.
- [ ] Implement `buildStairOrScaffold(context, scaffoldTargets)` so it builds one supported cell at a time using legal collect/place macro steps.
- [ ] Implement `climbToWorkPlatform(context, platformTarget)` so the player reaches the next work platform through raw engine actions before the next macro can commit.
- [ ] Implement `recoverTemporaryBlock(context, blockSelector)` so temporary blocks are recovered only when reachable, free, and not supporting another block.
- [ ] Implement `completeFinalGoalApproach(context, approachCell)` so the final movement sequence reaches the goal through raw engine actions after the committed scaffold exists.
- [ ] Implement `executeMacroStep(context, macroStep)` so every macro is accepted only after raw `dispatchGameAction(...)` replay reaches the promised state after gravity.
- [ ] Implement deterministic priority-queue macro validity search using construction-ledger scoring, canonical state-key deduplication, and no-progress cycle penalties.
- [ ] Use raw-action search only inside tactical macro execution, bounded by the macro's preconditions, target, reachable region, and local budget.
- [ ] Implement `createFailureSignature(report)`.
- [ ] Implement `isFailureDominated(candidateSignature, priorSignature)`.
- [ ] Implement equivalent-failure and dominated-plan pruning; increment `prunedSimilarFailures` when a similar bad plan is skipped.
- [ ] Implement current canonical benchmark validation so final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` for level 13 is reported as `LEVEL_SOLVER_LEVEL13_UNPROVEN` and `LEVEL_SOLVER_BENCHMARK_UNPROVEN`, and the same final non-solved statuses for levels 10 or 14 are reported as `LEVEL_SOLVER_BENCHMARK_UNPROVEN`.
- [ ] Implement current canonical level 13 as a known-solvable benchmark that must return `SOLVED` with macro plan steps plus a flattened replayable raw action list.
- [ ] Implement levels 10 and 14 as known-solvable benchmark gates that must return `SOLVED` with flattened replayable raw actions through the same solver architecture.
- [ ] Implement analyzer summary metrics, difficulty signals, and actionable redesign recommendations.
- [ ] Map every non-solved failure category to at least one concrete redesign or solver-improvement recommendation lever.
- [ ] Keep the solver read-only. Do not update `tests/fixtures/level_solutions.json` automatically.
- [ ] Run:

```bash
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000
node tests/js/run-tests.mjs
```

Expected after implementation:

- Level 1 reports `SOLVED`, fewer than 500 expanded states, and `timeMs < 1000`.
- Under-resourced synthetic equivalent reports `FAILED_PREFLIGHT`, `failureCategory="RESOURCE_DEFICIT"`, and `summary.statesExpanded=0`.
- Current canonical level 13 reports `SOLVED` with macro plan steps and a flattened replayable raw action list.
- Current canonical level 13 raw action replay completes through `dispatchGameAction(...)`.
- Current canonical levels 10 and 14 report `SOLVED` with flattened replayable raw action lists through the same solver architecture.
- Solved benchmark reports include `solutionLength`, `statesExpanded`, `maxQueueSize`, and `actions`.
- Canonical state-key tests prove block identity permutations collapse to one solver key and invalid actions are not enqueued.
- Construction-ledger tests prove required fields are present, reserved blocks are not consumed early, temporary recovery claims are legal, committed cells are not disturbed, and dominated ledgers are pruned.
- `--debug-trace` output for current level 13 includes accepted macro steps, rejected macro steps if any, failed tactical replays if any, failure signatures if any, pruned equivalent states, candidate scaffold scoring, and raw state keys.
- Repeated-bad-plan fixture reports `prunedSimilarFailures > 0`.
- Analyzer output includes metrics, difficulty signals, and actionable recommendations.
- JS suite reaches the existing solution fixture coverage failure only if levels 11-20 are still missing.

### Task 4E: Solver-guided redesign evidence

**Files:**

- Modify `tests/fixtures/level_solver_expectations.json`
- Modify `docs/status/CURRENT_STATE.md`
- Modify `docs/handoff/` only if the solver stops before solution evidence and the next agent needs restart context.

- [ ] Run solver validity on benchmark levels 10, 13, and 14 plus levels 11-20 using the accepted budgets.
- [ ] Capture solver statuses and key diagnostics in `docs/status/CURRENT_STATE.md`.
- [ ] For current canonical level 13, require `SOLVED`; copy candidate actions into `tests/fixtures/level_solutions.json` during Task 5 and let replay prove them.
- [ ] For current canonical levels 10 and 14, require `SOLVED`; copy candidate actions into `tests/fixtures/level_solutions.json` during Task 5 if their solution entries need replacement and let replay prove them.
- [ ] For current canonical level 16, require `SOLVED`; copy candidate actions into `tests/fixtures/level_solutions.json` during Task 5 if its solution entry needs replacement and let replay prove it.
- [ ] If current canonical level 13 returns `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED`, stop and open a solver-focused Change Request or revise the solver plan. Do not open a current-level geometry Change Request from this tool result unless a later accepted Change Request supersedes the owner-confirmed manual solvability evidence.
- [ ] If current canonical level 10 or 14 returns `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED`, stop and open a solver-focused Change Request or revise the solver plan. Do not treat the result as automatic geometry-redesign evidence because the project owner has confirmed current levels are solvable.
- [ ] If current canonical level 17 returns `UNPROVEN_WITHIN_LIMIT` under the CR-0010 construction-ledger solver, do not open another geometry Change Request. Continue to Task 4F and Task 4H under accepted CR-0011.
- [ ] If current canonical level 13 is unsolved during development, copy default output fields into `docs/status/CURRENT_STATE.md`: `phase`, `failedInvariant`, `failureCategory`, `cause`, capped `topRecommendations`, and `summary`.
- [ ] If current canonical level 13 is unsolved during development, rerun with `--debug-trace` and copy only the concise failure evidence needed for the next solver Change Request or handoff: failed macro operator, failed tactical replay summary, representative failure signature, pruned-equivalent count, and candidate scaffold scoring summary.
- [ ] If levels 18-20 return `FAILED_PREFLIGHT`, `UNSOLVABLE_EXHAUSTED`, or `UNPROVEN_WITHIN_LIMIT`, inspect default recommendations and `--debug-trace` diagnostics. After Task 4H, non-solved output is acceptable only when it names the missing strategic capability and gives concrete solver-improvement or future-level design levers.
- [ ] If solver returns `SOLVED`, copy candidate actions into `tests/fixtures/level_solutions.json` during Task 5 and let solution replay prove them.

### Task 4F: Trace recorder UI and replay tests

**Files:**

- Create `frontend/js/trace-recorder.js`
- Modify `frontend/js/app.js`
- Modify `frontend/js/ui.js`
- Modify `frontend/index.html`
- Modify `frontend/style.css`
- Create `tests/js/trace-recorder.test.js`
- Modify `tests/js/run-tests.mjs`

- [ ] Add `tests/js/trace-recorder.test.js` first, importing recorder helpers from `../../frontend/js/trace-recorder.js`.
- [ ] Test `createTraceRecorder(...)` initial state for level ID, contract version, empty actions, and zero summary counts.
- [ ] Test `startTraceRecording(...)` clears prior actions and sets `recording: true`.
- [ ] Test `recordTraceAction(...)` appends successful `moveLeft`, `moveRight`, `jump`, and `interact` actions only after a non-invalid result.
- [ ] Test facing-only turns are recorded when `dispatchGameAction(...)` returns a non-invalid replay-relevant result, even when moves do not increment.
- [ ] Test invalid actions are not appended.
- [ ] Test `interact` pickup/placement counts by comparing `beforeState.carrying` and `afterState.carrying`.
- [ ] Test `invalidateTraceRecording(...)` stops recording and preserves the reason for `undo`, `reset`, and level change cases.
- [ ] Test `stopTraceRecording(...)` marks completion only when `finalState.status === "completed"` and the recorder is not invalidated.
- [ ] Test `exportTraceRecording(...)` returns the exact SPEC-0004 trace shape and summary counts.
- [ ] Test a small completed trace replays through `createInitialState(...)` and `dispatchGameAction(...)` to `state.status === "completed"`.
- [ ] Test `copyTraceToClipboard(...)` returns success when a provided clipboard double resolves and returns failure when the double rejects; fallback JSON remains available either way.
- [ ] Update `tests/js/run-tests.mjs` to run trace recorder tests after engine tests and before solver tests.
- [ ] Implement `frontend/js/trace-recorder.js` with the exported functions named in the trace recorder contract.
- [ ] Add DOM controls with IDs `trace-record-button`, `trace-copy-button`, `trace-download-button`, `trace-status`, and `trace-output`.
- [ ] Wire `frontend/js/app.js` so only the existing game action path can record actions after `dispatchGameAction(...)` returns.
- [ ] Invalidate the recorder on undo, reset, and level selection changes.
- [ ] On completion, export trace JSON, attempt clipboard copy, and keep visible/selectable fallback JSON plus Copy and Download controls.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

Expected after implementation: physics, engine, trace recorder, solver, and any already-covered solution tests pass until later solution coverage work resumes. If trace recorder requires backend storage, localStorage progress mutation, network, or dependency work, stop for a Change Request.

### Task 4G: Trace analyzer fixtures and CLI mode

**Files:**

- Create or update `tests/fixtures/manual_traces/level_17_trace.json`
- Modify `tests/fixtures/level_solver_expectations.json`
- Modify `tests/js/solver.test.js`
- Modify `tools/solve-levels.mjs`
- Modify `docs/status/CURRENT_STATE.md`

- [ ] Add or update tests for `replayTraceActions(...)`, `analyzeTrace(...)`, `decodeTracePhases(...)`, `detectRegionTransfers(...)`, `detectTemporaryScaffolds(...)`, and `createTraceSolverRecommendations(...)`.
- [ ] Add tests for invalid trace shape, invalid action names, level ID mismatch, `completed !== true`, `invalidated === true`, and replay failure. Expected output is `FAILED_PREFLIGHT`, `reason === "TRACE_REPLAY_INVALID"` when replay fails.
- [ ] Add tests that `analyze-trace` output is compact and does not include raw search trees, large rejected-state lists, raw state keys, or per-action replay logs.
- [ ] Add tests that every `solverFacingRecommendations[]` item includes all required recommendation fields.
- [ ] Add tests that recommendations are strategic/order-agnostic and name region transfers, readiness checks, scaffold dependencies, recovery requirements, or final-build readiness instead of raw move-order scripts.
- [ ] Add tests that validity mode rejects `--trace` with `TRACE_INPUT_NOT_ALLOWED`.
- [ ] Create `tests/fixtures/manual_traces/level_17_trace.json` only from a replay-valid recorder export. If no level 17 manual trace is available, stop at the A2 trace-capture checkpoint after Task 4F and update `docs/status/CURRENT_STATE.md`.
- [ ] Implement `--mode analyze-trace` parsing and require `--trace` only for that mode.
- [ ] Implement trace replay through `createInitialState(...)` and `dispatchGameAction(...)`.
- [ ] Implement phase decoding with the fixed phase vocabulary.
- [ ] Implement region transfer detection by comparing pickup and placement regions.
- [ ] Implement temporary scaffold and recovery detection from replay state deltas.
- [ ] Implement final scaffold build-order clues as planner-scoring evidence, not mandatory scripts.
- [ ] Implement solver-facing recommendations with `missingPlannerCapability`, `proposedGenericOperatorOrInvariant`, `replacedBadBehavior`, and `regressionTestExpectation`.
- [ ] Run:

```bash
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
node tests/js/run-tests.mjs
```

Expected output: analyze-trace returns `ANALYZED`, `traceReplay.valid=true`, `traceReplay.completed=true`, strategic phase/recommendation fields, and no raw chronological move-order script in recommendations.

### Task 4H: Region-logistics solver reset and level 17 benchmark

**Files:**

- Modify `tests/fixtures/level_solver_expectations.json`
- Modify `tests/js/solver.test.js`
- Modify `tools/solve-levels.mjs`
- Modify `docs/status/CURRENT_STATE.md`
- Modify `docs/handoff/` only if the solver stops before solution evidence and the next agent needs restart context.

- [ ] Add tests for `buildRegionGraph(...)` that identify lower-yard, intermediate work-platform, and final goal-side work regions on levels 16 and 17.
- [ ] Add tests for `classifyRegionStockpiles(...)` that count blocks per region and classify blocks as `free`, `covered`, `supporting`, `staged`, `temporary`, `committed`, `recoverable`, or `stranded`.
- [ ] Add tests for `checkFinalBuildReadiness(...)` that fail when the final target region lacks enough staged blocks and pass only when final approach, final scaffold, temporary access, recovery, and staged-block requirements are satisfied.
- [ ] Add tests for `planRegionTransfers(...)` that produce deterministic goals such as staging lower-yard blocks into the upper worksite before final climb.
- [ ] Add a regression test naming the replaced bad behavior from CR-0011: the solver climbs/builds final structure before staging enough blocks, strands lower-yard stockpiles, and returns `SEARCH_BUDGET_UNPROVEN`.
- [ ] Assert the regression test now solves or reaches a different, more specific planner outcome without reading trace exports.
- [ ] Implement `buildRegionGraph(...)`, `classifyRegionStockpiles(...)`, `checkFinalBuildReadiness(...)`, and `planRegionTransfers(...)`.
- [ ] Implement `solveEndgameLogisticsLevel(...)` so it derives final goal/scaffold requirements first, works backward to stockpile/staging/transfer/recovery readiness, then certifies forward through raw engine replay.
- [ ] Integrate endgame logistics into `solveLevel(...)` without removing the existing CR-0010 canonical state-space, construction-ledger, tactical replay, reporting, and analyzer scaffolding.
- [ ] Preserve `SOLVED` results for levels 10, 13, 14, and 16.
- [ ] Require level 17 to return `SOLVED` with replayable raw actions in validity mode without `--trace`.
- [ ] Require levels 18-20 to return either `SOLVED` or a precise planner-gap diagnostic with accepted failure category and concrete recommendations.
- [ ] Run:

```bash
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 19 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 20 --max-states 2000000
node tests/js/run-tests.mjs
```

Expected after implementation:

- Level 16 remains `SOLVED` with replayable raw actions.
- Level 17 returns `SOLVED` with replayable raw actions without trace input.
- Levels 18-20 either return `SOLVED` or compact planner-gap diagnostics naming missing region-logistics capabilities.
- Solver output remains deterministic across repeated runs.
- Validity mode does not accept or read manual trace fixtures.

### Task 5: Solution evidence harness

**Files:**

- Create or update `tests/fixtures/level_solutions.json`
- Create or update `tests/js/level-solutions.test.js`
- Modify `tests/js/run-tests.mjs`

- [ ] Create or update the fixture with version `0.1.0`, contractVersion `0.1.0`, and exactly one solution entry per level ID `1..20`.
- [ ] Add known traces for levels 2-5 from this plan.
- [ ] Author or regenerate concrete replay actions for levels 1 and 6-20 by running the existing JS engine and/or `tools/solve-levels.mjs --mode validity` locally after the stack-stability guard, level 13 revision, and CR-0007 solver are in place.
- [ ] Prefer solver-produced replayable actions for levels 10-17 after Tasks 4D and 4H. Manual traces may be used as replay evidence only after trace replay validation and must not be used by validity mode.
- [ ] Treat any pre-CR-0006 solution-search output as candidate evidence only; every final fixture action sequence must replay through the updated engine.
- [ ] Create or update `tests/js/level-solutions.test.js` using the JS solution test contract above.
- [ ] Update `tests/js/run-tests.mjs` to run physics, engine, trace recorder, solver, and level solution suites.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

Expected output:

```text
ok physics
ok engine
ok trace recorder
ok solver
ok level solutions
All JS tests passed
```

If any candidate level cannot be completed without invalid actions or mechanics changes, or solver output recommends geometry changes before a replayable solution exists, stop and create a Spec-mode Change Request. Do not replace candidate geometry during implementation.

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
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
node tests/js/run-tests.mjs
```

- [ ] Update `docs/status/CURRENT_STATE.md` to record:
  - `SPEC-0004` accepted;
  - `PLAN-0004` active/implemented status;
  - canonical level count is 20 after implementation;
  - CR-0006 stack-stability and resource validation are implemented after implementation;
  - CR-0007 solver/analyzer status and representative solver output after implementation;
  - current canonical level 13 final solver status and required diagnostics if unsolved;
  - current canonical levels 16 and 17 final solver status after CR-0011;
  - whether levels 18-20 are solved or emit planner-gap diagnostics;
  - trace recorder/analyzer status and the level 17 manual trace fixture source;
  - repeated-bad-plan pruning evidence;
  - resource analysis fixture exists after implementation;
  - solver expectations fixture exists after implementation;
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
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
python3 -m json.tool tests/fixtures/manual_traces/level_17_trace.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 19 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 20 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

Expected pass evidence:

- `tools/validate_levels.py` prints `Validated 20 levels from backend/app/data/levels.json`.
- Candidate source validation prints `Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json`.
- Resource validation prints `Validated resources for 15 levels from tests/fixtures/level_resource_requirements.json`.
- Solver validity for level 1 reports `SOLVED` under 500 states and under 1 second locally.
- Solver validity for current canonical levels 10, 13, and 14 reports `SOLVED` with macro plan steps and flattened replayable raw action lists.
- Solver validity for current canonical level 16 remains `SOLVED` with replayable raw actions.
- Solver validity for current canonical level 17 reports `SOLVED` with replayable raw actions without trace input.
- Solver validity for levels 18-20 either reports `SOLVED` or compact planner-gap diagnostics naming missing region-logistics capabilities.
- Default current canonical level 13 output is compact and omits debug-only search trees, state keys, tactical replay logs, candidate scoring tables, and full macro traces.
- `--debug-trace` current canonical level 13 output includes macro-plan steps, rejected macro steps when present, tactical replay failures when present, failure signatures when present, pruned-equivalent counts, candidate scaffold scoring, and raw state keys.
- Repeated-bad-plan solver fixture reports `prunedSimilarFailures > 0`.
- Solver validity/analyzer tests pass with deterministic diagnostics and actionable recommendations.
- Trace recorder tests pass, and analyze-trace for level 17 reports `ANALYZED`, `traceReplay.valid=true`, strategic phase evidence, and order-agnostic solver-facing recommendations.
- Backend tests pass.
- JS tests print `ok physics`, `ok engine`, `ok trace recorder`, `ok solver`, `ok level solutions`, and `All JS tests passed`.
- `git diff --check` reports no whitespace errors.

## Validation

Required automated validation for implementation completion:

```bash
git status --short
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
python3 -m json.tool tests/fixtures/manual_traces/level_17_trace.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 19 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 20 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
node tests/js/run-tests.mjs
git diff --check
```

Required manual smoke check before final implementation summary:

```bash
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
# visit http://127.0.0.1:8000/
```

Manual smoke check covers level selector and board layout for levels 1, 6, 14, 18, and 20.
Manual trace smoke check covers pressing Record on level 17, playing to completion, auto-stop, clipboard attempt, visible/selectable fallback JSON, and no trace persistence beyond the tester-controlled export.

## Approval gates

- A2 prerequisite gate: first-playable UX/product checkpoint for levels 1-5 must be accepted before implementation edits begin.
- A2 trace-capture checkpoint: after Task 4F, if `tests/fixtures/manual_traces/level_17_trace.json` does not already exist as a replay-valid recorder export, stop so the project owner can record level 17 through the local UI and provide the exported JSON for Task 4G analyzer tests.
- A2 completion gate: after automated checks pass, the project owner reviews expanded levels 6-20 for difficulty curve, scaffold feel, visual legibility, and product fit.
- A3 stop gate: any dependency install/addition, lockfile, network access, generator, solver dependency, CI/deployment change, or frontend framework/build tool requires explicit separate approval and is not part of this plan.
- Spec stop gate: solver output that requires geometry redesign must be handled through a Change Request before editing level data.

## Documentation updates

- `docs/repo-map.md`: update level count, commands, and SPEC/PLAN-0004 status after implementation.
- `docs/status/CURRENT_STATE.md`: update active objective, active contract, current checks, remaining A2 gate, files changed, and next action.

## Rollback plan

- Revert `backend/app/data/levels.json` to the 5-level version.
- Revert the CR-0006 level 13 row update in `docs/intake/candidate_levels_6_20.json` if implementation needs to abandon the accepted resource revision.
- Revert the stack-stability pickup guard in `frontend/js/engine.js` and remove the corresponding assertions from `tests/js/engine.test.js`.
- Revert `backend/app/services/level_service.py`, `tools/validate_levels.py`, and backend tests to 5-level validation expectations.
- Remove `tests/fixtures/level_resource_requirements.json` and resource-analysis tests.
- Remove `tools/solve-levels.mjs`, `tests/js/solver.test.js`, and `tests/fixtures/level_solver_expectations.json`.
- Remove `frontend/js/trace-recorder.js`, `tests/js/trace-recorder.test.js`, and `tests/fixtures/manual_traces/level_17_trace.json`; revert trace recorder wiring in `frontend/js/app.js`, `frontend/js/ui.js`, `frontend/index.html`, and `frontend/style.css`.
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
- Risk: stack-stability invalidates previously found solution traces.
  - Mitigation: regenerate and replay every level solution after implementing the pickup guard.
- Risk: deterministic resource analysis is only a lower-bound diagnostic and can pass a still-unsolvable level.
  - Mitigation: keep JS replay mandatory and stop if any level cannot be completed through the engine.
- Risk: resource fixture rows encode author intent and may drift from later level geometry.
  - Mitigation: resource validation checks row bounds and ID coverage; future geometry changes require updating the fixture in the same accepted scope.
- Risk: solver search can wander through legal but unproductive actions.
  - Mitigation: add preflight lower bounds, goal-directed planning, priority search, canonical state-key deduplication, no-progress penalties, and level 1 performance gates.
- Risk: solver search can retry similar failed plan shapes that strand the same resources.
  - Mitigation: add `createFailureSignature(...)`, `isFailureDominated(...)`, repeated-bad-plan fixture coverage, and `prunedSimilarFailures` evidence.
- Risk: current canonical level 13 returns any final non-solved status after CR-0009.
  - Mitigation: treat final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` as `LEVEL_SOLVER_LEVEL13_UNPROVEN` because the owner has manually completed the level; stop for solver-plan revision or a solver-focused Change Request before any level geometry decision.
- Risk: solver passes level 13 through assumptions that do not generalize.
  - Mitigation: CR-0010 requires the same engine-backed canonical state-space solver, construction ledger, and replay proof to solve levels 10 and 14, with no per-level hardcoded action lists or board mutations.
- Risk: solver equality accidentally depends on engine-internal block IDs.
  - Mitigation: canonical state fixtures prove block identity permutations collapse to one state key while player position, facing, carried presence, level status, and sorted block positions remain distinct.
- Risk: construction-ledger planning consumes reserved or temporary blocks in ways a human would later need.
  - Mitigation: ledger fixtures cover early reserved-block consumption, unrecoverable temporary cells, disturbed committed cells, and dominated ledgers.
- Risk: solver recommendations are treated as automatic design changes.
  - Mitigation: solver/analyzer output is advisory; level geometry changes still require accepted Change Requests.
- Risk: layered solver output becomes too verbose for level-design use.
  - Mitigation: default output is compact and capped at three recommendations; detailed macro, tactical replay, state-key, scoring, and pruning evidence is emitted only with `--debug-trace`.
- Risk: macro reasoning bypasses engine physics.
  - Mitigation: every macro must decompose into raw `dispatchGameAction(...)` replay before it can commit state, and tests cover floating placements, supporting-block pickup, promised-state mismatch, and tactical replay failure.
- Risk: trace capture becomes a hidden shortcut for the solver.
  - Mitigation: validity mode rejects `--trace`, tests prove level 17 solves without reading trace fixtures, and trace-derived changes must become generic operators, invariants, or scoring rules.
- Risk: trace analyzer recommendations imitate chronological human moves instead of improving planning.
  - Mitigation: analyzer tests require strategic/order-agnostic recommendations that name region transfers, readiness checks, scaffold dependencies, recovery requirements, or final-build readiness.
- Risk: region-logistics planning solves level 17 but narrows future design feedback.
  - Mitigation: levels 18-20 must either solve or emit precise planner-gap diagnostics with concrete solver-improvement or future-level design levers.
- Risk: manual trace capture is useful only if the JSON is easy to extract.
  - Mitigation: completion auto-stops recording, attempts clipboard copy, and always leaves visible/selectable JSON plus Copy and Download controls.
- Risk: manual trace fixture can drift from current level data.
  - Mitigation: `analyze-trace` replays the committed fixture through `createInitialState(...)` and `dispatchGameAction(...)`; invalid replay fails before analysis.

## Stop conditions

- First-playable A2 checkpoint is not explicitly accepted before implementation.
- `docs/intake/candidate_levels_6_20.json` is missing, malformed, or differs from SPEC-0004's candidate table.
- Levels 1-5 need edits without an accepted Change Request.
- Level 13 cannot be made resource-valid with the exact CR-0008 row update.
- Any level 6-20 reports `LEVEL_RESOURCE_DEFICIT` after resource fixture and level data updates.
- Any level 6-20 cannot be completed by a concrete action sequence through the existing engine.
- Solver level 1 validity cannot meet the under-500-state and under-1-second gate.
- Solver output is nondeterministic for identical inputs and options.
- Current canonical level 13 returns final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` instead of `SOLVED` with replayable macro-derived raw actions.
- Current canonical level 10 or 14 returns final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` instead of `SOLVED` with replayable macro-derived raw actions.
- Current canonical level 16 regresses from `SOLVED`.
- Current canonical level 17 returns anything other than `SOLVED` with replayable raw actions from validity mode without trace input.
- Current canonical levels 18-20 return non-solved output without precise planner-gap diagnostics and concrete solver-improvement or future-level design levers.
- Manual trace capture cannot produce replay-valid JSON for a completed level without dependency, network, backend API, or persistent storage changes.
- No replay-valid level 17 trace fixture is available after Task 4F; stop at the A2 trace-capture checkpoint instead of inventing a trace.
- Trace capture treats undo, reset, level changes, or invalid actions as valid solution evidence.
- Trace analyzer recommendations are chronological move scripts rather than strategic region transfers, readiness checks, scaffold dependencies, recovery requirements, or final-build readiness.
- Validity mode accepts `--trace`, reads manual trace fixture directories, uses per-level trace shortcuts, or requires a trace file to solve level 17.
- A trace-motivated solver behavior change lacks a regression test naming the replaced bad behavior and proving the solver no longer repeats it without trace input.
- Solver state equivalence depends on engine-internal block IDs, omits level ID/status/player/facing/carry/block positions, or enqueues invalid engine actions as new states.
- Construction ledger omits `finalScaffoldCells`, `stagingCells`, `reservedBlocks`, `temporaryCells`, `committedCells`, `workPlatforms`, `requiredCarryUpBlocks`, or `riskFlags`.
- Region-logistics planning omits final-build readiness, target-region staged-block counts, transfer goals, temporary-access recovery checks, or forward engine replay certification.
- Construction ledger consumes a reserved block early, marks an unrecoverable temporary cell recoverable, disturbs a committed cell without replay proof, or fails to prune a dominated ledger.
- Default solver output for any non-solved result omits `phase`, `failedInvariant`, `failureCategory`, `cause`, capped `topRecommendations`, or required `summary` metrics.
- Default solver output includes debug-only large rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, or full macro traces.
- `--debug-trace` output omits macro-plan steps, rejected macro steps, failed tactical replay evidence when present, failure signatures when present, pruned-equivalent counts, candidate scoring, or raw state keys.
- A macro is accepted without legal raw engine replay or violates support, reachability, block conservation, supporting-block pickup, placement, trap-risk, or promised-state invariants.
- Solver repeats an equivalent or dominated failed candidate plan without pruning it.
- Repeated-bad-plan fixture does not report `prunedSimilarFailures > 0`.
- Solver implementation requires a dependency, network access, reimplemented gameplay physics, or runtime/browser solver behavior.
- Solver/analyzer recommends geometry changes before a replayable solution exists.
- Implementation requires new mechanics beyond CR-0006 stack-stability, new tile symbols, changed action names, changed API route shapes, or backend-owned gameplay simulation.
- Implementation requires reading `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide behavior.
- Implementation requires dependency/network/lockfile/CI/deployment/framework/generator/solver-dependency work.
- Manual smoke check shows large boards cannot be made usable within the existing vanilla DOM/CSS approach.
