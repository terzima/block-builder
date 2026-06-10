# Roadmap

Status: Seeded
Maturity: M1
Last updated: 2026-06-10

## Proposed implementation sequence

| Order | Work | Prerequisites | Approval class | User-testable | Agent may continue automatically |
|---|---|---|---|---|---|
| 1 | `BATCH-0001-application-scaffold` | Seed docs accepted | A1 | No | Yes, if checks pass and no approval-required action appears. |
| 2 | `BATCH-0002-first-playable-slice` | `BATCH-0001` complete and dependency approval granted | A3 | Yes | Only until the first playable human checkpoint. |
| 3 | Level expansion pipeline candidate | First five playable and validated | A2/A3 depending on tooling/dependencies | Yes | No, if generator/dependency/product decisions are needed. |
| 4 | UI/art/accessibility polish candidate | First playable feedback | A2 | Yes | No, because visual/product judgment is needed. |
| 5 | Hosting readiness candidate | Local app stable | A3 | Yes | No, because hosting/deployment/external config needs approval. |

## Proposed batches

### BATCH-0001 - Application Scaffold

- Included spec: `docs/specs/SPEC-0001-application-scaffold.md`
- Included plan: `docs/plans/PLAN-0001-application-scaffold.md`
- Approval class: A1
- Human gate: No
- Purpose: Create project skeleton and shared contract before product behavior begins.

### BATCH-0002 - First Playable Slice

- Included specs:
  - `docs/specs/SPEC-0002-backend-levels-api.md`
  - `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
- Included plans:
  - `docs/plans/PLAN-0002-backend-levels-api.md`
  - `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
- Approval class: A3
- Human gate: Yes at first playable milestone
- Purpose: Implement backend APIs and frontend gameplay/UI for levels 1-5.

## Prerequisite chain

- `SPEC-0001` must precede `SPEC-0002` and `SPEC-0003`.
- `SPEC-0002` must precede or run before the final integration portion of `SPEC-0003`.
- First-five manual playthrough must precede level expansion.
- Level expansion must precede any claim of 100-level completion.
- Hosting readiness should wait until route construction and local behavior are stable.

## First human-testable checkpoint

The first human-testable checkpoint is after `BATCH-0002`: a local browser app where a player can complete levels 1-5 with the accepted movement, jump, pickup/place, gravity, reset, undo, and level progression rules.

## Work that should not require human approval

- Documentation cleanup inside accepted paths.
- Application directory scaffold without dependency installation.
- JSON validation.
- Backend/unit test implementation after dependency approval.
- Pure engine tests under an accepted test harness.
- Local commits inside accepted scope.

## Work that must require human approval

- Dependency additions, removals, upgrades, installs, or lockfile changes.
- Network access from commands.
- Frontend frameworks, build tools, or formal JS test runner adoption.
- CI, deployment, security policy, hook, or infrastructure changes.
- Secrets, credentials, external services, analytics, accounts, payments, or cloud storage.
- Pushing branches or opening/editing pull requests.
- First playable UI/product review.
- Hosting provider/domain/deployment decisions.

## Future roadmap items

- Optional FastAPI progress API if localStorage is insufficient.
- Level validator hardening and optional solver/smoke-solution metadata.
- Author levels 6-20 after first-five validation.
- Continue level creation in batches of 10 until the 100-level target is reached.
- Optional level generator after manual mechanics are stable.
- UI/art direction pass after first playable feedback.
- Accessibility pass beyond initial required affordances.
- Mobile/touch-first refinement if selected.
- Sound/music if selected.
- HTTPS/web hosting readiness once local behavior is stable.

## Spec candidates

- `SPEC-0004-level-expansion-pipeline`
- `SPEC-0005-ui-art-accessibility-polish`
- `SPEC-0006-hosting-readiness`
- `SPEC-0007-optional-progress-api`

## ADR candidates

- JavaScript test runner and build tooling decision.
- Hosting/deployment model.
- Progress persistence model.
- Level generation/solver strategy.
- Final visual direction if it meaningfully affects architecture or assets.

## Open questions

- Should progress API ship in the first playable slice or later?
- Should JS tests stay dependency-light or use a runner?
- Should touch controls be first-class?
- What is the final UI/art direction?
- What hosting provider/domain will be used?
- How should levels 6-100 be authored and validated?
