# Current State

## Active Objective

First playable work is committed locally at `96545e9`. PLAN-0004 documentation and pre-CR-0010 implementation chunks are committed locally through `35480cd feat(solver): add level validation harness`. Current uncommitted implementation work updates `tools/solve-levels.mjs`, `tests/js/solver.test.js`, `tests/fixtures/level_solver_expectations.json`, and `tests/fixtures/level_solutions.json` so the engine-backed construction-ledger solver returns `SOLVED` with replayable raw actions for required benchmark levels 10, 13, and 14, plus levels 11, 12, 15, and 16. Solver-produced actions for levels 11-15 have been copied into `tests/fixtures/level_solutions.json` after replay verification. PLAN-0004 is stopped before Task 5 completion because levels 17-20 remain solver-unproven, so `tests/fixtures/level_solutions.json` still cannot honestly be completed for levels 1-20 from solver output alone. The project owner has confirmed all current levels 1-20 are manually solvable; the remaining failure is solver/tooling capability, not current level invalidity. `CR-0011` is accepted. `SPEC-0004` is Accepted after CR-0011 hardening. `PLAN-0004` is Ready for Implementation after CR-0011 plan hardening and owner approval; implementation should resume from Task 4F.

## Active Contract

- Spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md` (Accepted — CR-0003 wording update applied)
- Spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md` (Accepted — hardened for CR-0011)
- Plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md` (Ready for Implementation — hardened for CR-0011)
- Active Source Candidate: `docs/intake/candidate_levels_6_20.json` (planning/intake source only; not runtime data)
- Plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md` (Completed — first-playable A2 checkpoint accepted)
- Batch: `docs/plans/batches/BATCH-0003-first-playable-ui.md` (Completed)
- Change Requests: `docs/change-requests/CR-0002-a2-ux-mechanics-revision.md` (Accepted, fully implemented)
- Change Requests: `docs/change-requests/CR-0003-direction-mechanic-and-level-redesign.md` (Accepted, implemented locally)
- Change Requests: `docs/change-requests/CR-0004-level-1-support-geometry-fix.md` (Accepted)
- Change Requests: `docs/change-requests/CR-0005-solution-evidence-capture.md` (Accepted, active solution-capture checkpoint)
- Change Requests: `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md` (Accepted; SPEC-0004/PLAN-0004 hardened)
- Change Requests: `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md` (Accepted; SPEC-0004/PLAN-0004 hardened)
- Change Requests: `docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md` (Accepted; implemented locally)
- Change Requests: `docs/change-requests/CR-0009-physics-certified-macro-solver.md` (Accepted; solver strategy superseded where CR-0010/CR-0011 conflict)
- Change Requests: `docs/change-requests/CR-0010-construction-ledger-solver-remediation.md` (Accepted; implementation scaffold preserved, solver strategy superseded where CR-0011 conflicts)
- Change Requests: `docs/change-requests/CR-0011-trace-informed-endgame-solver-reset.md` (Accepted; SPEC-0004 accepted and PLAN-0004 ready for implementation)
- Branch: `codex/application-scaffold`

## Current Status

- `BATCH-0001` complete.
- `BATCH-0002` complete. All 24 backend tests pass. Level validator passes.
- `BATCH-0003` automated work complete. JS tests pass. Server starts.
- `CR-0002` fully implemented (keyboard focus, facing indicator, diagonal jump, Space→interact).
- `CR-0003 Sub-change A` implemented: two-press direction mechanic in `engine.js` + engine tests updated. All JS tests pass.
- `CR-0003 Sub-change B` implemented: levels 2-5 were redesigned in `backend/app/data/levels.json`.
- Engine-level solution traces complete levels 2-5 with the accepted mechanics.
- First playable commit exists locally: `96545e9 feat(gameplay): add first playable UI and level redesign`.
- `SPEC-0004-level-expansion-pipeline` has been accepted for level expansion against `docs/intake/candidate_levels_6_20.json`.
- First-playable A2 UX/product checkpoint was accepted by the project owner on 2026-06-11.
- M4 `PLAN-0004-level-expansion-pipeline` implementation started after A2 acceptance.
- Partial PLAN-0004 worktree changes exist: backend validation tests were updated, candidate validation was added, CLI candidate-source support was added, and `backend/app/data/levels.json` was expanded to levels 1-20.
- `CR-0004` is implemented: level 1 raw geometry was fixed by moving the block to its already-settled supported position.
- PLAN-0004 Task 4 API tests are complete and passing.
- PLAN-0004 Task 4A is implemented: `frontend/js/engine.js` rejects pickup of a block with another block directly above it, and `tests/js/engine.test.js` covers the invalid action contract.
- PLAN-0004 Task 4B is implemented: `tests/fixtures/level_resource_requirements.json` exists, `analyze_level_resources(...)` validates resource manifests, `tools/validate_levels.py --resource-source ...` reports resource analysis, and level 13 row 12 is revised in both canonical and candidate JSON.
- PLAN-0004 Task 5 automated solution evidence is paused: `tests/js/level-solutions.test.js` and `tests/fixtures/level_solutions.json` exist, and the fixture currently covers levels 1-15. JS tests still fail exact level coverage for levels 16-20. The project owner has already confirmed current levels 1-20 are manually solvable.
- `CR-0005` is accepted and allows manual solution capture for levels 11-20 while keeping automated replay mandatory.
- `CR-0006` is accepted and implemented locally. SPEC-0004 and PLAN-0004 require a stack-stability pickup rule, a level 13 block-supply revision, surplus-block policy, and deterministic block-resource analysis for levels 6-20.
- `CR-0007` is accepted and implemented locally. It adds a no-dependency deterministic solver pipeline with hard preflight gates, goal-directed validity mode, design-analysis metrics, behavior/performance gates, exact-state deduplication helpers, failure-signature dominance helpers, repeated-bad-plan pruning, and actionable recommendations for level redesign.
- `SPEC-0004` now requires current canonical level 13, after the CR-0008 15-block revision, to end solver validity as `SOLVED` with accepted macro steps and replayable raw actions as a known-solvable benchmark for future-level tooling; final non-solved statuses are solver tool-readiness failures, not current-level solvability failures.
- `SPEC-0004` now requires exact-state deduplication plus failure-signature/dominance pruning so repeated or similar bad solver attempts are not retried without new progress evidence.
- `PLAN-0004` Task 4C/4D is implemented locally under the pre-CR-0010 solver strategy: `tests/fixtures/level_solver_expectations.json`, `tests/js/solver.test.js`, and `tools/solve-levels.mjs` exist, but they now need CR-0010 implementation updates after the hardened plan is approved.
- Solver evidence:
  - `node tools/solve-levels.mjs --mode validity --level 1 --max-states 500` returns `SOLVED`, `statesExpanded=4`, and actions `moveRight`, `jump`, `moveRight`, `moveRight`.
  - Before CR-0008, `node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000` returned `FAILED_PREFLIGHT`, `reason=FINAL_SCAFFOLD_BLOCK_DEFICIT`, `availableBlocks=12`, `requiredFinalScaffoldBlocks=15`, `deficitBlocks=3`, `statesExpanded=0`, and `reuseRequired=true`.
  - `node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000` returns `ANALYZED` with summary metrics, difficulty signals, and an `add_reachable_blocks` recommendation.
- `CR-0008` is accepted and implemented locally: level 13 row 12 is now `#PBBBBBB.B.B.B.B.B.B.B..#`, adding exactly three supported, reachable lower-yard blocks and raising level 13 to 15 movable blocks.
- Post-CR-0008 resource validation passes: level 13 now reports `availableBlocks=15`, `requiredBlocks=12`, and `surplusBlocks=3`.
- Before CR-0010, post-CR-0008 solver validity for level 13 no longer failed preflight but still did not find a replayable solution within the accepted `1000000` state budget. That failure is now superseded by the CR-0010 construction-ledger implementation below.
- Post-CR-0008 analyzer output for level 13 recommends `inspect_goal_scaffold`; solution evidence remains blocked.
- The project owner confirmed all current levels are solvable. Level 13 was manually completed in roughly 230 moves, so the current failure is a solver architecture gap rather than level impossibility.
- `CR-0009` is accepted. It replaces raw-action Level 13 search with a physics-certified macro construction solver. Macro plans may reason about scaffold targets, work platforms, and recoverable blocks, but every macro must be decomposed into legal engine actions before it can be accepted.
- `SPEC-0004` is accepted after CR-0009 hardening: current level 13 must return `SOLVED` with replayable raw actions as a known-solvable benchmark; default solver output is compact and design-facing, while `--debug-trace` exposes macro-plan and failed-macro details.
- `PLAN-0004` was Ready for Implementation after CR-0009 hardening: that solver strategy is now superseded by accepted CR-0010 where it conflicts.
- CR-0009 implementation attempt status: `tools/solve-levels.mjs` now exposes the layered default output fields (`phase`, `failedInvariant`, `failureCategory`, `cause`, capped `topRecommendations`, compact `summary`, and `debugTraceAvailable`) plus `--debug-trace` parsing and macro helper exports, but it still does not produce a replayable Level 13 solution.
- Current Level 13 solver blocker is resolved: `node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --format json` returns `SOLVED` with a replayable action list.
- `CR-0010` is accepted as the next solver-contract remediation. It keeps the existing solver CLI/reporting/replay scaffolding, supersedes only conflicting CR-0007/CR-0009 solver-strategy wording, requires an engine-backed canonical state-space solver with a construction ledger, and treats Level 13 as the first benchmark rather than the only benchmark. `SPEC-0004` is accepted after CR-0010 hardening and names levels 10 and 14 as additional required solver generalization benchmarks.
- `PLAN-0004` CR-0010 Task 4C/4D is partially implemented after the current session: canonical state-key tests, invalid-action non-enqueue tests, construction-ledger benchmark gates, solved-output metrics (`solutionLength`, `statesExpanded`, `maxQueueSize`), and replay checks now pass for levels 10, 13, and 14.
- Current CR-0010 solver status:
  - `node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000` returns `SOLVED`, `statesExpanded=486`, `solutionLength=63`.
  - `node tools/solve-levels.mjs --mode validity --level 11 --max-states 1000000` returns `SOLVED`, `statesExpanded=138698`, `solutionLength=103`.
  - `node tools/solve-levels.mjs --mode validity --level 12 --max-states 1000000` returns `SOLVED`, `statesExpanded=1380`, `solutionLength=92`.
  - `node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000` returns `SOLVED`, `statesExpanded=278090`, `maxQueueSize=23652`, `solutionLength=262`.
  - `node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000` returns `SOLVED`, `statesExpanded=2456`, `solutionLength=149`.
  - `node tools/solve-levels.mjs --mode validity --level 15 --max-states 1000000` returns `SOLVED`, `statesExpanded=103`, `solutionLength=61`.
  - `node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000` returns `SOLVED`, `statesExpanded=12626`, `solutionLength=163`, using terrain-assisted access scaffolds.
  - Levels 17, 18, 19, and 20 return `UNPROVEN_WITHIN_LIMIT` from `construction_ledger_search` with `failureCategory=SEARCH_BUDGET_UNPROVEN` and recommendation `improve_carry_up_reservation`.
- `CR-0011` is accepted. It requires a trace-informed endgame solver reset that adds dev-facing trace capture, replay validation, strategic/order-agnostic trace macro analysis, trace-to-solver feedback recommendations, anti-overfit rules, region-logistics planning, and level 17 as the first endgame benchmark before resuming implementation.
- `SPEC-0004` is accepted after CR-0011 hardening. It now defines trace capture/export shape, trace analyzer output, trace-to-solver recommendation fields, anti-overfit rules, region-logistics planning, level 16 regression, level 17 endgame benchmark, and trace-related validation/error gates.
- `PLAN-0004` is Ready for Implementation after CR-0011 hardening and owner approval. It adds trace recorder/analyzer implementation tasks, a level 17 manual trace fixture checkpoint, region-logistics solver tasks, anti-overfit tests, exact validation commands, rollback steps, risks, and stop conditions.
- `AGENTS.md` now explicitly requires the repo-local writing docs skill for Change Requests, status dashboards, handoffs, repo maps, and other durable project documentation, not only specs/plans/batches.
- `docs/intake/candidate_levels_6_20.json` contains candidate levels 6-20 for level-expansion planning. It is not accepted production data and must not be served or imported at runtime.

## CR-0004 Implementation Note

Implementation revealed a conflict between accepted requirements:

- PLAN-0004 says to preserve existing level objects for IDs 1-5 unless the first-playable A2 review creates an accepted Change Request.
- SPEC-0004 says every raw `P` and `B` cell must be directly supported by `#` or `B` before initial engine gravity runs.
- Accepted level 1 has a raw `B` at row 3, col 3 with `.` below it. The existing engine settles it with gravity, and the project owner accepted the first playable levels as working.

`CR-0004` rejects a validation exemption and instead authorizes fixing level 1's source geometry:

```json
[
  "########",
  "#......#",
  "#......#",
  "#......#",
  "#P.B.G.#",
  "########"
]
```

The exact geometry fix has been applied in `backend/app/data/levels.json`.

### Engine-level solution traces for redesigned levels

These traces were run with `frontend/js/engine.js` against `backend/app/data/levels.json`:

| Level | Completion sequence |
|---|---|
| 2 | `interact`, `moveRight`, `jump`, `jump`, `interact`, `jump` |
| 3 | `interact`, `moveRight`, `interact`, `jump`, `jump`, `jump`, `moveRight` |
| 4 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump` |
| 5 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump`, `jump` |

Level 1 now has the same settled runtime block position in source data.

## Accepted Mechanics (current, post CR-0002 + CR-0003-A)

| Mechanic | Behaviour |
|---|---|
| `moveLeft` when facing right | Turn to face left. No movement. No moves increment. No history push. Returns `changed: false, invalid: false`. |
| `moveLeft` when facing left | Attempt to move left. If blocked → `invalid: true`. If clear → move, increment moves, gravity, push history. |
| `moveRight` when facing left | Turn to face right. No movement. No moves increment. No history push. |
| `moveRight` when facing right | Attempt to move right. If blocked → `invalid: true`. If clear → move, increment moves, gravity, push history. |
| `jump` | Diagonal: one row up, one col in `state.facing` direction. Target must be in bounds and empty. Gravity applies after. |
| `interact` | Pick up adjacent block (facing side) if not carrying and no uncarried block is directly above it. Place carried block at adjacent cell (facing side) if carrying and target is empty. |
| `reset` | Restore initial level state, clear history, moves=0, apply gravity. |
| `undo` | Restore most recent history entry. |
| Gravity | Phase 1: all uncarried blocks fall simultaneously until stable. Phase 2: player falls until stable. |
| Facing indicator | CSS `data-facing` attribute on player cell; white border-trick triangle points in facing direction (implemented). |
| Carry indicator | Orange pip `::before` on carrying cell, `data-carry-side` on facing side (implemented). |
| Keyboard | A/← moveLeft, D/→ moveRight, W/↑ jump, E/Enter/Space interact, Z undo, R reset. |

## Keyboard binding (shared/app_contract.json)

```json
"keyboard": {
  "moveLeft":  ["ArrowLeft", "KeyA"],
  "moveRight": ["ArrowRight", "KeyD"],
  "jump":      ["ArrowUp", "KeyW"],
  "interact":  ["KeyE", "Enter", "Space"],
  "reset":     ["KeyR"],
  "undo":      ["KeyZ"]
}
```

## Automated Checks (current)

```
python3 -m json.tool backend/app/data/levels.json >/dev/null → pass ✓
python3 -m json.tool docs/intake/candidate_levels_6_20.json >/dev/null → pass ✓
python3 -m json.tool tests/fixtures/level_resource_requirements.json >/dev/null → pass ✓
python3 -m json.tool tests/fixtures/level_solutions.json >/dev/null → pass ✓
.venv/bin/python tools/validate_levels.py → Validated 20 levels from backend/app/data/levels.json ✓
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json → Validated 20 levels / 15 candidate levels ✓
.venv/bin/python tools/validate_levels.py --resource-source tests/fixtures/level_resource_requirements.json → Validated resources for 15 levels; post-CR-0008 level 13 resource assertion passes ✓
.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json → canonical/candidate/resource validation pass ✓
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py → 35 passed, 1 known StarletteDeprecationWarning ✓
node tools/solve-levels.mjs --mode validity --level 1 --max-states 500 → `SOLVED`, `statesExpanded=4` ✓
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000 → `SOLVED`, `statesExpanded=486`, `solutionLength=63` ✓
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --format json → `SOLVED`, `statesExpanded=278090`, `solutionLength=262` ✓
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000 → `SOLVED`, `statesExpanded=2456`, `solutionLength=149` ✓
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000 → `SOLVED`, `statesExpanded=12626`, `solutionLength=163` ✓
node tools/solve-levels.mjs --mode analyze --level 13 --max-states 2000000 → `ANALYZED` ✓
node tools/solve-levels.mjs --mode analyze --level 18 --max-states 2000000 → `ANALYZED` with recommendation ✓
node --input-type=module -e "import { run } from './tests/js/solver.test.js'; run(); console.log('ok solver');" → `ok solver` ✓
node tests/js/run-tests.mjs → FAIL: solution fixture coverage currently includes levels 1-15 only ✗
```

CR-0006 planning-doc checks:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0004-level-expansion-pipeline.md docs/plans/PLAN-0004-level-expansion-pipeline.md docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
```

CR-0007 planning-doc checks:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0004-level-expansion-pipeline.md docs/plans/PLAN-0004-level-expansion-pipeline.md docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
```

CR-0008 planning-doc check:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md docs/plans/PLAN-0004-level-expansion-pipeline.md → ok ✓
```

CR-0009 plan-hardening checks:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0004-level-expansion-pipeline.md docs/plans/PLAN-0004-level-expansion-pipeline.md docs/plans/PLAN-0003-frontend-gameplay-ui.md docs/plans/batches/BATCH-0003-first-playable-ui.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
git diff → reviewed ✓
```

CR-0010 planning-doc check:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/change-requests/CR-0010-construction-ledger-solver-remediation.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
git diff -- docs/change-requests/CR-0010-construction-ledger-solver-remediation.md docs/status/CURRENT_STATE.md → reviewed ✓
```

CR-0010 spec-hardening checks:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0004-level-expansion-pipeline.md docs/change-requests/CR-0010-construction-ledger-solver-remediation.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
git diff → reviewed ✓
```

CR-0010 plan-hardening checks:

```
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/plans/PLAN-0004-level-expansion-pipeline.md → ok ✓
git diff --check → pass ✓
git diff --stat → pass ✓
git diff → reviewed ✓
```

Solution evidence status:
- `tests/fixtures/level_solutions.json` currently includes replayed solutions for levels 1-15.
- `tests/js/level-solutions.test.js` requires exact coverage for levels 1-20 and is intentionally failing until levels 16-20 are captured.
- Solver output provides replayable candidate actions for level 16, but the current resume request only asked to copy verified levels 11-15 into the solution fixture.
- Solver output still does not provide replayable actions for levels 17-20, so Task 5 cannot complete in the current state.

Additional engine trace:
```
node --input-type=module -e "<engine trace>" → levels 2-5 complete ✓
```

## Files Changed (uncommitted)

Modified:
- `tools/solve-levels.mjs` — CR-0010 construction-ledger search now uses canonical block-position state keys, engine-backed legal expansion, parent-linked construction progress search, terrain-assisted scaffold/access target selection, solved benchmark macro reports, and compact failure diagnostics for remaining unproven expanded levels.
- `tests/js/solver.test.js` — tightened canonical-state, invalid-action, construction-ledger macro, benchmark replay, and solved-output metric assertions.
- `tests/fixtures/level_solver_expectations.json` — requires levels 10, 13, 14, and 16 to return `SOLVED`.
- `tests/fixtures/level_solutions.json` — includes verified solver-produced replay actions for levels 11-15.
- `docs/specs/SPEC-0004-level-expansion-pipeline.md` — hardened for accepted CR-0011 trace-informed endgame solver reset and marked Accepted.
- `docs/plans/PLAN-0004-level-expansion-pipeline.md` — hardened and marked Ready for Implementation for CR-0011 trace recorder/analyzer and region-logistics solver reset implementation.
- `docs/status/CURRENT_STATE.md` — records SPEC-0004 acceptance, PLAN-0004 CR-0011 ready status, and next implementation action.

New (untracked):
- `docs/change-requests/CR-0011-trace-informed-endgame-solver-reset.md` — accepted Change Request for trace-informed endgame solver reset and strategic trace-to-solver feedback.
- `docs/handoff/HANDOFF-0008-plan-0004-cr-0010-solver.md` — restart package for the remaining CR-0010 solver/solution-evidence work.
- `.superpowers/brainstorm/` — local visual brainstorming artifacts; not routine implementation input and should not be committed unless explicitly requested.

## Known Deviations from PLAN-0002 (carried forward)

- `pydantic==2.10.4` → `pydantic==2.13.4` (Python 3.14 wheel; A3 approved).
- `httpx` added as dev dependency (A3 approved).
- `[tool.setuptools.packages.find]` added to pyproject.toml.
- `fastapi` upgraded `0.115.6→0.136.3` (A3 approved, asyncio deprecation fix).
- Residual `StarletteDeprecationWarning` (httpx→httpx2 swap deferred to separate A3).

## Human Context Needed

### Expanded-level A2 checkpoint remains

After PLAN-0004 automated checks pass, the project owner still needs to review expanded levels 6-20 for difficulty curve, scaffold feel, visual legibility, and product fit.

### Trace-capture A2 checkpoint may be needed

After Task 4F, if no replay-valid `tests/fixtures/manual_traces/level_17_trace.json` exists, the project owner needs to record level 17 through the local dev trace recorder and provide the exported JSON before Task 4G analyzer validation can complete.

## Next Action

Resume `PLAN-0004` implementation from Task 4F: trace recorder UI and replay tests. Continue through Task 4G and Task 4H only while the plan's automated gates pass and no A2/A3 stop condition is reached.

## Last Updated

2026-06-12
