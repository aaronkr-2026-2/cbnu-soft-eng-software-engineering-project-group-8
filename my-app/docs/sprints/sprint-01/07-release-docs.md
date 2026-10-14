# [Sprint 1] Publish a reproducible sprint demo and reconcile documentation

## User story
As a teammate or reviewer, I want to run the sprint deliverable from a clean checkout so that I can verify the work and acceptance criteria.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P1
- Estimate: 2 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Setup scripts, pinned Python requirements and detailed README sections exist locally. The README overview still describes a Vietnamese UI and says the dataset is absent, which conflicts with the current workspace. Sprint 1's older plan also referenced G1/G2 input and a prediction response key. Local changes must be reviewed and published before satisfying the original Git-based Definition of Done.

## Relevant files
- `my-app/README.md`
- `my-app/SPRINT_01.md`
- `my-app/AI_LOG.md`
- `my-app/package.json`
- `my-app/backend/requirements.txt`
- `my-app/.env.example`
- `my-app/.gitignore`

## Acceptance criteria
- [ ] Update README feature/runtime summaries to reflect the English UI, current dataset availability, Random Forest API and separate Study Planner.
- [ ] Document ports 5173/5000/3001/3002, separate startup commands, training and Vite proxy behavior.
- [ ] Document a clean Python environment and dependency installation; verify the dataset is available or document a reproducible licensed retrieval step.
- [ ] Verify secrets, .env, virtual environments and generated model binaries are excluded from published changes.
- [ ] Run prediction API/client, planner and authentication tests, ESLint and build from the documented setup.
- [ ] Publish only reviewed project changes with a commit/PR link; do not include unrelated staged files.
- [ ] Record demo evidence, review results, unfinished items and issue links before closing the sprint.

## Dependencies
- #3: [Sprint 1] Deliver the trained Random Forest prediction API
- #4: [Sprint 1] Verify the 30-feature input contract and prediction errors
- #5: [Sprint 1] Complete the prediction and what-if comparison user flow
- #6: [Sprint 1] Validate the OpenAI Study Planner with a real API response
- #7: [Sprint 1] Make model comparison and cross-validation reproducible
- #8: [Sprint 1] Verify desktop, mobile and accessible end-to-end flows

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
