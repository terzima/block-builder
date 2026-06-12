/**
 * Trace recorder tests.
 * Imports from frontend/js/trace-recorder.js.
 */

import assert from 'node:assert/strict';
import {
  createTraceRecorder,
  startTraceRecording,
  recordTraceAction,
  invalidateTraceRecording,
  stopTraceRecording,
  exportTraceRecording,
  copyTraceToClipboard,
} from '../../frontend/js/trace-recorder.js';
import { createInitialState, dispatchGameAction } from '../../frontend/js/engine.js';

const CONTRACT = {
  version: '0.1.0',
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

const LEVEL_1 = {
  id: 1, slug: 'level-1', title: 'First Steps',
  width: 8, height: 6, difficulty: 1,
  grid: [
    '########',
    '#......#',
    '#......#',
    '#......#',
    '#P.B.G.#',
    '########',
  ],
};

const LEVEL_COMPLETE_IN_ONE = {
  id: 77, slug: 'level-77', title: 'One Step',
  width: 5, height: 5, difficulty: 77,
  grid: [
    '#####',
    '#...#',
    '#...#',
    '#PG.#',
    '#####',
  ],
};

function newStartedRecorder(levelId = 17) {
  return startTraceRecording(createTraceRecorder({
    levelId,
    contractVersion: CONTRACT.version,
  }));
}

function dispatchAndRecord(recorder, state, level, actionType) {
  const result = dispatchGameAction(state, { type: actionType }, level, CONTRACT);
  return {
    result,
    recorder: recordTraceAction(recorder, actionType, state, result.state, result),
  };
}

function replayTrace(level, actions) {
  let state = createInitialState(level, CONTRACT);
  for (const actionType of actions) {
    const result = dispatchGameAction(state, { type: actionType }, level, CONTRACT);
    assert.equal(result.invalid, false, `replay action ${actionType} should be valid`);
    state = result.state;
  }
  return state;
}

export async function run() {
  const recorder = createTraceRecorder({
    levelId: 17,
    contractVersion: CONTRACT.version,
  });

  assert.deepEqual(
    recorder,
    {
      levelId: 17,
      contractVersion: '0.1.0',
      recording: false,
      completed: false,
      invalidated: false,
      invalidationReason: null,
      actions: [],
      summary: { actionCount: 0, pickups: 0, placements: 0 },
    },
    'createTraceRecorder initial state',
  );

  const restarted = startTraceRecording({
    ...recorder,
    actions: ['moveRight'],
    summary: { actionCount: 1, pickups: 1, placements: 0 },
    completed: true,
  });
  assert.equal(restarted.recording, true, 'startTraceRecording starts recording');
  assert.deepEqual(restarted.actions, [], 'startTraceRecording clears actions');
  assert.deepEqual(
    restarted.summary,
    { actionCount: 0, pickups: 0, placements: 0 },
    'startTraceRecording clears summary',
  );

  let state = createInitialState(LEVEL_1, CONTRACT);
  let active = newStartedRecorder(1);

  let step = dispatchAndRecord(active, state, LEVEL_1, 'moveRight');
  active = step.recorder;
  state = step.result.state;
  assert.deepEqual(active.actions, ['moveRight'], 'records successful moveRight');

  const facingTurn = dispatchAndRecord(active, state, LEVEL_1, 'moveLeft');
  active = facingTurn.recorder;
  state = facingTurn.result.state;
  assert.equal(facingTurn.result.invalid, false, 'facing-only turn is valid');
  assert.equal(facingTurn.result.changed, false, 'facing-only turn does not change moves/history');
  assert.deepEqual(active.actions, ['moveRight', 'moveLeft'], 'records facing-only moveLeft');

  const invalidMove = dispatchAndRecord(active, state, LEVEL_1, 'interact');
  assert.equal(invalidMove.result.invalid, true, 'invalid action fixture is invalid');
  assert.deepEqual(
    invalidMove.recorder.actions,
    active.actions,
    'invalid actions are not appended',
  );

  state = createInitialState(LEVEL_1, CONTRACT);
  active = newStartedRecorder(1);
  step = dispatchAndRecord(active, state, LEVEL_1, 'jump');
  active = step.recorder;
  assert.deepEqual(active.actions, ['jump'], 'records successful jump');

  const prePickup = {
    ...createInitialState(LEVEL_1, CONTRACT),
    player: { row: 4, col: 2 },
    facing: 'right',
  };
  step = dispatchAndRecord(active, prePickup, LEVEL_1, 'interact');
  active = step.recorder;
  assert.equal(step.result.state.carriedBlock !== null, true, 'pickup result carries block');
  assert.equal(active.summary.pickups, 1, 'pickup count increments');

  const prePlace = {
    ...createInitialState(LEVEL_1, CONTRACT),
    player: { row: 4, col: 2 },
    facing: 'right',
    blocks: [],
    carriedBlock: { id: 'b1' },
  };
  step = dispatchAndRecord(active, prePlace, LEVEL_1, 'interact');
  active = step.recorder;
  assert.equal(step.result.state.carriedBlock, null, 'placement clears carried block');
  assert.equal(active.summary.placements, 1, 'placement count increments');

  for (const reason of ['undo', 'reset', 'level-change']) {
    const invalidated = invalidateTraceRecording(newStartedRecorder(1), reason);
    assert.equal(invalidated.recording, false, `${reason}: stops recording`);
    assert.equal(invalidated.invalidated, true, `${reason}: invalidated`);
    assert.equal(invalidated.invalidationReason, reason, `${reason}: preserves reason`);
  }

  const incompleteStop = stopTraceRecording(newStartedRecorder(1), { status: 'playing' });
  assert.equal(incompleteStop.recording, false, 'stopTraceRecording stops incomplete recording');
  assert.equal(incompleteStop.completed, false, 'incomplete stop is not completed');

  const invalidatedStop = stopTraceRecording(
    invalidateTraceRecording(newStartedRecorder(1), 'reset'),
    { status: 'completed' },
  );
  assert.equal(invalidatedStop.completed, false, 'invalidated trace cannot complete');

  const completedStop = stopTraceRecording(active, { status: 'completed' });
  assert.equal(completedStop.recording, false, 'completed stop ends recording');
  assert.equal(completedStop.completed, true, 'completed stop marks completed');

  const exported = exportTraceRecording(completedStop);
  assert.deepEqual(
    exported,
    {
      version: '0.1.0',
      contractVersion: '0.1.0',
      source: 'manual-trace',
      levelId: 1,
      completed: true,
      invalidated: false,
      actions: ['jump', 'interact', 'interact'],
      summary: { actionCount: 3, pickups: 1, placements: 1 },
    },
    'exportTraceRecording returns exact SPEC shape',
  );

  let oneStepState = createInitialState(LEVEL_COMPLETE_IN_ONE, CONTRACT);
  active = newStartedRecorder(77);
  step = dispatchAndRecord(active, oneStepState, LEVEL_COMPLETE_IN_ONE, 'moveRight');
  const completedOneStep = stopTraceRecording(step.recorder, step.result.state);
  const completedExport = exportTraceRecording(completedOneStep);
  oneStepState = replayTrace(LEVEL_COMPLETE_IN_ONE, completedExport.actions);
  assert.equal(oneStepState.status, 'completed', 'small completed trace replays to completed');

  const traceJson = JSON.stringify(completedExport, null, 2);
  const copySuccess = await copyTraceToClipboard(traceJson, {
    writeText: async text => {
      assert.equal(text, traceJson, 'clipboard receives JSON');
    },
  });
  assert.equal(copySuccess.ok, true, 'copyTraceToClipboard reports success');
  assert.equal(copySuccess.traceJson, traceJson, 'copy success keeps fallback JSON');

  const copyFailure = await copyTraceToClipboard(traceJson, {
    writeText: async () => {
      throw new Error('denied');
    },
  });
  assert.equal(copyFailure.ok, false, 'copyTraceToClipboard reports failure');
  assert.equal(copyFailure.traceJson, traceJson, 'copy failure keeps fallback JSON');
  assert.match(copyFailure.error, /denied/, 'copy failure preserves error message');
}
