# Current State

## Active Objective

CR-0003 implementation is complete locally (accepted 2026-06-10). Sub-change A and Sub-change B are implemented. Automated checks pass, and an engine-level completion trace exists for redesigned levels 2-5. A2 human UX/product checkpoint remains open until the project owner manually plays all five levels.

## Active Contract

- Spec: `docs/specs/SPEC-0003-frontend-gameplay-ui.md` (Accepted — CR-0003 wording update applied)
- Plan: `docs/plans/PLAN-0003-frontend-gameplay-ui.md` (Ready — CR-0003 wording update applied)
- Batch: `docs/plans/batches/BATCH-0003-first-playable-ui.md`
- Change Requests: `docs/change-requests/CR-0002-a2-ux-mechanics-revision.md` (Accepted, fully implemented)
- Change Requests: `docs/change-requests/CR-0003-direction-mechanic-and-level-redesign.md` (Accepted, implemented locally)
- Branch: `codex/application-scaffold`

## Current Status

- `BATCH-0001` complete.
- `BATCH-0002` complete. All 24 backend tests pass. Level validator passes.
- `BATCH-0003` automated work complete. JS tests pass. Server starts.
- `CR-0002` fully implemented (keyboard focus, facing indicator, diagonal jump, Space→interact).
- `CR-0003 Sub-change A` implemented: two-press direction mechanic in `engine.js` + engine tests updated. All JS tests pass.
- `CR-0003 Sub-change B` implemented: levels 2-5 were redesigned in `backend/app/data/levels.json`.
- Engine-level solution traces complete levels 2-5 with the accepted mechanics.
- No local commit has been made yet. The working tree remains dirty with uncommitted BATCH-0003, CR-0002, and CR-0003 changes.

## Blocking: A2 Human UX/Product Checkpoint

The next gate is human review. Automated checks pass and levels 2-5 have engine-level completion traces,
but A2 cannot close until the project owner manually plays all five levels in the browser and accepts the
first-playable UX/product feel.

### Engine-level solution traces for redesigned levels

These traces were run with `frontend/js/engine.js` against `backend/app/data/levels.json`:

| Level | Completion sequence |
|---|---|
| 2 | `interact`, `moveRight`, `jump`, `jump`, `interact`, `jump` |
| 3 | `interact`, `moveRight`, `interact`, `jump`, `jump`, `jump`, `moveRight` |
| 4 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump` |
| 5 | `interact`, `moveRight`, `moveRight`, `interact`, `jump`, `jump`, `jump` |

Level 1 remains unchanged from the accepted first playable baseline.

## Accepted Mechanics (current, post CR-0002 + CR-0003-A)

| Mechanic | Behaviour |
|---|---|
| `moveLeft` when facing right | Turn to face left. No movement. No moves increment. No history push. Returns `changed: false, invalid: false`. |
| `moveLeft` when facing left | Attempt to move left. If blocked → `invalid: true`. If clear → move, increment moves, gravity, push history. |
| `moveRight` when facing left | Turn to face right. No movement. No moves increment. No history push. |
| `moveRight` when facing right | Attempt to move right. If blocked → `invalid: true`. If clear → move, increment moves, gravity, push history. |
| `jump` | Diagonal: one row up, one col in `state.facing` direction. Target must be in bounds and empty. Gravity applies after. |
| `interact` | Pick up adjacent block (facing side) if not carrying. Place carried block at adjacent cell (facing side) if carrying and target is empty. |
| `reset` | Restore initial level state, clear history, moves=0, apply gravity. |
| `undo` | Restore most recent history entry. |
| Gravity | Phase 1: all uncarried blocks fall simultaneously until stable. Phase 2: player falls until stable. |
| Facing indicator | CSS `data-facing` attribute on player cell; white border-trick triangle points in facing direction (implemented). |
| Carry indicator | Orange pip `::before` on carrying cell, `data-carry-side` on facing side (implemented). |
| Keyboard | A/← moveLeft, D/→ moveRight, W/↑ jump, E/Enter/Space interact, Z undo, R reset. |

## Keyboard binding (shared/app_contract.json)

```json
"keyboard": {
  "moveLeft":  ["ArrowLeft", "KeyA"],
  "moveRight": ["ArrowRight", "KeyD"],
  "jump":      ["ArrowUp", "KeyW"],
  "interact":  ["KeyE", "Enter", "Space"],
  "reset":     ["KeyR"],
  "undo":      ["KeyZ"]
}
```

## Automated Checks (current)

```
.venv/bin/python tools/validate_levels.py                              → Validated 5 levels from backend/app/data/levels.json ✓
.venv/bin/python -m pytest tests/test_api.py tests/test_level_validation.py → 24 passed, 1 known StarletteDeprecationWarning ✓
node tests/js/run-tests.mjs                                             → ok physics / ok engine / All JS tests passed ✓
git diff --check                                                        → no whitespace errors ✓
```

Additional engine trace:
```
node --input-type=module -e "<engine trace>" → levels 2-5 complete ✓
```

## Files Changed (uncommitted)

Modified:
- `README.md`
- `backend/app/data/levels.json` — levels 2-5 redesigned (CR-0003-B)
- `backend/app/main.py` — catch-all static route for JS/CSS files
- `docs/plans/PLAN-0003-frontend-gameplay-ui.md`
- `docs/plans/batches/BATCH-0003-first-playable-ui.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0003-frontend-gameplay-ui.md`
- `docs/status/CURRENT_STATE.md`
- `frontend/index.html` — tabindex on board, jump button label
- `frontend/style.css` — focus ring suppression, facing triangle, carry pip
- `shared/COMMUNICATION_CONTRACT.md`
- `shared/app_contract.json` — interact added, Space→interact

New (untracked):
- `docs/change-requests/CR-0002-a2-ux-mechanics-revision.md`
- `docs/change-requests/CR-0003-direction-mechanic-and-level-redesign.md`
- `frontend/js/api.js`
- `frontend/js/app.js`
- `frontend/js/contract.js`
- `frontend/js/engine.js` ← two-press direction mechanic applied (CR-0003-A)
- `frontend/js/input.js`
- `frontend/js/physics.js`
- `frontend/js/renderer.js`
- `frontend/js/storage.js`
- `frontend/js/ui.js`
- `package.json`
- `tests/js/engine.test.js` ← turn tests updated (CR-0003-A)
- `tests/js/physics.test.js`
- `tests/js/run-tests.mjs`

Remaining planned edits:
- None.

## Known Deviations from PLAN-0002 (carried forward)

- `pydantic==2.10.4` → `pydantic==2.13.4` (Python 3.14 wheel; A3 approved).
- `httpx` added as dev dependency (A3 approved).
- `[tool.setuptools.packages.find]` added to pyproject.toml.
- `fastapi` upgraded `0.115.6→0.136.3` (A3 approved, asyncio deprecation fix).
- Residual `StarletteDeprecationWarning` (httpx→httpx2 swap deferred to separate A3).

## Human Context Needed

### A2 Human UX/product checkpoint (REQUIRED — not yet cleared)

Automated checks and engine traces have passed. The project owner now needs to run:

```bash
.venv/bin/python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
# visit: http://127.0.0.1:8000/
```

Manual review:
- Keyboard controls (A/D/W/Space/E/R/Z).
- On-screen controls (mobile layout).
- Level selector loads all five levels.
- Reset and undo work correctly.
- First press of opposite direction turns in place, second press moves.
- Invalid-move feedback appears in status region.
- Completion dialog shows on level clear.
- Best-moves tracking persists across reloads.
- Desktop and mobile-width layout.
- **All 5 levels are completable in manual browser play**.

The project owner must accept or reject first-playable UX/product feel before any follow-on scope.

## Next Action

**Project owner: perform the A2 human UX/product checkpoint** by manually playing all five levels in the browser.

If accepted, the next agent can prepare an appropriate local commit for the uncommitted BATCH-0003 + CR-0002 + CR-0003 work, then wait for explicit approval before any push or PR.

## Last Updated

2026-06-11
