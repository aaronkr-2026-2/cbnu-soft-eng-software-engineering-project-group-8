# [Sprint 1] Verify the 30-feature input contract and prediction errors

## User story
As an academic adviser, I want invalid or unavailable predictions to be clearly identified so that I do not mistake missing data for a student's grade.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P1
- Estimate: 2 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Local validation rejects missing/unknown fields, invalid categories, numeric strings, booleans, fractions, invalid ranges, and G1/G2/G3. JSON/content-type/body-size checks and frontend error messages are implemented. Automated coverage exists; browser verification remains outstanding.

## Relevant files
- `backend/model/features.py`
- `backend/app/test_api.py`
- `frontend/detect.jsx`
- `frontend/prediction-api.js`
- `frontend/prediction-api.test.js`

## Acceptance criteria
- [ ] Use exactly the 30 supported features; G1 and G2 must not appear as input fields.
- [ ] Required controls and numeric/category constraints agree between React and Flask.
- [ ] Invalid payloads return HTTP 400 with a message and field-specific errors; malformed JSON, wrong content type and oversized bodies are tested.
- [ ] The frontend displays validation, unavailable-model and network errors without rendering a fake grade.
- [ ] Verify grade zero is shown as a valid result and cancellation is not reported as a successful prediction.
- [ ] Attach automated test output and browser evidence to the reviewed commit/PR.

## Dependencies
- #3: [Sprint 1] Deliver the trained Random Forest prediction API

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
