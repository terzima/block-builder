# CR-0006: Stack Stability and Level Resource Validation

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`

## Trigger

Manual playtesting during PLAN-0004 surfaced two issues that the accepted spec/plan did not cover:

1. The current interaction physics allow the player to pick up a block even when another block is stacked directly on top of it. That makes stacked structures physically unstable because a lower support block can be removed from the side while it is carrying another block.
2. Level 13 (`Double Bench`) appears physically impossible because it does not provide enough blocks to build the needed structure. Some other levels provide more blocks than are needed, which may be acceptable, but the current validator does not report available blocks versus the minimum construction resources a level appears to require.

The current `frontend/js/engine.js` pickup logic checks only whether the adjacent cell contains a block. It does not check whether that block supports another block above it.

The current validator counts blocks only as an entity minimum (`at least one B`) and does not calculate or report construction-resource sufficiency for levels 6-20.

## Current accepted spec/plan says

SPEC-0004 says:

- levels 6-20 must be construction-first scaffold puzzles;
- levels 6-20 must use only the accepted mechanics from SPEC-0003 and CR-0003;
- every level must have at least one block;
- every level must have engine-replayed solution evidence;
- if a candidate proves unsolvable or too weak, implementation must stop for spec revision rather than substituting unreviewed level data.

PLAN-0004 says:

- do not change JS engine or physics mechanics unless a separate accepted Change Request changes mechanics;
- add solution evidence for every level;
- stop if any candidate cannot be completed by a concrete action sequence through the existing engine;
- append the candidate levels from `docs/intake/candidate_levels_6_20.json` exactly unless an accepted change allows revisions.

The accepted documents do not define:

- whether stacked blocks make lower blocks unavailable for pickup;
- how to calculate or report the number of blocks needed for a level;
- what automated gate catches an under-resourced level before manual solution capture;
- whether surplus blocks are acceptable when a valid solution does not use every block.

## Proposed change

Revise SPEC-0004 and PLAN-0004 before continuing implementation:

1. Add a stack-stability mechanic:
   - A block can be picked up only if no uncarried block occupies the cell directly above it.
   - If a player attempts to pick up a block with another block directly above it, `dispatchGameAction(...)` must return `invalid: true`, `changed: false`, no history push, no move increment, and a concise message such as `Block is supporting another block.`
   - Placement and gravity behavior remain unchanged unless a later accepted Change Request says otherwise.

2. Add level resource validation/reporting for levels 6-20:
   - For each level, report `availableBlocks`.
   - Add a deterministic no-network, no-dependency resource analysis that computes a conservative minimum block requirement for reaching the goal shelf from the lowest required approach area.
   - The analysis must separately report at least:
     - blocks available in the level;
     - blocks estimated as needed to reach or work from the platform used for construction;
     - blocks estimated as needed to build from that platform to the goal destination;
     - total estimated minimum blocks;
     - surplus or deficit.
   - The analysis may be a lower-bound or conservative estimate, but it must be deterministic and documented. It must not replace engine replay evidence.

3. Revise level 13:
   - Add enough blocks to make `Double Bench` solvable under the stack-stability rule.
   - Keep the level's intended difficulty and title unless the revised design needs a follow-on naming change.
   - Update both canonical runtime data and the candidate/intake source or explicitly document which source is superseded.

4. Clarify surplus block policy:
   - A valid solution does not need to use every block.
   - Surplus blocks are acceptable when they support puzzle ambiguity, staging, or alternate routes.
   - Under-resourced levels are not acceptable.

5. Keep final solvability validation authoritative:
   - The block-count/resource analysis is a design gate and diagnostic report.
   - The required JS solution replay remains the final proof that each level is possible with accepted mechanics.
   - If the resource analysis flags a level as deficient or the JS replay cannot prove completion, implementation must stop for level revision rather than proceed.

## Why this is necessary

Implementation cannot continue cleanly because PLAN-0004 depends on exact solution evidence for levels 6-20, and manual playtesting revealed that the current mechanics and level validation are not modeling the intended physical constraints.

If the stack-stability rule is implemented without updating the plan, existing search/manual solution assumptions can become invalid. If level 13 is not revised, the expanded level set may include a physically impossible puzzle. If block sufficiency is not analyzed, future level changes can repeat the same issue and leave solvability to expensive manual trial-and-error.

## Impact

- Scope:
  - Changes runtime interaction mechanics for block pickup.
  - Adds deterministic level resource reporting/checking for levels 6-20.
  - Revises level 13 block availability.
  - Clarifies surplus block policy.
- Files:
  - `docs/specs/SPEC-0004-level-expansion-pipeline.md`
  - `docs/plans/PLAN-0004-level-expansion-pipeline.md`
  - `frontend/js/engine.js`
  - `tests/js/engine.test.js`
  - `backend/app/data/levels.json`
  - `docs/intake/candidate_levels_6_20.json` or a documented replacement/supersession path
  - `backend/app/services/level_service.py`
  - `tools/validate_levels.py`
  - `tests/test_level_validation.py`
  - `tests/fixtures/level_solutions.json`
  - `tests/js/level-solutions.test.js`
  - `docs/status/CURRENT_STATE.md`
  - `docs/handoff/`
- Tests:
  - Add engine tests proving stacked lower blocks cannot be picked up and free blocks can still be picked up.
  - Add validation/tooling tests for resource-analysis output and under-resourced detection.
  - Re-run canonical/candidate validators.
  - Re-run API tests after level 13 changes.
  - Re-run JS engine/physics/solution tests after new sequences are captured.
- Docs:
  - Update SPEC-0004 and PLAN-0004 before implementation resumes.
  - Update CURRENT_STATE and handoff with this CR and the new stop point.
  - Document the resource-analysis calculation and its limits.
- Dependencies:
  - None. The analysis should be deterministic and implemented with existing Python/JavaScript tooling.
- Security/privacy:
  - No new security or privacy impact.
- Token/context impact:
  - Moderate. The level-resource analysis must be described precisely enough to avoid invention, and level 13 revision plus solution evidence may require careful iteration.
- Timeline/PR size:
  - Medium. This is no longer just a solution fixture task; it includes a mechanics change, level revision, validation/tooling work, and updated replay evidence.

## Options considered

1. Accept:
   - Update the spec/plan with stack-stability, resource analysis, level 13 revision, and surplus-block policy.
   - Resume implementation only after the revised plan is accepted.
2. Reject:
   - Continue PLAN-0004 with current pickup behavior and no resource analysis.
   - This keeps implementation moving but knowingly permits physically unrealistic block removal and may preserve an impossible level 13.
3. Defer:
   - Finish PLAN-0004 with the current mechanics and handle stack stability/resource validation in a later slice.
   - This is risky because solution evidence and level design would be based on mechanics the project owner has already identified as wrong.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner approved updating SPEC-0004 and PLAN-0004 with stack-stability physics, deterministic resource analysis, a level 13 block-supply revision, and a surplus-block policy before implementation continues.
