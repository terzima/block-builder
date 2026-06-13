# CR-0008: Level 13 Solver Deficit Redesign

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`

## Trigger

PLAN-0004 Task 4C/4D added the deterministic solver/analyzer required by CR-0007. The solver now gives current canonical level 13 a decisive preflight result instead of timing out:

```json
{
  "levelId": 13,
  "status": "FAILED_PREFLIGHT",
  "reason": "FINAL_SCAFFOLD_BLOCK_DEFICIT",
  "availableBlocks": 12,
  "requiredFinalScaffoldBlocks": 15,
  "deficitBlocks": 3,
  "statesExpanded": 0,
  "reuseRequired": true
}
```

The failure occurs before action search. That means solution capture cannot continue for level 13 under the current accepted geometry.

## Current accepted spec/plan says

SPEC-0004 says current canonical level 13, after the accepted CR-0006 row update, must end solver validity only as `SOLVED`, `FAILED_PREFLIGHT`, or `UNSOLVABLE_EXHAUSTED`; final `UNPROVEN_WITHIN_LIMIT` is invalid evidence.

PLAN-0004 says:

- run solver validity for current canonical level 13;
- if level 13 returns `FAILED_PREFLIGHT`, stop and open a Change Request using the solver's scaffold-deficit recommendation;
- if level 13 is unsolved, copy `availableBlocks`, `requiredFinalScaffoldBlocks`, `deficitBlocks`, `temporaryAccessEstimate`, `recoverableTemporaryBlocks`, `reuseRequired`, `planner.rejectedCandidates`, and recommendations into the Change Request;
- do not edit level geometry during implementation without an accepted Change Request.

## Proposed change

Accept a focused level 13 redesign before resuming solution capture. The redesign should make level 13 pass solver preflight and then require replayed solution evidence.

Allowed geometry levers:

- add at least three supported, reachable movable blocks to level 13;
- lower the final shelf or goal approach enough that the final scaffold lower bound no longer exceeds 12 blocks;
- add terrain/workbench support that reduces the final committed scaffold rise;
- move an existing stockpile only if it remains supported and reachable under stack-stability rules.

The solver recommendation is:

```json
{
  "type": "add_reachable_blocks",
  "priority": "high",
  "reason": "All valid final scaffold candidates require more committed blocks than the level provides.",
  "action": "Add supported reachable blocks, lower the final shelf, or add terrain that reduces the final scaffold rise; rerun validity after the edit."
}
```

Accepted implementation option: add exactly three supported, reachable movable blocks to the level 13 lower-yard stockpile while preserving the existing Double Bench structure. The revised row 12 is:

```json
"#PBBBBBB.B.B.B.B.B.B.B..#"
```

This raises level 13 from 12 to 15 movable blocks and leaves the goal shelf, workbench, and upper stockpile rows unchanged.

## Why this is necessary

PLAN-0004 cannot complete cleanly because `tests/fixtures/level_solutions.json` must eventually contain one replayable solution per level. Level 13 currently fails a hard lower-bound preflight before search, so there is no valid action sequence to copy into the solution fixture under the current geometry.

Continuing without a redesign would either leave solution coverage incomplete or encourage changing solver behavior to hide a real level-data problem.

## Impact

- Scope: Level 13 geometry/resource adjustment only, followed by solver validity, resource validation, and solution replay evidence.
- Files: likely `backend/app/data/levels.json`, `docs/intake/candidate_levels_6_20.json`, `tests/fixtures/level_resource_requirements.json`, `tests/fixtures/level_solver_expectations.json`, `tests/fixtures/level_solutions.json`, `docs/status/CURRENT_STATE.md`, and possibly a focused handoff.
- Tests: rerun JSON validation, level validation, resource validation, solver validity for level 13, solver analyzer if useful, and JS replay tests after solution fixture update.
- Docs: update `docs/status/CURRENT_STATE.md`; update `docs/repo-map.md` if validation commands or status change.
- Dependencies: none.
- Security/privacy: none.
- Token/context impact: small to medium; level geometry and solver evidence are localized.
- Timeline/PR size: small if adding reachable blocks; medium if the geometry uses terrain/workbench changes.

## Options considered

1. Accept: revise level 13 geometry/resource data and continue PLAN-0004 once solver preflight no longer fails.
2. Reject: keep level 13 unchanged and leave PLAN-0004 blocked at solution evidence.
3. Defer: skip level 13 solution evidence temporarily, which violates the accepted one-solution-per-level gate.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner approved the add-reachable-blocks option: revise level 13 by adding exactly three supported, reachable movable blocks while preserving the Double Bench structure, then rerun solver/resource/solution checks.
