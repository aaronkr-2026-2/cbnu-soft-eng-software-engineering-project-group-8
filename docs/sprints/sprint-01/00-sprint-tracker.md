# Sprint 1 — Prediction MVP & Study Planner

Updated: 2026-10-13. Repository: aaronkr-2026-2/cbnu-soft-eng-software-engineering-project-group-8.

## Goal
Deliver a reviewable StudentAI demo where students receive a Random Forest G3 estimate, compare study scenarios, and create a seven-day study plan through a separate OpenAI-powered feature.

## Planning assumptions
- Proposed duration: two weeks; dates and due date are not set without team agreement.
- Owners and GitHub assignees remain unassigned until the team agrees responsibilities.
- Estimates are provisional story points, not elapsed hours; total: 19 points.
- Scope is based on current local source and recorded validation. Local implementation does not mean merged, deployed or accepted.
- Existing changes on branch `thanh` must be reviewed separately; this sprint publication does not publish application code.
- Out of scope: database persistence, registration/roles, federated learning, public deployment and automatic grade-improvement guarantees.

## Current evidence
- Random Forest: 30 features excluding G1/G2, 519 training / 130 test records; MAE 2.021, RMSE 2.767, R² 0.215.
- Prediction: 7 Python API and 8 frontend client tests passed; live HTTP through Vite proxy worked.
- Planner: 12 mocked backend tests passed; no successful live OpenAI generation has been confirmed. Account-side API limits/credits need verification.
- Build and ESLint passed locally. Browser end-to-end and visual/accessibility acceptance remains open.
- Results above are previously recorded checks, not tests rerun while writing this plan.

## Sprint backlog
| ID | Work item | Priority | Estimate | Current state |
| --- | --- | --- | --- | --- |
| S1-1 | Deliver the trained Random Forest prediction API | P1 | 3 | Local implementation; acceptance pending |
| S1-2 | Verify the 30-feature input contract and prediction errors | P1 | 2 | Local implementation; acceptance pending |
| S1-3 | Complete the prediction and what-if comparison user flow | P1 | 3 | Local implementation; acceptance pending |
| S1-4 | Validate the OpenAI Study Planner with a real API response | P1 | 3 | Local implementation; live verification blocked |
| S1-5 | Make model comparison and cross-validation reproducible | P2 | 3 | Scripts need alignment |
| S1-6 | Verify desktop, mobile and accessible end-to-end flows | P2 | 3 | Browser verification pending |
| S1-7 | Publish a reproducible sprint demo and reconcile documentation | P1 | 2 | Publication and docs pending |

Work items are linked below. Local documentation and application changes have not been pushed by this issue-publication task.

## API contract
- `POST /api/prediction/predict` (legacy `/predict` supported).
- Response: `{"predicted_grade": 11.43, "model": "RandomForestRegressor", "scale": [0, 20]}` (illustrative).
- Never submit G1, G2 or G3 as features.
- `POST /api/study-planner` is separate from prediction and requires server-side OpenAI configuration.

## Dependencies and check-ins
1. Confirm model/API and input contract (S1-1, S1-2).
2. Review the direct prediction and scenario flow (S1-3); progress planner verification independently (S1-4).
3. Review reproducible evaluation results (S1-5).
4. Verify browser flows (S1-6), then perform clean-checkout demo and publication review (S1-7).
At each check-in, record evidence, remaining defects, blocked work and the next action in the corresponding issue.

## Definition of Done
- [ ] Acceptance criteria are verified with evidence and reviewed by the team.
- [ ] Relevant automated tests, lint and build pass.
- [ ] Desktop/mobile and keyboard/error states are checked for affected user flows.
- [ ] A clean checkout can reproduce the documented demo.
- [ ] Model limitations and the sample-versus-live planner distinction remain visible.
- [ ] No credentials or unrelated files are published.
- [ ] Implementation is committed and published with a reviewed commit/PR reference.
- [ ] Documentation, issue checklist and sprint review are updated.
- [ ] All remaining work is explicitly moved to the backlog rather than reported complete.

## Sprint review / retrospective
Pending: demo outcome, accepted issues, unresolved OpenAI access, defects, evaluation findings, lessons learned and next-sprint actions.


## GitHub work items
- [ ] #3 — Deliver the trained Random Forest prediction API
- [ ] #4 — Verify the 30-feature input contract and prediction errors
- [ ] #5 — Complete the prediction and what-if comparison user flow
- [ ] #6 — Validate the OpenAI Study Planner with a real API response
- [ ] #7 — Make model comparison and cross-validation reproducible
- [ ] #8 — Verify desktop, mobile and accessible end-to-end flows
- [ ] #9 — Publish a reproducible sprint demo and reconcile documentation
