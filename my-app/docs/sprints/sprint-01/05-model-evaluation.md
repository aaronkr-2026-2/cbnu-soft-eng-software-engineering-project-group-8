# [Sprint 1] Make model comparison and cross-validation reproducible

## User story
As an ML researcher, I want reproducible baseline comparisons so that I can evaluate the prediction model's limitations before federated experiments.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P2
- Estimate: 3 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
compare_models.py and cross_validation.py exist, but both use a working-directory-dependent dataset path and separate preprocessing/model definitions. Their Random Forest uses 100 trees, whereas the current saved pipeline uses 200 trees and min_samples_leaf=2. The current saved model has a single held-out evaluation; no newly verified cross-validation report is claimed.

## Relevant files
- `my-app/backend/model/compare_models.py`
- `my-app/backend/model/cross_validation.py`
- `my-app/backend/model/features.py`
- `my-app/backend/model/train_model.py`

## Acceptance criteria
- [ ] Resolve dataset paths relative to the scripts and reuse the shared 30-feature schema.
- [ ] Compare Random Forest, Linear Regression and Gradient Boosting on the same splits; document deliberate configuration differences.
- [ ] Keep preprocessing inside each fold's pipeline to avoid fitting it on validation data.
- [ ] Run five-fold cross-validation on the training partition and preserve the holdout for final evaluation.
- [ ] Save machine-readable MAE, RMSE and R² means/standard deviations with seeds, versions and model parameters.
- [ ] Report limited predictive power honestly; do not assume a model beats Random Forest before testing.
- [ ] Link reproducible commands, result files and the reviewed commit/PR.

## Dependencies
- #3: [Sprint 1] Deliver the trained Random Forest prediction API

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
