# CR-0010: Construction Ledger Solver Remediation

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`
Related design: `docs/superpowers/specs/2026-06-11-construction-ledger-solver-design.md`
Related handoff: `docs/handoff/HANDOFF-0007-cr-0009-level-13-solver.md`
Related change requests: `docs/change-requests/CR-0007-deterministic-solver-and-design-analyzer.md`, `docs/change-requests/CR-0009-physics-certified-macro-solver.md`
Approval class: A2

## Trigger

CR-0009 correctly moved the project away from raw-action-first Level 13 search and toward physics-certified macro construction. The first implementation attempt preserved useful scaffolding, including `tools/solve-levels.mjs`, solver CLI flags, layered default output, `--debug-trace`, macro helper exports, state keys, failure categories, and replay-based proof boundaries.

However, current canonical Level 13 still does not produce replayable solver evidence:

```bash
node tools/solve-levels.mjs --mode validity --level 13 --max-states 1000000 --format json
```

Current result: `UNSOLVABLE_EXHAUSTED`, `failureCategory=TACTICAL_REPLAY_FAILED`, `failedInvariant=current_level_13_solves_with_macro_replay`, and `statesExpanded=1000000`.

The project owner has manually confirmed all current levels 1-20 are solvable, including Level 13 in roughly 230 moves. `HANDOFF-0007` also shows the current solver can reach much of the final Level 13 scaffold but fails the resource-logistics strategy: it consumes or strands blocks that must remain available for late carry-up. This means the remaining failure is a solver-strategy gap, not a level-geometry issue.

The deeper correction is that the solver must not be treated as ordinary pathfinding from `P` to `G`. It must solve a deterministic board-state transformation problem: can legal game actions transform the whole state until the player occupies `G`? Level 13 is the first blocking benchmark, but the objective of this CR is a reusable solver base that can also prove and analyze additional construction levels.

## Current accepted spec/plan says

`SPEC-0004` and `PLAN-0004` currently require:

- deterministic, no-dependency solver/analyzer tooling;
- current canonical Level 13 to return `SOLVED` with a replayable raw action list;
- macro planning that can reason about scaffold targets, work platforms, recoverable temporary blocks, and final approach structures;
- raw `moveLeft`, `moveRight`, `jump`, and `interact` replay through `dispatchGameAction(...)` as the final proof for every accepted macro;
- exact-state deduplication, failure-signature pruning, layered solver reporting, and `--debug-trace` diagnostics.

The accepted language is directionally correct but still leaves implementation room to keep a raw-search core with macro labels around it. It does not require a concrete construction ledger, reservation semantics, ledger dominance rules, or a Level 13 strategy that preserves a late carry-up-capable block before committing the upper scaffold. It also does not clearly require the same solver architecture to run against multiple current construction levels after Level 13 passes.

## Objectives

- Build the solver on the existing game engine transition contract, not on a separate approximate physics model.
- Treat solving as deterministic state-space search over the whole board state: player position, facing direction, carried-block state, sorted uncarried block positions, goal occupancy, and gravity-settled terrain.
- Keep blocks identical for canonicalization. Solver state keys must not depend on persistent block identity permutations.
- Use the construction ledger to choose and order construction subgoals, while using exact engine replay to certify every accepted transition.
- Make current canonical Level 13 the first required construction benchmark, not the only benchmark.
- Require the hardened plan to select additional current canonical construction levels from levels 6-20 and prove that the same solver can run on them, or return compact actionable diagnostics without implying current geometry is invalid.
- Preserve design-facing analysis so solver success can still reveal unintended shortcuts, ignored stockpiles, suspiciously short completions, or scaffold usage that is weaker than the intended level design.

## Non-goals

- Do not introduce a production/runtime solver.
- Do not add solver dependencies, PDDL tooling, planner packages, or network-backed tools.
- Do not reimplement gameplay physics when `createInitialState(...)`, `dispatchGameAction(...)`, and the existing physics helpers can be used as the authority.
- Do not hardcode a raw Level 13 action fixture as the solver.
- Do not require the solver to prove every current level in this CR before PLAN-0004 can resume; require a representative multi-level benchmark set that demonstrates generalization beyond Level 13.

## Proposed change

Revise `SPEC-0004` and `PLAN-0004` to make the construction ledger the required solver abstraction. This supersedes only the CR-0007 and CR-0009 solver-strategy wording that conflicts with the ledger approach. It does not restart PLAN-0004, change level geometry, weaken replay proof, or discard the useful solver/reporting scaffolding already built.

Required solver architecture:

1. Preflight structural and resource checks continue to run first.
2. The solver creates the initial state with `createInitialState(...)`.
3. The solver expands only legal raw actions through `dispatchGameAction(...)`: `moveLeft`, `moveRight`, `jump`, and `interact`.
4. After every accepted action, the solver uses the engine-returned gravity-settled state, sorts uncarried block positions, normalizes carried state, and creates a canonical state key.
5. The solver treats invalid actions as non-progressing results that do not create new search states.
6. The solver derives world facts from settled canonical engine state: supported cells, reachable cells, platform regions, free blocks, covered blocks, supporting blocks, stockpile regions, and goal approach cells.
7. The strategic planner generates candidate construction ledgers instead of treating player-to-goal pathfinding as the problem.
8. The macro scheduler converts the selected ledger into ordered construction tasks.
9. The tactical executor uses BFS or a BFS-equivalent deterministic state-space search bounded to the current macro. The ledger may guide which macro to attempt, but only replayed engine actions may commit state.
10. A solution is `SOLVED` only when the flattened raw action list replays to level completion through the engine.

The construction ledger must explicitly track:

- `finalScaffoldCells`: supported final cells needed for the goal approach, ordered by construction phase.
- `stagingCells`: supported temporary cells used to gather or reposition blocks.
- `reservedBlocks`: canonical block-position selectors, stockpile-region reservations, or reserved block counts held for future tasks, including late carry-up. These reservations must not depend on stable block IDs because blocks are interchangeable for solver canonicalization.
- `temporaryCells`: cells that may be built and later recovered, with recovery preconditions.
- `committedCells`: final cells that must not be disturbed once placed.
- `workPlatforms`: cells the player must reach to continue construction.
- `requiredCarryUpBlocks`: blocks reserved for vertical delivery to a later work platform.
- `riskFlags`: compact named risks such as `PLAYER_TRAP_RISK`, `NEEDED_BLOCK_COVERED`, `TEMPORARY_BLOCK_NOT_RECOVERABLE`, and `RESERVED_BLOCK_CONSUMED`.

Level 13 must be solved as a reusable construction pattern, not a hardcoded raw action fixture. It is the first required gate because it is manually known solvable and currently blocks PLAN-0004, but it is not the whole objective. Its accepted ledger must demonstrate the key resource-logistics behavior:

- stage reachable shelf and yard blocks legally;
- build lower and middle scaffold supports in supported order;
- preserve at least one carry-up-capable block before committing the upper scaffold;
- carry that reserved block to the final upper placement through legal movement and placement actions;
- complete the goal approach with replayable raw actions.

After Level 13 solves, the same solver architecture must run against a representative additional benchmark set from current canonical levels 6-20. PLAN-0004 hardening must name the exact levels, but the set must include at least two non-Level-13 construction levels and at least one level that stresses staging, stockpile choice, vertical scaffold building, or temporary-block recovery. Non-solved results for these additional manually confirmed current levels must produce compact solver-improvement or design-analysis diagnostics rather than automatic geometry-change recommendations.

Ledger ranking and pruning must replace repeated-bad-plan behavior as the primary anti-loop mechanism. A ledger or partial ledger is dominated when it reaches no additional committed final cells, preserves no better reserved-block set, improves no staging or work-platform reachability, lowers no risk flag, and has no lower action cost than an already explored ledger. Existing exact-state deduplication and failure-signature pruning remain useful inside tactical replay and reporting, but they are not enough to prove construction-heavy levels by themselves.

Preserve the accepted layered reporting contract. Default output stays compact and design-facing. `--debug-trace` may add ledger candidates, selected ledger rank, dominated-ledger counts, macro steps, tactical replay failures, candidate scoring, and raw state keys.

Solver output must also support replay inspection:

- `actions`: flattened raw action list for every `SOLVED` result.
- `solutionLength`: count of emitted raw actions.
- `statesExpanded` or existing equivalent summary metric.
- `maxQueueSize` or existing equivalent frontier metric when available.
- Optional debug-only state-by-state text replay so a human can inspect whether the solver found a real solution, a physics bug, or an unintended shortcut.

Design-analysis output should report whether a solved route used or ignored intended construction resources, including picked-up block count, stockpile regions touched, final scaffold cells built, temporary blocks used/recovered, suspiciously short solution length, and final scaffold blocks used compared with the level's intended construction lower bound.

## Why this is necessary

PLAN-0004 cannot continue cleanly while current canonical Level 13 is manually solvable but solver-unproven. Repeating raw-action search or adding more macro helper names risks another implementation loop that exhausts budget without modeling the actual construction problem.

The missing product capability is not "more search" and not a separate planner dependency. The solver needs to reuse the existing game engine as its transition base, reason like a careful player who gathers resources, preserves blocks for later, builds scaffold cells in legal order, avoids trap states, and only commits progress once the real engine accepts it.

Without this change, implementation may keep treating free blocks as interchangeable in planning while still failing to canonicalize them as interchangeable in state search, rediscover the same failed plan shape, solve only Level 13 with one-off assumptions, or report a failure that is not actionable enough for future level design.

## Impact

- Scope: solver contract remediation for PLAN-0004; no current-level geometry changes are authorized.
- Files:
  - Update `docs/specs/SPEC-0004-level-expansion-pipeline.md`.
  - Update `docs/plans/PLAN-0004-level-expansion-pipeline.md`.
  - Continue implementation in `tools/solve-levels.mjs` after spec/plan hardening is accepted.
  - Continue tests in `tests/js/solver.test.js`.
  - Continue expectations in `tests/fixtures/level_solver_expectations.json`.
  - Update `docs/status/CURRENT_STATE.md`.
  - Update `docs/handoff/` only if the implementation remains blocked or needs restart context.
- Tests:
  - Add transition-contract tests or reuse existing engine tests for turn-only movement, diagonal jump, same-row interact, covered-block pickup rejection, unsupported placed-block gravity, `G` passability, and invalid actions not creating new search states.
  - Add canonical-state tests proving block identity permutations collapse to one key after gravity-settled replay.
  - Add ledger tests for reserved blocks, temporary recovery, committed cells, deterministic ranking, dominated-ledger pruning, and Level 13 carry-up reservation.
  - Add macro replay tests proving every accepted macro has replayable raw actions.
  - Keep Level 1 quick-solve and current canonical Level 13 `SOLVED` as required gates.
  - Add at least two additional current canonical levels from levels 6-20 to the solver benchmark set during PLAN-0004 hardening.
  - Keep default-output and `--debug-trace` reporting tests.
- Docs: harden `SPEC-0004`, harden `PLAN-0004`, and update `CURRENT_STATE`.
- Dependencies: none.
- Security/privacy: none.
- Token/context impact: medium; the solver contract becomes more explicit, but it should reduce future retry loops.
- Timeline/PR size: medium; this is a focused replacement of PLAN-0004 Task 4C/4D solver strategy, not a full level expansion restart.

## Options considered

1. Accept: harden `SPEC-0004` and `PLAN-0004` around an engine-backed canonical state-space solver plus construction-ledger planner while preserving existing CLI, reporting, replay, preflight, and test scaffolding.
2. Reject: continue with the current CR-0009 wording and risk another raw-search implementation that labels work as macros but does not reserve resources or solve Level 13.
3. Defer: rely on manual validation for Level 13 and continue fixture capture, leaving the future-level solver/design analyzer unable to prove known-solvable construction puzzles.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner accepted CR-0010 so SPEC-0004 and PLAN-0004 can be hardened around an engine-backed canonical state-space solver plus construction ledger. Level 13 remains the first blocking benchmark, and the hardened plan must also prove the same solver architecture on additional current construction levels.
