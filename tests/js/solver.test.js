import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  analyzeLevel,
  analyzeTrace,
  buildRegionGraph,
  canonicalizeState,
  checkFinalBuildReadiness,
  classifyRegionStockpiles,
  createFailureSignature,
  createStateKey,
  createTraceSolverRecommendations,
  decodeTracePhases,
  detectRegionTransfers,
  detectTemporaryScaffolds,
  expandLegalActions,
  isFailureDominated,
  planRegionTransfers,
  replayTraceActions,
  runSolver,
  solveEndgameLogisticsLevel,
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
const LEVEL_17_TRACE = JSON.parse(
  readFileSync(new URL('../fixtures/manual_traces/level_17_trace.json', import.meta.url), 'utf-8'),
);

const STATUS_VOCABULARY = new Set([
  'SOLVED',
  'FAILED_PREFLIGHT',
  'UNPROVEN_WITHIN_LIMIT',
  'UNSOLVABLE_EXHAUSTED',
  'ANALYZED',
]);
const TRACE_PHASE_VOCABULARY = new Set([
  'collect',
  'stage',
  'build_temporary_access',
  'climb_to_platform',
  'recover_temporary_blocks',
  'transfer_between_regions',
  'build_final_scaffold',
  'complete_goal_approach',
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
  const identityPermutation = {
    ...initial,
    blocks: initial.blocks.map((block, index) => ({
      ...block,
      id: `permuted-${initial.blocks.length - index}`,
    })),
  };
  assert.equal(
    createStateKey(initial),
    createStateKey(identityPermutation),
    'state key ignores engine-internal block ids',
  );
  const canonical = canonicalizeState(initial);
  assert.deepEqual(
    Object.keys(canonical).sort(),
    ['blocks', 'carried', 'facing', 'levelId', 'player', 'status'].sort(),
    'canonical state has only solver-equivalence fields',
  );
  assert.equal(
    expandLegalActions({ ...initial, facing: 'left' }, levelById(1), CONTRACT)
      .some(transition => transition.action === 'moveLeft' && transition.state.player.col < initial.player.col),
    false,
    'invalid move transitions are not enqueued',
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

  const traceExpectation = EXPECTATIONS.traceAnalyzer;
  assert.equal(LEVEL_17_TRACE.levelId, traceExpectation.levelId, 'level 17 trace fixture: level id');
  const traceReplay = replayTraceActions(levelById(17), CONTRACT, LEVEL_17_TRACE);
  assert.equal(traceReplay.valid, true, 'level 17 trace replay: valid');
  assert.equal(traceReplay.completed, true, 'level 17 trace replay: completed');
  assert.equal(traceReplay.invalidStep, null, 'level 17 trace replay: no invalid step');
  assert.equal(traceReplay.summary.actionCount, LEVEL_17_TRACE.actions.length, 'level 17 trace replay: action count');
  assert.equal(traceReplay.summary.pickups, LEVEL_17_TRACE.summary.pickups, 'level 17 trace replay: pickups');
  assert.equal(traceReplay.summary.placements, LEVEL_17_TRACE.summary.placements, 'level 17 trace replay: placements');

  const observedPhases = decodeTracePhases(traceReplay.frames, levelById(17));
  assert.ok(observedPhases.length > 0, 'trace phases: non-empty');
  assert.equal(
    observedPhases.every(phase => TRACE_PHASE_VOCABULARY.has(phase)),
    true,
    'trace phases: fixed vocabulary',
  );
  assert.ok(observedPhases.includes('collect'), 'trace phases: collect');
  assert.ok(observedPhases.includes('stage'), 'trace phases: stage');
  assert.ok(observedPhases.includes('complete_goal_approach'), 'trace phases: complete goal');
  assert.ok(
    observedPhases.some(phase => [
      'transfer_between_regions',
      'build_temporary_access',
      'recover_temporary_blocks',
    ].includes(phase)),
    'trace phases: strategic transfer/access/recovery evidence',
  );

  const regionTransfers = detectRegionTransfers(traceReplay.frames, levelById(17));
  assert.ok(regionTransfers.length > 0, 'trace region transfers: non-empty');
  assert.ok(regionTransfers.some(transfer => transfer.blocksMoved > 0), 'trace region transfers: moved blocks');

  const temporaryScaffolds = detectTemporaryScaffolds(traceReplay.frames, levelById(17));
  assert.equal(Array.isArray(temporaryScaffolds), true, 'temporary scaffolds: array');

  const traceAnalysis = analyzeTrace(levelById(17), CONTRACT, LEVEL_17_TRACE);
  assert.equal(traceAnalysis.status, traceExpectation.expectedStatus, 'analyzeTrace: status');
  assert.equal(traceAnalysis.traceReplay.valid, true, 'analyzeTrace: valid replay');
  assert.equal(traceAnalysis.traceReplay.completed, true, 'analyzeTrace: completed replay');
  assert.deepEqual(
    traceAnalysis.solverFacingRecommendations,
    createTraceSolverRecommendations(traceAnalysis),
    'analyzeTrace: recommendation helper output',
  );
  assert.ok(traceAnalysis.solverFacingRecommendations.length > 0, 'analyzeTrace: recommendations');
  for (const recommendation of traceAnalysis.solverFacingRecommendations) {
    for (const field of traceExpectation.requiredRecommendationFields) {
      assert.notEqual(recommendation[field], undefined, `trace recommendation includes ${field}`);
    }
    const recommendationText = Object.values(recommendation).join(' ').toLowerCase();
    assert.ok(
      traceExpectation.strategicTerms.some(term => recommendationText.includes(term)),
      'trace recommendation is strategic/order-agnostic',
    );
    assert.equal(Array.isArray(recommendation.rawActions), false, 'trace recommendation omits raw action script');
  }

  const compactTraceReport = runSolver({
    mode: 'analyze-trace',
    level: 17,
    trace: traceExpectation.fixture,
  });
  assert.equal(compactTraceReport.status, 'ANALYZED', 'analyze-trace mode: status');
  assert.equal(compactTraceReport.traceReplay.valid, true, 'analyze-trace mode: replay valid');
  assert.equal(compactTraceReport.traceReplay.completed, true, 'analyze-trace mode: replay completed');
  for (const forbiddenField of [
    'actions',
    'frames',
    'perActionReplay',
    'rawStateKeys',
    'searchTree',
    'rejectedStates',
  ]) {
    assert.equal(compactTraceReport[forbiddenField], undefined, `compact analyze-trace omits ${forbiddenField}`);
  }

  const invalidTraceCases = [
    { label: 'shape', trace: {} },
    { label: 'action name', trace: { ...LEVEL_17_TRACE, actions: ['badAction'] } },
    { label: 'level mismatch', trace: { ...LEVEL_17_TRACE, levelId: 18 } },
    { label: 'not completed', trace: { ...LEVEL_17_TRACE, completed: false } },
    { label: 'invalidated', trace: { ...LEVEL_17_TRACE, invalidated: true } },
    { label: 'replay failure', trace: { ...LEVEL_17_TRACE, actions: ['moveLeft'], summary: { actionCount: 1, pickups: 0, placements: 0 } } },
  ];
  for (const { label, trace } of invalidTraceCases) {
    const invalidReport = analyzeTrace(levelById(17), CONTRACT, trace);
    assert.equal(invalidReport.status, 'FAILED_PREFLIGHT', `invalid trace ${label}: status`);
    assert.equal(invalidReport.reason, traceExpectation.expectedReplayReason, `invalid trace ${label}: reason`);
    assert.equal(invalidReport.traceReplay.valid, false, `invalid trace ${label}: replay invalid`);
    assert.notEqual(invalidReport.traceReplay.invalidStep, null, `invalid trace ${label}: invalid step`);
  }
  assert.throws(
    () => runSolver({ mode: 'validity', level: 17, trace: traceExpectation.fixture }),
    /TRACE_INPUT_NOT_ALLOWED/,
    'validity mode rejects trace input',
  );

  const logisticsExpectation = EXPECTATIONS.regionLogistics;
  for (const levelId of [16, 17]) {
    const level = levelById(levelId);
    const state = createInitialState(level, CONTRACT);
    const regionGraph = buildRegionGraph(level, state, CONTRACT);
    const regionIds = regionGraph.regions.map(region => region.id);
    for (const regionId of logisticsExpectation.requiredRegions) {
      assert.ok(regionIds.includes(regionId), `level ${levelId}: region graph includes ${regionId}`);
    }
    assert.ok(regionGraph.transferBoundaries.length > 0, `level ${levelId}: transfer boundaries`);

    const stockpiles = classifyRegionStockpiles(regionGraph, state);
    assert.equal(stockpiles.totalBlocks, state.blocks.length, `level ${levelId}: stockpile block count`);
    for (const classification of logisticsExpectation.requiredBlockClassifications) {
      assert.ok(
        stockpiles.classificationVocabulary.includes(classification),
        `level ${levelId}: classification vocabulary includes ${classification}`,
      );
    }
  }

  const level17 = levelById(17);
  const level17Initial = createInitialState(level17, CONTRACT);
  const level17RegionGraph = buildRegionGraph(level17, level17Initial, CONTRACT);
  const initialReadiness = checkFinalBuildReadiness(
    { level: level17, contract: CONTRACT, regionGraph: level17RegionGraph, state: level17Initial },
    {},
  );
  assert.equal(initialReadiness.ready, false, 'level 17 initial final-build readiness fails');
  assert.ok(initialReadiness.missingStagedBlocks > 0, 'level 17 initial readiness reports missing staged blocks');
  assert.ok(initialReadiness.finalScaffoldCells.length > 0, 'level 17 readiness reports final scaffold cells');

  const level17TraceReplay = replayTraceActions(level17, CONTRACT, LEVEL_17_TRACE);
  const solvedReadiness = checkFinalBuildReadiness(
    { level: level17, contract: CONTRACT, regionGraph: level17RegionGraph, state: level17TraceReplay.finalState },
    {},
  );
  assert.equal(solvedReadiness.ready, true, 'level 17 trace final state passes final-build readiness');

  const transferPlan = planRegionTransfers(
    { level: level17, contract: CONTRACT, regionGraph: level17RegionGraph, state: level17Initial },
    initialReadiness,
  );
  assert.ok(transferPlan.goals.length > 0, 'level 17 transfer plan produces goals');
  assert.equal(
    transferPlan.goals[0].type,
    'stage_blocks_before_final_climb',
    'level 17 transfer plan stages before final climb',
  );
  assert.ok(transferPlan.goals[0].blocksToMove > 0, 'level 17 transfer plan moves blocks');

  const endgameResult = solveEndgameLogisticsLevel(level17, CONTRACT, { maxStates: 1000000 });
  assert.equal(endgameResult.status, 'SOLVED', 'level 17 endgame logistics solver status');
  assert.equal(endgameResult.usedTraceInput, false, 'level 17 endgame logistics solver does not use trace input');
  assert.equal(
    endgameResult.replacedBadBehavior,
    logisticsExpectation.replacedBadBehavior,
    'level 17 solver names replaced bad behavior',
  );
  assert.equal(
    replayActions(level17, endgameResult.actions).status,
    'completed',
    'level 17 endgame logistics actions replay',
  );

  for (const budget of EXPECTATIONS.budgets) {
    const level = levelById(budget.levelId);
    const report = solveLevel(level, CONTRACT, { maxStates: budget.maxStates });
    assert.equal(STATUS_VOCABULARY.has(report.status), true, `level ${level.id}: status vocabulary`);
    assert.equal(report.status, budget.expectedStatus, `level ${level.id}: status`);
    assert.ok(report.statesExpanded <= budget.maxStates, `level ${level.id}: max states`);
    assert.ok(report.timeMs <= budget.maxTimeMs, `level ${level.id}: max time`);
    if (budget.maxActions) {
      assert.ok(report.actions.length <= budget.maxActions, `level ${level.id}: max actions`);
    }
    if (budget.requiresConstructionLedger) {
      assert.ok(
        report.macroPlan.steps.some(step => step.macroId.startsWith('construction-ledger-search-')),
        `level ${level.id}: construction-ledger macro step`,
      );
    }
    if (budget.requiresMacroPlan) {
      assert.ok(report.macroPlan.steps.length > 0, `level ${level.id}: accepted macro steps`);
      assert.deepEqual(
        report.macroPlan.steps.flatMap(step => step.rawActions),
        report.actions,
        `level ${level.id}: macro raw actions flatten to report actions`,
      );
    }
    if (budget.requiresRegionLogistics) {
      assert.ok(
        report.macroPlan.steps.some(step => step.macroId.startsWith('region-logistics-')),
        `level ${level.id}: region-logistics macro step`,
      );
      assert.equal(
        report.replacedBadBehavior,
        logisticsExpectation.replacedBadBehavior,
        `level ${level.id}: replaced bad behavior`,
      );
    }
    assert.notEqual(report.summary.solutionLength, undefined, `level ${level.id}: solution length`);
    assert.notEqual(report.summary.maxQueueSize, undefined, `level ${level.id}: max queue`);
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
  assert.ok(level13.macroPlan.steps.length > 0, 'current level 13 returns accepted macro steps');
  assert.deepEqual(
    level13.macroPlan.steps.flatMap(step => step.rawActions),
    level13.actions,
    'current level 13 macro actions flatten to final actions',
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
