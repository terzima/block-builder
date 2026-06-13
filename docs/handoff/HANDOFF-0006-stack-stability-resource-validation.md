# Handoff: CR-0006 Stack Stability and Resource Validation

## Resume Point

`CR-0006` is accepted and implemented locally. `CR-0007` is accepted and the docs are hardened for deterministic solver/analyzer tooling. PLAN-0004 now resumes at Task 4C before returning to Task 5 solution capture.

## Active Files

- `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md`
- `docs/specs/SPEC-0004-level-expansion-pipeline.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `frontend/js/engine.js`
- `backend/app/data/levels.json`
- `docs/intake/candidate_levels_6_20.json`
- `backend/app/services/level_service.py`
- `tools/validate_levels.py`
- `tests/js/engine.test.js`
- `tests/js/level-solutions.test.js`
- `tests/js/run-tests.mjs`
- `tests/test_level_validation.py`
- `tests/fixtures/level_resource_requirements.json`
- `tests/fixtures/level_solutions.json`
- `docs/status/CURRENT_STATE.md`
- `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`
- `tools/solve-levels.mjs`
- `tests/js/solver.test.js`
- `tests/fixtures/level_solver_expectations.json`

## What Changed

- `frontend/js/engine.js` now rejects pickup of a block when another uncarried block is directly above it.
- `tests/js/engine.test.js` covers the stack-stability invalid action contract and free-block pickup still passes.
- Level 13 row 12 is revised to `#P.B.B.B.B.B.B.B.B.B.B..#` in both `backend/app/data/levels.json` and `docs/intake/candidate_levels_6_20.json`.
- `tests/fixtures/level_resource_requirements.json` exists for levels 6-20.
- `backend/app/services/level_service.py` exposes `analyze_level_resources(...)`.
- `tools/validate_levels.py` supports `--resource-source`.
- `tests/js/level-solutions.test.js` replays solution fixtures through the engine.
- `tests/fixtures/level_solutions.json` currently covers levels 1-10 only.
- `CR-0007` adds a required no-dependency solver/analyzer tooling slice before remaining solution capture.

## What Was Verified

- `node tests/js/run-tests.mjs` passes physics and engine tests, then fails solution coverage because levels 11-20 are missing from `tests/fixtures/level_solutions.json`.
- `.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py` passes: 35 passed, 1 known Starlette deprecation warning.
- `.venv/bin/python tools/validate_levels.py --candidate-source docs/intake/candidate_levels_6_20.json --resource-source tests/fixtures/level_resource_requirements.json` passes canonical, candidate, and resource validation.
- Level 13 resource analysis reports 12 available blocks, 12 required blocks, and no deficit.

## What Was Not Verified

- Exact durable solution fixture entries for levels 11-20 are still missing.
- Solver expectations, `tools/solve-levels.mjs`, and solver tests are not implemented yet.
- Variable-board renderer/CSS work from PLAN-0004 Task 6 has not resumed.
- Expanded-level A2 human checkpoint remains after automated checks pass.

## Decisions Made

- `CR-0006` is accepted.
- Stack-stability rule: a block is pickup-eligible only if no uncarried block is directly above it.
- Level 13 row 12 must become `#P.B.B.B.B.B.B.B.B.B.B..#` in both `docs/intake/candidate_levels_6_20.json` and `backend/app/data/levels.json`.
- Surplus blocks are allowed when validation, JS replay, and human review pass.
- Resource analysis is a deterministic design gate only; JS replay remains the solvability proof.
- CR-0007 solver tooling is local and read-only. It can propose candidate solution actions and redesign recommendations, but it must not mutate level data or fixtures automatically.

## Assumptions

- A lower block should not be pickup-eligible while it directly supports another block.
- Surplus blocks can be acceptable if a level remains purposeful and replayable.
- Block-count/resource analysis and solver/analyzer tooling should be deterministic and no-dependency, but JS solution replay remains the authoritative completion proof.

## Blockers

- Solver/analyzer tooling is now the next required resume point before solution replay coverage resumes for levels 11-20.
- Stop and open a Change Request only if a level is proven impossible under accepted mechanics.

## Next Steps

1. Implement PLAN-0004 Task 4C solver expectations/tests.
2. Implement PLAN-0004 Task 4D `tools/solve-levels.mjs`.
3. Run solver validation for levels 1, 13, and a representative analyzer case.
4. Use solver evidence to resume Task 5 solution capture for levels 11-20, or stop for a Change Request if solver diagnostics require geometry redesign.

## Do Not Do

- Do not change mechanics beyond the accepted stack-stability pickup rule.
- Do not alter level geometry beyond the accepted level 13 row update unless a later Change Request is accepted.
- Do not add dependencies, solver packages, network access, lockfiles, or runtime/browser solver behavior.
- Do not add placeholder, reset, undo, or select-level actions to solution evidence.

## Related Docs

- `docs/change-requests/CR-0006-stack-stability-and-level-resource-validation.md`
- `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`
- `docs/change-requests/CR-0005-solution-evidence-capture.md`
- `docs/specs/SPEC-0004-level-expansion-pipeline.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `docs/status/CURRENT_STATE.md`
