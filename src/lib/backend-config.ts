/**
 * Global backend configuration for the application.
 *
 * For a 15-year-old:
 * This file is like the main control panel for the app. It tells the project which kind
 * of backend it should use so every screen can follow the same pattern.
 *
 * Senior engineer note:
 * This module centralizes backend transport configuration. It reduces hidden coupling and
 * makes it easier to switch between the Next.js API, Supabase, and Express backends.
 *
 * Staff engineer note:
 * The configuration contract intentionally aligns with the transport boundary used by the
 * server routes and client-side selectors. This keeps runtime settings, type contracts, and
 * developer experience consistent across the app.
 */

import { CONTACT_BACKEND_MODES, type ContactBackendMode } from "@/lib/contact-backend";

const STORAGE_KEY = "northstar-backend-mode";

export function getSelectedBackendMode(): ContactBackendMode {
  if (typeof window === "undefined") {
    return CONTACT_BACKEND_MODES.NEXT;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (
    storedValue === CONTACT_BACKEND_MODES.NEXT ||
    storedValue === CONTACT_BACKEND_MODES.SUPABASE ||
    storedValue === CONTACT_BACKEND_MODES.FIREBASE ||
    storedValue === CONTACT_BACKEND_MODES.EXPRESS
  ) {
    return storedValue;
  }

  return CONTACT_BACKEND_MODES.NEXT;
}

export function setSelectedBackendMode(mode: ContactBackendMode) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }
}

export function getBackendUrl(mode: ContactBackendMode) {
  switch (mode) {
    case CONTACT_BACKEND_MODES.SUPABASE:
      return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co";
    case CONTACT_BACKEND_MODES.FIREBASE:
      return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
        : "https://your-project-default-rtdb.firebaseio.com";
    case CONTACT_BACKEND_MODES.EXPRESS:
      return process.env.NEXT_PUBLIC_EXPRESS_CONTACT_URL ?? "http://localhost:4000/api/contact";
    case CONTACT_BACKEND_MODES.NEXT:
    default:
      return "/api/contact";
  }
}
