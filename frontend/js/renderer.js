/**
 * DOM renderer — converts runtime state into DOM nodes.
 * Operates only on elements passed in; no document.getElementById calls here.
 */

/**
 * Determines the display tile type for a grid cell.
 * Priority: player > block > goal > terrain
 *
 * @param {number} row
 * @param {number} col
 * @param {object} state - RuntimeState
 * @param {object} parsedLevel - ParsedLevel with terrain
 * @returns {'player'|'block'|'goal'|'wall'|'empty'}
 */
function tileType(row, col, state, parsedLevel) {
  if (state.player.row === row && state.player.col === col) {
    return 'player';
  }
  if (state.blocks.some(b => b.row === row && b.col === col)) {
    return 'block';
  }
  if (state.goal.row === row && state.goal.col === col) {
    return 'goal';
  }
  if (parsedLevel.terrain[row][col] === '#') {
    return 'wall';
  }
  return 'empty';
}

/**
 * Renders the game board into boardEl.
 * Clears and rebuilds all cell divs on each call.
 *
 * @param {HTMLElement} boardEl - element with role="grid"
 * @param {object} state - RuntimeState
 * @param {object} parsedLevel - ParsedLevel (terrain, width, height)
 */
export function renderBoard(boardEl, state, parsedLevel) {
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = `repeat(${parsedLevel.width}, 1fr)`;
  boardEl.setAttribute('aria-rowcount', parsedLevel.height);
  boardEl.setAttribute('aria-colcount', parsedLevel.width);

  const carrying = state.carriedBlock !== null;

  for (let r = 0; r < parsedLevel.height; r++) {
    for (let c = 0; c < parsedLevel.width; c++) {
      const tile = tileType(r, c, state, parsedLevel);
      const cell = document.createElement('div');
      cell.className = `cell cell-${tile}`;
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('data-row', r);
      cell.setAttribute('data-col', c);
      cell.setAttribute('data-tile', tile);

      // Player-specific: directional indicator and carry state
      if (tile === 'player') {
        cell.setAttribute('data-facing', state.facing);
        if (carrying) {
          cell.classList.add('cell-player-carrying');
          cell.setAttribute('data-carry-side', state.facing);
        }
      }

      boardEl.appendChild(cell);
    }
  }
}

/**
 * Updates the HUD elements.
 *
 * @param {HTMLElement} movesEl - #moves-count
 * @param {HTMLElement|null} carriedEl - #carried-state
 * @param {object} state - RuntimeState
 */
export function renderHud(movesEl, carriedEl, state) {
  movesEl.textContent = state.moves;
  if (carriedEl) {
    carriedEl.textContent = state.carriedBlock ? 'Carrying a block' : '';
    carriedEl.setAttribute('aria-live', 'polite');
  }
}

/**
 * Populates the level selector with metadata options.
 *
 * @param {HTMLSelectElement} selectEl - #level-select
 * @param {object[]} levels - level metadata array from listLevels()
 * @param {number|null} currentLevelId
 */
export function renderLevelSelect(selectEl, levels, currentLevelId) {
  selectEl.innerHTML = '';
  for (const lvl of levels) {
    const opt = document.createElement('option');
    opt.value = lvl.id;
    opt.textContent = `Level ${lvl.id}: ${lvl.title}`;
    opt.selected = lvl.id === currentLevelId;
    selectEl.appendChild(opt);
  }
}

/**
 * Populates and reveals the completion dialog.
 *
 * @param {HTMLElement} dialogEl - #completion-dialog
 * @param {HTMLElement} titleEl - #completion-title
 * @param {HTMLElement} summaryEl - #completion-summary
 * @param {object} state - RuntimeState
 * @param {number|undefined} bestMoves - best recorded move count (optional)
 */
export function renderCompletion(dialogEl, titleEl, summaryEl, state, bestMoves) {
  titleEl.textContent = 'Level Complete!';
  const moves = state.moves;
  let summary = `Finished in ${moves} move${moves !== 1 ? 's' : ''}.`;
  if (bestMoves !== undefined && bestMoves < moves) {
    summary += ` Best: ${bestMoves}.`;
  } else if (bestMoves !== undefined && bestMoves === moves) {
    summary += ' New best!';
  }
  summaryEl.textContent = summary;
  dialogEl.hidden = false;
}
