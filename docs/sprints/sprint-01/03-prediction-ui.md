# [Sprint 1] Complete the prediction and what-if comparison user flow

## User story
As a student, I want to see my predicted grade and compare a different study-time/absence scenario so that I can explore options with my teacher.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P1
- Estimate: 3 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Implemented locally: Predict my grade button, result out of 20, loading/error states, abort and stale-result clearing, plus two-scenario comparison. A real HTTP request through Vite's prediction proxy returned 11.43 for the first dataset row, and /detect returned HTTP 200. No full browser interaction test has been recorded.

## Relevant files
- `frontend/detect.jsx`
- `frontend/detect.css`
- `frontend/prediction-api.js`
- `frontend/scenario-comparison.jsx`
- `vite.config.js`

## Acceptance criteria
- [ ] Submit the complete form to /api/prediction/predict without a page reload and display predicted_grade.
- [ ] Loading, timeout, backend-down and retry states are understandable and accessible.
- [ ] Editing/resetting the profile aborts obsolete requests and prevents stale results from appearing.
- [ ] Scenario comparison shows both grades, their difference and a fixed 0–20 chart; partial failures must not appear as valid comparisons.
- [ ] Explain that predictions and scenario changes do not guarantee grades or establish causation.
- [ ] Verify direct prediction and comparison in a browser and attach evidence plus the commit/PR.

## Dependencies
- #3: [Sprint 1] Deliver the trained Random Forest prediction API
- #4: [Sprint 1] Verify the 30-feature input contract and prediction errors

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
