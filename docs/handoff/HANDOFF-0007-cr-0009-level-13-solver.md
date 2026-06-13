# HANDOFF-0007: CR-0009 Level 13 Solver Gate

Date: 2026-06-11

## State

PLAN-0004 is still blocked at the current-level-13 solver gate. The project owner has manually confirmed levels 1-20 are solvable, and level 13 is the known-solvable construction benchmark. Solver output must therefore become `SOLVED` with replayable raw actions before PLAN-0004 can continue to solution fixture capture.

## Implemented in this attempt

- `tools/solve-levels.mjs` now has compact/default layered output fields: `phase`, `failedInvariant`, `failureCategory`, `cause`, capped `topRecommendations`, compact `summary`, and `debugTraceAvailable`.
- CLI parsing accepts `--debug-trace`.
- Macro helper exports were added for the CR-0009 operator names, plus `createDefaultReport(...)` and `createDebugTrace(...)`.
- Current level 13 still fails the required benchmark:

```bash
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --format json
```

Current result: `UNSOLVABLE_EXHAUSTED`, `failureCategory=TACTICAL_REPLAY_FAILED`, `failedInvariant=current_level_13_solves_with_macro_replay`, `statesExpanded=1000000`.

## Useful discovery

A scratch macro construction search repeatedly reached a nearly complete final scaffold for level 13. The hard part is not the final geometry; it is resource logistics:

- Shelf blocks can be staged to the right yard through legal engine actions.
- A 14-cell scaffold can be built with legal replay.
- The remaining top block must be carried from a reachable left-side stockpile up the scaffold after `row9,col17` and `row9,col18` are built.
- If the last recoverable block is left on the right side, it becomes impossible to carry it back up the left-to-right scaffold without disturbing committed scaffold cells.

The next solver design should explicitly model "reserve a carry-up block on the left stockpile" before committing the upper scaffold, rather than treating all free blocks as interchangeable.

## Next safest action

Revise the CR-0009 solver implementation strategy around staged stockpiles and final carry-up:

1. Stage shelf blocks and recoverable temporary blocks without committing them to final cells too early.
2. Build lower scaffold supports in a supported order.
3. Reserve at least one reachable left-side block for the final `row8,col18` placement.
4. Require each macro step to replay through `dispatchGameAction(...)`.
5. Only then rerun the Level 13 `SOLVED` gate and solution replay.
