/**
 * Frontend API client for the contact form.
 *
 * For a 15-year-old:
 * This file is the "messenger" between the screen and the server. The screen says,
 * "please send this form" and this file sends the request to the backend route.
 *
 * Senior engineer note:
 * This module owns the transport layer for the UI. It keeps the component free from
 * fetch details and makes the app easier to test and reuse.
 *
 * Staff engineer note:
 * The client layer is intentionally separate from the storage implementation. UI logic
 * calls this API client, while the server-side store implements the actual provider logic.
 */

import {
  CONTACT_BACKEND_MODES,
  type ContactBackendMode,
  type ContactSubmission,
} from "@/server/contact-storage";

export async function submitContactRequest(
  payload: Partial<ContactSubmission>,
  backendMode: ContactBackendMode = CONTACT_BACKEND_MODES.NEXT,
) {
  const response = await fetch(`/api/contact?backend=${backendMode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    backend?: ContactBackendMode;
    count?: number;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.message ?? "Something went wrong while sending your message.");
  }

  return data;
}
