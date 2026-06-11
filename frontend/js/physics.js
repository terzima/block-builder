/**
 * Pure physics helpers — no DOM, storage, or network imports.
 * All functions return new values and do not mutate inputs.
 */

/**
 * Returns true when pos is within level bounds.
 * @param {{ row: number, col: number }} pos
 * @param {{ width: number, height: number }} level
 * @returns {boolean}
 */
export function isInBounds(pos, level) {
  return pos.row >= 0 && pos.row < level.height &&
         pos.col >= 0 && pos.col < level.width;
}

/**
 * Returns the terrain character at pos, treating out-of-bounds as wall '#'.
 * @param {{ row: number, col: number }} pos
 * @param {{ terrain: string[], width: number, height: number }} level
 * @returns {string}
 */
export function terrainAt(pos, level) {
  if (!isInBounds(pos, level)) return '#';
  return level.terrain[pos.row][pos.col];
}

/**
 * Returns true when pos is impassable: out-of-bounds, wall terrain,
 * an uncarried block, or the player.
 * @param {{ row: number, col: number }} pos
 * @param {{ player: {row:number,col:number}, blocks: Array }} state
 * @param {{ terrain: string[], width: number, height: number }} level
 * @returns {boolean}
 */
export function isSolid(pos, state, level) {
  if (!isInBounds(pos, level)) return true;
  if (terrainAt(pos, level) === '#') return true;
  if (state.blocks.some(b => b.row === pos.row && b.col === pos.col)) return true;
  if (state.player.row === pos.row && state.player.col === pos.col) return true;
  return false;
}

/**
 * Returns true when pos is in-bounds, not wall, and unoccupied by any
 * block or the player.
 * @param {{ row: number, col: number }} pos
 * @param {{ player: {row:number,col:number}, blocks: Array }} state
 * @param {{ terrain: string[], width: number, height: number }} level
 * @returns {boolean}
 */
export function isEmpty(pos, state, level) {
  if (!isInBounds(pos, level)) return false;
  if (terrainAt(pos, level) === '#') return false;
  if (state.blocks.some(b => b.row === pos.row && b.col === pos.col)) return false;
  if (state.player.row === pos.row && state.player.col === pos.col) return false;
  return true;
}

/**
 * Returns true when entity has a solid cell immediately below it.
 * The player is counted as solid for block grounded-checks.
 * @param {{ row: number, col: number }} entity
 * @param {{ player: {row:number,col:number}, blocks: Array }} state
 * @param {{ terrain: string[], width: number, height: number }} level
 * @returns {boolean}
 */
export function isGrounded(entity, state, level) {
  const below = { row: entity.row + 1, col: entity.col };
  if (!isInBounds(below, level)) return true;
  if (terrainAt(below, level) === '#') return true;
  if (state.blocks.some(b => b.row === below.row && b.col === below.col)) return true;
  if (state.player.row === below.row && state.player.col === below.col) return true;
  return false;
}

/**
 * Applies gravity to a state, returning a new settled state.
 *
 * Phase 1: settle every uncarried block downward until no block can fall.
 *   - Each iteration moves all eligible blocks simultaneously by one row.
 *   - The player's current position is solid to block gravity.
 *   - Carried blocks are ignored.
 *
 * Phase 2: settle the player downward until the player cannot fall.
 *   - Settled block positions are solid to the player.
 *
 * @param {{ player, blocks, carriedBlock, [key: string]: any }} state
 * @param {{ terrain: string[], width: number, height: number }} level
 * @returns {typeof state}
 */
export function applyGravity(state, level) {
  // Phase 1 — settle all uncarried blocks
  let s = state;
  let changed = true;
  while (changed) {
    changed = false;
    const newBlocks = s.blocks.map((block, i) => {
      const below = { row: block.row + 1, col: block.col };
      if (!isInBounds(below, level)) return block;
      if (terrainAt(below, level) === '#') return block;
      // Solid if another block already occupies that cell (using pre-move positions)
      if (s.blocks.some((b, j) => j !== i && b.row === below.row && b.col === below.col)) return block;
      // Solid if player occupies that cell
      if (s.player.row === below.row && s.player.col === below.col) return block;
      changed = true;
      return { ...block, row: block.row + 1 };
    });
    s = { ...s, blocks: newBlocks };
  }

  // Phase 2 — settle the player
  changed = true;
  while (changed) {
    changed = false;
    const below = { row: s.player.row + 1, col: s.player.col };
    if (!isInBounds(below, level)) break;
    if (terrainAt(below, level) === '#') break;
    if (s.blocks.some(b => b.row === below.row && b.col === below.col)) break;
    s = { ...s, player: { ...s.player, row: s.player.row + 1 } };
    changed = true;
  }

  return s;
}
