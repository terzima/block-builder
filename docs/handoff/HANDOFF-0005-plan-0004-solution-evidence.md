# Handoff: PLAN-0004 Solution Evidence Block

## Resume Point

PLAN-0004 is paused at Task 5 under accepted `CR-0005`. The backend/API expansion work is partially complete, but `tests/fixtures/level_solutions.json` cannot be completed until levels 11-20 have exact replayable action sequences or accepted level revisions.

## Active Files

- `docs/change-requests/CR-0005-solution-evidence-capture.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `backend/app/data/levels.json`
- `tests/test_api.py`
- `tests/fixtures/level_solutions.json` (not created yet)
- `tests/js/level-solutions.test.js` (not created yet)
- `tests/js/run-tests.mjs`
- `docs/status/CURRENT_STATE.md`

## What Changed

- PLAN-0004 Task 4 API tests were updated and pass.
- Backend level validation passes after accepted CR-0004.
- Local engine search was used to seek replayable solutions through the existing `frontend/js/engine.js`.
- `CR-0005` was accepted because exact solutions are missing for levels 11-20.

## What Was Verified

```text
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py
32 passed, 1 known StarletteDeprecationWarning
```

Candidate and canonical validators also pass:

```text
Validated 20 levels from backend/app/data/levels.json
Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json
```

## Replay Candidates Found

These candidate sequences were produced by local engine search and should still be replayed by `tests/js/level-solutions.test.js` before being accepted in the fixture.

| Level | Actions |
|---:|---|
| 1 | `moveRight`, `jump`, `moveRight`, `moveRight` |
| 2 | `interact`, `moveRight`, `jump`, `moveRight`, `interact`, `jump` |
| 3 | `interact`, `moveRight`, `interact`, `jump`, `jump`, `moveRight`, `moveRight` |
| 4 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump` |
| 5 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump`, `moveRight` |
| 6 | `moveRight`, `moveRight`, `interact`, `moveRight`, `moveRight`, `jump`, `moveRight`, `jump`, `interact`, `moveLeft`, `moveLeft`, `interact`, `moveRight`, `jump`, `interact`, `jump`, `jump`, `moveRight` |
| 7 | `moveRight`, `jump`, `moveRight`, `jump`, `moveRight`, `interact`, `moveRight`, `jump`, `moveRight`, `jump`, `interact`, `moveLeft`, `moveLeft`, `interact`, `moveRight`, `jump`, `jump`, `moveLeft`, `interact`, `moveRight`, `moveRight`, `interact`, `moveLeft`, `jump`, `moveLeft`, `moveRight`, `interact`, `jump`, `jump`, `moveRight`, `moveRight` |
| 8 | `moveRight`, `moveRight`, `interact`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `jump`, `moveRight`, `jump`, `moveRight`, `jump`, `jump`, `jump`, `interact`, `moveLeft`, `jump`, `jump`, `jump`, `interact`, `moveRight`, `jump`, `jump`, `jump`, `moveLeft`, `interact`, `moveRight`, `moveRight`, `moveRight`, `moveLeft`, `interact`, `jump`, `jump`, `interact`, `jump`, `moveRight`, `jump`, `moveRight`, `moveRight` |
| 9 | `moveRight`, `jump`, `moveRight`, `jump`, `moveRight`, `moveRight`, `interact`, `moveRight`, `interact`, `moveLeft`, `moveLeft`, `interact`, `moveRight`, `moveRight`, `jump`, `jump`, `moveRight`, `moveRight`, `moveRight`, `jump`, `interact`, `moveRight`, `moveRight`, `interact`, `moveLeft`, `jump`, `interact`, `jump`, `moveRight`, `jump`, `moveRight`, `moveRight` |
| 10 | `moveRight`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `interact`, `moveRight`, `moveLeft`, `interact`, `jump`, `jump`, `interact`, `moveRight`, `moveRight`, `moveRight`, `moveRight`, `jump`, `moveRight`, `jump`, `interact`, `moveLeft`, `jump`, `jump`, `jump`, `jump`, `interact`, `moveRight`, `moveRight`, `jump`, `moveRight`, `jump`, `interact`, `moveLeft`, `jump`, `interact`, `moveRight`, `jump`, `jump`, `moveLeft`, `interact`, `moveRight`, `moveRight`, `moveRight`, `interact`, `moveLeft`, `jump`, `jump`, `jump`, `moveRight`, `interact`, `jump`, `jump`, `moveRight`, `moveRight` |

## Missing Evidence

Levels 11-20 did not produce replay candidates within a local best-first search budget of 1,200,000 expanded states per level.

This is not a proof of impossibility. It is a PLAN-0004 blocker because the solution fixture requires exact action sequences.

## Next Steps

1. Manually solve levels 11-20 or revise unsolved levels through accepted planning.
2. Capture exact action sequences using only `moveLeft`, `moveRight`, `jump`, and `interact`.
3. Create `tests/fixtures/level_solutions.json`.
4. Create `tests/js/level-solutions.test.js` and replay every sequence through the engine.

## Do Not Do

- Do not substitute "manual works" for automated replay evidence.
- Do not add `reset`, `undo`, or `selectLevel` to solution sequences.
- Do not revise level geometry during implementation without an accepted spec/plan change.
- Do not add solver dependencies, generators, network access, or lockfiles.

## Related Docs

- `docs/change-requests/CR-0005-solution-evidence-capture.md`
- `docs/specs/SPEC-0004-level-expansion-pipeline.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `docs/status/CURRENT_STATE.md`
