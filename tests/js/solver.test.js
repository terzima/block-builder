import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  analyzeLevel,
  createFailureSignature,
  createStateKey,
  isFailureDominated,
  solveLevel,
} from '../../tools/solve-levels.mjs';
import { createInitialState, dispatchGameAction } from '../../frontend/js/engine.js';

const CONTRACT = JSON.parse(
  readFileSync(new URL('../../shared/app_contract.json', import.meta.url), 'utf-8'),
);
const LEVELS = JSON.parse(
  readFileSync(new URL('../../backend/app/data/levels.json', import.meta.url), 'utf-8'),
).levels;
const EXPECTATIONS = JSON.parse(
  readFileSync(new URL('../fixtures/level_solver_expectations.json', import.meta.url), 'utf-8'),
);

const STATUS_VOCABULARY = new Set([
  'SOLVED',
  'FAILED_PREFLIGHT',
  'UNPROVEN_WITHIN_LIMIT',
  'UNSOLVABLE_EXHAUSTED',
  'ANALYZED',
]);

const UNDER_RESOURCED_LEVEL = {
  id: 901,
  slug: 'level-901',
  title: 'Under Resourced',
  width: 8,
  height: 8,
  difficulty: 901,
  grid: [
    '########',
    '#.....G#',
    '#....###',
    '#......#',
    '#......#',
    '#......#',
    '#PB....#',
    '########',
  ],
};

const REPEATED_BAD_PLAN_LEVEL = {
  id: 902,
  slug: 'level-902',
  title: 'Repeated Bad Plan',
  width: 10,
  height: 8,
  difficulty: 902,
  grid: [
    '##########',
    '#.......G#',
    '#......###',
    '#........#',
    '#........#',
    '#........#',
    '#PB......#',
    '##########',
  ],
};

function levelById(levelId) {
  const level = LEVELS.find(candidate => candidate.id === levelId);
  assert.ok(level, `level ${levelId} exists`);
  return level;
}

function getPath(obj, path) {
  return path.split('.').reduce((current, part) => {
    if (current == null) return undefined;
    if (/^\d+$/.test(part)) return current[Number(part)];
    return current[part];
  }, obj);
}

function replayActions(level, actions) {
  let state = createInitialState(level, CONTRACT);
  for (const action of actions) {
    const result = dispatchGameAction(state, { type: action }, level, CONTRACT);
    assert.equal(result.invalid, false, `solver action ${action} is valid`);
    state = result.state;
  }
  return state;
}

export function run() {
  assert.equal(EXPECTATIONS.version, '0.1.0', 'solver expectations: version');

  const initial = createInitialState(levelById(1), CONTRACT);
  const equivalentWithDifferentHistory = {
    ...initial,
    moves: initial.moves + 7,
    history: [initial],
  };
  assert.equal(
    createStateKey(initial),
    createStateKey(equivalentWithDifferentHistory),
    'state key ignores non-positional history and move count',
  );

  const signature = createFailureSignature({
    planner: {
      activeCandidate: {
        candidatePlanId: 'candidate-a',
        approachCell: { row: 3, col: 4 },
        committedScaffoldCells: [{ row: 4, col: 4 }],
        filledScaffoldTargets: [],
        reachableRegions: ['ground'],
        strandedBlocks: ['b2'],
        blockedPickupCells: [{ row: 6, col: 2 }],
        unrecoverableTemporaryBlocks: [],
      },
    },
    reason: 'RESOURCE_STRANDED',
  });
  for (const field of [
    'candidatePlanId',
    'approachCell',
    'committedScaffoldCells',
    'filledScaffoldTargets',
    'reachableRegions',
    'strandedBlocks',
    'blockedPickupCells',
    'unrecoverableTemporaryBlocks',
    'reason',
  ]) {
    assert.notEqual(signature[field], undefined, `failure signature includes ${field}`);
  }

  assert.equal(
    isFailureDominated(
      { ...signature, actionCount: 12 },
      { ...signature, actionCount: 10 },
    ),
    true,
    'equivalent higher-cost failure is dominated',
  );
  assert.equal(
    isFailureDominated(
      { ...signature, filledScaffoldTargets: [{ row: 4, col: 4 }], actionCount: 12 },
      { ...signature, actionCount: 10 },
    ),
    false,
    'new scaffold progress is not dominated',
  );
  assert.equal(
    isFailureDominated(
      { ...signature, reachableRegions: ['ground', 'bench'], actionCount: 12 },
      { ...signature, actionCount: 10 },
    ),
    false,
    'new reachable region is not dominated',
  );
  assert.equal(
    isFailureDominated(
      { ...signature, strandedBlocks: [], actionCount: 12 },
      { ...signature, actionCount: 10 },
    ),
    false,
    'fewer stranded blocks is not dominated',
  );
  assert.equal(
    isFailureDominated(
      { ...signature, blockedPickupCells: [], actionCount: 12 },
      { ...signature, actionCount: 10 },
    ),
    false,
    'fewer blocked pickups is not dominated',
  );
  assert.equal(
    isFailureDominated(
      { ...signature, actionCount: 8 },
      { ...signature, actionCount: 10 },
    ),
    false,
    'lower action count is not dominated',
  );

  for (const budget of EXPECTATIONS.budgets) {
    const level = levelById(budget.levelId);
    const report = solveLevel(level, CONTRACT, { maxStates: budget.maxStates });
    assert.equal(STATUS_VOCABULARY.has(report.status), true, `level ${level.id}: status vocabulary`);
    assert.equal(report.status, budget.expectedStatus, `level ${level.id}: status`);
    assert.ok(report.statesExpanded <= budget.maxStates, `level ${level.id}: max states`);
    assert.ok(report.timeMs <= budget.maxTimeMs, `level ${level.id}: max time`);
    const finalState = replayActions(level, report.actions);
    assert.equal(finalState.status, 'completed', `level ${level.id}: replayed solver solution`);
  }

  const underResourcedReport = solveLevel(UNDER_RESOURCED_LEVEL, CONTRACT, { maxStates: 500 });
  assert.equal(underResourcedReport.status, EXPECTATIONS.underResourcedFixture.expectedStatus);
  assert.equal(underResourcedReport.reason, EXPECTATIONS.underResourcedFixture.reason);
  assert.equal(underResourcedReport.statesExpanded, EXPECTATIONS.underResourcedFixture.statesExpanded);

  const level13Expectation = EXPECTATIONS.currentLevel13;
  const level13 = solveLevel(levelById(13), CONTRACT, { maxStates: 1000000 });
  assert.equal(
    level13Expectation.disallowedFinalStatuses.includes(level13.status),
    false,
    'current level 13 does not return a disallowed final status',
  );
  assert.equal(
    level13Expectation.allowedFinalStatuses.includes(level13.status),
    true,
    'current level 13 returns an allowed final status',
  );
  if (level13.status !== 'SOLVED') {
    for (const field of level13Expectation.requiredDiagnosticsWhenUnsolved) {
      assert.notEqual(getPath(level13, field), undefined, `current level 13 diagnostic ${field}`);
    }
  }

  const repeatedBadPlan = solveLevel(REPEATED_BAD_PLAN_LEVEL, CONTRACT, { maxStates: 500 });
  assert.ok(
    repeatedBadPlan.prunedSimilarFailures >= EXPECTATIONS.repeatedBadPlanFixture.minPrunedSimilarFailures,
    'repeated-bad-plan fixture reports pruned similar failures',
  );

  const firstRun = solveLevel(levelById(1), CONTRACT, { maxStates: 500 });
  const secondRun = solveLevel(levelById(1), CONTRACT, { maxStates: 500 });
  assert.equal(secondRun.status, firstRun.status, 'deterministic status');
  assert.deepEqual(secondRun.actions, firstRun.actions, 'deterministic action sequence');
  assert.equal(secondRun.statesExpanded, firstRun.statesExpanded, 'deterministic state count');
  assert.equal(
    secondRun.planner.chosenCandidateRank,
    firstRun.planner.chosenCandidateRank,
    'deterministic chosen candidate rank',
  );
  assert.deepEqual(
    secondRun.recommendations.map(recommendation => recommendation.type),
    firstRun.recommendations.map(recommendation => recommendation.type),
    'deterministic recommendation types',
  );

  const plannerReport = solveLevel(UNDER_RESOURCED_LEVEL, CONTRACT, { maxStates: 500 });
  for (const field of [
    'goalApproachCells',
    'candidateScaffolds',
    'chosenCandidateRank',
    'stockpileRegions',
    'subgoals',
    'rejectedCandidates',
  ]) {
    assert.notEqual(plannerReport.planner[field], undefined, `planner diagnostics include ${field}`);
  }

  const analysis = analyzeLevel(levelById(8), CONTRACT, solveLevel(levelById(8), CONTRACT, { maxStates: 20000 }));
  assert.equal(analysis.status, 'ANALYZED', 'analyzer status');
  for (const field of [
    'shortestFoundActions',
    'pickups',
    'placements',
    'uniqueBlocksUsed',
    'reusedBlockCount',
    'unusedBlocks',
    'maxStackHeight',
    'maxPlayerElevation',
    'peakCommittedBlocks',
    'statesExpanded',
  ]) {
    assert.notEqual(analysis.summary[field], undefined, `summary metric ${field}`);
  }
  for (const field of [
    'irreversibleDeadEndsFound',
    'lateDeadEndsFound',
    'nearGoalDeadEndsFound',
    'resourceStrandingDeadEnds',
    'misleadingProgressStates',
    'solutionOrderSensitivity',
    'unintendedBypassEvidence',
  ]) {
    assert.notEqual(analysis.difficultySignals[field], undefined, `difficulty signal ${field}`);
  }
  for (const field of ['type', 'priority', 'reason', 'action']) {
    assert.notEqual(analysis.recommendations[0][field], undefined, `recommendation ${field}`);
  }
}
