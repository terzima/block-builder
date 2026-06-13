# Agentic Coding Prompt Library

Use these prompts directly. Replace bracketed fields before sending. Keep prompts short enough to steer the session, but exact enough that the agent does not need prior chat history.

## Recommended User Flow

1. Start every new session with the context startup prompt.
2. Use Discovery when you need a read-only assessment.
3. Use the new-spec prompt when adding requirements; it pulls from startup docs before drafting.
4. Review specs before approval.
5. Approve specs explicitly and ask the agent to mark their status.
6. Use the new-plan prompt after specs are accepted; it pulls from startup docs plus the accepted spec.
7. Use the new-batch prompt after plans are ready; it pulls from startup docs plus approved specs/plans.
8. Review plans/batches before approval.
9. Approve plans/batches explicitly and ask the agent to mark their status.
10. Resolve any A3 dependency/network approval before implementation.
11. Execute only the accepted plan or batch.
12. Review, update `docs/status/CURRENT_STATE.md`, and commit.

Best approval step:

- Approve specs before plans.
- Approve plans and batches before implementation.
- Name the exact files being approved.
- State whether the next step is implementation or only status marking.
- For A3 work, approve dependency/network actions separately from spec/plan approval.

Example approval language:

```txt
Specs approved:
- docs/specs/SPEC-0002-backend-levels-api.md
- docs/specs/SPEC-0003-frontend-gameplay-ui.md

Mode: Spec.
Mark these specs Accepted. Do not edit plans, batches, or application code.
Run the planning-doc checker and git diff --check.
```

```txt
Plans and batches approved:
- docs/plans/PLAN-0002-backend-levels-api.md
- docs/plans/batches/BATCH-0002-first-playable-slice.md

Mode: Plan.
Mark these docs Ready for Implementation or Accepted using the repo's established status wording. Do not implement.
Run the planning-doc checker and git diff --check.
```

## 0. Context Startup Prompt

````txt
Mode: Discovery.

We are in `/Users/slouis/Development/apps/block-builder`.

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. The active spec, plan, and batch listed in `docs/status/CURRENT_STATE.md`

Do not edit files.
Do not install dependencies.
Do not access the network.

Goal:
Summarize the current repo state and identify the next safest action.

Return:
- Active objective
- Active spec/plan/batch
- Current branch and worktree status
- Blocking gates or approvals
- Recommended next prompt
````

## 1. New Repo Seeding Prompt

````txt
Mode: Spec.

Read:
1. `AGENTS.md`
2. `docs/intake/PROJECT_OVERVIEW_RAW.md`

Do not write application code.
Do not create production application files.
Do not install dependencies.
Do not access the network.
Do not run framework generators.

Goal:
Convert the raw project overview into controlled project documents, decomposed specs, decomposed plans, proposed execution batches, and a current-state dashboard.

Use the repo-local `controlled-planning-docs` skill if available.

Create or update only docs needed for seeding:
- `docs/project-charter.md`
- `docs/glossary.md`
- `docs/repo-map.md`
- `docs/roadmap.md`
- `docs/status/CURRENT_STATE.md`
- `docs/specs/SPEC-0000-project-foundation.md`
- initial `docs/specs/SPEC-0001-*.md` through `SPEC-0003-*.md` only if clear
- matching `docs/plans/PLAN-0001-*.md` through `PLAN-0003-*.md` only if clear
- matching `docs/plans/batches/BATCH-0001-*.md` and at most one additional near-term batch
- `docs/seed/SEED-0000-project-decomposition.md`
- `docs/seed/SEED-0000-results.md`
- `docs/worklog/0000-seeding-notes.md`
- `docs/adr/ADR-0000-architecture-direction.md` only if architecture choices are explicit or strongly implied

Depth policy:
- M1 for broad orientation docs.
- M2 for near-term specs.
- M3/M4 only for the first implementation-safe plan or batch.
- Keep late-stage work as roadmap/spec candidates.

Required behavior:
- Preserve raw overview intent.
- Separate requirements, assumptions, non-goals, risks, and open questions.
- Do not invent implementation details where source material is silent.
- Do not create full specs/plans for speculative future work.
- Do not ask for approval after each document.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py docs/specs/SPEC-0000-project-foundation.md docs/specs/SPEC-0001-*.md docs/plans/PLAN-0001-*.md docs/plans/batches/BATCH-0001-*.md
git diff --check
git diff --stat
git diff
```

Final response:
- Documents created or updated
- Specs created
- Plans created
- Proposed batches created
- Key assumptions
- Open questions
- Recommended next prompt
````

## 2. Discovery Prompt

````txt
Mode: Discovery.

We are in `/Users/slouis/Development/apps/block-builder`.

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. Any active docs named in `docs/status/CURRENT_STATE.md` that are relevant to this task

Do not edit files.
Do not write code.
Do not install dependencies.
Do not access the network.

Task:
[Describe the question or area to inspect.]

Return:
- Relevant files and why they matter
- Existing patterns to follow
- Risks and unknowns
- Whether this needs Spec, Plan, Implementation, Review, ADR, or Change Request mode
- Recommended next prompt
````

## 2.5. New Spec From Startup Docs Prompt

````txt
Mode: Spec.

We are in `/Users/slouis/Development/apps/block-builder`.

Use the repo-local `controlled-planning-docs` skill at `.agents/skills/controlled-planning-docs/SKILL.md`.

Goal:
Create a new spec for [feature/slice name] from durable repo context, not prior chat history.

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `docs/project-charter.md`
5. `docs/roadmap.md`
6. `docs/glossary.md`, if relevant
7. `docs/adr/ADR-0000-architecture-direction.md`, if relevant
8. Existing nearby specs in `docs/specs/` for numbering, status wording, and scope boundaries
9. Directly relevant shared contracts or source files only if the new spec crosses that boundary

Avoid reading `docs/intake/PROJECT_OVERVIEW_RAW.md` unless the startup docs are insufficient. If it is needed, read only the narrow relevant section and summarize the need.

Do not edit plans, batches, application code, dependencies, lockfiles, CI, deployment, generated files, or secrets.

Tasks:
1. Pick the next spec number and descriptive filename.
2. Derive context from project charter, roadmap, repo map, current state, ADRs, and existing specs.
3. State source docs and current evidence.
4. Define goals, non-goals, actors, behavioral contract, interfaces/data/API/runtime contracts, requirements, dependencies/approval class, acceptance gates, risks, open questions, and stop conditions.
5. Keep future/speculative work in roadmap language unless it is required for this slice.
6. Update `docs/status/CURRENT_STATE.md` only if the active objective or next action changes.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [new spec path]
git diff --check
git diff --stat
git diff
```

Final response:
- New spec path
- Source docs used
- Approval class
- Open questions
- Checks run
- Exact spec approval prompt the user can send next
````

## 2.6. New Plan From Accepted Spec Prompt

````txt
Mode: Plan.

We are in `/Users/slouis/Development/apps/block-builder`.

Use the repo-local `controlled-planning-docs` skill at `.agents/skills/controlled-planning-docs/SKILL.md`.

Goal:
Create an M4 implementation plan for this accepted spec:
- [accepted spec path]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `docs/project-charter.md`
5. `docs/roadmap.md`
6. `.agents/skills/controlled-planning-docs/SKILL.md`
7. `.agents/skills/controlled-planning-docs/references/plan-hardening.md`
8. [accepted spec path]
9. Related ADRs listed by the spec
10. Existing nearby plans in `docs/plans/` for numbering, status wording, and task shape
11. Directly affected source/test/docs files named or implied by the accepted spec

Do not edit specs unless explicitly asked.
Do not edit application code.
Do not install dependencies.
Do not access the network.
Do not create lockfiles.

Tasks:
1. Pick the matching plan number and descriptive filename.
2. Build from the accepted spec plus startup docs; do not invent behavior from chat history.
3. Name exact files, functions/classes, schemas, fixtures, tests, commands, expected outputs, docs updates, rollback plan, risks, and stop conditions.
4. Put A3 dependency/network work at an explicit stop point.
5. Split the plan if it mixes incompatible approval classes or user-testable checkpoints.
6. Update `docs/status/CURRENT_STATE.md` if this becomes the active plan.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [new plan path]
git diff --check
git diff --stat
git diff
```

Final response:
- New plan path
- Source docs used
- Whether the plan is M4
- Approval gates
- Checks run
- Exact plan approval prompt the user can send next
````

## 2.7. New Batch From Approved Plans Prompt

````txt
Mode: Plan.

We are in `/Users/slouis/Development/apps/block-builder`.

Use the repo-local `controlled-planning-docs` skill at `.agents/skills/controlled-planning-docs/SKILL.md`.

Goal:
Create a concise execution batch for these approved specs/plans:
- [spec paths]
- [plan paths]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `docs/project-charter.md`
5. `docs/roadmap.md`
6. `.agents/skills/controlled-planning-docs/SKILL.md`
7. `.agents/skills/controlled-planning-docs/references/batch-writing.md`
8. [approved spec paths]
9. [approved plan paths]
10. Related ADRs listed by the specs/plans
11. Existing nearby batches in `docs/plans/batches/` for numbering and status wording

Do not edit specs, plans, or application code unless explicitly asked.
Do not install dependencies.
Do not access the network.

Tasks:
1. Pick the next batch number and descriptive filename.
2. Group only already-written specs/plans.
3. Keep the batch short; do not repeat full plan tasks.
4. Separate batches when approval classes, dependency/network gates, or human checkpoints differ.
5. Include status, approval class, batch type, user-testable flag, human gate flag, included work table, scope summary, execution contract, required checks, human checks, stop conditions, commit strategy, and final report format.
6. Update `docs/status/CURRENT_STATE.md` if this becomes the active batch.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [new batch path]
git diff --check
git diff --stat
git diff
```

Final response:
- New batch path
- Included specs/plans
- Approval class and human gate
- Checks run
- Exact batch approval prompt the user can send next
````

## 3. Spec Hardening Prompt

````txt
Mode: Spec.

We are in `/Users/slouis/Development/apps/block-builder`.

Use the repo-local `controlled-planning-docs` skill at `.agents/skills/controlled-planning-docs/SKILL.md`.

Goal:
Harden the listed specs so plans can be written without invention.

Read only:
- `AGENTS.md`
- `docs/repo-map.md`
- `docs/status/CURRENT_STATE.md`
- `.agents/skills/controlled-planning-docs/SKILL.md`
- `.agents/skills/controlled-planning-docs/references/spec-writing.md`
- [active source docs]
- [spec files to harden]

Do not edit plans, batches, application code, hooks, dependencies, lockfiles, CI, deployment, generated files, or secrets.

Tasks:
1. Remove stale status or evidence.
2. Make goals and non-goals explicit.
3. Define exact interface/data/API/runtime contracts where implementation would otherwise guess.
4. Define validation rules, error shapes, acceptance gates, stop conditions, and approval class.
5. Keep raw intake reliance out of routine implementation paths.
6. Update `docs/status/CURRENT_STATE.md` if the active objective or next action changes.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [spec paths]
git diff --check
git diff --stat
git diff
```

Final response:
- Specs changed
- Approval status still needed
- Checks run
- Open questions
- Recommended approval prompt
````

## 4. Spec Review Before Approval Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

Review these specs for approval readiness:
- [spec paths]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `.agents/skills/controlled-planning-docs/SKILL.md`
5. `.agents/skills/controlled-planning-docs/references/spec-writing.md`
6. [spec paths]

Do not edit files.
Do not write plans.
Do not implement.

Check:
1. Status and approval class are appropriate.
2. Goals, non-goals, and stop conditions prevent scope creep.
3. Interfaces, data shapes, API routes, errors, and validation rules are exact enough for M4 planning.
4. Acceptance gates are testable.
5. Human approval gates are tied to real human judgment.
6. No AGENTS policy blocks or raw chat history are duplicated.

Return:
- Blocking issues
- Non-blocking improvements
- Whether each spec is approval-ready
- Exact approval prompt the user can send next
````

## 5. Mark Specs Approved Prompt

````txt
Mode: Spec.

We are in `/Users/slouis/Development/apps/block-builder`.

The user approves these specs:
- [spec paths]

Use the repo-local `controlled-planning-docs` skill.

Task:
Mark only the listed specs as `Status: Accepted` unless a listed spec is historical and should be `Status: Completed`.

Do not edit plans, batches, application code, dependencies, lockfiles, CI, deployment, or generated files.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [spec paths]
git diff --check
git diff --stat
git diff
```

Final response:
- Specs marked accepted or completed
- Checks run
- Next recommended plan-hardening prompt
````

## 6. Plan And Batch Hardening Prompt

````txt
Mode: Plan.

We are in `/Users/slouis/Development/apps/block-builder`.

Use the repo-local `controlled-planning-docs` skill.

Goal:
Harden the active plans and batches after spec approval so implementation can proceed without redesign.

Read only:
- `AGENTS.md`
- `docs/repo-map.md`
- `docs/status/CURRENT_STATE.md`
- `.agents/skills/controlled-planning-docs/SKILL.md`
- `.agents/skills/controlled-planning-docs/references/plan-hardening.md`
- `.agents/skills/controlled-planning-docs/references/batch-writing.md`
- [accepted specs]
- [plans to harden]
- [batches to harden]

Do not edit specs unless explicitly asked.
Do not edit application code.
Do not install dependencies.
Do not access the network.

Tasks:
1. Mark historical plans/batches completed if appropriate.
2. Harden each active plan to M4 where the accepted spec supports it.
3. Name exact files, functions/classes, data fixtures, tests, commands, expected outputs, docs updates, rollback steps, and stop conditions.
4. Split plans or batches when approval classes differ.
5. Keep A3 dependency/network gates separate from A2 user-testable checkpoints.
6. Update `docs/status/CURRENT_STATE.md` if the active contract or next action changes.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [plan and batch paths]
git diff --check
git diff --stat
git diff
```

Final response:
- Plans changed
- Batches changed
- Approval status still needed
- Checks run
- Recommended approval prompt
````

## 7. Plan And Batch Review Before Approval Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

Review these plans and batches for implementation readiness:
- [plan paths]
- [batch paths]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `.agents/skills/controlled-planning-docs/SKILL.md`
5. `.agents/skills/controlled-planning-docs/references/plan-hardening.md`
6. `.agents/skills/controlled-planning-docs/references/batch-writing.md`
7. linked accepted specs
8. [plan paths]
9. [batch paths]

Do not edit files.
Do not implement.

Check:
1. Plans are M4 enough to execute without redesign.
2. Each plan has exact files, public contracts, fixtures, tests, commands, expected outputs, docs updates, rollback plan, risks, and stop conditions.
3. Batches group compatible approval classes.
4. A2 human checkpoints and A3 dependency/network gates are separated.
5. Required checks are exact and match the plans.
6. No batch smuggles scope that is absent from the spec/plan.

Return:
- Blocking issues
- Non-blocking improvements
- Whether each plan/batch is approval-ready
- Exact approval prompt the user can send next
````

## 8. Mark Plans And Batches Ready Prompt

````txt
Mode: Plan.

We are in `/Users/slouis/Development/apps/block-builder`.

The user approves these plans and batches:
- [plan paths]
- [batch paths]

Use the repo-local `controlled-planning-docs` skill.

Task:
Mark only the listed plans and batches ready for implementation using the repo's established status wording. Do not implement.

Do not edit specs, application code, dependencies, lockfiles, CI, deployment, or generated files.

Run:
```bash
python3 .agents/skills/controlled-planning-docs/scripts/check_planning_doc.py [plan and batch paths]
git diff --check
git diff --stat
git diff
```

Final response:
- Plans/batches marked ready
- Checks run
- Whether any A3 approval is still needed
- Exact implementation prompt the user can send next
````

## 9. A3 Dependency Approval Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

Review the A3 dependency/network approval request for:
- [plan or batch path]

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. [accepted spec path]
4. [accepted plan path]
5. [accepted batch path]

Do not edit files.
Do not install dependencies.
Do not access the network.

Return the exact approval request with:
- Action
- Exact command
- Packages and versions
- Why needed
- Alternatives considered
- License notes
- Security/advisory considerations
- Lockfile impact
- Scope
- Risk
- Rollback plan
- Fallback if denied

Also state whether the user can approve implementation and dependency/network access in one response, or whether these should be separate.
````

## 10. Execute Accepted Batch Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Execute this accepted batch exactly:
- [batch path]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. [batch path]
5. all specs referenced by the batch
6. all plans referenced by the batch
7. directly affected source files

Do not expand scope.
Do not edit accepted specs.
Do not execute specs/plans not listed in the batch.
Do not install dependencies or access the network unless the required A3 approval has already been granted in this thread.
Do not create lockfiles unless explicitly approved.
Do not modify CI, deployment, security policy, secrets, or unrelated files.

Before editing, run:
```bash
git status --short
```

During implementation:
- Follow the batch and linked plans.
- Stop for A2 or A3 gates.
- Open a Change Request if accepted scope is wrong.
- Update `docs/status/CURRENT_STATE.md` before stopping.
- Create or update `docs/handoff/` only if work is incomplete, blocked, interrupted, or complex enough to need a restart package.

Required final response:
DONE:
- Summary
- Files changed
- Tests/checks run
- Docs updated
- Deviations from plan
- Remaining risks
- Next action
````

## 11. Execute Accepted Single Plan Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Execute this accepted plan exactly:
- [plan path]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. linked accepted spec
5. [plan path]
6. directly affected source files

Do not expand scope.
Do not edit accepted specs.
Do not install dependencies or access the network unless the required A3 approval has already been granted in this thread.
Do not create lockfiles unless explicitly approved.
Do not modify CI, deployment, security policy, secrets, or unrelated files.

Before editing, run:
```bash
git status --short
```

Stop if:
- The plan is still Draft.
- An A2 or A3 gate is reached.
- A Change Request is required.
- Tests fail and cannot be resolved within scope.
- Work requires files outside the plan.

Before final response:
- Run the plan's required checks.
- Update `docs/status/CURRENT_STATE.md`.
- Create or update a handoff file only if needed.

Required final response:
DONE:
- Summary
- Files changed
- Tests/checks run
- Docs updated
- Deviations from plan
- Remaining risks
- Next action
````

## 12. Change Request Prompt

````txt
Mode: Plan.

Stop implementation.

Open a Change Request using `docs/change-requests/_template.md`.

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. accepted spec
4. accepted plan
5. directly relevant files

Explain:
1. What assumption failed.
2. What the accepted spec/plan currently says.
3. What change is proposed.
4. Why implementation cannot continue cleanly without it.
5. Scope, files, tests, docs, risks, and token/context impact.
6. Recommendation: accept, reject, or defer.

Do not edit implementation code until the Change Request is accepted.

Run:
```bash
git diff --check
git diff --stat
git diff
```
````

## 13. Review Current Diff Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

Review the current diff against:
- Spec: [spec path]
- Plan: [plan path]
- Batch: [batch path, if applicable]

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. [spec path]
5. [plan path]
6. [batch path, if applicable]

Do not implement fixes unless explicitly asked after the review.

Run or inspect:
```bash
git status --short
git diff --stat
git diff
```

Check:
1. Acceptance criteria.
2. Unplanned files.
3. Scope creep.
4. Test adequacy.
5. Docs/status updates.
6. Dependency/security risk.
7. Naming, boundaries, duplication, and dead code.

Return:
- Blocking findings first, with file references
- Non-blocking improvements
- Tests run or missing
- Whether implementation can be accepted
- Suggested next prompt
````

## 14. Address Review Findings Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Address only these review findings:
- [finding list]

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. accepted spec/plan/batch
4. files named by the findings

Do not expand scope.
Do not modify unrelated files.
Do not install dependencies or access the network unless already approved.

After edits, run the relevant checks from the accepted plan plus:
```bash
git diff --check
git diff --stat
git diff
```

Update `docs/status/CURRENT_STATE.md` if the current status or next action changes.
````

## 15. Commit Current Work Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Commit the current worktree.

Before committing:
1. Run `git status --short`.
2. Run the relevant planning-doc checker or tests for the changed files.
3. Run `git diff --check`.
4. Run `git diff --stat`.
5. Confirm the files staged match the requested scope.

Include these user-approved files even if they were manually edited:
- [manual file paths, if any]

Commit message:
[conventional commit message]

Do not push.
Do not open a PR.

Final response:
- Commit SHA and message
- Files committed summary
- Checks run
- Worktree status
````

## 16. Context Status Update Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Update `docs/status/CURRENT_STATE.md` only.

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. active spec/plan/batch if needed

Goal:
Make the repo resumable from files.

Update only context that changes future action:
- Active Objective
- Active Contract
- Current Status
- Last Completed Work
- Current Working Files
- Known Issues
- Next Action
- Stop Conditions
- Human Context Needed
- Last Updated

Do not duplicate full specs, plans, diffs, or chat history.

Run:
```bash
git diff --check
git diff -- docs/status/CURRENT_STATE.md
```
````

## 17. Incomplete Work Handoff Prompt

````txt
Mode: Implementation.

We are in `/Users/slouis/Development/apps/block-builder`.

Create or update a concise handoff file under `docs/handoff/` because work is incomplete, interrupted, blocked, or complex enough that the next agent needs a restart package.

Use `docs/handoff/_template.md`.

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. active spec/plan/batch
4. current diff

The handoff must include:
- Resume Point
- Active Files
- What Changed
- What Was Verified
- What Was Not Verified
- Decisions Made
- Assumptions
- Blockers
- Next Steps
- Do Not Do
- Related Docs

Keep it concise.
Do not duplicate full specs, plans, diffs, or chat history.
Also update `docs/status/CURRENT_STATE.md` to point to the handoff.

Run:
```bash
git diff --check
git diff --stat
git diff
```
````

## 18. Roadmap Sync Prompt

````txt
Mode: Plan.

We are in `/Users/slouis/Development/apps/block-builder`.

Sync `docs/roadmap.md` with the accepted specs/plans/batches.

Read:
1. `AGENTS.md`
2. `docs/repo-map.md`
3. `docs/status/CURRENT_STATE.md`
4. `docs/roadmap.md`
5. active specs/plans/batches

Do not edit specs, plans, batches, or application code.

Tasks:
1. Remove stale batch descriptions.
2. Reflect current prerequisite order and approval classes.
3. Keep roadmap items high-level; do not copy plan details.
4. Update `docs/status/CURRENT_STATE.md` if next action changes.

Run:
```bash
git diff --check
git diff --stat
git diff
```
````

## 19. Dependency Review Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

The implementation appears to need a new dependency.

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. active spec/plan/batch

Do not install anything.
Do not edit files.
Do not access the network.

Return:
1. Package name and exact version.
2. Why this dependency is necessary.
3. Alternatives considered.
4. License note.
5. Security/advisory considerations.
6. Transitive dependency impact if known.
7. Exact install command.
8. Files expected to change.
9. Lockfile impact.
10. Rollback command.
11. Whether this is A3.
````

## 20. PR Preparation Prompt

````txt
Mode: Review.

We are in `/Users/slouis/Development/apps/block-builder`.

Prepare the current branch for a PR.

Read:
1. `AGENTS.md`
2. `docs/status/CURRENT_STATE.md`
3. active spec/plan/batch

Do:
1. Run final verification commands from the active plan/batch.
2. Run `bash scripts/agent/agent_finalize.sh` if available and in scope.
3. Summarize final diff.
4. Confirm linked spec/plan/batch/ADR/CRs.
5. Draft a PR title and body.

Do not push.
Do not open a PR unless explicitly approved.
Do not merge.
````

## 21. Token Audit Prompt

````txt
Mode: Discovery.

We are in `/Users/slouis/Development/apps/block-builder`.

Inspect the repo's agent instructions and active task docs.

Do not edit files.
Do not install dependencies.
Do not access the network.

Return:
1. What is always loaded and should be shortened.
2. What should move into skills.
3. What output is too verbose.
4. What logs/tests should be filtered.
5. What repeated context should become durable docs.
6. A minimal edit plan to reduce token usage safely.
````
