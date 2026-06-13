# CR-0003: Two-Press Direction Change and Level Redesign

Status: Proposed
Owner: Unassigned
Created: 2026-06-10
Related spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
Related plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
Related CR: `docs/change-requests/CR-0002-a2-ux-mechanics-revision.md` (accepted)

## Trigger

Continued A2 human UX/product review surfaced two blocking issues:

1. **Pressing a direction key immediately moves the player** — when a player is facing right and presses left, they instantly move left. To pick up or place a block on the opposite side without stepping into it first, the player has no way to face that direction in place.

2. **Levels 4 and 5 are unsolvable as designed** — in both levels, the only movable block lands on top of a static wall after gravity resolves. The player has no way to reach the elevated block to interact with it, and the same wall blocks horizontal movement to the goal. The levels are not merely hard: they are logically impassable. Additionally, the broader level set does not teach the core "place a block as a step" mechanic; every current level requires only carrying or avoiding a block, not using it constructively.

---

## What assumption failed

### Issue A — Two-press direction

**Assumption:** the player always knows in advance which direction they want to move, and pressing a direction key should immediately move them that way.

**What actually happens:** the player wants to interact with something on the side they are not currently facing. To do so they must first step left or right (changing facing as a side effect of movement), which overshoots their position by one column. There is no way to turn in place. Placing a block on the opposite side requires an extra corrective move, which the player may not understand is needed.

**Rule that produced this:** `SPEC-0003 §Gameplay Rules`:
> "Moving left/right changes facing even when the move is blocked."
> "A successful left/right move changes the player column by one and increments `moves` by one."

The spec treats facing and movement as a single inseparable action. Turning in place is only achievable accidentally (by pressing into a wall).

### Issue B — Level solvability

**Assumption:** levels 1-5 from `PLAN-0002` would be completable under the accepted mechanics.

**What actually happens:** levels 4 and 5 are provably unsolvable.

Level 4 ("Carry Over") after gravity:
```
........
........
........
...B....   ← movable block at (3,3) resting on the wall below
#P.#.G.#   ← player (4,1), static wall (4,3), goal (4,5)
```
- Player cannot walk right past the wall at (4,3).
- Diagonal jump right from (4,2) targets (3,3) — occupied by the movable block. Jump is blocked.
- Diagonal jump left goes away from the goal.
- The movable block cannot be interacted with because the player can only interact at the same row, and they can never reach row 3 to stand adjacent to the block: any jump that lands at (3,2) is immediately pulled back to (4,2) by gravity because (4,2) is empty terrain.
- The block is unreachable; the goal is unreachable.

Level 5 ("Final Lift") after gravity:
```
........
...B....   ← movable block at (3,3) resting on the wall below
........
#P.#G..#   ← player (4,1), static wall (4,3), goal (4,4)
```
- Same structural problem: movable block sits on a static wall, diagonal jump to (3,3) is blocked by the block, and the player has no way to reach the block from row 3.

Additionally, **no level in the current set requires the player to place a block as a step or a ladder**. The accepted SPEC-0003 §Gameplay Rules define pickup, placement, and gravity specifically to enable constructive block use ("interact while carrying attempts to place the carried block"). None of the five levels exercise this mechanic. The game's name and core loop imply that players _build_ paths, but no current level asks them to do so.

---

## Current accepted spec/plan says

**SPEC-0003 §Action Names:**
> `moveLeft`: attempt one-column left movement and set facing left.
> `moveRight`: attempt one-column right movement and set facing right.

**SPEC-0003 §Gameplay Rules (movement):**
> "Moving left/right changes facing even when the move is blocked."
> "A successful left/right move changes the player column by one and increments `moves` by one."

**SPEC-0003 §Gameplay Rules (placement):**
> "Interact while carrying attempts to place the carried block into the adjacent cell in the facing direction."
> "Placement succeeds only if the target cell is empty terrain, in bounds, and unoccupied."

**PLAN-0002 §Level data (levels 4 and 5):**
Level 4 grid row 3: `"#..B...#"` (movable block at col 3)
Level 4 grid row 4: `"#P.#.G.#"` (static wall at col 3)
Level 5 grid row 2: `"#..B...#"` (movable block at col 3)
Level 5 grid row 4: `"#P.#G..#"` (static wall at col 3)

---

## Proposed change

### Sub-change A — Two-press direction mechanic

Replace the current one-step "face-and-move" rule with a two-step "turn-then-move" rule:

**New rule for `moveLeft`:**
- If `state.facing !== 'left'`: turn the player to face left. Do not attempt movement. Do not increment `moves`. Do not push to history. Return `{ changed: false, invalid: false, message: 'Turned left.' }`.
- If `state.facing === 'left'`: attempt to move left as currently specified. If the target is solid, return `{ invalid: true, changed: false, message: 'Blocked.' }`. If clear, move left, increment `moves`, apply gravity, push history.

**New rule for `moveRight`:** symmetric.

**What does not change:**
- Jump still uses current facing to determine diagonal direction.
- Interact still uses current facing to determine the adjacent cell.
- Facing updates in the returned state in both the turn case and the move case.
- Gravity still applies after a successful move.
- History and `moves` are unchanged for a turn.
- The renderer must show facing at all times (already implemented in CR-0002 sub-change B).

**Practical effect:** pressing the opposite direction key once turns the character in place. The second press in the same direction (or the first press if already facing that way) moves or is blocked. This lets the player face any direction freely and then interact, jump, or move without overshooting.

**New ActionResult message:** `'Turned left.'` / `'Turned right.'` for the turn-only case (not an invalid action, not a move).

**Engine change:** `dispatchGameAction` for `moveLeft` and `moveRight` splits into two branches based on `state.facing === requested direction`. Both branches update facing in the returned state.

**Test change:** the existing `moveLeft blocked` assertion assumes the player faces right at `(4,1)` and tries to move left, hitting the wall. With the new mechanic, the first press from facing right only turns; it does not hit the wall. The wall-blocked test must be rewritten as a two-step sequence: first press turns left (valid, changed: false), second press attempts movement (invalid: true because (4,0) is a wall).

### Sub-change B — Level redesign (levels 2–5)

Replace levels 2–5 with designs that:

1. Are provably completable under the accepted mechanics (diagonal jump, two-press direction, carry and place).
2. Progressively teach block placement as a construction tool, not just an obstacle to carry out of the way.
3. Prefer two-tall static walls where a stair mechanic is intended, so a single diagonal jump cannot bypass them unaided.
4. Use the "place block as a step" pattern the user described: movable block placed adjacent to a static wall to create a step the player then jumps onto.

**Design principles the new levels must satisfy:**

- Level 1 remains unchanged (introductory carry-and-walk).
- Level 2: one static wall (1 tall), one movable block. Requires picking up the block and placing it at a position where a diagonal jump lands the player on the other side. Teaches: pick up block, place block, jump.
- Level 3: one static wall (2 tall — two stacked '#' cells), one movable block. A 2-tall wall cannot be jumped over unaided by a single diagonal jump. Requires placing the block as a step on one side of the wall, then jumping from the step. Teaches: constructive placement enables new movement.
- Level 4: two static walls side by side (1 tall) and a ledge. Requires placing the block adjacent to the wall to reach the ledge and then the goal. Teaches: block-as-ladder to an elevated goal.
- Level 5: composite challenge combining the stair pattern with carry mechanics. No solution path without placing the block.

**Exact grids are defined during implementation**, verified by `python tools/validate_levels.py`, and must be manually playable by the project owner before A2 closes. All five levels must be completable and the solution path must be reachable step by step with the accepted mechanics.

**Backend change:** `backend/app/data/levels.json` (levels 2–5 grids only). Level IDs, slugs, titles, dimensions, and schema remain unchanged. The validator already accepts any valid grid for these levels and will re-validate automatically.

---

## Why this is necessary

- **Sub-change A:** without turn-in-place, the player cannot selectively interact with objects on either side without first moving into an unintended position. The existing "face-and-move" rule collapses two operations into one, which is confusing and prevents fine-grained block placement. Implementation cannot proceed toward any future mechanic that requires directional precision.
- **Sub-change B:** levels 4 and 5 are logically unsolvable in their current form. An A2 checkpoint cannot be accepted if half the required levels cannot be completed. Beyond solvability, the level set never exercises the core "block builder" mechanic (constructive placement), which means the game's identity is not demonstrated by any of the five levels. Both issues must be resolved before the A2 checkpoint can close.

---

## Impact

- **Scope:** engine gameplay rule change (A) and level data edit (B). No new modules, no new routes, no new dependencies.
- **Files:**
  - `docs/specs/SPEC-0003-frontend-gameplay-ui.md` — movement rule update (A)
  - `docs/plans/PLAN-0003-frontend-gameplay-ui.md` — engine contract update (A)
  - `frontend/js/engine.js` — `moveLeft`/`moveRight` branch logic (A)
  - `tests/js/engine.test.js` — turn assertion, blocked-after-turn assertion, move-after-turn assertion (A)
  - `backend/app/data/levels.json` — levels 2–5 grids (B)
  - `docs/status/CURRENT_STATE.md` — update after implementation
- **Tests:**
  - Engine tests: rewrite the `moveLeft blocked` test group; add `turn then move` and `turn then blocked` assertions. Physics tests: unaffected.
  - Backend tests: `test_api.py` does not assert grid content; unaffected. `test_level_validation.py` re-runs against new grids; must pass.
  - Manual: all five levels must be played to completion after changes before A2 closes.
- **Docs:** README keyboard table unchanged (left/right keys still move left/right — turn is the first press). On-screen button labels unchanged.
- **Dependencies:** none.
- **Security/privacy:** none.
- **Token/context impact:** low. All relevant files are already in context from BATCH-0003.
- **Timeline/PR size:** small. One focused implementation pass covering engine logic and level data, followed by manual playthrough.

---

## Options considered

1. **Accept A and B:** fixes both the interaction model and level solvability in one implementation pass. Requires manual re-play of all five levels before closing the A2 checkpoint.

2. **Accept B only (fix levels, keep one-press movement):** levels become solvable but placing blocks on the opposite side remains awkward. The player can still turn accidentally by pressing into a wall, so the turn mechanic emerges implicitly; it is just not reliable.

3. **Accept A only (two-press, keep current levels):** levels 4 and 5 remain unsolvable. A2 checkpoint cannot close.

4. **Reject both:** the A2 checkpoint cannot close in its current state. Implementation is blocked.

---

## Recommendation

**Accept A and B together.**

They have the same cause (mechanics and level design were not validated against actual play) and should be resolved in the same implementation pass so that the manual playthrough at the end verifies both changes together. Accepting only one would still block the A2 checkpoint.

---

## Decision

Decision: Accepted
Date: 2026-06-10
Rationale: Sub-change A required for directional interaction precision; sub-change B required to close A2 (levels 4–5 are unsolvable).
