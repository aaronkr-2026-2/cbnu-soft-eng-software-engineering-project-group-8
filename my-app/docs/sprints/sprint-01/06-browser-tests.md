# [Sprint 1] Verify desktop, mobile and accessible end-to-end flows

## User story
As a student or adviser, I want the application to work on desktop and mobile with clear feedback so that I can use it reliably.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P2
- Estimate: 3 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Local build and ESLint passed; API/client checks cover predictions and planner errors. The English sage/mint UI is implemented, but a full browser visual/accessibility verification has not been performed. Demo login is in-memory and does not implement student/teacher roles.

## Relevant files
- `my-app/frontend/homepage.jsx`
- `my-app/frontend/detect.jsx`
- `my-app/frontend/study-planner.jsx`
- `my-app/frontend/login.jsx`
- `my-app/src/main.jsx`

## Acceptance criteria
- [ ] Verify homepage navigation, /detect, /study-planner, /login and unknown-route behavior.
- [ ] Test prediction, scenario comparison, sample planner, task completion, download and demo login/logout.
- [ ] Check layouts at desktop and 375px mobile widths with no horizontal overflow or clipped form controls.
- [ ] Verify keyboard navigation, visible focus, labels, error announcements and loading/disabled states.
- [ ] Test unavailable backend, delayed response, invalid input and quota errors without exposing credentials.
- [ ] Attach browser/version/viewport evidence and reproducible test steps; keep paid API calls out of automated default tests.

## Dependencies
- #5: [Sprint 1] Complete the prediction and what-if comparison user flow
- #6: [Sprint 1] Validate the OpenAI Study Planner with a real API response

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
