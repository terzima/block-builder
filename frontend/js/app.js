/**
 * Application entry point and orchestration.
 *
 * Owns:
 *   - current contract
 *   - API client
 *   - level list metadata
 *   - current raw level definition (for engine reset/dispatch)
 *   - current parsed level (for renderer)
 *   - current runtime state
 *   - progress
 *
 * app.js is the only module that wires network, storage, and DOM together.
 */

import { loadContract } from './contract.js';
import { createApiClient } from './api.js';
import { getRuntimeConfig } from './runtime-config.js';
import { parseLevel, createInitialState, dispatchGameAction } from './engine.js';
import { renderBoard, renderHud, renderLevelSelect, renderCompletion } from './renderer.js';
import { bindInputs } from './input.js';
import { loadProgress, recordCompletion } from './storage.js';
import {
  setStatus,
  showCompletion,
  hideCompletion,
  setBusy,
} from './ui.js';

// ── App state ─────────────────────────────────────────────────────────────────

let contract = null;
let api = null;
let runtimeConfig = null;
let levels = [];
let currentRawLevel = null;   // raw LevelDefinition — passed to engine actions
let currentParsedLevel = null; // ParsedLevel — passed to renderer
let gameState = null;
let progress = null;
let traceController = createNoopTraceController();

// DOM element references (resolved once on boot)
const $ = id => document.getElementById(id);

function createNoopTraceController() {
  return {
    reset() {},
    invalidate() {},
    record() {},
    complete() {},
    wireControls() {},
  };
}

// ── Render ────────────────────────────────────────────────────────────────────

function render() {
  if (!gameState || !currentParsedLevel) return;

  renderBoard($('board'), gameState, currentParsedLevel);
  renderHud($('moves-count'), $('carried-state'), gameState);
}

// ── Dispatch ──────────────────────────────────────────────────────────────────

function dispatch(action) {
  if (!gameState || !currentRawLevel) return;

  const A = contract.actions;
  const undoEnabled = runtimeConfig?.enableUndo !== false;
  if (action.type === A.undo && !undoEnabled) return;

  // After completion only allow reset, undo, selectLevel (handled by loadLevel)
  if (
    gameState.status === 'completed' &&
    action.type !== A.reset &&
    !(undoEnabled && action.type === A.undo)
  ) {
    return;
  }

  if (action.type === A.reset || action.type === A.undo) {
    traceController.invalidate(action.type);
  }

  const beforeState = gameState;
  const result = dispatchGameAction(gameState, action, currentRawLevel, contract);
  gameState = result.state;

  traceController.record(action.type, beforeState, result);

  // Always surface the feedback message (valid or invalid)
  setStatus(result.message);
  render();

  if (result.completed) {
    traceController.complete(gameState);
    progress = recordCompletion(contract, gameState);
    const bestMoves = progress.bestMoves[gameState.levelId];
    renderCompletion(
      $('completion-dialog'),
      $('completion-title'),
      $('completion-summary'),
      gameState,
      bestMoves,
    );
    showCompletion();
  }
}

// ── Level loading ─────────────────────────────────────────────────────────────

async function loadLevel(levelId) {
  traceController.invalidate('level-change');
  hideCompletion();
  setBusy(true);
  setStatus('Loading…');

  try {
    currentRawLevel = await api.getLevel(levelId);
    currentParsedLevel = parseLevel(currentRawLevel, contract);
    gameState = createInitialState(currentRawLevel, contract);
    traceController.reset(levelId);

    renderLevelSelect($('level-select'), levels, levelId);
    render();
    setStatus('');

    // Return keyboard focus to the board so game keys work immediately.
    // The level-select receives focus when the user interacts with it;
    // we reclaim focus after each level load so arrow keys go to the game.
    $('board')?.focus();

    // Persist the last selected level
    progress.lastLevelId = levelId;
    // (progress is saved on next recordCompletion; no need to write here for
    //  just navigation — omit the write to keep storage writes on meaningful events)

    // Edge case: level is complete from initial state
    if (gameState.status === 'completed') {
      const bestMoves = progress.bestMoves[gameState.levelId];
      renderCompletion(
        $('completion-dialog'),
        $('completion-title'),
        $('completion-summary'),
        gameState,
        bestMoves,
      );
      showCompletion();
    }
  } catch (err) {
    setStatus(`Error loading level: ${err.message}`);
  } finally {
    setBusy(false);
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────────

async function boot() {
  setBusy(true);
  setStatus('Loading…');

  try {
    // 1. Load and validate the shared contract
    contract = await loadContract();
    runtimeConfig = getRuntimeConfig();

    // 2. Build API client from contract
    api = createApiClient(contract, fetch, runtimeConfig);

    // 3. Load persisted progress
    progress = loadProgress(contract);

    // 4. Fetch level list
    levels = await api.listLevels();
    if (levels.length === 0) throw new Error('No levels available');

    // 5. Bind controls (keyboard + on-screen buttons)
    bindInputs($('app'), contract, dispatch, {
      disabledActions: runtimeConfig.enableUndo ? new Set() : new Set([contract.actions.undo]),
    });

    // 6. Wire level selector
    const selectEl = $('level-select');
    if (selectEl) {
      selectEl.addEventListener('change', () => {
        loadLevel(Number(selectEl.value));
      });
    }

    // 7. Wire completion dialog buttons
    const dialogEl = $('completion-dialog');
    if (dialogEl) {
      dialogEl.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'nextLevel') {
          const nextId = gameState ? gameState.levelId + 1 : null;
          const nextLevel = levels.find(l => l.id === nextId);
          if (nextLevel) {
            loadLevel(nextLevel.id);
          } else {
            // No more levels — hide dialog and let player replay
            hideCompletion();
          }
        } else {
          // reset or other contract actions forwarded to dispatch
          dispatch({ type: action });
          hideCompletion();
        }
      });
    }

    // 8. Wire dev-only trace recorder controls when enabled
    if (runtimeConfig.enableTraceRecorder) {
      const { createTraceDevController } = await import('./trace-dev.js');
      traceController = createTraceDevController({
        contract,
        getCurrentRawLevel: () => currentRawLevel,
      });
      traceController.wireControls();
    }

    // 9. Load the last-played or first level
    const startId = progress.lastLevelId ?? levels[0].id;
    await loadLevel(startId);
  } catch (err) {
    setStatus(`Failed to start: ${err.message}`);
    setBusy(false);
  }
}

boot();
