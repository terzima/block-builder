# CR-0011: Trace-Informed Endgame Solver Reset

Status: Accepted
Owner: Project owner
Created: 2026-06-12
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Related design: `docs/superpowers/specs/2026-06-12-trace-informed-endgame-solver-design.md`
Related change requests: `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0009-physics-certified-macro-solver.md`, `docs/change-requests/CR-0010-construction-ledger-solver-remediation.md`
Approval class: A2

## Trigger

PLAN-0004 implementation resumed through CR-0010 and improved the solver materially. The current construction-ledger solver now returns `SOLVED` with replayable raw actions for levels 10, 13, 14, and 16, and solver-produced actions for levels 11-15 were copied into `tests/fixtures/level_solutions.json` after replay verification.

However, levels 17-20 still return `UNPROVEN_WITHIN_LIMIT` from `construction_ledger_search`. The project owner has confirmed all current levels 1-20 are manually solvable, so these failures are solver/tooling gaps, not current-level geometry evidence.

The failed assumption is that the accepted CR-0010 construction-ledger planner could generalize from single final-scaffold/access-scaffold construction to endgame logistics by extending scaffold target selection and carry-up/final-approach heuristics. The current failures show that levels 17-20 require a stronger planner model: explicit region graphs, stockpile transfer, staging before final construction, temporary scaffold recovery, and final-build readiness checks.

A second failed assumption is that implementation can infer the missing human strategy from solver diagnostics alone. Without a manual trace recorder, the project has no easy way to capture a known-good human route and analyze what generic macro phases the solver is missing.

## Current accepted spec/plan says

`SPEC-0004` currently requires:

- the solver to use `createInitialState(...)` and `dispatchGameAction(...)` as the engine authority;
- candidate final scaffold shapes, terrain-assisted variants, platform regions, stockpile grouping, temporary recovery, and alternative candidate plans;
- canonical state keys that treat blocks as interchangeable;
- failure-signature dominance pruning;
- replayable raw actions for every `SOLVED` result;
- no per-level hardcoded action lists or board mutations;
- solver validity for current canonical levels 10, 13, and 14 to return `SOLVED`.

`PLAN-0004` currently says Task 4E must run solver validity on levels 10, 13, 14, and 11-20, capture diagnostics, and stop for a Change Request when an unproven result requires solver-contract change rather than fixture transcription.

`PLAN-0004` Task 5 requires `tests/fixtures/level_solutions.json` to contain exactly one replayable solution entry per level ID `1..20`. Because levels 17-20 remain solver-unproven and no manual trace capture path exists, Task 5 cannot complete cleanly under the current plan.

## Proposed change

Harden `SPEC-0004` and `PLAN-0004` for a trace-informed endgame solver reset. This supersedes only the solver-strategy portions of CR-0010 that assume terrain-assisted final scaffold planning plus local carry-up heuristics are enough for levels 17-20. It does not discard the working solver scaffolding.

Preserve:

- no-dependency local solver/analyzer tooling;
- engine-backed action replay;
- canonical state keys;
- compact default output and `--debug-trace`;
- existing replay fixture and solution evidence harness;
- current benchmark gates for levels 10, 13, and 14;
- current level 16 solved status.

Add manual trace capture as evidence and diagnostics:

- Add a dev-facing recorder in the frontend/debug layer.
- User presses `Record`, plays the level normally, and recording stops automatically when `state.status === "completed"`.
- The recorder captures only valid forward gameplay actions for solution evidence.
- `undo`, `reset`, or level change while recording invalidates and stops the trace.
- On completion, the UI attempts to copy trace JSON automatically.
- If clipboard copy fails, the UI keeps the JSON visible and selectable and provides Copy and Download controls.
- The trace export must be replay-valid before it can be trusted or converted into a `tests/fixtures/level_solutions.json` entry.

Add trace macro analysis:

- Analyze replay-valid traces into compact generic phases: collect, stage, build temporary access, climb to platform, recover temporary blocks, transfer blocks between regions, build final scaffold, and complete goal approach.
- Report planner gaps such as `missing_transfer_goal`, `missing_recovery_check`, `missing_final_build_readiness`, or `missing_region_staging`.
- Treat analyzer output as design evidence, not executable solver instructions.

Add a trace-to-solver feedback contract:

- Trace analyzer output must include solver-facing gap recommendations that can be turned into generic solver behavior.
- Each recommendation must name the observed phase sequence, required region transfers, temporary scaffold pattern, recovery point, final scaffold build-order clue, missing planner capability, and proposed generic solver operator or invariant.
- Recommendations must be compact and actionable; they must not include full raw search trees, large rejected-state lists, or per-level move scripts.
- Trace decoding must be order-agnostic at the strategic layer. The analyzer may use chronological actions to prove legality and identify phases, but solver-facing recommendations must be expressed as strategic constraints, resource transfers, region readiness checks, scaffold dependencies, and recovery requirements.
- Trace-derived recommendations must not require the solver to reproduce the human action order.
- Each accepted solver behavior change motivated by a trace must include the bad solver behavior it replaces, the decoded trace pattern that motivated the change, the generic operator/invariant/scoring rule added, a regression test proving the solver no longer repeats that bad behavior without reading the trace, and replay validation proving emitted actions remain legal engine actions.
- The default validity solver must not consume trace exports during solver runs.
- Trace output is development evidence for implementing generic operators, invariants, and scoring rules; it is not a hidden level solution source.
- A solver change is accepted only when it solves or diagnoses levels through engine-certified planning without reading the trace that motivated the change.

Add region-logistics planning to the solver:

- The solver must plan from goal requirements backward to stockpile, staging, transfer, temporary-access, recovery, and final-build readiness needs before decomposing the plan into raw actions.
- Trace-derived recommendations may improve this backward-planning model, but must not replace it with chronological trace imitation.
- Derive platform/yard regions from terrain and reachable surfaces.
- Classify stockpiles per region.
- Classify blocks as free, covered, supporting, staged, temporary, committed, recoverable, or stranded.
- Add transfer goals such as "stage N blocks from region A to region B".
- Add temporary access scaffolds with explicit recovery checks.
- Add final-build readiness checks before committing final scaffold blocks.
- Continue to certify every accepted macro through raw engine replay.

Add anti-overfit rules:

- The default validity solver must not read manual trace files.
- Manual traces may become replay evidence or diagnostic input only.
- Solver behavior learned from a trace must become a generic operator, invariant, or scoring rule.
- If level 17 solves only when a trace is present, the solver still fails this CR.
- No per-level raw action arrays, board mutations, or trace-specific shortcuts may be added to `tools/solve-levels.mjs`.

Make level 17 the first endgame benchmark:

- Existing benchmark levels 10, 13, and 14 must remain `SOLVED`.
- Level 16 must remain `SOLVED`.
- Level 17 must return `SOLVED` with replayable raw actions without reading a manual trace.
- At least one of levels 18-20 should return either `SOLVED` or a precise planner-gap diagnostic useful for a follow-up CR.

## Why this is necessary

Implementation cannot continue cleanly because Task 5 requires replayable solution evidence for levels 1-20, while the current solver cannot produce replayable actions for levels 17-20 and the app cannot yet capture a manual solution trace.

Continuing to add local scaffold or carry-up heuristics risks repeating the same implementation loop. The current solver is good enough to prove construction through level 16, but levels 17-20 need logistics concepts that are not explicit in the current spec/plan. A trace-informed reset gives the project a way to observe known-good human solutions without turning those traces into hardcoded solver behavior.

This change also protects future level design. The goal is not merely to solve one current level; it is to build a tool that can validate and improve future construction-heavy levels by reporting actionable planner gaps.

## Impact

- Scope:
  - Add dev-facing manual trace capture.
  - Add replay validation for manual trace exports.
  - Add trace macro analysis.
  - Add trace-to-solver feedback recommendations that describe generic planner gaps without becoming level-specific solver inputs.
  - Add strategic, order-agnostic trace decoding so recommendations push the solver toward better planning behavior rather than human move-order imitation.
  - Add region-logistics planner requirements and level 17 endgame benchmark.
  - Continue solution evidence capture after trace and planner contracts are hardened.
- Files:
  - Update `docs/specs/SPEC-0004-level-expansion-pipeline.md`.
  - Update `docs/plans/PLAN-0004-level-expansion-pipeline.md`.
  - Continue implementation in `tools/solve-levels.mjs`.
  - Add or update frontend trace recorder files, likely `frontend/js/app.js`, `frontend/js/ui.js`, `frontend/index.html`, and `frontend/style.css`, or a focused new `frontend/js/trace-recorder.js`.
  - Add or update JS tests under `tests/js/`, likely a trace-recorder test and analyzer/solver tests.
  - Continue updating `tests/fixtures/level_solver_expectations.json`.
  - Continue updating `tests/fixtures/level_solutions.json` only with replay-valid entries.
  - Update `docs/status/CURRENT_STATE.md`.
  - Update `docs/handoff/` only if the work remains blocked or needs restart context.
- Tests:
  - Trace recorder starts empty for the selected level.
  - Valid actions append during recording.
  - Completion auto-stops recording and produces trace JSON.
  - Clipboard failure fallback leaves JSON visible/selectable and downloadable.
  - `undo`, `reset`, and level change invalidate recording.
  - A recorded trace for a small known level replays through `dispatchGameAction(...)`.
  - Trace macro analyzer reports action count, pickups, placements, regions touched, staged blocks, temporary blocks used/recovered, and final scaffold commitment point.
  - Trace macro analyzer reports at least one solver-facing gap recommendation with an observed phase sequence, missing planner capability, and proposed generic operator or invariant.
  - Trace macro analyzer recommendations are strategic/order-agnostic: tests must assert they name region transfers, readiness checks, scaffold dependencies, or recovery requirements rather than a human move-order script.
  - Trace-motivated solver behavior changes include regression tests naming the replaced bad behavior and proving the solver no longer repeats it without reading trace exports.
  - Solver validity runs prove they do not read trace exports as input.
  - Solver planning tests prove the solver derives final goal/scaffold requirements first, works backward to stockpile/staging/recovery requirements, and only then certifies a forward engine-action replay.
  - Solver still solves levels 10, 13, 14, and 16.
  - Solver solves level 17 without reading a manual trace.
  - Levels 18-20 either solve or emit precise planner-gap diagnostics.
  - `node tests/js/run-tests.mjs` remains the final JS gate once solution coverage is complete.
- Docs:
  - Harden `SPEC-0004`.
  - Harden `PLAN-0004`.
  - Update `CURRENT_STATE`.
  - Keep `docs/superpowers/specs/2026-06-12-trace-informed-endgame-solver-design.md` as design reference, not the accepted implementation contract.
- Dependencies:
  - None.
- Security/privacy:
  - Trace recorder is local/dev-facing and captures gameplay action sequences only.
  - Clipboard use must have visible fallback; no network or remote save behavior is authorized.
- Token/context impact:
  - Medium. The CR adds a new frontend trace capture slice plus solver planning model changes, but should reduce repeated failed solver iterations by making human strategy observable.
- Timeline/PR size:
  - Medium-to-large. The plan should likely split into two implementation checkpoints: trace capture/replay/analyzer first, then region-logistics solver reset for level 17.

## Options considered

1. Accept: add trace capture, replay validation, trace macro analysis, and region-logistics planning; use level 17 as the first endgame benchmark while preserving existing solved benchmarks.
2. Reject: continue extending the current scaffold/carry-up heuristics and risk another failed pass on levels 17-20.
3. Defer: rely on manual validation and fixture transcription later, leaving the solver unable to validate future endgame levels and leaving Task 5 blocked.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-12
Rationale: Project owner approved the trace-informed endgame solver reset so SPEC-0004 and PLAN-0004 can be hardened before implementation resumes.
