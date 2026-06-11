# CR-0007: Deterministic Solver and Design Analyzer

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`

## Trigger

PLAN-0004 is stopped at solution evidence for levels 11-20. CR-0006 added stack-stability physics and a deterministic resource-analysis fixture, but manual review showed the resource check still does not model the actual construction problem strongly enough.

The current resource analysis only evaluates hand-authored row-to-row rise segments. If the manifest under-declares the final scaffold or access problem, validation passes even when the level is still under-resourced. Level 13 remains the active example: manual reasoning indicates the current CR-0006 revision is still short of the blocks needed to complete the intended scaffold. The validator should catch that before an exhaustive or heuristic solver wastes time.

Implementation also revealed that ad hoc search is not durable enough for the level-expansion workflow. A search that finds a solution is useful, but a search that times out does not prove impossibility, does not produce reusable reports, and does not tell the level author how to improve the puzzle.

## Current accepted spec/plan says

SPEC-0004 currently says:

- levels 6-20 must be construction-first scaffold puzzles;
- levels 6-20 must have replayable solution evidence;
- resource analysis is a deterministic design diagnostic;
- JS replay remains the final completion proof;
- procedural generation, AI-assisted generation, production solver search, formal SAT/pathfinding tooling, and new production dependencies are non-goals.

PLAN-0004 currently says:

- create `tests/fixtures/level_solutions.json` with one replay per level ID `1..20`;
- create `tests/js/level-solutions.test.js` to replay every solution through the existing engine;
- stop if a candidate cannot be completed through the existing engine;
- stop before any dependency, network, generator, solver dependency, or framework work;
- resource analysis runs before solution replay but is not itself a solver.

The accepted documents do not define:

- a durable deterministic solver tool;
- hard preflight checks that prevent search when a level is mathematically under-resourced;
- a goal-directed planning layer that chooses useful scaffold/stockpile targets before searching;
- a solver status vocabulary that distinguishes solved, preflight-failed, exhausted, and unproven states;
- a design analyzer that reports player-facing difficulty signals;
- actionable solver recommendations for level redesign.

## Proposed change

Revise SPEC-0004 and PLAN-0004 before continuing PLAN-0004 implementation.

Add a no-dependency offline solver pipeline under `tools/` that uses the real JavaScript engine rules from `frontend/js/engine.js` and never mutates level files or solution fixtures automatically.

The pipeline has four stages:

1. Preflight checks:
   - Run existing structural level validation.
   - Compute hard lower bounds before state search.
   - Fail quickly when the final committed scaffold alone requires more blocks than the level provides.
   - Report temporary access scaffold estimates separately as diagnostics, not as hard additive failures when blocks may be recoverable.
   - Report whether block reuse is required.

2. Goal-directed planner:
   - Analyze the level before state search so the solver is not an unguided brute-force walker.
   - Derive the goal tile position and all plausible goal approach cells from which the player can complete the level under accepted jump/move/gravity rules.
   - Identify the final shelf or platform supporting the goal approach.
   - Generate candidate final scaffold shapes that can put the player on a valid goal approach cell.
   - Generate scaffold candidates from multiple plausible origins:
     - nearest existing platform edge;
     - lower ground under or near the goal shelf;
     - reachable workbench/platforms;
     - existing terrain shelves that reduce the final scaffold height.
   - Score final scaffold candidates before search using deterministic factors:
     - fewer final committed blocks;
     - shorter distance from reachable stockpiles;
     - fewer stranded/covered blocks;
     - fewer blocked pickup paths;
     - higher chance that temporary access blocks can be recovered;
     - alignment with required final approach side.
   - Identify stockpile regions by grouping blocks connected through currently reachable terrain/platform regions.
   - Identify platform regions and platform ordering candidates, such as ground stockpile to workbench, workbench to upper shelf, upper shelf to final scaffold.
   - Generate ordered subgoals for each candidate plan:
     - move adjacent to a useful free block;
     - pick up that block;
     - carry it toward the current scaffold target cell;
     - place it;
     - climb, recover, or reuse blocks when a temporary scaffold has served its purpose;
     - continue until the final approach scaffold exists.
   - Preserve alternative candidate plans instead of choosing only one. If the best-scored scaffold/stockpile order fails, the solver must try the next best candidate before returning `UNPROVEN_WITHIN_LIMIT`.
   - Emit planner diagnostics in solver output: goal approach cells, candidate scaffold count, chosen candidate rank, stockpile regions, planned subgoals, and rejected plan reasons.

3. Validity solver:
   - Search legal states through `createInitialState(...)` and `dispatchGameAction(...)`.
   - Track player row/col, facing, carried block, uncarried block positions, and level status.
   - Allow block reuse naturally through state transitions.
   - Use only `moveLeft`, `moveRight`, `jump`, and `interact`.
   - Exclude `reset`, `undo`, and `selectLevel`.
   - Use the goal-directed planner output as its primary search guide.
   - Explore states with a deterministic priority queue, not raw action-order depth-first wandering.
   - Score states against the active subgoal and candidate plan:
     - closer player distance to target block or target placement cell;
     - carrying a block needed by the active scaffold target;
     - more planned scaffold cells filled;
     - fewer useful blocks stranded or buried under other blocks;
     - closer distance to the goal approach after final scaffold progress;
     - lower repeated no-progress action count.
   - Track a canonical state key containing player row/col, facing, carried block identity or none, sorted uncarried block IDs/positions, and status.
   - Skip a state when the same key has already been reached with an equal or lower action count.
   - Penalize no-progress cycles such as repeatedly picking up and placing the same block without improving a target, while still allowing those actions when they lead to a different world state.
   - Stop as soon as one valid completion is found.
   - Print candidate replay actions for a human/agent to copy into `tests/fixtures/level_solutions.json`.
   - Do not auto-write the fixture.

4. Design analyzer:
   - Run only for levels that pass validity or for explicitly requested diagnostic cases.
   - Report difficulty signals based on alternate paths and state exploration.
   - Treat true irreversible dead ends as valid puzzle-design signals, not automatic defects.
   - Produce actionable level-redesign recommendations.
   - Do not mutate level data.

The solver should return stable statuses:

| Status | Meaning |
|---|---|
| `SOLVED` | A concrete action sequence completed the level through accepted mechanics. |
| `FAILED_PREFLIGHT` | A hard deterministic lower-bound check failed before state search. |
| `UNPROVEN_WITHIN_LIMIT` | Search budget ended without a solution and without exhausting the bounded state space. |
| `UNSOLVABLE_EXHAUSTED` | The bounded state space was fully searched with no solution. |
| `ANALYZED` | Design analyzer produced metrics/recommendations for a solved or diagnostic level. |

Suggested command shape:

```bash
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000
node tools/solve-levels.mjs --mode validity --all --max-states 1000000
node tools/solve-levels.mjs --mode analyze --level 13 --max-states 2000000
```

Suggested validity output:

```json
{
  "levelId": 13,
  "status": "FAILED_PREFLIGHT",
  "reason": "FINAL_SCAFFOLD_BLOCK_DEFICIT",
  "availableBlocks": 12,
  "requiredFinalScaffoldBlocks": 15,
  "reuseRequired": true,
  "actions": []
}
```

Suggested solved output:

```json
{
  "levelId": 11,
  "status": "SOLVED",
  "statesExpanded": 48291,
  "planner": {
    "goalApproachCells": [{ "row": 4, "col": 18 }],
    "candidateScaffolds": 4,
    "chosenCandidateRank": 1,
    "stockpileRegions": 3,
    "subgoals": [
      "collect-free-block",
      "place-final-scaffold-base",
      "recover-temporary-access-blocks",
      "complete-goal-approach"
    ]
  },
  "actions": ["moveRight", "jump", "interact"]
}
```

Suggested analyzer output:

```json
{
  "levelId": 18,
  "status": "ANALYZED",
  "validity": "SOLVED",
  "summary": {
    "shortestFoundActions": 142,
    "pickups": 18,
    "placements": 18,
    "uniqueBlocksUsed": 16,
    "reusedBlockCount": 7,
    "unusedBlocks": 2,
    "maxStackHeight": 5,
    "peakCommittedBlocks": 17
  },
  "difficultySignals": {
    "irreversibleDeadEndsFound": 12,
    "lateDeadEndsFound": 8,
    "nearGoalDeadEndsFound": 3,
    "resourceStrandingDeadEnds": 5,
    "solutionOrderSensitivity": "high"
  },
  "recommendations": [
    {
      "type": "increase_order_dependency",
      "priority": "medium",
      "reason": "Easiest found solution does not require visiting the upper worksite.",
      "action": "Move required blocks onto the worksite or raise the final shelf so the worksite becomes necessary."
    }
  ]
}
```

Actionable recommendations are required. They should translate solver/analyzer evidence into concrete level-design levers such as:

- add reachable blocks;
- remove surplus blocks;
- move a stockpile;
- raise or lower a shelf;
- add or remove terrain that forces a platform order;
- make block reuse necessary;
- reduce an unintended bypass route;
- rerun validity after the edit.

Recommendations are advisory. A human/agent still chooses and applies geometry changes through the normal Change Request/spec/plan flow.

### Goal-directed solver thought process

The accepted spec/plan update should describe the solver's reasoning in enough detail that implementation does not collapse into unguided brute force.

For each level, the solver should reason in this order:

1. Parse the settled initial state through `createInitialState(...)` so gravity and stack-stability match actual play.
2. Locate `G` and enumerate legal completion approach cells:
   - current goal cell if the player can stand there;
   - adjacent cells that can move or jump into the goal;
   - shelf-edge cells that allow the final diagonal jump;
   - reject approach cells blocked by terrain or unreachable by any scaffold candidate.
3. For each approach cell, calculate the minimum final scaffold height needed from plausible build origins.
4. Produce final scaffold candidates, including triangular stairs and terrain-assisted variants.
5. Identify currently reachable floor/platform regions without moving blocks.
6. Group blocks by region and classify each block:
   - immediately free and reachable;
   - reachable only after a temporary scaffold;
   - currently covered/supporting another block;
   - likely recoverable after use;
   - likely stranded if used too early.
7. Build candidate subgoal plans that connect stockpile regions to scaffold targets:
   - gather from the closest useful free block first;
   - prefer target cells that unlock higher work positions;
   - prefer placements that remain pickup-accessible if later reuse is likely;
   - include explicit recovery subgoals for temporary scaffolds when final block supply requires reuse.
8. Score candidate plans and explore the best one first.
9. If a plan fails or reaches its local budget, retain its diagnostics and continue with the next candidate plan.
10. Report the selected plan and any rejected plans so level authors understand why the solver moved in a particular direction.

This planner must remain deterministic. Same input level, contract, options, and budget must produce the same status, planner ranking, metrics, and first solution.

### Behavior and performance validation

The solver is not acceptable if it technically works but wanders for a long time on simple levels. SPEC-0004 and PLAN-0004 should add explicit behavior/performance gates.

Required validation cases:

- Level 1 must return `SOLVED` quickly with a small state count. The exact threshold should be set in the revised plan after implementation benchmarks, but the initial target should be comfortably under 500 expanded states and under 1 second on the local development machine.
- Known solved levels 2-10 must return `SOLVED` within deterministic per-level budgets.
- The current under-resourced level 13 scenario must return `FAILED_PREFLIGHT` without entering state search when final scaffold lower-bound math exceeds available blocks.
- A synthetic tiny under-resourced fixture must return `FAILED_PREFLIGHT`.
- A synthetic tiny solved fixture must return `SOLVED` and its action list must replay through `dispatchGameAction(...)`.
- A synthetic tiny bounded unsolvable fixture should return `UNSOLVABLE_EXHAUSTED` if a small complete state space can be constructed without expanding scope.
- Re-running the same solver command twice must produce the same status, solution action sequence, state count, planner chosen candidate rank, and recommendation types.
- The solver output must include planner diagnostics proving goal-directed behavior:
  - goal approach cells are listed;
  - candidate scaffold count is greater than zero for scaffold levels;
  - chosen candidate rank is present;
  - active subgoals are listed;
  - rejected candidate reasons are listed when a candidate fails.
- A no-progress stress fixture should prove the solver skips repeated equivalent pickup/place cycles through canonical state-key deduplication.

If these gates cannot be met for simple levels, implementation should stop and revise the solver plan rather than accepting a slow brute-force tool.

## Why this is necessary

PLAN-0004 cannot complete cleanly because solution evidence for levels 11-20 is currently missing, and the existing resource analysis can pass levels whose actual construction problem remains under-resourced or order-dependent.

Manual validation alone does not scale to a 20-level set, let alone future expansion toward 100 levels. The project needs deterministic tooling that can prove at least one solution exists, avoid wasteful search when hard lower bounds fail, and provide useful redesign evidence when a level is possible but too easy, too leaky, or under-expressive.

The key design distinction is:

- validity solver: proves that at least one accepted-mechanics solution exists;
- design analyzer: helps determine whether the level creates meaningful puzzle difficulty.

Difficulty for this game is not primarily block count. It comes from commitment pressure: actions that look useful but strand resources, late irreversible dead ends, near-goal failures, required block reuse, and order-sensitive platform/resource decisions. The analyzer must report those signals so the level author can intentionally tune the puzzle.

## Impact

- Scope:
  - Adds deterministic offline solver tooling.
  - Adds preflight hard lower-bound checks for scaffold-resource impossibility.
  - Adds a goal-directed planner that derives goal approaches, scaffold candidates, stockpile regions, and ordered subgoals before search.
  - Adds design-analysis metrics and actionable recommendations.
  - Revises SPEC-0004 and PLAN-0004 to allow local solver tooling while still prohibiting new solver dependencies or runtime solver behavior.
  - May lead to a follow-on level geometry CR for level 13 or other levels that fail preflight/validity.
- Files:
  - `docs/specs/SPEC-0004-level-expansion-pipeline.md`
  - `docs/plans/PLAN-0004-level-expansion-pipeline.md`
  - `tools/solve-levels.mjs`
  - `tests/js/solver.test.js` or equivalent dependency-light JS test
  - `tests/fixtures/level_solver_expectations.json` or equivalent fixture
  - `tests/fixtures/level_solutions.json`
  - `tests/js/level-solutions.test.js`
  - `tests/js/run-tests.mjs`
  - `backend/app/data/levels.json` only if a later accepted level-revision CR follows
  - `docs/status/CURRENT_STATE.md`
  - `docs/handoff/`
- Tests:
  - Add tests for `FAILED_PREFLIGHT` on level 13 or a synthetic under-resourced fixture.
  - Add tests proving known solved levels return `SOLVED`.
  - Add tests that solver output actions replay through `dispatchGameAction(...)`.
  - Add tests for deterministic output ordering/statuses.
  - Add behavior/performance tests proving level 1 solves quickly with a small state count.
  - Add tests proving planner diagnostics include goal approach cells, candidate scaffolds, chosen candidate rank, stockpile regions, and subgoals.
  - Add tests proving canonical state-key deduplication prevents repeated no-progress pickup/place cycles from dominating search.
  - Add analyzer report tests for metrics and recommendation shape.
  - Re-run JSON validation, level validators, backend tests, and JS tests.
- Docs:
  - Update SPEC-0004 and PLAN-0004 before implementation resumes.
  - Update `docs/repo-map.md` commands after the solver lands.
  - Update `docs/status/CURRENT_STATE.md` and handoff with the new stop/resume point.
- Dependencies:
  - None. Use Node built-ins and existing ES modules only.
- Security/privacy:
  - No new secrets, network access, runtime API, player data, or storage impact.
- Token/context impact:
  - High. Solver/analyzer design must be precise to avoid accidental scope expansion, and later implementation may require careful state-space/performance tuning.
- Timeline/PR size:
  - Medium to large. This should be implemented as a focused tooling slice before further level redesign.

## Options considered

1. Accept:
   - Add deterministic preflight, goal-directed planning, validity solver, design analyzer, behavior/performance gates, and actionable recommendations.
   - Resume PLAN-0004 only after SPEC-0004/PLAN-0004 are hardened for this tooling.
   - This gives the project scalable proof and redesign feedback.
2. Reject:
   - Continue with manual solution capture plus the current resource analysis.
   - This keeps the current plan smaller but leaves level validity dependent on manual trial-and-error and weak diagnostics.
3. Defer:
   - Finish levels 11-20 manually now and build solver tooling later.
   - This risks baking in under-resourced or too-simple levels and repeating the same problem in future batches.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner accepted deterministic preflight, goal-directed planning, validity solving, design-analysis metrics, behavior/performance gates, and actionable redesign recommendations before PLAN-0004 solution capture continues.
