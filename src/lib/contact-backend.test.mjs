import test from "node:test";
import assert from "node:assert/strict";

import {
  CONTACT_BACKEND_MODES,
  normalizeContactSubmission,
  validateContactSubmission,
} from "./contact-backend.mjs";

test("normalizeContactSubmission trims whitespace and preserves values", () => {
  const submission = normalizeContactSubmission({
    name: "  Alice  ",
    email: "  alice@example.com  ",
    company: "  Northstar  ",
    message: "  Hello from the test  ",
  });

  assert.equal(submission.name, "Alice");
  assert.equal(submission.email, "alice@example.com");
  assert.equal(submission.company, "Northstar");
  assert.equal(submission.message, "Hello from the test");
});

test("validateContactSubmission rejects incomplete or invalid input", () => {
  const invalid = validateContactSubmission({
    name: "",
    email: "bad-email",
    message: "",
  });

  assert.equal(invalid.ok, false);
  assert.match(invalid.message, /required|valid/i);
});

test("contact backend modes expose the expected transport choices", () => {
  assert.deepEqual(Object.values(CONTACT_BACKEND_MODES), ["next", "supabase", "express"]);
});
