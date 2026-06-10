# BATCH-0002 - First Playable Slice

Status: Draft
Approval Class: A3
Batch Type: User-Testable
User-testable: Yes
Human gate: Yes

## Purpose

Implement the first local playable version: FastAPI config/static/levels APIs plus vanilla JavaScript gameplay/UI for levels 1-5.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0002-backend-levels-api.md` | Backend API and validation requirements. |
| Plan | `docs/plans/PLAN-0002-backend-levels-api.md` | Backend executable tasks and checks. |
| Spec | `docs/specs/SPEC-0003-frontend-gameplay-ui.md` | Frontend gameplay/UI requirements. |
| Plan | `docs/plans/PLAN-0003-frontend-gameplay-ui.md` | Frontend executable tasks and checks. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Stack and component ownership. |

## Scope summary

### In scope

- Approved backend dependency declaration/install.
- FastAPI health/config/static/levels APIs and validator.
- First-five level data and backend tests.
- Vanilla JS contract/API/engine/physics/renderer/input/storage/UI modules.
- JS engine/physics tests or approved no-dependency harness.
- Manual completion of levels 1-5.

### Out of scope

- Levels 6-100, generator/solver beyond validator.
- Sound, music, analytics, accounts, cloud saves, leaderboards.
- Production deployment, hosting, TLS, frontend frameworks, build steps, CI changes unless separately approved.

## Execution contract

- Agent may continue automatically: only after dependency/network approvals are granted, and only until the first playable checkpoint.
- Dependency/network approval required before start: Yes.
- Human checkpoint timing: after the app runs locally and levels 1-5 are completable.
- Special constraints beyond `AGENTS.md`: backend must not own gameplay moves; frontend must construct routes from the shared contract.

## Required checks

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
python3 -m json.tool backend/app/data/levels.json >/dev/null
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

If `node` is unavailable or a JS runner is not accepted, document the skipped automated JS check and use the accepted fallback/manual check.

## Human checks

- Play levels 1-5 locally.
- Review reset, undo, invalid feedback, completion flow, progress persistence, and desktop/mobile-width layout.

## Stop conditions

- Dependency/network approval is denied.
- Accepted gameplay rules need to change.
- A frontend dependency/framework/build step is needed.
- Levels 1-5 are not completable under accepted mechanics.
- Product/UX judgment is required before proceeding.
- A file outside included specs/plans must be modified.

## Commit strategy

- Suggested local commits:
  - `feat(backend): add levels API`
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
6. Deviations and Change Requests.
7. Remaining risks.
8. Recommended next batch.
