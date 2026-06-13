# CR-0009: Physics-Certified Macro Solver

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Related change requests: `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0008-level-13-solver-deficit-redesign.md`

## Trigger

CR-0008 fixed the hard Level 13 block deficit by adding exactly three supported, reachable lower-yard blocks. Post-CR-0008 resource validation passes and Level 13 no longer fails preflight:

```json
{
  "levelId": 13,
  "availableBlocks": 15,
  "requiredFinalScaffoldBlocks": 15,
  "deficitBlocks": 0
}
```

The project owner then manually completed Level 13 in roughly 230 moves, proving the current geometry can be solved by a human under accepted mechanics. The current solver still fails to produce a replayable Level 13 solution within the accepted `1000000` state budget:

```json
{
  "levelId": 13,
  "status": "UNSOLVABLE_EXHAUSTED",
  "reason": "LEVEL_SOLVER_LEVEL13_UNPROVEN",
  "statesExpanded": 1000000,
  "actions": []
}
```

Implementation review shows the current solver is still effectively a raw action search. `planLevel(...)` emits diagnostic subgoals, but `searchLevel(...)` does not execute those subgoals as construction macros. The low-level search scores mostly player distance to the goal, which is too weak for long scaffold-building puzzles where useful progress often moves away from the goal temporarily.

## Current accepted spec/plan says

CR-0007 and PLAN-0004 require:

- deterministic no-dependency solver/analyzer tooling;
- preflight lower-bound checks;
- goal-directed planning;
- exact-state deduplication;
- failure-signature dominance pruning;
- actionable redesign recommendations;
- Level 1 to solve quickly;
- current Level 13 to produce decisive evidence before solution capture continues;
- emitted action lists to replay through the existing engine.

The accepted plan allows a goal-directed planner, but the current implementation does not yet make construction macros the primary search unit. It still tries to discover long construction behavior from raw `moveLeft`, `moveRight`, `jump`, and `interact` actions.

## Proposed change

Replace the current raw-action Level 13 solver approach with a physics-certified macro construction solver.

The solver may reason in macro goals, but every macro must be decomposed into legal engine actions through `createInitialState(...)` and `dispatchGameAction(...)` before it can be accepted. A macro may propose a target state, but only replayed engine actions can commit it.

Required macro operators:

- identify supported scaffold target cells;
- classify reachable, free, covered, useful, temporary, recoverable, stranded, and final-committed blocks;
- collect a legal free block;
- place a supported block at a target cell;
- build a stair or scaffold one supported cell at a time;
- climb to a work platform;
- recover temporary blocks when legal;
- complete the final goal approach.

Hard physics rules:

- no floating blocks;
- no teleporting blocks;
- no pickup of a block with another block directly above it;
- no placements that would fail `dispatchGameAction(...)`;
- no accepted macro result unless the actual engine-replayed state matches the macro's promised state after gravity settles.

Implementation direction:

- Keep `tools/solve-levels.mjs` no-dependency and local-only.
- Split solving into two layers:
  - a strategic macro planner that searches construction states, scaffold targets, work platforms, recoverable temporary blocks, and final committed structure;
  - a tactical movement executor that finds raw action sequences for one macro step and verifies them through the real engine.
- Make macro output visible in solver JSON, including attempted macro steps, accepted macro steps, rejected macro steps, failure reason, and the final raw action replay.
- Preserve existing raw-action replay as the final proof, not as the main planning strategy.
- Correct Level 13 budget-exhaustion reporting so budget exhaustion remains `UNPROVEN_WITHIN_LIMIT` or a specific solver-plan failure, not a false impossibility signal.

## Why this is necessary

PLAN-0004 cannot complete cleanly while Level 13 is manually solvable but solver-unproven. Adding more blocks under CR-0008 is no longer justified: the resource deficit is gone and the project owner has confirmed the level works manually.

The current solver is not aligned with the intended product behavior. A 230-move construction solution is too deep for unguided raw-action search, but it should be tractable as a shorter sequence of physics-certified construction macros.

Without this change, the project either depends on manual validation for levels that the solver should prove, or keeps generating level-design Change Requests for solver architecture gaps.

## Impact

- Scope: solver/analyzer architecture and solver tests only; no level geometry changes are authorized by this CR.
- Files: likely `tools/solve-levels.mjs`, `tests/js/solver.test.js`, `tests/fixtures/level_solver_expectations.json`, `docs/status/CURRENT_STATE.md`, and possibly a focused handoff.
- Tests: add tests for macro operators, tactical executor verification, Level 13 solved replay, Level 1 speed, invalid macro rejection, and output diagnostics.
- Docs: update `docs/status/CURRENT_STATE.md`; update `docs/repo-map.md` only if commands or status wording change.
- Dependencies: none.
- Security/privacy: none.
- Token/context impact: medium; solver internals are more detailed, but scope stays within one local tool and focused tests.
- Timeline/PR size: medium; the solver should be refactored around macro planning rather than patched with one-off heuristics.

## Options considered

1. Accept: implement a physics-certified macro construction solver and keep the engine as the final authority for every macro.
2. Reject: keep raw-action search and rely on manual validation for Level 13, which conflicts with the intended solver product behavior.
3. Defer: continue other level solution capture first, leaving Level 13 blocked and risking repeated solver failures on later construction-heavy levels.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner accepted replacing the current raw-action Level 13 solver approach with a physics-certified macro construction solver. Macro assumptions are allowed only when they can be decomposed into legal engine actions and verified through `createInitialState(...)` and `dispatchGameAction(...)`.
