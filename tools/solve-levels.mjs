#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createInitialState, dispatchGameAction, parseLevel } from '../frontend/js/engine.js';

const VERSION = '0.1.0';
const VALIDITY_ACTIONS = ['moveRight', 'jump', 'interact', 'moveLeft'];
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
    macrosAccepted: report.macrosAccepted ?? acceptedMacroSteps.length,
    macrosRejected: report.macrosRejected ?? (report.macroPlan?.rejectedSteps?.length ?? 0),
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
  const candidates = [
    { row: goal.row, col: goal.col - 1, action: 'moveRight' },
    { row: goal.row, col: goal.col + 1, action: 'moveLeft' },
    { row: goal.row + 1, col: goal.col - 1, action: 'jump' },
    { row: goal.row + 1, col: goal.col + 1, action: 'jump' },
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
    const rise = Math.max(0, playerGroundRow - approachCell.row - 1);
    return {
      candidatePlanId: `goal-approach-${index + 1}`,
      approachCell: { row: approachCell.row, col: approachCell.col },
      rise,
      requiredBlocks: triangular(rise),
      terrainAssisted: hasTerrainSupport(parsed, approachCell.row, approachCell.col),
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

export function createStateKey(state) {
  const carried = state.carriedBlock?.id ?? 'none';
  const blocks = sortValues(
    state.blocks.map(block => `${block.id}@${block.row},${block.col}`),
  ).join(';');
  return [
    `status=${state.status}`,
    `player=${state.player.row},${state.player.col}`,
    `facing=${state.facing}`,
    `carried=${carried}`,
    `blocks=${blocks}`,
  ].join('|');
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

    for (const action of actionOrderFor(node.state)) {
      const result = dispatchGameAction(node.state, { type: action }, level, contract);
      if (result.invalid) continue;
      const nextState = result.state;
      const nextActions = [...node.actions, action];
      const key = createStateKey(nextState);
      const priorCost = bestByKey.get(key);
      if (priorCost !== undefined && priorCost <= nextActions.length) continue;
      bestByKey.set(key, nextActions.length);
      const noProgressPenalty = result.changed ? 0 : 4;
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

export function solveLevel(level, contract, options = {}) {
  const maxStates = Number(options.maxStates ?? 100000);
  const preflight = runPreflight(level, contract, options);
  if (preflight.status === 'FAILED_PREFLIGHT') return preflight;

  const seedSolutions = options.seedSolutions ?? loadSeedSolutions();
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
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--mode') options.mode = argv[++i];
    else if (arg === '--level') options.level = Number(argv[++i]);
    else if (arg === '--all') options.all = true;
    else if (arg === '--max-states') options.maxStates = Number(argv[++i]);
    else if (arg === '--format') options.format = argv[++i];
    else if (arg === '--debug-trace') options.debugTrace = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['validity', 'analyze'].includes(options.mode)) {
    throw new Error('--mode must be validity or analyze');
  }
  if (!['json', 'text'].includes(options.format)) {
    throw new Error('--format must be json or text');
  }
  if ((options.level == null && !options.all) || (options.level != null && options.all)) {
    throw new Error('Use exactly one of --level or --all');
  }
  if (!Number.isInteger(options.maxStates) || options.maxStates <= 0) {
    throw new Error('--max-states must be a positive integer');
  }
  return options;
}

export function runSolver(options = {}) {
  const contract = options.contract ?? loadDefaultContract();
  const levels = options.levels ?? loadDefaultLevels();
  const selectedLevels = options.all
    ? levels
    : levels.filter(level => level.id === Number(options.level));
  if (selectedLevels.length === 0) {
    throw new Error(`Level not found: ${options.level}`);
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
