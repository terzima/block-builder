# BATCH-0001 - Application Scaffold

Status: Ready for Implementation
Approval Class: A1
Batch Type: Scaffold
User-testable: No
Human gate: No

## Purpose

Create behavior-free application directories, shared contract files, local environment defaults, and README setup guidance so backend/frontend implementation can proceed without redesigning paths. Execute only after `SPEC-0001` is accepted.

## Included work

| Type | File | Role |
|---|---|---|
| Spec | `docs/specs/SPEC-0001-application-scaffold.md` | Scaffold requirements and boundaries. |
| Plan | `docs/plans/PLAN-0001-application-scaffold.md` | M4 executable scaffold tasks, exact file contents, and checks. |
| ADR | `docs/adr/ADR-0000-architecture-direction.md` | Stack and component ownership. |

## Scope summary

### In scope

- Backend/frontend/shared/tests/tools directory skeleton listed in `PLAN-0001`.
- Shared contract JSON and human-readable mirror.
- `.env.example`, README setup notes, local/generated ignore entries.

### Out of scope

- Deferred files listed in `PLAN-0001`, including backend APIs, frontend gameplay modules, product UI behavior, tests, level data, and tooling behavior.
- Dependencies, installs, lockfiles, CI, deployment, secrets, external services.

## Execution contract

- Agent may continue automatically: Yes, after `SPEC-0001` is accepted.
- Dependency/network approval required before start: No
- Human checkpoint timing: none.
- Special constraints beyond `AGENTS.md`: scaffold files must remain behavior-free and use the exact file contents or patch instructions in `PLAN-0001`.

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
- `SPEC-0001` is not accepted when Implementation mode starts.
- A file outside `PLAN-0001` must be modified, except the documented `docs/repo-map.md` fallback.

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
