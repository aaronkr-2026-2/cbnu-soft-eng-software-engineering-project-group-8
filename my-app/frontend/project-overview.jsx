import "./project-overview.css";

const roadmap = [
  { title: "MVP foundation", state: "Completed according to the README", description: "A Random Forest model, Flask API, and web interface. The React form supports comparing two scenarios through the prediction API.", items: ["Prediction model", "Flask REST API", "Data entry interface"] },
  { title: "Federated Learning", state: "Planned", description: "Extend training to distributed data and evaluate performance against a centralized model.", items: ["Database", "Federated Learning", "Compare both approaches", "Non-IID data experiments"] },
  { title: "Evaluation & deployment", state: "Planned", description: "Improve system quality and compile research findings.", items: ["Testing & security", "Cloud deployment", "Research paper"] },
];

export default function ProjectOverview() {
  return (
    <>
      <section id="dataset" className="project-section" aria-labelledby="dataset-title">
        <div className="section-intro">
          <span className="section-label">RESEARCH DATA</span>
          <h2 id="dataset-title">Understand the data before predicting</h2>
          <p>The UCI Student Performance dataset provides the foundation for the project's research into academic performance.</p>
        </div>
        <dl className="dataset-stats">
          <div><dt>Student records</dt><dd>649</dd></div>
          <div><dt>Input features</dt><dd>30</dd></div>
          <div><dt>Final grade scale</dt><dd>0–20</dd></div>
          <div><dt>Prediction target</dt><dd>G3</dd></div>
        </dl>
        <div className="dataset-note"><strong>Predicting from the learning context</strong><p>Personal, family, academic, and lifestyle information is used as input. G1 and G2 grades are excluded so the model does not rely on grades from previous terms.</p></div>
      </section>

      <section className="project-section" aria-labelledby="workflow-title">
        <div className="section-intro"><span className="section-label">HOW THE SYSTEM WORKS</span><h2 id="workflow-title">One process, from information to grades</h2><p>The prediction architecture described in the project.</p></div>
        <ol className="prediction-flow">
          {[ ["Student information", "Enter the features through the interface."], ["Flask API", "Receive the form data."], ["Random Forest", "Process the data and estimate the G3 grade."], ["Results", "Display the predicted grade on a 20-point scale."] ].map(([title, description], index) => (
            <li key={title}><span className="flow-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>
          ))}
        </ol>
      </section>

      <section id="research" className="project-section" aria-labelledby="research-title">
        <div className="research-panel">
          <div><span className="research-badge">RESEARCH DIRECTION · PLANNED</span><h2 id="research-title">Learning together from distributed data</h2><p>Can Federated Learning match centralized learning in prediction performance while student data remains at each institution?</p><p className="research-caption">This is the project's research question. Comparison results will be added after the experiments.</p></div>
          <div className="federated-diagram" aria-label="Planned architecture: three institutions send model updates to an aggregation server to create a global model">
            <div className="client-nodes"><span>Institution 1</span><span>Institution 2</span><span>Institution 3</span></div>
            <p aria-hidden="true">↓ &nbsp; Model updates &nbsp; ↓</p>
            <div className="aggregation-node">Aggregation server</div><p aria-hidden="true">↓</p><div className="global-node">Global model</div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="project-section" aria-labelledby="roadmap-title">
        <div className="section-intro"><span className="section-label">ROADMAP</span><h2 id="roadmap-title">Developing the system step by step</h2><p>Development milestones based on the project documentation.</p></div>
        <div className="roadmap-grid">{roadmap.map((phase, index) => <article className="roadmap-card" key={phase.title}><span className={`phase-status ${index === 0 ? "phase-complete" : ""}`}>{phase.state}</span><h3>{phase.title}</h3><p>{phase.description}</p><ul>{phase.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="project-section faq-section" aria-labelledby="faq-title">
        <div className="section-intro"><span className="section-label">FAQ</span><h2 id="faq-title">Before you start</h2></div>
        <details><summary>What does the G3 grade mean?</summary><p>G3 is the final grade on a scale from 0 to 20. It is the value the model predicts, rather than an input field.</p></details>
        <details><summary>Why are G1 and G2 not included as inputs?</summary><p>The project excludes grades from the previous two terms to study predictions based on other factors such as study time, family support, and absences.</p></details>
        <details><summary>How do I compare two scenarios?</summary><p>Enter a profile, adjust study time and absences in the comparison section, then click Compare scenarios. When the prediction server is running, the chart shows both grades and their difference on a 20-point scale.</p></details>
        <details><summary>Has Federated Learning been implemented yet?</summary><p>Not yet. It is planned in the roadmap, along with comparisons against a centralized model and experiments with Non-IID data.</p></details>
      </section>

      <section className="project-section" aria-labelledby="team-title">
        <div className="team-panel"><div><span className="section-label">PROJECT TEAM · GROUP E</span><h2 id="team-title">Chungbuk National University</h2><p>Advanced Software Engineering course</p></div><ul><li>Hilal Mohammad</li><li>Mai van Than</li></ul></div>
      </section>
    </>
  );
}

