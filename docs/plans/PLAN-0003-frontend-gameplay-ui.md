# PLAN-0003: Frontend Gameplay UI

Status: Completed
Approval Class: A2
Maturity: M4
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Build the vanilla JavaScript first playable UI for levels 1-5.

**Architecture:** Keep gameplay logic pure in engine/physics modules, use contract-based API loading, render state into DOM/CSS grid, and keep storage/UI/input responsibilities separate. This plan ends at the first playable human checkpoint.

**Tech stack:** Browser ES modules, vanilla JavaScript, CSS Grid, browser `localStorage`, Node built-in assertion tests, no frontend dependencies by default.

## Preconditions

- [ ] `SPEC-0003` is accepted.
- [ ] `PLAN-0001` and `BATCH-0001` are complete.
- [ ] `PLAN-0002` and the backend API batch are complete.
- [ ] Backend routes serve `/`, `/shared/app_contract.json`, `/api/v1/config`, `/api/v1/levels`, and `/api/v1/levels/{levelId}`.
- [ ] `python tools/validate_levels.py` and `pytest tests/test_api.py tests/test_level_validation.py` pass.
- [ ] Stop before adding frontend dependencies, frameworks, build tools, lockfiles, or JS test-runner packages.

## File structure

| Action | Path | Responsibility |
|---|---|---|
| Modify | `shared/app_contract.json` | Add accepted `interact` action and keyboard bindings. |
| Modify | `shared/COMMUNICATION_CONTRACT.md` | Document the added shared action/binding. |
| Create | `package.json` | No-dependency ESM marker and optional JS test script; no dependencies and no lockfile. |
| Modify | `frontend/index.html` | Semantic app shell, controls, status region, board mount, completion dialog. |
| Modify | `frontend/style.css` | Responsive board, controls, HUD, focus states, light/dark system colors. |
| Create | `frontend/js/contract.js` | Contract loading and validation. |
| Create | `frontend/js/api.js` | Contract-based API client. |
| Create | `frontend/js/physics.js` | Pure bounds, collision, grounded, and gravity helpers. |
| Create | `frontend/js/engine.js` | Pure parsing, state creation, action dispatch, reset, undo, completion. |
| Create | `frontend/js/renderer.js` | DOM rendering for board, HUD, level selector, carried state, completion dialog. |
| Create | `frontend/js/input.js` | Keyboard and button-to-action mapping from contract actions. |
| Create | `frontend/js/storage.js` | Local progress read/write using `contract.storageKeys.progress`. |
| Create | `frontend/js/ui.js` | Status text, modal state, control enabled/disabled helpers. |
| Create | `frontend/js/app.js` | Boot sequence, state ownership, dispatch loop, API calls, persistence orchestration. |
| Create | `tests/js/run-tests.mjs` | No-dependency Node assertion runner. |
| Create | `tests/js/engine.test.js` | Engine reducer tests. |
| Create | `tests/js/physics.test.js` | Physics helper tests. |
| Modify | `README.md` | Frontend controls, JS test command, local playtest notes. |
| Modify | `docs/repo-map.md` | Mark frontend commands/modules current after implementation. |

No backend API behavior, dependency installation, CI, deployment, or levels beyond 1-5 are in scope.

## Shared contract patch

Update `shared/app_contract.json` exactly within the existing `actions` object:

```json
"interact": "interact"
```

Update the existing `keyboard` object exactly with:

```json
"interact": ["KeyE", "Enter"]
```

Update `shared/COMMUNICATION_CONTRACT.md` so the action table includes `interact` as the pickup/place command and the keyboard table includes `KeyE` and `Enter`.

If the current contract shape cannot accept these keys without renaming existing actions, stop and open a Change Request.

## Package and test harness contract

Create `package.json` only if it does not already exist. It must contain no dependencies:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "test:js": "node tests/js/run-tests.mjs"
  }
}
```

Do not create `package-lock.json`, `node_modules/`, a bundler config, or a frontend framework scaffold.

`tests/js/run-tests.mjs`:

- Imports and runs `physics.test.js`, then `engine.test.js`.
- Uses only Node built-ins.
- Prints:

```text
ok physics
ok engine
All JS tests passed
```

- Exits non-zero on the first assertion failure.

## DOM contract

`frontend/index.html` must expose these stable hooks:

- `#app`
- `#status-region` with `aria-live="polite"`
- `#level-select`
- `#moves-count`
- `#carried-state`
- `#board`
- `#completion-dialog`
- `#completion-title`
- `#completion-summary`
- Buttons with `data-action="moveLeft"`, `data-action="moveRight"`, `data-action="jump"`, `data-action="interact"`, `data-action="undo"`, and `data-action="reset"`.

`#board` renders cells as children with:

- `role="gridcell"`
- `data-row`
- `data-col`
- `data-tile`
- CSS classes from this set: `cell`, `cell-empty`, `cell-wall`, `cell-goal`, `cell-player`, `cell-block`.

The board container uses `role="grid"` and an accessible name. Status and completion text must be concise and player-facing.

## Runtime contracts

### Contract module

`frontend/js/contract.js` exports:

- `DEFAULT_CONTRACT_PATH = "/shared/app_contract.json"`.
- `loadContract(path = DEFAULT_CONTRACT_PATH, fetchImpl = fetch) -> promise resolving to a contract object`.
- `validateContract(contract) -> object`.

Validation asserts the contract has `version`, `appName`, `api`, `static`, `tiles`, `actions`, `keyboard`, `storageKeys`, `gameplay`, and `ui`, and that `actions.interact` and `keyboard.interact` exist after the planned contract patch.

### API module

`frontend/js/api.js` exports:

- `createApiClient(contract, fetchImpl = fetch)`.

The returned client has:

- `getConfig() -> promise resolving to a config object`
- `listLevels() -> promise resolving to an array of level metadata objects`
- `getLevel(levelId) -> promise resolving to one level definition`

All URLs derive from `contract.api.origin + contract.api.prefix + contract.api.routes[...]`. API failures throw `Error` with the API error code when the backend returns an error envelope.

### Physics module

`frontend/js/physics.js` exports:

- `isInBounds(position, level) -> boolean`.
- `terrainAt(position, level) -> string`.
- `isSolid(position, state, level) -> boolean`.
- `isEmpty(position, state, level) -> boolean`.
- `isGrounded(entity, state, level) -> boolean`.
- `applyGravity(state, level) -> state`.

Rules:

- Out-of-bounds is not empty and is treated as solid for movement.
- Walls are solid.
- Uncarried blocks are solid.
- The player is solid to block gravity.
- Carried blocks do not fall independently.
- `applyGravity` settles uncarried blocks first, then the player, repeating each phase until stable.
- Helpers return new state objects and do not mutate their inputs.

### Engine module

`frontend/js/engine.js` exports:

- `MAX_HISTORY = 50`.
- `parseLevel(level, contract) -> ParsedLevel`.
- `createInitialState(level, contract) -> RuntimeState`.
- `dispatchGameAction(state, action, level, contract) -> ActionResult`.

`ParsedLevel`:

```json
{
  "id": 1,
  "width": 8,
  "height": 6,
  "terrain": ["########"],
  "initialPlayer": { "row": 4, "col": 1 },
  "initialBlocks": [{ "id": "b1", "row": 3, "col": 3 }],
  "goal": { "row": 4, "col": 5 }
}
```

Block IDs are assigned in row-major order as `b1`, `b2`, and so on.

`RuntimeState`:

```json
{
  "levelId": 1,
  "status": "playing",
  "moves": 0,
  "facing": "right",
  "player": { "row": 4, "col": 1 },
  "carriedBlock": null,
  "blocks": [{ "id": "b1", "row": 4, "col": 3 }],
  "goal": { "row": 4, "col": 5 },
  "history": []
}
```

`createInitialState` parses the level, clears history, sets moves to `0`, sets facing to `right`, applies gravity, and sets status to `completed` only if the settled player starts on the goal.

Actions are objects with `type` from shared contract action values:

```json
{ "type": "moveLeft" }
{ "type": "moveRight" }
{ "type": "jump" }
{ "type": "interact" }
{ "type": "reset" }
{ "type": "undo" }
{ "type": "selectLevel", "levelId": 2 }
```

`ActionResult`:

```json
{
  "state": {},
  "changed": true,
  "completed": false,
  "message": "Moved.",
  "invalid": false
}
```

Messages:

- Move success: `Moved.`
- Jump success: `Jumped.`
- Pickup success: `Picked up block.`
- Placement success: `Placed block.`
- Reset success: `Level reset.`
- Undo success: `Undo.`
- Completion: `Level complete.`
- Invalid move: `Blocked.`
- Invalid pickup: `No block to pick up.`
- Invalid placement: `Cannot place block there.`
- Invalid undo: `Nothing to undo.`

Successful player actions push the previous runtime state into history before mutation. History keeps the newest `MAX_HISTORY` entries. Invalid actions return the original state object, do not increment moves, and do not push history. `reset` and `undo` do not increment moves.

### Storage module

`frontend/js/storage.js` exports:

- `loadProgress(contract, storage = localStorage) -> object`.
- `saveProgress(contract, progress, storage = localStorage) -> void`.
- `recordCompletion(contract, state, storage = localStorage) -> object`.

Progress JSON stored at `contract.storageKeys.progress`:

```json
{
  "version": "0.1.0",
  "completedLevels": [1],
  "bestMoves": {
    "1": 6
  },
  "lastLevelId": 1
}
```

Invalid or missing progress returns an empty progress object with matching keys and does not throw.

### Rendering, input, and app modules

- `renderer.js` exports `renderBoard`, `renderHud`, `renderLevelSelect`, and `renderCompletion`.
- `input.js` exports `bindInputs(root, contract, dispatch)` and maps keyboard codes from `contract.keyboard`.
- `ui.js` exports `setStatus(message)`, `showCompletion(state)`, `hideCompletion()`, and `setBusy(isBusy)`.
- `app.js` owns current contract, API client, level list, selected level, current state, and dispatch. It is the only module that calls network, storage, or DOM wiring functions together.

## Test fixtures and assertions

Use the plan levels from `PLAN-0002` as fixtures. Tests may inline the relevant level objects.

### `tests/js/physics.test.js`

Assertions:

- `isInBounds` returns false for negative row/col and row/col at width/height.
- `isSolid` returns true for wall terrain and uncarried block positions.
- `isEmpty` returns true for empty terrain not occupied by player or block.
- `applyGravity` moves an uncarried block down until the cell below is wall or occupied.
- `applyGravity` settles blocks before the player.
- `applyGravity` does not move `carriedBlock`.
- None of the physics helpers mutate their input state.

### `tests/js/engine.test.js`

Assertions:

- `parseLevel` converts `P`, `B`, and `G` into runtime entities and leaves terrain cells empty except walls.
- `createInitialState` applies gravity and sets `levelId`, `moves`, `facing`, `blocks`, `goal`, and empty history.
- Pressing the opposite direction when not already facing that way turns the player in place (no movement, no `moves` increment, no history push). A subsequent press in the same now-facing direction attempts movement as normal.
- Blocked movement while already facing that direction returns `invalid: true`, `changed: false`, and does not increment moves.
- `jump` moves one row upward only when the target is empty and in bounds.
- `interact` picks up the adjacent facing block when not carrying.
- `interact` places a carried block into an adjacent empty cell and then applies gravity.
- Invalid pickup and invalid placement do not mutate state.
- `reset` restores the selected level initial state and clears history.
- `undo` restores the previous history entry without incrementing moves.
- Completion occurs only when the player occupies the goal after gravity resolves.
- History length never exceeds `MAX_HISTORY`.

## Tasks

### Task 0: Preflight

**Files:** None

- [ ] Run:

```bash
git status --short
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
```

- [ ] Expected result: backend validation and API tests exit `0`.
- [ ] Stop if backend is incomplete or failing.

### Task 1: Shared contract and JS test harness

**Files:** `shared/app_contract.json`, `shared/COMMUNICATION_CONTRACT.md`, `package.json`, `tests/js/run-tests.mjs`, `tests/js/engine.test.js`, `tests/js/physics.test.js`

- [ ] Apply the exact `interact` shared contract patch.
- [ ] Add no-dependency `package.json` only if needed for Node ESM imports.
- [ ] Add JS test harness and assertions listed above.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

- [ ] Expected result before engine implementation: tests fail because modules are missing or behavior is not implemented, not because of syntax or import errors in the tests.

### Task 2: Pure engine and physics

**Files:** `frontend/js/engine.js`, `frontend/js/physics.js`

- [ ] Implement pure helpers and reducer contracts.
- [ ] Keep DOM, storage, and network APIs out of these files.
- [ ] Run:

```bash
node tests/js/run-tests.mjs
```

- [ ] Expected result: output includes `ok physics`, `ok engine`, and `All JS tests passed`.

### Task 3: Contract and API loading

**Files:** `frontend/js/contract.js`, `frontend/js/api.js`, `frontend/js/app.js`

- [ ] Implement contract validation and API client.
- [ ] Load contract before creating API client.
- [ ] Fetch level metadata and selected level through contract-derived URLs.
- [ ] Surface API failure codes through status text.

### Task 4: DOM rendering, controls, and storage

**Files:** `frontend/index.html`, `frontend/style.css`, `frontend/js/renderer.js`, `frontend/js/input.js`, `frontend/js/storage.js`, `frontend/js/ui.js`, `frontend/js/app.js`

- [ ] Implement the DOM contract exactly.
- [ ] Render board cells and entities from runtime state.
- [ ] Bind keyboard and on-screen controls for every shared contract action.
- [ ] Save completion progress locally and display best moves when present.
- [ ] Ensure focus-visible styling, reachable controls, named buttons, `aria-live` status, and usable desktop/mobile-width layout.

### Task 5: Documentation and first playable checkpoint

**Files:** `README.md`, `docs/repo-map.md`

- [ ] Document controls, JS test command, and local playtest command.
- [ ] Run all automated checks in this plan.
- [ ] Start the backend locally and manually complete levels 1-5.
- [ ] Stop at the A2 human UX/product checkpoint before expanding mechanics, visuals, or scope.

## Validation

Required automated checks:

```bash
git status --short
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

Expected pass evidence:

- Backend validator prints `Validated 5 levels from backend/app/data/levels.json`.
- Backend pytest exits `0`.
- JS test runner prints `ok physics`, `ok engine`, and `All JS tests passed`.
- `git diff --check` prints no output.

Manual checks:

- Start backend:

```bash
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

- Load `http://127.0.0.1:8000/`.
- Complete levels 1-5.
- Verify keyboard controls, on-screen controls, reset, undo, invalid feedback, completion flow, progress persistence, and desktop/mobile-width layout.

Human checkpoint:

- Required after automated checks and manual playthrough pass.
- Project owner reviews first playable UX/product feel.
- Do not continue into art direction, additional mechanics, or later levels before this checkpoint is accepted.

## Documentation updates

- `README.md`
- `docs/repo-map.md`

## Rollback plan

Revert frontend/shared-contract commit(s) for this plan. Preserve completed scaffold and backend commits unless this plan changed them. Remove `package.json` only if it was created solely for the no-dependency JS harness and no later accepted plan depends on it.

## Risks

- Risk: shared contract shape cannot accept `interact`.
  - Mitigation: stop and open a Change Request before implementation.
- Risk: Node ESM support requires `package.json`.
  - Mitigation: create a no-dependency `package.json` and do not create lockfiles.
- Risk: manual playthrough reveals a mechanics contradiction.
  - Mitigation: stop and create a Change Request before changing accepted rules.
- Risk: first playable UX needs product judgment.
  - Mitigation: stop at the A2 human checkpoint after automated/manual evidence is collected.

## Stop conditions

- Accepted gameplay rules need to change.
- Shared contract action names cannot support required controls without an accepted contract update.
- Backend API or level data is incomplete or failing.
- A frontend dependency, framework, build step, package install, or JS test-runner package becomes necessary.
- Levels 1-5 cannot be completed under accepted mechanics.
- Product/UX judgment is required before proceeding beyond the first playable checkpoint.
