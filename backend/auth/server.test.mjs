import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAuthServer } from './server.mjs';

async function setup(t) {
  const server = createAuthServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const base = `http://127.0.0.1:${server.address().port}/api/auth`;
  return (path, options) => fetch(`${base}/${path}`, options);
}
const credentials = { email: 'student@demo.com', password: 'Student123!' };
const post = data => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

test('login, restore session, logout and invalidate previous cookie', async t => {
  const request = await setup(t);
  assert.equal((await request('me')).status, 401);
  const login = await request('login', post(credentials));
  assert.equal(login.status, 200);
  const cookie = login.headers.get('set-cookie');
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Strict/);
  const data = await login.json();
  assert.equal(data.user.email, credentials.email);
  assert.equal(data.user.password, undefined);
  const options = { headers: { cookie: cookie.split(';')[0] } };
  assert.equal((await request('me', options)).status, 200);
  assert.equal((await request('logout', { ...options, method: 'POST' })).status, 200);
  assert.equal((await request('me', options)).status, 401);
});

test('incorrect credentials and forged cookies are rejected', async t => {
  const request = await setup(t);
  assert.equal((await request('login', post({ ...credentials, password: 'wrong' }))).status, 401);
  assert.equal((await request('login', post({ ...credentials, email: 'unknown@demo.com' }))).status, 401);
  assert.equal((await request('me', { headers: { cookie: 'studentai_session=forged' } })).status, 401);
});

test('validates JSON, content type, field types, body size and origin', async t => {
  const request = await setup(t);
  assert.equal((await request('login', post(null))).status, 400);
  assert.equal((await request('login', post({ email: [], password: 123 }))).status, 400);
  assert.equal((await request('login', { ...post({}), body: '{' })).status, 400);
  assert.equal((await request('login', { method: 'POST', body: '{}' })).status, 415);
  assert.equal((await request('login', post({ password: 'a'.repeat(5000) }))).status, 413);
  assert.equal((await request('login', { ...post(credentials), headers: { 'Content-Type': 'application/json', Origin: 'https://untrusted.example' } })).status, 403);
});

test('normalizes email and rotates a previously authenticated session', async t => {
  const request = await setup(t);
  const first = await request('login', post({ ...credentials, email: ' STUDENT@DEMO.COM ' }));
  assert.equal(first.status, 200);
  const oldCookie = first.headers.get('set-cookie').split(';')[0];
  const second = await request('login', { ...post(credentials), headers: { 'Content-Type': 'application/json', cookie: oldCookie } });
  assert.equal(second.status, 200);
  assert.notEqual(second.headers.get('set-cookie').split(';')[0], oldCookie);
  assert.equal((await request('me', { headers: { cookie: oldCookie } })).status, 401);
});

test('rate limits repeated failed login attempts', async t => {
  const request = await setup(t);
  for (let i = 0; i < 10; i++) assert.equal((await request('login', post({ ...credentials, password: 'wrong' }))).status, 401);
  assert.equal((await request('login', post(credentials))).status, 429);
});
