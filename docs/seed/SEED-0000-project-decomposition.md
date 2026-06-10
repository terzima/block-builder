# SEED-0000: Project Decomposition

Date: 2026-06-10
Mode: Project Seeding / Spec Decomposition
Source: `docs/intake/PROJECT_OVERVIEW_RAW.md`

## Decomposition approach

The raw overview was treated as intake material, not as the permanent working spec. It was decomposed into:

- Stable project context for future agents.
- A foundation spec that captures confirmed requirements and boundaries.
- Three initial implementation specs that are clear enough to execute in early batches.
- Three matching plans that name expected files, validation commands, docs, risks, and stop conditions.
- Two proposed batches that group already-written specs/plans.
- A roadmap for future work that is not yet implementation-ready.

The seeding pass stayed broad across the full project and deep only for the first implementation-safe slices.

## Document map

| File | Purpose | Maturity |
|---|---|---|
| `docs/project-charter.md` | Product purpose, users, goals, non-goals, constraints, success criteria, first human-testable milestone. | M1/M2 |
| `docs/glossary.md` | Gameplay, project, acronym, and ambiguous-term vocabulary. | M1 |
| `docs/repo-map.md` | Current scaffold, expected app structure, boundaries, first-read files, commands. | M1/M2 |
| `docs/roadmap.md` | Proposed implementation sequence, dependencies, batch approval classes, future candidates. | M1 |
| `docs/specs/SPEC-0000-project-foundation.md` | Foundation requirements and boundaries extracted from the raw overview. | M1/M2 |
| `docs/adr/ADR-0000-architecture-direction.md` | Proposed architecture direction implied by the raw overview. | M1 |
| `docs/worklog/0000-seeding-notes.md` | Session extraction notes and carry-forward summary. | M1 |
| `docs/seed/SEED-0000-results.md` | Summary of outputs, assumptions, risks, questions, and next prompt. | M1 |

## Spec map

| Spec | Purpose | Maturity | Rationale |
|---|---|---|---|
| `SPEC-0000-project-foundation` | Controlled foundation and product boundaries. | M1/M2 | Needed to avoid routine raw-overview reads. |
| `SPEC-0001-application-scaffold` | Directory skeleton, shared contract, README, env policy, manifest strategy. | M2 | Required before product behavior begins. |
| `SPEC-0002-backend-levels-api` | FastAPI config, static/config routes, levels APIs, validation, first-five data, backend tests. | M2 | Clear from raw overview and prerequisite for frontend loading. |
| `SPEC-0003-frontend-gameplay-ui` | Vanilla JS modules, deterministic engine, rendering, controls, reset/undo, local progress, first-five playability. | M2 | Clear enough for first human-testable slice. |

## Plan map

| Plan | Linked spec | Maturity | Notes |
|---|---|---|---|
| `PLAN-0001-application-scaffold` | `SPEC-0001-application-scaffold` | M3/M4 | Executable without product behavior; no dependency install required. |
| `PLAN-0002-backend-levels-api` | `SPEC-0002-backend-levels-api` | M3 | Clear, but dependency/network approval is required before installs. |
| `PLAN-0003-frontend-gameplay-ui` | `SPEC-0003-frontend-gameplay-ui` | M3 | Clear, with human testing at the first playable checkpoint. |

## Batch map

| Batch | Included work | Approval class | User-testable |
|---|---|---|---|
| `BATCH-0001-application-scaffold` | `SPEC/PLAN-0001` | A1 | No |
| `BATCH-0002-first-playable-slice` | `SPEC/PLAN-0002` and `SPEC/PLAN-0003` | A3 | Yes |

`BATCH-0002` is A3 because backend implementation is expected to require dependency declaration/install approval. It also has an A2-style human checkpoint once the playable UI exists.

## Decomposition rationale

- The first spec must be application scaffold because the repo has governance/docs but no application structure.
- Backend and frontend are separate specs because the raw overview assigns different responsibilities and test surfaces to each.
- Frontend engine, rendering, input, storage, and UI are kept in one initial spec because they together produce the first meaningful human-testable milestone.
- The 100-level expansion is not specified as an initial implementation spec because it depends on validated first-five mechanics.
- Hosting readiness is captured as a roadmap item and ADR consequence, not as an early implementation plan.

## Deferred work categories

- Roadmap items: 100-level expansion, level generation, hosting readiness, sound/music, mobile-first controls, analytics/cloud progress.
- Spec candidates: level expansion pipeline, optional progress API, hosting config hardening, UI/art polish after playtest.
- ADR candidates: JS test runner/build tooling, hosting/deployment model, progress persistence model, level generation strategy.
- Open questions: see `docs/roadmap.md` and `docs/seed/SEED-0000-results.md`.
