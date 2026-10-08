# StudentAI Personas and User Stories

These three provisional personas follow the studio template: **Personal, Job, Education, and Relevance**, followed by a concrete situation and user stories. The student and adviser are fictional personas created with the project owner's approval. The ML researcher is a composite persona grounded in Mai Van Thanh and Hilal, whom the project owner identified as ML researchers. Their detailed workflows and needs are design assumptions, not interview findings.

## 1. Minh Nguyen — Student (Primary User)

| Aspect | Persona details |
| --- | --- |
| Personal | Minh, 18, is a final-year secondary-school student who commutes daily and has limited time to study at home. |
| Job | Attends classes, completes assignments, and plans weekly self-study around family responsibilities. |
| Education | Comfortable with websites and mobile forms; has no programming or machine-learning background. Needs everyday language and clearly explained scales. |
| Relevance | Wants to explore an estimated final grade and compare alternative study habits before discussing a realistic study plan with a teacher. |

**Situation:** After missing four classes, Minh enters his current profile. He compares studying 2–5 hours per week with a scenario of 5–10 hours and two absences. He checks both predicted grades and their difference on the grid chart, understanding that this is a simulation rather than a promised improvement.

**User stories**

- As a student, I want to enter my background and study information without providing G1 or G2, so that I can explore a final-grade estimate based on other factors.
- As a student, I want to compare my current profile with a different study-time and absence scenario, so that I can discuss possible study plans with my teacher.

**Basis:** Fictional persona. Minh's name, age, background, and situation were created for this design exercise; no real student or interview is claimed.

## 2. Linh Tran — Teacher and Academic Adviser (Secondary User)

| Aspect | Persona details |
| --- | --- |
| Personal | Linh, 34, is a secondary-school teacher who provides individual academic guidance alongside a full teaching schedule. |
| Job | Teaches classes, reviews attendance and assignments, and meets students who need learning support. |
| Education | Experienced with spreadsheets and school portals; understands assessment but does not write code or train ML models. |
| Relevance | Needs a clear prediction and comparison view to support a student conversation, while keeping educational judgment separate from model output. |

**Situation:** During a short guidance meeting, Linh and a student review the student's form together. They compare two scenarios and read the predicted scores out of 20. If the prediction service is unavailable, Linh needs an explicit error rather than an empty chart that could be mistaken for a score of zero.

**User stories**

- As an academic adviser, I want to see both scenario scores on the same 0–20 chart with a numeric difference, so that I can explain the comparison during a student meeting.
- As an academic adviser, I want clear messages for invalid input or unavailable predictions, so that I do not mistake missing results for a student's predicted performance.

**Basis:** Fictional persona. Linh's name, age, background, and situation were created for this design exercise; no real teacher or interview is claimed.

## 3. ML Researcher — Based on Mai Van Thanh and Hilal (Research Stakeholder)

| Aspect | Persona details |
| --- | --- |
| Personal | Composite persona based on Mai Van Thanh and Hilal, both confirmed by the project owner as ML researchers. Ages and degree levels were not provided. The design context is the StudentAI project. |
| Job | Assumed workflow: prepares datasets, runs experiments, checks model results, and documents findings for project reviews. |
| Education | Assumed technical profile: works with Python, pandas, scikit-learn, and evaluation metrics, and explores federated-learning experiments. Individual proficiency and qualifications have not been confirmed. |
| Relevance | Wants to understand the centralized prediction pipeline and investigate whether federated learning can provide comparable performance while student data remains distributed. |

**Situation (proposed):** A researcher on the team reviews the current Random Forest baseline and checks that G1 and G2 are excluded from the input features. For a later research milestone, the researcher plans a comparison with federated training under different data distributions and uses the project interface to distinguish implemented functionality from planned research.

**User stories**

- As an ML researcher, I want to see the dataset, prediction target, excluded features, and system workflow, so that I can understand the assumptions behind the current prototype.
- As an ML researcher, I want to compare centralized and federated model performance under different data distributions, so that I can assess the project's research question. **Future work:** federated experiments and their results interface are not implemented yet.

**Real-person grounding:** Mai Van Thanh and Hilal. The project owner confirmed that both are ML researchers. They are represented by one shared persona because they have the same stated role; no difference in responsibilities is assumed. The situation and needs above are proposed for the project, not observations from interviews.

## Relationship to the Prototype

| Persona need | Relevant feature or scope |
| --- | --- |
| Enter a student profile | Existing form with 30 input features; G1 and G2 excluded. |
| Compare study scenarios | Existing what-if interface and grid chart; real predictions require the Flask API and trained model. |
| Interpret results and errors | Numeric scores, score difference, input constraints, API error messages, and simulation caveat. |
| Understand the research | Dataset overview, workflow, FAQ, and roadmap on the homepage. |
| Compare centralized and federated learning | Planned research; no completed experiment or comparison dashboard is claimed. |

The personas describe user needs, not implemented account roles. Current authentication is a shared demo account; teacher permissions, student records, and a database are not implemented.

## Grounding Summary

The ML researcher persona is grounded in two real people named by the project owner: Mai Van Thanh and Hilal. The student and adviser remain fictional, as requested. Therefore, the slide's real-person grounding requirement is met for the researcher persona only. If that requirement is mandatory for every card, the two fictional personas will need real examples before submission.
