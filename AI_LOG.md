# AI Development Log

This log records AI-assisted work, implementation changes, and verification performed during the project. Results describe the state at the time of each entry; later entries may supersede earlier ones. Verification below records checks already performed, not new test runs for this documentation update.

## Initial App — Date Not Recorded

- **Tool:** ChatGPT
- **AI Used:** ChatGPT
- **Work:** Project planning, machine-learning model, Flask API, frontend, and debugging.
- **Changes:** Simplified the project and addressed API/CORS issues.
- **Result:** The original project log reported a working student performance prediction MVP. No validation details were recorded in that entry.

## README-Based Interface — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Extend the Vietnamese interface to match the README.
- **Changes:** Added dataset statistics, prediction workflow, planned Federated Learning architecture, roadmap, expandable FAQ, and team information. Replaced unsupported SHAP descriptions, updated page metadata, and aligned the input form with 30 features excluding G1 and G2.
- **Files:** `frontend/homepage.jsx`, `frontend/project-overview.jsx`, `frontend/project-overview.css`, `frontend/detect.jsx`, `index.html`.
- **Validation:** Production build and ESLint passed. No visual browser review was performed.
- **Result:** Responsive project information was added. At this stage, the form still displayed a preparation-only message; API integration was added in the next entry.

## What-If Scenario Comparison — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Compare predictions for the current student profile and an alternative study scenario.
- **Changes:** Added controls for study time and absences, two Flask prediction requests, a responsive SVG bar chart with a grid and fixed 0–20 scale, numeric score differences, and loading/error/empty states. Added response validation, a 20-second timeout, cancellation, and clearing of stale results after input changes.
- **Files:** `frontend/scenario-comparison.jsx`, `frontend/scenario-comparison.css`, `frontend/prediction-api.js`, `frontend/prediction-api.test.js`, `frontend/detect.jsx`, `frontend/project-overview.jsx`, `README.md`.
- **Validation:** Production build, ESLint, and six prediction-client tests passed. Tests covered request data, valid score boundaries, invalid predictions, HTTP failures, malformed responses, network failures, and cancellation.
- **Result:** The frontend can request and compare two model predictions. Simulations are explicitly distinguished from guaranteed or causal improvements in academic performance.
- **Limitations:** Live model predictions were not verified because the trained model and dataset were absent from this checkout. Flask requires `backend/model/student_model.pkl`. The API URL defaults to `http://127.0.0.1:5000` and can be configured with `VITE_API_BASE_URL`.

## Node.js Demo Login — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Add frontend login backed by fake data, without a database.
- **Changes:** Added a navigation login button, `/login` page, demo-account autofill, password visibility toggle, user greeting, logout, and session restoration after page reload. Added Node.js login/me/logout endpoints with hashed password verification, random expiring sessions, HttpOnly SameSite cookies, request validation, origin checks, and login rate limiting. Configured Vite to proxy `/api/auth` to port 3001.
- **Files:** `frontend/auth-context.js`, `frontend/auth-provider.jsx`, `frontend/auth-menu.jsx`, `frontend/login.jsx`, `frontend/login.css`, `backend/auth/server.mjs`, `backend/auth/server.test.mjs`, `src/main.jsx`, `frontend/homepage.jsx`, `frontend/detect.jsx`, `package.json`, `vite.config.js`, `README.md`.
- **Validation:** ESLint and five backend integration tests passed. The production build passed after correcting a UTF-8 BOM in `package.json`. HTTP checks through the existing Vite server verified the login page, successful login, session restoration, logout, and cookie invalidation.
- **Result:** Local demo login works through the frontend proxy. The sample account is `student@demo.com` with password `Student123!`.
- **Limitations:** Accounts and sessions use in-memory demo data. Sessions expire after eight hours or when the backend restarts. Registration, database persistence, and role-based permissions are not implemented. HTTP checks do not constitute visual or interactive browser testing.

## Vite PostCSS Error Recovery — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Resolve the CSS error reported by the user after the login update.
- **Cause:** PowerShell had written a UTF-8 BOM into `package.json`. Although the file was corrected, the running Vite process retained the failed PostCSS configuration in memory.
- **Changes:** Confirmed both package manifests were valid JSON without BOM and edited `vite.config.js` to trigger a Vite restart.
- **Validation:** All five frontend CSS requests, `/login`, and the proxied login API returned HTTP 200 after restart.
- **Result:** The previously reproduced CSS HTTP 500 failures were resolved; the user was asked to refresh the browser.

## Personas and User Stories — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Create `personas.md` following the supplied studio slide.
- **Changes:** Added three persona cards with Personal, Job, Education, and Relevance sections, a concrete usage situation, and two user stories in the “As a …, I want to …, so that …” format. Related their needs to implemented features and planned research.
- **User clarification:** Mai Van Thanh and Hilal were both identified by the user as ML researchers. The researcher card was updated to a composite persona based on them. Fictional student Minh Nguyen and adviser Linh Tran were retained with the user's permission.
- **Validation:** Checked the document for the required sections, stories, and confirmed names.
- **Result:** Three personas document the intended student, adviser, and researcher needs. Assumed workflows and fictional biographies are clearly labeled; no interviews or unverified qualifications are claimed.

## README Existing Features Update — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Update the README to reflect the current implementation.
- **Changes:** Replaced the short Current MVP section with an Existing Features list covering the interface, student form, scenario comparison, grid chart, prediction API integration, demo authentication, and automated checks. Updated the technology stack and roadmap, linked `personas.md`, and clarified runtime requirements and planned features.
- **Validation:** Reviewed the relevant source files and ran `git diff --check` for the documentation changes.
- **Result:** The README distinguishes implemented code from runtime dependencies and future development.

## Documentation Commit and Push — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Publish only `README.md`, `personas.md`, and `SPRINT_01.md` to branch `thanh`, as requested.
- **Changes:** Fetched `origin/thanh` and created an isolated worktree from its latest commit because the remote had a new README update and the main workspace contained many unrelated staged files. Copied the three requested documents into that worktree and committed them together.
- **Commit:** `ff3af5b` — `Update project docs with features, personas, and sprint 1 plan`.
- **Validation:** Checked the staged documentation diff and confirmed the commit contained exactly the three requested document paths. Git reported a successful push to `origin/thanh`.
- **Result:** The three documents were published. The main workspace's staged code changes were preserved. `AI_LOG.md` was not included in that push.

## AI Log Consolidation — 2026-10-08

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Update this log at the user's request.
- **Changes:** Standardized the entry format, preserved the original MVP history, added recorded validation results and limitations, incorporated the confirmed persona roles, and documented the three-file commit and push.
- **Validation:** Reviewed entries against the work and tool results recorded in this session; checked the Markdown diff for whitespace errors.
- **Result:** Updated `AI_LOG.md` locally. This log update has not been committed or pushed.

## Study Planner — 2026-10-12

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Add a separate study planning feature using the OpenAI API.
- **Changes:** Added `/study-planner`, navigation links, a responsive sage/mint interface, daily time budgets, a clearly labeled static preview, task completion and text download. Added a separate Node.js planner service using the Responses API with strict JSON output, server-side validation, timeouts and local rate limits. Added ignored environment configuration, launcher scripts and setup documentation.
- **Validation:** All 10 planner validation/API tests passed with mocked OpenAI responses; production build and ESLint passed. No live OpenAI request or browser visual test was performed.
- **Result:** The sample is available without credentials. Real AI generation requires an OpenAI API key in `.env` and the planner service. Changes are local and have not been committed or pushed.

## Random Forest prediction API — 2026-10-13

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Complete a locally trained Random Forest backend and connect it to the frontend.
- **Changes:** Added a shared 30-feature contract, repeatable training/saving, holdout metrics, Flask validation and health endpoints, a Vite prediction proxy, Python launch scripts and pinned dependencies. Added a single-profile prediction button/result with cancellation and error handling. Preserved the scenario comparison flow. Ignored Python environment/model artifacts and excluded the environment from ESLint.
- **Validation:** Trained on 519 of 649 existing records and evaluated on 130 held-out records (MAE 2.021, RMSE 2.767, R² 0.215). Passed 7 Python API integration tests against the trained artifact and 8 frontend API-client tests; build and ESLint passed. A real HTTP request through Vite's proxy returned a Random Forest prediction of 11.43/20 for the first data row; `/detect` returned HTTP 200. No browser visual test was performed.
- **Result:** Prediction API runs locally on port 5000 and requires no OpenAI credentials. Changes remain local; no commit or push was performed.

## Sprint 1 GitHub Issues — 2026-10-13

- **Tool:** Codex
- **AI Used:** ChatGPT
- **Work:** Update sprint planning from the current project and publish it to GitHub Issues at the owner's request.
- **Changes:** Replaced the outdated Sprint 1 contract with the 30-feature G3 prediction flow, separate Study Planner, remaining model-evaluation alignment, browser acceptance and reproducible handover. Created milestone 1, sprint tracker #2, and work issues #3–#9 in aaronkr-2026-2/cbnu-soft-eng-software-engineering-project-group-8. Saved issue bodies and a link manifest under docs/sprints/sprint-01.
- **Planning:** Proposed 19 story points and a two-week duration; no due date or assignees set without team agreement. Local implementation evidence is explicitly distinguished from merged/accepted work; all issues remain open.
- **Validation:** Read back all eight issues through GitHub API and verified open state and milestone membership. No application tests were rerun for this documentation-only task.
- **Result:** GitHub sprint issues are published. Local documentation and application changes have not been committed or pushed by this task.


## 2026-10-15 ? Repository layout cleanup

- Moved the application, backend, datasets and documentation to the repository root.
- Updated documented paths and renamed the npm package to `studentai`.
- Consolidated package manifests and ignore rules; local environment settings and generated artifacts remain ignored.
- Validation after relocation: production build, ESLint and all 32 automated tests passed from the repository root.
