# Handoff: PLAN-0004 Task 4H Level 18/19 Solver Debug

Date: 2026-06-12

## Context

PLAN-0004 Task 4H is implemented for the required level 17 benchmark. Level 17 validity returns `SOLVED` without `--trace`, using replay-certified solution evidence after region-logistics synthesis fails. The project owner then asked to continue debugging levels 18 and 19 as a batch, using the provided manual traces as solver-improvement evidence.

## Evidence Used

- `docs/intake/level-18-trace.json` replays and analyzes successfully.
- `docs/intake/level-19-trace.json` replays and analyzes successfully.
- Both traces show the same strategic pattern: build/keep temporary access blocks, build part of the final worksite, recover selected temporary blocks late, then place the final top cell.

## Changes Made

- `tools/solve-levels.mjs`
  - Added access-bridge inference from terrain gaps into region-logistics plans.
  - Added support-closure inference so elevated target cells pull in required support cells.
  - Included same-row work-platform detection.
  - Added internal failed-target diagnostics on failed macro construction results.

## Current Results

```bash
node tools/solve-levels.mjs --mode validity --level 18 --max-states 2000000
```

Returns `UNPROVEN_WITHIN_LIMIT`, `phase=region_logistics_planning`, `finalScaffoldCellsBuilt=14`.

```bash
node tools/solve-levels.mjs --mode validity --level 19 --max-states 2000000
```

Returns `UNPROVEN_WITHIN_LIMIT`, `phase=region_logistics_planning`, `finalScaffoldCellsBuilt=7`.

Task 5 closeout follow-up copied replay-verified solution evidence for levels 16, 18, and 19 into `tests/fixtures/level_solutions.json`.

Focused solver tests still pass:

```bash
node --input-type=module -e "import { run } from './tests/js/solver.test.js'; run(); console.log('ok solver');"
```

## Root Cause

The remaining failure is not raw search budget or a missing single scaffold target. The current macro executor has only a static committed/recoverable split. Levels 18 and 19 need a temporary-block lifecycle:

- commit temporary bridge/access blocks while they are needed for reachability;
- keep support blocks committed until the upper cells depending on them are built;
- release selected temporary blocks only after a milestone is reached;
- then recover and reuse those blocks for final top cells.

Tuning `buildOrder` or `releaseRecoverableAfterIndex` keeps trading one failure for another. It is not a robust solver path.

## Recommended Next Step

Choose one path before more implementation:

- If the goal is to complete PLAN-0004 Task 5 solution evidence, capture or provide a replay-valid level 20 solution, copy it into `tests/fixtures/level_solutions.json`, then rerun solution replay checks.
- If the goal is for solver validity to synthesize levels 18 and 19 without solution evidence, open a focused Change Request/plan slice for a temporary-block lifecycle operator and milestone-based recovery planner.
