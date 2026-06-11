import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createInitialState, dispatchGameAction } from '../../frontend/js/engine.js';

const CONTRACT = JSON.parse(
  readFileSync(new URL('../../shared/app_contract.json', import.meta.url), 'utf-8'),
);
const LEVELS = JSON.parse(
  readFileSync(new URL('../../backend/app/data/levels.json', import.meta.url), 'utf-8'),
).levels;
const SOLUTIONS = JSON.parse(
  readFileSync(new URL('../fixtures/level_solutions.json', import.meta.url), 'utf-8'),
);

const LEGAL_SOLUTION_ACTIONS = new Set([
  CONTRACT.actions.moveLeft,
  CONTRACT.actions.moveRight,
  CONTRACT.actions.jump,
  CONTRACT.actions.interact,
]);

export function run() {
  assert.equal(SOLUTIONS.version, '0.1.0', 'solutions: version');
  assert.equal(
    SOLUTIONS.contractVersion,
    CONTRACT.version,
    'solutions: contract version',
  );
  assert.ok(Array.isArray(SOLUTIONS.solutions), 'solutions: array');

  const expectedIds = LEVELS.map(level => level.id);
  const seenIds = new Set();
  const byId = new Map();

  for (const solution of SOLUTIONS.solutions) {
    assert.equal(typeof solution.levelId, 'number', 'solutions: levelId number');
    assert.equal(seenIds.has(solution.levelId), false, `solutions: duplicate ${solution.levelId}`);
    seenIds.add(solution.levelId);
    byId.set(solution.levelId, solution);

    assert.ok(Array.isArray(solution.actions), `level ${solution.levelId}: actions array`);
    assert.ok(solution.actions.length > 0, `level ${solution.levelId}: non-empty actions`);
    for (const action of solution.actions) {
      assert.equal(
        LEGAL_SOLUTION_ACTIONS.has(action),
        true,
        `level ${solution.levelId}: illegal action ${action}`,
      );
    }
  }

  assert.deepEqual(
    [...seenIds].sort((a, b) => a - b),
    expectedIds,
    'solutions: exact level coverage',
  );

  for (const level of LEVELS) {
    const solution = byId.get(level.id);
    let state = createInitialState(level, CONTRACT);
    for (const [step, action] of solution.actions.entries()) {
      const result = dispatchGameAction(state, { type: action }, level, CONTRACT);
      assert.equal(
        result.invalid,
        false,
        `level ${level.id}: invalid action ${action} at step ${step + 1}: ${result.message}`,
      );
      state = result.state;
    }
    assert.equal(state.status, 'completed', `level ${level.id}: completed`);
  }
}
