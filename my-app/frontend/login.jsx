import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context.js";
import "./homepage.css";
import "./login.css";

export default function Login() {
  const { user, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (user) return <Navigate to="/" replace />;
  const submit = async event => {
    event.preventDefault();
    setBusy(true); setError("");
    try { await login(email.trim(), password); navigate("/", { replace: true }); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  };
  return <div className="homepage login-page">
    <header className="home-header"><Link className="home-logo" to="/">Student<span>AI</span></Link><Link to="/">← Back to home</Link></header>
    <main className="login-main">
      <section className="login-intro"><span className="home-badge">WELCOME BACK</span><h1>Continue exploring<br /><span>your learning journey.</span></h1><p>Sign in to StudentAI and explore the student data analysis system.</p><div className="demo-account"><strong>Demo account</strong><p>Email: <code>student@demo.com</code></p><p>Password: <code>Student123!</code></p><p>Demo data is stored in memory. Sessions are reset when the backend restarts.</p><button type="button" disabled={busy} onClick={() => { setEmail("student@demo.com"); setPassword("Student123!"); setError(""); }}>Fill in demo credentials</button></div></section>
      <section className="login-card" aria-labelledby="login-title"><h2 id="login-title">Sign in</h2><p>Enter your details to get started.</p><form onSubmit={submit} aria-busy={busy}>
        <label htmlFor="login-email">Email</label><input id="login-email" type="email" autoComplete="username" maxLength={254} required value={email} disabled={busy} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
        <label htmlFor="login-password">Password</label><div className="password-control"><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" maxLength={128} required value={password} disabled={busy} onChange={event => setPassword(event.target.value)} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? "Hide" : "Show"}</button></div>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button className="login-submit" type="submit" disabled={busy || loading}>{busy ? "Signing in…" : loading ? "Checking session…" : "Sign in →"}</button>
      </form><p className="login-note">No account yet? Use the demo credentials provided to try it out.</p></section>
    </main><footer className="home-footer"><span className="footer-brand">StudentAI</span><p>Student Performance Prediction · Chungbuk National University</p></footer>
  </div>;
}
