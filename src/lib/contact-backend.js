/**
 * Contact backend integration layer.
 *
 * For a 15-year-old:
 * This file is like a switchboard for the contact form. It decides where the message
 * should go: the built-in Next.js backend, a Supabase database, or an Express server.
 * Instead of changing the form code every time, we just change the backend mode.
 *
 * Senior engineer note:
 * This module provides a unified adapter around three backend strategies. It validates
 * the payload once, keeps a consistent contract, and delegates to the selected backend
 * implementation with a single interface.
 *
 * Staff engineer note:
 * This is the transport boundary. The UI submits a stable ContactSubmission format,
 * while the backend layer owns provider-specific concerns such as env configuration,
 * database schema assumptions, and API routing. This keeps the user experience stable
 * even as the infrastructure evolves.
 */

export const CONTACT_BACKEND_MODES = Object.freeze({
  NEXT: "next",
  SUPABASE: "supabase",
  EXPRESS: "express",
});

const IN_MEMORY_CONTACT_STORE = globalThis.__northstarContactMessages ??= [];

export function normalizeContactSubmission(rawSubmission = {}) {
  return {
    name: typeof rawSubmission.name === "string" ? rawSubmission.name.trim() : "",
    email: typeof rawSubmission.email === "string" ? rawSubmission.email.trim() : "",
    company: typeof rawSubmission.company === "string" ? rawSubmission.company.trim() : "",
    message: typeof rawSubmission.message === "string" ? rawSubmission.message.trim() : "",
  };
}

export function validateContactSubmission(submission) {
  const { name, email, message } = submission;

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Name, email, and message are required before submitting.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
    };
  }

  return { ok: true };
}

export async function persistContactSubmission(rawSubmission, backendMode = CONTACT_BACKEND_MODES.NEXT) {
  const submission = normalizeContactSubmission(rawSubmission);
  const validation = validateContactSubmission(submission);

  if (!validation.ok) {
    return {
      ok: false,
      backend: backendMode,
      message: validation.message,
    };
  }

  switch (backendMode) {
    case CONTACT_BACKEND_MODES.SUPABASE: {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

      if (!url || !key) {
        return {
          ok: false,
          backend: CONTACT_BACKEND_MODES.SUPABASE,
          message:
            "Supabase is selected, but NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not configured.",
        };
      }

      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient(url, key);
      const { error } = await client.from("contact_messages").insert([
        {
          ...submission,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      return {
        ok: true,
        backend: CONTACT_BACKEND_MODES.SUPABASE,
        message: "Message saved to Supabase successfully.",
      };
    }

    case CONTACT_BACKEND_MODES.EXPRESS: {
      const expressUrl = process.env.NEXT_PUBLIC_EXPRESS_CONTACT_URL ?? "http://localhost:4000/api/contact";
      const response = await fetch(expressUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          ok: false,
          backend: CONTACT_BACKEND_MODES.EXPRESS,
          message: payload.message ?? "The Express backend rejected the message.",
        };
      }

      return {
        ok: true,
        backend: CONTACT_BACKEND_MODES.EXPRESS,
        message: payload.message ?? "Message delivered to Express successfully.",
      };
    }

    case CONTACT_BACKEND_MODES.NEXT:
    default: {
      IN_MEMORY_CONTACT_STORE.push({
        ...submission,
        createdAt: new Date().toISOString(),
      });

      return {
        ok: true,
        backend: CONTACT_BACKEND_MODES.NEXT,
        message: "Message saved in the built-in Next.js in-memory store.",
        count: IN_MEMORY_CONTACT_STORE.length,
      };
    }
  }
}

export const contactBackendOptions = Object.values(CONTACT_BACKEND_MODES);
