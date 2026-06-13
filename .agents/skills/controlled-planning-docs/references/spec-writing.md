# Spec Writing Reference

Use for `docs/specs/SPEC-*.md`.

## Purpose

A spec says what must be true. It should be precise enough that a plan can be written without inventing behavior, but it should not prescribe every implementation step.

## Required Shape

- Context: source docs, current evidence, why this slice now.
- Problem: 1-3 concrete sentences.
- Goals and non-goals: short, scope-setting bullets.
- Users / actors: only actors that affect behavior.
- Behavioral contract: user-visible behavior, system responsibilities, explicitly unchanged behavior.
- Interface and data contract: exact names/shapes for files, modules, APIs, data, config, and errors when crossing boundaries.
- Requirements: functional and non-functional.
- Dependencies and approvals: task-specific only.
- Acceptance gates: automated, human, manual.
- Risks/open questions: only unresolved items that affect implementation.
- Stop conditions: when to pause or open a Change Request.

## Good Detail

- Exact API route and response shape.
- Exact data model fields and required invariants.
- Exact error code/message contract.
- Exact product rule with examples only when ambiguity is likely.
- Testable acceptance gate.

## Bad Detail

- Step-by-step implementation order.
- Repo-wide permission or git policy copied from `AGENTS.md`.
- Large raw overview excerpts.
- Vague acceptance such as “works correctly” or “has tests.”

## Self-Review

- Can a planner identify the files and interfaces without rereading raw source?
- Does every requirement have a plausible automated, manual, or human gate?
- Are non-goals strong enough to prevent scope creep?
- Are open questions separated from accepted requirements?
