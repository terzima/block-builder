# CR-0002: A2 UX Review — Jump Mechanics, Player Direction, Keyboard Focus, and Space Binding

Status: Accepted
Owner: Unassigned
Created: 2026-06-10
Related spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
Related plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md`

## Trigger

A2 human UX/product review of the first playable build (BATCH-0003) surfaced four issues that block acceptance:

1. **Keyboard does not engage reliably on a laptop** — pressing game keys produces no observable response.
2. **No directional indicator on the player character** — the player renders as a plain coloured square with no facing cue; users cannot determine which direction interact will fire.
3. **Jump is vertical-only and does not match player expectation** — users expect jump to move in the currently-facing direction (diagonal), not straight up. On flat floor levels jump returns the player to the same cell after gravity resolves, making it invisible and unusable.
4. **Space bar triggers jump, not interact** — users expect Space to pick up or place a block; the current contract assigns Space exclusively to jump.

None of the four can be resolved by patching implementation code alone. Issues 1 and 2 are spec gaps. Issues 3 and 4 require changes to accepted gameplay rules and the shared contract.

---

## What assumption failed

### Issue 1 — Keyboard focus
**Assumption:** attaching a `keydown` listener on `document` would reliably capture all game keys regardless of which element had browser focus.

**What actually happens:** the `<select id="level-select">` element receives default browser focus on page load (and again after a level loads). When the select is focused, browsers intercept Arrow keys, Enter, and Space at the OS/browser level before the document-level `keydown` event fires (or ignore `e.preventDefault()` for select-internal navigation). The user types a game key, the select processes it, and no game action dispatches.

`input.js` has no focus management and `SPEC-0003` contains no requirement for it.

### Issue 2 — Player direction
**Assumption:** a coloured square with an outline-on-carry was sufficient for a first playable build.

**What actually happens:** `facing` state exists in the engine and controls where interact fires left or right, but nothing in the renderer exposes it. Users do not know which side a block will be picked up from or placed on. Without this visual, interact actions feel random.

`SPEC-0003 FR-5` says "render … player, carried block state" but does not specify that `facing` must be visible on the player character.

### Issue 3 — Jump mechanics
**Assumption:** "jump one row upward in the same column" was a sufficient first-playable mechanic.

**What actually happens:** all five levels use a flat floor with a ceiling. A straight-up jump immediately triggers gravity, returning the player to the same cell. On every level in the current dataset, jump produces zero net displacement. The user cannot use jump to bypass obstacles, making the mechanic invisible and breaking Level 2 onward (which require getting over or past a barrier to reach the goal).

### Issue 4 — Space bar binding
**Assumption:** mapping Space to jump was a reasonable default for a desktop keyboard.

**What actually happens:** the user's primary physical reflex for "do the game action" is Space. In the current contract `Space` triggers jump (which, per issue 3, does nothing observable). The interact action — the most important mechanic — is behind `E` or `Enter`, neither of which is a natural reflex.

---

## Current accepted spec/plan says

**SPEC-0003 §Gameplay Rules:**
> Jump moves the player one row upward in the same column only if the target cell is empty and in bounds.
> Jump does not require grounded state for this first playable slice.

**SPEC-0003 FR-6:**
> Add keyboard and on-screen controls for every shared contract action.

**SPEC-0003 FR-5:**
> Render walls, empty cells, blocks, player, carried block state, goal, HUD, status, controls, level selector, and completion modal.

**PLAN-0003 §Shared contract patch:**
> `"jump": ["ArrowUp", "KeyW", "Space"]`
> `"interact": ["KeyE", "Enter"]`

No requirement in SPEC-0003 or PLAN-0003 addresses keyboard focus management, player facing visualisation, diagonal or directional jump, or Space-as-interact.

---

## Proposed change

### A — Keyboard focus management

After the board renders and after every level load, call `document.getElementById('board').focus()` (or a designated no-scroll focusable wrapper) so the document focus is never left on the select element during play.

Ensure the board element accepts focus (`tabindex="-1"`) and does not show a focus ring while keyboard focus is on it (use `:focus:not(:focus-visible)` suppression).

Scope: `frontend/index.html`, `frontend/js/app.js`, `frontend/style.css`.
No engine or contract changes required.

### B — Player facing visualisation

Render the player cell with a visible directional indicator that matches `state.facing`:
- A distinct CSS shape, border-side accent, or Unicode arrow character that points left or right.
- When `carriedBlock` is non-null, show the block icon on the facing side of the player cell.

Scope: `frontend/js/renderer.js`, `frontend/style.css`.
No engine or contract changes required.

### C — Directional jump (mechanics change)

Change jump so that it moves the player one row up **and** one column in the current `facing` direction, rather than straight up.

New rule replacing the current jump rule:
> Jump moves the player one row upward and one column in the `facing` direction. The target cell must be empty terrain, in bounds, and unoccupied. Jump does not require grounded state for this slice.

Engine behaviour after the change:
- `dispatchGameAction` with `{ type: "jump" }` computes target `{ row: player.row - 1, col: player.col + (facing === 'right' ? 1 : -1) }`.
- All other rules (gravity after jump, completion check, history push) remain unchanged.

This makes jump useful on flat levels: jumping right moves the player diagonally up-right, landing one row above and one column to the right. Gravity only pulls the player down if the cell directly below the landing cell is empty.

Level solvability must be verified manually for all five levels after this change. The CR is not accepted until the project owner has confirmed all five levels remain completable.

Scope: `SPEC-0003` (gameplay rules section), `PLAN-0003` (task 2 engine contract), `frontend/js/engine.js`, `tests/js/engine.test.js`.

### D — Space bar reassignment (contract change)

Remove `Space` from the `jump` binding. Add `Space` to the `interact` binding.

New contract bindings:
```json
"jump":    ["ArrowUp", "KeyW"],
"interact": ["KeyE", "Enter", "Space"]
```

`W` and `ArrowUp` remain for jump. `Space` becomes the primary reflex key for interact (pick up / place block).

Scope: `shared/app_contract.json`, `shared/COMMUNICATION_CONTRACT.md`, `frontend/js/` (no code change needed — contract is the source of truth for input.js).
`PLAN-0003` keyboard table must also be updated.

---

## Why this is necessary

- **Issue 1:** keyboard input is the primary control path. Without focus management, game keys do not reach the handler reliably. The game is unplayable on a laptop in its current state.
- **Issue 2:** `facing` determines where interact fires. Without a visual cue users cannot predict outcomes, making pickup and placement feel broken.
- **Issue 3:** straight-up jump with immediate gravity is a zero-displacement action on every current level. The mechanic literally does nothing observable. Level 2 ("Low Bridge") cannot be completed without a way to traverse a vertical obstacle, which requires directional jump.
- **Issue 4:** without Space on interact, the primary action key is `E` — not discoverable by casual users. The on-screen button and status messages do not compensate for an unintuitive physical key.

Implementation cannot continue into follow-on batches while levels 1-5 are not completable, the primary control method does not work, and the core mechanic (jump) produces no result.

---

## Impact

- **Scope:** four targeted changes spanning shared contract, engine, renderer, input, and style. No new modules. No backend changes.
- **Files:**
  - `shared/app_contract.json` — keyboard binding update (D)
  - `shared/COMMUNICATION_CONTRACT.md` — keyboard table update (D)
  - `docs/specs/SPEC-0003-frontend-gameplay-ui.md` — jump rule update (C)
  - `docs/plans/PLAN-0003-frontend-gameplay-ui.md` — engine contract and keyboard table update (C, D)
  - `frontend/index.html` — board tabindex (A)
  - `frontend/style.css` — focus management, facing indicator (A, B)
  - `frontend/js/app.js` — board focus call after level load (A)
  - `frontend/js/engine.js` — jump target calculation (C)
  - `frontend/js/renderer.js` — facing indicator on player cell (B)
  - `tests/js/engine.test.js` — update jump assertions (C)
- **Tests:** engine.test.js jump assertions must be revised; all other assertions are unchanged. Physics tests unaffected.
- **Docs:** SPEC-0003 gameplay rules section, PLAN-0003 engine contract and keyboard table, COMMUNICATION_CONTRACT.md keyboard table, CURRENT_STATE.md.
- **Dependencies:** none.
- **Security/privacy:** no change.
- **Token/context impact:** low; all changes are in files already loaded during BATCH-0003 implementation.
- **Timeline/PR size:** small; estimated one focused implementation pass with re-run of all automated checks and manual re-play of levels 1-5.

---

## Options considered

1. **Accept all four sub-changes (A + B + C + D):** fixes the complete set of issues found at the A2 checkpoint in one batch. Requires manual re-play verification before A2 is accepted.

2. **Accept A and B only (focus + visual); defer C and D (jump + Space):** fixes discoverability and keyboard engagement. Jump still does nothing observable; Space still does nothing useful. Levels 1 and 5 may be completable (they require only pick-and-place), but levels 2–4 depend on jumping obstacles. Partial acceptance would close A2 only if all five levels are manually confirmed completable with straight-up jump. Not recommended unless the level designs are revised to remove jump-dependent paths.

3. **Reject:** the first playable remains unacceptable at the A2 checkpoint. No further implementation work is possible until the UX checkpoint is passed.

---

## Recommendation

**Accept all four sub-changes (A + B + C + D).**

Sub-changes A and D (focus, Space binding) are low-risk and fix the immediate input deadlock. Sub-change B (player direction) is a small renderer addition. Sub-change C (directional jump) is the highest-impact change and requires spec revision and manual re-play, but it is the only mechanic that makes jump observable and enables levels 2–4.

Implement in one focused pass. Run all automated checks. Re-play all five levels before closing the A2 checkpoint.

---

## Decision

Decision: Accepted
Date: 2026-06-10
Rationale: All four issues (keyboard focus, player direction, diagonal jump, Space binding) confirmed at A2 human UX review. Accept all sub-changes A+B+C+D in one implementation pass.
