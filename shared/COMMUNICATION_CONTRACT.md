# Communication Contract

Status: Active
Source: `shared/app_contract.json`

`shared/app_contract.json` is the machine-readable contract shared by the Python backend and the vanilla JavaScript frontend.

## Sections

| Section | Purpose |
|---|---|
| `version` | Contract version for compatibility checks. |
| `appName` | Human-readable application name. |
| `api` | Same-origin API prefix and route patterns backend and frontend must share. |
| `static` | Static frontend entry paths backend serving code references. |
| `tiles` | Canonical symbols for level data and engine validation. |
| `actions` | Canonical action names for input and engine dispatch. |
| `keyboard` | Default keyboard bindings for input handling. |
| `storageKeys` | Browser storage keys reserved for local progress and settings. |
| `gameplay` | Gameplay ownership metadata. |
| `ui` | UI ownership metadata and root element id. |

## Action Table

| Action | Purpose |
|---|---|
| `moveLeft` | Move player one column left; always sets facing left. |
| `moveRight` | Move player one column right; always sets facing right. |
| `jump` | Move player one row upward in the same column if target is empty. |
| `interact` | Pickup the adjacent facing block when not carrying; place carried block when carrying. |
| `reset` | Restore initial state for the selected level. |
| `undo` | Restore the previous history entry. |
| `selectLevel` | Load a selected level by ID. |

## Keyboard Table

| Action | Keys |
|---|---|
| `moveLeft` | `ArrowLeft`, `KeyA` |
| `moveRight` | `ArrowRight`, `KeyD` |
| `jump` | `ArrowUp`, `KeyW` |
| `interact` | `KeyE`, `Enter`, `Space` |
| `reset` | `KeyR` |
| `undo` | `KeyZ` |

## Python Usage

The backend loads this JSON from `SHARED_CONTRACT_PATH` (default `shared/app_contract.json`), uses it for public config responses, and derives route metadata from `api.prefix` and `api.routes`.

## JavaScript Usage

The frontend loads this contract via `GET /shared/app_contract.json`, derives route URLs from `api.origin + api.prefix + api.routes[...]`, maps keyboard bindings from `keyboard`, dispatches actions using names from `actions`, and persists progress at `storageKeys.progress`.

## Change Rule

Any change to route names, tile symbols, action names, storage keys, gameplay constants, or UI constants is a cross-boundary contract change and requires an accepted spec or Change Request.
