/**
 * Application service for contact form submissions.
 *
 * For a 15-year-old:
 * This file is the middle-man between the screen and the database. The screen only says
 * "send this message" and this file decides which backend should store it.
 *
 * Senior engineer note:
 * This is the application service layer. It coordinates validation, normalization, and
 * provider selection without exposing storage implementation details to UI code.
 *
 * Staff engineer note:
 * The service keeps the application contract stable while delegating persistence to a
 * repository layer. This separation makes the system easier to test and extend.
 */

import {
  CONTACT_BACKEND_MODES,
  normalizeContactSubmission,
  saveToExpress,
  saveToFirebase,
  saveToMemory,
  saveToSupabase,
  validateContactSubmission,
  type ContactBackendMode,
  type ContactSubmission,
} from "@/server/contact-storage";

export type ContactSubmitResult = {
  ok: boolean;
  backend: ContactBackendMode;
  message: string;
  count?: number;
};

export async function submitContactForm(
  rawSubmission: Partial<ContactSubmission>,
  backendMode: ContactBackendMode = CONTACT_BACKEND_MODES.NEXT,
): Promise<ContactSubmitResult> {
  const submission = normalizeContactSubmission(rawSubmission);
  const validation = validateContactSubmission(submission);

  if (!validation.ok) {
    return {
      ok: false,
      backend: backendMode,
      message: validation.message ?? "Validation failed for the contact form.",
    };
  }

  switch (backendMode) {
    case CONTACT_BACKEND_MODES.SUPABASE:
      return saveToSupabase(submission) as Promise<ContactSubmitResult>;
    case CONTACT_BACKEND_MODES.FIREBASE:
      return saveToFirebase(submission) as Promise<ContactSubmitResult>;
    case CONTACT_BACKEND_MODES.EXPRESS:
      return saveToExpress(submission) as Promise<ContactSubmitResult>;
    case CONTACT_BACKEND_MODES.NEXT:
    default:
      return saveToMemory(submission) as Promise<ContactSubmitResult>;
  }
}
