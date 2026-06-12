/**
 * Input binding — maps keyboard codes and on-screen button clicks to
 * game action dispatch calls.
 * All bindings derive from contract.keyboard; nothing is hardcoded.
 */

/**
 * Builds a code → actionType map from contract.keyboard.
 * Keys may appear in multiple actions' arrays; the last occurrence wins.
 *
 * @param {object} contract
 * @returns {Map<string, string>}
 */
function buildKeyMap(contract) {
  const map = new Map();
  for (const [action, codes] of Object.entries(contract.keyboard)) {
    for (const code of codes) {
      map.set(code, action);
    }
  }
  return map;
}

/**
 * Attaches keyboard and on-screen button listeners.
 *
 * @param {HTMLElement} root - element containing on-screen buttons
 * @param {object} contract - validated app contract
 * @param {(action: { type: string }) => void} dispatch
 * @param {{ disabledActions?: Set<string>, documentObj?: Document }} [options]
 */
export function bindInputs(root, contract, dispatch, options = {}) {
  const keyMap = buildKeyMap(contract);
  const disabledActions = options.disabledActions ?? new Set();
  const documentObj = options.documentObj ?? document;

  // Keyboard handler — prevents default scroll/jump on game keys
  documentObj.addEventListener('keydown', e => {
    const action = keyMap.get(e.code);
    if (!action) return;
    if (disabledActions.has(action)) return;
    e.preventDefault();
    dispatch({ type: action });
  });

  // On-screen button handler (delegation from root)
  root.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (disabledActions.has(action)) return;
    dispatch({ type: action });
  });
}
