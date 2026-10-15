# [Sprint 1] Validate the OpenAI Study Planner with a real API response

## User story
As a student, I want a seven-day plan that fits my available time so that I can turn a learning goal into daily actions.

## Sprint planning
- Sprint: Sprint 1 — Prediction MVP & Study Planner
- Priority: P1
- Estimate: 3 story points (provisional)
- Owner: unassigned; team agreement pending
- Status: open for verification and publication, even where code works locally

## Current evidence (2026-10-13)
Implemented locally: /study-planner, subject/goal/topics/level/start date and daily minutes, task completion, download and a clearly labeled static sample. The Node backend validates structured OpenAI output, rest days and budgets. Twelve mocked API tests passed. A real request encountered an OpenAI 429; the exact account-side quota/billing cause remains unverified, and no successful live plan has been recorded.

## Relevant files
- `my-app/frontend/study-planner.jsx`
- `my-app/frontend/study-planner.css`
- `my-app/backend/planner/server.mjs`
- `my-app/backend/planner/server.test.mjs`
- `my-app/.env.example`

## Acceptance criteria
- [ ] Account owner resolves API access/credits/limits outside the repository; do not post API keys in this issue or its attachments.
- [ ] Complete one real seven-day request through /api/study-planner and attach sanitized evidence.
- [ ] Every study day has actionable tasks within its time budget; rest days have no tasks.
- [ ] Missing configuration, quota/spending limits, throttling, refusal, timeout and invalid output show appropriate messages; no fake fallback is labeled AI-generated.
- [ ] Sample preview remains available without credentials and is clearly distinguished from generated plans.
- [ ] Completion tracking and text download work; page clearly states that progress is not persisted after leaving.
- [ ] Keep keys server-side and ignored by Git; pass npm run test:planner and link the reviewed commit/PR.

## Dependencies
None; can proceed independently.

## Completion evidence
Add test output/screenshots (without secrets), commit/PR link, reviewer and any remaining limitations. Do not close solely based on local implementation.

Sprint tracker: #2
