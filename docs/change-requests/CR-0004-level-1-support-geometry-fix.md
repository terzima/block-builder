# CR-0004: Level 1 Support Geometry Fix

Status: Accepted
Owner: Project owner
Created: 2026-06-11
Related spec: `docs/specs/SPEC-0004-level-expansion-pipeline.md`
Related plan: `docs/plans/PLAN-0004-level-expansion-pipeline.md`

## Trigger

PLAN-0004 implementation revealed that the accepted first-playable level 1 cannot pass the new SPEC-0004 raw initial-state support invariant.

After adding the planned `LEVEL_INITIAL_STATE_UNSTABLE` validation and appending candidate levels 6-20, the canonical validator fails with:

```text
LEVEL_INITIAL_STATE_UNSTABLE: Level 1 has unsupported 'B' at row 3, col 3.
```

Level 1 is part of the accepted first-playable baseline. It currently relies on existing engine gravity to settle one raw block before play.

## Current accepted spec/plan says

SPEC-0004 says every raw `P` and `B` cell must be directly supported by `#` or `B` before initial engine gravity runs.

PLAN-0004 also says implementation must preserve existing level objects for IDs 1-5 byte-for-byte unless first-playable A2 feedback has an accepted Change Request.

These two requirements conflict for level 1.

## Proposed change

Fix level 1's raw geometry so it satisfies SPEC-0004's initial support invariant instead of exempting accepted levels from the rule.

Update `backend/app/data/levels.json` level 1 from:

```json
[
  "########",
  "#......#",
  "#......#",
  "#..B...#",
  "#P...G.#",
  "########"
]
```

to:

```json
[
  "########",
  "#......#",
  "#......#",
  "#......#",
  "#P.B.G.#",
  "########"
]
```

This moves the raw block from row 3, col 3 to row 4, col 3, which is the same position the existing engine gravity settles it into before play. The level remains a first tutorial puzzle and does not introduce new mechanics.

## Why this is necessary

The current accepted plan cannot complete cleanly because it requires both preserving level 1 and rejecting level 1. Level 1's raw grid is genuinely broken under the accepted geometry invariant, even though runtime gravity masks it. Fixing the source grid is safer than adding a validation exemption because it keeps canonical data honest and preserves the current settled runtime layout.

## Impact

- Scope: Narrow level 1 geometry correction only; no new gameplay mechanics or level replacement.
- Files: `backend/app/data/levels.json`, `tests/fixtures/level_solutions.json` if the level 1 solution trace changes, `docs/status/CURRENT_STATE.md`, and this CR. SPEC-0004 and PLAN-0004 do not need to weaken the raw-support invariant.
- Tests: canonical level validation should pass with `LEVEL_INITIAL_STATE_UNSTABLE` still enforced for all levels.
- Docs: update CURRENT_STATE to note PLAN-0004 is blocked pending CR-0004 decision.
- Dependencies: none.
- Security/privacy: none.
- Token/context impact: small; follow-on implementation can resume from PLAN-0004 with this exact level 1 edit.
- Timeline/PR size: small; avoids creating a validation carve-out.

## Options considered

1. Accept: fix level 1's raw geometry by moving the block to its settled supported position.
2. Reject: preserve level 1 byte-for-byte and weaken validation with an exemption for accepted levels 1-5.
3. Defer: pause level expansion until the first five levels are revised under a new spec or change request.

## Recommendation

Accept.

## Decision

Decision: Accepted
Date: 2026-06-11
Rationale: The project owner directed that level 1 should be fixed rather than allowed to pass with broken geometry. The exact grid change preserves the existing settled runtime layout while making canonical source data satisfy the raw-support invariant.
