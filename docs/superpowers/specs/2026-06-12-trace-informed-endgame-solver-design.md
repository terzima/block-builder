# Trace-Informed Endgame Solver Design

Date: 2026-06-12
Status: Approved design

## Purpose

Levels 17-20 remain manually solvable but solver-unproven. The current solver now solves the required construction-ledger benchmarks and reaches level 16, so the remaining failure is not basic scaffold construction. The failure is the endgame logistics pattern: multiple stockpiles, platform transfers, temporary access, block recovery, and staging before final construction.

The next solver pass should be a planner reset, not a rewrite. It should keep engine-backed replay, canonical state keys, compact reporting, debug traces, and replay fixtures. It should replace the current single-scaffold planning bias with region-aware logistics planning.

Manual traces should be added as evidence and diagnostics, not as solver instructions. A trace can prove a level is solvable, preserve a human solution, and reveal missing generic planner concepts. The default validity solver must not read level-specific manual traces during normal solving.

## Recommended Approach

Use a trace-informed planner reset:

- add lightweight manual trace recording;
- replay-validate traces before accepting them as evidence;
- analyze traces into generic macro phases;
- implement planner improvements as reusable operators and scoring rules;
- use level 17 as the first endgame benchmark;
- preserve anti-overfit gates so no level-specific action list enters the solver.

This avoids another blind heuristic pass while preserving the useful solver scaffolding already built.

## Manual Trace Recorder

The recorder is dev-facing and lives in the frontend/debug layer, not the engine.

Recording flow:

1. User opens a level.
2. User presses `Record`.
3. Recorder starts an empty trace for the current level.
4. Every valid gameplay action appends to the trace.
5. When `state.status === "completed"`, recording stops automatically.
6. The completed trace is replay-validated.
7. The UI attempts to copy the JSON automatically.
8. If clipboard copy fails, the UI keeps the JSON visible and selectable with Copy and Download controls.

Reset, undo, or level change while recording invalidates and stops the trace. The trace used for solution evidence should be forward-only.

Invalid actions are not included in the solution action list. They may be counted separately for diagnostics.

## Trace Format

The standalone trace export may include metadata:

```json
{
  "version": "0.1.0",
  "levelId": 17,
  "source": "manual-trace",
  "actions": ["moveRight", "jump", "interact"],
  "startedAt": "2026-06-12T00:00:00.000Z",
  "completedAt": "2026-06-12T00:04:00.000Z",
  "invalidActionCount": 0
}
```

The durable solution fixture entry remains simple:

```json
{
  "levelId": 17,
  "actions": ["moveRight", "jump", "interact"],
  "note": "Manual trace recorded from local gameplay."
}
```

`tests/fixtures/level_solutions.json` remains the canonical durable solution-evidence fixture.

## Replay Validation

A recorded trace is accepted only when:

- every action is in the legal action vocabulary;
- replay starts from `createInitialState(...)`;
- every action replays through `dispatchGameAction(...)` without `invalid: true`;
- final state is `completed`;
- no `undo`, `reset`, or level-change action appears in the accepted solution trace.

Trace capture does not change game physics, engine action semantics, or the runtime API.

## Trace Macro Analyzer

The analyzer reads replay-valid traces and compresses them into design-facing macro phases.

Expected phase categories:

- collect blocks;
- stage blocks in a region;
- build temporary access;
- climb to platform;
- recover temporary blocks;
- transfer blocks between regions;
- build final scaffold;
- complete goal approach.

Example output:

```json
{
  "levelId": 17,
  "macroPhases": [
    { "type": "collect", "region": "ground-left", "actions": 18 },
    { "type": "stage", "from": "ground-left", "to": "right-platform", "blocks": 4 },
    { "type": "finalScaffold", "blocksCommitted": 9 }
  ],
  "plannerGaps": ["missing_transfer_goal", "missing_recovery_check"]
}
```

The analyzer output is not an executable solver script. Its job is to answer what a successful human solution did structurally that the current solver cannot yet model.

## Region Logistics Planner

The next solver planner should keep the current engine-backed action certification and add a region model.

Required concepts:

- platform/yard regions derived from terrain and reachable surfaces;
- stockpile classification per region;
- free, covered, supporting, staged, temporary, committed, and stranded block classes;
- transfer goals such as “stage N blocks from region A to region B”;
- temporary access scaffolds with explicit recovery checks;
- final-build readiness checks before committing final scaffold blocks.

The solver should stop asking only “which scaffold cell should I fill next?” It should first ask “where do resources need to be staged so the final scaffold can be built without losing access?”

## Anti-Overfit Rules

Manual traces are not default solver guidance.

The solver must not:

- read manual trace files in normal validity mode;
- hardcode per-level raw action arrays;
- hardcode level-specific board mutations;
- report success from a macro-only plan that cannot replay through the engine.

Planner behavior learned from a trace must become a generic operator, invariant, or scoring rule. If level 17 solves only when the trace is present, the solver still fails this design.

## Testing Strategy

Trace recorder gates:

- pressing Record starts an empty trace for the current level;
- completing the level stops recording automatically;
- completed trace contains only valid forward gameplay actions;
- clipboard copy is attempted;
- copy fallback keeps JSON visible and selectable;
- download produces valid JSON;
- reset, undo, or level change invalidates the trace.

Replay gates:

- a recorded trace for a small known level replays through the JS harness;
- a manually exported trace can be converted into a `level_solutions.json` entry;
- solution evidence remains separate from served API level data.

Analyzer gates:

- analyzer reports action count, pickups, placements, regions touched, staged blocks, temporary blocks used and recovered, and final scaffold commitment point;
- output is compact and design-facing;
- planner gaps map to concrete generic solver levers.

Planner reset gates:

- existing benchmark levels 10, 13, and 14 remain `SOLVED`;
- level 16 remains `SOLVED`;
- level 17 becomes the first endgame benchmark and must return `SOLVED` with replayable raw actions;
- at least one of levels 18-20 should produce either `SOLVED` or a precise planner-gap diagnostic useful for the next CR.

## Success Criteria

- Manual trace capture is easy to use: press Record, play, complete level, trace is copied or visibly available.
- Recorded traces replay before they are trusted.
- Trace analysis identifies missing generic solver operators without becoming a level-specific solver.
- The planner gains explicit region, staging, transfer, temporary recovery, and final-readiness concepts.
- Level 17 is solved by the default solver without reading a trace.
- No new dependencies, network access, production runtime solver, or engine-physics shortcuts are introduced.
