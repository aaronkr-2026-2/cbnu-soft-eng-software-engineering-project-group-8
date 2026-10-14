import { useEffect, useRef, useState } from "react";
import { predictGrade } from "./prediction-api.js";
import "./scenario-comparison.css";

const studyLabels = ["Under 2 hours/week", "2–5 hours/week", "5–10 hours/week", "Over 10 hours/week"];
const formatGrade = (value) => value.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function GradeChart({ result }) {
  const bars = [{ label: "Current", grade: result?.baseline, x: 135, color: "var(--primary)" }, { label: "Trial scenario", grade: result?.scenario, x: 345, color: "var(--secondary)" }];
  return (
    <div className="scenario-chart">
      <svg viewBox="0 0 560 320" role="img" aria-labelledby="comparison-chart-title comparison-chart-desc">
        <title id="comparison-chart-title">Comparison of predicted grades on a 20-point scale</title>
        <desc id="comparison-chart-desc">{result ? `Current ${formatGrade(result.baseline)} points. Trial scenario ${formatGrade(result.scenario)} points.` : "No results yet. The chart will appear after a successful comparison."}</desc>
        <defs><pattern id="comparison-grid" width="21" height="22" patternUnits="userSpaceOnUse" x="60" y="40"><path d="M 21 0 L 0 0 0 22" fill="none" stroke="var(--secondary-soft)" strokeWidth="1" /></pattern></defs>
        <rect x="60" y="40" width="460" height="220" fill="url(#comparison-grid)" />
        {[0, 5, 10, 15, 20].map(value => <g key={value}><line x1="60" x2="520" y1={260 - value * 11} y2={260 - value * 11} stroke="var(--border)" strokeDasharray="4 4" /><text x="46" y={265 - value * 11} textAnchor="end" fill="var(--muted)" fontSize="12">{value}</text></g>)}
        <text x="60" y="20" fill="var(--muted)" fontSize="12">G3 grade / 20</text>
        {bars.map(bar => <g key={bar.label}>{result && <><rect x={bar.x} y={260 - bar.grade * 11} width="80" height={Math.max(0, bar.grade * 11)} rx="6" fill={bar.color} /><text x={bar.x + 40} y={248 - bar.grade * 11} textAnchor="middle" fill="var(--ink)" fontSize="17" fontWeight="700">{formatGrade(bar.grade)}</text></>}<text x={bar.x + 40} y="290" textAnchor="middle" fill="var(--muted)" fontSize="13">{bar.label}</text></g>)}
        {!result && <text x="290" y="152" textAnchor="middle" fill="var(--muted)" fontSize="14">No prediction data yet</text>}
      </svg>
    </div>
  );
}

export default function ScenarioComparison({ baseline, baselineFormRef }) {
  const [studytime, setStudytime] = useState(Math.min(4, baseline.studytime + 1));
  const [absences, setAbsences] = useState(Math.max(0, Number(baseline.absences) - 2));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef(null);
  useEffect(() => () => requestRef.current?.abort(), []);

  const clearResult = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setLoading(false);
    setResult(null);
    setError("");
  };

  const compare = async (event) => {
    event.preventDefault();
    if (!baselineFormRef.current?.reportValidity()) return;
    clearResult();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (requestRef.current === controller) {
        controller.abort();
        requestRef.current = null;
        setLoading(false);
        setError("The server took too long to respond. Please try again.");
      }
    }, 20000);
    try {
      const scenario = { ...baseline, studytime: Number(studytime), absences: Number(absences) };
      const grades = await Promise.all([predictGrade(baseline, controller.signal), predictGrade(scenario, controller.signal)]);
      if (requestRef.current === controller) setResult({ baseline: grades[0], scenario: grades[1] });
    } catch (failure) {
      if (requestRef.current === controller && !controller.signal.aborted) {
        setError(failure.message);
        controller.abort();
      }
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  };

  const difference = result ? Number((result.scenario - result.baseline).toFixed(2)) : 0;
  return (
    <section id="scenario-comparison" className="scenario-section" aria-labelledby="scenario-title">
      <div className="scenario-heading"><div><span className="section-label">TRY A NEW SCENARIO</span><h2 id="scenario-title">What if you changed your study habits?</h2><p>Keep the profile above and change only study time and absences to compare two predictions.</p></div><span className="scenario-tag">WHAT-IF · RANDOM FOREST</span></div>
      <div className="scenario-layout">
        <form className="scenario-controls" onSubmit={compare}>
          <h3>Adjust the scenario</h3>
          <div className="baseline-summary"><strong>Current profile</strong><span>{studyLabels[baseline.studytime - 1]}</span><span>{baseline.absences === "" ? "Absences not entered" : `${baseline.absences} absences`}</span></div>
          <label htmlFor="scenario-studytime">Self-study time</label>
          <select id="scenario-studytime" value={studytime} onChange={event => { clearResult(); setStudytime(Number(event.target.value)); }}>{studyLabels.map((label, index) => <option key={label} value={index + 1}>{label}</option>)}</select>
          <label htmlFor="scenario-absences">Number of absences</label>
          <input id="scenario-absences" type="number" min="0" max="93" step="1" required value={absences} onChange={event => { clearResult(); setAbsences(event.target.value === "" ? "" : Number(event.target.value)); }} />
          <p className="scenario-help">All other information matches the current profile. Editing the profile above resets the scenario and results.</p>
          <button type="submit" disabled={loading}>{loading ? "Predicting both scenarios…" : "Compare scenarios →"}</button>
          <button className="scenario-reset" type="button" onClick={() => { clearResult(); setStudytime(baseline.studytime); setAbsences(baseline.absences); }}>Use current values</button>
          <div aria-live="polite" className="scenario-status">{loading ? "Getting model results…" : error ? <p role="alert">{error}</p> : result ? "Comparison results updated." : "Ready to compare when the API is available."}</div>
        </form>
        <div className="scenario-visual" aria-busy={loading}>
          <div className="chart-heading"><h3>Predicted final grade</h3><span>Scale: 0–20</span></div>
          <GradeChart result={result} />
          <div className="scenario-metrics" aria-live="polite">
            <div><span>Current</span><strong>{result ? formatGrade(result.baseline) : "—"}<small> / 20</small></strong></div>
            <div><span>Trial scenario</span><strong>{result ? formatGrade(result.scenario) : "—"}<small> / 20</small></strong></div>
            <div><span>Difference</span><strong className={difference < 0 ? "delta-negative" : difference > 0 ? "delta-positive" : ""}>{result ? `${difference > 0 ? "+" : ""}${formatGrade(difference)}` : "—"}</strong></div>
          </div>
          <p className="scenario-disclaimer">This is a model simulation. It does not establish causation or guarantee corresponding changes in actual grades.</p>
        </div>
      </div>
    </section>
  );
}
