# SPEC-0003: Frontend Gameplay UI

Status: Draft
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

## Context

- Source docs: `SPEC-0002`, `docs/intake/PROJECT_OVERVIEW_RAW.md`, `shared/app_contract.json`.
- Current evidence: backend is expected to serve contract and first-five levels locally.
- Why this slice now: this is the first user-testable product milestone.

## Problem

The project needs a vanilla JavaScript frontend that turns backend level data into deterministic, playable, polished puzzle gameplay for levels 1-5.

## Goals

- Implement contract/API loading, pure engine/physics logic, DOM rendering, controls, local progress, reset, undo, and completion flow.
- Make levels 1-5 manually completable.
- Provide automated engine/physics coverage or a dependency-light harness.

## Non-goals

- Levels 6-100, sound/music, analytics, accounts, cloud saves, leaderboards, deployment, frontend frameworks, build steps, hazards, enemies, keys, doors, switches, timers, moving platforms, multiple goals, multiple players, pushing blocks, continuous physics.

## Users / actors

- Local player: plays the first five levels.
- Frontend app: loads backend contract and levels.
- Agent/developer: verifies deterministic engine behavior and manual playthroughs.

## Behavioral contract

- User-visible behavior: the browser displays a responsive board, HUD, controls, level selector, status messages, and completion flow.
- System responsibilities: frontend owns input, state transitions, gravity, rendering, reset/undo, completion, and local progress.
- Explicitly unchanged behavior: backend does not calculate moves; final art direction remains deferred.

## Interface and data contract

- Files or modules: `frontend/index.html`, `style.css`, `js/app.js`, `api.js`, `contract.js`, `engine.js`, `physics.js`, `renderer.js`, `input.js`, `storage.js`, `ui.js`.
- Public functions/classes:
  - `loadContract(path)`
  - `createApiClient(contract)`
  - `createInitialState(level, contract)`
  - `dispatchGameAction(state, action, level, contract)`
  - physics helpers for bounds, solid/empty checks, grounded state, and gravity.
- API routes/events: all API URLs derive from `contract.api.origin + contract.api.prefix + contract.api.routes[...]`.
- Data shapes/schemas: runtime state includes `levelId`, `status`, `moves`, `player`, `blocks`, `goal`, and bounded `history`.
- Config keys/env vars: frontend reads public contract only.
- Error codes/messages: invalid actions produce local status messages and do not mutate state.

## Requirements

### Functional

- FR-1: Load shared contract before API calls or gameplay constants.
- FR-2: Fetch level metadata and selected level from backend APIs.
- FR-3: Parse level grid into immutable static terrain and dynamic state.
- FR-4: Implement left/right movement, facing direction, one-tile jump, pickup/place, gravity, reset, undo, completion, move count, invalid feedback, next-level flow, and localStorage progress.
- FR-5: Render walls, empty cells, blocks, player, carried block, goal, HUD, status, controls, level selector, and completion modal.
- FR-6: Add keyboard and on-screen controls.
- FR-7: Add engine/physics tests for core rules.
- FR-8: Manually complete levels 1-5.

### Non-functional

- Performance: rebuilding the grid each turn is acceptable for first-five levels.
- Security/privacy: progress stays local in `localStorage`.
- Accessibility: focus-visible controls, `aria-live` status, sufficient contrast, usable keyboard controls.
- Observability: invalid actions and completion are visible to the player.
- Maintainability: engine and physics do not touch DOM directly.

## Dependencies and approvals

- Prerequisite specs/plans: `SPEC-0001`, `SPEC-0002`.
- Existing files to read first: `shared/app_contract.json`, `backend/app/data/levels.json`, active backend tests.
- Approval-required actions: frontend dependency, framework, build tool, or JS test runner adoption.

## Acceptance gates

### Automated

```bash
git status --short
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
```

### Human

- Required? Yes
- Reason: first playable UI requires product/UX review.

### Manual checks

- Load `http://127.0.0.1:8000/`.
- Complete levels 1-5.
- Verify reset, undo, invalid feedback, completion/next-level flow, progress persistence, and desktop/mobile-width layout.

## Risks and open questions

- Risk: first-five playthrough reveals a mechanics contradiction requiring a Change Request.
- Risk: UI taste expands beyond clean default styling.
- Open question: whether a formal JS test runner should replace the no-dependency harness later.

## Stop conditions

- Accepted gameplay rules need to change.
- A framework, build step, or dependency becomes necessary.
- Levels 1-5 cannot be completed under accepted rules.
- Product/UX judgment is required before proceeding.
