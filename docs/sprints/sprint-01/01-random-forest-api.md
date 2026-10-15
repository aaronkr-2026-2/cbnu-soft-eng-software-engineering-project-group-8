# [Sprint 1] Deliver the trained Random Forest prediction API

## User story
As a student, I want a final-grade estimate from my profile so that I can discuss my learning progress with an adviser.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P1
- Estimate: 3 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Implemented locally: shared 30-feature contract, preprocessing + 200-tree RandomForestRegressor, train/save command, health endpoint, and prediction endpoint. The latest local run used 519 training and 130 test records (MAE 2.021, RMSE 2.767, R² 0.215). Seven Python integration tests passed. This is local evidence, not a claim that these changes are merged.

## Relevant files
- `backend/model/features.py`
- `backend/model/train_model.py`
- `backend/model/save_model.py`
- `backend/model/student_model.metrics.json`
- `backend/app/app.py`

## Acceptance criteria
- [ ] Train from data/student-por.csv using npm run train:model, with paths independent of the shell working directory.
- [ ] Save the complete preprocessing/model pipeline and a reproducible metrics report; exclude G1, G2 and G3 from inputs.
- [ ] GET /api/prediction/health returns ready only when a compatible model loads.
- [ ] POST /api/prediction/predict returns predicted_grade as a finite number on the 0–20 scale; retain legacy /predict support.
- [ ] Missing or incompatible model returns HTTP 503 without crashing the server.
- [ ] Publish the reviewed implementation and attach the commit/PR plus npm run test:prediction output.

## Dependencies
None; can proceed independently.

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
