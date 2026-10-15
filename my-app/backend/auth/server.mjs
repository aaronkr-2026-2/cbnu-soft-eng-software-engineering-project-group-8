import http from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const salt = 'studentai-local-demo';
const demoUser = { id: 'student-demo', name: 'Sinh viên Demo', email: 'student@demo.com' };
const passwordHash = scryptSync('Student123!', salt, 64);
const ttl = 8 * 60 * 60 * 1000;
const cookieName = 'studentai_session';

export function createAuthServer() {
  const sessions = new Map();
  const attempts = new Map();
  return http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(body));
    };
    const now = Date.now();
    for (const [key, value] of sessions) if (value.expires <= now) sessions.delete(key);
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    const token = (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
    const session = sessions.get(token);
    const path = new URL(req.url, 'http://localhost').pathname;
    const setCookie = (value, age) => res.setHeader('Set-Cookie', `${cookieName}=${value}; HttpOnly; SameSite=Strict; Path=/api/auth; Max-Age=${age}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    if (req.method === 'POST') {
      // Vite proxies browser requests from its own origin to this local server.
      const origin = req.headers.origin;
      const allowed = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
      if (origin && origin !== allowed && origin !== 'http://127.0.0.1:5173') return send(403, { message: 'Nguồn yêu cầu không được phép.' });
    }
    if (path === '/api/auth/me' && req.method === 'GET') {
      return session ? send(200, { user: demoUser }) : send(401, { message: 'Bạn chưa đăng nhập.' });
    }
    if (path === '/api/auth/logout' && req.method === 'POST') {
      sessions.delete(token);
      setCookie('', 0);
      return send(200, { message: 'Đã đăng xuất.' });
    }
    if (path !== '/api/auth/login' || req.method !== 'POST') return send(404, { message: 'API không tồn tại.' });
    const ip = req.socket.remoteAddress;
    const attempt = attempts.get(ip) || { count: 0, until: now + 60000 };
    if (attempt.count >= 10) return send(429, { message: 'Thử đăng nhập quá nhiều lần. Hãy chờ một phút.' });
    attempt.count += 1;
    attempts.set(ip, attempt);
    if (!req.headers['content-type']?.includes('application/json')) return send(415, { message: 'Yêu cầu cần dữ liệu JSON.' });
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 4096) return send(413, { message: 'Dữ liệu quá lớn.' });
      }
      let data;
      try { data = JSON.parse(body); } catch { return send(400, { message: 'JSON không hợp lệ.' }); }
      if (!data || typeof data.email !== 'string' || typeof data.password !== 'string' || data.password.length > 128) return send(400, { message: 'Vui lòng nhập email và mật khẩu hợp lệ.' });
      const validPassword = timingSafeEqual(scryptSync(data.password, salt, 64), passwordHash);
      if (data.email.trim().toLowerCase() !== demoUser.email || !validPassword) return send(401, { message: 'Email hoặc mật khẩu không đúng.' });
      attempts.delete(ip);
      sessions.delete(token);
      const newToken = randomBytes(32).toString('hex');
      sessions.set(newToken, { expires: now + ttl });
      setCookie(newToken, ttl / 1000);
      return send(200, { user: demoUser });
    } catch {
      if (!res.headersSent) send(500, { message: 'Không thể xử lý đăng nhập. Vui lòng thử lại.' });
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.AUTH_PORT || 3001);
  const server = createAuthServer();
  server.on('error', error => { console.error(`Auth server: ${error.message}`); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`StudentAI auth: http://127.0.0.1:${port} | Demo: student@demo.com / Student123!`));
}
