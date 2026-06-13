# CR-0005: Solution Evidence Capture

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`

## Trigger

PLAN-0004 implementation reached Task 5, which requires one concrete engine-replayed solution for every canonical level ID 1-20.

Using the existing JavaScript engine as the transition oracle:

- Levels 1-10 produced concrete replay candidates.
- Levels 11-20 did not produce solutions within a local best-first search budget of 1,200,000 expanded states per level.

This does not prove levels 11-20 are impossible, but implementation cannot complete the required `tests/fixtures/level_solutions.json` without exact action sequences.

## Current accepted spec/plan says

SPEC-0004 requires solution evidence for every canonical level:

- exactly one solution entry for each ID `1` through `20`;
- actions restricted to `moveLeft`, `moveRight`, `jump`, and `interact`;
- replay through `createInitialState(...)` and `dispatchGameAction(...)`;
- final state must be `completed`;
- any invalid replay step fails the solution check.

PLAN-0004 says that if any candidate level cannot be completed by a concrete action sequence through the existing engine, implementation must stop and create a Change Request rather than replacing the level during implementation.

## Proposed change

Add a solution-capture checkpoint before completing PLAN-0004 Task 5:

1. Keep the automated solution replay requirement unchanged.
2. Allow the project owner to manually solve levels 11-20 and provide exact action sequences.
3. Treat manually provided sequences as candidate evidence only until `tests/js/level-solutions.test.js` replays them successfully.
4. If a level cannot be manually solved, revise that level through an accepted spec/plan change rather than inventing replacement geometry during implementation.
5. Record any accepted manual sequences in `tests/fixtures/level_solutions.json` only after they pass automated replay.

## Why this is necessary

The accepted implementation cannot finish without machine-replayable solution evidence. Automated search found solutions for the early expansion levels but did not prove the later levels. Manual solving can resolve whether the current candidates are valid puzzles, but a simple "it works" judgment is not enough for PLAN-0004 because the fixture needs exact actions.

## Impact

- Scope: Adds a focused manual evidence-capture checkpoint; does not change mechanics, API routes, validation codes, or level geometry by itself.
- Files: likely `tests/fixtures/level_solutions.json`, `tests/js/level-solutions.test.js`, `tests/js/run-tests.mjs`, `docs/status/CURRENT_STATE.md`, and this CR. If levels need revision, a follow-on accepted spec/plan change is required.
- Tests: JS solution replay remains mandatory before implementation completion.
- Docs: update CURRENT_STATE and handoff with the blocked levels and any captured sequences.
- Dependencies: none.
- Security/privacy: none.
- Token/context impact: moderate; manual sequences for levels 11-20 may be long, but should live in the fixture rather than chat history.
- Timeline/PR size: depends on whether levels 11-20 are solvable as-is.

## Options considered

1. Accept: pause PLAN-0004 Task 5 until exact manual or automated sequences are available for levels 11-20, then replay them in the fixture.
2. Reject: require implementation to continue searching without manual input, which may burn time without proving solvability.
3. Defer: remove or postpone levels 11-20 from this slice, which would require revising SPEC-0004's 20-level objective.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner approved proceeding with CR-0005. PLAN-0004 keeps automated replay mandatory, but levels 11-20 may now be solved manually to capture exact action sequences before those sequences are recorded in `tests/fixtures/level_solutions.json`.
