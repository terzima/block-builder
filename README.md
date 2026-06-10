# Block Builder

Block Builder is a local-first deterministic grid block puzzle game. The project is managed through controlled specs, implementation plans, and execution batches so application behavior is added in small, reviewable slices.

## Current Status

- Governance and planning docs exist.
- `BATCH-0001` creates the behavior-free application scaffold.
- Backend APIs, level data, validation, frontend gameplay, and playable UI are deferred to later accepted specs.

## Scaffold Created By BATCH-0001

```text
backend/
  app/
    __init__.py
    services/
      __init__.py
    data/
      .gitkeep
frontend/
  index.html
  style.css
  js/
    .gitkeep
shared/
  app_contract.json
  COMMUNICATION_CONTRACT.md
tests/
  .gitkeep
  js/
    .gitkeep
tools/
  .gitkeep
.env.example
```

## Future Application Files

`docs/repo-map.md` lists the expected backend modules, frontend JavaScript modules, tests, level data, and tooling that later specs may add. Those files are intentionally not created by the scaffold batch because they imply behavior.

## Local Setup

1. Review `AGENTS.md` before starting agent work.
2. Use `.env.example` as the source for future local environment defaults.
3. Do not commit `.env`, `.local/`, generated data, dependency directories, or logs.
4. Do not install dependencies until a later accepted spec requests them and the required approval is granted.

## Verification

Current scaffold checks:

```bash
git status --short
python3 -m json.tool shared/app_contract.json >/dev/null
bash scripts/agent/agent_preflight.sh
git diff --check
```

Expected application commands such as `pytest`, `uvicorn`, and JavaScript tests become valid only after later specs add dependency manifests and implementation files.

## Planning Sources

- `docs/project-charter.md`
- `docs/repo-map.md`
- `docs/specs/SPEC-0001-application-scaffold.md`
- `docs/plans/PLAN-0001-application-scaffold.md`
- `docs/plans/batches/BATCH-0001-application-scaffold.md`
- `docs/adr/ADR-0000-architecture-direction.md`
