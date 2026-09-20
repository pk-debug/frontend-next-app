/**
 * Express backend example for the contact form.
 *
 * For a 15-year-old:
 * This file is like a separate mini-web server that lives outside the Next.js app.
 * It listens for form submissions and stores them in an array for a demo.
 *
 * Senior engineer note:
 * This server demonstrates a traditional backend pattern where the frontend and API
 * are split into separate processes. It is useful for learning how request lifecycle,
 * CORS, and independent deployment work in real-world systems.
 *
 * Staff engineer note:
 * The Express server intentionally minimizes complexity. It keeps the API contract
 * simple, demonstrates cross-origin handling, and shows the boundary between client
 * concerns and backend persistence concerns in a realistic distributed architecture.
 */
const express = require("express");
const cors = require("cors");

const app = express();
const port = Number(process.env.EXPRESS_PORT ?? 4000);
const contactMessages = [];

app.use(cors());
app.use(express.json());

function validateSubmission(submission = {}) {
  const name = typeof submission.name === "string" ? submission.name.trim() : "";
  const email = typeof submission.email === "string" ? submission.email.trim() : "";
  const message = typeof submission.message === "string" ? submission.message.trim() : "";

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Name, email, and message are required.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      ok: false,
      message: "Please send a valid email address.",
    };
  }

  return { ok: true };
}

app.get("/health", (_, response) => {
  response.json({ ok: true, status: "healthy", backend: "express" });
});

app.post("/api/contact", (request, response) => {
  const validation = validateSubmission(request.body ?? {});

  if (!validation.ok) {
    return response.status(400).json({
      ok: false,
      backend: "express",
      message: validation.message,
    });
  }

  const submission = {
    ...request.body,
    company: request.body.company ?? "",
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(submission);

  return response.status(200).json({
    ok: true,
    backend: "express",
    message: "Message saved in the Express demo backend.",
    count: contactMessages.length,
  });
});

app.get("/api/contact", (_, response) => {
  response.json({
    ok: true,
    backend: "express",
    messages: contactMessages,
  });
});

app.listen(port, () => {
  console.log(`Express contact backend is running at http://localhost:${port}`);
});
