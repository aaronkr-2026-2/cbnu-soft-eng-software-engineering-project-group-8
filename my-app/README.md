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

Start the Flask API with `python backend/app/app.py` from `my-app` after preparing its Python dependencies and `backend/model/student_model.pkl`. This checkout does not include the trained model or dataset; the existing `backend/model/save_model.py` expects `data/student-por.csv` relative to the `my-app` directory when run from `backend/model`.

The frontend defaults to `http://127.0.0.1:5000`. To use another API, set `VITE_API_BASE_URL` in `my-app/.env.local`, then restart Vite (or rebuild for deployment). The API must allow the frontend origin via CORS. Start the frontend with `npm run dev` from `my-app`.

