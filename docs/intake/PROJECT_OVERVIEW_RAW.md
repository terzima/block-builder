# Grid Block Puzzle Game — Implementation Specification

**Project status:** Planning complete enough for agentic implementation  
**Target stack:** Python + FastAPI backend, vanilla JavaScript frontend, `index.html`, `style.css`, local hosting first  
**Primary goal:** Build a polished, locally hosted block-puzzle platform game that can transition cleanly to HTTPS/web hosting later.

---

## 1. Product Summary

This app is a grid-based, side-view puzzle game where the player moves through discrete tile-based levels. The player must reach a goal tile by walking, jumping one tile high, picking up one movable block at a time, carrying blocks, placing blocks, filling gaps, and building simple elevation steps.

The core gameplay should feel like a deterministic puzzle game, not a continuous-motion platformer. Each user input advances the game by one logical step. This makes the mechanics predictable, easier to debug, easier to test, and suitable for implementation by an agentic coder.

The first implementation should ship with **5 manually designed tutorial/prototype levels**. Once those five prove that movement, jumping, block carrying, block placement, gravity, reset, undo, and level transitions work correctly, expand to a full set of **100 levels**.

---

## 2. Non-Negotiable Requirements

1. Backend must use **Python with FastAPI**.
2. Frontend must use **JavaScript**, `index.html`, and `style.css`.
3. App must be locally hosted first.
4. Future HTTPS/web hosting must be easy to configure without rewriting routes throughout the codebase.
5. All shared communication variables between Python and JavaScript must be centralized in a shared contract file.
6. Gameplay logic must be sound, deterministic, and testable.
7. UI must be intentionally designed, not just a bare technical demo.
8. Backend should serve level data; frontend should own the real-time game loop and player interaction logic.
9. First implementation milestone should use the first 5 levels only.
10. After the first 5 levels validate correctly, create/author/generate levels 6–100.

---

## 3. Questions, Decisions, and Remaining Discussion Points

This section records remaining ambiguity from planning and the chosen implementation answer.

| Question | Determined answer for implementation |
|---|---|
| Is the game top-down or side-view? | Side-view grid platform puzzle. The target can be above or below the starting point, and gravity exists. |
| Is movement continuous or discrete? | Discrete. Every valid key input produces one logical state transition. No continuous acceleration, velocity, or frame-by-frame physics is required for v1. |
| Does the backend run the gameplay loop? | No. Backend serves static assets, level data, config, and optional progress APIs. Frontend owns input handling, movement rules, collision, gravity resolution, win detection, rendering, reset, and undo. |
| Are blocks pushed like Sokoban or carried? | Carried. The player can pick up one block, carry it, and place it. Do not implement automatic block pushing in v1. |
| How many blocks can the player carry? | Exactly one. |
| Can the player jump while carrying a block? | Yes. Carrying a block does not reduce jump height in v1. |
| How high can the player jump? | One tile upward, in the player’s facing direction. This lets the player climb onto a block or a one-tile ledge. |
| What does the Space key do? | Context action: pick up a block when not carrying; place the carried block when carrying. |
| What do arrow keys do? | Left/right move and set facing direction. Up attempts a one-tile jump in the current facing direction. Down is unused in v1 unless later assigned. |
| Can blocks be placed above the player’s head? | No. A carried block may only be placed in the adjacent cell at the player’s current row, in the facing direction. Gravity may then cause the block to fall into a pit. |
| Can a block be placed into empty air? | Yes, but only into the adjacent same-row cell. After placement, gravity immediately resolves and the block falls until supported. This allows filling gaps. |
| Can blocks stack? | Yes. Blocks can stack physically if gravity places one on top of another or if placement rules make a stack possible. However, a block can only be picked up if it is clear above and not supporting another movable block. |
| What counts as reaching the goal? | The player’s grid coordinate equals the goal coordinate after movement and gravity resolve. Blocks on the goal do not complete the level. |
| What happens if a puzzle becomes unsolvable? | The player can press Reset to restart the current level. Also implement Undo to reduce frustration. Do not attempt automatic unsolvable-state detection in v1. |
| Is there a timer or score? | No timer in v1. Track move count and optional par moves for feedback. |
| How is progress saved? | Browser `localStorage` is the default. A simple FastAPI progress endpoint can also exist for future expansion, but no user accounts are required in v1. |
| Should all 100 levels be created immediately? | No. Implement first 5 levels, validate mechanics, then author/generate the remaining 95 levels using the same schema and validation tooling. |
| What visual theme should the game use? | Default v1 theme: clean, modern, high-contrast block-puzzle aesthetic. Final brand/art direction can be changed later without touching game logic. |
| What deployment target will host HTTPS later? | Unknown. Leave hosting provider/domain as a future configuration decision. Use a shared config contract so changing from local to hosted only changes config values and CORS settings. |

### Remaining discussion points after this spec

These are not blockers for v1 implementation:

1. Final public domain and hosting provider.
2. Whether to add sound effects/music.
3. Whether to add user accounts, cloud save, leaderboards, or analytics.
4. Final art direction beyond the clean default UI.
5. Whether mobile touch controls should be first-class or secondary. This spec includes responsive on-screen controls, but desktop keyboard play is the primary v1 target.

---

## 4. Core Gameplay Model

### 4.1 Coordinate system

Use a two-dimensional grid.

- `x` = column index, starting at `0` from the left.
- `y` = row index, starting at `0` from the top.
- Increasing `y` moves downward.
- Each tile is exactly one grid cell.
- Player occupies one cell.
- Each movable block occupies one cell.
- Walls/floors occupy one cell.
- Goal occupies one cell and is traversable by the player.

Example coordinate:

```text
row y=0: ########
row y=1: #......#
row y=2: #..P...#
          01234567 x
```

In this example, the player is at `{ "x": 3, "y": 2 }`.

### 4.2 Tile symbols

Use the following symbols in level maps.

| Symbol | Name | Meaning |
|---|---|---|
| `#` | Wall / fixed terrain | Solid, impassable, immovable. Used for floors, ceilings, side walls, platforms, and obstacles. |
| `.` | Empty / air | Traversable space. Player and blocks can occupy it dynamically. |
| `P` | Player start | Initial player position. Parsed into dynamic state, then treated as empty terrain. Exactly one per level. |
| `B` | Movable block | Initial movable block position. Parsed into dynamic state, then treated as empty terrain. Zero or more per level. |
| `G` | Goal | Goal position. Traversable by player. Parsed into goal overlay, then treated as empty terrain. Exactly one per level for v1. |

### 4.3 Static terrain vs dynamic state

Do not mutate the original level grid directly during gameplay.

At level load:

1. Parse the level’s `grid` array.
2. Convert `#` cells into static terrain.
3. Convert `P` into `state.player` and replace the terrain cell with `.`.
4. Convert each `B` into an entry in `state.blocks` and replace the terrain cell with `.`.
5. Convert `G` into `state.goal` and replace the terrain cell with `.`.
6. Keep the original grid available for reset/debugging.

Runtime state should be derived from static terrain plus dynamic entities.

```json
{
  "levelId": 1,
  "status": "playing",
  "moves": 0,
  "player": {
    "x": 1,
    "y": 4,
    "facing": "right",
    "carryingBlockId": null
  },
  "blocks": [
    { "id": "b1", "x": 3, "y": 4 }
  ],
  "goal": { "x": 7, "y": 4 },
  "history": []
}
```

---

## 5. Gameplay Rules

### 5.1 Solid-cell definition

A cell is solid if it contains either:

1. Static wall/floor terrain `#`, or
2. An uncarried movable block.

The player cannot move into a solid cell. A block cannot be placed into a solid cell. A goal cell is not solid by itself.

### 5.2 Empty-cell definition

A cell is empty for player movement if:

1. It is inside the level bounds.
2. It is not static wall/floor terrain.
3. It does not contain an uncarried movable block.

A cell is empty for block placement if:

1. It is inside the level bounds.
2. It is not static wall/floor terrain.
3. It does not contain another uncarried movable block.
4. It is not occupied by the player.

A movable block may occupy a goal cell. That does not complete the level.

### 5.3 Grounded definition

The player is grounded if the cell directly below the player is solid.

```text
player at: (x, y)
below is:  (x, y + 1)
```

A block is supported if the cell directly below it is solid or the bottom boundary would be reached. Level maps should normally include a bottom row of `#`, so falling out of the world should be rare and treated as a level-design error.

### 5.4 Gravity

Gravity applies after every valid movement/action and after level initialization.

Gravity resolution order:

1. Resolve all uncarried blocks first.
2. Resolve the player second.
3. Repeat until no block or player can fall.
4. Then check the win condition.

Recommended deterministic implementation:

```text
function resolveGravity(state):
    changed = true
    while changed:
        changed = false

        sort uncarried blocks by descending y, so lower blocks settle first
        for each block:
            while cell below block is empty for block movement:
                block.y += 1
                changed = true

        while cell below player is empty for player movement:
            player.y += 1
            changed = true

        if player falls outside level bounds:
            reset level or mark failed state
```

For v1, falling outside bounds should reset the current level and display a clear message such as “You fell out of the level. Resetting.” In well-authored levels, this should not happen.

### 5.5 Facing direction

The player has `facing: "left" | "right"`.

- Pressing Left sets facing to `left`.
- Pressing Right sets facing to `right`.
- Pickup, placement, and jump use the current facing direction.

### 5.6 Horizontal movement

`ArrowLeft` and `ArrowRight` attempt to move the player one cell horizontally.

Rules:

1. Set `facing` to the pressed direction.
2. Compute target cell: `{ x: player.x + dx, y: player.y }`.
3. If target cell is empty for player movement, move player there.
4. Resolve gravity.
5. Increment move count only if the state changed.
6. If target cell is blocked, do not move. Show invalid-action feedback.

No pushing occurs when the player walks into a block. Blocks are moved only by pickup/place/gravity.

### 5.7 Jumping

`ArrowUp` attempts a one-tile jump in the player’s current facing direction.

Rules:

1. Player must be grounded.
2. Let `dx = -1` if facing left, `+1` if facing right.
3. Jump target is `{ x: player.x + dx, y: player.y - 1 }`.
4. If target cell is empty for player movement, move player to target.
5. Resolve gravity.
6. Increment move count only if the state changed.

This supports the intended puzzle behavior:

- Jump onto a block placed next to the player.
- Jump onto a one-tile-high ledge.
- Jump over a small gap if the landing cell is valid after gravity.
- Jump while carrying a block.

Do not implement variable jump heights, mid-air control, momentum, or continuous velocity in v1.

### 5.8 Picking up a block

`Space` picks up a block when the player is not carrying one.

Rules:

1. Player must not already be carrying a block.
2. Look at the adjacent same-row cell in the facing direction: `{ x: player.x + dx, y: player.y }`.
3. If that cell contains a movable block, it is a pickup candidate.
4. The candidate block must be clear above:
   - No movable block directly above it.
   - No fixed wall directly above it.
5. If valid, remove that block from the grid and set `player.carryingBlockId` to the block id.
6. Preserve the block object in state, but mark it as carried rather than giving it board coordinates.
7. Increment move count.
8. Render the carried block visually attached to the player.

The “clear above” rule prevents grabbing blocks that are trapped in a stack or under a ceiling.

### 5.9 Placing a carried block

`Space` places a block when the player is carrying one.

Rules:

1. Player must be carrying exactly one block.
2. Placement target is adjacent, same row, in the facing direction: `{ x: player.x + dx, y: player.y }`.
3. The target cell must be empty for block placement.
4. Place the carried block at the target cell.
5. Set `player.carryingBlockId = null`.
6. Resolve gravity immediately.
7. Increment move count.

Important placement constraints:

- The player cannot place a block above their head.
- The player cannot place a block more than one cell away.
- The player cannot place a block inside walls, inside another block, or inside the player.
- A block may be placed into same-row air and then fall due to gravity. This is the mechanism for filling gaps.

### 5.10 Reset

`R` key and a visible Reset button should reset the current level to its original state.

Reset should:

1. Re-parse the original level definition.
2. Clear move count.
3. Clear history.
4. Restore player, block, and goal positions.
5. Re-render the board.
6. Show a short status message: “Level reset.”

### 5.11 Undo

Implement undo in v1 because the game intentionally allows unsolvable states.

`U` key and a visible Undo button should restore the previous state.

Rules:

1. Before any valid state-changing action, deep-clone current state into `history`.
2. Limit history length to a configurable value, default `100` states.
3. Undo restores the previous state and re-renders.
4. Undo should not decrement completed-level progress.
5. Undo should be disabled or ignored when history is empty.

### 5.12 Level completion

After each action and gravity resolution:

1. Check whether `player.x === goal.x && player.y === goal.y`.
2. If yes, set `state.status = "completed"`.
3. Save progress.
4. Show completion UI.
5. Allow the user to proceed to the next level.

The frontend should not request the next level until the user clicks “Next Level” or presses Enter on the completion modal.

---

## 6. Recommended Project Structure

Use this structure unless the implementation environment strongly favors a different one.

```text
block-puzzle-game/
  README.md
  pyproject.toml
  backend/
    app/
      __init__.py
      main.py
      settings.py
      schemas.py
      middleware.py
      services/
        __init__.py
        level_service.py
        progress_service.py
      data/
        levels.json
        progress.json              # local-only, gitignored if user-specific
  frontend/
    index.html
    style.css
    js/
      app.js                       # bootstraps app
      api.js                       # fetch wrapper and route construction
      contract.js                  # loads shared contract
      engine.js                    # game rules and state transitions
      physics.js                   # gravity and collision helpers
      renderer.js                  # DOM rendering
      input.js                     # keyboard/buttons -> actions
      storage.js                   # localStorage progress/settings
      ui.js                        # modal, status messages, level selector
  shared/
    app_contract.json              # executable shared variables used by Python + JS
    COMMUNICATION_CONTRACT.md      # human-readable mirror of shared variables
  tests/
    test_api.py
    test_level_validation.py
    js/
      engine.test.js
      physics.test.js
  tools/
    validate_levels.py
    generate_levels.py             # used after first 5 are validated
```

### Why use JSON instead of only Markdown for shared variables?

The planning discussion mentioned a shared file “likely a markdown.” Markdown is good for humans but bad as an executable source of truth. The implementation should use:

1. `shared/app_contract.json` as the source of truth read by both Python and JavaScript.
2. `shared/COMMUNICATION_CONTRACT.md` as the human-readable explanation/table.
3. This spec as the implementation guide.

If a value affects both Python and JavaScript, it belongs in `shared/app_contract.json` and should be documented in `shared/COMMUNICATION_CONTRACT.md`.

---

## 7. Shared Communication Contract

### 7.1 Source-of-truth file

Create `shared/app_contract.json`.

Initial recommended content:

```json
{
  "version": "0.1.0",
  "appName": "Grid Block Puzzle",
  "api": {
    "origin": "",
    "prefix": "/api/v1",
    "routes": {
      "health": "/health",
      "config": "/config",
      "levels": "/levels",
      "levelById": "/levels/{levelId}",
      "progress": "/progress"
    }
  },
  "static": {
    "sharedContractPath": "/shared/app_contract.json"
  },
  "tiles": {
    "empty": ".",
    "wall": "#",
    "player": "P",
    "block": "B",
    "goal": "G"
  },
  "actions": {
    "moveLeft": "MOVE_LEFT",
    "moveRight": "MOVE_RIGHT",
    "jump": "JUMP",
    "action": "ACTION",
    "reset": "RESET",
    "undo": "UNDO",
    "nextLevel": "NEXT_LEVEL"
  },
  "keyboard": {
    "moveLeft": ["ArrowLeft", "KeyA"],
    "moveRight": ["ArrowRight", "KeyD"],
    "jump": ["ArrowUp", "KeyW"],
    "action": ["Space"],
    "reset": ["KeyR"],
    "undo": ["KeyU", "KeyZ"]
  },
  "storageKeys": {
    "progress": "gridBlockPuzzle.progress.v1",
    "settings": "gridBlockPuzzle.settings.v1"
  },
  "gameplay": {
    "maxUndoStates": 100,
    "defaultLevelId": 1,
    "totalTargetLevels": 100,
    "initialImplementationLevelCount": 5
  },
  "ui": {
    "defaultTileSizePx": 42,
    "minTileSizePx": 24,
    "maxTileSizePx": 56,
    "animationMs": 110,
    "invalidActionFlashMs": 180,
    "statusMessageMs": 1600
  }
}
```

### 7.2 Shared variables table

| Contract path | Python usage | JavaScript usage |
|---|---|---|
| `api.origin` | Configure absolute API origin for hosted deployments if needed. | Prefix API calls. Empty string means same-origin local hosting. |
| `api.prefix` | FastAPI router prefix. | API client route construction. |
| `api.routes.health` | Health-check route. | Optional startup verification. |
| `api.routes.config` | Returns public config/contract. | Optional runtime config refresh. |
| `api.routes.levels` | List level metadata. | Load level menu and current progression. |
| `api.routes.levelById` | Fetch one full level definition. | Load/play a selected level. |
| `api.routes.progress` | Optional local progress API. | Optional progress sync beyond `localStorage`. |
| `tiles.*` | Level parsing and validation. | Rendering, parsing, and engine helpers. |
| `actions.*` | Not required by backend v1, but useful for tests/docs. | Input dispatch and reducer/action names. |
| `keyboard.*` | Not required by backend. | Keyboard mapping. |
| `storageKeys.progress` | Not required by backend. | Save completed levels/current level/move stats. |
| `gameplay.maxUndoStates` | Optional validation/docs. | State history cap. |
| `gameplay.totalTargetLevels` | Level validation target. | Progress UI total target. |
| `ui.*` | Not required by backend. | CSS variables, animation timing, feedback. |

### 7.3 Route configurability for future HTTPS

For local hosting:

```json
"api": {
  "origin": "",
  "prefix": "/api/v1"
}
```

For same-domain HTTPS hosting later:

```json
"api": {
  "origin": "",
  "prefix": "/api/v1"
}
```

For split frontend/API hosting later:

```json
"api": {
  "origin": "https://api.example.com",
  "prefix": "/api/v1"
}
```

Frontend route construction must always be:

```text
apiBaseUrl = contract.api.origin + contract.api.prefix
fullUrl = apiBaseUrl + routeTemplate
```

Do not hard-code API paths throughout the frontend.

---

## 8. Backend Specification

### 8.1 Backend responsibilities

The backend should:

1. Serve `index.html`, `style.css`, JavaScript files, and the shared contract.
2. Load and validate level data from `backend/app/data/levels.json`.
3. Expose API routes for health, config, level list, level detail, and optional progress.
4. Provide clear error messages for invalid level ids and malformed data.
5. Keep route prefixes and CORS settings configurable.

The backend should not:

1. Run the interactive gameplay loop.
2. Handle keyboard events.
3. Calculate every player movement during normal play.
4. Store user accounts or cloud saves in v1.

### 8.2 FastAPI app boot flow

`backend/app/main.py` should roughly do this:

1. Load settings from environment and `shared/app_contract.json`.
2. Initialize FastAPI app.
3. Register middleware.
4. Include API router under `contract.api.prefix`.
5. Mount static frontend files.
6. Mount or serve the shared contract path.
7. Validate levels on startup.
8. Serve `index.html` at `/`.

Major implementation idea:

```text
settings = load_settings()
contract = load_shared_contract(settings.shared_contract_path)
levels = load_and_validate_levels(settings.levels_path, contract.tiles)
app = FastAPI(title=contract.appName, version=contract.version)
register_middleware(app, settings)
app.include_router(api_router, prefix=contract.api.prefix)
app.mount('/static', StaticFiles(directory='frontend'), name='static')
serve index.html at '/'
serve shared/app_contract.json at '/shared/app_contract.json'
```

### 8.3 Backend settings

Create `backend/app/settings.py`.

Settings should include:

| Setting | Default | Purpose |
|---|---|---|
| `APP_ENV` | `local` | Environment label. |
| `HOST` | `127.0.0.1` | Local bind host. |
| `PORT` | `8000` | Local port. |
| `SHARED_CONTRACT_PATH` | `shared/app_contract.json` | Source of shared Python/JS variables. |
| `LEVELS_PATH` | `backend/app/data/levels.json` | Level data source. |
| `PROGRESS_PATH` | `backend/app/data/progress.json` | Optional local progress file. |
| `CORS_ALLOWED_ORIGINS` | local origins | Required for split frontend/API hosting later. |
| `TRUSTED_HOSTS` | local hosts | Prevent invalid host headers once deployed. |
| `ENABLE_PROGRESS_API` | `true` | Local progress API toggle. |

### 8.4 Backend middleware

Create `backend/app/middleware.py`.

Required middleware:

1. **CORS middleware**
   - Use origins from settings.
   - Local defaults should include:
     - `http://127.0.0.1:8000`
     - `http://localhost:8000`
     - `http://127.0.0.1:5173` if a dev frontend server is ever used.
   - For same-origin FastAPI static serving, CORS will not matter much locally, but it matters for future split hosting.

2. **Trusted host middleware**
   - Local defaults: `127.0.0.1`, `localhost`.
   - Hosted deployments should add the real domain.

3. **Request logging middleware**
   - Log method, path, status code, and elapsed time.
   - Keep logs concise.

4. **Error handling**
   - API errors should return consistent JSON:

```json
{
  "error": {
    "code": "LEVEL_NOT_FOUND",
    "message": "Level 42 does not exist."
  }
}
```

### 8.5 API routes

All routes should be under `contract.api.prefix`, default `/api/v1`.

#### `GET /api/v1/health`

Purpose: local sanity check.

Response:

```json
{
  "status": "ok",
  "appName": "Grid Block Puzzle",
  "version": "0.1.0"
}
```

#### `GET /api/v1/config`

Purpose: return public contract/config. This can mirror `shared/app_contract.json`.

Response:

```json
{
  "version": "0.1.0",
  "appName": "Grid Block Puzzle",
  "api": { "origin": "", "prefix": "/api/v1", "routes": {} },
  "tiles": {},
  "actions": {},
  "keyboard": {},
  "storageKeys": {},
  "gameplay": {},
  "ui": {}
}
```

#### `GET /api/v1/levels`

Purpose: return level metadata, not full grids unless explicitly desired.

Response:

```json
{
  "levels": [
    {
      "id": 1,
      "title": "Walk to the Goal",
      "difficulty": "tutorial",
      "rows": 6,
      "cols": 10,
      "parMoves": 8,
      "blockCount": 0
    }
  ]
}
```

#### `GET /api/v1/levels/{levelId}`

Purpose: return one playable level definition.

Response:

```json
{
  "id": 1,
  "title": "Walk to the Goal",
  "difficulty": "tutorial",
  "introText": "Use Left and Right to reach the goal.",
  "rows": 6,
  "cols": 10,
  "parMoves": 8,
  "grid": [
    "##########",
    "#........#",
    "#........#",
    "#........#",
    "#P.....G.#",
    "##########"
  ]
}
```

#### `GET /api/v1/progress`

Purpose: optional local progress. Frontend can still rely on `localStorage`.

Response:

```json
{
  "currentLevelId": 1,
  "highestUnlockedLevelId": 1,
  "completedLevelIds": [],
  "bestMovesByLevel": {}
}
```

#### `PUT /api/v1/progress`

Purpose: optional local progress save.

Request:

```json
{
  "currentLevelId": 2,
  "highestUnlockedLevelId": 2,
  "completedLevelIds": [1],
  "bestMovesByLevel": {
    "1": 6
  }
}
```

Response:

```json
{
  "saved": true,
  "progress": {
    "currentLevelId": 2,
    "highestUnlockedLevelId": 2,
    "completedLevelIds": [1],
    "bestMovesByLevel": { "1": 6 }
  }
}
```

### 8.6 Backend schemas

Create `backend/app/schemas.py` using Pydantic.

Core schemas:

```text
LevelMeta
  id: int
  title: str
  difficulty: str
  rows: int
  cols: int
  parMoves: int | None
  blockCount: int

LevelDefinition(LevelMeta)
  introText: str | None
  grid: list[str]

ProgressState
  currentLevelId: int
  highestUnlockedLevelId: int
  completedLevelIds: list[int]
  bestMovesByLevel: dict[str, int]

ApiError
  error: { code: str, message: str }
```

### 8.7 Level validation rules

Validate levels at backend startup and in `tools/validate_levels.py`.

Required validation:

1. `id` is unique.
2. `id` starts at 1 and increments without gaps for the final 100-level set.
3. `title` is non-empty.
4. `grid` exists and is non-empty.
5. All rows are the same length.
6. All characters are one of `#`, `.`, `P`, `B`, `G`.
7. Exactly one `P` exists.
8. Exactly one `G` exists.
9. Zero or more `B` exist.
10. `rows` and `cols` match the grid dimensions if explicitly provided.
11. Bottom row should be all `#` unless intentionally designing fall-out behavior.
12. Left and right boundaries should usually be `#`.
13. Player start should not be inside solid terrain after parsing.
14. Goal should not be inside solid terrain after parsing.
15. Blocks should not overlap player or goal in the source grid.

Recommended validation after the engine exists:

1. Run a lightweight solver or scripted smoke checks for tutorial levels.
2. Ensure every level has at least one known solution path stored in metadata or comments.
3. Warn if a level has no blocks but requires elevation change.
4. Warn if a level has blocks trapped under ceilings from the start.

---

## 9. Frontend Specification

### 9.1 Frontend responsibilities

The frontend should:

1. Load the shared contract.
2. Load level metadata and the selected level from the backend.
3. Parse level data into runtime state.
4. Capture keyboard and button input.
5. Apply deterministic gameplay rules.
6. Resolve gravity.
7. Render the board and UI.
8. Track move count, completion, current level, and best moves.
9. Save progress locally.
10. Provide reset and undo.
11. Provide a polished UI with clear feedback.

### 9.2 Frontend boot flow

`frontend/js/app.js` should do this:

```text
main():
    contract = await loadContract('/shared/app_contract.json')
    api = createApiClient(contract)
    progress = loadProgressFromLocalStorage(contract.storageKeys.progress)
    levelList = await api.getLevels()
    selectedLevelId = progress.currentLevelId or contract.gameplay.defaultLevelId
    level = await api.getLevel(selectedLevelId)
    state = createInitialState(level, contract)
    resolveGravity(state)
    renderApp(state, levelList, progress, contract)
    bindKeyboard(dispatch)
    bindUiButtons(dispatch)
```

### 9.3 Frontend major modules

#### `contract.js`

Purpose:

- Fetch `/shared/app_contract.json`.
- Validate that required sections exist.
- Expose contract object to the rest of the frontend.

Key function:

```text
loadContract(path): Promise<Contract>
```

#### `api.js`

Purpose:

- Build route URLs from the shared contract.
- Wrap `fetch`.
- Normalize API errors.

Key functions:

```text
createApiClient(contract)
api.getHealth()
api.getConfig()
api.getLevels()
api.getLevel(levelId)
api.getProgress()
api.saveProgress(progress)
```

All API URLs must be constructed from:

```text
contract.api.origin + contract.api.prefix + contract.api.routes[routeName]
```

#### `engine.js`

Purpose:

- Own state transitions.
- Convert input actions into game state updates.
- Never touch DOM directly.

Key functions:

```text
createInitialState(level, contract)
dispatchGameAction(state, action, level, contract): GameActionResult
tryMoveHorizontal(state, dx)
tryJump(state)
tryPickupOrPlace(state)
resetState(level)
undoState(state)
checkWin(state)
```

`GameActionResult` should include:

```text
{
  state,
  changed: boolean,
  completed: boolean,
  message: string | null,
  invalid: boolean
}
```

#### `physics.js`

Purpose:

- Collision helpers.
- Gravity resolution.
- Solid/empty checks.

Key functions:

```text
isInsideBounds(x, y, level)
isWall(x, y, terrain)
getBlockAt(blocks, x, y)
isSolidCell(state, x, y)
isEmptyForPlayer(state, x, y)
isEmptyForBlock(state, x, y)
isGrounded(state)
resolveGravity(state)
```

#### `renderer.js`

Purpose:

- Render the board using CSS Grid.
- Render player, carried block, movable blocks, walls, empty cells, and goal overlay.
- Keep DOM updates clear and predictable.

Key functions:

```text
renderBoard(rootElement, state, level, contract)
renderHud(hudElement, state, level, progress)
renderLevelSelector(levels, progress)
showInvalidAction(message)
showCompletionModal(level, state)
```

#### `input.js`

Purpose:

- Map keyboard events and UI buttons to contract action names.
- Prevent page scrolling when arrow keys or space are used for gameplay.

Key functions:

```text
bindKeyboard(contract, dispatch)
bindControlButtons(contract, dispatch)
mapKeyboardEventToAction(event, contract)
```

#### `storage.js`

Purpose:

- Save/load progress to `localStorage`.
- Keep local progress independent from backend progress in v1.

Key functions:

```text
loadProgress(storageKey)
saveProgress(storageKey, progress)
markLevelCompleted(progress, levelId, moveCount)
```

#### `ui.js`

Purpose:

- Status text.
- Completion modal.
- Help panel.
- Toast-like messages.
- Level selection controls.

---

## 10. UI/UX Specification

### 10.1 Layout

The `index.html` page should include:

1. App title.
2. Current level title and number.
3. Move count and optional par moves.
4. Main game board.
5. Status/help line.
6. Control buttons:
   - Left
   - Right
   - Jump
   - Pick/Place
   - Undo
   - Reset
7. Level selector or level list.
8. Completion modal.

Recommended semantic structure:

```html
<header class="app-header">...</header>
<main class="app-shell">
  <section class="game-panel">
    <div id="hud"></div>
    <div id="game-board" class="game-board"></div>
    <div id="status-line"></div>
    <div id="controls"></div>
  </section>
  <aside class="side-panel">
    <section id="level-select"></section>
    <section id="instructions"></section>
  </aside>
</main>
<div id="completion-modal"></div>
```

### 10.2 Visual design requirements

The UI should be well made. Minimum quality bar:

1. Centered game area with a clear visual hierarchy.
2. Responsive board that scales to viewport size.
3. Distinct visual treatment for:
   - Wall/floor
   - Empty space
   - Movable block
   - Player
   - Goal
   - Player carrying block
   - Player standing on goal
4. Clear invalid-action feedback, such as a short shake or status message.
5. Clear completion feedback.
6. Buttons should be visually consistent and usable.
7. Keyboard instructions should be visible without needing a README.
8. Current level and move count should always be visible.
9. Completed levels should be marked in the level selector.
10. The board should not shift layout unexpectedly as the player moves.

### 10.3 CSS implementation guidance

Use CSS custom properties to keep styling adjustable:

```css
:root {
  --tile-size: 42px;
  --tile-gap: 2px;
  --board-padding: 12px;
  --animation-ms: 110ms;
}
```

Use CSS Grid for the board:

```text
.game-board {
    display: grid;
    grid-template-columns: repeat(var(--cols), var(--tile-size));
    grid-template-rows: repeat(var(--rows), var(--tile-size));
    gap: var(--tile-gap);
}
```

Tile classes:

```text
.tile
.tile-empty
.tile-wall
.tile-goal
.tile-block
.tile-player
.tile-player-facing-left
.tile-player-facing-right
.tile-player-carrying
.tile-goal-occupied
.tile-invalid-flash
```

The renderer can rebuild the grid each turn for simplicity in v1. If performance becomes an issue later, optimize by updating only changed cells.

### 10.4 Accessibility

Implement:

1. Buttons with text labels and `aria-label` where helpful.
2. Focus-visible styles.
3. `aria-live="polite"` status region for invalid actions and completion messages.
4. Keyboard controls that do not conflict with browser scrolling during active gameplay.
5. Sufficient color contrast.
6. Non-color indicators where possible, such as symbols/icons or shape differences.

### 10.5 Mobile/touch controls

Include on-screen controls from v1, even if keyboard is the primary target.

Recommended controls:

```text
[Left] [Right] [Jump] [Pick/Place] [Undo] [Reset]
```

On mobile widths, stack the side panel under the board and make controls large enough to tap.

---

## 11. Level Data Specification

### 11.1 Level file format

Store levels in `backend/app/data/levels.json`.

Top-level shape:

```json
{
  "version": "0.1.0",
  "levels": [
    {
      "id": 1,
      "title": "Walk to the Goal",
      "difficulty": "tutorial",
      "introText": "Use Left and Right to reach the goal.",
      "parMoves": 8,
      "grid": [
        "##########",
        "#........#",
        "#........#",
        "#........#",
        "#P.....G.#",
        "##########"
      ]
    }
  ]
}
```

`rows`, `cols`, and `blockCount` may be computed by the backend. They can also be included explicitly, but if included, they must be validated against the grid.

### 11.2 Level design constraints

For v1 levels:

1. Use rectangular grids.
2. Keep outer boundaries mostly closed with `#`.
3. Use one goal per level.
4. Use no enemies, hazards, keys, doors, timers, or multi-goal puzzles in v1.
5. Keep early levels small enough that mechanics are obvious.
6. Increase difficulty through layout, block count, elevation, gaps, and required ordering.
7. Avoid softlocks in the first five tutorial levels where possible, but keep Reset and Undo available.

---

## 12. Initial Five Levels

These five levels should be implemented first. They are intentionally simple and designed to validate the engine before creating levels 6–100.

### Level 1 — Walk to the Goal

Purpose: Validate rendering, horizontal movement, goal detection, level completion.

```json
{
  "id": 1,
  "title": "Walk to the Goal",
  "difficulty": "tutorial",
  "introText": "Use Left and Right to reach the goal.",
  "parMoves": 6,
  "grid": [
    "##########",
    "#........#",
    "#........#",
    "#........#",
    "#P.....G.#",
    "##########"
  ]
}
```

Expected solution concept:

1. Move right until standing on `G`.

### Level 2 — First Step

Purpose: Validate pickup, carrying, placement, jumping onto a block, and jumping onto a ledge.

```json
{
  "id": 2,
  "title": "First Step",
  "difficulty": "tutorial",
  "introText": "Pick up the block, place it before the ledge, jump onto it, then jump to the goal.",
  "parMoves": 14,
  "grid": [
    "############",
    "#..........#",
    "#..........#",
    "#.......G..#",
    "#......###.#",
    "#P.B.......#",
    "############"
  ]
}
```

Expected solution concept:

1. Pick up the block.
2. Carry it near the platform.
3. Place it as a step.
4. Jump onto the block.
5. Jump onto the platform.
6. Walk to the goal.

### Level 3 — Fill the Gap

Purpose: Validate placing a block into same-row air, gravity dropping the block, and using it to fill a one-tile-deep gap.

```json
{
  "id": 3,
  "title": "Fill the Gap",
  "difficulty": "tutorial",
  "introText": "A placed block can fall into a gap and become a bridge.",
  "parMoves": 16,
  "grid": [
    "###############",
    "#.............#",
    "#.............#",
    "#.............#",
    "#.............#",
    "#P.B.......G..#",
    "######.########",
    "###############"
  ]
}
```

Expected solution concept:

1. Carry the block to the left side of the floor gap.
2. Face the gap and place the block.
3. Gravity drops the block into the missing floor cell.
4. Walk across the newly supported cell.
5. Reach the goal.

### Level 4 — Bridge and Step

Purpose: Validate using two blocks with different roles: one as a bridge, one as an elevation step.

```json
{
  "id": 4,
  "title": "Bridge and Step",
  "difficulty": "easy",
  "introText": "One block fills the gap. The other becomes a step to the upper platform.",
  "parMoves": 32,
  "grid": [
    "##################",
    "#................#",
    "#................#",
    "#............G...#",
    "#..........#####.#",
    "#P.B.B...........#",
    "#######.##########",
    "##################"
  ]
}
```

Expected solution concept:

1. Use one block to fill the floor gap.
2. Return for the second block.
3. Carry it across the bridge.
4. Place it before the upper platform.
5. Jump onto the block.
6. Jump onto the platform.
7. Walk to the goal.

### Level 5 — Carry It Down

Purpose: Validate goals below the start, falling while carrying a block, and using a carried block after a vertical drop.

```json
{
  "id": 5,
  "title": "Carry It Down",
  "difficulty": "easy",
  "introText": "Bring the block with you when you drop to the lower path.",
  "parMoves": 30,
  "grid": [
    "####################",
    "#..................#",
    "#..................#",
    "#..................#",
    "#P.B...............#",
    "########.###########",
    "#..................#",
    "#...............G..#",
    "############.#######",
    "####################"
  ]
}
```

Expected solution concept:

1. Pick up the block on the upper path.
2. Walk to the vertical opening while carrying it.
3. Fall to the lower path while still carrying the block.
4. Place the block over the lower gap.
5. Let gravity drop it into the gap.
6. Cross and reach the goal.

---

## 13. Full 100-Level Plan

Do not generate all 100 levels until the first five levels are playable and validated. After that, levels 6–100 should be created using the same schema.

### 13.1 Difficulty bands

| Level range | Difficulty | New/expanded concepts |
|---|---|---|
| 1–5 | Tutorial/easy | Movement, goal, pickup, place, jump, gravity, filling gaps, carrying through falls. |
| 6–15 | Easy | Wider gaps, more deliberate block placement, simple upper/lower targets. |
| 16–30 | Easy-medium | Multiple blocks, required ordering, decoy placements, mild backtracking. |
| 31–45 | Medium | More vertical layouts, multiple ledges, blocks that can become inaccessible if mishandled. |
| 46–60 | Medium-hard | Larger maps, chained gap-fill and stair-building patterns, careful reset/undo relevance. |
| 61–75 | Hard | Multi-stage puzzles, stack interactions, constrained space, misleading but recoverable layouts. |
| 76–90 | Very hard | Several blocks, vertical routing, one-way drops, careful sequencing. |
| 91–100 | Expert | Compact but demanding layouts requiring precise ordering and strong understanding of all mechanics. |

### 13.2 Level creation workflow

Recommended workflow after first-five validation:

1. Build level validator.
2. Build or finalize JS engine tests.
3. Author levels 6–20 manually or semi-manually.
4. Add `solutionNotes` metadata for each new level.
5. Run validator after every level addition.
6. Generate or manually draft levels 21–100 in batches of 10.
7. Playtest each batch.
8. Adjust par moves after playtesting.
9. Lock a level only after it has a known solution.

### 13.3 Level metadata for later expansion

For levels 6–100, add optional metadata:

```json
{
  "id": 6,
  "title": "...",
  "difficulty": "easy",
  "introText": null,
  "parMoves": 24,
  "tags": ["gap", "single-block", "lower-goal"],
  "solutionNotes": "Carry the block to the left edge of the pit, place it, cross after gravity settles.",
  "grid": []
}
```

`solutionNotes` can remain hidden from the player but should exist for developer validation.

---

## 14. Game Loop and Data Flow

This section explains exactly how the app logic runs from one part to another.

### 14.1 Page load

1. User opens `http://127.0.0.1:8000/`.
2. FastAPI returns `frontend/index.html`.
3. Browser loads `frontend/style.css`.
4. Browser loads `frontend/js/app.js` as a JavaScript module.
5. `app.js` calls `loadContract('/shared/app_contract.json')`.
6. `api.js` creates an API client from the contract.
7. Frontend loads level metadata from `/api/v1/levels`.
8. Frontend selects the saved current level from `localStorage`, or level 1 if no progress exists.
9. Frontend fetches that level from `/api/v1/levels/{levelId}`.
10. Frontend parses the level into runtime state.
11. Frontend renders the board and controls.

### 14.2 Input handling

1. User presses a key or clicks a control button.
2. `input.js` maps the event to a contract action, such as `MOVE_LEFT` or `ACTION`.
3. `app.js` calls `dispatch(action)`.
4. `dispatch` calls `engine.dispatchGameAction(state, action, level, contract)`.
5. The engine validates the move.
6. If valid, the engine clones the old state into history.
7. The engine mutates or returns a new state.
8. `physics.js` resolves gravity.
9. The engine checks for completion.
10. `renderer.js` updates the board and HUD.
11. `storage.js` saves progress if needed.

### 14.3 Invalid action flow

Invalid examples:

- Walking into a wall.
- Walking into a block.
- Jumping while not grounded.
- Picking up a block while already carrying one.
- Placing a block into a wall.
- Placing a block out of bounds.

Invalid-action behavior:

1. Do not change game state.
2. Do not increment move count.
3. Do not push state into undo history.
4. Render a short status message.
5. Optionally apply a small visual shake/flash.

### 14.4 Completion flow

1. After an action, player position equals goal position.
2. Engine returns `completed: true`.
3. UI shows completion modal.
4. Progress is updated:
   - Add level id to completed levels.
   - Unlock next level.
   - Save best move count if lower than previous best.
5. User clicks Next Level.
6. Frontend fetches next level.
7. Frontend creates new initial state and renders it.

---

## 15. State Management Details

### 15.1 Runtime state shape

Recommended shape:

```json
{
  "levelId": 1,
  "status": "playing",
  "moves": 0,
  "player": {
    "x": 1,
    "y": 4,
    "facing": "right",
    "carryingBlockId": null
  },
  "blocks": [
    {
      "id": "b1",
      "x": 3,
      "y": 4,
      "carried": false
    }
  ],
  "goal": {
    "x": 7,
    "y": 4
  },
  "history": []
}
```

When carried, a block may be represented as:

```json
{
  "id": "b1",
  "x": null,
  "y": null,
  "carried": true
}
```

or removed from the board-position list and stored separately. Pick one representation and use it consistently.

### 15.2 Progress state shape

Recommended localStorage state:

```json
{
  "currentLevelId": 1,
  "highestUnlockedLevelId": 1,
  "completedLevelIds": [],
  "bestMovesByLevel": {},
  "updatedAt": "2026-06-10T00:00:00.000Z"
}
```

Use `contract.storageKeys.progress` as the localStorage key.

---

## 16. Testing Requirements

### 16.1 Backend tests

Use `pytest`.

Required tests:

1. Health endpoint returns status `ok`.
2. Config endpoint returns required contract fields.
3. Level list endpoint returns metadata.
4. Level detail endpoint returns a valid level.
5. Unknown level id returns structured error.
6. Level validator rejects non-rectangular grids.
7. Level validator rejects invalid symbols.
8. Level validator rejects missing player.
9. Level validator rejects multiple players.
10. Level validator rejects missing goal.

### 16.2 Frontend engine tests

Use a lightweight JS test runner if available. If avoiding tooling in v1, create a simple browser/dev test harness. Prefer formal tests once feasible.

Required engine tests:

1. Horizontal movement into empty cell succeeds.
2. Horizontal movement into wall fails.
3. Horizontal movement into block fails.
4. Jump requires grounded state.
5. Jump moves one tile up and forward.
6. Pickup succeeds when adjacent block is clear above.
7. Pickup fails when already carrying.
8. Pickup fails when block has a block or wall directly above.
9. Placement succeeds into adjacent empty cell.
10. Placement fails into wall.
11. Placement fails into occupied block.
12. Gravity drops a block into a one-deep gap.
13. Gravity drops player after walking over unsupported cell.
14. Goal detection fires only when player reaches goal.
15. Reset restores initial state.
16. Undo restores previous state.

### 16.3 First-five playthrough tests

Before adding levels 6–100, manually verify:

1. Level 1 can be completed by walking right.
2. Level 2 can be completed by using the block as a step.
3. Level 3 can be completed by dropping the block into the gap.
4. Level 4 can be completed using one block as bridge and one as step.
5. Level 5 can be completed by carrying the block down and using it on the lower gap.

---

## 17. Implementation Milestones

### Milestone 1 — Project skeleton and shared contract

Deliverables:

1. Project directory structure.
2. `shared/app_contract.json`.
3. `shared/COMMUNICATION_CONTRACT.md`.
4. FastAPI app starts locally.
5. Frontend static files served.
6. `/` returns `index.html`.
7. `/shared/app_contract.json` is reachable.
8. `/api/v1/health` works.

### Milestone 2 — Backend levels API

Deliverables:

1. `levels.json` with levels 1–5.
2. Pydantic schemas.
3. Level validation service.
4. `GET /api/v1/levels`.
5. `GET /api/v1/levels/{levelId}`.
6. Backend tests for validation and API routes.

### Milestone 3 — Frontend rendering

Deliverables:

1. Contract loading.
2. API client.
3. Level fetch.
4. Grid parser.
5. Initial board render.
6. HUD render.
7. Basic polished CSS.

### Milestone 4 — Game engine

Deliverables:

1. Movement left/right.
2. Facing direction.
3. Jumping.
4. Pickup/place.
5. Gravity.
6. Win detection.
7. Reset.
8. Undo.
9. Invalid-action feedback.
10. First five levels manually playable.

### Milestone 5 — UI polish and progress

Deliverables:

1. Completion modal.
2. Level selector.
3. Move count and par moves.
4. Completed-level indicators.
5. localStorage progress.
6. Responsive layout.
7. On-screen controls.
8. Accessibility pass.

### Milestone 6 — Level expansion pipeline

Deliverables:

1. Level validator CLI.
2. Optional level generator tool.
3. Author levels 6–20.
4. Validate/playtest levels 6–20.
5. Continue in batches until 100 levels exist.
6. Each level has known solution notes.

### Milestone 7 — Future hosting readiness

Deliverables:

1. Confirm all routes are built from shared contract.
2. Confirm CORS config works for split frontend/API deployment.
3. Confirm same-origin deployment works with relative API origin.
4. Document environment variable changes needed for hosting.
5. No gameplay logic changes required for HTTPS.

---

## 18. Local Development Commands

Recommended local commands:

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn pydantic pytest
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

Optional test commands:

```bash
pytest
python tools/validate_levels.py
```

If using a JS test runner later:

```bash
npm test
```

Do not require a frontend build step for v1 unless the implementation naturally introduces one. Vanilla JS modules are sufficient.

---

## 19. Future HTTPS/Web Hosting Notes

The app should be designed so moving from local to HTTPS hosting does not require route rewrites.

### 19.1 Same-domain hosting

If the frontend and API are hosted on the same domain:

```text
https://example.com/
https://example.com/api/v1/levels
https://example.com/shared/app_contract.json
```

Keep:

```json
"api.origin": ""
```

### 19.2 Split frontend/API hosting

If the frontend and API are hosted separately:

```text
https://game.example.com/
https://api.example.com/api/v1/levels
```

Set:

```json
"api.origin": "https://api.example.com"
```

Also update backend CORS:

```text
CORS_ALLOWED_ORIGINS=https://game.example.com
TRUSTED_HOSTS=api.example.com
```

### 19.3 TLS responsibility

FastAPI does not need to implement TLS directly in v1. In production, TLS should usually be terminated by the hosting platform, reverse proxy, or load balancer.

---

## 20. Definition of Done for v1

The first implementation is complete when:

1. App runs locally with one command.
2. Browser loads polished UI at `/`.
3. Shared contract is used by both Python and JavaScript.
4. Backend serves valid levels 1–5.
5. Frontend can load levels from the backend.
6. Player can move left/right.
7. Player can jump one tile up in facing direction.
8. Player can pick up exactly one block.
9. Player can place a carried block only adjacent at current row.
10. Blocks and player resolve gravity deterministically.
11. Blocks can fill gaps by falling after placement.
12. Level completion triggers when player reaches the goal.
13. Reset works.
14. Undo works.
15. Move count works.
16. Progress saves locally.
17. All five initial levels are completable.
18. Invalid moves provide clear feedback.
19. UI is responsive and usable.
20. Backend tests pass.
21. Core frontend engine tests pass or are covered by a documented manual test harness.

---

## 21. Agentic Coder Handoff Instructions

An agentic coder should proceed in this order:

1. Create the project skeleton exactly or very close to the structure in Section 6.
2. Implement `shared/app_contract.json` first.
3. Implement the FastAPI backend and static serving.
4. Implement level loading and validation.
5. Add the first five levels exactly as specified.
6. Implement frontend contract loading and API client.
7. Render a static level board.
8. Implement game state parsing from the level grid.
9. Implement movement, jump, pickup/place, and gravity in isolated engine functions.
10. Add reset and undo.
11. Add completion/progress flow.
12. Polish the UI.
13. Add tests.
14. Manually play levels 1–5.
15. Only after mechanics are validated, expand the level set toward 100.

The key architectural principle is separation of concerns:

```text
FastAPI backend: serve config, static assets, level data, optional progress
Shared contract: route names, tile symbols, actions, storage keys, UI constants
Frontend API layer: construct URLs and fetch backend data
Frontend engine: pure game state logic
Frontend physics: collision and gravity helpers
Frontend renderer: convert state into DOM/CSS
Frontend input: convert keys/buttons into actions
Frontend storage: local progress persistence
```

---

## 22. Implementation Notes and Edge Cases

### 22.1 Blocks on goals

A block may land on a goal cell. The goal remains there as an overlay. The level is not complete until the player stands on the goal.

### 22.2 Carried block rendering

The carried block is not a collision object. Render it as an attachment to the player sprite/tile, such as a small block icon above or beside the player.

### 22.3 Low ceilings while carrying

For v1, carrying a block does not require extra overhead clearance. This keeps the rules simple. If this feels wrong after playtesting, add a v2 rule where carried blocks make the player effectively two cells tall.

### 22.4 Step-up behavior

There is no automatic step-up when walking. To climb onto a block or ledge, the player must face it and press Jump.

### 22.5 Softlocks

Softlocks are allowed as part of puzzle gameplay, but v1 should provide Undo and Reset. The first five tutorial levels should minimize accidental unrecoverable softlocks.

### 22.6 Multiple goals

Do not implement multiple goals in v1. The schema can be extended later.

### 22.7 Multiple players

Do not implement multiple players. Validator should reject levels with more than one `P`.

### 22.8 Hazards/enemies

Do not implement hazards, enemies, keys, doors, switches, timers, moving platforms, or scoring in v1. These can become later expansions.

---

## 23. Summary

Build a deterministic side-view grid puzzle game. The backend should be clean, configurable, and responsible for serving assets, config, and levels. The frontend should own gameplay and render a polished UI. Use a shared JSON contract to prevent Python/JavaScript route and symbol drift. Implement the first five levels first. Validate those mechanics before creating the remaining 95 levels.

This spec is sufficient for an agentic coder to produce an implementation plan and begin coding without another planning pass.
