# Handoff: PLAN-0004 After CR-0004

## Resume Point

PLAN-0004 implementation started after the project owner accepted the first-playable A2 checkpoint on 2026-06-11. `CR-0004` is implemented: level 1's raw geometry was fixed instead of weakening validation. Resume PLAN-0004 from the remaining API tests, solution fixture, renderer, docs, and full validation tasks.

## Active Files

- `docs/change-requests/CR-0004-level-1-support-geometry-fix.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `docs/specs/SPEC-0004-level-expansion-pipeline.md`
- `backend/app/data/levels.json`
- `backend/app/services/level_service.py`
- `tests/test_level_validation.py`
- `tools/validate_levels.py`
- `docs/status/CURRENT_STATE.md`

## What Changed

- Added PLAN-0004 backend validation tests first.
- Added partial validator support for canonical IDs 1-20 and candidate IDs 6-20.
- Added `validate_candidate_levels(...)`.
- Added `--candidate-source` support to `tools/validate_levels.py`.
- Expanded `backend/app/data/levels.json` to include candidate levels 6-20.
- Created and accepted `CR-0004` after the new raw-support invariant rejected accepted level 1.
- Applied the exact CR-0004 level 1 grid change.

## What Was Verified

- Initial red test run failed for the expected missing/old behavior before production changes.
- Candidate validation passes:

```text
Validated 20 levels from backend/app/data/levels.json
Validated 15 candidate levels from docs/intake/candidate_levels_6_20.json
```

- `python3 -m json.tool backend/app/data/levels.json >/dev/null` passes after expansion.
- `.venv/bin/python tools/validate_levels.py` passes.
- `.venv/bin/python -m pytest tests/test_level_validation.py` passes with 24 tests.

## What Was Not Verified

- API tests, JS solution tests, renderer updates, docs/repo-map updates, manual smoke check, and full validation have not been completed.

## Decisions Made

- No accepted specs or plans were edited after the conflict was found.
- The project owner rejected a validation exemption and directed that level 1 should be fixed.
- `CR-0004` is accepted and specifies the exact level 1 grid change.
- The CR-0004 grid change is implemented.

## Assumptions

- The user's "It is accepted the levels work as expected" accepted the first-playable A2 checkpoint for levels 1-5.
- `.superpowers/brainstorm/` remains local visual brainstorming output and should not be committed unless explicitly requested.

## Blockers

- No CR-0004 blocker remains.

## Next Steps

1. Continue PLAN-0004 from API tests for expanded metadata/detail.
2. Add solution fixture and JS replay harness.
3. Update variable-board rendering.
4. Update `docs/repo-map.md` and finish full PLAN-0004 validation.

## Do Not Do

- Do not weaken the raw-support invariant for levels 1-20.
- Do not make any additional level 1 geometry changes beyond the exact accepted CR-0004 grid fix.
- Do not use `.superpowers/brainstorm/` artifacts as routine implementation input.
- Do not install dependencies, access the network, create lockfiles, modify CI/deployment, or open a PR.

## Related Docs

- `docs/change-requests/CR-0004-level-1-support-geometry-fix.md`
- `docs/specs/SPEC-0004-level-expansion-pipeline.md`
- `docs/plans/PLAN-0004-level-expansion-pipeline.md`
- `docs/status/CURRENT_STATE.md`
