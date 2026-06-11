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
