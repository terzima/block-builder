# PLAN-XXXX: Title

Status: Draft | Accepted | Completed | Superseded
Maturity: M3 | M4
Owner: Unassigned
Created: YYYY-MM-DD
Updated: YYYY-MM-DD
Related spec: `docs/specs/SPEC-XXXX-title.md`
Related ADRs: None
Related Change Requests: None

> Template note: delete guidance text before acceptance. Reference `AGENTS.md` for repo-wide policy; keep this plan focused on exact implementation details.

**Goal:** One sentence describing the implemented outcome.

**Architecture:** 2-4 sentences naming boundaries, data flow, and why this shape is safe.

**Tech stack:** Existing runtime/libraries and any approved additions.

## Preconditions

- [ ] Spec is accepted.
- [ ] Worktree/branch state is understood.
- [ ] Required approvals are already granted or explicitly listed as stop points.

## File structure

- Create: `path/to/file` - responsibility.
- Modify: `path/to/file` - exact reason.
- Read first: `path/to/file` - why.

## Contracts to implement

List exact interfaces the worker must preserve or create.

- Function/class signatures:
- API routes and response shapes:
- Data/schema examples:
- Config/env keys:
- Error codes/messages:

## Tasks

### Task 0: Preflight

**Files:** None

- [ ] Run:

```bash
git status --short
```

- [ ] Confirm accepted scope and note any pre-existing dirty files.

### Task 1: Component Name

**Files:**

- Create/Modify/Test:

- [ ] Write or update the focused failing test/fixture.
- [ ] Run the smallest relevant check and confirm expected failure.
- [ ] Implement the minimal scoped change.
- [ ] Run the focused check and confirm pass.
- [ ] Update docs only if behavior or commands changed.

## Validation

```bash
git status --short
```

Add exact lint/typecheck/test/build commands with expected pass conditions. Include filtered commands for noisy outputs.

## Documentation updates

- Doc update:

## Rollback plan

State the smallest safe revert path.

## Risks

- Risk:
  - Mitigation:

## Stop conditions

- Stop if:
