import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPlannerServer, validateInput, validatePlan } from './server.mjs';

const input = { subject: 'Python', goal: 'Understand loops', topics: 'Loops', level: 'Beginner', startDate: '2026-10-12', minutes: [45, 30, 45, 30, 45, 20, 0] };
const plan = () => ({ title: 'Learn Python', summary: 'A balanced week of practice.', days: input.minutes.map((minutes, i) => ({ day: i + 1, focus: minutes ? 'Practice loops' : 'Rest', tasks: minutes ? [{ title: 'Write and test a loop.', minutes }] : [] })) });
const upstream = value => new Response(JSON.stringify({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(value) }] }] }), { status: 200 });
async function setup(t, options = {}) {
  const server = createPlannerServer({ apiKey: 'test-key', fetchImpl: async () => upstream(plan()), ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  return (body = input, extra = {}) => fetch(`http://127.0.0.1:${server.address().port}/api/study-planner`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), ...extra });
}
test('validates actual calendar dates and daily availability', () => {
  assert.equal(validateInput(input), true);
  for (const change of [{ startDate: '2026-02-30' }, { subject: ' ' }, { minutes: Array(7).fill(0) }, { minutes: [5, 30, 45, 30, 45, 20, 0] }, { minutes: [181, 30, 45, 30, 45, 20, 0] }]) assert.equal(validateInput({ ...input, ...change }), false);
});
test('rejects rest-day tasks, excess time, missing days and duplicate days', () => {
  assert.equal(validatePlan(plan(), input), true);
  const excess = plan(); excess.days[0].tasks[0].minutes = 46;
  const rest = plan(); rest.days[6].tasks = [{ title: 'Study', minutes: 1 }];
  const duplicate = plan(); duplicate.days[1].day = 1;
  const missing = plan(); missing.days.pop();
  for (const invalid of [excess, rest, duplicate, missing]) assert.equal(validatePlan(invalid, input), false);
});
test('returns a validated AI plan and sends only expected fields to OpenAI', async t => {
  const request = await setup(t, { fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    const body = JSON.parse(options.body);
    assert.equal(body.store, false);
    assert.equal(body.text.format.strict, true);
    assert.deepEqual(JSON.parse(body.input), input);
    return upstream(plan());
  } });
  const response = await request({ ...input, privateProfile: 'not forwarded' });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).plan, plan());
});
test('missing configuration is explicit and does not make an API call', async t => {
  const request = await setup(t, { apiKey: '', fetchImpl: () => assert.fail('must not call OpenAI') });
  const response = await request();
  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /not configured/);
});
test('rejects malformed and oversized requests before calling OpenAI', async t => {
  const request = await setup(t, { fetchImpl: () => assert.fail('must not call OpenAI') });
  assert.equal((await request({ ...input, goal: '' })).status, 400);
  assert.equal((await request(input, { body: '{' })).status, 400);
  assert.equal((await request(input, { body: 'x'.repeat(9000) })).status, 413);
  assert.equal((await request(input, { headers: { 'Content-Type': 'text/plain' } })).status, 415);
});
test('rejects untrusted origins', async t => {
  const request = await setup(t);
  assert.equal((await request(input, { headers: { 'Content-Type': 'application/json', Origin: 'https://untrusted.example' } })).status, 403);
});
test('does not expose upstream errors or credentials', async t => {
  const request = await setup(t, { fetchImpl: async () => new Response('test-key private error details', { status: 401 }) });
  const response = await request();
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /test-key|private error/);
});
test('rejects invalid output rather than displaying an over-budget plan', async t => {
  const invalid = plan(); invalid.days[0].tasks[0].minutes = 100;
  const request = await setup(t, { fetchImpl: async () => upstream(invalid) });
  assert.equal((await request()).status, 502);
});
test('handles refusals and incomplete responses', async t => {
  const refusal = await setup(t, { fetchImpl: async () => new Response(JSON.stringify({ status: 'completed', output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'No' }] }] })) });
  assert.equal((await refusal()).status, 422);
  const incomplete = await setup(t, { fetchImpl: async () => new Response(JSON.stringify({ status: 'incomplete', output: [] })) });
  assert.equal((await incomplete()).status, 502);
});
test('limits repeated requests', async t => {
  const request = await setup(t);
  for (let i = 0; i < 5; i++) assert.equal((await request()).status, 200);
  const response = await request();
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
});

test('distinguishes OpenAI billing errors from temporary rate limits', async t => {
  for (const [code, expected] of [
    ['credit_balance_exhausted', /add credits/],
    ['project_spend_limit_exceeded', /project spending limit/],
    ['organization_spend_limit_exceeded', /organization spending limit/],
    ['organization_usage_limit_exceeded', /higher usage limit/],
    ['insufficient_quota', /retrying alone will not fix/],
    ['rate_limit_exceeded', /wait a minute/],
    ['slow_down', /wait a minute/],
    ['unknown', /check API credits and limits/],
  ]) {
    const request = await setup(t, { fetchImpl: async () => new Response(JSON.stringify({ error: { code, message: 'private upstream details' } }), { status: 429 }) });
    const response = await request();
    assert.equal(response.status, 429);
    const body = await response.json();
    assert.match(body.message, expected);
    assert.doesNotMatch(body.message, /private upstream/);
  }
});

test('handles legacy quota types and non-JSON 429 errors', async t => {
  const quota = await setup(t, { fetchImpl: async () => new Response(JSON.stringify({ error: { type: 'insufficient_quota' } }), { status: 429 }) });
  assert.match((await (await quota()).json()).message, /check API credits and billing/);
  const nonJson = await setup(t, { fetchImpl: async () => new Response('upstream unavailable', { status: 429 }) });
  assert.equal((await nonJson()).status, 429);
});
