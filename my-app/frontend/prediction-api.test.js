import { test } from "node:test";
import assert from "node:assert/strict";
import { predictGrade } from "./prediction-api.js";

function mockFetch(t, implementation) {
  const original = globalThis.fetch;
  globalThis.fetch = implementation;
  t.after(() => { globalThis.fetch = original; });
}

test("sends student fields unchanged and accepts both grade boundaries", async t => {
  const student = { studytime: 2, absences: 4, school: "GP" };
  const signal = new AbortController().signal;
  for (const grade of [0, 13.5, 20]) {
    mockFetch(t, async (url, options) => {
      assert.equal(url, "/api/prediction/predict");
      assert.equal(options.method, "POST");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.equal(options.signal, signal);
      assert.deepEqual(JSON.parse(options.body), student);
      return Response.json({ predicted_grade: grade });
    });
    assert.equal(await predictGrade(student, signal), grade);
  }
});

test("rejects missing, string, null and out-of-range predictions", async t => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  for (const grade of [undefined, null, "12", -1, 21]) {
    globalThis.fetch = async () => Response.json({ predicted_grade: grade });
    await assert.rejects(predictGrade({}, new AbortController().signal), /0–20/);
  }
});

test("reports HTTP failures without accepting a partial prediction", async t => {
  mockFetch(t, async () => new Response("Failure", { status: 500 }));
  await assert.rejects(predictGrade({}, new AbortController().signal), /HTTP 500/);
});

test("reports non-JSON responses", async t => {
  mockFetch(t, async () => new Response("<html>Not an API</html>"));
  await assert.rejects(predictGrade({}, new AbortController().signal), /invalid JSON/);
});

test("explains network failures and preserves their cause", async t => {
  const cause = new TypeError("fetch failed");
  mockFetch(t, async () => { throw cause; });
  await assert.rejects(predictGrade({}, new AbortController().signal), error => error.cause === cause && error.message.includes("Flask API"));
});

test("preserves cancellation so a stale request cannot be treated as a network failure", async t => {
  const controller = new AbortController();
  controller.abort();
  const cause = new DOMException("Cancelled", "AbortError");
  mockFetch(t, async () => { throw cause; });
  await assert.rejects(predictGrade({}, controller.signal), error => error === cause);
});

test("displays backend validation and missing-model messages", async t => {
  mockFetch(t, async () => Response.json({ message: "Please check the student profile.", errors: { age: "Enter a whole number from 15 to 22." } }, { status: 400 }));
  await assert.rejects(predictGrade({}), /age: Enter a whole number/);
  globalThis.fetch = async () => Response.json({ message: "The prediction model is not ready." }, { status: 503 });
  await assert.rejects(predictGrade({}), /model is not ready/);
});

test("handles network failures when no abort signal is provided", async t => {
  mockFetch(t, async () => { throw new TypeError('fetch failed'); });
  await assert.rejects(predictGrade({}), /Flask API/);
});
