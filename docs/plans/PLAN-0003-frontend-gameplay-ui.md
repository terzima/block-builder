# PLAN-0003: Frontend Gameplay UI

Status: Draft
Maturity: M3
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Build the vanilla JavaScript first playable UI for levels 1-5.

**Architecture:** Keep gameplay logic pure in engine/physics modules, use contract-based API loading, render state into DOM/CSS grid, and keep storage/UI/input responsibilities separate.

**Tech stack:** Vanilla JavaScript modules, CSS Grid, browser `localStorage`, dependency-light Node assertion harness unless a runner is approved.

## Preconditions

- [ ] `SPEC-0003` is accepted.
- [ ] `PLAN-0001` is complete.
- [ ] `PLAN-0002` serves contract and levels locally.

## File structure

- Modify: `frontend/index.html` - semantic app shell.
- Modify: `frontend/style.css` - responsive board/UI styles.
- Create/modify: `frontend/js/contract.js` - contract loading/validation.
- Create/modify: `frontend/js/api.js` - contract-based fetch client.
- Create/modify: `frontend/js/physics.js` - bounds/collision/gravity helpers.
- Create/modify: `frontend/js/engine.js` - state parsing and actions.
- Create/modify: `frontend/js/renderer.js` - board/HUD/selector/modal rendering.
- Create/modify: `frontend/js/input.js` - keyboard/button mapping.
- Create/modify: `frontend/js/storage.js` - localStorage progress.
- Create/modify: `frontend/js/ui.js` - status/modal/control state helpers.
- Create/modify: `frontend/js/app.js` - boot and dispatch loop.
- Create/modify: `tests/js/run-tests.mjs`, `engine.test.js`, `physics.test.js` - no-dependency tests.
- Modify: `README.md`, `docs/repo-map.md` - controls/test/manual checks.

## Contracts to implement

- Runtime state: `levelId`, `status`, `moves`, `player`, `blocks`, `goal`, `history`.
- Action result: `state`, `changed`, `completed`, `message`, `invalid`.
- Actions: `MOVE_LEFT`, `MOVE_RIGHT`, `JUMP`, `ACTION`, `RESET`, `UNDO`, `NEXT_LEVEL`.
- Movement: no pushing; invalid actions do not mutate state, count moves, or push history.
- Gravity: uncarried blocks settle before player and repeat until stable.
- Storage: use `contract.storageKeys.progress`.

## Tasks

### Task 0: Preflight

**Files:** None

- [ ] Run `git status --short`.
- [ ] Confirm backend checks from `PLAN-0002` are available.

### Task 1: Test harness and fixtures

**Files:** `tests/js/run-tests.mjs`, `tests/js/engine.test.js`, `tests/js/physics.test.js`

- [ ] Add a Node built-in assertion harness.
- [ ] Add fixtures for movement, wall/block collision, jump, pickup, placement, gravity, reset, undo, and goal detection.
- [ ] Run tests and confirm expected failures.

### Task 2: Pure engine and physics

**Files:** `frontend/js/engine.js`, `frontend/js/physics.js`

- [ ] Implement parsing, state cloning/history, movement, jump, pickup/place, gravity, reset, undo, and completion.
- [ ] Keep DOM and storage out of these modules.
- [ ] Run JS tests until passing.

### Task 3: Contract and API loading

**Files:** `frontend/js/contract.js`, `frontend/js/api.js`, `frontend/js/app.js`

- [ ] Load contract from `/shared/app_contract.json`.
- [ ] Construct all API URLs from contract fields.
- [ ] Fetch level list and selected level.

### Task 4: Rendering, controls, and storage

**Files:** `index.html`, `style.css`, `renderer.js`, `input.js`, `storage.js`, `ui.js`, `app.js`

- [ ] Render board, HUD, controls, level selector, status, and completion modal.
- [ ] Bind keyboard and on-screen controls.
- [ ] Save/load local progress and best moves.
- [ ] Add accessible focus and live status behavior.

### Task 5: Product check

**Files:** `README.md`, `docs/repo-map.md`

- [ ] Run backend and JS checks.
- [ ] Manually complete levels 1-5.
- [ ] Document controls and manual playtest results.

## Validation

```bash
git status --short
python tools/validate_levels.py
pytest tests/test_api.py tests/test_level_validation.py
node tests/js/run-tests.mjs
git diff --check
git diff --stat
git diff
```

Manual:

- Load `http://127.0.0.1:8000/`.
- Complete levels 1-5.
- Verify reset, undo, invalid feedback, completion/next-level flow, progress persistence, and desktop/mobile-width layout.

## Documentation updates

- `README.md`
- `docs/repo-map.md`
- Optional worklog if playtest reveals deferred observations.

## Rollback plan

Revert frontend commits only. Preserve scaffold and backend commits unless changed by this plan.

## Risks

- Risk: gameplay rule contradiction appears during playtest.
  - Mitigation: stop and open a Change Request.
- Risk: JS harness becomes too limited.
  - Mitigation: request approval for a formal runner before adding dependencies.

## Stop conditions

- Accepted gameplay rules need to change.
- A frontend dependency, framework, or build tool is needed.
- Levels 1-5 are not completable under accepted mechanics.
- Product/UX judgment is required before proceeding.
