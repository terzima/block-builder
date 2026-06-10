# Glossary

Status: Seeded
Maturity: M1
Last updated: 2026-06-10

Keep domain language here so agents do not reinvent terms.

## Gameplay terms

| Term | Meaning | Notes |
|---|---|---|
| Grid | Two-dimensional tile map using `x` columns and `y` rows. | `x` increases right; `y` increases downward. |
| Tile / cell | One addressable square in the grid. | Player, blocks, walls, and goal each occupy or overlay cells. |
| Side-view | Platform-puzzle view with gravity and vertical movement. | Not top-down. |
| Discrete movement | Each valid input advances the game by one logical state transition. | No continuous velocity or frame-by-frame physics in v1. |
| Wall / fixed terrain | Static solid tile represented by `#`. | Used for floors, ceilings, platforms, boundaries, and obstacles. |
| Empty / air | Traversable non-solid tile represented by `.`. | Blocks and player may move through it subject to rules. |
| Player start | Initial player tile represented by `P`. | Parsed into dynamic state, then treated as empty terrain. |
| Movable block | One-cell block represented by `B`. | Can be picked up, carried, placed, stacked, and dropped by gravity. |
| Carried block | A movable block attached to the player and removed from board collision. | Exactly one may be carried in v1. |
| Goal | Traversable target tile represented by `G`. | Level completes only when the player, not a block, reaches it. |
| Static terrain | Immutable terrain parsed from the level grid. | Runtime gameplay should not mutate the original terrain grid. |
| Dynamic state | Player, movable blocks, goal, moves, status, and history. | Rebuilt from level data on reset. |
| Solid cell | Cell containing fixed terrain or an uncarried movable block. | Blocks on goals are still solid because of the block. |
| Empty for player | In-bounds cell without wall terrain or uncarried block. | Goal cells are empty for player movement. |
| Empty for block | In-bounds cell without wall terrain, uncarried block, or player. | Used for placement and gravity. |
| Grounded | Player has a solid cell directly below. | Required for jumping. |
| Supported | Block has a solid cell directly below or is at the bottom boundary. | Level maps should normally include a bottom wall row. |
| Gravity resolution | Deterministic settling pass after valid actions and level initialization. | Uncarried blocks settle first, then player, repeating until stable. |
| Facing direction | Player orientation, `left` or `right`. | Used for jump, pickup, and placement targets. |
| Context action | `Space` behavior: pick up when empty-handed, place when carrying. | Called `ACTION` in the shared contract. |
| Reset | Restore current level to original parsed state. | Bound to `R` and a visible button. |
| Undo | Restore the previous valid state from history. | Bound to `U`/`Z` and a visible button. |
| Softlock | Reachable state where puzzle progress is no longer possible. | Allowed in v1 if reset/undo exists; minimized in tutorial levels. |
| Par moves | Optional target move count shown for feedback. | No score or timer in v1. |

## Project terms

| Term | Meaning | Notes |
|---|---|---|
| Shared contract | Machine-readable JSON source of truth for Python/JavaScript constants. | Planned path: `shared/app_contract.json`. |
| Communication contract | Human-readable mirror of the shared contract. | Planned path: `shared/COMMUNICATION_CONTRACT.md`. |
| Local progress | Browser `localStorage` save data for current level, unlocks, completions, and best moves. | Primary progress mechanism in v1. |
| Optional progress API | FastAPI endpoint for local progress sync beyond `localStorage`. | Deferred unless it stays small after core APIs. |
| Level validator | Backend/tooling checks for malformed level data. | Required before expanding beyond five levels. |
| First five levels | Tutorial/prototype levels from the raw overview. | The first playable validation target. |
| 100-level target | Long-term level set after first-five mechanics are validated. | Roadmap item, not an initial implementation requirement. |

## Acronyms

| Term | Meaning | Notes |
|---|---|---|
| API | Application Programming Interface. | FastAPI routes under `/api/v1` by default. |
| ADR | Architecture Decision Record. | Stored in `docs/adr/`. |
| CORS | Cross-Origin Resource Sharing. | Needed later if frontend/API hosting split. |
| CR | Change Request. | Required when implementation discovers accepted scope is wrong or incomplete. |
| HTTPS | HTTP over TLS. | Future hosting concern; FastAPI does not terminate TLS in v1. |
| TLS | Transport Layer Security. | Expected to be handled by hosting platform, proxy, or load balancer. |
| UI | User Interface. | Browser game board, HUD, controls, modal, and feedback. |
| UX | User Experience. | Flow, clarity, responsiveness, accessibility, and feel. |

## Ambiguous terms needing clarification

| Term | Current interpretation | Clarification needed |
|---|---|---|
| Polished UI | Clean, modern, high-contrast puzzle aesthetic. | Final brand/art direction remains open. |
| Mobile support | Include responsive layout and on-screen controls in v1. | Whether touch-first play is a major product goal is open. |
| Progress API | Optional local-only backend persistence. | Whether to implement in the first playable slice depends on scope. |
| Level generation | Generate or semi-generate levels after first-five validation. | Authoring strategy for levels 21-100 remains open. |
| Web hosting | Future configurable HTTPS deployment. | Provider, domain, and deployment model are undecided. |
