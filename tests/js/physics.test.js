/**
 * Physics helper tests.
 * Imports from frontend/js/physics.js (does not exist until Task 2).
 * Expected failure before Task 2: cannot find module.
 */

import assert from 'node:assert/strict';
import { isInBounds, isSolid, isEmpty, applyGravity } from '../../frontend/js/physics.js';

// Level 1 terrain after P/B/G extraction. All interior cells are '.'.
const L1 = {
  id: 1, width: 8, height: 6,
  terrain: [
    '########',
    '#......#',
    '#......#',
    '#......#',
    '#......#',
    '########',
  ],
};

function mkState(player, blocks = [], carriedBlock = null) {
  return { player, blocks, carriedBlock };
}

export function run() {
  // --- isInBounds ---
  assert.equal(isInBounds({ row: -1, col: 0 }, L1), false, 'isInBounds: negative row');
  assert.equal(isInBounds({ row: 0, col: -1 }, L1), false, 'isInBounds: negative col');
  assert.equal(isInBounds({ row: 6, col: 0 }, L1), false, 'isInBounds: row === height');
  assert.equal(isInBounds({ row: 0, col: 8 }, L1), false, 'isInBounds: col === width');
  assert.equal(isInBounds({ row: 1, col: 1 }, L1), true, 'isInBounds: valid interior');

  // --- isSolid ---
  const s0 = mkState({ row: 4, col: 1 }, [{ id: 'b1', row: 4, col: 3 }]);
  assert.equal(isSolid({ row: 0, col: 0 }, s0, L1), true, 'isSolid: corner wall');
  assert.equal(isSolid({ row: 0, col: 4 }, s0, L1), true, 'isSolid: top wall');
  assert.equal(isSolid({ row: 4, col: 3 }, s0, L1), true, 'isSolid: uncarried block');
  assert.equal(isSolid({ row: 4, col: 1 }, s0, L1), true, 'isSolid: player position');
  assert.equal(isSolid({ row: 1, col: 1 }, s0, L1), false, 'isSolid: empty interior cell');
  assert.equal(isSolid({ row: 4, col: 2 }, s0, L1), false, 'isSolid: empty cell between player and block');

  // --- isEmpty ---
  assert.equal(isEmpty({ row: 1, col: 1 }, s0, L1), true, 'isEmpty: empty terrain unoccupied');
  assert.equal(isEmpty({ row: 4, col: 2 }, s0, L1), true, 'isEmpty: gap cell');
  assert.equal(isEmpty({ row: 0, col: 0 }, s0, L1), false, 'isEmpty: wall');
  assert.equal(isEmpty({ row: 4, col: 3 }, s0, L1), false, 'isEmpty: block cell');
  assert.equal(isEmpty({ row: 4, col: 1 }, s0, L1), false, 'isEmpty: player cell');
  assert.equal(isEmpty({ row: -1, col: 0 }, s0, L1), false, 'isEmpty: out of bounds');

  // --- applyGravity: block falls to floor ---
  const falling = mkState({ row: 4, col: 1 }, [{ id: 'b1', row: 1, col: 3 }]);
  const settled = applyGravity(falling, L1);
  assert.equal(settled.blocks[0].row, 4, 'applyGravity: block falls to row 4');
  assert.equal(settled.blocks[0].col, 3, 'applyGravity: block col unchanged');

  // --- applyGravity: player falls to floor ---
  const playerFloat = mkState({ row: 1, col: 1 }, []);
  const playerSettled = applyGravity(playerFloat, L1);
  assert.equal(playerSettled.player.row, 4, 'applyGravity: player falls to row 4');
  assert.equal(playerSettled.player.col, 1, 'applyGravity: player col unchanged');

  // --- applyGravity: blocks settle before player (ordering) ---
  // Block at (2,1) directly above player at (3,1), same column.
  // If blocks settle first: block sees player at (3,1) = solid → stays at (2,1).
  // Player then falls to (4,1) freely.
  // If player settled first: player moves to (4,1), block then falls to (3,1), stopped by player.
  // Correct (blocks-first) result: block stays at (2,1), player at (4,1).
  const ordering = mkState({ row: 3, col: 1 }, [{ id: 'b1', row: 2, col: 1 }]);
  const reordered = applyGravity(ordering, L1);
  assert.equal(reordered.blocks[0].row, 2, 'applyGravity: block stays blocked by player (blocks-first)');
  assert.equal(reordered.player.row, 4, 'applyGravity: player falls after block phase');

  // --- applyGravity: carriedBlock is not independently settled ---
  const carrying = mkState(
    { row: 1, col: 1 },
    [],
    { id: 'b1' },
  );
  const afterGravity = applyGravity(carrying, L1);
  assert.notEqual(afterGravity.carriedBlock, null, 'applyGravity: carriedBlock still present');
  assert.equal(afterGravity.carriedBlock.id, 'b1', 'applyGravity: carriedBlock id preserved');
  assert.equal(afterGravity.blocks.length, 0, 'applyGravity: blocks array still empty (block not dropped)');
  assert.equal(afterGravity.player.row, 4, 'applyGravity: player falls while carrying');

  // --- no mutation ---
  const original = {
    player: { row: 1, col: 1 },
    blocks: [{ id: 'b1', row: 1, col: 3 }],
    carriedBlock: null,
  };
  applyGravity(original, L1);
  assert.equal(original.player.row, 1, 'no mutation: player row unchanged');
  assert.equal(original.blocks[0].row, 1, 'no mutation: block row unchanged');
}
