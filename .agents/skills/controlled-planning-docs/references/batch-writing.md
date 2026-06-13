# Batch Writing Reference

Use for `docs/plans/batches/BATCH-*.md`.

## Purpose

A batch groups already-written specs and plans for execution. It should be concise. It is not a replacement for either the spec or the plan.

## Required Shape

- Status, approval class, batch type, user-testable flag, human gate flag.
- Purpose: why these specs/plans belong together.
- Included work table: spec, plan, ADR, role.
- Scope summary: in/out.
- Execution contract: auto-continue, dependency/network approval, human checkpoint timing, special constraints.
- Required checks: exact commands from included plans.
- Human checks: only if human judgment adds value.
- Stop conditions: batch-specific.
- Commit strategy.
- Final report format.

## Good Detail

- Names of included specs/plans.
- Exact required commands.
- Human checkpoint timing.
- Approval-required actions unique to this batch.
- Expected final evidence.

## Bad Detail

- Repeating full plan tasks.
- Repeating `AGENTS.md` policy lists.
- Defining product behavior not already in specs.
- Using a batch to smuggle scope not present in included plans.

## Self-Review

- Can the agent see what to execute first?
- Does every included plan have a matching spec?
- Are human gates tied to actual human judgment?
- Are stop conditions narrower than, or directly linked to, the included plans?
