# PLAN-0000: Repo Bootstrap

Status: Draft
Maturity: M3
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0000-project-foundation.md`
Related ADRs: None
Related Change Requests: None

**Goal:** Establish the controlled repo scaffold and seed source material for project decomposition.

**Architecture:** This plan creates the agent-governance and documentation control plane only. Product implementation begins in later specs after project seeding.

**Tech stack:** Shell/Python helper scripts, Git hooks, Markdown docs.

## Preconditions

- [ ] Repository exists.
- [ ] Starter scaffold files are available.
- [ ] No application code implementation has started.

## File structure

- Create/modify: `AGENTS.md` - repo operating rules.
- Create/modify: `docs/` - controlled documentation scaffold.
- Create/modify: `.github/` - PR and CI policy scaffold.
- Create/modify: `.githooks/` - local Git safety hooks.
- Create/modify: `.codex/`, `.claude/`, `.cursor/` - optional tool adapters.
- Create/modify: `scripts/agent/` - deterministic workflow helpers.
- Create/modify: `docs/intake/PROJECT_OVERVIEW_RAW.md` - raw project overview.

## Contracts to implement

- Documentation templates exist for specs, plans, batches, ADRs, Change Requests, and worklogs.
- Agent preflight exists and can verify required scaffold files.
- Raw overview is stored as intake material, not routine implementation context.

## Tasks

### Task 0: Preflight

**Files:** None

- [ ] Run:

```bash
git status --short
```

- [ ] Confirm no application code exists or is being modified.

### Task 1: Install scaffold

**Files:** `AGENTS.md`, `docs/`, `.github/`, `.githooks/`, `.codex/`, `.claude/`, `.cursor/`, `scripts/agent/`

- [ ] Add starter governance, templates, hooks, and helper scripts.
- [ ] Install local Git hooks if requested by the project owner.
- [ ] Run scaffold syntax checks.

### Task 2: Seed intake material

**Files:** `docs/intake/PROJECT_OVERVIEW_RAW.md`

- [ ] Add the raw project overview exactly as intake material.
- [ ] Run seeding in Spec mode only.
- [ ] Review generated seed docs for scope, open questions, and first implementation slice.

## Validation

```bash
git status --short
bash scripts/agent/agent_preflight.sh
bash -n scripts/agent/*.sh .githooks/*
python3 -m py_compile scripts/agent/*.py .codex/hooks/*.py
git diff --check
```

## Documentation updates

- `docs/project-charter.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0000-project-foundation.md`

## Rollback plan

Revert the bootstrap commit and remove scaffold files created by this plan.

## Risks

- Risk: process scaffold becomes too broad.
  - Mitigation: keep first implementation slice small and spec-backed.

## Stop conditions

- Application code is requested before seed docs exist.
- A dependency, network action, or CI/deployment change is required.
