import AuthMenu from "./auth-menu.jsx";
import { Link } from "react-router-dom";
import "./homepage.css";
import ProjectOverview from "./project-overview.jsx";

export default function Homepage() {
  return (
    <div className="homepage">
      <header className="home-header">
        <Link to="/" className="home-logo">
          Student<span>AI</span>
        </Link>

        <nav className="home-nav" aria-label="Main navigation">
          <Link to="/" className="active" aria-current="page">Home</Link>
          <a href="#about">About</a>
          <a href="#roadmap">Roadmap</a>
          <Link to="/detect">
            Analysis
          </Link>
          <Link to="/study-planner">Study Planner</Link>
          <AuthMenu />
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="hero-content">
            <span className="home-badge">
              AI-Based Student Performance Prediction
            </span>

            <h1>
              Understand academic performance.
              <span> Make better decisions.</span>
            </h1>

            <p>
              Explore how artificial intelligence predicts student grades
              and learn about the factors that influence
              predictions.
            </p>

            <div className="hero-actions">
              <Link to="/detect" className="home-button primary">
                Start analysis →
              </Link>

              <a href="#about" className="home-button secondary">
                Explore the project
              </a>
            </div>

            <p className="hero-note">
              A research project exploring machine learning in education.
            </p>
          </div>

          <div className="hero-card">
            <div className="card-icon" aria-hidden="true">✦</div>
            <h2>From data to useful insights</h2>
            <p>
              Explore academic performance through a simple
              process.
            </p>

            <ol className="home-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Enter information</strong>
                  <p>Provide student learning data.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Get a prediction</strong>
                  <p>Estimate grades using a Random Forest model.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Understand the results</strong>
                  <p>View the predicted final grade on a 20-point scale.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="about" className="home-about">
          <div className="section-intro">
            <span className="section-label">ABOUT THE PROJECT</span>
            <h2>Using AI to understand learning data</h2>
            <p>
              Explore final grade predictions from student data through an
              easy-to-use interface.
            </p>
          </div>

          <div className="home-features">
            <article className="feature-card">
              <span className="feature-number">01 / PREDICTION</span>
              <h3>Grade prediction</h3>
              <p>
                Use Random Forest to estimate final grades from
                learning information.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-number">02 / DATASET</span>
              <h3>Learning data</h3>
              <p>
                Explore 649 records in the UCI Student Performance dataset,
                without using G1 and G2 grades as inputs.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-number">03 / RESEARCH</span>
              <h3>Future development</h3>
              <p>
                Explore Federated Learning to train models
                on distributed data.
              </p>
            </article>
          </div>
        </section>
        <ProjectOverview />
      </main>

      <footer className="home-footer">
        <span className="footer-brand">StudentAI</span>
        <p>Student Performance Prediction · An educational and research project</p>
      </footer>
    </div>
  );
}
