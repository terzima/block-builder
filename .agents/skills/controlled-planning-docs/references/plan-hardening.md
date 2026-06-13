# Plan Hardening Reference

Use for `docs/plans/PLAN-*.md`.

## Purpose

A hardened plan tells an agent exactly how to implement the accepted spec without redesigning. Spend tokens where they prevent drift: file responsibilities, function signatures, fixtures, commands, expected outputs, and task order.

## Required Shape

- Header: goal, architecture, tech stack.
- Preconditions: accepted spec, branch/worktree state, approvals.
- File structure: create/modify/read/test entries with responsibilities.
- Contracts to implement: functions/classes, API responses, data/schema examples, config, errors.
- Tasks: ordered, small, checkbox steps.
- Validation: exact commands and expected pass conditions.
- Documentation updates.
- Rollback plan.
- Risks and mitigations.
- Stop conditions.

## Detail Standard

Use execution-grade detail for:

- cross-module APIs;
- schema/model fields;
- route responses;
- test fixtures and assertions;
- parser/validator rules;
- state machines and reducers;
- migrations or data transforms;
- UI DOM IDs/classes when renderer/input code depends on them.

Use concise bullets for:

- low-risk directory creation;
- docs-only edits;
- obvious package markers;
- simple README updates.

## Task Pattern

Each meaningful task should include:

- files touched;
- failing test or fixture first when possible;
- command to run and expected failure/pass;
- minimal implementation step;
- focused re-run;
- commit suggestion only if useful.

## No-Drift Checklist

- No “add appropriate validation/error handling/tests.”
- No functions/types mentioned before they are defined.
- No broad task that touches unrelated layers.
- No dependency or network action unless approved or listed as a stop point.
- No duplicated `AGENTS.md` policy.

## When To Split

Split into another plan if a task needs a different approval class, creates a user-testable checkpoint, requires a dependency decision, or cannot be verified by the same gates.
