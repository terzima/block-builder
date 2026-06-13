# Project Charter

Status: Seeded
Maturity: M1/M2
Owner: Unassigned
Last updated: 2026-06-10

## Purpose

Build a polished, locally hosted, deterministic side-view grid block puzzle game. The player solves tile-based levels by moving, jumping one tile high, carrying one movable block at a time, placing blocks, filling gaps, and reaching a goal.

## Target users

- Puzzle players who want clear, deterministic block-placement challenges.
- The project owner, who needs a local-first game that can later move to HTTPS/web hosting.
- Agentic coding sessions that need controlled specs, plans, and validation boundaries.

## Core problem

The project needs to turn a detailed raw gameplay overview into a small, testable implementation sequence without losing the intended mechanics or prematurely committing to late-stage features.

## Product goals

- Deliver the first five tutorial/prototype levels as the first playable milestone.
- Keep gameplay deterministic, discrete, and testable.
- Use a clean, modern, high-contrast UI rather than a bare technical demo.
- Centralize shared Python/JavaScript route, tile, action, storage, and UI constants in a JSON contract.
- Preserve a clear path to 100 levels after the first five are validated.
- Keep future HTTPS/web hosting configurable without rewriting routes throughout the codebase.

## Non-goals

- Continuous-motion platform physics, acceleration, momentum, or variable jump heights.
- Enemies, hazards, keys, doors, switches, timers, moving platforms, multiple goals, or multiple players in v1.
- User accounts, cloud saves, leaderboards, analytics, billing, or external integrations in v1.
- Production deployment, TLS termination, hosting provider selection, or domain setup during initial implementation.
- Creating all 100 levels before validating the first five.

## Success criteria

- The app runs locally and serves a playable browser UI.
- The backend uses Python with FastAPI and serves static assets, shared config, and level data.
- The frontend uses vanilla JavaScript, `index.html`, and `style.css`.
- The shared JSON contract is read by both backend and frontend code.
- Levels 1-5 are playable and completable using the specified mechanics.
- Reset, undo, move counting, invalid-action feedback, and local progress work.
- Backend and frontend logic have relevant automated tests or a documented temporary harness where tooling is intentionally deferred.

## Constraints

- Python/FastAPI backend is required.
- Vanilla JavaScript frontend with `index.html` and `style.css` is required.
- Local hosting comes before HTTPS/web deployment.
- The frontend owns real-time gameplay state transitions; the backend serves assets, config, levels, validation, and optional local progress APIs.
- Production dependency additions, installs, network access, lockfile changes, CI changes, deployment work, and remote Git operations require approval under `AGENTS.md`.
- The raw overview remains source material in `docs/intake/PROJECT_OVERVIEW_RAW.md`, not the permanent working spec.

## First meaningful human-testable milestone

The first human-testable milestone is the completion of the first playable slice: the app loads locally, renders the board, serves levels 1-5 from the backend, and lets a player complete all five levels using movement, jump, pickup/place, gravity, reset, undo, and level transitions.

## Source material

- `docs/intake/PROJECT_OVERVIEW_RAW.md`
- `AGENTS.md`
