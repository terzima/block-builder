/**
 * Contract-based API client.
 * API mode derives URLs from the contract; static mode derives URLs from
 * runtime config.
 */

import { DEFAULT_RUNTIME_CONFIG, normalizeRuntimeConfig } from './runtime-config.js';

/**
 * Creates an API client from the validated contract.
 * API failures throw Error with the backend error code as the message.
 *
 * @param {object} contract - validated app contract
 * @param {typeof fetch} [fetchImpl]
 * @param {object} [runtimeConfig]
 * @returns {{ getConfig, listLevels, getLevel }}
 */
export function createApiClient(
  contract,
  fetchImpl = fetch,
  runtimeConfig = DEFAULT_RUNTIME_CONFIG,
) {
  const config = normalizeRuntimeConfig(runtimeConfig);
  const { origin, prefix, routes } = contract.api;
  const base = `${origin}${prefix}`;
  const staticBase = config.dataBasePath;

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
      if (config.dataSource === 'static') {
        return request(`${staticBase}/config.json`);
      }
      return request(`${base}${routes.config}`);
    },

    /** @returns {Promise<object[]>} array of level metadata */
    async listLevels() {
      const data = await request(
        config.dataSource === 'static'
          ? `${staticBase}/levels.json`
          : `${base}${routes.levels}`,
      );
      return data.levels;
    },

    /** @returns {Promise<object>} full level definition including grid */
    getLevel(levelId) {
      if (config.dataSource === 'static') {
        return request(`${staticBase}/levels/${levelId}.json`);
      }
      const path = routes.levelById.replace('{levelId}', levelId);
      return request(`${base}${path}`);
    },
  };
}
