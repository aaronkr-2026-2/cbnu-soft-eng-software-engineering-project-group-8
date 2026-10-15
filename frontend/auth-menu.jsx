import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth-context.js";
import "./login.css";

export default function AuthMenu() {
  const { user, loading, logout } = useContext(AuthContext);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (loading) return <span className="auth-check" role="status">Checking…</span>;
  if (!user) return <Link className="login-link" to="/login">Sign in →</Link>;
  const handleLogout = async () => {
    setBusy(true); setError("");
    try { await logout(); } catch (failure) { setError(failure.message); } finally { setBusy(false); }
  };
  return <div className="auth-menu"><span>Hi, {user.name}</span><button type="button" onClick={handleLogout} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>{error && <p role="alert">{error}</p>}</div>;
}
