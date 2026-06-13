/**
 * Dev-only trace recording controller.
 *
 * This module is intentionally loaded dynamically by app.js only when runtime
 * config enables trace recording. Static export excludes it from dist.
 */

import {
  createTraceRecorder,
  startTraceRecording,
  recordTraceAction,
  invalidateTraceRecording,
  stopTraceRecording,
  exportTraceRecording,
  copyTraceToClipboard,
  createTraceDownloadBlob,
} from './trace-recorder.js';

const $ = id => document.getElementById(id);

function setTraceStatus(message) {
  const el = $('trace-status');
  if (el) el.textContent = message;
}

function setTraceRecording(isRecording) {
  const button = $('trace-record-button');
  if (!button) return;
  button.disabled = isRecording;
  button.textContent = isRecording ? 'Recording...' : 'Record';
}

function showTraceOutput(traceJson) {
  const panel = $('trace-panel');
  const output = $('trace-output');
  const copyButton = $('trace-copy-button');
  const downloadButton = $('trace-download-button');

  if (panel) panel.classList.add('trace-panel-complete');
  if (output) {
    output.hidden = false;
    output.value = traceJson;
  }
  if (copyButton) copyButton.hidden = false;
  if (downloadButton) downloadButton.hidden = false;
}

function clearTraceOutput() {
  const panel = $('trace-panel');
  const output = $('trace-output');
  const copyButton = $('trace-copy-button');
  const downloadButton = $('trace-download-button');

  if (panel) panel.classList.remove('trace-panel-complete');
  if (output) {
    output.value = '';
    output.hidden = true;
  }
  if (copyButton) copyButton.hidden = true;
  if (downloadButton) downloadButton.hidden = true;
}

/**
 * Creates a dev-only trace controller.
 *
 * @param {{ contract: object, getCurrentRawLevel: () => object | null }} options
 */
export function createTraceDevController({ contract, getCurrentRawLevel }) {
  let traceRecorder = null;
  let completedTraceJson = '';

  function reset(levelId) {
    traceRecorder = createTraceRecorder({
      levelId,
      contractVersion: contract.version,
    });
    completedTraceJson = '';
    clearTraceOutput();
    setTraceRecording(false);
    setTraceStatus('');
  }

  function startForCurrentLevel() {
    const currentRawLevel = getCurrentRawLevel();
    if (!currentRawLevel || !contract) return;
    traceRecorder = startTraceRecording(createTraceRecorder({
      levelId: currentRawLevel.id,
      contractVersion: contract.version,
    }));
    completedTraceJson = '';
    clearTraceOutput();
    setTraceRecording(true);
    setTraceStatus(`Recording level ${currentRawLevel.id}.`);
  }

  function invalidate(reason) {
    if (!traceRecorder?.recording) return;
    traceRecorder = invalidateTraceRecording(traceRecorder, reason);
    setTraceRecording(false);
    setTraceStatus(`Trace stopped: ${reason}.`);
  }

  function record(actionType, beforeState, result) {
    if (!traceRecorder?.recording) return;
    traceRecorder = recordTraceAction(
      traceRecorder,
      actionType,
      beforeState,
      result.state,
      result,
    );
  }

  function complete(finalState) {
    if (!traceRecorder?.recording) return;
    traceRecorder = stopTraceRecording(traceRecorder, finalState);
    setTraceRecording(false);

    if (!traceRecorder.completed || traceRecorder.invalidated) return;

    const trace = exportTraceRecording(traceRecorder);
    completedTraceJson = JSON.stringify(trace, null, 2);
    showTraceOutput(completedTraceJson);
    setTraceStatus('Trace complete. Copying JSON...');

    copyTraceToClipboard(completedTraceJson).then(result => {
      if (completedTraceJson !== result.traceJson) return;
      setTraceStatus(
        result.ok
          ? 'Trace complete. JSON copied to clipboard.'
          : 'Trace complete. Clipboard unavailable; use Copy or Download.',
      );
    });
  }

  async function copyCompletedTrace() {
    if (!completedTraceJson) return;
    const result = await copyTraceToClipboard(completedTraceJson);
    setTraceStatus(
      result.ok
        ? 'Trace JSON copied to clipboard.'
        : 'Clipboard unavailable; use the selectable JSON or Download.',
    );
  }

  function downloadCompletedTrace() {
    if (!completedTraceJson) return;
    const blob = createTraceDownloadBlob(completedTraceJson);
    if (typeof Blob !== 'function' || !(blob instanceof Blob)) return;

    const currentRawLevel = getCurrentRawLevel();
    const levelId = traceRecorder?.levelId ?? currentRawLevel?.id ?? 'unknown';
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `level-${levelId}-trace.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setTraceStatus('Trace JSON download started.');
  }

  function wireControls() {
    $('trace-record-button')?.addEventListener('click', startForCurrentLevel);
    $('trace-copy-button')?.addEventListener('click', copyCompletedTrace);
    $('trace-download-button')?.addEventListener('click', downloadCompletedTrace);
  }

  return { reset, invalidate, record, complete, wireControls };
}
