import AuthMenu from "./auth-menu.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./detect.css";
import ScenarioComparison from "./scenario-comparison.jsx";
import { predictGrade } from "./prediction-api.js";

// Values from the supplied CSV row; asterisks are annotations, not data.
// G3 = 11 is the reference target and is never included in prediction inputs.
const initialForm = {
  school: "GP",
  sex: "F",
  age: 18,
  address: "U",
  famsize: "GT3",
  Pstatus: "A",
  Medu: 4,
  Fedu: 4,
  Mjob: "at_home",
  Fjob: "teacher",
  reason: "course",
  guardian: "mother",
  traveltime: 2,
  studytime: 2,
  failures: 0,
  schoolsup: "yes",
  famsup: "no",
  paid: "no",
  activities: "no",
  nursery: "yes",
  higher: "yes",
  internet: "no",
  romantic: "no",
  famrel: 4,
  freetime: 3,
  goout: 4,
  Dalc: 1,
  Walc: 1,
  health: 3,
  absences: 4,
};

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label} <code className="field-code">{name}</code></label>
    <select id={name} name={name} value={value} onChange={onChange} required>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value} — {option.label}
        </option>
      ))}
    </select>
  </div>
);

const NumberField = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label} <code className="field-code">{name}</code></label>
    <input
      id={name}
      name={name}
      required
      step="1"
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </div>
);

const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const optionsFrom = (labels) => labels.map((label, index) => ({ value: index + 1, label }));
const oneToFive = optionsFrom(["Very low", "Low", "Average", "High", "Very high"]);
const familyScale = optionsFrom(["Very poor", "Poor", "Average", "Good", "Very good"]);
const healthScale = optionsFrom(["Very poor", "Poor", "Average", "Good", "Very good"]);
const educationOptions = ["No formal education", "Primary education (up to grade 4)", "Grades 5–9", "Secondary education", "Higher education"].map((label, value) => ({ value, label }));
const travelOptions = optionsFrom(["Under 15 minutes", "15–30 minutes", "30 minutes–1 hour", "Over 1 hour"]);
const studyOptions = optionsFrom(["Under 2 hours/week", "2–5 hours/week", "5–10 hours/week", "Over 10 hours/week"]);

function Detect() {
  const [formData, setFormData] = useState(initialForm);
  const baselineFormRef = useRef(null);
  const [resetVersion, setResetVersion] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState("");
  const predictionRequest = useRef(null);
  const resultRef = useRef(null);
  useEffect(() => () => predictionRequest.current?.abort(), []);

  const clearPrediction = () => {
    predictionRequest.current?.abort();
    predictionRequest.current = null;
    setPrediction(null);
    setPredictionError("");
    setPredicting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearPrediction();


    setFormData((previous) => ({
      ...previous,
      [name]: typeof initialForm[name] === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearPrediction();
    const controller = new AbortController();
    predictionRequest.current = controller;
    setPredicting(true);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const grade = await predictGrade(formData, controller.signal);
      if (predictionRequest.current === controller) {
        setPrediction(grade);
        requestAnimationFrame(() => resultRef.current?.focus());
      }
    } catch (error) {
      if (predictionRequest.current === controller) setPredictionError(controller.signal.aborted ? "The prediction request timed out. Please try again." : error.message);
    } finally {
      clearTimeout(timeout);
      if (predictionRequest.current === controller) { predictionRequest.current = null; setPredicting(false); }
    }
  };

  const handleReset = () => {
    clearPrediction();
    setFormData(initialForm);
    setResetVersion(version => version + 1);

  };

  return (
    <div className="detect-page">
      {/* HEADER */}
      <header className="home-header">
        <Link to="/" className="home-logo">
          Student<span>AI</span>
        </Link>
        <nav className="home-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <a href="/#about">About</a>
          <Link to="/detect" className="active" aria-current="page">Analysis</Link>
          <Link to="/study-planner">Study Planner</Link>
          <AuthMenu />
        </nav>
      </header>

      {/* HERO */}
      <section className="detect-hero">
        <span className="home-badge">AI STUDENT ANALYSIS</span>

        <h1>Student data analysis</h1>

        <p>
          Enter 30 features to prepare a prediction of the final grade, G3.
          The fields are prefilled with the sample data you provided.
        </p>
      </section>

      <main className="detect-content">
        <p className="demo-notice">Complete the profile, then try changing study habits to compare two predicted grades.</p>
        <form ref={baselineFormRef} className="analysis-card" onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}
          <section className="form-section">
            <div className="section-title">
              <span>01</span>
              <div>
                <h2>Basic information</h2>
                <p>General student information</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="School"
                name="school"
                value={formData.school}
                onChange={handleChange}
                options={[
                  { value: "GP", label: "Gabriel Pereira" },
                  { value: "MS", label: "Mousinho da Silveira" },
                ]}
              />

              <SelectField
                label="Gender"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                  { value: "F", label: "Female" },
                  { value: "M", label: "Male" },
                ]}
              />

              <NumberField
                label="Age"
                name="age"
                value={formData.age}
                min={15}
                max={22}
                onChange={handleChange}
              />

              <SelectField
                label="Residential area"
                name="address"
                value={formData.address}
                onChange={handleChange}
                options={[
                  { value: "U", label: "Urban" },
                  { value: "R", label: "Rural" },
                ]}
              />

              <SelectField
                label="Family size"
                name="famsize"
                value={formData.famsize}
                onChange={handleChange}
                options={[
                  { value: "LE3", label: "≤ 3 people" },
                  { value: "GT3", label: "> 3 people" },
                ]}
              />

              <SelectField
                label="Parents' living arrangement"
                name="Pstatus"
                value={formData.Pstatus}
                onChange={handleChange}
                options={[
                  { value: "T", label: "Living together" },
                  { value: "A", label: "Living apart" },
                ]}
              />
            </div>
          </section>

          {/* FAMILY */}
          <section className="form-section">
            <div className="section-title">
              <span>02</span>
              <div>
                <h2>Family</h2>
                <p>Information about parents and the home environment</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Mother's education"
                name="Medu"
                value={formData.Medu}
                options={educationOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Father's education"
                name="Fedu"
                value={formData.Fedu}
                options={educationOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Mother's occupation"
                name="Mjob"
                value={formData.Mjob}
                onChange={handleChange}
                options={[
                  { value: "teacher", label: "Teacher" },
                  { value: "health", label: "Healthcare" },
                  { value: "services", label: "Services" },
                  { value: "at_home", label: "At home" },
                  { value: "other", label: "Other" },
                ]}
              />

              <SelectField
                label="Father's occupation"
                name="Fjob"
                value={formData.Fjob}
                onChange={handleChange}
                options={[
                  { value: "teacher", label: "Teacher" },
                  { value: "health", label: "Healthcare" },
                  { value: "services", label: "Services" },
                  { value: "at_home", label: "At home" },
                  { value: "other", label: "Other" },
                ]}
              />

              <SelectField
                label="Guardian"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
                options={[
                  { value: "mother", label: "Mother" },
                  { value: "father", label: "Father" },
                  { value: "other", label: "Other" },
                ]}
              />

              <SelectField
                label="Family relationships"
                name="famrel"
                value={formData.famrel}
                options={familyScale}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* STUDY */}
          <section className="form-section">
            <div className="section-title">
              <span>03</span>
              <div>
                <h2>Study</h2>
                <p>Study time and learning support</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Reason for choosing the school"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                options={[
                  { value: "home", label: "Close to home" },
                  { value: "reputation", label: "School reputation" },
                  { value: "course", label: "Suitable curriculum" },
                  { value: "other", label: "Other" },
                ]}
              />

              <SelectField
                label="Travel time to school"
                name="traveltime"
                value={formData.traveltime}
                options={travelOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Weekly study time"
                name="studytime"
                value={formData.studytime}
                options={studyOptions}
                onChange={handleChange}
              />

              <NumberField
                label="Past class failures"
                name="failures"
                value={formData.failures}
                min={0}
                max={4}
                onChange={handleChange}
              />

              <SelectField
                label="School support"
                name="schoolsup"
                value={formData.schoolsup}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Family support"
                name="famsup"
                value={formData.famsup}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Paid extra classes"
                name="paid"
                value={formData.paid}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Plans for higher education"
                name="higher"
                value={formData.higher}
                onChange={handleChange}
                options={yesNo}
              />
            </div>
          </section>

          {/* LIFESTYLE */}
          <section className="form-section">
            <div className="section-title">
              <span>04</span>

              <div>
                <h2>Lifestyle & activities</h2>
                <p>Student activities and habits</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Extracurricular activities"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Attended nursery school"
                name="nursery"
                value={formData.nursery}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Internet access at home"
                name="internet"
                value={formData.internet}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="In a romantic relationship"
                name="romantic"
                value={formData.romantic}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Free time (1–5)"
                name="freetime"
                value={formData.freetime}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Going out (1–5)"
                name="goout"
                value={formData.goout}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Weekday alcohol consumption (1–5)"
                name="Dalc"
                value={formData.Dalc}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Weekend alcohol consumption (1–5)"
                name="Walc"
                value={formData.Walc}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Health (1–5)"
                name="health"
                value={formData.health}
                onChange={handleChange}
                options={healthScale}
              />

              <NumberField
                label="Number of absences"
                name="absences"
                value={formData.absences}
                min={0}
                max={93}
                onChange={handleChange}
              />
            </div>
          </section>

          <div className="form-section">
            <div className="target-note">
              <strong>G3</strong>
              <span>The final grade to predict is on a 0–20 scale. Following the research design, G1 and G2 grades are not used as inputs.</span>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Restore sample data
            </button>

            <button type="submit" className="analyse-btn" disabled={predicting}>
              {predicting ? "Predicting…" : "Predict my grade →"}
            </button>
          </div>
        </form>

        <div aria-live="polite">
          {predicting && <p role="status">Analyzing your profile with Random Forest…</p>}
          {predictionError && <p className="prediction-error" role="alert">{predictionError}</p>}
          {prediction !== null && <section className="result-card" aria-labelledby="prediction-title">
            <span>RANDOM FOREST · FINAL GRADE</span>
            <h2 id="prediction-title" ref={resultRef} tabIndex={-1}>Your predicted G3: {prediction.toFixed(2)} / 20</h2>
            <p>Estimated from 30 student features, without G1 or G2. This is a model estimate, not a guaranteed result.</p>
            <a className="home-button secondary" href="#scenario-comparison">Explore a different study scenario ↓</a>
          </section>}
        </div>
        <ScenarioComparison key={resetVersion + JSON.stringify(formData)} baseline={formData} baselineFormRef={baselineFormRef} />
      </main>
      <footer className="home-footer">
        <span className="footer-brand">StudentAI</span>
        <p>Student Performance Prediction · An educational and research project</p>
      </footer>
    </div>
  );
}

export default Detect;
