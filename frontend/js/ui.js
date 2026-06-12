/**
 * UI helpers — status text, modal state, busy indicator.
 * These are the only module-level document.getElementById calls
 * outside of app.js.
 */

/**
 * Sets the text of the #status-region aria-live region.
 * Screen readers announce changes to this element.
 *
 * @param {string} message
 */
export function setStatus(message) {
  const el = document.getElementById('status-region');
  if (el) el.textContent = message;
}

/**
 * Reveals the #completion-dialog.
 * State rendering (title/summary) is handled by renderer.renderCompletion.
 */
export function showCompletion() {
  const dialog = document.getElementById('completion-dialog');
  if (dialog) dialog.hidden = false;
}

/** Hides the #completion-dialog. */
export function hideCompletion() {
  const dialog = document.getElementById('completion-dialog');
  if (dialog) dialog.hidden = true;
}

/**
 * Marks the app as busy (loading) or interactive via aria-busy.
 *
 * @param {boolean} isBusy
 */
export function setBusy(isBusy) {
  const app = document.getElementById('app');
  if (app) app.setAttribute('aria-busy', isBusy ? 'true' : 'false');
}

export function setTraceStatus(message) {
  const el = document.getElementById('trace-status');
  if (el) el.textContent = message;
}

export function setTraceRecording(isRecording) {
  const button = document.getElementById('trace-record-button');
  if (!button) return;
  button.disabled = isRecording;
  button.textContent = isRecording ? 'Recording...' : 'Record';
}

export function showTraceOutput(traceJson) {
  const panel = document.getElementById('trace-panel');
  const output = document.getElementById('trace-output');
  const copyButton = document.getElementById('trace-copy-button');
  const downloadButton = document.getElementById('trace-download-button');

  if (panel) panel.classList.add('trace-panel-complete');
  if (output) {
    output.hidden = false;
    output.value = traceJson;
  }
  if (copyButton) copyButton.hidden = false;
  if (downloadButton) downloadButton.hidden = false;
}

export function clearTraceOutput() {
  const panel = document.getElementById('trace-panel');
  const output = document.getElementById('trace-output');
  const copyButton = document.getElementById('trace-copy-button');
  const downloadButton = document.getElementById('trace-download-button');

  if (panel) panel.classList.remove('trace-panel-complete');
  if (output) {
    output.value = '';
    output.hidden = true;
  }
  if (copyButton) copyButton.hidden = true;
  if (downloadButton) downloadButton.hidden = true;
}
