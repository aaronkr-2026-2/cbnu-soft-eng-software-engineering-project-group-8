# AI-Based System for Student Performance Prediction

## Overview

A web-based AI system that predicts student final grades using machine learning. The project will later extend the centralized model into a Federated Learning system to explore privacy-preserving distributed training.

## Vision

To build a practical student performance prediction system that can use distributed student data without requiring all raw data to be stored in one central location.

## Research Question

**Can Federated Learning achieve comparable prediction performance to centralized learning while keeping student data distributed?**

## Existing Features

- **Responsive Vietnamese interface:** Homepage, student analysis page (`/detect`), and login page (`/login`) with navigation and layouts for desktop and mobile screens.
- **Project overview:** Dataset statistics, prediction workflow, planned Federated Learning architecture, development roadmap, expandable FAQ, and team information.
- **Student information form:** 30 input features covering personal background, family, study habits, and lifestyle. G1 and G2 are excluded; G3 is the prediction target.
- **Input validation and sample data:** Required fields, numeric range constraints, descriptive dropdowns, prefilled sample values, and a button to restore the sample profile.
- **What-if scenario comparison:** Adjust study time and absences while keeping other profile fields unchanged, then request predictions for both the current and alternative scenarios.
- **Grid chart and result summary:** Compare two predicted grades on a fixed 0–20 bar chart, with numeric scores and their difference. Results are labeled as model simulations, not guaranteed improvements.
- **Prediction API integration:** Frontend calls the Flask `POST /predict` endpoint and reads `predicted_grade`. Existing Python scripts train and save a Random Forest pipeline with preprocessing.
- **Prediction request feedback:** Loading, empty, and error states; response validation; a 20-second comparison timeout; cancellation and clearing of stale results when inputs change.
- **Demo login and logout:** Navigation login button, email/password form, sample-account autofill, password visibility toggle, user greeting, and logout.
- **Node.js authentication API:** Login, session lookup, and logout endpoints backed by in-memory demo data, hashed password verification, expiring HttpOnly cookies, and login rate limiting. Sessions survive page reloads and clear on backend restart.
- **Automated API checks:** Tests for prediction response handling and authentication flows, plus ESLint and a Vite production build command.

**Runtime requirements:** Real grade predictions require the Flask service, its Python dependencies, and `backend/model/student_model.pkl`. The trained model and dataset are not included in this checkout. Demo authentication requires the Node.js auth server and the frontend development proxy; it does not require a database. Setup instructions appear below.

**Planned features:** Database persistence, registration and role-based access, Federated Learning experiments, centralized-versus-federated evaluation, and cloud deployment are not implemented. See the roadmap for research milestones.

**User needs:** [Personas and user stories](personas.md) describe the student, academic adviser, and ML researcher personas that inform the interface.

## Technology Stack

* **Frontend:** React, Vite, React Router, JavaScript, HTML, CSS
* **Prediction backend:** Python, Flask
* **Authentication backend:** Node.js built-in HTTP server with in-memory demo sessions
* **ML:** Scikit-learn, Pandas, NumPy
* **Model:** Random Forest Regressor
* **Tools:** VS Code, Git, GitHub

## Dataset

**UCI Student Performance Dataset**

* 649 student records
* Target: `G3` (final grade)
* `G1` and `G2` are excluded to avoid using previous grades for prediction.

## Architecture

```text
Student Information
        ↓
Frontend
        ↓
Flask API
        ↓
ML Model
        ↓
Predicted Grade
```

Planned Federated Learning architecture:

```text
Client 1 ─┐
Client 2 ─┼→ Aggregation Server → Global Model
Client 3 ─┘
```

## Roadmap

* [x] Prediction pipeline and frontend integration (trained model required at runtime)
* [x] Flask API
* [x] Responsive React frontend and project overview
* [x] What-if scenario comparison and grid chart
* [x] Node.js demo authentication and session handling
* [x] Authentication API and prediction-client tests
* [ ] Database
* [ ] Federated Learning
* [ ] Centralized vs. Federated comparison
* [ ] Non-IID data experiments
* [ ] Broader end-to-end testing and production security hardening
* [ ] Cloud deployment
* [ ] Research paper

## AI-Assisted Development

AI tools are used for planning, coding assistance, debugging, and documentation. All generated code is reviewed, tested, and understood by the project team. An `AI_LOG.md` file will document AI collaboration throughout the project.

## Team

**Course:** Advanced Software Engineering
**University:** Chungbuk National University
**Group:** E

* Hilal Mohammad
* Mai van Than 

## Scenario comparison UI

Open `/detect`, complete the student profile, then compare a scenario with different study time and absences. Two predictions are displayed on a grid chart with a fixed 0–20 scale. Editing input clears previous results. These are model simulations, not guarantees of improved grades.

The Random Forest API uses `data/student-por.csv` and a locally generated model artifact. See the setup below; training paths are resolved relative to the script rather than the current working directory.

The frontend defaults to `/api/prediction`, which Vite proxies to `http://127.0.0.1:5000`. An optional `VITE_API_BASE_URL` overrides this base URL; restart Vite after changing it. Static production deployments need a same-origin `/api/prediction` reverse proxy or an explicit API base URL and allowed CORS origin.

## Study Planner (OpenAI API)

Visit `/study-planner` or choose **Study Planner** in the navigation. Enter a subject, weekly goal, optional weak topics, level, start date, and available minutes for each of seven days. Use 0 for a rest day or 10–180 minutes for a study day. The page shows daily tasks, completion progress, and a text download. Progress is held only while the page is open; download the plan to keep it.

**Preview a sample plan** works without an API key and is explicitly labeled as a static, non-AI example. Real generation requires the separate planner service and an OpenAI API key with API billing/access enabled.

From `my-app`, copy `.env.example` to `.env` and set `OPENAI_API_KEY` locally. `.env` is ignored by Git. Do not put keys in JSX or any `VITE_*` variable. `OPENAI_MODEL` defaults to `gpt-5-mini` and can be changed to a Responses API model supporting the supplied strict JSON schema.

Use Node.js 22.9+ (or Node.js 24 LTS) for the `--env-file-if-exists` launcher. Start these commands in separate terminals:

```sh
npm run dev:planner
npm run dev
```

Run `npm run dev:auth` separately if you also want the existing demo login. The planner works independently of login and Random Forest; it does not require the Python model or dataset. Restart the planner after changing `.env`.

The planner listens on `127.0.0.1:3002`, with Vite proxying `POST /api/study-planner`. It calls `https://api.openai.com/v1/responses` server-side with `store: false` and structured JSON output. Only study preferences are forwarded. The server checks seven ordered days, rest days, task structure, and daily time budgets before returning a plan. Missing configuration, refusals, timeouts, rate limits and invalid outputs produce explicit errors; no fake plan is substituted.

This is a local development integration with five requests per minute per address and at most two concurrent AI requests. Before public deployment, add user authentication and per-user usage budgets, and configure an HTTPS same-origin reverse proxy plus `FRONTEND_ORIGIN`. The Vite development proxy is not included in static production builds. API calls incur OpenAI usage charges.

Run `npm run test:planner` for validation and HTTP integration tests using mocked OpenAI responses; these make no paid API calls. Official references: [Responses quickstart](https://developers.openai.com/api/docs/quickstart) and [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

## Random Forest prediction backend

The Analysis page (`/detect`) now predicts a single profile with **Predict my grade**, and continues to support two-scenario comparison. Both use the same trained Random Forest API. Editing the profile cancels an outstanding single prediction and clears its previous result. This feature runs locally without an OpenAI key or API credits.

Initial setup from `my-app` (Python 3.10+):

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
npm run train:model
```

On macOS/Linux, use `python3 -m venv .venv` and `.venv/bin/python -m pip install -r backend/requirements.txt`. The npm launcher selects the project virtual environment when present.

Start in separate terminals:

```sh
npm run dev:prediction
npm run dev
```

Restart Vite if it was already running before the proxy was added. The API binds to `127.0.0.1:5000` without debug mode. Training is explicit; the server does not silently retrain or substitute fake predictions. If the model is absent or incompatible, health and prediction return HTTP 503. Retrain and restart the service to recover. For production, use a WSGI server and reverse proxy rather than Flask's development server.

Endpoints:

- `GET /api/prediction/health`: model readiness and expected feature count.
- `POST /api/prediction/predict`: the 30 fields from the Analysis form as a JSON object. Numeric fields must be whole numbers within the displayed ranges; categorical values must match their options. G1, G2, G3 and unknown fields are rejected.
- Legacy `/health` and `/predict` routes are also supported.

A successful response has this shape (illustrative value):

```json
{"predicted_grade": 11.43, "model": "RandomForestRegressor", "scale": [0, 20]}
```

Validation errors return HTTP 400 with `message` and field-specific `errors`; wrong content type returns 415 and requests over 16 KB return 413. CORS allows localhost frontend origins by default; set the process environment variable `FRONTEND_ORIGIN` for another origin.

The pipeline one-hot encodes categorical features, retains numeric features, and fits a 200-tree Random Forest (`min_samples_leaf=2`, seed 42). G1 and G2 are excluded. A fixed 80/20 split keeps the 130 test records out of training; the saved model is the same model evaluated on that holdout. Model files are ignored by Git and must be generated locally using the pinned requirements.

Latest run on 649 records: 519 training / 130 test, MAE **2.021**, RMSE **2.767**, R² **0.215**. These holdout results show limited predictive power, not a guarantee of future accuracy or a causal effect of study habits. Full results and feature names are in `backend/model/student_model.metrics.json`.

Validation commands (train first):

```sh
npm run test:prediction
npm run test:prediction-client
npm run build
npm run lint
```
