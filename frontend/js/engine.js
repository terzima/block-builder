/**
 * Pure game engine — no DOM, storage, or network imports.
 * Parses levels, creates state, and dispatches actions immutably.
 */

import { applyGravity, isEmpty, isSolid, isInBounds } from './physics.js';

/** Maximum number of undo snapshots kept in state.history. */
export const MAX_HISTORY = 50;

// ── Level parsing ─────────────────────────────────────────────────────────────

/**
 * Parses a raw LevelDefinition into a ParsedLevel.
 * Player (P), blocks (B), and goal (G) are extracted into runtime entities.
 * Their grid cells become '.' in the returned terrain.
 *
 * @param {{ id, width, height, grid: string[] }} level
 * @param {{ tiles: { player, block, goal } }} contract
 * @returns {ParsedLevel}
 */
export function parseLevel(level, contract) {
  const { player: P, block: B, goal: G } = contract.tiles;
  let initialPlayer = null;
  let blockSeq = 1;
  const initialBlocks = [];
  let goal = null;

  const terrain = level.grid.map((row, r) =>
    [...row].map((cell, c) => {
      if (cell === P) { initialPlayer = { row: r, col: c }; return '.'; }
      if (cell === B) { initialBlocks.push({ id: `b${blockSeq++}`, row: r, col: c }); return '.'; }
      if (cell === G) { goal = { row: r, col: c }; return '.'; }
      return cell;
    }).join('')
  );

  return {
    id: level.id,
    width: level.width,
    height: level.height,
    terrain,
    initialPlayer,
    initialBlocks,
    goal,
  };
}

// ── State creation ────────────────────────────────────────────────────────────

/**
 * Creates the initial RuntimeState for a level.
 * Parses the level, applies gravity so blocks and player settle, and sets
 * status to 'completed' only if the player starts on the goal.
 *
 * @param {{ id, width, height, grid: string[] }} level
 * @param {{ tiles }} contract
 * @returns {RuntimeState}
 */
export function createInitialState(level, contract) {
  const parsed = parseLevel(level, contract);

  const raw = {
    levelId: parsed.id,
    status: 'playing',
    moves: 0,
    facing: 'right',
    player: { ...parsed.initialPlayer },
    carriedBlock: null,
    blocks: parsed.initialBlocks.map(b => ({ ...b })),
    goal: { ...parsed.goal },
    history: [],
  };

  const settled = applyGravity(raw, parsed);
  const completed =
    settled.player.row === settled.goal.row &&
    settled.player.col === settled.goal.col;

  return { ...settled, status: completed ? 'completed' : 'playing' };
}

// ── Action dispatch ───────────────────────────────────────────────────────────

/** @returns {ActionResult} for an invalid action — no history push, no move count. */
function invalidResult(state, message) {
  return { state, changed: false, completed: false, message, invalid: true };
}

/** Pushes prevState onto newState.history, capped at MAX_HISTORY. */
function withHistory(prevState, newState) {
  const history = [...prevState.history, prevState].slice(-MAX_HISTORY);
  return { ...newState, history };
}

/** Checks whether the player occupies the goal cell. */
function onGoal(state) {
  return state.player.row === state.goal.row && state.player.col === state.goal.col;
}

/** Finalises a successful player-movement result (gravity + completion + history). */
function settle(prevState, nextState, parsed, message) {
  const afterGravity = applyGravity(nextState, parsed);
  const completed = onGoal(afterGravity);
  const final = withHistory(prevState, {
    ...afterGravity,
    status: completed ? 'completed' : 'playing',
  });
  return {
    state: final,
    changed: true,
    completed,
    message: completed ? 'Level complete.' : message,
    invalid: false,
  };
}

/**
 * Dispatches a game action against the current state.
 *
 * Actions are plain objects with a `type` property matching a value in
 * `contract.actions`. The `level` parameter must be a raw LevelDefinition
 * (same shape passed to `createInitialState`).
 *
 * Invalid actions (blocked moves, missing block, etc.) return `invalid: true`
 * and `changed: false` and do NOT push history or increment moves.
 *
 * moveLeft / moveRight: facing always updates even when blocked.
 * reset / undo: do not increment moves.
 *
 * @param {RuntimeState} state
 * @param {{ type: string, [key: string]: any }} action
 * @param {{ id, width, height, grid: string[] }} level
 * @param {{ tiles, actions }} contract
 * @returns {ActionResult}
 */
export function dispatchGameAction(state, action, level, contract) {
  const parsed = parseLevel(level, contract);
  const A = contract.actions;

  switch (action.type) {
    // ── moveLeft ──────────────────────────────────────────────────────────
    // First press from facing right: turn only (free, no history, no moves).
    // Subsequent press while already facing left: attempt movement.
    case A.moveLeft: {
      if (state.facing !== 'left') {
        return { state: { ...state, facing: 'left' }, changed: false, completed: false, message: 'Turned left.', invalid: false };
      }
      const target = { row: state.player.row, col: state.player.col - 1 };
      if (isSolid(target, state, parsed)) {
        return invalidResult(state, 'Blocked.');
      }
      const next = { ...state, player: target, moves: state.moves + 1 };
      return settle(state, next, parsed, 'Moved.');
    }

    // ── moveRight ─────────────────────────────────────────────────────────
    // First press from facing left: turn only (free, no history, no moves).
    // Subsequent press while already facing right: attempt movement.
    case A.moveRight: {
      if (state.facing !== 'right') {
        return { state: { ...state, facing: 'right' }, changed: false, completed: false, message: 'Turned right.', invalid: false };
      }
      const target = { row: state.player.row, col: state.player.col + 1 };
      if (isSolid(target, state, parsed)) {
        return invalidResult(state, 'Blocked.');
      }
      const next = { ...state, player: target, moves: state.moves + 1 };
      return settle(state, next, parsed, 'Moved.');
    }

    // ── jump ──────────────────────────────────────────────────────────────
    // Moves one row up and one column in the current facing direction.
    case A.jump: {
      const dc = state.facing === 'left' ? -1 : 1;
      const target = { row: state.player.row - 1, col: state.player.col + dc };
      if (!isInBounds(target, parsed) || isSolid(target, state, parsed)) {
        return invalidResult(state, 'Blocked.');
      }
      const next = { ...state, player: target, moves: state.moves + 1 };
      return settle(state, next, parsed, 'Jumped.');
    }

    // ── interact ──────────────────────────────────────────────────────────
    case A.interact: {
      const dc = state.facing === 'left' ? -1 : 1;
      const adjacent = { row: state.player.row, col: state.player.col + dc };

      if (!state.carriedBlock) {
        // Attempt pickup
        const blockIdx = state.blocks.findIndex(
          b => b.row === adjacent.row && b.col === adjacent.col,
        );
        if (blockIdx === -1) {
          return invalidResult(state, 'No block to pick up.');
        }
        const block = state.blocks[blockIdx];
        const newBlocks = state.blocks.filter((_, i) => i !== blockIdx);
        const next = {
          ...state,
          blocks: newBlocks,
          carriedBlock: { id: block.id },
          moves: state.moves + 1,
        };
        return {
          state: withHistory(state, next),
          changed: true,
          completed: false,
          message: 'Picked up block.',
          invalid: false,
        };
      } else {
        // Attempt placement
        if (!isEmpty(adjacent, state, parsed)) {
          return invalidResult(state, 'Cannot place block there.');
        }
        const placed = { id: state.carriedBlock.id, row: adjacent.row, col: adjacent.col };
        const next = {
          ...state,
          carriedBlock: null,
          blocks: [...state.blocks, placed],
          moves: state.moves + 1,
        };
        return settle(state, next, parsed, 'Placed block.');
      }
    }

    // ── reset ─────────────────────────────────────────────────────────────
    case A.reset: {
      const initial = createInitialState(level, contract);
      return {
        state: initial,
        changed: true,
        completed: initial.status === 'completed',
        message: 'Level reset.',
        invalid: false,
      };
    }

    // ── undo ──────────────────────────────────────────────────────────────
    case A.undo: {
      if (state.history.length === 0) {
        return invalidResult(state, 'Nothing to undo.');
      }
      const prev = state.history[state.history.length - 1];
      return {
        state: prev,
        changed: true,
        completed: prev.status === 'completed',
        message: 'Undo.',
        invalid: false,
      };
    }

    // ── selectLevel ───────────────────────────────────────────────────────
    case A.selectLevel: {
      const initial = createInitialState(level, contract);
      return {
        state: initial,
        changed: true,
        completed: initial.status === 'completed',
        message: 'Level loaded.',
        invalid: false,
      };
    }

    default:
      return invalidResult(state, `Unknown action: ${action.type}`);
  }
}
