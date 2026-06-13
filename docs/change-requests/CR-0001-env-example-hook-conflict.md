# CR-0001: Allow Scaffold `.env.example` Commit

Status: Accepted
Owner: Unassigned
Created: 2026-06-10
Related spec: `docs/specs/SPEC-0001-application-scaffold.md`
Related plan: `docs/plans/PLAN-0001-application-scaffold.md`

## Trigger

During `BATCH-0001` implementation, the scaffold files were created and verified, but the local commit failed because `.githooks/pre-commit` rejects staged `.env.*` paths.

Hook output:

```text
pre-commit: refusing to commit likely secret file
```

The staged file that triggered this is `.env.example`, which is explicitly required by the accepted scaffold spec and plan and contains only non-secret local defaults.

## Current accepted spec/plan says

`SPEC-0001` requires:

- Create `.env.example` with non-secret local defaults.
- Update `.gitignore` only for local/generated files relevant to the scaffold, including `.local/`.

`PLAN-0001` requires:

- Create `.env.example` using exact non-secret contents.
- Do not create `.env`.
- Do not bypass hooks.

## Proposed change

Update `.githooks/pre-commit` to allow the exact path `.env.example` while continuing to block `.env`, other `.env.*` files, private keys, and secret patterns.

Expected hook intent after the change:

- Allowed: `.env.example`
- Blocked: `.env`, `.env.local`, `.env.production`, nested `.env`, nested `.env.*`, `.pem`, `.key`, SSH private key names, and staged secret-looking content.

## Why this is necessary

The current accepted plan cannot complete cleanly because the required `.env.example` file is blocked by the pre-commit hook. Bypassing the hook is prohibited, and removing or renaming `.env.example` would contradict the accepted spec and plan.

## Impact

- Scope: Small hook-policy compatibility fix for the scaffold batch.
- Files: `.githooks/pre-commit`; possibly `docs/specs/SPEC-0001-application-scaffold.md`, `docs/plans/PLAN-0001-application-scaffold.md`, or `docs/plans/batches/BATCH-0001-application-scaffold.md` only if the accepted decision changes file naming.
- Tests: Run `bash -n .githooks/pre-commit`, stage a safe `.env.example`, confirm the hook allows it, and keep existing scaffold validation commands.
- Docs: This Change Request records the policy conflict and decision.
- Dependencies: None.
- Security/privacy: Maintains secret blocking while allowing the conventional non-secret example env file.
- Token/context impact: Low; future agents avoid rediscovering the same hook conflict.
- Timeline/PR size: Small addition to the current scaffold batch once accepted.

## Options considered

1. Accept: Update `.githooks/pre-commit` to whitelist only `.env.example`.
2. Reject: Keep the hook unchanged and revise the accepted scaffold spec/plan to use a different env defaults filename.
3. Defer: Leave the scaffold uncommitted with `.env.example` staged, blocking completion of `BATCH-0001`.

## Recommendation

Accept.

## Decision

Decision:
Decision: Accepted
Date: 2026-06-10
Rationale: `.env.example` is required by the accepted scaffold spec and plan, contains only non-secret defaults, and should be allowed without weakening secret blocking for real `.env` files or key material.
