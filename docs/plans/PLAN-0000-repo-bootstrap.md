# PLAN-0000: Repo Bootstrap

Status: Completed
Approval Class: A1
Maturity: M3
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0000-project-foundation.md`
Related ADRs: None
Related Change Requests: None

**Goal:** Establish the controlled repo scaffold and seed source material for project decomposition.

**Architecture:** This plan created the agent-governance and documentation control plane only. Product implementation is handled by later accepted specs and plans.

**Tech stack:** Shell/Python helper scripts, Git hooks, Markdown docs.

## Completion evidence

- `SPEC-0000` is completed.
- Governance, documentation, hook, helper-script, and intake scaffolds exist.
- Later scaffold work has created the behavior-free application skeleton, so this plan is historical and not an active implementation plan.

## Preconditions

- [x] Repository existed.
- [x] Starter scaffold files were available.
- [x] No product behavior was implemented by this plan.

## File structure

- Create/modify: `AGENTS.md` - repo operating rules.
- Create/modify: `docs/` - controlled documentation scaffold.
- Create/modify: `.github/` - PR and CI policy scaffold.
- Create/modify: `.githooks/` - local Git safety hooks.
- Create/modify: `.codex/`, `.claude/`, `.cursor/` - optional tool adapters.
- Create/modify: `scripts/agent/` - deterministic workflow helpers.
- Create/modify: `docs/intake/PROJECT_OVERVIEW_RAW.md` - raw project overview.

## Contracts implemented

- Documentation templates exist for specs, plans, batches, ADRs, Change Requests, and worklogs.
- Agent preflight exists and can verify required scaffold files.
- Raw overview is stored as intake material, not routine implementation context.
- First implementation slices are represented in controlled specs/plans instead of ad hoc prompts.

## Tasks

### Task 0: Preflight

**Files:** None

- [x] Ran repository status inspection before bootstrap work.
- [x] Confirmed the plan did not implement product behavior.

### Task 1: Install scaffold

**Files:** `AGENTS.md`, `docs/`, `.github/`, `.githooks/`, `.codex/`, `.claude/`, `.cursor/`, `scripts/agent/`

- [x] Added starter governance, templates, hooks, and helper scripts.
- [x] Added deterministic preflight/finalization helpers.
- [x] Added local hook policy files.

### Task 2: Seed intake material

**Files:** `docs/intake/PROJECT_OVERVIEW_RAW.md`

- [x] Added the raw project overview as intake material.
- [x] Seeded foundation docs/specs/plans from controlled documentation workflow.
- [x] Kept later product behavior in follow-on specs and plans.

## Validation

Historical validation for this plan:

```bash
git status --short
bash scripts/agent/agent_preflight.sh
bash -n scripts/agent/*.sh .githooks/*
python3 -m py_compile scripts/agent/*.py .codex/hooks/*.py
git diff --check
```

Current revalidation for plan remediation:

```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/plans/PLAN-0000-repo-bootstrap.md
git diff --check
```

## Documentation updates

- `docs/project-charter.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0000-project-foundation.md`

## Rollback plan

This plan is historical. If bootstrap artifacts must be removed, revert the bootstrap commit or open a new Change Request for process-scaffold removal.

## Risks

- Risk: future agents treat this completed plan as active implementation work.
  - Mitigation: status is `Completed`, and active implementation work must use the later accepted specs/plans.

## Stop conditions

- New product behavior is requested under this historical plan.
- A change would alter repo operating policy instead of documenting completed bootstrap work.
