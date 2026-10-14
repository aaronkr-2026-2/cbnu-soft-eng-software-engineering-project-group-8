import { createContext } from "react";
export const AuthContext = createContext(null);

export async function authRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`/api/auth/${path}`, { ...options, credentials: "same-origin", signal: AbortSignal.timeout(10000) });
  } catch (cause) {
    throw new Error("Không kết nối được máy chủ đăng nhập. Hãy chạy npm run dev:auth rồi thử lại.", { cause });
  }
  let data;
  try { data = await response.json(); } catch (cause) {
    throw new Error("Máy chủ đăng nhập chưa sẵn sàng. Hãy kiểm tra npm run dev:auth.", { cause });
  }
  if (path === "me" && response.status === 401) return null;
  if (!response.ok) throw new Error(data.message || "Yêu cầu thất bại. Vui lòng thử lại.");
  return data;
}
