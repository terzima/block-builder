/**
 * Engine reducer tests.
 * Imports from frontend/js/engine.js (does not exist until Task 2).
 * Expected failure before Task 2: cannot find module.
 */

import assert from 'node:assert/strict';
import {
  parseLevel,
  createInitialState,
  dispatchGameAction,
  MAX_HISTORY,
} from '../../frontend/js/engine.js';

// ── Fixtures ────────────────────────────────────────────────────────────────

const CONTRACT = {
  tiles: { empty: '.', wall: '#', player: 'P', block: 'B', goal: 'G' },
  actions: {
    moveLeft: 'moveLeft',
    moveRight: 'moveRight',
    jump: 'jump',
    interact: 'interact',
    reset: 'reset',
    undo: 'undo',
    selectLevel: 'selectLevel',
  },
};

// Level 1: "First Steps"
// grid[3] = "#..B...#" → block at (3,3)
// grid[4] = "#P...G.#" → player at (4,1), goal at (4,5)
// After gravity: block falls from (3,3) to (4,3) (below is '.' at (4,3), wall at (5,3)).
const LEVEL_1 = {
  id: 1, slug: 'level-1', title: 'First Steps',
  width: 8, height: 6, difficulty: 1,
  grid: [
    '########',
    '#......#',
    '#......#',
    '#..B...#',
    '#P...G.#',
    '########',
  ],
};

export function run() {
  // ── parseLevel ────────────────────────────────────────────────────────────

  const parsed = parseLevel(LEVEL_1, CONTRACT);
  assert.equal(parsed.id, 1, 'parseLevel: id');
  assert.equal(parsed.width, 8, 'parseLevel: width');
  assert.equal(parsed.height, 6, 'parseLevel: height');
  // Terrain rows should have P, B, G replaced with '.'
  assert.equal(parsed.terrain[3][3], '.', 'parseLevel: B removed from terrain');
  assert.equal(parsed.terrain[4][1], '.', 'parseLevel: P removed from terrain');
  assert.equal(parsed.terrain[4][5], '.', 'parseLevel: G removed from terrain');
  assert.equal(parsed.terrain[0][0], '#', 'parseLevel: walls preserved');
  // Entities extracted
  assert.deepEqual(parsed.initialPlayer, { row: 4, col: 1 }, 'parseLevel: player position');
  assert.equal(parsed.initialBlocks.length, 1, 'parseLevel: one block');
  assert.deepEqual(parsed.initialBlocks[0], { id: 'b1', row: 3, col: 3 }, 'parseLevel: block position + id');
  assert.deepEqual(parsed.goal, { row: 4, col: 5 }, 'parseLevel: goal position');

  // ── createInitialState ────────────────────────────────────────────────────

  const init = createInitialState(LEVEL_1, CONTRACT);
  assert.equal(init.levelId, 1, 'createInitialState: levelId');
  assert.equal(init.moves, 0, 'createInitialState: moves 0');
  assert.equal(init.facing, 'right', 'createInitialState: facing right');
  assert.equal(init.status, 'playing', 'createInitialState: status playing');
  assert.deepEqual(init.history, [], 'createInitialState: empty history');
  // Player stays at (4,1) — already on floor (row 5 is wall)
  assert.deepEqual(init.player, { row: 4, col: 1 }, 'createInitialState: player position after gravity');
  // Block fell from (3,3) to (4,3) — floor at row 5 stops it
  assert.equal(init.blocks.length, 1, 'createInitialState: one block');
  assert.equal(init.blocks[0].row, 4, 'createInitialState: block settled to row 4');
  assert.equal(init.blocks[0].col, 3, 'createInitialState: block col 3');
  assert.deepEqual(init.goal, { row: 4, col: 5 }, 'createInitialState: goal');
  assert.equal(init.carriedBlock, null, 'createInitialState: no carried block');

  // ── moveRight: success ────────────────────────────────────────────────────

  const r1 = dispatchGameAction(init, { type: 'moveRight' }, LEVEL_1, CONTRACT);
  assert.equal(r1.invalid, false, 'moveRight: not invalid');
  assert.equal(r1.changed, true, 'moveRight: changed');
  assert.equal(r1.message, 'Moved.', 'moveRight: message');
  assert.equal(r1.state.player.col, 2, 'moveRight: player col 2');
  assert.equal(r1.state.moves, 1, 'moveRight: moves 1');
  assert.equal(r1.state.facing, 'right', 'moveRight: facing right');
  assert.equal(r1.state.history.length, 1, 'moveRight: history has 1 entry');

  // ── moveLeft: first press turns (two-press mechanic) ─────────────────────
  // init has facing 'right'. First moveLeft press turns only — not invalid, not a move.

  const turn = dispatchGameAction(init, { type: 'moveLeft' }, LEVEL_1, CONTRACT);
  assert.equal(turn.invalid, false, 'moveLeft turn: not invalid');
  assert.equal(turn.changed, false, 'moveLeft turn: changed false (no history push)');
  assert.equal(turn.message, 'Turned left.', 'moveLeft turn: message');
  assert.equal(turn.state.facing, 'left', 'moveLeft turn: facing changes to left');
  assert.equal(turn.state.moves, 0, 'moveLeft turn: moves unchanged');
  assert.equal(turn.state.player.col, 1, 'moveLeft turn: player col unchanged');
  assert.equal(turn.state.history.length, 0, 'moveLeft turn: no history entry');

  // ── moveLeft: second press while facing left, blocked by wall ────────────
  // From turn.state: facing left, player at (4,1). Target (4,0) is '#'.

  const bl = dispatchGameAction(turn.state, { type: 'moveLeft' }, LEVEL_1, CONTRACT);
  assert.equal(bl.invalid, true, 'moveLeft blocked: invalid');
  assert.equal(bl.changed, false, 'moveLeft blocked: changed false');
  assert.equal(bl.message, 'Blocked.', 'moveLeft blocked: message');
  assert.equal(bl.state.facing, 'left', 'moveLeft blocked: facing stays left');
  assert.equal(bl.state.moves, 0, 'moveLeft blocked: moves unchanged');
  assert.equal(bl.state.player.col, 1, 'moveLeft blocked: player col unchanged');

  // ── moveLeft: second press while facing left, move succeeds ──────────────
  // Player at (4,2) facing left → target (4,1) is empty.

  const facingLeftAt2 = { ...init, player: { row: 4, col: 2 }, facing: 'left' };
  const ml = dispatchGameAction(facingLeftAt2, { type: 'moveLeft' }, LEVEL_1, CONTRACT);
  assert.equal(ml.invalid, false, 'moveLeft move: not invalid');
  assert.equal(ml.changed, true, 'moveLeft move: changed');
  assert.equal(ml.message, 'Moved.', 'moveLeft move: message');
  assert.equal(ml.state.player.col, 1, 'moveLeft move: player col 1');
  assert.equal(ml.state.moves, 1, 'moveLeft move: moves 1');

  // ── moveRight: first press turns when facing left ─────────────────────────
  // From facingLeftAt2: pressing moveRight turns only.

  const turnRight = dispatchGameAction(facingLeftAt2, { type: 'moveRight' }, LEVEL_1, CONTRACT);
  assert.equal(turnRight.invalid, false, 'moveRight turn: not invalid');
  assert.equal(turnRight.changed, false, 'moveRight turn: changed false');
  assert.equal(turnRight.message, 'Turned right.', 'moveRight turn: message');
  assert.equal(turnRight.state.facing, 'right', 'moveRight turn: facing right');
  assert.equal(turnRight.state.moves, 0, 'moveRight turn: moves unchanged');

  // ── jump: success (diagonal — up + facing direction) ─────────────────────
  // init: player at (4,1) facing right → target (3,2).
  // (3,2) is '.' terrain. After gravity: player falls from (3,2) to (4,2)
  // because (4,2) is empty and (5,2) is wall.

  const j1 = dispatchGameAction(init, { type: 'jump' }, LEVEL_1, CONTRACT);
  assert.equal(j1.invalid, false, 'jump: not invalid');
  assert.equal(j1.changed, true, 'jump: changed');
  assert.equal(j1.message, 'Jumped.', 'jump: message');
  assert.equal(j1.state.moves, 1, 'jump: moves 1');
  assert.equal(j1.state.player.col, 2, 'jump: player moved one col right');
  assert.equal(j1.state.player.row, 4, 'jump: player settled on floor');
  assert.equal(j1.state.history.length, 1, 'jump: history entry added');

  // ── jump: blocked (diagonal target is a wall) ────────────────────────────
  // Player at (1,1) facing right → target (0,2) is '#' (top wall row).

  const atCeiling = { ...init, player: { row: 1, col: 1 } };
  const jb = dispatchGameAction(atCeiling, { type: 'jump' }, LEVEL_1, CONTRACT);
  assert.equal(jb.invalid, true, 'jump blocked: invalid');
  assert.equal(jb.changed, false, 'jump blocked: changed false');
  assert.equal(jb.message, 'Blocked.', 'jump blocked: message');

  // ── jump: blocked (diagonal target is out of bounds) ─────────────────────
  // Player at (4,1) facing left → target (3,0) is '#' (left border wall).

  const facingLeft = { ...init, facing: 'left' };
  const jbl = dispatchGameAction(facingLeft, { type: 'jump' }, LEVEL_1, CONTRACT);
  assert.equal(jbl.invalid, true, 'jump blocked left: invalid');
  assert.equal(jbl.message, 'Blocked.', 'jump blocked left: message');

  // ── interact: pickup ──────────────────────────────────────────────────────

  // Player at (4,2) facing right → adjacent (4,3) has the block
  const prePickup = { ...init, player: { row: 4, col: 2 }, facing: 'right' };
  const pickup = dispatchGameAction(prePickup, { type: 'interact' }, LEVEL_1, CONTRACT);
  assert.equal(pickup.invalid, false, 'pickup: not invalid');
  assert.equal(pickup.changed, true, 'pickup: changed');
  assert.equal(pickup.message, 'Picked up block.', 'pickup: message');
  assert.equal(pickup.state.blocks.length, 0, 'pickup: block removed from blocks array');
  assert.notEqual(pickup.state.carriedBlock, null, 'pickup: carriedBlock set');
  assert.equal(pickup.state.carriedBlock.id, 'b1', 'pickup: correct block carried');
  assert.equal(pickup.state.moves, 1, 'pickup: moves incremented');

  // ── interact: invalid pickup (no block adjacent) ──────────────────────────

  const noBlock = { ...init, facing: 'right' }; // adjacent (4,2) is empty
  const badPickup = dispatchGameAction(noBlock, { type: 'interact' }, LEVEL_1, CONTRACT);
  assert.equal(badPickup.invalid, true, 'bad pickup: invalid');
  assert.equal(badPickup.message, 'No block to pick up.', 'bad pickup: message');
  assert.equal(badPickup.state.moves, 0, 'bad pickup: moves unchanged');
  // state not mutated
  assert.equal(badPickup.state.blocks.length, init.blocks.length, 'bad pickup: blocks unchanged');

  // ── interact: place ───────────────────────────────────────────────────────

  // Carrying state with player at (4,2) facing right, target (4,3) is empty
  const carrying = {
    ...init,
    player: { row: 4, col: 2 },
    facing: 'right',
    blocks: [],
    carriedBlock: { id: 'b1' },
  };
  const place = dispatchGameAction(carrying, { type: 'interact' }, LEVEL_1, CONTRACT);
  assert.equal(place.invalid, false, 'place: not invalid');
  assert.equal(place.message, 'Placed block.', 'place: message');
  assert.equal(place.state.carriedBlock, null, 'place: carriedBlock cleared');
  assert.equal(place.state.blocks.length, 1, 'place: block added to array');
  assert.equal(place.state.blocks[0].id, 'b1', 'place: block id preserved');

  // ── interact: invalid placement (wall adjacent) ───────────────────────────

  // Player at (4,1) facing left → adjacent (4,0) is a wall
  const carryAtWall = {
    ...init,
    player: { row: 4, col: 1 },
    facing: 'left',
    blocks: [],
    carriedBlock: { id: 'b1' },
  };
  const badPlace = dispatchGameAction(carryAtWall, { type: 'interact' }, LEVEL_1, CONTRACT);
  assert.equal(badPlace.invalid, true, 'bad place: invalid');
  assert.equal(badPlace.message, 'Cannot place block there.', 'bad place: message');
  assert.equal(badPlace.state.carriedBlock.id, 'b1', 'bad place: still carrying');

  // ── reset ─────────────────────────────────────────────────────────────────

  // After one move, reset should restore original initial state
  const afterMove = r1.state;
  const resetResult = dispatchGameAction(afterMove, { type: 'reset' }, LEVEL_1, CONTRACT);
  assert.equal(resetResult.message, 'Level reset.', 'reset: message');
  assert.equal(resetResult.state.moves, 0, 'reset: moves cleared');
  assert.deepEqual(resetResult.state.history, [], 'reset: history cleared');
  assert.deepEqual(resetResult.state.player, init.player, 'reset: player back to start');

  // ── undo ──────────────────────────────────────────────────────────────────

  // Two actions: moveRight then reset → build history of 2, undo once
  const s1 = r1.state; // after moveRight: player (4,2), moves 1, history [init]
  const s2 = dispatchGameAction(s1, { type: 'jump' }, LEVEL_1, CONTRACT).state;
  // s2: moves 2, history [init, s1_after_moveRight]
  const undoResult = dispatchGameAction(s2, { type: 'undo' }, LEVEL_1, CONTRACT);
  assert.equal(undoResult.message, 'Undo.', 'undo: message');
  assert.equal(undoResult.changed, true, 'undo: changed');
  assert.equal(undoResult.state.moves, s1.moves, 'undo: restores prior moves');
  assert.deepEqual(undoResult.state.player, s1.player, 'undo: restores prior player');

  // ── undo: nothing to undo ────────────────────────────────────────────────

  const noUndo = dispatchGameAction(init, { type: 'undo' }, LEVEL_1, CONTRACT);
  assert.equal(noUndo.invalid, true, 'nothing to undo: invalid');
  assert.equal(noUndo.message, 'Nothing to undo.', 'nothing to undo: message');

  // ── completion ────────────────────────────────────────────────────────────

  // Goal is at (4,5). Place player at (4,4) with no blocks, move right.
  const nearGoal = {
    ...init,
    player: { row: 4, col: 4 },
    blocks: [],
    history: [],
  };
  const completeResult = dispatchGameAction(nearGoal, { type: 'moveRight' }, LEVEL_1, CONTRACT);
  assert.equal(completeResult.completed, true, 'completion: completed true');
  assert.equal(completeResult.message, 'Level complete.', 'completion: message');
  assert.equal(completeResult.state.status, 'completed', 'completion: status completed');
  assert.equal(completeResult.state.player.col, 5, 'completion: player on goal col');

  // No completion when player not on goal
  assert.equal(r1.completed, false, 'no completion: normal move');

  // ── history cap ──────────────────────────────────────────────────────────

  // Build a state with MAX_HISTORY history entries, then make one more valid move.
  const fakeEntry = { ...init, moves: 0 };
  const atCap = {
    ...init,
    player: { row: 4, col: 1 },
    blocks: [],
    history: Array.from({ length: MAX_HISTORY }, (_, i) => ({ ...fakeEntry, moves: i })),
  };
  const overflow = dispatchGameAction(atCap, { type: 'jump' }, LEVEL_1, CONTRACT);
  assert.equal(
    overflow.state.history.length,
    MAX_HISTORY,
    `history cap: length stays at MAX_HISTORY (${MAX_HISTORY})`,
  );
}
