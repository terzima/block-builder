# Vercel Static Release

Status: Local prep implemented; A2 static browser preview pending
Last updated: 2026-06-12

## Scope

This guide covers the static web release for Block Builder at `block-builder.terzima.com`. The release artifact is generated locally into ignored `dist/` content and is intended for a separate Vercel project.

## Artifact Contract

- Source levels: canonical `backend/app/data/levels.json`, IDs 1-50.
- Static output: `dist/`.
- Static data:
  - `dist/static-data/config.json`
  - `dist/static-data/levels.json`
  - `dist/static-data/levels/{levelId}.json`
- Shared contract copy: `dist/shared/app_contract.json`.
- Runtime mode: `deployed`.
- Data source: static JSON under `/static-data`.
- Shipped UI:
  - trace recorder controls are absent;
  - trace-recorder development files are absent;
  - undo controls are absent;
  - local development can still keep undo and trace recorder behavior.

## Repository Requirements For Vercel

- Root `package.json` exists and declares the project name, version, module type, and build script.
- Root `package-lock.json` exists to make the npm package manager choice deterministic without adding dependencies.
- No production or development dependencies are required for the static export.
- No framework config is required or expected.
- No `vercel.json` is required for this plan.

## Build And Preview

```bash
python3 tools/export_static_site.py
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/` for the A2 local static preview.

## Vercel Project Settings

Use a separate Vercel project for this game.

| Setting | Value |
|---|---|
| Framework preset | Other / static |
| Build command | Package build script |
| Output directory | `dist` |
| Install command | Clean install from committed npm lockfile |
| Domain | `block-builder.terzima.com` |

Domain routing and DNS are manual Vercel/dashboard work and must not be done by the agent without explicit A3 approval.

## Validation

Run these local checks before shipping:

```bash
python3 tools/export_static_site.py
.venv/bin/python -m pytest tests/test_static_export.py
node tests/js/run-tests.mjs
python3 -m json.tool dist/static-data/config.json >/dev/null
python3 -m json.tool dist/static-data/levels.json >/dev/null
```

Expected result:

- 50 level metadata entries.
- 50 level detail files.
- No trace recorder files in `dist/js/`.
- No shipped undo control in `dist/index.html`.
- Runtime config in `dist/index.html` sets static deployed mode.

## Gates

- A2: project owner manually previews the generated static site in a browser.
- A3: Vercel project creation, GitHub/Vercel linking, DNS configuration, deployment, and production verification.
