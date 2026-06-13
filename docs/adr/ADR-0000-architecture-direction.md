# ADR-0000: Architecture Direction

Status: Proposed
Date: 2026-06-10

## Context

The raw overview explicitly fixes the major system shape: a Python/FastAPI backend, a vanilla JavaScript frontend, local hosting first, a shared Python/JavaScript communication contract, and deterministic frontend-owned gameplay logic.

This ADR records that direction so future agents do not reopen settled architecture unless implementation discovers a real contradiction or scope problem.

## Decision

Use a local-first web architecture:

- FastAPI backend serves static frontend assets, shared public config, level metadata/detail APIs, validation, structured errors, and optional local progress APIs.
- Vanilla JavaScript frontend owns gameplay state transitions, input mapping, gravity, collision checks, rendering, reset, undo, completion flow, and local progress.
- `shared/app_contract.json` is the machine-readable source of truth for API prefixes/routes, tile symbols, action names, keyboard bindings, storage keys, gameplay constants, and UI constants.
- `shared/COMMUNICATION_CONTRACT.md` mirrors the JSON contract for humans.
- Level data lives in JSON and is validated by backend startup checks and a CLI validator.
- Browser `localStorage` is the default v1 progress store.
- Future HTTPS hosting should be supported by changing config values and CORS/trusted-host settings, not rewriting frontend route calls.

## Alternatives considered

- Backend-owned gameplay loop: rejected for v1 because the raw overview requires frontend ownership of real-time interaction and deterministic local state.
- Continuous-motion platformer physics: rejected for v1 because the product goal is discrete, testable puzzle logic.
- JavaScript framework or build pipeline: deferred because the raw overview asks for vanilla JavaScript and no frontend build step is required for v1.
- Markdown-only shared contract: rejected because it is human-readable but not executable by both Python and JavaScript.
- Cloud accounts/progress store: deferred because localStorage is sufficient for v1 and no user accounts are required.

## Consequences

- Backend tests should focus on config, static serving, level APIs, validation, and structured errors.
- Frontend tests should focus on pure engine and physics behavior before DOM polish.
- Contract changes become cross-boundary changes and should be spec-backed.
- Adding a build system, framework, cloud persistence, or deployment target later requires a new spec or ADR.
- Dependency additions and installs still require approval under the repo dependency policy.

## Assumptions

- FastAPI, Pydantic, Uvicorn, and pytest are acceptable implementation dependencies once explicitly approved.
- A dependency-light JavaScript test harness can cover initial engine behavior if no JS test runner is approved.
- The first five levels are enough to validate the mechanics before expanding toward 100 levels.

## Reversal conditions

Revisit this ADR if:

- The frontend-owned engine cannot meet deterministic gameplay or testability needs.
- A future hosting/deployment target imposes constraints incompatible with same-origin or split-origin route construction.
- The project intentionally adopts a frontend framework, build pipeline, or cloud persistence model.
- User testing shows the discrete side-view rules need a fundamentally different architecture.
