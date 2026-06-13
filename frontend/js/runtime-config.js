/**
 * Runtime configuration for local API mode and deployed static mode.
 */

export const DEFAULT_RUNTIME_CONFIG = Object.freeze({
  mode: 'dev',
  dataSource: 'api',
  dataBasePath: '/static-data',
  enableTraceRecorder: true,
  enableUndo: true,
});

const MODES = new Set(['dev', 'deployed']);
const DATA_SOURCES = new Set(['api', 'static']);

function invalidConfig(message) {
  throw new Error(`Invalid runtime config: ${message}`);
}

/**
 * Normalizes an optional runtime config object.
 *
 * @param {object} rawConfig
 * @returns {object}
 */
export function normalizeRuntimeConfig(rawConfig = {}) {
  const config = { ...DEFAULT_RUNTIME_CONFIG, ...(rawConfig ?? {}) };

  if (!MODES.has(config.mode)) {
    invalidConfig(`mode must be dev or deployed, got ${String(config.mode)}`);
  }
  if (!DATA_SOURCES.has(config.dataSource)) {
    invalidConfig(`dataSource must be api or static, got ${String(config.dataSource)}`);
  }
  if (
    typeof config.dataBasePath !== 'string' ||
    config.dataBasePath.length === 0 ||
    !config.dataBasePath.startsWith('/')
  ) {
    invalidConfig('dataBasePath must be an absolute path');
  }
  if (typeof config.enableTraceRecorder !== 'boolean') {
    invalidConfig('enableTraceRecorder must be boolean');
  }
  if (typeof config.enableUndo !== 'boolean') {
    invalidConfig('enableUndo must be boolean');
  }

  let dataBasePath = config.dataBasePath;
  while (dataBasePath.length > 1 && dataBasePath.endsWith('/')) {
    dataBasePath = dataBasePath.slice(0, -1);
  }

  return { ...config, dataBasePath };
}

/**
 * Reads runtime config from the provided global object.
 *
 * @param {object} globalObj
 * @returns {object}
 */
export function getRuntimeConfig(globalObj = globalThis) {
  return normalizeRuntimeConfig(globalObj?.BLOCK_BUILDER_RUNTIME_CONFIG ?? {});
}
