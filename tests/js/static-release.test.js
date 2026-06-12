import assert from 'node:assert/strict';
import {
  DEFAULT_RUNTIME_CONFIG,
  getRuntimeConfig,
  normalizeRuntimeConfig,
} from '../../frontend/js/runtime-config.js';
import { createApiClient } from '../../frontend/js/api.js';
import { bindInputs } from '../../frontend/js/input.js';

const CONTRACT = {
  api: {
    origin: '',
    prefix: '/api/v1',
    routes: {
      config: '/config',
      levels: '/levels',
      levelById: '/levels/{levelId}',
    },
  },
  actions: {
    reset: 'reset',
    undo: 'undo',
  },
  keyboard: {
    reset: ['KeyR'],
    undo: ['KeyZ'],
  },
};

function createMockFetch(responses, urls = []) {
  return async url => {
    urls.push(url);
    const body = responses[url];
    if (body === undefined) {
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: { code: 'NOT_FOUND' } }),
      };
    }
    return {
      ok: true,
      status: 200,
      json: async () => body,
    };
  };
}

function createInputHarness() {
  const documentHandlers = new Map();
  const rootHandlers = new Map();
  const documentObj = {
    addEventListener(type, handler) {
      documentHandlers.set(type, handler);
    },
  };
  const root = {
    addEventListener(type, handler) {
      rootHandlers.set(type, handler);
    },
  };
  return { documentObj, root, documentHandlers, rootHandlers };
}

function keyboardEvent(code) {
  return {
    code,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
  };
}

function clickEvent(action) {
  return {
    target: {
      closest(selector) {
        assert.equal(selector, '[data-action]');
        return { dataset: { action } };
      },
    },
  };
}

export async function run() {
  assert.deepEqual(
    normalizeRuntimeConfig(),
    DEFAULT_RUNTIME_CONFIG,
    'runtime config: missing uses defaults',
  );

  assert.deepEqual(
    normalizeRuntimeConfig({
      mode: 'deployed',
      dataSource: 'static',
      dataBasePath: '/static-data/',
      enableTraceRecorder: false,
      enableUndo: false,
    }),
    {
      mode: 'deployed',
      dataSource: 'static',
      dataBasePath: '/static-data',
      enableTraceRecorder: false,
      enableUndo: false,
    },
    'runtime config: deployed config normalizes data path',
  );

  assert.throws(
    () => normalizeRuntimeConfig({ mode: 'prod' }),
    /Invalid runtime config:/,
    'runtime config: rejects invalid mode',
  );

  assert.deepEqual(
    getRuntimeConfig({ BLOCK_BUILDER_RUNTIME_CONFIG: { dataSource: 'static' } }),
    { ...DEFAULT_RUNTIME_CONFIG, dataSource: 'static' },
    'runtime config: reads global config',
  );

  const apiUrls = [];
  const apiClient = createApiClient(
    CONTRACT,
    createMockFetch({
      '/api/v1/levels': { levels: [{ id: 1 }] },
      '/api/v1/levels/7': { id: 7 },
    }, apiUrls),
  );
  assert.deepEqual(await apiClient.listLevels(), [{ id: 1 }], 'api mode: levels');
  assert.deepEqual(await apiClient.getLevel(7), { id: 7 }, 'api mode: level detail');
  assert.deepEqual(
    apiUrls,
    ['/api/v1/levels', '/api/v1/levels/7'],
    'api mode: uses contract routes',
  );

  const staticUrls = [];
  const staticClient = createApiClient(
    CONTRACT,
    createMockFetch({
      '/static-data/levels.json': { levels: [{ id: 2 }] },
      '/static-data/levels/8.json': { id: 8 },
    }, staticUrls),
    normalizeRuntimeConfig({ dataSource: 'static', dataBasePath: '/static-data/' }),
  );
  assert.deepEqual(await staticClient.listLevels(), [{ id: 2 }], 'static mode: levels');
  assert.deepEqual(await staticClient.getLevel(8), { id: 8 }, 'static mode: level detail');
  assert.deepEqual(
    staticUrls,
    ['/static-data/levels.json', '/static-data/levels/8.json'],
    'static mode: uses static data routes',
  );

  const actions = [];
  const { documentObj, root, documentHandlers, rootHandlers } = createInputHarness();
  bindInputs(root, CONTRACT, action => actions.push(action.type), {
    disabledActions: new Set(['undo']),
    documentObj,
  });

  const undoKey = keyboardEvent('KeyZ');
  documentHandlers.get('keydown')(undoKey);
  assert.deepEqual(actions, [], 'input: disabled undo key does not dispatch');

  const resetKey = keyboardEvent('KeyR');
  documentHandlers.get('keydown')(resetKey);
  assert.equal(resetKey.defaultPrevented, true, 'input: enabled reset key prevents default');
  assert.deepEqual(actions, ['reset'], 'input: enabled reset key dispatches');

  rootHandlers.get('click')(clickEvent('undo'));
  assert.deepEqual(actions, ['reset'], 'input: disabled undo click does not dispatch');

  rootHandlers.get('click')(clickEvent('reset'));
  assert.deepEqual(actions, ['reset', 'reset'], 'input: enabled reset click dispatches');
}
