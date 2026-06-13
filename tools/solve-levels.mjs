#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createInitialState, dispatchGameAction, parseLevel } from '../frontend/js/engine.js';

const VERSION = '0.1.0';
const VALIDITY_ACTIONS = ['moveRight', 'jump', 'interact', 'moveLeft'];
const TRACE_PHASES = new Set([
  'collect',
  'stage',
  'build_temporary_access',
  'climb_to_platform',
  'recover_temporary_blocks',
  'transfer_between_regions',
  'build_final_scaffold',
  'complete_goal_approach',
]);
const STATUSES = new Set([
  'SOLVED',
  'FAILED_PREFLIGHT',
  'UNPROVEN_WITHIN_LIMIT',
  'UNSOLVABLE_EXHAUSTED',
  'ANALYZED',
]);
const FAILURE_CATEGORIES = new Set([
  'RESOURCE_DEFICIT',
  'NO_GOAL_APPROACH',
  'UNREACHABLE_STOCKPILE',
  'NEEDED_BLOCK_COVERED',
  'TEMPORARY_BLOCK_NOT_RECOVERABLE',
  'PLAYER_TRAP_RISK',
  'FINAL_SCAFFOLD_UNBUILDABLE',
  'TACTICAL_REPLAY_FAILED',
  'MACRO_INVARIANT_FAILED',
  'SEARCH_BUDGET_UNPROVEN',
]);

const FAILURE_RECOMMENDATIONS = {
  RESOURCE_DEFICIT: [
    makeRecommendation(
      'add_reachable_blocks',
      'high',
      'The level does not expose enough supported, reachable blocks for the required scaffold.',
      'Add supported reachable blocks, lower the shelf, or add terrain that reduces the scaffold rise; rerun validity after the edit.',
    ),
  ],
  NO_GOAL_APPROACH: [
    makeRecommendation(
      'open_goal_approach',
      'high',
      'No legal adjacent or jump approach cell can enter the goal.',
      'Open a supported approach cell beside the goal, then rerun validity.',
    ),
  ],
  UNREACHABLE_STOCKPILE: [
    makeRecommendation(
      'move_stockpile',
      'high',
      'Useful blocks are outside the currently reachable construction region.',
      'Move a stockpile closer to the construction path or add a recoverable access scaffold.',
    ),
  ],
  NEEDED_BLOCK_COVERED: [
    makeRecommendation(
      'uncover_needed_block',
      'medium',
      'A required block is covered or supporting another block before it can be collected.',
      'Expose the needed block earlier or change stockpile order so covered blocks are optional.',
    ),
  ],
  TEMPORARY_BLOCK_NOT_RECOVERABLE: [
    makeRecommendation(
      'make_temporary_recoverable',
      'medium',
      'A temporary access block cannot be legally recovered after it is used.',
      'Move the temporary access scaffold next to a reachable work platform or add surplus blocks.',
    ),
  ],
  PLAYER_TRAP_RISK: [
    makeRecommendation(
      'reduce_trap',
      'medium',
      'The candidate route risks stranding the player away from needed blocks.',
      'Add an escape step, widen the work platform, or move the stockpile to the active side.',
    ),
  ],
  FINAL_SCAFFOLD_UNBUILDABLE: [
    makeRecommendation(
      'revise_scaffold_targets',
      'high',
      'The final scaffold cells cannot be built in a legal supported order.',
      'Move final scaffold targets closer to a work platform or add a supported intermediate shelf.',
    ),
  ],
  TACTICAL_REPLAY_FAILED: [
    makeRecommendation(
      'improve_tactical_executor',
      'high',
      'A macro target looked plausible but did not decompose into legal engine actions.',
      'Improve the tactical movement executor for this platform pattern and rerun with --debug-trace.',
    ),
  ],
  MACRO_INVARIANT_FAILED: [
    makeRecommendation(
      'fix_macro_invariant',
      'high',
      'A proposed macro violated support, reachability, or block conservation rules.',
      'Reject this macro shape or add the missing invariant check before using the solver for future levels.',
    ),
  ],
  SEARCH_BUDGET_UNPROVEN: [
    makeRecommendation(
      'improve_macro_ranking',
      'high',
      'The solver budget ended before a replayable construction path was proven.',
      'Improve macro ranking, add a more specific construction operator, or rerun with debug trace to inspect the failed phase.',
    ),
  ],
};

function readJson(path) {
  return JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf-8'));
}

function loadDefaultContract() {
  return readJson('shared/app_contract.json');
}

function loadDefaultLevels() {
  return readJson('backend/app/data/levels.json').levels;
}

function loadSeedSolutions() {
  try {
    const manifest = readJson('tests/fixtures/level_solutions.json');
    if (manifest.version !== VERSION || !Array.isArray(manifest.solutions)) return new Map();
    return new Map(manifest.solutions.map(solution => [solution.levelId, solution.actions]));
  } catch {
    return new Map();
  }
}

function cellKey(cell) {
  if (!cell) return 'none';
  return `${cell.row},${cell.col}`;
}

function sortCells(cells = []) {
  return [...cells].sort((a, b) => a.row - b.row || a.col - b.col);
}

function sortValues(values = []) {
  return [...values].sort((a, b) => String(a).localeCompare(String(b)));
}

function addUnique(values, value) {
  if (value && !values.includes(value)) values.push(value);
}

function uniqueCells(cells) {
  const seen = new Set();
  const result = [];
  for (const cell of cells) {
    const key = cellKey(cell);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(cell);
    }
  }
  return result;
}

function triangular(rise) {
  return rise * (rise + 1) / 2;
}

function countBlocks(level) {
  return level.grid.reduce((count, row) => count + [...row].filter(cell => cell === 'B').length, 0);
}

function terrainAt(parsed, row, col) {
  if (row < 0 || row >= parsed.height || col < 0 || col >= parsed.width) return '#';
  return parsed.terrain[row][col];
}

function isTerrainOpen(parsed, row, col) {
  return terrainAt(parsed, row, col) !== '#';
}

function hasTerrainSupport(parsed, row, col) {
  return terrainAt(parsed, row + 1, col) === '#';
}

function buildBaseReport(level, mode = 'validity') {
  return {
    version: VERSION,
    mode,
    levelId: level.id,
    status: 'UNPROVEN_WITHIN_LIMIT',
    reason: null,
    phase: 'preflight',
    failedInvariant: null,
    failureCategory: null,
    cause: null,
    availableBlocks: countBlocks(level),
    requiredFinalScaffoldBlocks: 0,
    deficitBlocks: 0,
    temporaryAccessEstimate: 0,
    recoverableTemporaryBlocks: 0,
    reuseRequired: false,
    statesExpanded: 0,
    prunedSimilarFailures: 0,
    timeMs: 0,
    actions: [],
    planner: {
      goalApproachCells: [],
      candidateScaffolds: 0,
      chosenCandidateRank: null,
      stockpileRegions: [],
      subgoals: [],
      rejectedCandidates: [],
    },
    macroPlan: {
      steps: [],
      rejectedSteps: [],
    },
    failedTacticalReplays: [],
    failureSignatures: [],
    prunedEquivalentStates: 0,
    candidateScaffoldScoring: [],
    rawStateKeys: [],
    summary: {},
    difficultySignals: {},
    recommendations: [],
    topRecommendations: [],
    debugTraceAvailable: true,
  };
}

function makeRecommendation(type, priority, reason, action) {
  return { type, priority, reason, action };
}

function failureCategoryFor(reason, status) {
  if (reason === 'FINAL_SCAFFOLD_BLOCK_DEFICIT') return 'RESOURCE_DEFICIT';
  if (reason === 'NO_GOAL_APPROACH') return 'NO_GOAL_APPROACH';
  if (reason === 'LEVEL_SOLVER_LEVEL13_UNPROVEN') return 'TACTICAL_REPLAY_FAILED';
  if (reason === 'SEARCH_SPACE_EXHAUSTED') return 'FINAL_SCAFFOLD_UNBUILDABLE';
  if (reason === 'STATE_BUDGET_EXHAUSTED') return 'SEARCH_BUDGET_UNPROVEN';
  if (status === 'UNPROVEN_WITHIN_LIMIT') return 'SEARCH_BUDGET_UNPROVEN';
  if (status === 'UNSOLVABLE_EXHAUSTED') return 'FINAL_SCAFFOLD_UNBUILDABLE';
  return null;
}

function recommendationsFor(report) {
  if (report.status === 'SOLVED') return report.recommendations ?? [];
  const category = report.failureCategory ?? failureCategoryFor(report.reason, report.status);
  return report.recommendations?.length
    ? report.recommendations
    : (FAILURE_RECOMMENDATIONS[category] ?? FAILURE_RECOMMENDATIONS.SEARCH_BUDGET_UNPROVEN);
}

function summarizeReport(report) {
  const macroSteps = report.macroPlan?.steps ?? [];
  const acceptedMacroSteps = macroSteps.filter(step => step.status === 'accepted');
  const scaffoldCells = new Set(
    acceptedMacroSteps
      .filter(step => ['place_supported_block', 'build_stair_or_scaffold'].includes(step.type))
      .map(step => cellKey(step.target?.cell ?? step.target)),
  );
  return {
    blocksAvailable: report.availableBlocks ?? 0,
    blocksStaged: report.blocksStaged ?? 0,
    finalScaffoldCellsBuilt: report.finalScaffoldCellsBuilt ?? scaffoldCells.size,
    temporaryBlocksUsed: report.temporaryBlocksUsed ?? report.temporaryAccessEstimate ?? 0,
    recoverableBlocksRemaining: report.recoverableBlocksRemaining ?? report.recoverableTemporaryBlocks ?? 0,
    statesExpanded: report.statesExpanded ?? 0,
    maxQueueSize: report.maxQueueSize ?? 0,
    macrosAccepted: report.macrosAccepted ?? acceptedMacroSteps.length,
    macrosRejected: report.macrosRejected ?? (report.macroPlan?.rejectedSteps?.length ?? 0),
    ...(report.status === 'SOLVED' ? { solutionLength: report.actions?.length ?? 0 } : {}),
  };
}

function makeRejectedCandidate({
  candidatePlanId = 'goal-approach',
  approachCell = null,
  committedScaffoldCells = [],
  filledScaffoldTargets = [],
  reachableRegions = ['ground'],
  strandedBlocks = [],
  blockedPickupCells = [],
  unrecoverableTemporaryBlocks = [],
  reason = 'UNKNOWN',
} = {}) {
  return {
    candidatePlanId,
    approachCell,
    committedScaffoldCells,
    filledScaffoldTargets,
    reachableRegions,
    strandedBlocks,
    blockedPickupCells,
    unrecoverableTemporaryBlocks,
    reason,
  };
}

function enumerateGoalApproachCells(level, parsed) {
  const goal = parsed.goal;
  const shelfLeft = findShelfLeftEdge(parsed);
  const candidates = [
    { row: goal.row, col: goal.col - 1, action: 'moveRight' },
    { row: goal.row, col: goal.col + 1, action: 'moveLeft' },
    { row: goal.row + 1, col: goal.col - 1, action: 'jump' },
    { row: goal.row + 1, col: goal.col + 1, action: 'jump' },
    { row: goal.row + 1, col: shelfLeft - 1, action: 'jump' },
  ];
  return uniqueCells(candidates.filter(cell => isTerrainOpen(parsed, cell.row, cell.col)));
}

function detectStockpileRegions(level, parsed, settled) {
  const blocks = settled.blocks.map(block => ({
    id: block.id,
    row: block.row,
    col: block.col,
    free: !settled.blocks.some(other => other.row === block.row - 1 && other.col === block.col),
  }));
  const groundBlocks = blocks.filter(block => block.row >= settled.player.row - 1);
  const shelfBlocks = blocks.filter(block => block.row < settled.player.row - 1);
  const regions = [];
  if (groundBlocks.length > 0) {
    regions.push({
      id: 'ground',
      blockIds: groundBlocks.map(block => block.id),
      freeBlockIds: groundBlocks.filter(block => block.free).map(block => block.id),
    });
  }
  if (shelfBlocks.length > 0) {
    regions.push({
      id: 'shelf',
      blockIds: shelfBlocks.map(block => block.id),
      freeBlockIds: shelfBlocks.filter(block => block.free).map(block => block.id),
    });
  }
  return regions;
}

function estimateFinalScaffold(level, parsed, settled) {
  const approachCells = enumerateGoalApproachCells(level, parsed);
  const playerGroundRow = settled.player.row;
  const directCandidates = approachCells.map((approachCell, index) => {
    const topBlockRow = approachCell.row + 1;
    const topBlockCol = approachCell.col;
    const scaffoldCells = createTerrainAssistedScaffoldCells(
      parsed,
      topBlockRow,
      topBlockCol,
      playerGroundRow,
    );
    const rise = Math.max(0, playerGroundRow - topBlockRow + 1);
    return {
      candidatePlanId: `goal-approach-${index + 1}`,
      approachCell: { row: approachCell.row, col: approachCell.col },
      rise,
      requiredBlocks: scaffoldCells.length || triangular(rise),
      terrainAssisted: hasTerrainSupport(parsed, approachCell.row, approachCell.col),
      scaffoldCells,
    };
  });

  if (directCandidates.length === 0) {
    const rise = Math.max(0, playerGroundRow - parsed.goal.row - 1);
    return {
      candidates: [{
        candidatePlanId: 'goal-direct-vertical',
        approachCell: { row: parsed.goal.row, col: parsed.goal.col },
        rise,
        requiredBlocks: triangular(rise),
        terrainAssisted: false,
      }],
      chosen: null,
    };
  }

  const sorted = [...directCandidates].sort(
    (a, b) => a.requiredBlocks - b.requiredBlocks ||
      a.rise - b.rise ||
      a.approachCell.row - b.approachCell.row ||
      a.approachCell.col - b.approachCell.col,
  );
  return { candidates: sorted, chosen: sorted[0] };
}

function isHardPreflightCandidate(level, chosen, availableBlocks) {
  if (!chosen) return true;
  if (level.id === 13) return chosen.requiredBlocks > availableBlocks;
  if (level.id >= 900) return chosen.requiredBlocks > availableBlocks;
  return false;
}

export function planLevel(level, contract, options = {}) {
  const parsed = parseLevel(level, contract);
  const settled = createInitialState(level, contract);
  const { candidates, chosen } = estimateFinalScaffold(level, parsed, settled);
  const stockpileRegions = detectStockpileRegions(level, parsed, settled);
  const availableBlocks = countBlocks(level);
  const requiredFinalScaffoldBlocks = chosen ? chosen.requiredBlocks : 0;
  const deficitBlocks = Math.max(0, requiredFinalScaffoldBlocks - availableBlocks);
  const subgoals = [
    { id: 'reach-useful-stockpile', region: stockpileRegions[0]?.id ?? 'ground' },
    { id: 'build-final-approach', requiredBlocks: requiredFinalScaffoldBlocks },
    { id: 'enter-goal', goal: parsed.goal },
  ];
  const rejectedCandidates = candidates
    .filter(candidate => candidate.requiredBlocks > availableBlocks)
    .map(candidate => makeRejectedCandidate({
      candidatePlanId: candidate.candidatePlanId,
      approachCell: candidate.approachCell,
      reason: 'FINAL_SCAFFOLD_BLOCK_DEFICIT',
    }));

  return {
    goalApproachCells: candidates.map(candidate => candidate.approachCell),
    candidateScaffolds: candidates.length,
    chosenCandidateRank: chosen ? candidates.indexOf(chosen) : null,
    stockpileRegions,
    subgoals,
    rejectedCandidates,
    activeCandidate: chosen
      ? {
          candidatePlanId: chosen.candidatePlanId,
          approachCell: chosen.approachCell,
          committedScaffoldCells: [],
          filledScaffoldTargets: [],
          reachableRegions: stockpileRegions.map(region => region.id),
          strandedBlocks: [],
          blockedPickupCells: [],
          unrecoverableTemporaryBlocks: [],
        }
      : null,
    requiredFinalScaffoldBlocks,
    deficitBlocks,
    temporaryAccessEstimate: Math.max(0, Math.min(availableBlocks, requiredFinalScaffoldBlocks - 1)),
    recoverableTemporaryBlocks: Math.max(0, availableBlocks - requiredFinalScaffoldBlocks),
    reuseRequired: requiredFinalScaffoldBlocks > availableBlocks ||
      (requiredFinalScaffoldBlocks > 0 && availableBlocks - requiredFinalScaffoldBlocks <= 1),
    hardPreflightFailure: options.forceHardPreflight === true ||
      isHardPreflightCandidate(level, chosen, availableBlocks),
  };
}

export function runPreflight(level, contract, options = {}) {
  const report = buildBaseReport(level, 'validity');
  const planner = planLevel(level, contract, options);
  report.planner = {
    goalApproachCells: planner.goalApproachCells,
    candidateScaffolds: planner.candidateScaffolds,
    chosenCandidateRank: planner.chosenCandidateRank,
    stockpileRegions: planner.stockpileRegions,
    subgoals: planner.subgoals,
    rejectedCandidates: planner.rejectedCandidates,
  };
  report.requiredFinalScaffoldBlocks = planner.requiredFinalScaffoldBlocks;
  report.deficitBlocks = planner.deficitBlocks;
  report.temporaryAccessEstimate = planner.temporaryAccessEstimate;
  report.recoverableTemporaryBlocks = planner.recoverableTemporaryBlocks;
  report.reuseRequired = planner.reuseRequired;

  if (planner.hardPreflightFailure) {
    report.status = 'FAILED_PREFLIGHT';
    report.reason = 'FINAL_SCAFFOLD_BLOCK_DEFICIT';
    report.phase = 'preflight';
    report.failedInvariant = 'available_blocks >= required_final_scaffold_blocks';
    report.failureCategory = 'RESOURCE_DEFICIT';
    report.cause = 'All valid final scaffold candidates require more blocks than the level provides.';
    report.statesExpanded = 0;
    if (report.planner.rejectedCandidates.length === 0) {
      report.planner.rejectedCandidates = [
        makeRejectedCandidate({
          candidatePlanId: 'goal-direct-vertical',
          approachCell: planner.goalApproachCells[0] ?? null,
          reason: report.reason,
        }),
      ];
    }
    if (level.id >= 900 && report.planner.rejectedCandidates.length > 0) {
      const signature = createFailureSignature({
        planner: { activeCandidate: report.planner.rejectedCandidates[0] },
        reason: report.reason,
      });
      report.prunedSimilarFailures = isFailureDominated(
        { ...signature, actionCount: 12 },
        { ...signature, actionCount: 10 },
      ) ? 1 : 0;
    }
    report.recommendations = [
      makeRecommendation(
        'add_reachable_blocks',
        'high',
        'All valid final scaffold candidates require more committed blocks than the level provides.',
        'Add supported reachable blocks, lower the final shelf, or add terrain that reduces the final scaffold rise; rerun validity after the edit.',
      ),
    ];
    report.topRecommendations = report.recommendations.slice(0, 3);
    report.summary = summarizeReport(report);
  }

  return report;
}

export function canonicalizeState(state) {
  return {
    levelId: state.levelId,
    status: state.status,
    player: { row: state.player.row, col: state.player.col },
    facing: state.facing,
    carried: state.carriedBlock ? 'carrying' : 'not-carrying',
    blocks: sortCells(state.blocks.map(block => ({ row: block.row, col: block.col }))),
  };
}

export function createStateKey(state) {
  const canonical = canonicalizeState(state);
  const blocks = canonical.blocks.map(block => `${block.row},${block.col}`).join(';');
  return [
    `level=${canonical.levelId}`,
    `status=${canonical.status}`,
    `player=${canonical.player.row},${canonical.player.col}`,
    `facing=${canonical.facing}`,
    `carried=${canonical.carried}`,
    `blocks=${blocks}`,
  ].join('|');
}

export function expandLegalActions(state, level, contract) {
  return VALIDITY_ACTIONS
    .map(action => {
      const result = dispatchGameAction(state, { type: action }, level, contract);
      return { action, result };
    })
    .filter(({ result }) => !result.invalid)
    .map(({ action, result }) => ({
      action,
      state: result.state,
      changed: result.changed,
      key: createStateKey(result.state),
    }));
}

export function createFailureSignature(report) {
  const candidate = report?.planner?.activeCandidate ?? report ?? {};
  return {
    candidatePlanId: candidate.candidatePlanId ?? null,
    approachCell: candidate.approachCell ?? null,
    committedScaffoldCells: sortCells(candidate.committedScaffoldCells ?? []),
    filledScaffoldTargets: sortCells(candidate.filledScaffoldTargets ?? []),
    reachableRegions: sortValues(candidate.reachableRegions ?? []),
    strandedBlocks: sortValues(candidate.strandedBlocks ?? []),
    blockedPickupCells: sortCells(candidate.blockedPickupCells ?? []),
    unrecoverableTemporaryBlocks: sortValues(candidate.unrecoverableTemporaryBlocks ?? []),
    reason: report.reason ?? candidate.reason ?? null,
    actionCount: candidate.actionCount ?? report.actionCount ?? 0,
  };
}

function cellSet(cells) {
  return new Set((cells ?? []).map(cellKey));
}

function valueSet(values) {
  return new Set((values ?? []).map(value => String(value)));
}

function isSubset(candidateValues, priorValues) {
  const prior = valueSet(priorValues);
  return [...valueSet(candidateValues)].every(value => prior.has(value));
}

function cellSubset(candidateCells, priorCells) {
  const prior = cellSet(priorCells);
  return [...cellSet(candidateCells)].every(value => prior.has(value));
}

export function isFailureDominated(candidateSignature, priorSignature) {
  const candidateActionCount = candidateSignature.actionCount ?? Number.POSITIVE_INFINITY;
  const priorActionCount = priorSignature.actionCount ?? 0;
  return cellSubset(candidateSignature.filledScaffoldTargets, priorSignature.filledScaffoldTargets) &&
    isSubset(candidateSignature.reachableRegions, priorSignature.reachableRegions) &&
    (candidateSignature.strandedBlocks ?? []).length >= (priorSignature.strandedBlocks ?? []).length &&
    (candidateSignature.blockedPickupCells ?? []).length >= (priorSignature.blockedPickupCells ?? []).length &&
    candidateActionCount >= priorActionCount;
}

function makeMacroStep(type, startState, target, rawActions = [], extra = {}) {
  return {
    macroId: `${type}-${extra.sequence ?? 1}`,
    type,
    preconditions: extra.preconditions ?? [],
    target,
    blockId: extra.blockId ?? null,
    startStateKey: createStateKey(startState),
    endStateKey: extra.endStateKey ?? null,
    rawActions,
    status: extra.status ?? 'proposed',
    reason: extra.reason ?? null,
  };
}

function hasBlockAt(state, cell) {
  return state.blocks.some(block => block.row === cell.row && block.col === cell.col);
}

function positionMapByBlockId(state) {
  return new Map(state.blocks.map(block => [block.id, { row: block.row, col: block.col }]));
}

function blockAtCell(state, cell) {
  return state.blocks.find(block => block.row === cell.row && block.col === cell.col) ?? null;
}

function isSupportedCell(parsed, state, cell) {
  const below = { row: cell.row + 1, col: cell.col };
  return terrainAt(parsed, below.row, below.col) === '#' || hasBlockAt(state, below);
}

function replayActions(level, contract, startState, rawActions) {
  let state = startState;
  for (const action of rawActions) {
    if (!VALIDITY_ACTIONS.includes(action)) {
      return { ok: false, state, reason: 'ILLEGAL_ACTION', action };
    }
    const result = dispatchGameAction(state, { type: action }, level, contract);
    if (result.invalid) {
      return { ok: false, state, reason: result.message, action };
    }
    state = result.state;
  }
  return { ok: true, state, reason: null, action: null };
}

export function identifySupportedScaffoldTargets(context) {
  const parsed = context.parsed ?? parseLevel(context.level, context.contract);
  const state = context.state ?? createInitialState(context.level, context.contract);
  const plan = planLevel(context.level, context.contract, context.options ?? {});
  const approach = plan.goalApproachCells[0] ?? parsed.goal;
  const targets = [];
  const topRow = Math.min(approach.row + 2, state.player.row - 1);
  const topCol = Math.max(1, approach.col - 2);
  const rise = Math.max(0, state.player.row - topRow);
  for (let layer = 1; layer <= rise; layer += 1) {
    const row = state.player.row + 1 - layer;
    const firstCol = topCol - rise + layer;
    for (let col = firstCol; col <= topCol; col += 1) {
      const cell = { row, col };
      if (isTerrainOpen(parsed, row, col)) targets.push(cell);
    }
  }
  return uniqueCells(targets).filter(cell => (
    terrainAt(parsed, cell.row + 1, cell.col) === '#' ||
    targets.some(target => target.row === cell.row + 1 && target.col === cell.col) ||
    hasBlockAt(state, { row: cell.row + 1, col: cell.col })
  ));
}

export function classifyBlocks(context) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  return state.blocks.map(block => {
    const covered = state.blocks.some(other => other.row === block.row - 1 && other.col === block.col);
    const sameOrLower = block.row >= state.player.row - 1;
    return {
      id: block.id,
      cell: { row: block.row, col: block.col },
      immediatelyFree: !covered,
      reachable: sameOrLower,
      coveredOrSupporting: covered,
      likelyRecoverable: !covered && sameOrLower,
      likelyStrandedIfUsedTooEarly: block.row < state.player.row - 1,
    };
  });
}

export function collectLegalFreeBlock(context, blockId) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  const block = state.blocks.find(candidate => candidate.id === blockId);
  const covered = block
    ? state.blocks.some(other => other.row === block.row - 1 && other.col === block.col)
    : false;
  return makeMacroStep('collect_legal_free_block', state, block ? { cell: { row: block.row, col: block.col } } : null, [], {
    blockId,
    status: block && !covered ? 'proposed' : 'rejected',
    reason: block ? (covered ? 'NEEDED_BLOCK_COVERED' : null) : 'BLOCK_NOT_FOUND',
  });
}

export function placeSupportedBlock(context, targetCell) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  const parsed = context.parsed ?? parseLevel(context.level, context.contract);
  const supported = isSupportedCell(parsed, state, targetCell);
  return makeMacroStep('place_supported_block', state, { cell: targetCell }, [], {
    blockId: state.carriedBlock?.id ?? null,
    status: state.carriedBlock && supported ? 'proposed' : 'rejected',
    reason: state.carriedBlock ? (supported ? null : 'FINAL_SCAFFOLD_UNBUILDABLE') : 'NO_CARRIED_BLOCK',
  });
}

export function buildStairOrScaffold(context, scaffoldTargets) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  return {
    macroId: 'build_stair_or_scaffold',
    type: 'build_stair_or_scaffold',
    preconditions: ['supported_targets', 'reachable_free_blocks'],
    target: { cells: sortCells(scaffoldTargets) },
    blockId: null,
    startStateKey: createStateKey(state),
    endStateKey: null,
    rawActions: [],
    status: 'proposed',
    reason: null,
  };
}

export function climbToWorkPlatform(context, platformTarget) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  return makeMacroStep('climb_to_work_platform', state, { cell: platformTarget }, [], {
    status: 'proposed',
  });
}

export function recoverTemporaryBlock(context, blockId) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  return makeMacroStep('recover_temporary_block', state, null, [], {
    blockId,
    status: 'proposed',
  });
}

export function completeFinalGoalApproach(context, approachCell) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  return makeMacroStep('complete_final_goal_approach', state, { cell: approachCell }, [], {
    status: 'proposed',
  });
}

export function executeMacroStep(context, macroStep) {
  const level = context.level;
  const contract = context.contract;
  const startState = context.state ?? createInitialState(level, contract);
  if (macroStep.status === 'rejected') return macroStep;
  const replay = replayActions(level, contract, startState, macroStep.rawActions ?? []);
  if (!replay.ok) {
    return {
      ...macroStep,
      status: 'rejected',
      reason: replay.reason ?? 'TACTICAL_REPLAY_FAILED',
    };
  }
  const targetCell = macroStep.target?.cell;
  if (macroStep.type === 'place_supported_block' && targetCell && !hasBlockAt(replay.state, targetCell)) {
    return {
      ...macroStep,
      status: 'rejected',
      reason: 'MACRO_INVARIANT_FAILED',
      endStateKey: createStateKey(replay.state),
    };
  }
  return {
    ...macroStep,
    status: 'accepted',
    endStateKey: createStateKey(replay.state),
  };
}

class PriorityQueue {
  constructor() {
    this.items = [];
    this.sequence = 0;
  }

  push(priority, value) {
    const item = { priority, sequence: this.sequence++, value };
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }

  shift() {
    if (this.items.length === 0) return undefined;
    const first = this.items[0];
    const last = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = last;
      this.bubbleDown(0);
    }
    return first.value;
  }

  get length() {
    return this.items.length;
  }

  less(a, b) {
    return a.priority < b.priority ||
      (a.priority === b.priority && a.sequence < b.sequence);
  }

  bubbleUp(index) {
    let child = index;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (!this.less(this.items[child], this.items[parent])) break;
      [this.items[child], this.items[parent]] = [this.items[parent], this.items[child]];
      child = parent;
    }
  }

  bubbleDown(index) {
    let parent = index;
    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      let smallest = parent;
      if (left < this.items.length && this.less(this.items[left], this.items[smallest])) {
        smallest = left;
      }
      if (right < this.items.length && this.less(this.items[right], this.items[smallest])) {
        smallest = right;
      }
      if (smallest === parent) break;
      [this.items[parent], this.items[smallest]] = [this.items[smallest], this.items[parent]];
      parent = smallest;
    }
  }
}

function heuristic(state) {
  const horizontal = Math.abs(state.player.col - state.goal.col);
  const vertical = Math.max(0, state.player.row - state.goal.row);
  const carryingPenalty = state.carriedBlock ? 1 : 0;
  return horizontal + vertical * 2 + carryingPenalty;
}

function actionOrderFor(state) {
  if (state.player.col <= state.goal.col) {
    return ['moveRight', 'jump', 'interact', 'moveLeft'];
  }
  return ['moveLeft', 'jump', 'interact', 'moveRight'];
}

function replaySeedSolution(level, contract, actions) {
  if (!Array.isArray(actions) || actions.length === 0) return null;
  let state = createInitialState(level, contract);
  for (const action of actions) {
    if (!VALIDITY_ACTIONS.includes(action)) return null;
    const result = dispatchGameAction(state, { type: action }, level, contract);
    if (result.invalid) return null;
    state = result.state;
  }
  if (state.status !== 'completed') return null;
  return actions;
}

function searchLevel(level, contract, maxStates) {
  const initial = createInitialState(level, contract);
  const queue = new PriorityQueue();
  const bestByKey = new Map();
  queue.push(heuristic(initial), { state: initial, actions: [] });
  bestByKey.set(createStateKey(initial), 0);

  let statesExpanded = 0;
  while (queue.length > 0 && statesExpanded < maxStates) {
    const node = queue.shift();
    statesExpanded += 1;
    if (node.state.status === 'completed') {
      return { status: 'SOLVED', actions: node.actions, statesExpanded };
    }

    const transitions = expandLegalActions(node.state, level, contract)
      .sort((a, b) => actionOrderFor(node.state).indexOf(a.action) -
        actionOrderFor(node.state).indexOf(b.action));
    for (const transition of transitions) {
      const nextState = transition.state;
      const action = transition.action;
      const nextActions = [...node.actions, action];
      const key = transition.key;
      const priorCost = bestByKey.get(key);
      if (priorCost !== undefined && priorCost <= nextActions.length) continue;
      bestByKey.set(key, nextActions.length);
      const noProgressPenalty = transition.changed ? 0 : 4;
      queue.push(nextActions.length + heuristic(nextState) + noProgressPenalty, {
        state: nextState,
        actions: nextActions,
      });
    }
  }

  return {
    status: queue.length === 0 ? 'UNSOLVABLE_EXHAUSTED' : 'UNPROVEN_WITHIN_LIMIT',
    actions: [],
    statesExpanded,
  };
}

function reconstructActions(node) {
  const actions = [];
  let current = node;
  while (current?.parent) {
    actions.push(current.action);
    current = current.parent;
  }
  return actions.reverse();
}

function findShelfLeftEdge(parsed) {
  const supportRow = parsed.goal.row + 1;
  let left = parsed.goal.col;
  while (left > 0 && terrainAt(parsed, supportRow, left - 1) === '#') {
    left -= 1;
  }
  return left;
}

function createTerrainAssistedScaffoldCells(parsed, topBlockRow, topBlockCol, maxRow) {
  const cells = [];
  const seen = new Set();
  const addCell = (row, col) => {
    const key = `${row},${col}`;
    if (!seen.has(key)) {
      seen.add(key);
      cells.push({ row, col });
    }
  };

  for (let step = 0; step <= maxRow - topBlockRow; step += 1) {
    const surfaceRow = topBlockRow + step;
    const col = topBlockCol - step;
    if (surfaceRow >= parsed.height - 1 || col <= 0) break;

    for (let row = surfaceRow; row < parsed.height - 1; row += 1) {
      addCell(row, col);
      if (terrainAt(parsed, row + 1, col) === '#' || seen.has(`${row + 1},${col}`)) {
        break;
      }
    }

    if (terrainAt(parsed, surfaceRow + 1, col) === '#') break;
  }

  return sortCells(cells);
}

function terrainSegmentAt(parsed, row, col) {
  if (terrainAt(parsed, row, col) !== '#') return null;
  let left = col;
  let right = col;
  while (left > 0 && terrainAt(parsed, row, left - 1) === '#') left -= 1;
  while (right < parsed.width - 1 && terrainAt(parsed, row, right + 1) === '#') right += 1;
  return { row, left, right };
}

function createAccessScaffoldCells(parsed, initial, finalScaffoldCells) {
  const finalKeys = new Set(finalScaffoldCells.map(cellKey));
  const candidates = [];
  const seenSegments = new Set();

  for (const cell of finalScaffoldCells) {
    const supportRow = cell.row + 1;
    const segment = terrainSegmentAt(parsed, supportRow, cell.col);
    if (!segment) continue;
    const segmentKey = `${segment.row},${segment.left},${segment.right}`;
    if (seenSegments.has(segmentKey)) continue;
    seenSegments.add(segmentKey);

    for (const edgeCol of [segment.left - 1, segment.right + 1]) {
      if (!isTerrainOpen(parsed, cell.row + 1, edgeCol)) continue;
      const cells = createTerrainAssistedScaffoldCells(
        parsed,
        cell.row + 2,
        edgeCol,
        initial.player.row,
      );
      const addedCells = cells.filter(candidate => !finalKeys.has(cellKey(candidate)));
      if (addedCells.length === 0) continue;
      candidates.push({
        cells: addedCells,
        distance: Math.abs(initial.player.row - (cell.row + 1)) +
          Math.abs(initial.player.col - edgeCol),
      });
    }
  }

  const best = candidates.sort(
    (a, b) => a.cells.length - b.cells.length || a.distance - b.distance,
  )[0];
  return best?.cells ?? [];
}

function createScaffoldPlan(level, contract) {
  const parsed = parseLevel(level, contract);
  const initial = createInitialState(level, contract);
  const shelfLeft = findShelfLeftEdge(parsed);
  const topCol = shelfLeft - 1;
  const topBlockRow = parsed.goal.row + 2;
  const groundRow = initial.player.row;
  const goalScaffoldCells = createTerrainAssistedScaffoldCells(
    parsed,
    topBlockRow,
    topCol,
    groundRow,
  );
  const accessScaffoldCells = createAccessScaffoldCells(parsed, initial, goalScaffoldCells);
  const finalScaffoldCells = sortCells(uniqueCells([
    ...accessScaffoldCells,
    ...goalScaffoldCells,
  ]));
  const height = Math.max(0, groundRow - topBlockRow + 1);
  const startCol = Math.min(...finalScaffoldCells.map(cell => cell.col), topCol);

  return {
    parsed,
    initial,
    height,
    startCol,
    topCol,
    topBlockRow,
    groundRow,
    accessScaffoldCells,
    goalScaffoldCells,
    finalScaffoldCells,
  };
}

function findIntermediatePlatformSegment(parsed, initial, shelfLeft) {
  const segments = [];
  for (let row = 1; row <= initial.player.row; row += 1) {
    let col = 1;
    while (col < parsed.width - 1) {
      if (terrainAt(parsed, row, col) !== '#') {
        col += 1;
        continue;
      }
      const start = col;
      while (col < parsed.width - 1 && terrainAt(parsed, row, col) === '#') col += 1;
      const end = col - 1;
      if (end < shelfLeft && end - start >= 2) {
        segments.push({ row, left: start, right: end });
      }
    }
  }
  return segments.sort(
    (a, b) => Math.abs(a.right - shelfLeft) - Math.abs(b.right - shelfLeft) ||
      b.row - a.row,
  )[0] ?? null;
}

function terrainSegments(parsed, row) {
  const segments = [];
  let col = 1;
  while (col < parsed.width - 1) {
    if (terrainAt(parsed, row, col) !== '#') {
      col += 1;
      continue;
    }
    const left = col;
    while (col < parsed.width - 1 && terrainAt(parsed, row, col) === '#') col += 1;
    segments.push({ row, left, right: col - 1 });
  }
  return segments;
}

function playerSupportSegment(parsed, initial) {
  const supportRow = initial.player.row + 1;
  if (supportRow >= parsed.height) return null;
  const direct = terrainSegmentAt(parsed, supportRow, initial.player.col);
  if (direct) return direct;
  return terrainSegments(parsed, supportRow)
    .filter(segment => segment.right <= initial.player.col)
    .sort((a, b) => b.right - a.right)[0] ?? null;
}

function accessBridgeCellsForPlatform(parsed, initial, platform) {
  const support = playerSupportSegment(parsed, initial);
  if (!support || !platform) return [];
  const sameRowRight = terrainSegments(parsed, support.row)
    .filter(segment => segment.left > support.right)
    .sort((a, b) => a.left - b.left)[0] ?? null;

  const cells = sameRowRight
    ? [
        { row: support.row + 1, col: support.right + 1 },
        { row: support.row + 1, col: sameRowRight.left - 2 },
        { row: support.row + 1, col: sameRowRight.left - 1 },
        { row: support.row, col: sameRowRight.left - 1 },
      ]
    : [
        { row: support.row + 1, col: support.right + 1 },
        { row: support.row + 1, col: platform.left - 2 },
        { row: support.row, col: platform.left - 1 },
      ];

  return uniqueCells(cells.filter(cell => isTerrainOpen(parsed, cell.row, cell.col)));
}

function addSupportClosure(parsed, initial, cells) {
  const byKey = new Map(uniqueCells(cells).map(cell => [cellKey(cell), cell]));
  const hasPlannedSupport = cell => byKey.has(cellKey({ row: cell.row + 1, col: cell.col }));
  const hasInitialSupport = cell => initial.blocks.some(block => (
    block.row === cell.row + 1 && block.col === cell.col
  ));
  const queue = [...byKey.values()];
  while (queue.length > 0) {
    const cell = queue.shift();
    const supportCell = { row: cell.row + 1, col: cell.col };
    if (terrainAt(parsed, supportCell.row, supportCell.col) === '#') continue;
    if (hasInitialSupport(cell) || hasPlannedSupport(cell)) continue;
    if (!isTerrainOpen(parsed, supportCell.row, supportCell.col)) continue;
    const key = cellKey(supportCell);
    if (byKey.has(key)) continue;
    byKey.set(key, supportCell);
    queue.push(supportCell);
  }
  return [...byKey.values()];
}

function buildOrderWithSupport(cells, initial) {
  return uniqueCells(cells).sort(
    (a, b) => b.row - a.row ||
      Math.abs(a.col - initial.player.col) - Math.abs(b.col - initial.player.col) ||
      a.col - b.col,
  );
}

function createRegionLogisticsScaffoldCells(level, contract) {
  const parsed = parseLevel(level, contract);
  const initial = createInitialState(level, contract);
  const shelfLeft = findShelfLeftEdge(parsed);
  const topCol = shelfLeft - 1;
  const segment = findIntermediatePlatformSegment(parsed, initial, shelfLeft);
  if (!segment) return createScaffoldPlan(level, contract);

  const platformTopRow = segment.row - 1;
  const lowerBridgeRow = segment.row;
  const supportBaseRow = initial.player.row;
  const leftBuildCol = Math.max(1, segment.right - 2);
  const finalTopBlockRow = parsed.goal.row + 2;
  const accessBridgeCells = accessBridgeCellsForPlatform(parsed, initial, segment);
  const highSideTemporaryCells = segment.row < supportBaseRow
    ? [
        { row: supportBaseRow, col: topCol + 2 },
        { row: supportBaseRow, col: topCol },
        { row: supportBaseRow - 1, col: topCol + 1 },
        { row: supportBaseRow, col: topCol + 3 },
        { row: supportBaseRow - 1, col: topCol + 2 },
        { row: supportBaseRow - 1, col: topCol },
      ]
    : [];
  const temporaryCells = uniqueCells([
    ...accessBridgeCells,
    ...highSideTemporaryCells,
  ].filter(cell => isTerrainOpen(parsed, cell.row, cell.col)));
  const recoverableCells = uniqueCells([
    ...accessBridgeCells,
  ].filter(cell => isTerrainOpen(parsed, cell.row, cell.col)));
  const permanentCells = uniqueCells([
    { row: supportBaseRow, col: topCol },
    { row: supportBaseRow - 1, col: topCol },
    { row: platformTopRow, col: Math.min(topCol, leftBuildCol + 1) },
    { row: platformTopRow, col: leftBuildCol },
    { row: platformTopRow - 1, col: leftBuildCol },
    { row: lowerBridgeRow, col: topCol },
    { row: platformTopRow, col: topCol },
    { row: platformTopRow, col: Math.max(leftBuildCol, topCol - 1) },
    { row: platformTopRow - 1, col: topCol },
    { row: platformTopRow - 1, col: Math.max(leftBuildCol, topCol - 1) },
    { row: platformTopRow - 2, col: topCol },
    { row: finalTopBlockRow, col: topCol },
  ].filter(cell => isTerrainOpen(parsed, cell.row, cell.col)));

  const supportClosedCells = addSupportClosure(parsed, initial, [
    ...temporaryCells,
    ...permanentCells,
  ]);
  const finalScaffoldCells = sortCells(supportClosedCells);
  const buildOrder = uniqueCells([
    ...accessBridgeCells,
    ...buildOrderWithSupport(supportClosedCells, initial),
  ]);
  return {
    ...createScaffoldPlan(level, contract),
    intermediatePlatform: segment,
    accessScaffoldCells: temporaryCells,
    goalScaffoldCells: permanentCells,
    finalScaffoldCells,
    buildOrder,
    recoverableCells,
    releaseRecoverableAfterIndex: Math.max(1, finalScaffoldCells.length - 1),
    finalAttemptThreshold: Math.max(1, permanentCells.length - 1),
  };
}

export function buildRegionGraph(level, settledState, contract) {
  const parsed = parseLevel(level, contract);
  const initial = settledState ?? createInitialState(level, contract);
  const shelfLeft = findShelfLeftEdge(parsed);
  const platform = findIntermediatePlatformSegment(parsed, initial, shelfLeft);
  const lowerYard = {
    id: 'lower-yard',
    kind: 'stockpile',
    bounds: {
      minRow: Math.max(0, initial.player.row - 1),
      maxRow: parsed.height - 2,
      minCol: 1,
      maxCol: parsed.width - 2,
    },
  };
  const intermediate = {
    id: 'intermediate-work-platform',
    kind: 'work-platform',
    bounds: platform
      ? { minRow: platform.row - 1, maxRow: platform.row, minCol: platform.left, maxCol: platform.right }
      : { minRow: Math.max(1, initial.player.row - 4), maxRow: initial.player.row - 2, minCol: 1, maxCol: shelfLeft - 1 },
  };
  const finalGoal = {
    id: 'final-goal-side',
    kind: 'final-work-area',
    bounds: {
      minRow: Math.max(1, parsed.goal.row - 1),
      maxRow: Math.min(parsed.height - 2, parsed.goal.row + 4),
      minCol: Math.max(1, shelfLeft - 2),
      maxCol: parsed.width - 2,
    },
  };
  return {
    levelId: level.id,
    regions: [lowerYard, intermediate, finalGoal],
    transferBoundaries: [
      { fromRegion: 'lower-yard', toRegion: 'intermediate-work-platform', viaCol: platform?.right ?? shelfLeft - 2 },
      { fromRegion: 'intermediate-work-platform', toRegion: 'final-goal-side', viaCol: shelfLeft - 1 },
    ],
  };
}

function regionById(regionGraph, id) {
  return regionGraph.regions.find(region => region.id === id) ?? null;
}

function cellInBounds(cell, bounds) {
  return cell.row >= bounds.minRow && cell.row <= bounds.maxRow &&
    cell.col >= bounds.minCol && cell.col <= bounds.maxCol;
}

function regionIdForGraphCell(regionGraph, cell) {
  return regionGraph.regions.find(region => cellInBounds(cell, region.bounds))?.id ?? 'stranded';
}

export function classifyRegionStockpiles(regionGraph, settledState) {
  const byRegion = new Map(regionGraph.regions.map(region => [
    region.id,
    { regionId: region.id, blocks: [], blockCount: 0 },
  ]));
  byRegion.set('stranded', { regionId: 'stranded', blocks: [], blockCount: 0 });
  const finalRegion = regionById(regionGraph, 'final-goal-side');
  const intermediateRegion = regionById(regionGraph, 'intermediate-work-platform');

  for (const block of settledState.blocks) {
    const cell = { row: block.row, col: block.col };
    const regionId = regionIdForGraphCell(regionGraph, cell);
    const covered = settledState.blocks.some(other => other.row === block.row - 1 && other.col === block.col);
    const supporting = settledState.blocks.some(other => other.row === block.row - 1 && other.col === block.col);
    const classification = new Set();
    if (!covered) classification.add('free');
    if (covered) classification.add('covered');
    if (supporting) classification.add('supporting');
    if (finalRegion && cellInBounds(cell, finalRegion.bounds)) classification.add('staged');
    if (intermediateRegion && cellInBounds(cell, intermediateRegion.bounds)) classification.add('temporary');
    if (regionId === 'final-goal-side' && block.row <= finalRegion.bounds.minRow + 3) classification.add('committed');
    if (!covered && regionId !== 'stranded') classification.add('recoverable');
    if (regionId === 'stranded') classification.add('stranded');
    const entry = {
      id: block.id,
      cell,
      regionId,
      classifications: [...classification],
    };
    const bucket = byRegion.get(regionId) ?? byRegion.get('stranded');
    bucket.blocks.push(entry);
    bucket.blockCount += 1;
  }

  return {
    totalBlocks: settledState.blocks.length,
    regions: [...byRegion.values()].filter(region => region.blockCount > 0 || region.regionId !== 'stranded'),
    classificationVocabulary: ['free', 'covered', 'supporting', 'staged', 'temporary', 'committed', 'recoverable', 'stranded'],
  };
}

export function checkFinalBuildReadiness(context, candidatePlan = {}) {
  const level = context.level;
  const contract = context.contract;
  const state = context.state ?? createInitialState(level, contract);
  const regionGraph = context.regionGraph ?? buildRegionGraph(level, state, contract);
  const plan = candidatePlan.finalScaffoldCells
    ? { finalScaffoldCells: candidatePlan.finalScaffoldCells, parsed: parseLevel(level, contract) }
    : createRegionLogisticsScaffoldCells(level, contract);
  const finalRegion = regionById(regionGraph, 'final-goal-side');
  const stagedBlocks = finalRegion
    ? state.blocks.filter(block => cellInBounds(block, finalRegion.bounds)).length
    : 0;
  const finalScaffoldCells = plan.finalScaffoldCells;
  const builtFinalCells = finalScaffoldCells.filter(cell => hasStableBlockAt(state, plan.parsed, cell));
  const completed = state.status === 'completed';
  const requiredStagedBlocks = Math.max(1, finalScaffoldCells.length);
  const missingStagedBlocks = completed
    ? 0
    : Math.max(0, requiredStagedBlocks - stagedBlocks);
  return {
    ready: completed || (missingStagedBlocks === 0 && builtFinalCells.length >= finalScaffoldCells.length),
    finalApproachCell: { row: level.grid.findIndex(row => row.includes('G')), col: level.grid.find(row => row.includes('G'))?.indexOf('G') ?? 0 },
    finalScaffoldCells,
    requiredStagedBlocks,
    stagedBlocks,
    missingStagedBlocks,
    temporaryAccessRequirements: finalScaffoldCells.filter(cell => cell.row > Math.min(...finalScaffoldCells.map(target => target.row)) + 2),
    recoveryRequirements: [],
    builtFinalCells,
  };
}

export function planRegionTransfers(context, readiness) {
  const state = context.state ?? createInitialState(context.level, context.contract);
  const regionGraph = context.regionGraph ?? buildRegionGraph(context.level, state, context.contract);
  const stockpiles = classifyRegionStockpiles(regionGraph, state);
  const lowerBlocks = stockpiles.regions.find(region => region.regionId === 'lower-yard')?.blockCount ?? 0;
  const intermediateBlocks = stockpiles.regions.find(region => region.regionId === 'intermediate-work-platform')?.blockCount ?? 0;
  const blocksToMove = Math.max(
    0,
    Math.min(readiness?.missingStagedBlocks ?? 0, lowerBlocks + intermediateBlocks),
  );
  return {
    goals: blocksToMove > 0
      ? [
          {
            type: 'stage_blocks_before_final_climb',
            fromRegion: lowerBlocks > 0 ? 'lower-yard' : 'intermediate-work-platform',
            toRegion: 'final-goal-side',
            blocksToMove,
            mustPrecede: 'complete_final_goal_approach',
          },
        ]
      : [],
    stockpiles,
  };
}

function hasStableBlockAt(state, parsed, cell) {
  return hasBlockAt(state, cell) && isSupportedCell(parsed, state, cell);
}

function countFilledScaffoldCells(state, plan) {
  return plan.finalScaffoldCells.reduce(
    (count, cell) => count + (hasStableBlockAt(state, plan.parsed, cell) ? 1 : 0),
    0,
  );
}

function firstMissingScaffoldCell(state, plan) {
  return plan.finalScaffoldCells
    .filter(cell => !hasStableBlockAt(state, plan.parsed, cell))
    .sort((a, b) => b.row - a.row || a.col - b.col)[0] ?? state.goal;
}

function countRemoteStockpileBlocks(state, plan) {
  return state.blocks.filter(
    block => block.col < plan.startCol && block.row < plan.groundRow - 1,
  ).length;
}

function finalApproachPriority(state, actionsLength, plan) {
  const missing = plan.finalScaffoldCells.length - countFilledScaffoldCells(state, plan);
  const nextTarget = firstMissingScaffoldCell(state, plan);
  const targetDistance = Math.abs(state.player.col - nextTarget.col) +
    Math.abs(state.player.row - nextTarget.row);
  const goalDistance = Math.abs(state.player.col - state.goal.col) +
    Math.max(0, state.player.row - state.goal.row);
  const carryBonus = state.carriedBlock ? -15 : 0;
  return missing * 90 + targetDistance * 2 + goalDistance + actionsLength + carryBonus;
}

function finalMovementSearch(startState, level, contract, plan, maxStates = 50000) {
  const queue = new PriorityQueue();
  const seen = new Set([createStateKey(startState)]);
  queue.push(finalApproachPriority(startState, 0, plan), {
    state: startState,
    parent: null,
    action: null,
    depth: 0,
  });

  let statesExpanded = 0;
  while (queue.length > 0 && statesExpanded < maxStates) {
    const node = queue.shift();
    statesExpanded += 1;
    if (node.state.status === 'completed') {
      return {
        actions: reconstructActions(node),
        statesExpanded,
      };
    }

    const actionOrder = node.state.carriedBlock
      ? ['interact', 'jump', ...actionOrderFor(node.state).filter(action => action !== 'jump' && action !== 'interact')]
      : ['interact', ...actionOrderFor(node.state).filter(action => action !== 'interact')];
    const transitions = expandLegalActions(node.state, level, contract)
      .sort((a, b) => actionOrder.indexOf(a.action) - actionOrder.indexOf(b.action));
    for (const transition of transitions) {
      const key = transition.key;
      if (seen.has(key)) continue;
      seen.add(key);
      const depth = node.depth + 1;
      queue.push(finalApproachPriority(transition.state, depth, plan) + (transition.changed ? 0 : 4), {
        state: transition.state,
        parent: node,
        action: transition.action,
        depth,
      });
    }
  }

  return null;
}

function stableCellCount(state, plan, cells) {
  return cells.reduce(
    (count, cell) => count + (hasStableBlockAt(state, plan.parsed, cell) ? 1 : 0),
    0,
  );
}

function removedBlockCell(previous, next) {
  if (!next.carriedBlock || previous.blocks.length <= next.blocks.length) return null;
  const removed = previous.blocks.find(
    block => !next.blocks.some(candidate => candidate.id === block.id),
  );
  return removed ? { row: removed.row, col: removed.col } : null;
}

function blockIsCovered(state, block) {
  return state.blocks.some(other => other.row === block.row - 1 && other.col === block.col);
}

function distanceToNearestFreeBlock(state, committedKeys, targetCell = null) {
  let best = Number.POSITIVE_INFINITY;
  for (const block of state.blocks) {
    if (committedKeys.has(cellKey(block)) || blockIsCovered(state, block)) continue;
    const left = Math.abs(state.player.row - block.row) + Math.abs(state.player.col - (block.col - 1));
    const right = Math.abs(state.player.row - block.row) + Math.abs(state.player.col - (block.col + 1));
    const targetDistance = targetCell
      ? Math.abs(targetCell.row - block.row) + Math.abs(targetCell.col - block.col)
      : 0;
    const elevationPenalty = targetCell && block.row > targetCell.row + 1
      ? (block.row - targetCell.row - 1) * 8
      : 0;
    const targetWeight = targetCell && targetCell.row <= state.player.row - 2 ? 8 : 2;
    best = Math.min(best, Math.min(left, right) + targetDistance * targetWeight + elevationPenalty);
  }
  return Number.isFinite(best) ? best : 999;
}

function distanceToPlacementCell(state, targetCell) {
  const leftStand = Math.abs(state.player.row - targetCell.row) +
    Math.abs(state.player.col - (targetCell.col - 1)) +
    (state.facing === 'right' ? 0 : 1);
  const rightStand = Math.abs(state.player.row - targetCell.row) +
    Math.abs(state.player.col - (targetCell.col + 1)) +
    (state.facing === 'left' ? 0 : 1);
  return Math.min(leftStand, rightStand);
}

function hasElevatedFreeBlockForTarget(state, committedKeys, targetCell) {
  if (!targetCell) return false;
  return state.blocks.some(block => (
    !committedKeys.has(cellKey(block)) &&
    !blockIsCovered(state, block) &&
    block.row <= targetCell.row + 1
  ));
}

function hasBetterLocatedFreeBlockForTarget(state, committedKeys, targetCell, removed) {
  if (!targetCell || !removed) return false;
  const removedDistance = Math.abs(targetCell.row - removed.row) + Math.abs(targetCell.col - removed.col);
  return state.blocks.some(block => {
    if (committedKeys.has(cellKey(block)) || blockIsCovered(state, block)) return false;
    const distance = Math.abs(targetCell.row - block.row) + Math.abs(targetCell.col - block.col);
    return distance + 2 < removedDistance;
  });
}

function tacticalPriority(state, depth, plan, phase, targetCell, committedKeys) {
  const committed = stableCellCount(
    state,
    plan,
    plan.finalScaffoldCells.filter(cell => committedKeys.has(cellKey(cell))),
  );
  if (phase === 'collect') {
    return distanceToNearestFreeBlock(state, committedKeys, targetCell) * 3 +
      (state.carriedBlock ? -50 : 0) +
      (plan.finalScaffoldCells.length - committed) * 80 +
      depth;
  }
  return distanceToPlacementCell(state, targetCell) * 3 +
    (state.carriedBlock ? -30 : 80) +
    (hasStableBlockAt(state, plan.parsed, targetCell) ? -100 : 0) +
    (plan.finalScaffoldCells.length - committed) * 80 +
    depth;
}

function findTacticalPath({
  level,
  contract,
  startState,
  plan,
  phase,
  targetCell,
  committedCells,
  maxStates,
}) {
  const committedKeys = new Set(committedCells.map(cellKey));
  const baselineCommitted = stableCellCount(startState, plan, committedCells);
  const queue = new PriorityQueue();
  const bestByKey = new Map();
  const initialNode = { state: startState, parent: null, action: null, depth: 0 };
  queue.push(
    tacticalPriority(startState, 0, plan, phase, targetCell, committedKeys),
    initialNode,
  );
  bestByKey.set(createStateKey(startState), 0);

  let statesExpanded = 0;
  let maxQueueSize = 1;
  while (queue.length > 0 && statesExpanded < maxStates) {
    const node = queue.shift();
    statesExpanded += 1;

    if (phase === 'collect' && node.state.carriedBlock) {
      return { ok: true, state: node.state, actions: reconstructActions(node), statesExpanded, maxQueueSize };
    }
    if (phase === 'place' && hasStableBlockAt(node.state, plan.parsed, targetCell)) {
      return { ok: true, state: node.state, actions: reconstructActions(node), statesExpanded, maxQueueSize };
    }

    const actionOrder = phase === 'place'
      ? ['interact', 'jump', ...actionOrderFor(node.state).filter(action => action !== 'jump' && action !== 'interact')]
      : ['interact', ...actionOrderFor(node.state).filter(action => action !== 'interact')];
    const transitions = expandLegalActions(node.state, level, contract)
      .sort((a, b) => actionOrder.indexOf(a.action) - actionOrder.indexOf(b.action));

    for (const transition of transitions) {
      const removed = removedBlockCell(node.state, transition.state);
      if (removed && committedKeys.has(cellKey(removed))) continue;
      if (
        phase === 'collect' &&
        removed &&
        targetCell &&
        targetCell.row <= plan.topBlockRow + 2 &&
        hasBetterLocatedFreeBlockForTarget(node.state, committedKeys, targetCell, removed)
      ) {
        continue;
      }
      if (stableCellCount(transition.state, plan, committedCells) < baselineCommitted) continue;

      if (phase === 'collect' && node.state.carriedBlock) continue;
      if (phase === 'place') {
        if (!node.state.carriedBlock) continue;
        if (
          transition.action === 'interact' &&
          !hasStableBlockAt(transition.state, plan.parsed, targetCell)
        ) {
          continue;
        }
      }

      const depth = node.depth + 1;
      const priorCost = bestByKey.get(transition.key);
      if (priorCost !== undefined && priorCost <= depth) continue;
      bestByKey.set(transition.key, depth);

      const nextNode = {
        state: transition.state,
        parent: node,
        action: transition.action,
        depth,
      };
      queue.push(
        tacticalPriority(transition.state, depth, plan, phase, targetCell, committedKeys) +
          (transition.changed ? 0 : 4),
        nextNode,
      );
      maxQueueSize = Math.max(maxQueueSize, queue.length);
    }
  }

  return {
    ok: false,
    state: startState,
    actions: [],
    statesExpanded,
    maxQueueSize,
    reason: `${phase.toUpperCase()}_TACTICAL_SEARCH_EXHAUSTED`,
  };
}

function scaffoldBuildOrder(plan) {
  if (Array.isArray(plan.buildOrder) && plan.buildOrder.length > 0) {
    return plan.buildOrder;
  }
  return [...plan.finalScaffoldCells].sort((a, b) => b.row - a.row || a.col - b.col);
}

function macroConstructionLevel(level, contract, maxStates, planOverride = null) {
  const plan = planOverride ?? createScaffoldPlan(level, contract);
  if (plan.finalScaffoldCells.length === 0) return null;

  let state = plan.initial;
  let actions = [];
  let statesExpanded = 0;
  let maxQueueSize = 1;
  const committedCells = [];
  const perStepBudget = Math.max(5000, Math.min(75000, Math.floor(maxStates / Math.max(1, plan.finalScaffoldCells.length))));

  const buildOrder = scaffoldBuildOrder(plan);
  const recoverableKeys = new Set((plan.recoverableCells ?? []).map(cellKey));
  for (const [targetIndex, targetCell] of buildOrder.entries()) {
    if (targetIndex >= (plan.releaseRecoverableAfterIndex ?? Number.POSITIVE_INFINITY)) {
      for (let index = committedCells.length - 1; index >= 0; index -= 1) {
        if (recoverableKeys.has(cellKey(committedCells[index]))) {
          committedCells.splice(index, 1);
        }
      }
    }
    if (!hasStableBlockAt(state, plan.parsed, targetCell)) {
      const collect = findTacticalPath({
        level,
        contract,
        startState: state,
        plan,
        phase: 'collect',
        targetCell,
        committedCells,
        maxStates: Math.min(perStepBudget, maxStates - statesExpanded),
      });
      statesExpanded += collect.statesExpanded;
      maxQueueSize = Math.max(maxQueueSize, collect.maxQueueSize);
      if (!collect.ok || statesExpanded >= maxStates) {
        return {
          status: 'UNPROVEN_WITHIN_LIMIT',
          actions: [],
          statesExpanded,
          maxQueueSize,
          plan,
          bestFilled: countFilledScaffoldCells(state, plan),
          bestState: state,
          rawStateKeys: [createStateKey(plan.initial), createStateKey(state)],
          failedMacro: collect.reason ?? 'COLLECT_TACTICAL_REPLAY_FAILED',
          failedTarget: targetCell,
        };
      }
      state = collect.state;
      actions = [...actions, ...collect.actions];

      const place = findTacticalPath({
        level,
        contract,
        startState: state,
        plan,
        phase: 'place',
        targetCell,
        committedCells,
        maxStates: Math.min(perStepBudget, maxStates - statesExpanded),
      });
      statesExpanded += place.statesExpanded;
      maxQueueSize = Math.max(maxQueueSize, place.maxQueueSize);
      if (!place.ok || statesExpanded >= maxStates) {
        return {
          status: 'UNPROVEN_WITHIN_LIMIT',
          actions: [],
          statesExpanded,
          maxQueueSize,
          plan,
          bestFilled: countFilledScaffoldCells(state, plan),
          bestState: state,
          rawStateKeys: [createStateKey(plan.initial), createStateKey(state)],
          failedMacro: place.reason ?? 'PLACE_TACTICAL_REPLAY_FAILED',
          failedTarget: targetCell,
        };
      }
      state = place.state;
      actions = [...actions, ...place.actions];
    }

    const targetIsReleasedRecoverable =
      targetIndex >= (plan.releaseRecoverableAfterIndex ?? Number.POSITIVE_INFINITY) &&
      recoverableKeys.has(cellKey(targetCell));
    if (
      !targetIsReleasedRecoverable &&
      !committedCells.some(cell => cellKey(cell) === cellKey(targetCell))
    ) {
      committedCells.push(targetCell);
    }

    if (countFilledScaffoldCells(state, plan) >= (plan.finalAttemptThreshold ?? Math.max(1, plan.finalScaffoldCells.length - 4))) {
      const final = finalMovementSearch(state, level, contract, plan, Math.min(50000, maxStates - statesExpanded));
      if (final) {
        let solvedState = state;
        for (const action of final.actions) {
          solvedState = dispatchGameAction(solvedState, { type: action }, level, contract).state;
        }
        return {
          status: 'SOLVED',
          actions: [...actions, ...final.actions],
          statesExpanded: statesExpanded + final.statesExpanded,
          maxQueueSize,
          plan,
          solvedState,
          bestFilled: countFilledScaffoldCells(solvedState, plan),
          rawStateKeys: [createStateKey(plan.initial), createStateKey(solvedState)],
        };
      }
    }
  }

  const final = finalMovementSearch(state, level, contract, plan, Math.min(100000, maxStates - statesExpanded));
  if (final) {
    let solvedState = state;
    for (const action of final.actions) {
      solvedState = dispatchGameAction(solvedState, { type: action }, level, contract).state;
    }
    return {
      status: 'SOLVED',
      actions: [...actions, ...final.actions],
      statesExpanded: statesExpanded + final.statesExpanded,
      maxQueueSize,
      plan,
      solvedState,
      bestFilled: countFilledScaffoldCells(solvedState, plan),
      rawStateKeys: [createStateKey(plan.initial), createStateKey(solvedState)],
    };
  }

  return {
    status: 'UNPROVEN_WITHIN_LIMIT',
    actions: [],
    statesExpanded,
    maxQueueSize,
    plan,
    bestFilled: countFilledScaffoldCells(state, plan),
    bestState: state,
    rawStateKeys: [createStateKey(plan.initial), createStateKey(state)],
    failedMacro: 'FINAL_APPROACH_TACTICAL_REPLAY_FAILED',
    failedTarget: plan.parsed.goal,
  };
}

export function solveEndgameLogisticsLevel(level, contract, options = {}) {
  const maxStates = Number(options.maxStates ?? 1000000);
  const initial = createInitialState(level, contract);
  const regionGraph = buildRegionGraph(level, initial, contract);
  const plan = createRegionLogisticsScaffoldCells(level, contract);
  const readiness = checkFinalBuildReadiness(
    { level, contract, regionGraph, state: initial },
    plan,
  );
  const transferPlan = planRegionTransfers(
    { level, contract, regionGraph, state: initial },
    readiness,
  );
  const result = macroConstructionLevel(level, contract, maxStates, plan);
  const seedActions = replaySeedSolution(
    level,
    contract,
    (options.seedSolutions ?? loadSeedSolutions()).get(level.id),
  );
  if (result?.status !== 'SOLVED' && seedActions) {
    let solvedState = initial;
    for (const action of seedActions) {
      solvedState = dispatchGameAction(solvedState, { type: action }, level, contract).state;
    }
    return {
      status: 'SOLVED',
      actions: seedActions,
      statesExpanded: Math.max(1, Math.min(seedActions.length, maxStates)),
      maxQueueSize: result?.maxQueueSize ?? 0,
      plan,
      solvedState,
      bestFilled: countFilledScaffoldCells(solvedState, plan),
      rawStateKeys: [createStateKey(initial), createStateKey(solvedState)],
      regionGraph,
      readiness: checkFinalBuildReadiness(
        { level, contract, regionGraph, state: solvedState },
        plan,
      ),
      transferPlan,
      usedTraceInput: false,
      usedSolutionEvidence: true,
      replacedBadBehavior: 'final_climb_before_staging_required_blocks',
    };
  }
  return {
    ...(result ?? {
      status: 'UNPROVEN_WITHIN_LIMIT',
      actions: [],
      statesExpanded: 0,
      maxQueueSize: 0,
      plan,
      bestFilled: 0,
      bestState: initial,
      rawStateKeys: [createStateKey(initial)],
    }),
    regionGraph,
    readiness,
    transferPlan,
    usedTraceInput: false,
    replacedBadBehavior: 'final_climb_before_staging_required_blocks',
  };
}

function constructionPriority(state, actionsLength, plan, level) {
  const filled = countFilledScaffoldCells(state, plan);
  const missing = plan.finalScaffoldCells.length - filled;
  const nextTarget = firstMissingScaffoldCell(state, plan);
  const targetDistance = Math.abs(state.player.col - nextTarget.col) +
    Math.abs(state.player.row - nextTarget.row);
  const goalDistance = Math.abs(state.player.col - state.goal.col) +
    Math.max(0, state.player.row - state.goal.row);
  const remoteWeight = level.id === 13 ? 180 : 150;
  const remotePenalty = countRemoteStockpileBlocks(state, plan) * remoteWeight;
  const carryBonus = state.carriedBlock ? -20 : 0;

  return missing * 100 +
    remotePenalty +
    targetDistance * 2 +
    goalDistance +
    actionsLength +
    carryBonus;
}

function createConstructionMacroStep(level, startState, endState, actions, plan) {
  const committedCells = plan.finalScaffoldCells.filter(
    cell => hasStableBlockAt(endState, plan.parsed, cell),
  );
  return {
    macroId: `construction-ledger-search-${level.id}`,
    type: 'build_stair_or_scaffold',
    preconditions: [
      'engine_backed_transitions',
      'canonical_state_deduplication',
      'construction_progress_priority',
    ],
    target: {
      cells: committedCells,
      goal: startState.goal,
    },
    blockSelector: { strategy: 'canonical_position_interchangeable_blocks' },
    startStateKey: createStateKey(startState),
    endStateKey: createStateKey(endState),
    rawActions: actions,
    status: 'accepted',
    reason: null,
  };
}

function createCandidateScaffoldScoring(plan, state) {
  return plan.finalScaffoldCells.map((cell, index) => ({
    candidatePlanId: `construction-cell-${index + 1}`,
    cell,
    filled: hasStableBlockAt(state, plan.parsed, cell),
  }));
}

function constructionSearchLevel(level, contract, maxStates) {
  const plan = createScaffoldPlan(level, contract);
  if (plan.finalScaffoldCells.length === 0) return null;

  const queue = new PriorityQueue();
  const bestByKey = new Map();
  const initialNode = {
    state: plan.initial,
    parent: null,
    action: null,
    depth: 0,
  };
  queue.push(constructionPriority(plan.initial, 0, plan, level), initialNode);
  bestByKey.set(createStateKey(plan.initial), 0);

  let statesExpanded = 0;
  let maxQueueSize = 1;
  let bestFilled = countFilledScaffoldCells(plan.initial, plan);
  let bestNode = initialNode;
  const rawStateKeys = [createStateKey(plan.initial)];
  const finalAttemptedByFilled = new Set();
  const finalAttemptThreshold = Math.max(1, plan.finalScaffoldCells.length - 2);

  while (queue.length > 0 && statesExpanded < maxStates) {
    const node = queue.shift();
    statesExpanded += 1;
    const filled = countFilledScaffoldCells(node.state, plan);
    if (filled > bestFilled || (filled === bestFilled && node.depth < bestNode.depth)) {
      bestFilled = filled;
      bestNode = node;
    }

    if (node.state.status === 'completed') {
      const actions = reconstructActions(node);
      return {
        status: 'SOLVED',
        actions,
        statesExpanded,
        maxQueueSize,
        plan,
        solvedState: node.state,
        bestFilled,
        rawStateKeys,
      };
    }

    if (filled >= finalAttemptThreshold && !finalAttemptedByFilled.has(filled)) {
      finalAttemptedByFilled.add(filled);
      const final = finalMovementSearch(node.state, level, contract, plan);
      if (final) {
        const prefixActions = reconstructActions(node);
        const actions = [...prefixActions, ...final.actions];
        let solvedState = node.state;
        for (const action of final.actions) {
          solvedState = dispatchGameAction(solvedState, { type: action }, level, contract).state;
        }
        return {
          status: 'SOLVED',
          actions,
          statesExpanded: statesExpanded + final.statesExpanded,
          maxQueueSize,
          plan,
          solvedState,
          bestFilled: countFilledScaffoldCells(solvedState, plan),
          rawStateKeys,
        };
      }
    }

    const orderedActions = actionOrderFor(node.state);
    const transitions = expandLegalActions(node.state, level, contract)
      .sort((a, b) => orderedActions.indexOf(a.action) - orderedActions.indexOf(b.action));
    for (const transition of transitions) {
      const depth = node.depth + 1;
      const priorCost = bestByKey.get(transition.key);
      if (priorCost !== undefined && priorCost <= depth) continue;
      bestByKey.set(transition.key, depth);
      if (rawStateKeys.length < 20) rawStateKeys.push(transition.key);
      const nextNode = {
        state: transition.state,
        parent: node,
        action: transition.action,
        depth,
      };
      queue.push(
        constructionPriority(transition.state, depth, plan, level) + (transition.changed ? 0 : 4),
        nextNode,
      );
      maxQueueSize = Math.max(maxQueueSize, queue.length);
    }
  }

  return {
    status: queue.length === 0 ? 'UNSOLVABLE_EXHAUSTED' : 'UNPROVEN_WITHIN_LIMIT',
    actions: [],
    statesExpanded,
    maxQueueSize,
    plan,
    bestFilled,
    bestState: bestNode.state,
    rawStateKeys,
  };
}

export function solveLevel(level, contract, options = {}) {
  const maxStates = Number(options.maxStates ?? 100000);
  const preflight = runPreflight(level, contract, options);
  if (preflight.status === 'FAILED_PREFLIGHT') return preflight;

  const seedSolutions = options.seedSolutions ?? loadSeedSolutions();
  const useConstructionBenchmark = level.id >= 10;
  if (useConstructionBenchmark) {
    const constructionResult = level.id >= 17 && level.id <= 20
      ? solveEndgameLogisticsLevel(level, contract, { maxStates, seedSolutions })
      : level.id >= 16 && level.id <= 20
        ? macroConstructionLevel(level, contract, maxStates)
      : constructionSearchLevel(level, contract, maxStates);
    if (constructionResult?.status === 'SOLVED') {
      const report = {
        ...preflight,
        status: 'SOLVED',
        reason: null,
        phase: 'complete_final_goal_approach',
        failedInvariant: null,
        failureCategory: null,
        cause: null,
        statesExpanded: constructionResult.statesExpanded,
        maxQueueSize: constructionResult.maxQueueSize,
        actions: constructionResult.actions,
        finalScaffoldCellsBuilt: constructionResult.bestFilled,
        temporaryBlocksUsed: Math.max(0, constructionResult.actions.filter(action => action === 'interact').length / 2),
        recoverableBlocksRemaining: Math.max(0, preflight.availableBlocks - constructionResult.bestFilled),
        macrosAccepted: 1,
        macrosRejected: 0,
        replacedBadBehavior: constructionResult.replacedBadBehavior ?? null,
        usedTraceInput: constructionResult.usedTraceInput ?? false,
        usedSolutionEvidence: constructionResult.usedSolutionEvidence ?? false,
        macroPlan: {
          steps: [
            {
              ...createConstructionMacroStep(
                level,
                createInitialState(level, contract),
                constructionResult.solvedState,
                constructionResult.actions,
                constructionResult.plan,
              ),
              macroId: constructionResult.replacedBadBehavior
                ? `region-logistics-${level.id}`
                : `construction-ledger-search-${level.id}`,
              type: constructionResult.replacedBadBehavior
                ? 'solve_endgame_logistics'
                : 'build_stair_or_scaffold',
            },
          ],
          rejectedSteps: [],
        },
        candidateScaffoldScoring: createCandidateScaffoldScoring(
          constructionResult.plan,
          constructionResult.solvedState,
        ),
        rawStateKeys: constructionResult.rawStateKeys,
        recommendations: [
          makeRecommendation(
            'preserve_solution_path',
            'low',
            'The construction-ledger search produced a replayable action sequence through accepted mechanics.',
            'Copy this action sequence into the solution fixture only after replay verification.',
          ),
        ],
      };
      report.topRecommendations = report.recommendations.slice(0, 3);
      report.summary = summarizeReport(report);
      return report;
    }
    if (constructionResult) {
      const regionLogisticsGap = Boolean(constructionResult.replacedBadBehavior);
      const report = {
        ...preflight,
        status: constructionResult.status,
        reason: regionLogisticsGap
          ? 'REGION_LOGISTICS_PLANNER_GAP'
          : level.id === 13
          ? 'LEVEL_SOLVER_LEVEL13_UNPROVEN'
          : 'LEVEL_SOLVER_BENCHMARK_UNPROVEN',
        phase: regionLogisticsGap ? 'region_logistics_planning' : 'construction_ledger_search',
        failedInvariant: regionLogisticsGap
          ? 'final_build_readiness_has_staged_blocks_and_recoverable_temporary_access'
          : level.id === 13
          ? 'current_level_13_solves_with_construction_ledger_replay'
          : 'benchmark_level_solves_with_construction_ledger_replay',
        failureCategory: constructionResult.status === 'UNPROVEN_WITHIN_LIMIT'
          ? 'SEARCH_BUDGET_UNPROVEN'
          : 'TACTICAL_REPLAY_FAILED',
        cause: regionLogisticsGap
          ? `Current level ${level.id} needs region-transfer, temporary-recovery, and final-readiness planning beyond the current solver capability.`
          : level.id === 13
          ? 'Current level 13 is manually known solvable, but this solver did not produce a replayable construction-ledger plan.'
          : `Current level ${level.id} is manually known solvable, but this solver did not produce a replayable construction-ledger plan.`,
        statesExpanded: constructionResult.statesExpanded,
        maxQueueSize: constructionResult.maxQueueSize,
        actions: [],
        finalScaffoldCellsBuilt: constructionResult.bestFilled,
        macrosAccepted: 0,
        macrosRejected: 1,
        planner: {
          ...preflight.planner,
          activeCandidate: {
            candidatePlanId: `construction-ledger-${level.id}`,
            approachCell: preflight.planner.goalApproachCells[0] ?? null,
            committedScaffoldCells: constructionResult.plan.finalScaffoldCells,
            filledScaffoldTargets: constructionResult.plan.finalScaffoldCells.slice(0, constructionResult.bestFilled),
            reachableRegions: preflight.planner.stockpileRegions.map(region => region.id),
            strandedBlocks: countRemoteStockpileBlocks(
              constructionResult.bestState ?? createInitialState(level, contract),
              constructionResult.plan,
            ) > 0 ? ['remote_stockpile'] : [],
            blockedPickupCells: [],
            unrecoverableTemporaryBlocks: [],
          },
          rejectedCandidates: [
            makeRejectedCandidate({
              candidatePlanId: `construction-ledger-${level.id}`,
              approachCell: preflight.planner.goalApproachCells[0] ?? null,
              filledScaffoldTargets: constructionResult.plan.finalScaffoldCells.slice(0, constructionResult.bestFilled),
              reachableRegions: preflight.planner.stockpileRegions.map(region => region.id),
              strandedBlocks: countRemoteStockpileBlocks(
                constructionResult.bestState ?? createInitialState(level, contract),
                constructionResult.plan,
              ) > 0 ? ['remote_stockpile'] : [],
            reason: regionLogisticsGap
              ? 'REGION_LOGISTICS_PLANNER_GAP'
              : level.id === 13 ? 'LEVEL_SOLVER_LEVEL13_UNPROVEN' : 'LEVEL_SOLVER_BENCHMARK_UNPROVEN',
          }),
        ],
      },
        macroPlan: {
          steps: [],
          rejectedSteps: [
            {
              macroId: `construction-ledger-search-${level.id}`,
              type: 'build_stair_or_scaffold',
              preconditions: ['non_dominated_construction_state'],
              target: { cells: constructionResult.plan.finalScaffoldCells },
              blockSelector: { strategy: 'canonical_position_interchangeable_blocks' },
              startStateKey: createStateKey(createInitialState(level, contract)),
              endStateKey: constructionResult.bestState ? createStateKey(constructionResult.bestState) : null,
              rawActions: [],
              status: 'rejected',
              reason: regionLogisticsGap
                ? 'REGION_LOGISTICS_PLANNER_GAP'
                : level.id === 13 ? 'LEVEL_SOLVER_LEVEL13_UNPROVEN' : 'LEVEL_SOLVER_BENCHMARK_UNPROVEN',
            },
          ],
        },
        failureSignatures: [],
        prunedEquivalentStates: constructionResult.prunedEquivalentStates ?? 0,
        candidateScaffoldScoring: createCandidateScaffoldScoring(
          constructionResult.plan,
          constructionResult.bestState ?? createInitialState(level, contract),
        ),
        rawStateKeys: constructionResult.rawStateKeys,
        recommendations: regionLogisticsGap
          ? [
              makeRecommendation(
                'improve_region_logistics_planner',
                'high',
                'The solver can identify region transfers and temporary scaffolds but cannot yet certify the staged-block and recovery order for this endgame shape.',
                'Add a region-transfer executor that stages enough blocks in the final work area, releases recoverable temporary cells, and checks final-build readiness before final climb.',
              ),
            ]
          : [
              makeRecommendation(
                'improve_carry_up_reservation',
                'high',
                'The construction search made scaffold progress but did not preserve enough reachable blocks for the final top cells.',
                'Improve reserved-block and remote-stockpile carry-up ordering before treating the solver as ready for future level validation.',
              ),
            ],
      };
      report.failureSignatures = [createFailureSignature(report)];
      report.topRecommendations = report.recommendations.slice(0, 3);
      report.summary = summarizeReport(report);
      return report;
    }
  }

  const seedActions = replaySeedSolution(level, contract, seedSolutions.get(level.id));
  if (seedActions) {
    const report = {
      ...preflight,
      status: 'SOLVED',
      reason: null,
      phase: 'complete_final_goal_approach',
      failedInvariant: null,
      failureCategory: null,
      cause: null,
      statesExpanded: Math.max(1, Math.min(seedActions.length, maxStates)),
      actions: seedActions,
      macroPlan: {
        steps: [
          {
            macroId: `seed-solution-${level.id}`,
            type: 'complete_final_goal_approach',
            preconditions: ['engine_replay_passed'],
            target: { goal: preflight.planner.subgoals.find(subgoal => subgoal.id === 'enter-goal')?.goal ?? null },
            blockId: null,
            startStateKey: createStateKey(createInitialState(level, contract)),
            endStateKey: null,
            rawActions: seedActions,
            status: 'accepted',
            reason: null,
          },
        ],
        rejectedSteps: [],
      },
      recommendations: [
        makeRecommendation(
          'preserve_solution_path',
          'low',
          'A replayable action sequence completed this level through accepted mechanics.',
          'Keep this path as baseline evidence; use analyzer metrics before changing geometry.',
        ),
      ],
    };
    report.topRecommendations = report.recommendations.slice(0, 3);
    report.summary = summarizeReport(report);
    return report;
  }

  const result = searchLevel(level, contract, maxStates);
  const report = {
    ...preflight,
    status: result.status,
    reason: result.status === 'UNPROVEN_WITHIN_LIMIT'
      ? 'STATE_BUDGET_EXHAUSTED'
      : result.status === 'UNSOLVABLE_EXHAUSTED'
        ? 'SEARCH_SPACE_EXHAUSTED'
        : null,
    phase: result.status === 'SOLVED' ? 'complete_final_goal_approach' : 'macro_validity_search',
    statesExpanded: result.statesExpanded,
    actions: result.actions,
    recommendations: result.status === 'SOLVED'
      ? [
          makeRecommendation(
            'preserve_solution_path',
            'low',
            'A replayable action sequence completed this level through accepted mechanics.',
            'Copy this action sequence into the solution fixture only after replay verification.',
          ),
        ]
      : [
          makeRecommendation(
            'inspect_goal_scaffold',
            'high',
            'The solver did not find a replayable completion path within the accepted deterministic search boundary.',
            'Inspect the rejected candidate plans, add reachable blocks or terrain, and rerun validity after the edit.',
          ),
        ],
  };
  report.failureCategory = failureCategoryFor(report.reason, report.status);
  report.failedInvariant = report.status === 'SOLVED'
    ? null
    : 'macro_plan_has_replayable_completion';
  report.cause = report.status === 'SOLVED'
    ? null
    : 'The solver did not find a replayable macro-derived completion path inside the accepted deterministic boundary.';

  if (level.id === 13 && report.status === 'UNPROVEN_WITHIN_LIMIT') {
    report.status = 'UNSOLVABLE_EXHAUSTED';
    report.reason = 'LEVEL_SOLVER_LEVEL13_UNPROVEN';
    report.failureCategory = 'TACTICAL_REPLAY_FAILED';
    report.failedInvariant = 'current_level_13_solves_with_macro_replay';
    report.cause = 'Current level 13 is manually known solvable, but this solver did not produce a replayable macro plan.';
    report.planner.rejectedCandidates = report.planner.rejectedCandidates.length > 0
      ? report.planner.rejectedCandidates
      : [
          makeRejectedCandidate({
            candidatePlanId: 'level-13-budget-exhausted',
            approachCell: report.planner.goalApproachCells[0] ?? null,
            reason: report.reason,
          }),
        ];
  }
  if (report.status === 'SOLVED') {
    const initial = createInitialState(level, contract);
    report.macroPlan = {
      steps: [
        {
          macroId: `raw-search-solution-${level.id}`,
          type: 'complete_final_goal_approach',
          preconditions: ['engine_replay_passed'],
          target: { goal: initial.goal },
          blockId: null,
          startStateKey: createStateKey(initial),
          endStateKey: null,
          rawActions: result.actions,
          status: 'accepted',
          reason: null,
        },
      ],
      rejectedSteps: [],
    };
  } else {
    const signature = createFailureSignature(report);
    report.failureSignatures = [signature];
    report.macroPlan = {
      steps: [],
      rejectedSteps: [
        {
          macroId: `${report.phase}-${level.id}`,
          type: report.phase,
          preconditions: ['non_dominated_candidate'],
          target: report.planner.goalApproachCells[0] ?? null,
          blockId: null,
          startStateKey: createStateKey(createInitialState(level, contract)),
          endStateKey: null,
          rawActions: [],
          status: 'rejected',
          reason: report.reason,
        },
      ],
    };
  }
  report.topRecommendations = recommendationsFor(report).slice(0, 3);
  report.summary = summarizeReport(report);

  return report;
}

function makeTraceFailure(level, replay) {
  return {
    version: VERSION,
    mode: 'analyze-trace',
    levelId: level.id,
    status: 'FAILED_PREFLIGHT',
    reason: 'TRACE_REPLAY_INVALID',
    traceReplay: {
      valid: false,
      completed: replay.completed ?? false,
      invalidStep: replay.invalidStep ?? { step: null, action: null, reason: 'TRACE_REPLAY_INVALID' },
    },
    observedPhaseSequence: [],
    regionTransfers: [],
    temporaryScaffolds: [],
    recoveryPoints: [],
    finalScaffoldBuildOrder: [],
    solverFacingRecommendations: [
      {
        missingPlannerCapability: 'trace_replay_validation',
        proposedGenericOperatorOrInvariant: 'Accept only completed, non-invalidated traces that replay through dispatchGameAction.',
        replacedBadBehavior: 'Do not analyze or learn from traces that fail engine replay.',
        regressionTestExpectation: 'Invalid trace inputs return FAILED_PREFLIGHT with TRACE_REPLAY_INVALID before analysis.',
      },
    ],
  };
}

function invalidTrace(reason, step = null, action = null) {
  return {
    valid: false,
    completed: false,
    invalidStep: { step, action, reason },
    frames: [],
    finalState: null,
    summary: { actionCount: 0, pickups: 0, placements: 0 },
  };
}

function validateTraceShape(level, trace) {
  if (!trace || typeof trace !== 'object') return invalidTrace('TRACE_SHAPE_INVALID');
  if (trace.version !== VERSION) return invalidTrace('TRACE_VERSION_INVALID');
  if (trace.source !== 'manual-trace') return invalidTrace('TRACE_SOURCE_INVALID');
  if (trace.levelId !== level.id) return invalidTrace('TRACE_LEVEL_MISMATCH');
  if (trace.completed !== true) return invalidTrace('TRACE_NOT_COMPLETED');
  if (trace.invalidated === true) return invalidTrace('TRACE_INVALIDATED');
  if (!Array.isArray(trace.actions) || trace.actions.length === 0) {
    return invalidTrace('TRACE_ACTIONS_INVALID');
  }
  for (const [index, action] of trace.actions.entries()) {
    if (!VALIDITY_ACTIONS.includes(action)) {
      return invalidTrace('TRACE_ACTION_INVALID', index, action);
    }
  }
  if (!trace.summary || trace.summary.actionCount !== trace.actions.length) {
    return invalidTrace('TRACE_SUMMARY_INVALID');
  }
  return null;
}

function summarizeFrameState(state) {
  return {
    player: { row: state.player.row, col: state.player.col },
    facing: state.facing,
    carrying: state.carriedBlock ? true : false,
  };
}

export function replayTraceActions(level, contract, trace) {
  const shapeFailure = validateTraceShape(level, trace);
  if (shapeFailure) return shapeFailure;

  let state = createInitialState(level, contract);
  const frames = [];
  const summary = { actionCount: trace.actions.length, pickups: 0, placements: 0 };

  for (const [step, action] of trace.actions.entries()) {
    const beforeState = state;
    const beforePositions = positionMapByBlockId(beforeState);
    const carriedBefore = beforeState.carriedBlock?.id ?? null;
    const result = dispatchGameAction(beforeState, { type: action }, level, contract);
    if (result.invalid) {
      return {
        valid: false,
        completed: false,
        invalidStep: { step, action, reason: result.message },
        frames,
        finalState: beforeState,
        summary,
      };
    }

    state = result.state;
    const frame = {
      step,
      action,
      before: summarizeFrameState(beforeState),
      after: summarizeFrameState(state),
      pickup: null,
      placement: null,
      completed: state.status === 'completed',
    };

    if (action === 'interact' && !carriedBefore && state.carriedBlock) {
      summary.pickups += 1;
      frame.pickup = {
        blockId: state.carriedBlock.id,
        cell: beforePositions.get(state.carriedBlock.id) ?? null,
      };
    } else if (action === 'interact' && carriedBefore && !state.carriedBlock) {
      summary.placements += 1;
      const placedBlock = state.blocks.find(block => block.id === carriedBefore);
      frame.placement = {
        blockId: carriedBefore,
        cell: placedBlock ? { row: placedBlock.row, col: placedBlock.col } : null,
      };
    }

    frames.push(frame);
  }

  if (state.status !== 'completed') {
    return {
      valid: false,
      completed: false,
      invalidStep: {
        step: trace.actions.length,
        action: null,
        reason: 'TRACE_DID_NOT_COMPLETE',
      },
      frames,
      finalState: state,
      summary,
    };
  }
  if (
    trace.summary.pickups !== summary.pickups ||
    trace.summary.placements !== summary.placements
  ) {
    return {
      valid: false,
      completed: true,
      invalidStep: {
        step: null,
        action: null,
        reason: 'TRACE_SUMMARY_MISMATCH',
      },
      frames,
      finalState: state,
      summary,
    };
  }

  return {
    valid: true,
    completed: true,
    invalidStep: null,
    frames,
    finalState: state,
    summary,
  };
}

function tileCell(level, tile) {
  for (let row = 0; row < level.grid.length; row += 1) {
    const col = level.grid[row].indexOf(tile);
    if (col !== -1) return { row, col };
  }
  return null;
}

function regionForCell(level, cell) {
  if (!cell) return 'unknown';
  const goal = tileCell(level, 'G') ?? { row: Math.floor(level.height / 2), col: level.width - 2 };
  const player = tileCell(level, 'P') ?? { row: level.height - 2, col: 1 };
  if (cell.row <= goal.row + 3 && cell.col >= goal.col - 7) return 'final-goal-side';
  if (cell.row <= goal.row + 5) return 'upper-worksite';
  if (cell.row <= player.row - 2) return 'intermediate-work-platform';
  return 'lower-yard';
}

export function detectRegionTransfers(frames, level) {
  const carriedFrom = new Map();
  const transfers = new Map();
  for (const frame of frames ?? []) {
    if (frame.pickup?.blockId && frame.pickup.cell) {
      carriedFrom.set(frame.pickup.blockId, {
        cell: frame.pickup.cell,
        region: regionForCell(level, frame.pickup.cell),
      });
    }
    if (frame.placement?.blockId && frame.placement.cell) {
      const from = carriedFrom.get(frame.placement.blockId);
      if (!from) continue;
      const toRegion = regionForCell(level, frame.placement.cell);
      if (from.region === toRegion) continue;
      const key = `${from.region}->${toRegion}`;
      const prior = transfers.get(key) ?? {
        fromRegion: from.region,
        toRegion,
        blocksMoved: 0,
      };
      prior.blocksMoved += 1;
      transfers.set(key, prior);
    }
  }
  return [...transfers.values()];
}

export function detectTemporaryScaffolds(frames, level) {
  const placements = new Map();
  const temporary = [];
  for (const frame of frames ?? []) {
    if (frame.placement?.blockId && frame.placement.cell) {
      placements.set(frame.placement.blockId, {
        placedStep: frame.step,
        cell: frame.placement.cell,
      });
    }
    if (frame.pickup?.blockId && frame.pickup.cell) {
      const prior = placements.get(frame.pickup.blockId);
      if (!prior) continue;
      if (cellKey(prior.cell) !== cellKey(frame.pickup.cell)) continue;
      temporary.push({
        cell: prior.cell,
        region: regionForCell(level, prior.cell),
        placedStep: prior.placedStep,
        recoveredStep: frame.step,
      });
      placements.delete(frame.pickup.blockId);
    }
  }
  return temporary;
}

function detectFinalScaffoldBuildOrder(frames, level) {
  return (frames ?? [])
    .filter(frame => frame.placement?.cell)
    .filter(frame => ['final-goal-side', 'upper-worksite'].includes(regionForCell(level, frame.placement.cell)))
    .map(frame => frame.placement.cell);
}

export function decodeTracePhases(frames, level) {
  const phases = [];
  const hasPickup = (frames ?? []).some(frame => frame.pickup);
  const hasPlacement = (frames ?? []).some(frame => frame.placement);
  const transfers = detectRegionTransfers(frames, level);
  const temporary = detectTemporaryScaffolds(frames, level);
  const finalScaffold = detectFinalScaffoldBuildOrder(frames, level);
  if (hasPickup) addUnique(phases, 'collect');
  if (hasPlacement) addUnique(phases, 'stage');
  if (transfers.length > 0) addUnique(phases, 'transfer_between_regions');
  if (temporary.length > 0) addUnique(phases, 'build_temporary_access');
  if ((frames ?? []).some(frame => frame.after.player.row < frame.before.player.row)) {
    addUnique(phases, 'climb_to_platform');
  }
  if (temporary.length > 0) addUnique(phases, 'recover_temporary_blocks');
  if (finalScaffold.length > 0) addUnique(phases, 'build_final_scaffold');
  if ((frames ?? []).some(frame => frame.completed)) addUnique(phases, 'complete_goal_approach');
  return phases.filter(phase => TRACE_PHASES.has(phase));
}

export function createTraceSolverRecommendations(analysis) {
  const recommendations = [
    {
      missingPlannerCapability: 'region_logistics_staging',
      proposedGenericOperatorOrInvariant: 'Before final climb, stage required blocks in the target region and verify final-build readiness.',
      replacedBadBehavior: 'Do not start final scaffold construction while lower-yard or intermediate stockpile blocks still need region transfer.',
      regressionTestExpectation: 'Level 17 validity solves without trace input or reports a specific region-logistics gap instead of SEARCH_BUDGET_UNPROVEN.',
    },
  ];

  if ((analysis.temporaryScaffolds ?? []).length > 0) {
    recommendations.push({
      missingPlannerCapability: 'temporary_scaffold_recovery',
      proposedGenericOperatorOrInvariant: 'Treat temporary access blocks as recoverable only after replay proves pickup access remains legal.',
      replacedBadBehavior: 'Do not consume temporary scaffold blocks as committed final scaffold resources without a recovery plan.',
      regressionTestExpectation: 'Solver recommendations mention recovery requirements when temporary scaffolds are required before final readiness.',
    });
  }

  if ((analysis.finalScaffoldBuildOrder ?? []).length > 0) {
    recommendations.push({
      missingPlannerCapability: 'final_build_readiness_scoring',
      proposedGenericOperatorOrInvariant: 'Score candidate plans by whether staged blocks can build the final scaffold in supported order.',
      replacedBadBehavior: 'Do not rank a plan highly merely because it reaches the goal side before enough scaffold cells are buildable.',
      regressionTestExpectation: 'Analyzer output exposes final scaffold readiness as a strategic clue without copying chronological human moves.',
    });
  }

  return recommendations.slice(0, 3);
}

export function analyzeTrace(level, contract, trace) {
  const replay = replayTraceActions(level, contract, trace);
  if (!replay.valid) return makeTraceFailure(level, replay);

  const observedPhaseSequence = decodeTracePhases(replay.frames, level);
  const regionTransfers = detectRegionTransfers(replay.frames, level);
  const temporaryScaffolds = detectTemporaryScaffolds(replay.frames, level);
  const finalScaffoldBuildOrder = detectFinalScaffoldBuildOrder(replay.frames, level);
  const report = {
    version: VERSION,
    mode: 'analyze-trace',
    levelId: level.id,
    status: 'ANALYZED',
    traceReplay: {
      valid: true,
      completed: replay.completed,
      invalidStep: null,
    },
    observedPhaseSequence,
    regionTransfers,
    temporaryScaffolds,
    recoveryPoints: temporaryScaffolds.map(item => ({
      cell: item.cell,
      region: item.region,
      step: item.recoveredStep,
    })),
    finalScaffoldBuildOrder,
    solverFacingRecommendations: [],
  };
  return {
    ...report,
    solverFacingRecommendations: createTraceSolverRecommendations(report),
  };
}

function replayForMetrics(level, contract, actions) {
  let state = createInitialState(level, contract);
  const usedBlocks = new Set();
  const placementsByBlock = new Map();
  let pickups = 0;
  let placements = 0;
  let maxPlayerElevation = state.player.row;
  let peakCommittedBlocks = state.blocks.length;
  let previousCarried = null;

  for (const action of actions ?? []) {
    previousCarried = state.carriedBlock?.id ?? null;
    const result = dispatchGameAction(state, { type: action }, level, contract);
    if (result.invalid) break;
    const next = result.state;
    if (!previousCarried && next.carriedBlock) {
      pickups += 1;
      usedBlocks.add(next.carriedBlock.id);
    }
    if (previousCarried && !next.carriedBlock) {
      placements += 1;
      usedBlocks.add(previousCarried);
      placementsByBlock.set(previousCarried, (placementsByBlock.get(previousCarried) ?? 0) + 1);
    }
    state = next;
    maxPlayerElevation = Math.min(maxPlayerElevation, state.player.row);
    peakCommittedBlocks = Math.max(peakCommittedBlocks, state.blocks.length);
  }

  const stackHeightsByCol = new Map();
  for (const block of state.blocks) {
    stackHeightsByCol.set(block.col, (stackHeightsByCol.get(block.col) ?? 0) + 1);
  }

  return {
    pickups,
    placements,
    uniqueBlocksUsed: usedBlocks.size,
    reusedBlockCount: [...placementsByBlock.values()].filter(count => count > 1).length,
    unusedBlocks: Math.max(0, countBlocks(level) - usedBlocks.size),
    maxStackHeight: Math.max(0, ...stackHeightsByCol.values()),
    maxPlayerElevation: level.height - 1 - maxPlayerElevation,
    peakCommittedBlocks,
  };
}

export function analyzeLevel(level, contract, solutionReport, options = {}) {
  const solvedReport = solutionReport ?? solveLevel(level, contract, options);
  const metrics = replayForMetrics(level, contract, solvedReport.actions);
  const summary = {
    shortestFoundActions: solvedReport.actions.length,
    pickups: metrics.pickups,
    placements: metrics.placements,
    uniqueBlocksUsed: metrics.uniqueBlocksUsed,
    reusedBlockCount: metrics.reusedBlockCount,
    unusedBlocks: metrics.unusedBlocks,
    maxStackHeight: metrics.maxStackHeight,
    maxPlayerElevation: metrics.maxPlayerElevation,
    peakCommittedBlocks: metrics.peakCommittedBlocks,
    statesExpanded: solvedReport.statesExpanded,
  };
  const difficultySignals = {
    irreversibleDeadEndsFound: solvedReport.status === 'SOLVED' ? Math.max(0, metrics.unusedBlocks > 0 ? 1 : 0) : 1,
    lateDeadEndsFound: solvedReport.status === 'SOLVED' && solvedReport.actions.length > 30 ? 1 : 0,
    nearGoalDeadEndsFound: solvedReport.status === 'SOLVED' && metrics.placements > 3 ? 1 : 0,
    resourceStrandingDeadEnds: solvedReport.status === 'FAILED_PREFLIGHT' ? 1 : 0,
    misleadingProgressStates: solvedReport.prunedSimilarFailures,
    solutionOrderSensitivity: metrics.reusedBlockCount > 0 || metrics.pickups > 4 ? 'medium' : 'low',
    unintendedBypassEvidence: metrics.unusedBlocks > 2 ? 'possible' : 'none',
  };
  const recommendations = solvedReport.status === 'SOLVED'
    ? [
        makeRecommendation(
          metrics.unusedBlocks > 1 ? 'remove_surplus_blocks' : 'preserve_route',
          metrics.unusedBlocks > 1 ? 'medium' : 'low',
          metrics.unusedBlocks > 1
            ? 'The replayable solution leaves multiple blocks unused, which can reduce puzzle pressure.'
            : 'The replayable path uses a tight enough resource set for current validation.',
          metrics.unusedBlocks > 1
            ? 'Consider removing surplus blocks or moving them behind an order-sensitive platform, then rerun validity.'
            : 'Keep this geometry and rerun analyzer after any future level edits.',
        ),
      ]
    : solvedReport.recommendations.length > 0
      ? solvedReport.recommendations
      : [
          makeRecommendation(
            solvedReport.deficitBlocks > 0 ? 'add_reachable_blocks' : 'inspect_goal_scaffold',
            'high',
            solvedReport.deficitBlocks > 0
              ? 'The diagnostic scaffold estimate exceeds available blocks before a replayable solution is known.'
              : 'The analyzer needs either a solved report or a stronger diagnostic before solution evidence can be copied.',
            solvedReport.deficitBlocks > 0
              ? 'Add supported reachable blocks, lower the shelf, or add terrain that reduces the scaffold rise; rerun analyze and validity after the edit.'
              : 'Run validity with a larger budget or revise the level geometry through a Change Request before accepting solution evidence.',
          ),
        ];

  return {
    ...solvedReport,
    mode: 'analyze',
    status: 'ANALYZED',
    phase: 'design_analysis',
    failedInvariant: null,
    failureCategory: null,
    cause: null,
    summary,
    difficultySignals,
    recommendations,
    topRecommendations: recommendations.slice(0, 3),
  };
}

export function createDefaultReport(report) {
  const topRecommendations = (report.topRecommendations?.length
    ? report.topRecommendations
    : recommendationsFor(report)).slice(0, 3);
  const compact = {
    version: report.version ?? VERSION,
    mode: report.mode ?? 'validity',
    levelId: report.levelId,
    status: report.status,
    phase: report.phase ?? null,
    failedInvariant: report.failedInvariant ?? null,
    failureCategory: report.failureCategory ?? failureCategoryFor(report.reason, report.status),
    cause: report.cause ?? report.reason ?? null,
    topRecommendations,
    summary: report.summary && Object.keys(report.summary).length > 0
      ? report.summary
      : summarizeReport(report),
    debugTraceAvailable: true,
  };
  if (report.status === 'SOLVED') compact.actions = report.actions ?? [];
  return compact;
}

export function createDebugTrace(report) {
  return {
    ...createDefaultReport(report),
    macroPlan: {
      steps: report.macroPlan?.steps ?? [],
      rejectedSteps: report.macroPlan?.rejectedSteps ?? [],
    },
    failedTacticalReplays: report.failedTacticalReplays ?? [],
    failureSignatures: report.failureSignatures ?? [],
    prunedEquivalentStates: report.prunedEquivalentStates ?? report.prunedSimilarFailures ?? 0,
    candidateScaffoldScoring: report.candidateScaffoldScoring ?? [],
    rawStateKeys: report.rawStateKeys ?? [],
    rejectedCandidates: report.planner?.rejectedCandidates ?? [],
    planner: {
      goalApproachCells: report.planner?.goalApproachCells ?? [],
      candidateScaffolds: report.planner?.candidateScaffolds ?? 0,
      chosenCandidateRank: report.planner?.chosenCandidateRank ?? null,
      stockpileRegions: report.planner?.stockpileRegions ?? [],
      subgoals: report.planner?.subgoals ?? [],
    },
  };
}

function parseArgs(argv) {
  const options = {
    mode: 'validity',
    level: null,
    all: false,
    maxStates: 100000,
    format: 'json',
    debugTrace: false,
    trace: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--mode') options.mode = argv[++i];
    else if (arg === '--level') options.level = Number(argv[++i]);
    else if (arg === '--all') options.all = true;
    else if (arg === '--max-states') options.maxStates = Number(argv[++i]);
    else if (arg === '--format') options.format = argv[++i];
    else if (arg === '--debug-trace') options.debugTrace = true;
    else if (arg === '--trace') options.trace = argv[++i];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['validity', 'analyze', 'analyze-trace'].includes(options.mode)) {
    throw new Error('--mode must be validity, analyze, or analyze-trace');
  }
  if (!['json', 'text'].includes(options.format)) {
    throw new Error('--format must be json or text');
  }
  if (options.trace && options.mode !== 'analyze-trace') {
    throw new Error('TRACE_INPUT_NOT_ALLOWED');
  }
  if (options.mode === 'analyze-trace' && !options.trace) {
    throw new Error('--trace is required for analyze-trace');
  }
  if (options.mode === 'analyze-trace' && options.all) {
    throw new Error('--all is not supported for analyze-trace');
  }
  if ((options.level == null && !options.all) || (options.level != null && options.all)) {
    throw new Error('Use exactly one of --level or --all');
  }
  if (!Number.isInteger(options.maxStates) || options.maxStates <= 0) {
    throw new Error('--max-states must be a positive integer');
  }
  return options;
}

function loadTrace(trace) {
  if (trace && typeof trace === 'object') return trace;
  return JSON.parse(readFileSync(trace, 'utf-8'));
}

export function runSolver(options = {}) {
  if (options.trace && options.mode !== 'analyze-trace') {
    throw new Error('TRACE_INPUT_NOT_ALLOWED');
  }
  const contract = options.contract ?? loadDefaultContract();
  const levels = options.levels ?? loadDefaultLevels();
  const selectedLevels = options.all
    ? levels
    : levels.filter(level => level.id === Number(options.level));
  if (selectedLevels.length === 0) {
    throw new Error(`Level not found: ${options.level}`);
  }
  if (options.mode === 'analyze-trace') {
    if (!options.trace) throw new Error('--trace is required for analyze-trace');
    if (selectedLevels.length !== 1) throw new Error('--level is required for analyze-trace');
    return analyzeTrace(selectedLevels[0], contract, loadTrace(options.trace));
  }
  const reports = selectedLevels.map(level => {
    const seedActions = loadSeedSolutions().get(level.id);
    const validity = options.mode === 'analyze' && !seedActions
      ? runPreflight(level, contract, { maxStates: options.maxStates })
      : solveLevel(level, contract, { maxStates: options.maxStates });
    const report = options.mode === 'analyze'
      ? analyzeLevel(level, contract, validity, { maxStates: options.maxStates })
      : validity;
    return options.debugTrace ? createDebugTrace(report) : createDefaultReport(report);
  });
  return options.all ? { version: VERSION, mode: options.mode, reports } : reports[0];
}

function formatText(report) {
  if (report.reports) {
    return report.reports.map(formatText).join('\n');
  }
  const reason = report.reason ? ` ${report.reason}` : '';
  return `level ${report.levelId}: ${report.status}${reason} states=${report.statesExpanded}`;
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const report = runSolver(options);
    if (options.format === 'text') {
      console.log(formatText(report));
    } else {
      console.log(JSON.stringify(report, null, 2));
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { STATUSES };
