# Construction Ledger Solver Design

Date: 2026-06-11
Status: Approved design

## Purpose

The current Level 13 solver failure is a solver-design problem, not a level-validity problem. The project owner has manually confirmed levels 1-20 are solvable, including Level 13. The next solver must therefore prove known-solvable construction puzzles through legal engine replay, then use the same machinery to evaluate and improve future levels.

The solver should be an intended-construction planner, not a general-purpose raw move searcher. It may use domain assumptions about scaffold construction, staging, stockpiles, reservations, and recoverability, but every accepted step must decompose into legal `moveLeft`, `moveRight`, `jump`, and `interact` actions replayed through `dispatchGameAction(...)`.

## Research-Informed Direction

Quality solvers avoid blind raw-action search. Useful patterns from planning and puzzle-solver literature include:

- Heuristic planners focus search with domain facts and preferred actions.
- Macro-action planners reduce search depth by planning with higher-level operations.
- Hard puzzle solvers model dead ends explicitly instead of rediscovering them through exhaustive search.
- Hierarchical planners decompose long solutions into subgoals that can be certified locally.

For this game, that points to a domain-specific construction planner with strict engine replay, not an external dependency or production/runtime solver.

## Architecture

The solver has three layers.

### Strategic Planner

The strategic planner derives an abstract construction ledger before raw action search:

- final scaffold cells needed to approach the goal;
- work platforms the player must stand on;
- stockpile regions and their reachable blocks;
- blocks reserved for late use;
- temporary blocks that must be recoverable;
- committed blocks that cannot be moved again;
- risk flags for trapped player states, covered needed blocks, and unrecoverable temporary scaffolds.

### Macro Planner

The macro planner turns a ledger into ordered construction tasks:

- gather reachable free blocks;
- stage blocks near the worksite;
- build lower scaffold cells before upper cells;
- climb to the next work platform;
- reserve a final carry-up block when the route requires it;
- recover temporary blocks only when legal;
- build the upper/final approach;
- enter the goal.

### Tactical Replay Executor

The tactical executor searches only for raw actions needed by the current macro. A macro commits only if its flattened raw action list replays through `dispatchGameAction(...)` and reaches the promised post-macro state after gravity.

Raw move search is therefore a certifier for one macro, not the primary solver strategy.

## Components

### World Model

Derive facts from the current engine state:

- supported cells;
- reachable cells;
- platform regions;
- free blocks;
- covered blocks;
- supporting blocks;
- stockpile regions;
- goal approach cells.

### Construction Ledger

Represent the intended construction plan:

- `finalScaffoldCells`;
- `stagingCells`;
- `reservedBlocks`;
- `temporaryCells`;
- `committedCells`;
- `workPlatforms`;
- `requiredCarryUpBlocks`;
- `riskFlags`.

This is the missing abstraction in the current solver. Without it, the solver treats blocks as interchangeable and can consume a block that must remain available for a late carry-up move.

### Ledger Generator

Produce candidate ledgers and rank them by:

- goal proximity;
- fewest final scaffold cells;
- reachable stockpile quality;
- enough reserved blocks for late tasks;
- recoverability of temporary blocks;
- low player-trap risk;
- low risk of covering needed blocks.

### Macro Scheduler

Convert one ledger into ordered macro tasks. For Level 13, the expected plan class is:

- stage shelf and yard blocks;
- reserve at least one left-side or otherwise carry-up-capable block;
- build lower scaffold supports;
- build middle scaffold supports;
- climb to a work platform;
- carry the reserved final block upward;
- place the final top block;
- reach the goal.

This is a reusable construction pattern, not a hardcoded Level 13 action list.

### Tactical Executor

Run bounded best-first search for one macro at a time. Macro goals are narrow, such as:

- pick up block `b7`;
- move to a work platform;
- place a carried block at `{ row, col }`;
- recover a temporary block.

### Invariant Guard

Reject a macro or ledger when it violates an invariant:

- floating placement;
- pickup of a supporting block;
- needed block covered;
- player trapped away from required future work;
- reserved block consumed early;
- temporary block not recoverable when marked recoverable;
- raw replay does not match the promised state.

### Reporter

Keep the layered solver output:

- compact default report with status, phase, failed invariant, failure category, cause, capped recommendations, and summary metrics;
- detailed `--debug-trace` with ledgers, macro steps, failed replays, pruned ledgers, candidate scoring, and raw state keys.

## Data Flow

1. Run preflight structural and resource checks.
2. Derive world facts from the settled engine state.
3. Generate candidate construction ledgers.
4. Score and rank ledgers.
5. Schedule macros from the best ledger.
6. Replay each macro tactically through the engine.
7. If a macro fails, reschedule within the ledger or try the next non-dominated ledger.
8. Return `SOLVED` only when the flattened raw action list completes the level through engine replay.

Non-solved results must identify which layer failed: preflight, ledger generation, macro scheduling, tactical replay, or final certification.

## Level 13 Benchmark

Current canonical Level 13 is the first required construction benchmark. Because it is manually known solvable, a final non-solved result means the solver is incomplete.

The solver must find a construction ledger that handles the specific resource-logistics challenge:

- some blocks can be staged to the right yard;
- lower and middle scaffold cells can be built in supported order;
- a late-use block must remain carry-up-capable;
- the solver must not consume all reachable left-side stock before the final top placement;
- the final action list must replay through `dispatchGameAction(...)`.

## Failure Model

Failure categories should expose useful design and solver levers:

- preflight failure: true resource or geometry impossibility;
- ledger failure: no abstract construction plan satisfies invariants;
- macro scheduling failure: a valid ledger cannot be safely ordered;
- tactical replay failure: a macro cannot be decomposed into legal engine actions;
- certification failure: claimed solution does not replay.

For Level 13, non-solved output should default to solver-improvement language, not geometry-redesign language.

## Testing Strategy

Tests should prove the solver is becoming more capable, not just producing better reports.

Required test classes:

- micro-fixtures for each macro operator;
- ledger tests for reserved blocks, temporary recovery, committed cells, deterministic ranking, and dominated-ledger pruning;
- tactical replay tests proving every accepted macro has replayable raw actions;
- benchmark tests for Level 1, a simple scaffold fixture, a stockpile-reservation fixture, and current Level 13;
- failure-report tests for compact default output and detailed `--debug-trace`;
- performance gates that reject global raw search as the Level 13 strategy.

The Level 13 test must fail if the solver emits a hardcoded raw action list without an associated ledger and macro trace.

## Success Criteria

- Level 1 solves quickly.
- Current Level 13 returns `SOLVED`.
- Current Level 13 actions replay to completion through `dispatchGameAction(...)`.
- Solver output includes a ledger and accepted macro trace for the Level 13 solution.
- Default output remains compact and design-facing.
- Debug trace exposes enough evidence to improve future level design.
- No new dependencies, network access, production runtime solver, or engine-physics shortcuts are introduced.
