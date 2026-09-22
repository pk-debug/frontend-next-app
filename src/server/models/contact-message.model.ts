/**
 * Contact message database model.
 *
 * For a 15-year-old:
 * This is the blueprint for a contact message. It tells the app what information a
 * message must contain before it is stored in the database.
 *
 * Senior engineer note:
 * This model is the canonical schema for contact submissions across all backends.
 * The repository and service layers can adapt this to any provider while preserving the
 * same application contract.
 *
 * Staff engineer note:
 * The DTO defines the storage contract and validation boundary. This is where we decide the
 * meaning of each field and keep provider-specific transforms isolated to lower layers.
 */

export type ContactSource = "next" | "supabase" | "firebase" | "express";

export type ContactMessageRecord = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  source: ContactSource;
};

export type ContactMessageCreateInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source: ContactSource;
};

export function validateContactMessage(input: Partial<ContactMessageCreateInput>) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Name, email, and message are required before saving a contact message.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address before submitting the contact form.",
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company: typeof input.company === "string" ? input.company.trim() : "",
      message,
      source: input.source ?? "next",
      createdAt: new Date().toISOString(),
    },
  };
}
