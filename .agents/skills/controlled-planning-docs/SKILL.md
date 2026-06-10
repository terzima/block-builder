---
name: controlled-planning-docs
description: Use when writing, revising, hardening, or reviewing repo specs, implementation plans, or batch plans under docs/specs, docs/plans, or docs/plans/batches. Applies automatically to Spec and Plan mode document authoring, plan-hardening passes, and batch grouping work.
---

# Controlled Planning Docs

Use this skill to produce precise, execution-ready planning docs without bloating always-loaded context.

## Core Rule

Do not copy `AGENTS.md` policy into specs/plans/batches. Put reusable repo rules in `AGENTS.md`; put task-local contracts, interfaces, fixtures, commands, and gates in the planning doc.

## Pick The Document Type

- **Spec**: read `references/spec-writing.md`.
- **Plan**: read `references/plan-hardening.md`.
- **Batch**: read `references/batch-writing.md`.
- **Mixed request**: write or revise in this order: spec, plan, batch.

## Depth Ladder

- M1 seeded docs: concise orientation, open questions, no execution detail.
- M2 spec: exact behavior, boundaries, interfaces, and acceptance gates.
- M3 plan: concrete file map, contracts, task slices, tests, commands, stop conditions.
- M4 execution plan: enough detail to implement without redesign; include small code/test snippets where they prevent ambiguity.

## Workflow

1. Identify mode: Spec or Plan. Do not combine with Implementation unless explicitly instructed.
2. Read only `AGENTS.md`, `docs/repo-map.md`, active source docs, and the relevant reference below.
3. Classify maturity and approval class.
4. Write the doc using the matching repo template.
5. Self-review:
   - no placeholders or template guidance left;
   - no duplicated `AGENTS.md` policy blocks;
   - exact contracts and validation commands are present;
   - scope is small enough for the declared maturity;
   - stop conditions are task-specific.
6. Optionally run:

```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py <path>
```

## What To Preserve From The Exemplars

- Product/spec docs define principles, vocabulary, contracts, gates, failure owners, and remediation paths.
- Plans define exact files, exact tests, expected failures/passes, task order, and acceptance evidence.
- Batches stay short: included specs/plans, execution contract, required checks, human gates, and final report.

## What To Avoid

- Long pasted source material or logs.
- Generic prose that does not constrain implementation.
- “Add tests” without naming fixtures, assertions, or commands.
- Repeating permission, git, hook, approval-class, or Change Request rules from `AGENTS.md`.
- Huge plan detail for low-risk scaffold work where exact file contents are enough.
