/**
 * Contract-based API client.
 * All URLs are derived from the contract — no hardcoded paths.
 */

/**
 * Creates an API client from the validated contract.
 * API failures throw Error with the backend error code as the message.
 *
 * @param {object} contract - validated app contract
 * @param {typeof fetch} [fetchImpl]
 * @returns {{ getConfig, listLevels, getLevel }}
 */
export function createApiClient(contract, fetchImpl = fetch) {
  const { origin, prefix, routes } = contract.api;
  const base = `${origin}${prefix}`;

  async function request(url) {
    const res = await fetchImpl(url);
    let body;
    try {
      body = await res.json();
    } catch {
      throw new Error(`HTTP ${res.status}`);
    }
    if (!res.ok) {
      const code = body?.error?.code ?? String(res.status);
      throw new Error(code);
    }
    return body;
  }

  return {
    /** @returns {Promise<object>} config payload */
    getConfig() {
      return request(`${base}${routes.config}`);
    },

    /** @returns {Promise<object[]>} array of level metadata */
    async listLevels() {
      const data = await request(`${base}${routes.levels}`);
      return data.levels;
    },

    /** @returns {Promise<object>} full level definition including grid */
    getLevel(levelId) {
      const path = routes.levelById.replace('{levelId}', levelId);
      return request(`${base}${path}`);
    },
  };
}
