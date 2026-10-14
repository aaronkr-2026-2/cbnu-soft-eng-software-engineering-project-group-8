import { useEffect, useState } from "react";
import { AuthContext, authRequest } from "./auth-context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    authRequest("me").then(data => { if (active) setUser(data?.user || null); }).catch(() => { /* Login form reports connection failures on submission. */ }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const login = async (email, password) => {
    const data = await authRequest("login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    setUser(data.user);
  };
  const logout = async () => {
    await authRequest("logout", { method: "POST" });
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
