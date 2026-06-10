# SPEC-0003: Frontend Gameplay UI

Status: Accepted
Approval Class: A2
Maturity: M2
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: Required for shared contract action expansion unless handled by this spec's accepted plan.

## Context

- Source docs: `SPEC-0002`, `docs/adr/ADR-0000-architecture-direction.md`, `shared/app_contract.json`, `docs/repo-map.md`.
- Current evidence: backend is expected to serve the shared contract and first-five levels locally.
- Why this slice now: this is the first user-testable product milestone.

## Problem

The project needs a vanilla JavaScript frontend that turns backend level data into deterministic, playable puzzle gameplay for levels 1-5.

## Goals

- Implement contract/API loading, pure engine/physics logic, DOM rendering, controls, local progress, reset, undo, and completion flow.
- Make levels 1-5 manually completable.
- Provide automated engine/physics coverage through a dependency-light Node harness unless a runner is approved.
- Provide a human-review checkpoint for first playable UX and product feel.

## Non-goals

- Levels 6-100.
- Sound, music, analytics, accounts, cloud saves, leaderboards, deployment, frontend frameworks, build steps.
- Hazards, enemies, keys, doors, switches, timers, moving platforms, multiple goals, multiple players, pushing blocks, continuous physics.
- Backend-owned gameplay state or move validation.

## Users / actors

- Local player: plays the first five levels.
- Frontend app: loads backend contract and levels.
- Agent/developer: verifies deterministic engine behavior and manual playthroughs.
- Project owner: reviews first playable UX at the human checkpoint.

## Behavioral contract

- User-visible behavior: the browser displays a responsive board, HUD, controls, level selector, status messages, and completion flow.
- System responsibilities: frontend owns input, state transitions, gravity, rendering, reset/undo, completion, and local progress.
- Explicitly unchanged behavior: backend does not calculate moves; final art direction remains deferred.

## Interface and data contract

- Files or modules: `frontend/index.html`, `frontend/style.css`, `frontend/js/app.js`, `frontend/js/api.js`, `frontend/js/contract.js`, `frontend/js/engine.js`, `frontend/js/physics.js`, `frontend/js/renderer.js`, `frontend/js/input.js`, `frontend/js/storage.js`, `frontend/js/ui.js`, `tests/js/run-tests.mjs`, `tests/js/engine.test.js`, `tests/js/physics.test.js`.
- Public functions/classes:
  - `loadContract(path)`: fetches and validates the shared contract.
  - `createApiClient(contract)`: returns `listLevels()` and `getLevel(levelId)` using contract-derived URLs.
  - `parseLevel(level, contract)`: creates immutable terrain and initial runtime state from `LevelDefinition`.
  - `createInitialState(level, contract)`: returns a new runtime state with empty history.
  - `dispatchGameAction(state, action, level, contract)`: returns an action result without mutating the input state.
  - `isInBounds(position, level)`, `isSolid(position, state, level)`, `isEmpty(position, state, level)`, `isGrounded(entity, state, level)`, and `applyGravity(state, level)`: pure physics helpers.
- API routes/events: all API URLs derive from `contract.api.origin + contract.api.prefix + contract.api.routes[...]`.
- Config keys/env vars: frontend reads public contract only.
- Error codes/messages: invalid actions produce local status messages and do not mutate state.

### Required Shared Contract Change

The current shared contract actions are `moveLeft`, `moveRight`, `jump`, `reset`, `undo`, and `selectLevel`. This spec requires an additional action name:

```json
{
  "actions": {
    "interact": "interact"
  },
  "keyboard": {
    "interact": ["KeyE", "Enter"]
  }
}
```

The accepted M4 plan must either update `shared/app_contract.json` and `shared/COMMUNICATION_CONTRACT.md` within this spec's scope or create a Change Request before implementation. The frontend must not hard-code a pickup/place action outside the shared contract.

### Runtime State Shape

```json
{
  "levelId": 1,
  "status": "playing",
  "moves": 0,
  "facing": "right",
  "player": { "row": 3, "col": 3 },
  "carriedBlock": null,
  "blocks": [{ "id": "b1", "row": 2, "col": 3 }],
  "goal": { "row": 3, "col": 5 },
  "history": []
}
```

Runtime invariants:

- `status` is one of `loading`, `playing`, `completed`, or `error`.
- `facing` is `left` or `right`.
- `player`, `goal`, and block positions use zero-based `{ "row": number, "col": number }`.
- `carriedBlock` is either `null` or one block object removed from `blocks`.
- `history` stores prior runtime states before successful player actions, capped by the accepted plan.
- Terrain wall/empty cells remain immutable after parsing.

### Action Names

- `moveLeft`: attempt one-column left movement and set facing left.
- `moveRight`: attempt one-column right movement and set facing right.
- `jump`: attempt one-row upward movement.
- `interact`: pickup or place one block based on carrying state.
- `reset`: restore initial state for the selected level.
- `undo`: restore the previous history entry.
- `selectLevel`: load a selected level.

### Action Result Shape

```json
{
  "state": {},
  "changed": true,
  "completed": false,
  "message": "Moved.",
  "invalid": false
}
```

The `state` object is the next runtime state. Invalid actions return the original state, `changed: false`, `invalid: true`, and a player-readable `message`.

### Gameplay Rules

- Coordinates use row increasing downward and column increasing rightward.
- `#` is solid terrain.
- `.` is empty terrain.
- `P`, `B`, and `G` are parsed from level grid into dynamic runtime entities; after parsing, their source cells are treated as empty terrain except the goal position remains a completion target.
- The player occupies one cell.
- Each block occupies one cell.
- The player cannot move into walls, uncarried blocks, or outside the grid.
- Moving left/right changes facing even when the move is blocked.
- A successful left/right move changes the player column by one and increments `moves` by one.
- Jump moves the player one row upward in the same column only if the target cell is empty and in bounds.
- Jump does not require grounded state for this first playable slice.
- Gravity resolves after successful move, jump, interact/place, reset, undo, and level load.
- Gravity repeatedly moves every uncarried block down one row if the cell below is empty terrain and unoccupied; repeat until no uncarried block can fall.
- After uncarried blocks settle, gravity repeatedly moves the player down one row if the cell below is empty terrain and unoccupied; repeat until stable.
- Carried blocks do not fall independently.
- Interact while not carrying attempts to pick up the adjacent block in the facing direction.
- Pickup succeeds only if the adjacent cell contains one block.
- Pickup removes that block from `blocks`, stores it in `carriedBlock`, increments `moves`, and leaves the player's position unchanged.
- Interact while carrying attempts to place the carried block into the adjacent cell in the facing direction.
- Placement succeeds only if the target cell is empty terrain, in bounds, and unoccupied.
- Placement adds the carried block to `blocks` at the target cell, clears `carriedBlock`, increments `moves`, and then resolves gravity.
- The player cannot carry more than one block.
- Blocks cannot be pushed.
- Reset restores the selected level's initial parsed state, clears history, sets `moves` to zero, and applies gravity.
- Undo restores the most recent history entry if present and does not increment `moves`.
- Successful player actions that change state push the previous state into history before applying the change.
- Invalid actions do not mutate state, do not increment `moves`, and do not push history.
- Completion occurs when the player occupies the goal cell after gravity resolves.
- Completion sets `status` to `completed` and records local progress.

## Requirements

### Functional

- FR-1: Load the shared contract before API calls or gameplay constants.
- FR-2: Fetch level metadata and selected level from backend APIs using contract-derived routes.
- FR-3: Parse level grid into immutable terrain and runtime state matching this spec.
- FR-4: Implement action dispatch for move left, move right, jump, interact pickup/place, reset, undo, select level, completion, move count, invalid feedback, next-level flow, and local progress.
- FR-5: Render walls, empty cells, blocks, player, carried block state, goal, HUD, status, controls, level selector, and completion modal.
- FR-6: Add keyboard and on-screen controls for every shared contract action.
- FR-7: Add engine/physics tests for parsing, movement, wall collision, block collision, jump, pickup, placement, gravity, reset, undo, invalid actions, and completion.
- FR-8: Manually complete levels 1-5.

### Non-functional

- Performance: rebuilding the grid each turn is acceptable for first-five levels.
- Security/privacy: progress stays local in `localStorage` using `contract.storageKeys.progress`; no cloud or account data is introduced.
- Accessibility: controls are keyboard reachable, focus-visible, named by text or accessible labels, status changes use `aria-live`, and contrast is sufficient for default light/dark system modes.
- Observability: invalid actions and completion are visible to the player through status text.
- Maintainability: engine and physics do not touch DOM, storage, or network APIs.

## Dependencies and approvals

- Prerequisite specs/plans: accepted and completed `SPEC-0001`/`PLAN-0001`; accepted and completed `SPEC-0002`/`PLAN-0002`.
- Existing files to read first: `shared/app_contract.json`, `backend/app/data/levels.json`, `frontend/index.html`, `frontend/style.css`, backend tests, backend validator.
- Approval class: A2 because this is the first user-testable product milestone and needs human UX/product review.
- Approval-required actions: frontend dependency, framework, build tool, or JS test runner adoption. The default path is no new frontend dependency.

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
- Reason: first playable UI requires product/UX review after automated checks pass.

### Manual checks

- Load `http://127.0.0.1:8000/`.
- Complete levels 1-5.
- Verify keyboard controls, on-screen controls, reset, undo, invalid feedback, completion/next-level flow, progress persistence, and desktop/mobile-width layout.

## Risks and open questions

- Risk: first-five playthrough reveals a mechanics contradiction requiring a Change Request.
  - Mitigation: stop and revise the accepted spec/plan through Change Request before changing gameplay rules.
- Risk: current shared contract lacks `interact`.
  - Mitigation: update the shared contract through the accepted plan or create a Change Request before implementation.
- Risk: UI taste expands beyond clean default styling.
  - Mitigation: keep first playable UI utilitarian and reserve broader art direction for later specs.
- Open question: whether a formal JS test runner should replace the no-dependency harness later.

## Stop conditions

- Accepted gameplay rules need to change.
- Shared contract action names cannot support required controls without an accepted contract update.
- A framework, build step, frontend dependency, or JS test runner becomes necessary.
- Levels 1-5 cannot be completed under accepted rules.
- Product/UX judgment is required before proceeding beyond the first playable checkpoint.
