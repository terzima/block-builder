/**
 * Local progress read/write.
 * Keys derive from contract.storageKeys — no hardcoded storage keys.
 * All functions are safe: parse failures return empty progress without throwing.
 */

const EMPTY_PROGRESS = Object.freeze({
  version: '0.1.0',
  completedLevels: [],
  bestMoves: {},
  lastLevelId: null,
});

/** Returns a fresh empty progress object. */
function emptyProgress() {
  return {
    version: EMPTY_PROGRESS.version,
    completedLevels: [],
    bestMoves: {},
    lastLevelId: null,
  };
}

/**
 * Loads persisted progress from storage, returning an empty object on any
 * parse or shape error.
 *
 * @param {object} contract - validated app contract
 * @param {Storage} [storage]
 * @returns {object} progress object
 */
export function loadProgress(contract, storage = localStorage) {
  try {
    const raw = storage.getItem(contract.storageKeys.progress);
    if (!raw) return emptyProgress();
    const p = JSON.parse(raw);
    if (
      !Array.isArray(p.completedLevels) ||
      typeof p.bestMoves !== 'object' ||
      p.bestMoves === null
    ) {
      return emptyProgress();
    }
    return p;
  } catch {
    return emptyProgress();
  }
}

/**
 * Writes progress to storage, silently ignoring storage failures (e.g.
 * private browsing mode quota exceeded).
 *
 * @param {object} contract
 * @param {object} progress
 * @param {Storage} [storage]
 */
export function saveProgress(contract, progress, storage = localStorage) {
  try {
    storage.setItem(contract.storageKeys.progress, JSON.stringify(progress));
  } catch {
    // Storage unavailable — do not throw
  }
}

/**
 * Records a level completion into stored progress:
 * - Adds levelId to completedLevels if not already present.
 * - Updates bestMoves[levelId] if this run was better.
 * - Updates lastLevelId.
 * Saves and returns the updated progress.
 *
 * @param {object} contract
 * @param {{ levelId: number, moves: number }} state - RuntimeState
 * @param {Storage} [storage]
 * @returns {object} updated progress
 */
export function recordCompletion(contract, state, storage = localStorage) {
  const progress = loadProgress(contract, storage);
  const { levelId, moves } = state;

  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
  }

  const prev = progress.bestMoves[levelId];
  if (prev === undefined || moves < prev) {
    progress.bestMoves[levelId] = moves;
  }

  progress.lastLevelId = levelId;
  saveProgress(contract, progress, storage);
  return progress;
}
