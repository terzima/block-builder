/**
 * Contract loading and validation.
 * The shared app_contract.json is the single source of truth for routes,
 * tile symbols, action names, and keyboard bindings.
 */

export const DEFAULT_CONTRACT_PATH = '/shared/app_contract.json';

/** Required top-level keys in a valid contract. */
const REQUIRED_KEYS = [
  'version', 'appName', 'api', 'static', 'tiles',
  'actions', 'keyboard', 'storageKeys', 'gameplay', 'ui',
];

/**
 * Validates a contract object and throws if any required field is missing.
 * Also asserts that `actions.interact` and `keyboard.interact` exist.
 *
 * @param {object} contract
 * @returns {object} the same contract object (pass-through)
 * @throws {Error} when validation fails
 */
export function validateContract(contract) {
  for (const key of REQUIRED_KEYS) {
    if (!(key in contract)) {
      throw new Error(`Contract missing required field: "${key}"`);
    }
  }
  if (!contract.actions.interact) {
    throw new Error('Contract missing actions.interact');
  }
  if (!contract.keyboard.interact) {
    throw new Error('Contract missing keyboard.interact');
  }
  return contract;
}

/**
 * Loads the contract JSON from path and validates it.
 *
 * @param {string} [path]
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<object>}
 */
export async function loadContract(
  path = DEFAULT_CONTRACT_PATH,
  fetchImpl = fetch,
) {
  const res = await fetchImpl(path);
  if (!res.ok) {
    throw new Error(`Failed to load contract from ${path}: HTTP ${res.status}`);
  }
  const contract = await res.json();
  return validateContract(contract);
}
