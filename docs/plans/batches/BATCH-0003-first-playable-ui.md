# BATCH-0003 - First Playable UI

Status: Ready for Implementation
Approval Class: A2
Batch Type: User-Testable Frontend
User-testable: Yes
Human gate: Yes

## Purpose

Execute the frontend first playable slice after the backend API batch is complete: shared `interact` contract update, vanilla JavaScript engine/physics/UI, no-dependency JS tests, local progress, and manual playthrough of levels 1-5.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0003-frontend-gameplay-ui.md` | Accepted frontend gameplay/UI requirements. |
| Plan | `docs/plans/PLAN-0003-frontend-gameplay-ui.md` | M4 frontend executable tasks, runtime contracts, tests, and human checkpoint. |
| Spec | `docs/specs/SPEC-0002-backend-levels-api.md` | Completed backend prerequisite and level/API contract. |
| Plan | `docs/plans/PLAN-0002-backend-levels-api.md` | Completed backend prerequisite checks. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Stack and component ownership. |

## Scope summary

### In scope

- Shared contract addition for `interact`.
- Vanilla JS contract/API/engine/physics/renderer/input/storage/UI modules.
- No-dependency Node JS test harness.
- Responsive playable UI for levels 1-5.
- Local progress in `localStorage`.
- README and repo-map frontend command/control updates.
- Manual playthrough evidence and A2 human UX/product checkpoint.

### Out of scope

- Backend API changes beyond consuming completed `BATCH-0002` behavior.
- Frontend dependencies, frameworks, bundlers, package installs, lockfiles, CI changes, deployment, sound, music, analytics, accounts, cloud saves, leaderboards, levels 6-100, and new gameplay mechanics.

## Execution contract

- Agent may continue automatically: Yes until automated checks and manual playthrough are complete, then stop for A2 human UX/product review.
- Dependency/network approval required before start: No for the default no-dependency path.
- Human checkpoint timing: after the app runs locally, automated checks pass, and levels 1-5 are manually completable.
- Special constraints:
  - Do not start until `BATCH-0002` backend checks pass.
  - Build from `PLAN-0003` action names and runtime contracts.
  - Use contract-derived API routes and keyboard bindings.
  - Stop before adding frontend packages or build tooling.

## Required checks

```bash
git status --short
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

Expected evidence:

- Backend validator and pytest still pass.
- JS runner prints `ok physics`, `ok engine`, and `All JS tests passed`.
- `git diff --check` prints no output.

## Human checks

- Load `http://127.0.0.1:8000/`.
- Complete levels 1-5.
- Review keyboard controls, on-screen controls, reset, undo, invalid feedback, completion flow, progress persistence, and desktop/mobile-width layout.
- Project owner decides whether first playable UX/product feel is acceptable before any follow-on scope.

## Stop conditions

- `BATCH-0002` backend prerequisite is incomplete or failing.
- Accepted gameplay rules need to change.
- Shared contract action names cannot support required controls without a Change Request.
- A frontend dependency, framework, build step, package install, or lockfile becomes necessary.
- Levels 1-5 are not completable under accepted mechanics.
- Product/UX judgment is required before proceeding beyond the first playable checkpoint.

## Commit strategy

- Suggested local commits:
  - `test(frontend): add engine and physics checks`
  - `feat(frontend): add playable puzzle UI`
- Remote push/PR: requires explicit approval.

## Final report

Report:

1. Batch status.
2. Specs/plans completed.
3. Files changed.
4. Checks run and skipped.
5. Manual playthrough results for levels 1-5.
6. A2 human checkpoint result.
7. Deviations and Change Requests.
8. Remaining risks and recommended next batch.
