# BATCH-0001 - Application Scaffold

Status: Draft
Approval Class: A1
Batch Type: Scaffold
User-testable: No
Human gate: No

## Purpose

Create behavior-free application directories, shared contract files, local environment defaults, and README setup guidance so backend/frontend implementation can proceed without redesigning paths.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0001-application-scaffold.md` | Scaffold requirements and boundaries. |
| Plan | `docs/plans/PLAN-0001-application-scaffold.md` | Executable scaffold tasks and checks. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Stack and component ownership. |

## Scope summary

### In scope

- Backend/frontend/shared/tests/tools directory skeleton.
- Shared contract JSON and human-readable mirror.
- `.env.example`, README setup notes, local/generated ignore entries.

### Out of scope

- Backend APIs, frontend gameplay, product UI behavior.
- Dependencies, installs, lockfiles, CI, deployment, secrets, external services.

## Execution contract

- Agent may continue automatically: Yes
- Dependency/network approval required before start: No
- Human checkpoint timing: none.
- Special constraints beyond `AGENTS.md`: scaffold files must remain behavior-free.

## Required checks

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
git diff --stat
git diff
```

## Human checks

- None.

## Stop conditions

- Dependency, network, lockfile, CI, deployment, or security-policy work is needed.
- Product behavior or gameplay code is needed.
- A file outside `PLAN-0001` must be modified.

## Commit strategy

- Suggested local commit: `chore(scaffold): add application skeleton`
- Remote push/PR: requires explicit approval.

## Final report

Report:

1. Batch status.
2. Files changed.
3. Checks run and skipped.
4. Deviations and Change Requests.
5. Remaining risks.
6. Whether `BATCH-0002-first-playable-slice` is ready.
