# HANDOFF-0008: PLAN-0004 CR-0010 Solver Progress

Date: 2026-06-11
Branch: `codex/application-scaffold`
Plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`

## Current Boundary

PLAN-0004 CR-0010 implementation resumed through Task 4E/Task 5 fixture transcription for levels 11-15.

The construction-ledger solver now proves the required CR-0010 benchmark levels:

- Level 10: `SOLVED`, `statesExpanded=486`, `solutionLength=63`.
- Level 13: `SOLVED`, `statesExpanded=278090`, `maxQueueSize=23652`, `solutionLength=262`.
- Level 14: `SOLVED`, `statesExpanded=2456`, `solutionLength=149`.

The same generic path also returns `SOLVED` for:

- Level 11: `statesExpanded=138698`, `solutionLength=103`.
- Level 12: `statesExpanded=1380`, `solutionLength=92`.
- Level 15: `statesExpanded=103`, `solutionLength=61`.
- Level 16: `statesExpanded=12626`, `solutionLength=163`.

Levels 17-20 remain `UNPROVEN_WITHIN_LIMIT` from `construction_ledger_search`; this is a solver/tooling gap, not level invalidity. The project owner has confirmed all current levels are manually solvable.

`tests/fixtures/level_solutions.json` now includes replay-verified solver actions for levels 1-15. Level 16 has a replayable solver action list but was not copied into the solution fixture in this slice because the explicit resume request asked to copy levels 11-15 first.

## Files Changed In Current Worktree

- `tools/solve-levels.mjs`
- `tests/js/solver.test.js`
- `tests/fixtures/level_solver_expectations.json`
- `tests/fixtures/level_solutions.json`
- `docs/status/CURRENT_STATE.md`
- `docs/handoff/HANDOFF-0008-plan-0004-cr-0010-solver.md`

`.superpowers/brainstorm/` remains untracked local artifact data and should not be used as implementation input or committed unless explicitly requested.

## Important Implementation Notes

- `createStateKey(...)` now canonicalizes blocks by sorted row/col positions and ignores engine-internal block IDs.
- `expandLegalActions(...)` centralizes engine-backed legal transition expansion and drops `invalid: true` actions.
- The construction solver uses parent-linked nodes, scaffold-fill progress, remote-stockpile penalty, terrain-assisted scaffold/access targets, and final movement replay through `dispatchGameAction(...)`.
- Solver outputs for solved benchmark levels include construction macro steps whose raw actions flatten to the final `actions` list.

## Verification Snapshot

Passed:

```bash
node --input-type=module -e "import { run } from './tests/js/solver.test.js'; run(); console.log('ok solver');"
node tools/solve-levels.mjs --mode validity --level 10 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 14 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 16 --max-states 1000000
node --input-type=module -e "<replay levels 1-15 from tests/fixtures/level_solutions.json>"
```

Known failing/incomplete:

```bash
node tools/solve-levels.mjs --mode validity --level 17 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 18 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 19 --max-states 1000000
node tools/solve-levels.mjs --mode validity --level 20 --max-states 1000000
node tests/js/run-tests.mjs
```

`node tests/js/run-tests.mjs` still fails because `tests/fixtures/level_solutions.json` covers only levels 1-15.

## Next Action

Resume PLAN-0004 at Task 4E/Task 5:

1. Decide whether to copy the now-solved level 16 action list into `tests/fixtures/level_solutions.json`.
2. Continue improving construction-ledger carry-up reservation/final approach logic for levels 17-20.
3. Do not edit current level geometry from solver failure alone.
4. Continue to Task 5 exact solution coverage once levels 17-20 have replayable actions.
