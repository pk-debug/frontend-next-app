/**
 * Persistence adapters for each backend option.
 *
 * For a 15-year-old:
 * This file is the data layer. It is the part that knows how to save a message to a
 * database or backend system. The screen doesn't need to know all those details.
 *
 * Senior engineer note:
 * This module is the persistence boundary. Every backend provider is implemented here,
 * while the application service owns orchestration and validation.
 *
 * Staff engineer note:
 * The repository-style adapters keep database/provider logic isolated from transport
 * and UI concerns. This is the standard separation between application logic and data
 * access code.
 */

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export const CONTACT_BACKEND_MODES = {
  NEXT: "next",
  SUPABASE: "supabase",
  FIREBASE: "firebase",
  EXPRESS: "express",
} as const;

export type ContactBackendMode =
  (typeof CONTACT_BACKEND_MODES)[keyof typeof CONTACT_BACKEND_MODES];

const IN_MEMORY_CONTACT_STORE: Array<ContactSubmission & { createdAt: string }> =
  (globalThis as typeof globalThis & {
    __northstarContactMessages?: Array<ContactSubmission & { createdAt: string }>;
  }).__northstarContactMessages ??= [];

export function normalizeContactSubmission(rawSubmission: Partial<ContactSubmission> = {}): ContactSubmission {
  return {
    name: typeof rawSubmission.name === "string" ? rawSubmission.name.trim() : "",
    email: typeof rawSubmission.email === "string" ? rawSubmission.email.trim() : "",
    company: typeof rawSubmission.company === "string" ? rawSubmission.company.trim() : "",
    message: typeof rawSubmission.message === "string" ? rawSubmission.message.trim() : "",
  };
}

export function validateContactSubmission(submission: ContactSubmission) {
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

export async function saveToMemory(submission: ContactSubmission) {
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

export async function saveToSupabase(submission: ContactSubmission) {
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

export async function saveToFirebase(submission: ContactSubmission) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const collection = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION ?? "contact_messages";

  if (!projectId) {
    return {
      ok: false,
      backend: CONTACT_BACKEND_MODES.FIREBASE,
      message: "Firebase is selected, but NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured.",
    };
  }

  try {
    const { initializeApp } = await import("firebase/app");
    const firebaseFirestore = await import("firebase/firestore");
    const { getFirestore, addDoc, collection: firestoreCollection } = firebaseFirestore;

    const app = initializeApp({ projectId });
    const db = getFirestore(app);

    await addDoc(firestoreCollection(db, collection), {
      ...submission,
      createdAt: new Date().toISOString(),
    });

    return {
      ok: true,
      backend: CONTACT_BACKEND_MODES.FIREBASE,
      message: "Message saved to Firebase successfully.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Firebase save failed unexpectedly.";

    return {
      ok: false,
      backend: CONTACT_BACKEND_MODES.FIREBASE,
      message,
    };
  }
}

export async function saveToExpress(submission: ContactSubmission) {
  const expressUrl = process.env.NEXT_PUBLIC_EXPRESS_CONTACT_URL ?? "http://localhost:4000/api/contact";
  const response = await fetch(expressUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
