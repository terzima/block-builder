/**
 * Manual trace recorder helpers.
 * Pure state transitions; no DOM, storage, or network access.
 */

const TRACE_VERSION = '0.1.0';
const SOURCE = 'manual-trace';
const FORWARD_ACTIONS = new Set(['moveLeft', 'moveRight', 'jump', 'interact']);

function emptySummary() {
  return { actionCount: 0, pickups: 0, placements: 0 };
}

function isCarrying(state) {
  return Boolean(state?.carriedBlock ?? state?.carrying ?? null);
}

function normalizeActionType(action) {
  return typeof action === 'string' ? action : action?.type;
}

/**
 * @param {{ levelId: number, contractVersion: string }} options
 */
export function createTraceRecorder({ levelId, contractVersion }) {
  return {
    levelId,
    contractVersion,
    recording: false,
    completed: false,
    invalidated: false,
    invalidationReason: null,
    actions: [],
    summary: emptySummary(),
  };
}

export function startTraceRecording(recorder) {
  return {
    ...recorder,
    recording: true,
    completed: false,
    invalidated: false,
    invalidationReason: null,
    actions: [],
    summary: emptySummary(),
  };
}

export function recordTraceAction(recorder, action, beforeState, afterState, result) {
  const actionType = normalizeActionType(action);
  if (!recorder?.recording || recorder.invalidated || result?.invalid) {
    return recorder;
  }
  if (!FORWARD_ACTIONS.has(actionType)) {
    return recorder;
  }

  const beforeCarrying = isCarrying(beforeState);
  const afterCarrying = isCarrying(afterState);
  const pickups = actionType === 'interact' && !beforeCarrying && afterCarrying ? 1 : 0;
  const placements = actionType === 'interact' && beforeCarrying && !afterCarrying ? 1 : 0;

  const actions = [...recorder.actions, actionType];
  return {
    ...recorder,
    actions,
    summary: {
      actionCount: actions.length,
      pickups: recorder.summary.pickups + pickups,
      placements: recorder.summary.placements + placements,
    },
  };
}

export function invalidateTraceRecording(recorder, reason) {
  if (!recorder) return recorder;
  return {
    ...recorder,
    recording: false,
    completed: false,
    invalidated: true,
    invalidationReason: reason,
  };
}

export function stopTraceRecording(recorder, finalState) {
  if (!recorder) return recorder;
  const completed = !recorder.invalidated && finalState?.status === 'completed';
  return {
    ...recorder,
    recording: false,
    completed,
  };
}

export function exportTraceRecording(recorder) {
  const actions = [...recorder.actions];
  return {
    version: TRACE_VERSION,
    contractVersion: recorder.contractVersion,
    source: SOURCE,
    levelId: recorder.levelId,
    completed: Boolean(recorder.completed),
    invalidated: Boolean(recorder.invalidated),
    actions,
    summary: {
      actionCount: actions.length,
      pickups: recorder.summary.pickups,
      placements: recorder.summary.placements,
    },
  };
}

export async function copyTraceToClipboard(traceJson, clipboard = globalThis.navigator?.clipboard) {
  try {
    if (!clipboard?.writeText) {
      throw new Error('Clipboard unavailable');
    }
    await clipboard.writeText(traceJson);
    return { ok: true, traceJson };
  } catch (err) {
    return { ok: false, traceJson, error: err.message };
  }
}

export function createTraceDownloadBlob(traceJson) {
  if (typeof Blob === 'function') {
    return new Blob([traceJson], { type: 'application/json' });
  }
  return { text: traceJson, type: 'application/json' };
}
