# SPEC-0004: Level Expansion Pipeline

Status: Accepted
Approval Class: A2
Maturity: M2
Owner: Unassigned
Created: 2026-06-11
Updated: 2026-06-12
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: `docs/change-requests/CR-0004-level-1-support-geometry-fix.md`, `docs/change-requests/CR-0005-solution-evidence-capture.md`, `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md`, `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md`, `docs/change-requests/CR-0009-physics-certified-macro-solver.md`, `docs/change-requests/CR-0010-construction-ledger-solver-remediation.md`, `docs/change-requests/CR-0011-trace-informed-endgame-solver-reset.md`

## Context

- Source docs: `docs/project-charter.md`, `docs/roadmap.md`, `docs/glossary.md`, `docs/repo-map.md`, `docs/status/CURRENT_STATE.md`, `docs/adr/ADR-0000-architecture-direction.md`, `SPEC-0002`, `SPEC-0003`, `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md`, `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md`, `docs/change-requests/CR-0009-physics-certified-macro-solver.md`, `docs/change-requests/CR-0010-construction-ledger-solver-remediation.md`, `docs/change-requests/CR-0011-trace-informed-endgame-solver-reset.md`, and `docs/intake/candidate_levels_6_20.json`.
- Current evidence: commit `96545e9` contains the first playable UI, backend level APIs, first-five level data, CR-0002, and CR-0003 level redesign. The repo is on branch `codex/application-scaffold`.
- Current evidence from `docs/status/CURRENT_STATE.md`: PLAN-0004 implementation has partial local worktree changes expanding canonical level data to levels 1-20, adding candidate/resource validation, and adding partial solution replay coverage for levels 1-15.
- Current evidence: `tests/js/run-tests.mjs` exercises engine and physics behavior with no frontend dependencies; it currently fails solution coverage because levels 16-20 are not yet represented in `tests/fixtures/level_solutions.json`.
- Current evidence: `docs/intake/candidate_levels_6_20.json` contains candidate definitions for IDs 6-20, with variable board sizes from 16x9 through 34x17 and block counts from 4 through 17. These candidates are intake source material for this spec, not accepted production data and not a runtime input.
- Current gate: the first playable A2 human UX/product checkpoint was accepted by the project owner on 2026-06-11. `PLAN-0004` implementation has started and is currently stopped at automated solution evidence/tooling for levels 16-20, not at manual solvability.
- Current evidence from manual playtesting under CR-0006: stacked lower blocks must not be pickup-eligible while another block rests directly on top of them; pre-CR-0008 level 13 needed more available blocks; and levels 6-20 need deterministic available-versus-needed block reporting before solution capture.
- Current evidence from CR-0007 planning: deterministic resource rows are too weak by themselves because reusable temporary scaffolds and order-sensitive stockpile access affect solvability. PLAN-0004 needs no-dependency solver tooling that can fail hard preflight cases quickly, prove at least one valid completion through accepted mechanics, and produce actionable design recommendations.
- Current evidence from CR-0008: level 13 has been revised by adding exactly three supported, reachable lower-yard blocks while preserving the Double Bench structure. The current row 12 is `#PBBBBBB.B.B.B.B.B.B.B..#`, yielding `availableBlocks = 15`, `requiredBlocks = 12`, and `surplusBlocks = 3` for the resource manifest gate.
- Current evidence from project-owner playtesting: all current levels 1-20 are confirmed solvable by manual play under the accepted mechanics. Current level 13 was completed in roughly 230 moves and is a representative construction-heavy benchmark. Current implementation work now solves level 13 with replayable raw actions, so remaining solver failures are tool capability gaps, not current-level solvability questions.
- Current evidence from CR-0010: the solver must be treated as deterministic board-state transformation, not ordinary pathfinding. It must use the existing engine transition contract as the reusable base, canonicalize interchangeable block positions, use a construction ledger for subgoal planning, and prove more than level 13 so the tool is useful for future level design.
- Current evidence from CR-0011: current solver work solves levels 10, 13, 14, and 16, and has copied solver-produced replay actions for levels 11-15, but levels 17-20 remain `UNPROVEN_WITHIN_LIMIT`. The accepted reset requires dev-facing manual trace capture, replay validation, strategic trace macro analysis, trace-to-solver feedback recommendations, anti-overfit rules, region-logistics planning, and level 17 as the first endgame solver benchmark.
- Why this slice next: the roadmap names level expansion as the next candidate after first-five validation, and the project charter preserves a path toward a 100-level target after the first five are playable.

## Problem

The project needs a controlled way to expand from five tutorial/prototype levels to the first 20 levels without weakening validator guarantees, inventing mechanics, or leaving the next plan to guess level data. The new levels must become real construction puzzles: later levels should require substantial player-built scaffolds, not merely larger versions of the first-five tutorial path.

CR-0006 adds one required correction before this slice can continue: block pickup must obey stack stability, and level resources must be reported deterministically so under-resourced puzzles are caught before manual solution capture.

CR-0007 adds a second required correction before automated solution evidence and future-level design tooling continue: the project needs deterministic no-dependency solver tooling that models the actual construction problem, including reusable temporary scaffolds, order-sensitive block access, and true irreversible dead ends. The tooling must not become runtime game behavior, but it must be strong enough to reproduce known-solvable construction levels and guide future level redesign.

CR-0008 resolves the hard level 13 block deficit by adding three supported reachable blocks. CR-0009 then shifts the remaining work from level design to solver design: current levels are manually confirmed solvable, so PLAN-0004 needs a physics-certified macro construction solver that can reproduce known-solvable construction examples and provide actionable validation/design feedback for future levels.

CR-0010 corrects the remaining solver strategy: the tool must not solve only by pathfinding from player to goal, and it must not prove only level 13 with one-off assumptions. It must use the existing game engine as the authoritative transition system, search canonical whole-board states, plan construction with a ledger, and pass a small representative benchmark set that includes level 13 plus additional current construction levels.

CR-0011 corrects the endgame solver gap: levels 17-20 require logistics behavior that is broader than local scaffold construction, including region-to-region stockpile transfer, staging before final construction, temporary scaffold recovery, and backward planning from goal requirements. Manual traces may provide replay-certified evidence and solver-facing gap analysis, but they must not become hidden solver inputs or chronological action scripts.

## Goals

- Expand the canonical local level set from levels 1-5 to levels 1-20 using the candidate source defined by this spec.
- Preserve levels 1-5 unless the A2 first-playable review opens an accepted Change Request.
- Allow variable board dimensions for levels 6-20 so scaffold-building puzzles are not constrained to the first-five 8x6 tutorial size.
- Make later levels construction-first: the intended difficulty comes from staging, carrying, placing, climbing, retrieving, and reusing blocks to build a larger structure.
- Define durable solution evidence for every canonical level.
- Validate that level data does not visually depend on immediate initial gravity correction: raw `P` and `B` cells must start supported.
- Enforce stack-stability physics: a block that directly supports another block cannot be picked up.
- Report available blocks versus deterministic minimum scaffold blocks for every level 6-20.
- Revise level 13 so it has enough blocks for the accepted construction goal.
- Allow surplus blocks when a valid replayed solution does not use every block.
- Add deterministic preflight checks that fail mathematically under-resourced levels before state search.
- Add a goal-directed planner that derives goal approach cells, scaffold candidates, stockpile regions, and ordered subgoals before validity search.
- Add a no-dependency validity solver that uses the real JavaScript engine to produce reproducible solution evidence for known-solvable levels and to test future level candidates.
- Add design-analysis metrics that report difficulty signals such as true irreversible dead ends, near-goal failures, order sensitivity, block reuse, and resource stranding.
- Add actionable redesign recommendations that translate solver/analyzer evidence into concrete level-editing levers.
- Add behavior and performance gates so simple levels solve quickly and the solver cannot pass as an unguided brute-force walker.
- Use current canonical level 13, after the CR-0008 15-block revision, as the first required known-solvable benchmark that must return `SOLVED` with a replayable raw action list, compact default reporting, and debug-trace construction-ledger diagnostics.
- Add current canonical levels 10 and 14 as additional required solver generalization benchmarks. These levels represent stockpile/staging and vertical scaffold construction beyond level 13.
- Preserve current canonical level 16 as a solved construction-ledger benchmark after CR-0011 changes.
- Add current canonical level 17 as the first required endgame logistics benchmark. Level 17 must return `SOLVED` with replayable raw actions without reading manual trace exports.
- Replace raw-action-first level 13 search with an engine-backed canonical state-space solver guided by a construction ledger. The solver must reason in scaffold-building goals while committing only engine-replayed legal actions.
- Canonicalize solver states from the whole board: player row/col, facing, carried-block state, sorted uncarried block positions, and level status. Blocks are interchangeable for solver state keys.
- Prevent duplicate and substantially equivalent failed solver attempts from being retried without new progress evidence.
- Add dev-facing trace capture that lets a project owner press Record, manually solve a level, and receive replay-valid trace JSON when the level completes.
- Add strategic trace macro analysis that decodes replay-valid human traces into solver-facing planner gaps without requiring the solver to imitate human move order.
- Add trace-to-solver feedback recommendations that identify bad solver behavior, the generic solver operator/invariant/scoring rule needed to replace it, and the regression test evidence required before accepting the change.
- Add region-logistics planning so the solver reasons backward from goal/scaffold requirements to stockpile, staging, transfer, temporary-access, recovery, and final-build readiness needs before certifying a forward engine-action replay.
- Preserve replay-inspection and design-analysis output so solved levels can still reveal unintended shortcuts, ignored stockpiles, suspiciously short completions, or weaker-than-intended scaffold use.
- Keep the level expansion path dependency-light and compatible with the existing FastAPI and vanilla JavaScript architecture.
- Keep API route shapes and frontend gameplay mechanics unchanged.
- Create acceptance gates that prove level data validity, API compatibility, engine-level solvability, and human product review for the expanded level set.

## Non-goals

- Levels 21-100.
- Procedural generation, AI-assisted generation, production/runtime solver behavior, solver packages or dependencies, formal SAT/pathfinding dependencies, or new production dependencies.
- New tiles, hazards, enemies, keys, doors, switches, timers, moving platforms, pushing blocks, multiple goals, multiple players, or continuous physics.
- Frontend art direction, sound, music, analytics, accounts, cloud saves, deployment, hosting, or HTTPS.
- Backend-owned gameplay simulation beyond validation and level serving.
- Reworking accepted first-playable mechanics beyond the CR-0006 stack-stability pickup rule.
- Using `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts as routine implementation inputs.
- Serving `docs/intake/candidate_levels_6_20.json` directly at runtime.
- A production/runtime solver, exhaustive formal proof, dependency-backed pathfinding engine, PDDL planner, or external solver package. CR-0007, CR-0009, CR-0010, and CR-0011 permit local no-dependency solver/analyzer tooling for planning, validity evidence, trace diagnostics, construction-ledger diagnostics, and design recommendations; JS replay remains the completion proof.
- Solver validity that reads manual trace exports as solution hints.
- Per-level raw action scripts, board mutations, trace-specific shortcuts, or chronological human move-order imitation inside `tools/solve-levels.mjs`.

## Users / actors

- Local player: plays and completes the expanded level list in the browser.
- Level author: adds and revises level definitions and solution evidence.
- Frontend app: loads metadata and selected level details through existing API routes.
- Backend API: validates and serves the expanded level data.
- Local solver/analyzer tooling: validates future level candidates, reproduces known-solvable benchmark levels, reports design metrics, and proposes redesign recommendations without mutating level data.
- Manual trace recorder: local dev-facing browser affordance that captures a project-owner playthrough as replay evidence and diagnostic source material.
- Agent/developer: runs validation, API tests, JS tests, and solution evidence checks.
- Project owner: reviews difficulty curve, clarity, and product feel before accepting the expanded level batch.

## Behavioral contract

- User-visible behavior: the level selector exposes levels 1-20, each level can be loaded, and each level can be completed with the existing movement, jump, interact, gravity, reset, undo, and progress behavior.
- User-visible level shape: levels 6-20 may be larger than the first-five tutorial boards. The browser UI must render each board from its declared `width` and `height` without clipping controls, hiding the completion modal, or requiring a new route.
- Difficulty behavior: levels 6-9 introduce larger multi-block staging; levels 10-13 introduce split stockpiles/workbenches; levels 14-16 require larger vertical construction; levels 17-20 are endgame construction yards with many blocks and non-obvious scaffold planning.
- Stack-stability behavior: when the player faces a block, `interact` can pick it up only if no uncarried block occupies the cell directly above that block. Attempting to pick up a supporting block is an invalid action and must not mutate state.
- Resource behavior: level tooling reports available blocks, deterministic required blocks, and surplus or deficit for every level 6-20. A deficit blocks acceptance; surplus is allowed when solution replay and human review pass.
- Solver behavior: local tooling searches deterministic whole-board states, not player-to-goal pathfinding alone. It must use `createInitialState(...)` and `dispatchGameAction(...)` rather than reimplementing divergent gameplay rules.
- Canonical state behavior: after every legal raw action, solver state keys normalize the engine-returned gravity-settled state by player row/col, facing, carried-block presence, sorted uncarried block positions, and level status. Block IDs from the engine are not part of solver equivalence because blocks are interchangeable for search.
- Construction-ledger behavior: local tooling may propose scaffold targets, staging cells, work platforms, recoverable temporary blocks, reserved stockpile capacity, and final approach structures. A ledger or macro may guide search, but accepted state changes can only come from raw action replay through `dispatchGameAction(...)`.
- Region-logistics behavior: local tooling must reason about platform/yard regions, stockpiles per region, block transfers, temporary access scaffolds, recoverability, and final-build readiness. The solver must plan from goal/scaffold requirements backward to resource and staging needs, then certify the resulting plan forward through engine actions.
- Solver output behavior: solver/analyzer commands print human-copyable solution candidates, diagnostics, metrics, and recommendations; they must not auto-write `backend/app/data/levels.json`, `docs/intake/candidate_levels_6_20.json`, or `tests/fixtures/level_solutions.json`.
- Level 13 diagnostic behavior: when run against current canonical level 13 after the accepted CR-0008 15-block revision, solver validity must return `SOLVED` with a replayable raw action list. `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, `UNSOLVABLE_EXHAUSTED`, and raw-search-only failure are not acceptable solver acceptance evidence because all current levels are manually confirmed solvable and the tool must work on known-solvable construction puzzles before it is trusted for future levels.
- Additional benchmark behavior: solver validity for current canonical levels 10 and 14 must also return `SOLVED` with replayable raw actions. These levels prove the solver architecture generalizes beyond the first Level 13 gate.
- Endgame benchmark behavior: solver validity for current canonical level 16 must remain `SOLVED`, and current canonical level 17 must return `SOLVED` with replayable raw actions without reading manual trace exports. Levels 18-20 may return `SOLVED` or precise planner-gap diagnostics until a later accepted plan or Change Request makes them blocking.
- Trace capture behavior: a dev-facing recorder lets a tester start recording, play normally, and auto-stop when `state.status === "completed"`. The trace captures only valid forward gameplay actions. `undo`, `reset`, or level change invalidates and stops recording. On completion, the UI attempts clipboard copy and provides visible selectable JSON plus Copy/Download fallback when clipboard copy fails.
- Trace analyzer behavior: trace analysis first replays exported actions through `createInitialState(...)` and `dispatchGameAction(...)`. Only replay-valid traces may produce solver-facing recommendations.
- Trace-to-solver behavior: trace-derived recommendations are strategic and order-agnostic. They may use chronological actions to prove legality and identify phases, but solver-facing output must describe resource transfers, region readiness checks, scaffold dependencies, recovery requirements, missing planner capability, and a proposed generic operator/invariant/scoring rule. The default validity solver must not consume trace exports during solver runs.
- Design-analysis behavior: true irreversible dead ends are valid puzzle-design signals, not automatic defects. Analyzer recommendations are advisory and require normal Change Request/spec/plan control before geometry changes are applied.
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
  - `tests/js/solver.test.js`
  - `tests/js/trace-recorder.test.js`
  - `tests/fixtures/level_solutions.json`
  - `tests/fixtures/level_resource_requirements.json`
  - `tests/fixtures/level_solver_expectations.json`
  - `tests/fixtures/manual_traces/*.json` when trace fixtures are needed for replay/analyzer tests
  - `tools/solve-levels.mjs`
  - `frontend/js/trace-recorder.js` or an equivalent focused frontend trace recorder module
  - `frontend/js/app.js`
  - `frontend/js/ui.js`
  - `frontend/index.html`
  - `frontend/style.css`
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
- Resource-analysis fixtures are test/tool inputs only. They must not be surfaced in API level responses.
- Solver/analyzer outputs are test/tool outputs only. They must not be surfaced in API level responses or browser runtime state.
- Manual trace exports are local development evidence only. They must not be served through backend API level responses, loaded by default solver validity runs, or stored automatically in browser progress data.

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
- Levels 1-5 remain exactly as committed in the first playable baseline except for the accepted CR-0004 level 1 raw-geometry fix.
- Levels 6-20 are sourced from `docs/intake/candidate_levels_6_20.json` and must use the exact IDs, slugs, titles, dimensions, difficulties, and grids from that source except for accepted CR-0006 and CR-0008 level 13 revisions.
- Levels 6-20 may use variable board sizes. The candidate source currently defines widths 16-34 and heights 9-17.
- Every grid has exactly `height` rows, and every row has exactly `width` characters.
- Boundary rows and columns are all `#`.
- Legal symbols remain exactly `.`, `#`, `P`, `B`, and `G`.
- Every level has exactly one `P`, exactly one `G`, and at least one `B`.
- Every raw `P` and `B` cell must be directly supported by `#` or `B` in the row below before initial engine gravity runs. This prevents the visual source grid from disagreeing with the settled initial state.
- Level 13 was revised by CR-0006 from 10 movable blocks to 12 movable blocks, then by CR-0008 from 12 movable blocks to 15 movable blocks. Current level 13 row 12 is exactly `#PBBBBBB.B.B.B.B.B.B.B..#`; all other level 13 rows remain unchanged unless resource or replay evidence requires a later accepted Change Request.
- Levels 6-20 may contain surplus blocks. A solution is valid even if it does not use every block.
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
| 13 | `level-13` | Double Bench | 25x14 | 13 | 15 |
| 14 | `level-14` | Ten Block Pyramid | 26x14 | 14 | 10 |
| 15 | `level-15` | Crater Logistics | 28x14 | 15 | 11 |
| 16 | `level-16` | Raised Worksite | 30x15 | 16 | 10 |
| 17 | `level-17` | Split Hoist Yard | 31x16 | 17 | 11 |
| 18 | `level-18` | Lower Yard Cache | 32x17 | 18 | 17 |
| 19 | `level-19` | Two-Level Tower Yard | 32x16 | 19 | 13 |
| 20 | `level-20` | Final Scaffold Yard | 34x17 | 20 | 15 |

If any candidate level cannot be made solver-verifiable with the accepted mechanics, implementation must stop and return to Spec mode rather than inventing replacement level content during planning or implementation.

### Resource Analysis Contract

`tests/fixtures/level_resource_requirements.json` defines deterministic scaffold-resource math for levels 6-20. It has this shape:

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

- Exactly one resource entry exists for each level ID `6` through `20`.
- `fromRow` and `toRow` are zero-based grid rows in the canonical level.
- `rise = max(0, fromRow - toRow)`.
- `requiredBlocksForSegment = rise * (rise + 1) / 2`.
- `requiredBlocks = sum(requiredBlocksForSegment)` for the level.
- `availableBlocks = count("B")` in the canonical level grid.
- `surplusBlocks = availableBlocks - requiredBlocks`.
- `surplusBlocks < 0` fails validation with `LEVEL_RESOURCE_DEFICIT`.
- `surplusBlocks >= 0` is a pass for the resource gate but does not prove solvability; JS replay remains mandatory.
- Level 13's accepted resource intent is two 3-row construction phases, so `requiredBlocks = 6 + 6 = 12`; after the CR-0008 revision it must have `availableBlocks = 15` and `surplusBlocks = 3`.

### Deterministic Solver and Analyzer Contract

`tools/solve-levels.mjs` is a local no-dependency Node ES module used for level validation and design analysis. It uses the existing frontend engine as the source of gameplay truth:

- Import `createInitialState(level, contract)` and `dispatchGameAction(state, action, level, contract)` from `frontend/js/engine.js`.
- Read `shared/app_contract.json` and `backend/app/data/levels.json`.
- Accept only solution-search actions `moveLeft`, `moveRight`, `jump`, and `interact`.
- Exclude `reset`, `undo`, and `selectLevel` from solver search and emitted actions.
- Never mutate level data, intake data, solution fixtures, or contracts.
- Return deterministic output for the same input level, options, and search budget.

The CLI contract is:

```bash
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --all --max-states 1000000
node tools/solve-levels.mjs --mode analyze --level 13 --max-states 2000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
```

Stable solver statuses:

| Status | Meaning |
|---|---|
| `SOLVED` | A concrete action sequence completed the level through accepted mechanics. |
| `FAILED_PREFLIGHT` | A hard deterministic lower-bound check failed before state search. |
| `UNPROVEN_WITHIN_LIMIT` | Search budget ended without a solution and without exhausting the bounded state space. |
| `UNSOLVABLE_EXHAUSTED` | The bounded state space was fully searched with no solution. |
| `ANALYZED` | Design analyzer produced metrics and recommendations for a solved or diagnostic level. |

Engine-backed canonical state-space requirements:

- The solver starts from `createInitialState(level, contract)`.
- The solver expands only `moveLeft`, `moveRight`, `jump`, and `interact` through `dispatchGameAction(state, action, level, contract)`.
- The solver treats `invalid: true` action results as non-progressing transitions that are not enqueued as new search states.
- After every legal action, the solver uses the engine-returned gravity-settled state as the next state. It must not run an independent gravity, collision, support, pickup, placement, or completion model for search equivalence.
- The canonical state key contains:
  - `levelId`;
  - `status`;
  - player row and column;
  - `facing`;
  - carried-block state as `carrying` or `not-carrying`, without a persistent block ID;
  - sorted uncarried block positions as `{ row, col }` pairs.
- Blocks are interchangeable for solver canonicalization. Two states that differ only by engine-internal block IDs but have the same player position, facing, carried state, sorted block positions, and status are the same solver state.
- The current engine is the physics authority. If `frontend/js/physics.js` treats the player's current cell as support during block gravity, solver replay inherits that behavior by using `dispatchGameAction(...)`; the solver must not freeze a contradictory local physics rule.

Construction-ledger requirements:

- The solver uses three layers:
  - An engine-backed canonical state-space layer that owns raw state transitions and deduplication.
  - A construction ledger that chooses scaffold targets, staging cells, reservations, work platforms, temporary recovery, committed cells, and risk flags.
  - A tactical movement executor that decomposes one ledger or macro step into raw `moveLeft`, `moveRight`, `jump`, and `interact` actions and verifies those actions through `dispatchGameAction(...)`.
- The construction ledger contains:
  - `finalScaffoldCells`: supported final cells needed for the goal approach, ordered by construction phase.
  - `stagingCells`: supported temporary cells used to gather or reposition blocks.
  - `reservedBlocks`: canonical block-position selectors, stockpile-region reservations, or reserved block counts held for future tasks. These reservations must not depend on stable block IDs.
  - `temporaryCells`: cells that may be built and later recovered, with recovery preconditions.
  - `committedCells`: final cells that must not be disturbed once placed.
  - `workPlatforms`: cells the player must reach to continue construction.
  - `requiredCarryUpBlocks`: blocks reserved for vertical delivery to a later work platform.
  - `riskFlags`: compact named risks such as `PLAYER_TRAP_RISK`, `NEEDED_BLOCK_COVERED`, `TEMPORARY_BLOCK_NOT_RECOVERABLE`, and `RESERVED_BLOCK_CONSUMED`.
- A ledger or partial ledger is dominated when it reaches no additional committed final cells, preserves no better reserved-block set, improves no staging or work-platform reachability, lowers no risk flag, and has no lower action cost than an already explored ledger.

Physics-certified macro construction requirements:

- A macro may propose a target state, but it must not mutate solver state directly. Only a replayed raw action list can commit a macro result.
- Tactical execution for one macro uses BFS or a BFS-equivalent deterministic state-space search bounded to the macro's preconditions, target, reachable region, and local budget.
- Required macro operators:
  - `identifySupportedScaffoldTargets`: enumerate candidate scaffold cells that are in bounds, empty, reachable by construction order, and supported by `#` or a block after replay.
  - `classifyBlocks`: classify each uncarried block as reachable, free, covered, useful, temporary, recoverable, stranded, or final-committed for the active candidate plan.
  - `collectLegalFreeBlock`: move to and pick up a reachable free block, rejecting any block with another uncarried block directly above it.
  - `placeSupportedBlock`: place the carried block at a target cell that is empty before placement and supported after gravity settles.
  - `buildStairOrScaffold`: build a stair/scaffold one supported cell at a time using repeated `collectLegalFreeBlock` and `placeSupportedBlock` macros.
  - `climbToWorkPlatform`: move the player to a platform needed to continue construction or reach a stockpile.
  - `recoverTemporaryBlock`: remove a temporary block only when it is reachable, free, and not supporting another block.
  - `completeFinalGoalApproach`: replay the final movement sequence that reaches the goal after the committed scaffold exists.
- Every macro step in solver output has:
  - `macroId`;
  - `type`;
  - `preconditions`;
  - `target`;
  - `blockSelector` when the macro acts on a specific canonical position, stockpile region, or reserved block count;
  - `startStateKey`;
  - `endStateKey` when accepted;
  - `rawActions`;
  - `status` as `accepted` or `rejected`;
  - `reason` when rejected.
- A macro is accepted only when all are true:
  - replay starts from the macro's `startStateKey`;
  - every emitted raw action returns a legal engine transition;
  - replay reaches the promised player position, carried-block state, uncarried block positions, and level status after gravity settles;
  - every block in a promised scaffold target cell is supported by `#` or another block;
  - no block is picked up while supporting another uncarried block;
  - no block appears, disappears, teleports, or lands floating above empty space.
- A rejected macro reports the failed operator, the failed precondition or replay step, and the engine action result when available.
- The final `SOLVED` proof remains the flattened raw `actions` list replayed from `createInitialState(...)` to `state.status === "completed"`.
- Level 13 macro solving must not be implemented as a one-off hardcoded solution; macro operators and ledger rules must also solve the additional required benchmark levels 10 and 14 and run on synthetic invalid-macro fixtures.

Preflight requirements:

- Run structural level validation before solver search.
- Compute hard lower bounds for final committed scaffold candidates before state search.
- For a vertical final scaffold of `rise`, compute `requiredFinalScaffoldBlocks = rise * (rise + 1) / 2`.
- Return `FAILED_PREFLIGHT` with `reason: "FINAL_SCAFFOLD_BLOCK_DEFICIT"` and `statesExpanded: 0` when every valid final committed scaffold candidate requires more blocks than the level provides.
- Include `deficitBlocks = requiredFinalScaffoldBlocks - availableBlocks` when `requiredFinalScaffoldBlocks > availableBlocks`.
- Report temporary access scaffold estimates as diagnostics when those blocks may be recoverable. Do not add recoverable temporary scaffolds to final committed scaffold blocks as a hard failure.
- Report whether block reuse is required.
- For current canonical level 13 after the CR-0008 15-block revision, preflight must run before macro search and must explicitly report the lowest non-deficient final scaffold candidate that caused macro solving to continue.

### Level 13 Diagnostic Boundary

Current canonical level 13 means `levelId === 13` after the accepted CR-0008 revision that sets row 12 to `#PBBBBBB.B.B.B.B.B.B.B..#`, with `availableBlocks === 15`, `requiredBlocks === 12` in the resource manifest, and `requiredFinalScaffoldBlocks === 15` in solver preflight.

The project owner has confirmed all current levels 1-20 are solvable. Current level 13 was manually completed in roughly 230 moves, so it is the benchmark for whether the solver can handle known-solvable, construction-heavy puzzles. Level 13 solver failure means the tool is incomplete; it does not mean the current level is invalid unless a later accepted Change Request supersedes the manual play evidence.

Validity mode for current canonical level 13 must produce this final outcome:

| Status | Required meaning for current level 13 |
|---|---|
| `SOLVED` | The solver can reproduce the known-solvable 15-block level; emitted raw actions replay through `dispatchGameAction(...)` and complete the level, and solver output includes the accepted macro plan that produced them. |

These outcomes are allowed only as intermediate development diagnostics and must stop implementation before solution evidence continues:

| Status | Required handling for current level 13 |
|---|---|
| `FAILED_PREFLIGHT` | Invalid after CR-0008 unless the resource/geometry data regressed; report the failed lower-bound fields and stop for correction. |
| `UNPROVEN_WITHIN_LIMIT` | Solver budget ended without proof; revise the solver plan, macro operators, tactical executor, or pruning before treating the tool as ready for future level validation. |
| `UNSOLVABLE_EXHAUSTED` | Invalid unless the macro planner truly exhausted all non-dominated construction states; because manual completion exists, this result requires solver-contract review before any geometry redesign is proposed. |

If current canonical level 13 is not `SOLVED`, default solver output must include enough solver-redesign evidence for a Change Request without overwhelming the level author:

- `phase`;
- `failedInvariant`;
- `failureCategory`;
- concise `cause`;
- summary metrics for block availability, staging, scaffold progress, temporary blocks, recoverable blocks, states expanded, accepted macros, and rejected macros;
- at least one and at most three `topRecommendations[]` entries with `type`, `priority`, `reason`, and `action`.

The detailed evidence behind those summary fields, including failed macro IDs, rejected macro steps, rejected candidates, candidate scoring, state keys, and failure signatures, is available only with `--debug-trace`.

Recommended actions after CR-0008 must default to solver behavior and future-level design levers, such as adding or correcting a macro operator, changing candidate-plan ranking, improving tactical movement to a work platform, recovering temporary blocks, correcting a false exhaustion result, or explaining which future-level geometry pattern is hard for the analyzer to reason about. Geometry edits to current levels require a new Change Request that explains why the existing manual solvability evidence no longer applies. The solver must not apply any geometry or fixture changes itself.

### Additional Solver Benchmark Boundary

Current canonical levels 10 and 14 are required solver generalization benchmarks for CR-0010.

| Level | Reason included | Required final validity outcome |
|---:|---|---|
| 10 | Introduces shelf stockpile and staging behavior beyond tutorial levels. | `SOLVED` with replayable raw actions. |
| 14 | Represents vertical scaffold construction beyond the Level 13 double-bench shape. | `SOLVED` with replayable raw actions. |

Level 13 remains the first required construction-ledger benchmark and must continue to pass, but it is not sufficient evidence by itself. Levels 10 and 14 must pass with the same engine-backed canonical state-space solver, construction-ledger rules, and replay proof. A solver that special-cases Level 13 or emits hardcoded Level 13 actions without passing the additional benchmark levels fails this spec.

If level 10 or 14 returns `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED`, implementation stops for solver-plan revision or a solver-focused Change Request. Because the project owner has confirmed all current levels are solvable, these outcomes are not automatic geometry-redesign evidence.

### Endgame Logistics Benchmark Boundary

CR-0011 adds level 17 as the first endgame logistics benchmark while preserving the already solved level 16 result.

| Level | Reason included | Required final validity outcome |
|---:|---|---|
| 16 | Confirms the CR-0010 construction-ledger solver still handles a raised worksite after trace/logistics changes. | `SOLVED` with replayable raw actions. |
| 17 | First endgame benchmark for split-yard stockpile transfer, staging before final construction, and final-build readiness. | `SOLVED` with replayable raw actions, without reading manual trace exports. |

The default validity solver must not read trace exports for level 17 or any other level. A level 17 solution that depends on a manual trace file, hidden action list, per-level board mutation, or chronological trace imitation fails this spec.

For current canonical levels 18-20, CR-0011 requires either `SOLVED` with replayable raw actions or precise planner-gap diagnostics that name the failed strategic capability. Valid non-solved diagnostics for levels 18-20 must map to one of the accepted failure categories and must include at least one concrete solver-improvement or future-level design lever.

Goal-directed planner requirements:

- Parse the settled initial state through `createInitialState(...)` so gravity and stack-stability match actual play.
- Locate the goal and enumerate legal completion approach cells:
  - cells that can move or jump into the goal under accepted movement rules;
  - shelf-edge cells that allow a final diagonal jump;
  - no cell blocked by terrain, a carried block conflict, or an impossible scaffold candidate.
- Generate candidate final scaffold shapes for each approach cell, including triangular stairs and terrain-assisted variants from plausible origins.
- Plausible origins include nearest existing platform edges, lower ground under or near the goal shelf, reachable workbenches, and terrain shelves that reduce required height.
- Identify reachable platform regions before moving blocks.
- Group blocks by stockpile region and classify each block as immediately free and reachable, reachable after temporary scaffold, covered/supporting another block, likely recoverable after use, or likely stranded if used too early.
- Produce ordered subgoals for each candidate plan:
  - move adjacent to a useful free block;
  - pick up that block;
  - carry it toward the current scaffold target cell;
  - place it;
  - climb, recover, or reuse temporary blocks when supply requires reuse;
  - complete the final approach scaffold.
- Score candidate plans deterministically by fewer final committed blocks, shorter travel from useful stockpiles, fewer stranded or buried blocks, fewer blocked pickup paths, recoverability of temporary access blocks, and alignment with the final approach side.
- Preserve alternative candidate plans. If the best-ranked plan fails or hits its local budget, the solver tries the next ranked plan before returning `UNPROVEN_WITHIN_LIMIT`.
- Track planner diagnostics internally. Default output summarizes the active phase/cause/recommendations; `--debug-trace` emits goal approach cells, candidate scaffold count, chosen candidate rank, stockpile regions, subgoals, and rejected plan reasons.

Validity solver requirements:

- Plan from the big picture inward: derive final goal approach and final scaffold requirements first, work backward to stockpile, staging, transfer, temporary-access, recovery, and final-build readiness needs, then certify the resulting plan forward through engine actions.
- Explore macro construction states with a deterministic priority queue guided by planner candidates, not raw action-order depth-first wandering.
- Use BFS or BFS-equivalent raw-action state-space search only inside the tactical executor for the current macro step, bounded by the macro's preconditions, target, reachable region, and local budget.
- Do not assign stable solver identities to blocks for state equivalence. Engine-internal IDs may exist in runtime state objects, but solver deduplication treats blocks as interchangeable.
- Track a canonical state key containing level ID, level status, player row/col, facing, carried-block presence, and sorted uncarried block positions.
- Skip a state when the same key has already been reached with an equal or lower action count.
- Score macro states and tactical states against the active subgoal and candidate plan:
  - player distance to target block or target placement cell;
  - carrying a block needed by the active scaffold target;
  - planned scaffold cells filled;
  - useful blocks not stranded or buried;
  - distance to goal approach after final scaffold progress;
  - low repeated no-progress action count.
- Penalize equivalent pickup/place cycles that do not improve a target, while still allowing the same action types when they reach a different world state.
- Record failure signatures for candidate plans that reach a dead end or local budget without new progress.
- Do not retry a candidate plan when its failure signature is equivalent to or dominated by an already rejected signature.
- Stop as soon as one valid completion is found.
- Print candidate replay actions for a human or agent to copy into `tests/fixtures/level_solutions.json`.
- A reported `SOLVED` action list must replay through `dispatchGameAction(...)` and end with `state.status === "completed"`.
- A reported `SOLVED` macro plan must flatten to exactly the same raw `actions` list that passes replay; macro-only success is not valid solution evidence.
- A reported `SOLVED` result for levels 10, 13, or 14 must come from the shared solver architecture, not from per-level hardcoded action lists or per-level hardcoded board mutations.
- A reported `SOLVED` result for level 17 must come from strategic region-logistics planning and engine replay, not from reading trace exports or reproducing a human trace's chronological action order.

Failure-signature requirements:

- A failure signature contains:
  - `candidatePlanId`;
  - `approachCell`;
  - `committedScaffoldCells`;
  - `filledScaffoldTargets`;
  - `reachableRegions`;
  - `strandedBlocks`;
  - `blockedPickupCells`;
  - `unrecoverableTemporaryBlocks`;
  - `reason`.
- A new failure is equivalent to a prior failure when it has the same `candidatePlanId`, the same `approachCell`, the same `filledScaffoldTargets`, the same `reachableRegions`, the same `strandedBlocks`, and the same `reason`, even if the exact action list differs.
- A new failure is dominated by a prior failure when it has no additional filled scaffold target, no additional reachable region, no fewer stranded blocks, no fewer blocked pickup cells, and no lower action count.
- Dominated or equivalent failures are skipped and counted in `prunedSimilarFailures`.
- With `--debug-trace`, `rejectedCandidates[]` must expose failure signatures so level authors can see why similar solution attempts were not retried.
- `UNSOLVABLE_EXHAUSTED` may be returned only after all candidate plans have no remaining unvisited non-dominated states. If a state budget ends before that condition, the status is `UNPROVEN_WITHIN_LIMIT`.

Design analyzer requirements:

- Run in `--mode analyze` for solved levels or explicitly requested diagnostic cases.
- Report at least:
  - `shortestFoundActions`;
  - `pickups`;
  - `placements`;
  - `uniqueBlocksUsed`;
  - `reusedBlockCount`;
  - `unusedBlocks`;
  - `maxStackHeight`;
  - `maxPlayerElevation`;
  - `peakCommittedBlocks`;
  - `statesExpanded`.
- Report difficulty signals:
  - `irreversibleDeadEndsFound`;
  - `lateDeadEndsFound`;
  - `nearGoalDeadEndsFound`;
  - `resourceStrandingDeadEnds`;
  - `misleadingProgressStates`;
  - `solutionOrderSensitivity`;
  - unintended bypass evidence when a level can skip an intended platform or stockpile.
- Produce actionable recommendations with `type`, `priority`, `reason`, and `action`.
- Recommendation actions must name concrete design levers, such as adding reachable blocks, removing surplus blocks, moving a stockpile, raising or lowering a shelf, adding or removing terrain that forces platform order, making block reuse necessary, reducing an unintended bypass, or rerunning validity after an edit.

### Manual Trace Capture Contract

Manual trace capture is a local development aid for known-solvable levels. It is not runtime gameplay, not a backend API, and not a solver input.

Trace recorder behavior:

- A dev-facing recorder is available from the browser play UI.
- The tester presses `Record`, plays the selected level normally, and recording stops automatically when `state.status === "completed"`.
- The recorder captures only successful forward gameplay actions from the accepted action set: `moveLeft`, `moveRight`, `jump`, and `interact`.
- A recorded action is appended only after `dispatchGameAction(...)` returns a non-invalid replay-relevant state transition. Facing-only turns are replay-relevant and must be recorded even when they do not increment moves.
- Invalid actions, `undo`, `reset`, and level changes invalidate the active recording and stop capture.
- A completed, non-invalidated recording attempts to copy JSON to the clipboard.
- If clipboard copy fails, the UI keeps the JSON visible/selectable and provides Copy and Download controls.
- The recorder must not write trace files automatically, send trace data over the network, store traces in localStorage progress data, or mutate solution fixtures.

Trace export shape:

```json
{
  "version": "0.1.0",
  "contractVersion": "0.1.0",
  "source": "manual-trace",
  "levelId": 17,
  "completed": true,
  "invalidated": false,
  "actions": ["moveRight", "interact"],
  "summary": {
    "actionCount": 2,
    "pickups": 1,
    "placements": 0
  }
}
```

Trace export rules:

- `levelId` refers to the selected canonical level.
- `completed` must be `true` and `invalidated` must be `false` before the trace can be used as replay evidence or analyzer input.
- `actions` is a non-empty array of accepted forward gameplay actions.
- `summary.actionCount` equals `actions.length`.
- `summary.pickups` and `summary.placements` count successful `interact` actions where the replay state changes from not carrying to carrying, or carrying to not carrying.
- A trace export is trusted only after replay from `createInitialState(level, contract)` through `dispatchGameAction(...)` reaches `state.status === "completed"` without invalid actions.
- Trace exports may be committed under `tests/fixtures/manual_traces/` only when a plan names that fixture and uses it for replay/analyzer tests. Solver validity mode must not read that directory.

### Trace Macro Analyzer Contract

The trace analyzer is a no-dependency local tool mode that decodes replay-valid manual traces into compact, strategic evidence for improving the solver.

CLI contract:

```bash
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
```

Top-level output shape:

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

Trace phase vocabulary is fixed to:

- `collect`;
- `stage`;
- `build_temporary_access`;
- `climb_to_platform`;
- `recover_temporary_blocks`;
- `transfer_between_regions`;
- `build_final_scaffold`;
- `complete_goal_approach`.

Trace analyzer requirements:

- Replay the trace before analysis. If replay fails, output `status: "FAILED_PREFLIGHT"`, `reason: "TRACE_REPLAY_INVALID"`, `traceReplay.valid: false`, and the first invalid step/action.
- Decode chronological actions into strategic phases; do not expose the raw action order as the solver-facing recommendation.
- Detect region transfers by comparing block pickup and placement regions, not by assuming a trace-specific level script.
- Detect temporary scaffold use and recovery from replay state deltas.
- Detect final scaffold build order as a clue for planner scoring, not as a mandatory action script.
- Keep default output compact. It must not include full raw search trees, large rejected-state lists, raw state keys, or a per-action replay log.
- Detailed per-action replay may be added only under a future debug flag named by the implementation plan.

Trace-to-solver recommendation shape:

```json
{
  "type": "add_region_transfer_goal",
  "priority": "high",
  "reason": "The replay-valid trace staged blocks in an upper worksite before final construction.",
  "action": "Add a generic transfer goal from lower-yard stockpile to upper-worksite readiness before final climb.",
  "observedPhaseSequence": ["collect", "stage", "transfer_between_regions"],
  "requiredRegionTransfers": [
    { "fromRegion": "lower-yard", "toRegion": "upper-worksite", "minBlocks": 3 }
  ],
  "temporaryScaffoldPattern": null,
  "recoveryPoint": null,
  "finalScaffoldBuildOrderClue": null,
  "missingPlannerCapability": "region_transfer_goal",
  "proposedGenericOperatorOrInvariant": "Do not start final climb until target-region staged block count satisfies final-build readiness.",
  "replacedBadBehavior": "Solver climbs before staging enough blocks and strands the lower-yard stockpile.",
  "regressionTestExpectation": "Validity mode no longer returns the same stranded-stockpile failure without reading trace exports."
}
```

Trace-to-solver requirements:

- Every `solverFacingRecommendations[]` entry has `type`, `priority`, `reason`, `action`, `observedPhaseSequence`, `requiredRegionTransfers`, `temporaryScaffoldPattern`, `recoveryPoint`, `finalScaffoldBuildOrderClue`, `missingPlannerCapability`, `proposedGenericOperatorOrInvariant`, `replacedBadBehavior`, and `regressionTestExpectation`.
- Recommendations must be strategic and order-agnostic. They may name resource transfers, region readiness checks, scaffold dependencies, recovery requirements, and final-build readiness; they must not require the solver to reproduce the human action order.
- A trace-motivated solver change is accepted only when a regression test names the replaced bad behavior and proves validity mode no longer repeats it without reading trace exports.
- Trace output is development evidence for generic solver operators, invariants, and scoring rules; it is not a hidden level solution source.
- The default validity solver must not accept `--trace`, read `tests/fixtures/manual_traces/`, or load trace exports by convention.

### Solver Output Contract

Solver JSON output is layered. Default output is compact and design-facing; detailed diagnostics are emitted only when `--debug-trace` is passed.

Default solver output uses this shape:

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
  "actions": ["moveRight", "interact", "jump"],
  "debugTraceAvailable": true
}
```

Default output rules:

- Always include `status`, `levelId`, `phase`, `failedInvariant`, `failureCategory`, `cause`, `topRecommendations`, and `summary`.
- `topRecommendations` contains at most three entries.
- Each recommendation has `type`, `priority`, `reason`, and `action`.
- `summary` includes at least `blocksAvailable`, `blocksStaged`, `finalScaffoldCellsBuilt`, `temporaryBlocksUsed`, `recoverableBlocksRemaining`, `statesExpanded`, `maxQueueSize`, `macrosAccepted`, `macrosRejected`, and `solutionLength` when solved.
- `actions` is included when status is `SOLVED` because flattened raw replay remains the completion proof.
- `actions` values are restricted to `moveLeft`, `moveRight`, `jump`, and `interact`.
- Default output must not include large rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, or full macro step traces.
- Default non-solved output must be useful without `--debug-trace`: it names the active phase, failed invariant, failure category, concise cause, and capped recommendations.

Detailed diagnostics are emitted only with `--debug-trace`. Debug output may add:

- `macroPlan.steps`;
- `macroPlan.rejectedSteps`;
- failed tactical replays;
- failure signatures;
- pruned equivalent states or failure counts;
- candidate scaffold scoring;
- raw canonical state keys;
- rejected candidate plans;
- per-macro preconditions, targets, raw actions, start state keys, and end state keys.
- optional state-by-state text replay for solved results so a human can inspect whether the solver found the intended route, a physics bug, or an unintended shortcut.

Design-analysis output for solved or analyzed levels must report:

- picked-up block count;
- stockpile regions touched;
- stockpile regions ignored when they contain available blocks;
- final scaffold cells built;
- temporary blocks used and recovered;
- suspiciously short solution flag when a route completes below the plan-defined per-level minimum-interest threshold;
- final scaffold blocks used compared with the level's intended construction lower bound.

When status is not `SOLVED`, `failureCategory` must be one of:

| Category | Meaning |
|---|---|
| `RESOURCE_DEFICIT` | Hard resource math proves available blocks cannot satisfy the selected construction lower bound. |
| `NO_GOAL_APPROACH` | No legal approach cell or final movement path to the goal exists under accepted movement rules. |
| `UNREACHABLE_STOCKPILE` | Required blocks exist but cannot be reached with legal construction phases. |
| `NEEDED_BLOCK_COVERED` | A block needed for the plan is covered or supporting another block when it must be collected. |
| `TEMPORARY_BLOCK_NOT_RECOVERABLE` | A temporary block needed later cannot be legally recovered. |
| `PLAYER_TRAP_RISK` | A candidate phase would leave the player unable to return to required resources or the build area. |
| `FINAL_SCAFFOLD_UNBUILDABLE` | The final scaffold blueprint cannot be built one supported cell at a time. |
| `TACTICAL_REPLAY_FAILED` | A macro target looked plausible but could not be decomposed into legal engine actions. |
| `MACRO_INVARIANT_FAILED` | A macro replay violated a required invariant such as support, reachability, or resource preservation. |
| `SEARCH_BUDGET_UNPROVEN` | Budget ended before a solution or true exhaustion proof. |

Every failure category must map to at least one concrete redesign or solver-improvement lever. Default output exposes only the top three recommendations; `--debug-trace` may include the full supporting diagnostics.

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
| `LEVEL_RESOURCE_MANIFEST_INVALID` | Resource manifest shape, version, ID coverage, row values, or segment values are invalid. |
| `LEVEL_RESOURCE_DEFICIT` | A level has fewer available blocks than the deterministic resource requirement. |
| `LEVEL_SOLUTION_MANIFEST_INVALID` | Solution manifest shape, version, IDs, or action names are invalid. |
| `LEVEL_SOLUTION_INVALID` | Replaying a solution returns an invalid action or does not complete the target level. |
| `LEVEL_SOLVER_PREFLIGHT_FAILED` | Solver preflight proves a hard lower-bound deficit before search. |
| `LEVEL_SOLVER_UNPROVEN` | Solver budget ends without a proof and without exhausting the bounded state space. |
| `LEVEL_SOLVER_LEVEL13_UNPROVEN` | Current canonical level 13 after CR-0008 returns anything other than `SOLVED` with replayable macro-derived raw actions as final evidence. |
| `LEVEL_SOLVER_BENCHMARK_UNPROVEN` | Current canonical benchmark level 10, 13, or 14 returns anything other than `SOLVED` with replayable raw actions. |
| `LEVEL_SOLVER_CANONICAL_STATE_INVALID` | Solver state equivalence depends on engine-internal block IDs, omits player/facing/carry/status/block positions, or enqueues invalid actions as new states. |
| `LEVEL_SOLVER_LEDGER_INVALID` | A construction ledger omits required fields, consumes a reserved block early, marks an unrecoverable temporary block recoverable, or claims progress that replay does not commit. |
| `LEVEL_SOLVER_MACRO_INVALID` | A macro is accepted without valid replay, creates a floating block, teleports a block, picks up a supporting block, mismatches its promised state, or omits failed-macro diagnostics. |
| `LEVEL_SOLVER_REPEATED_FAILURE_UNPRUNED` | Solver output shows equivalent or dominated failed attempts were retried instead of pruned. |
| `LEVEL_TRACE_MANIFEST_INVALID` | A manual trace export has the wrong version, level ID, completion/invalidated flags, action values, summary counts, or shape. |
| `LEVEL_TRACE_REPLAY_INVALID` | Replaying a manual trace through the engine returns an invalid action or does not complete the target level. |
| `LEVEL_TRACE_FEEDBACK_INVALID` | Trace analyzer output lacks strategic/order-agnostic solver-facing recommendations, missing planner capability, replaced bad behavior, or regression-test expectation. |
| `LEVEL_SOLVER_TRACE_OVERFIT` | Validity mode reads trace exports, accepts trace-specific shortcuts, reproduces chronological trace scripts as its solver strategy, or passes only when a trace is present. |
| `LEVEL_SOLVER_ENDGAME_BENCHMARK_UNPROVEN` | Current canonical level 17 returns anything other than `SOLVED` with replayable raw actions from solver validity mode without trace input. |
| `LEVEL_SOLVER_OUTPUT_INVALID` | Solver output shape, replay actions, diagnostics, metrics, or recommendations do not match the contract. |

Tools may add context such as `levelId`, `row`, `col`, `step`, `action`, `status`, `reason`, `candidatePlanId`, `deficitBlocks`, and `prunedSimilarFailures`, but the stable code and human-readable message are required.

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
- A block is pickup-eligible only when no uncarried block occupies the cell directly above it.
- Attempting to pick up a supporting block returns `invalid: true`, `changed: false`, leaves move count and history unchanged, and uses the message `Block is supporting another block.`
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
- FR-7: Keep JS engine and physics behavior unchanged except for CR-0006's stack-stability pickup rule.
- FR-8: Update backend validation and API tests to reflect the expanded canonical level count.
- FR-9: Update durable docs that describe current verification commands and active project state.
- FR-10: Validate `docs/intake/candidate_levels_6_20.json` during planning/implementation checks, but do not import or serve it from runtime application code.
- FR-11: Ensure the browser UI can display variable-size levels 6-20 from API data without overlapping controls, hiding status text, or breaking keyboard/on-screen controls.
- FR-12: If a future candidate level proves unsolvable or too weak to satisfy the construction-first goal, stop for Spec revision rather than substituting unreviewed level data.
- FR-13: Add deterministic resource analysis for levels 6-20 using `tests/fixtures/level_resource_requirements.json`.
- FR-14: Fail validation when any level 6-20 has a resource deficit.
- FR-15: Revise level 13 to 15 movable blocks using the exact CR-0008 row 12 geometry, `#PBBBBBB.B.B.B.B.B.B.B..#`.
- FR-16: Treat surplus blocks as acceptable when validation, JS replay, and human review pass.
- FR-17: Add a deterministic no-dependency solver CLI that can prove `SOLVED`, fail `FAILED_PREFLIGHT`, report `UNPROVEN_WITHIN_LIMIT`, or report true `UNSOLVABLE_EXHAUSTED` only after non-dominated construction states are exhausted.
- FR-18: Add goal-directed planner diagnostics before validity search; default output summarizes the active phase/cause/recommendations, while `--debug-trace` exposes goal approach cells, scaffold candidates, stockpile regions, ordered subgoals, and rejected candidate reasons.
- FR-19: Add design-analysis metrics and actionable redesign recommendations for solved or explicitly requested diagnostic levels.
- FR-20: Add behavior/performance gates proving simple solved levels do not require excessive search.
- FR-21: Add a current canonical level 13 benchmark gate that ends as `SOLVED` with replayable raw actions; `--debug-trace` must expose the construction ledger and macro plan steps, and any non-solved status requires compact solver-redesign diagnostics before using the tool for future level validation.
- FR-22: Add current canonical level 10 and level 14 solver benchmark gates that end as `SOLVED` with replayable raw actions. These gates prove the solver generalizes beyond Level 13.
- FR-23: Treat final `FAILED_PREFLIGHT`, `UNPROVEN_WITHIN_LIMIT`, or `UNSOLVABLE_EXHAUSTED` for current canonical benchmark levels 10, 13, or 14 as invalid solver evidence that requires solver-plan revision before the tool is trusted for future level validation or redesign recommendations.
- FR-24: Add physics-certified macro construction solving with required operators for supported target identification, block classification, legal block collection, supported placement, stair/scaffold construction, work-platform climbing, temporary block recovery, and final goal approach.
- FR-25: Reject any macro that cannot be decomposed into legal `dispatchGameAction(...)` replay, including floating-block placements, teleporting blocks, pickup of supporting blocks, invalid placement actions, or promised-state mismatches.
- FR-26: Include compact failed-invariant, failure-category, cause, and capped recommendation fields in default solver output; expose accepted/rejected macro steps, failed macro operator, and failed macro reason only with `--debug-trace`.
- FR-27: Add engine-backed canonical state deduplication so block identity permutations collapse to the same state key and invalid actions do not create new queued states.
- FR-28: Add construction-ledger tracking for final scaffold cells, staging cells, reserved blocks, temporary cells, committed cells, work platforms, required carry-up blocks, and risk flags.
- FR-29: Add replay-inspection output for solved levels, including solution length, queue/frontier metric, and optional debug-only state-by-state text replay.
- FR-30: Add design-analysis fields that identify stockpiles used or ignored, picked-up block count, temporary block recovery, suspiciously short routes, and final scaffold blocks used versus the intended construction lower bound.
- FR-31: Add dev-facing manual trace capture that records accepted forward gameplay actions, auto-stops on completion, invalidates on undo/reset/level change, and produces copyable/downloadable JSON without mutating fixtures or runtime progress.
- FR-32: Add replay validation for manual trace exports before a trace can be trusted as evidence, analyzed, or converted by a human/agent into solution fixture data.
- FR-33: Add trace macro analysis that decodes replay-valid traces into compact strategic phases, region transfers, temporary scaffold use/recovery, final scaffold build-order clues, and solver-facing recommendations.
- FR-34: Add trace-to-solver feedback recommendations that name the bad solver behavior replaced, decoded trace pattern, missing planner capability, proposed generic operator/invariant/scoring rule, and regression-test expectation.
- FR-35: Add region-logistics planning that works backward from final goal/scaffold requirements to stockpile, staging, transfer, temporary-access, recovery, and final-build readiness needs before certifying forward replay.
- FR-36: Preserve current canonical level 16 as `SOLVED` and add current canonical level 17 as the first endgame benchmark that must return `SOLVED` with replayable raw actions without reading manual trace exports.
- FR-37: Prevent trace overfit: validity mode must not accept trace inputs, read manual trace fixture directories, use per-level trace shortcuts, or reproduce chronological trace action order as its solver strategy.

### Non-functional

- Performance: loading and validating 20 small JSON levels remains file-based and synchronous at startup.
- Security/privacy: no player data, secrets, accounts, network calls, or cloud storage are introduced.
- Accessibility: no new UI controls are required; existing level selector behavior must remain keyboard reachable.
- Observability: validation failures continue to use structured `LevelValidationError` codes and messages.
- Maintainability: solution evidence is machine-readable, versioned, and kept separate from served API level data.
- Maintainability: resource requirements are machine-readable, versioned, deterministic, and kept separate from served API level data.
- Maintainability: solver outputs are deterministic, versioned, and kept separate from served API level data.
- Maintainability: manual trace exports and trace analyzer outputs are deterministic, versioned, local development artifacts kept separate from served API level data and browser progress data.
- Maintainability: solver rejection diagnostics are stable enough for level authors to identify repeated bad plan shapes and actionable geometry changes.
- Performance: level 1 must return `SOLVED` under 500 expanded states and under 1 second on the local development machine. Known solved tutorial levels 2-10 must return `SOLVED` within deterministic per-level budgets defined in the plan.
- Performance: current levels 10, 13, and 14 must be solved by the engine-backed construction-ledger solver within deterministic budgets defined in the plan as known-solvable benchmarks; raw-action budget exhaustion is not a passing result for CR-0010.
- Performance: current level 17 must be solved by the trace-informed region-logistics solver within a deterministic budget defined in the plan; trace replay analysis must remain fast enough for local developer feedback on recorded action lists.
- UI resilience: large boards may scroll or scale within the existing play surface, but surrounding controls and status regions must remain usable on desktop and mobile-width layouts.

## Dependencies and approvals

- Prerequisite specs/plans: accepted and completed `SPEC-0002`/`PLAN-0002` and `SPEC-0003`/`PLAN-0003`.
- Prerequisite human gate: first-playable A2 UX/product checkpoint accepted for levels 1-5.
- Existing files to read first during planning: this spec, `backend/app/data/levels.json`, `backend/app/services/level_service.py`, `tests/test_level_validation.py`, `tests/test_api.py`, `tests/js/run-tests.mjs`, `tests/js/solver.test.js`, `frontend/js/engine.js`, `frontend/js/app.js`, `frontend/js/ui.js`, and `shared/app_contract.json`.
- Active intake source for this slice: `docs/intake/candidate_levels_6_20.json`. Read this file only for level-content transcription/validation; do not use raw intake overview files for routine planning or implementation.
- Approval class: A2 because expanded level design and difficulty curve require human product judgment after automated checks pass.
- Approval-required actions: any dependency addition, dependency installation, lockfile change, network-backed command, generator tool, solver dependency, frontend framework, build tool, deployment change, or CI change.

## Acceptance gates

### Automated

```bash
git status --short
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null
.venv/bin/python tools/validate_levels.py
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --debug-trace
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000
node tools/solve-levels.mjs --mode analyze-trace --level 17 --trace tests/fixtures/manual_traces/level_17_trace.json
node tests/js/run-tests.mjs
git diff --check
```

Expected evidence:

- Level validator reports 20 levels from `backend/app/data/levels.json`.
- Candidate intake validation confirms IDs 6-20, exact table fields, valid grid dimensions, valid symbols, boundary walls, required entity counts, and no unsupported raw `P`/`B` cells.
- Resource validation reports available, required, and surplus blocks for levels 6-20; current level 13 reports `availableBlocks=15`, `requiredBlocks=12`, and `surplusBlocks=3`.
- Solver validity for level 1 reports `SOLVED`, expands fewer than 500 states, completes under 1 second locally, and emits replayable actions.
- Solver validity for known solved levels 2-10 reports `SOLVED` within deterministic per-level budgets.
- Solver validity for required benchmark levels 10, 13, and 14 reports `SOLVED` with replayable raw actions. Level 13 is the first blocking benchmark; levels 10 and 14 prove the same solver architecture generalizes to additional current construction levels.
- Solver validity for level 16 remains `SOLVED` with replayable raw actions after trace/logistics changes.
- Solver validity for level 17 reports `SOLVED` with replayable raw actions without accepting `--trace`, reading `tests/fixtures/manual_traces/`, loading a hidden action script, or reproducing chronological human move order as its strategy.
- Solver validity for levels 18-20 either reports `SOLVED` with replayable raw actions or emits precise planner-gap diagnostics that map to accepted failure categories and include concrete solver-improvement or future-level design levers.
- An under-resourced level 13 scenario or synthetic equivalent reports `FAILED_PREFLIGHT`, `reason="FINAL_SCAFFOLD_BLOCK_DEFICIT"`, and `statesExpanded=0` before search.
- Current canonical level 13 after the CR-0008 15-block revision reports `SOLVED` as a known-solvable benchmark and emits a flattened replayable raw action list that completes through `dispatchGameAction(...)`; `--debug-trace` exposes the macro-plan steps that produced it.
- If current canonical level 13 is not `SOLVED`, default solver output includes `phase`, `failedInvariant`, `failureCategory`, concise `cause`, capped `topRecommendations`, and compact summary metrics. This is a tool-readiness failure, not a current-level solvability failure.
- If current canonical level 10 or 14 is not `SOLVED`, default solver output includes compact solver-improvement diagnostics and implementation stops before using the tool for future level validation.
- If current canonical level 17 is not `SOLVED`, default solver output includes compact solver-improvement diagnostics that name the missing region-logistics capability; implementation stops before completing solution evidence.
- Canonical-state tests prove block identity permutations collapse to one solver key, while player position, facing, carried-block presence, sorted uncarried block positions, and level status remain distinct.
- Construction-ledger tests prove reserved blocks are not consumed early, temporary cells are recovered only when legal, committed cells are not disturbed, and dominated ledgers are pruned.
- Solved benchmark outputs include `solutionLength`, `statesExpanded`, `maxQueueSize`, `actions`, and enough debug-only replay inspection to distinguish intended construction from a physics bug or unintended shortcut.
- Invalid-macro fixtures prove the solver rejects floating-block targets, block teleportation, pickup of supporting blocks, placements that fail engine physics, and accepted macro states that do not match replayed engine state.
- Default solver output caps `topRecommendations` at three and does not include full rejected state lists, full search trees, raw state keys, failed tactical replay logs, repeated equivalent failures, full candidate scoring tables, or full macro step traces.
- Debug-trace solver output includes planner diagnostics, macro diagnostics, failed tactical replays, failure signatures, pruned equivalent state evidence, candidate scoring, and raw state keys.
- Solver output includes failure signatures for rejected candidates in `--debug-trace` and reports a positive `prunedSimilarFailures` count for a repeated-bad-plan fixture.
- Analyzer output includes difficulty metrics, difficulty signals, and at least one actionable recommendation for a representative solved later level.
- Analyzer output reports picked-up block count, stockpile regions touched or ignored, final scaffold cells built, temporary blocks used/recovered, suspiciously short route flag, and final scaffold blocks used versus intended construction lower bound.
- Trace recorder tests prove recording starts empty for the selected level, appends successful forward actions only, auto-stops on completion, invalidates on undo/reset/level change, and exposes completed JSON through clipboard attempt plus visible/selectable fallback controls.
- Trace replay tests prove a completed trace reaches `state.status === "completed"` through `dispatchGameAction(...)`, and invalid trace exports fail with `LEVEL_TRACE_REPLAY_INVALID`.
- Trace analyzer output reports observed phase sequence, region transfers, temporary scaffold use/recovery, final scaffold build-order clues, and at least one solver-facing recommendation with missing planner capability, replaced bad solver behavior, proposed generic operator/invariant/scoring rule, and regression-test expectation.
- Trace analyzer recommendations are strategic and order-agnostic: automated tests assert recommendations name region transfers, readiness checks, scaffold dependencies, or recovery requirements rather than a raw human move-order script.
- Trace-motivated solver behavior changes include regression tests proving validity mode no longer repeats the replaced bad behavior without reading trace exports.
- Solver overfit tests prove validity mode does not accept trace inputs, read manual trace fixture directories, or require a trace file to solve level 17.
- Solver planning tests prove the solver derives final goal/scaffold requirements first, works backward to stockpile/staging/transfer/recovery/final-build readiness requirements, and then certifies a forward engine-action replay.
- Re-running the same solver command twice produces the same status, phase, failure category, first action sequence when solved, summary metrics, and recommendation types.
- Backend API tests prove list/detail routes handle levels 1-20 and preserve not-found behavior.
- JS tests include level solution evidence and complete every level without invalid actions.
- JS engine tests prove supporting blocks cannot be picked up while a block is directly above them.
- Variable-size levels render in the browser from declared `width`/`height`; no level may silently assume an 8x6 board.
- No new dependency or lockfile is introduced by the default path.

### Human

- Required? Yes
- Reason: levels 6-20 are player-facing puzzle content with difficulty, clarity, and product-feel judgment.

### Manual checks

- Start the local server and load `http://127.0.0.1:8000/`.
- Confirm the level selector exposes levels 1-20.
- Owner manual solvability confirmation for current levels 1-20 is already complete; future manual checks focus on regression risk, difficulty curve, and product feel.
- Confirm reset, undo, invalid feedback, completion modal, and best-moves persistence still work after selecting later levels.
- Confirm the difficulty curve does not rely on unexplained mechanics outside `SPEC-0003`.
- Confirm levels 14-20 feel like construction/scaffold puzzles rather than simple path-following or single-block bridge puzzles.
- Confirm automated solver evidence for benchmark levels 10, 13, and 14 matches accepted mechanics and does not contradict the existing manual completion evidence.
- Confirm trace recorder UX is acceptable for local manual capture: pressing Record, playing, completion auto-stop, and JSON copy/fallback are clear enough for project-owner use.
- Confirm trace analyzer recommendations are useful design/solver feedback rather than an overwhelming action log.
- Confirm surplus blocks in other levels feel like purposeful alternatives or ambiguity rather than clutter.
- Confirm larger boards remain legible and controllable on desktop and mobile-width layouts.

## Risks and open questions

- Risk: later playtest feedback changes mechanics or early levels during expansion.
  - Mitigation: open a Change Request if new feedback changes prerequisite mechanics, accepted level geometry, or solution evidence.
- Risk: variable-size grids expose renderer, layout, or selector assumptions that were harmless for 8x6 levels.
  - Mitigation: require API compatibility tests, browser manual checks, and no hardcoded 8x6 assumptions in new solution/validation checks.
- Risk: hand-authored solution manifests can drift from level data.
  - Mitigation: replay all solution manifests through the engine in automated checks.
- Risk: difficulty curve quality cannot be fully machine-verified.
  - Mitigation: keep A2 human review for the expanded level batch.
- Risk: current levels are manually confirmed solvable but not all are represented in automated solution evidence yet.
  - Mitigation: keep replayed solution evidence mandatory for regression protection, and treat solver failure on known-solvable levels as a tool gap.
- Risk: future candidate levels can be structurally valid but unsolvable or weak.
  - Mitigation: use the solver/analyzer as future-level validation and redesign tooling; unsolved future candidates trigger Spec or Change Request review.
- Risk: deterministic resource analysis is a lower-bound diagnostic and can pass a future level that is still unsolvable.
  - Mitigation: keep JS replay as the final completion proof and use solver/analyzer output for future level validation.
- Risk: stack-stability invalidates previously found solution traces.
  - Mitigation: regenerate/replay all level 1-20 solutions after the mechanic change.
- Risk: solver search can wander through many legal but unproductive pickup/place cycles.
  - Mitigation: require engine-backed canonical state-key deduplication, construction-ledger planning, no-progress penalties, and behavior/performance gates.
- Risk: solver search can spend budget retrying similar failed plan shapes that all strand the same resources.
  - Mitigation: require failure signatures, dominance pruning, and `prunedSimilarFailures` evidence.
- Risk: current canonical benchmark levels can remain manually solvable but solver-unproven because the construction ledger or tactical executor is incomplete.
  - Mitigation: require physics-certified construction-ledger solving, compact default failure reporting, debug-trace failed-macro diagnostics, and `SOLVED` replay gates for levels 10, 13, and 14 before using the tool for future level validation.
- Risk: endgame levels can remain manually solvable but solver-unproven because the solver lacks region-logistics planning.
  - Mitigation: require level 17 as the first endgame benchmark, strategic backward planning from final goal requirements, trace-informed planner-gap diagnostics, and regression tests for replaced bad solver behavior.
- Risk: macro solving can accidentally bypass game physics.
  - Mitigation: reject every macro that cannot be decomposed into legal engine actions and replayed through `dispatchGameAction(...)`.
- Risk: the solver can overfit level 13.
  - Mitigation: require additional `SOLVED` benchmark gates for current canonical levels 10 and 14 using the same solver architecture, without per-level hardcoded action fixtures.
- Risk: the solver can overfit a manual trace.
  - Mitigation: prohibit validity mode from reading trace exports, require order-agnostic trace recommendations, and require level 17 to solve without trace input.
- Risk: trace analysis can become too verbose to guide design.
  - Mitigation: keep default trace analyzer output compact, require a small strategic phase vocabulary, and forbid full raw search trees or per-action logs in default output.
- Risk: a separate local physics implementation can diverge from the browser game.
  - Mitigation: require `createInitialState(...)` and `dispatchGameAction(...)` as the transition authority for solver search, macro replay, and final proof.
- Risk: difficulty metrics may be mistaken for product judgment.
  - Mitigation: analyzer recommendations remain advisory; expanded-level A2 human review remains required.
- Open question: should human review accept the current candidate level names, or should titles be revised before implementation while keeping the same level geometry?

## Stop conditions

- `docs/intake/candidate_levels_6_20.json` is missing, malformed, or does not match the candidate table in this spec.
- Level expansion requires a new gameplay mechanic beyond CR-0006's stack-stability pickup rule, a new tile symbol, action name, API response shape, or frontend route behavior.
- The existing engine cannot replay solution evidence without modifying accepted mechanics.
- Solver level 1 validity cannot meet the under-500-state and under-1-second gate without changing scope.
- Solver output is nondeterministic for the same input and options.
- Current canonical benchmark level 10, 13, or 14 returns anything other than `SOLVED` with accepted construction-ledger evidence and replayable raw actions.
- Current canonical benchmark level 16 regresses from `SOLVED` after trace/logistics changes.
- Current canonical benchmark level 17 returns anything other than `SOLVED` with replayable raw actions from validity mode without trace input.
- Current canonical levels 18-20 return non-solved output without precise planner-gap diagnostics and concrete solver-improvement or future-level design levers.
- Solver output for an unsolved benchmark level lacks compact default failure reporting, actionable solver-redesign recommendations, or debug-trace failed-macro diagnostics.
- Manual trace capture cannot produce replay-valid JSON for a completed level without dependency, network, backend API, or persistent storage changes.
- Trace capture treats undo, reset, level changes, or invalid actions as valid solution evidence.
- Trace analyzer recommendations are chronological move scripts rather than strategic region transfers, readiness checks, scaffold dependencies, or recovery requirements.
- Validity mode accepts trace input, reads trace fixture directories, uses per-level trace shortcuts, or requires a trace file to solve level 17.
- A trace-motivated solver behavior change lacks a regression test naming the replaced bad behavior and proving the solver no longer repeats it without trace input.
- A macro step is accepted without engine replay, creates a floating block, teleports a block, picks up a supporting block, places into an invalid target, or mismatches its promised end state.
- Solver state keys depend on engine-internal block IDs, omit player/facing/carry/status/block positions, or enqueue invalid actions as new states.
- The construction ledger omits required fields, consumes a reserved block early, marks an unrecoverable temporary block recoverable, or claims progress that raw replay does not commit.
- Solver repeats an equivalent or dominated failed candidate plan without pruning it.
- Solver implementation requires reimplementing gameplay rules instead of using `frontend/js/engine.js` as the source of truth.
- Solver implementation tries to auto-mutate level data, intake data, or solution fixtures.
- Any level 6-20 reports a resource deficit after accepted CR-0006/CR-0008 changes.
- A generator, solver package/dependency, package install, lockfile, network access, CI change, or deployment change becomes necessary.
- Levels 1-5 need edits outside an accepted Change Request.
- Product judgment is needed on difficulty curve, tutorial language, or level feel before accepting the expanded batch.
- Implementation would need to read `docs/intake/PROJECT_OVERVIEW_RAW.md` or `.superpowers/brainstorm/` artifacts to decide level behavior.
