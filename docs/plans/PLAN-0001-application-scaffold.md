# PLAN-0001: Application Scaffold

Status: Draft
Maturity: M4
Owner: Unassigned
Created: 2026-06-10
Updated: 2026-06-10
Related spec: `docs/specs/SPEC-0001-application-scaffold.md`
Related ADRs: `docs/adr/ADR-0000-architecture-direction.md`
Related Change Requests: None

**Goal:** Add behavior-free application directories, shared contract files, local environment defaults, and README setup guidance.

**Architecture:** Create stable backend/frontend/shared/test/tooling paths first. The shared JSON contract defines future cross-boundary constants but no route implementation or gameplay behavior is added in this plan.

**Tech stack:** Markdown, JSON, Python JSON validation, existing shell preflight.

## Preconditions

- [ ] `SPEC-0001` is accepted.
- [ ] Worktree/branch state is understood.
- [ ] No dependency, network, CI, deployment, or product-behavior work is included.

## File structure

- Create: `README.md` - local setup, policy notes, future command shape.
- Create: `.env.example` - non-secret local defaults.
- Create/modify: `.gitignore` - local/generated ignores only.
- Create: `backend/app/__init__.py` - package marker.
- Create: `backend/app/services/__init__.py` - package marker.
- Create: `backend/app/data/.gitkeep` - preserve data directory.
- Create: `frontend/index.html` - behavior-free shell.
- Create: `frontend/style.css` - minimal scaffold styling comment or empty-safe placeholder.
- Create: `frontend/js/.gitkeep` - preserve JS directory.
- Create: `shared/app_contract.json` - executable shared contract.
- Create: `shared/COMMUNICATION_CONTRACT.md` - human contract mirror.
- Create: `tests/.gitkeep`, `tests/js/.gitkeep`, `tools/.gitkeep` - preserve future directories.
- Modify: `docs/repo-map.md` only if scaffold paths differ.

## Contracts to implement

- `shared/app_contract.json` top-level keys: `version`, `appName`, `api`, `static`, `tiles`, `actions`, `keyboard`, `storageKeys`, `gameplay`, `ui`.
- API contract values:
  - `api.origin`: empty string for same-origin local hosting.
  - `api.prefix`: `/api/v1`.
  - routes: `health`, `config`, `levels`, `levelById`, `progress`.
- Tile symbols: `.`, `#`, `P`, `B`, `G`.
- `.env.example` keys: `APP_ENV`, `HOST`, `PORT`, `SHARED_CONTRACT_PATH`, `LEVELS_PATH`, `PROGRESS_PATH`, `CORS_ALLOWED_ORIGINS`, `TRUSTED_HOSTS`, `ENABLE_PROGRESS_API`.

## Tasks

### Task 0: Preflight

**Files:** None

- [ ] Run:

```bash
git status --short
```

- [ ] Note any pre-existing dirty files before editing.

### Task 1: Directory skeleton

**Files:** backend/frontend/shared/tests/tools paths listed above

- [ ] Create only directories and marker files required by `SPEC-0001`.
- [ ] Do not add FastAPI route code, JS gameplay modules, tests, or level data yet.

### Task 2: Shared contract

**Files:** `shared/app_contract.json`, `shared/COMMUNICATION_CONTRACT.md`

- [ ] Add JSON values from the raw overview and `SPEC-0001`.
- [ ] Document each contract section with Python and JavaScript usage.
- [ ] Validate JSON.

### Task 3: Local setup docs

**Files:** `README.md`, `.env.example`, `.gitignore`

- [ ] Add local-first project purpose and expected implementation sequence.
- [ ] Mark dependency installation as approval-required.
- [ ] Add non-secret environment defaults and local/generated ignore entries.

## Validation

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
git diff --stat
git diff
```

## Documentation updates

- Update `docs/repo-map.md` only if final paths differ from seeded expectations.

## Rollback plan

Revert the scaffold commit or remove only files created by this plan. Leave prior seed docs intact.

## Risks

- Risk: placeholder files imply product completion.
  - Mitigation: keep them behavior-free and label future behavior in README.
- Risk: contract drift.
  - Mitigation: compare against raw overview and `ADR-0000`.

## Stop conditions

- A dependency, install, lockfile, CI, deployment, or network action is needed.
- Product behavior or gameplay code becomes necessary.
- A file outside this plan must be modified.
