/**
 * Frontend client for screen content APIs.
 *
 * This client centralizes data fetching for page sections such as home, about, and
 * pricing. The screen components call this client instead of directly importing static
 * constants, which makes the rendering path backend-driven and easier to evolve.
 */

import {
  SITE_CONTENT_BACKEND_MODES,
  type SiteContentBackendMode,
} from "@/features/site-content/site-content-backend-modes";

export async function fetchSiteContentSection(
  section: string,
  backendMode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const baseUrl =
    backendMode === SITE_CONTENT_BACKEND_MODES.EXPRESS
      ? process.env.NEXT_PUBLIC_EXPRESS_SITE_URL ?? "http://localhost:4000"
      : backendMode === SITE_CONTENT_BACKEND_MODES.SUPABASE
        ? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co"
        : backendMode === SITE_CONTENT_BACKEND_MODES.FIREBASE
          ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
            : "https://your-project-default-rtdb.firebaseio.com"
          : "/api/site-content";

  const response = await fetch(`${baseUrl}/${section}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message ?? `Could not fetch ${section} content.`);
  }

  return payload.data;
}

export async function saveSiteContentSection(
  section: string,
  data: unknown,
  backendMode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const baseUrl =
    backendMode === SITE_CONTENT_BACKEND_MODES.EXPRESS
      ? process.env.NEXT_PUBLIC_EXPRESS_SITE_URL ?? "http://localhost:4000"
      : backendMode === SITE_CONTENT_BACKEND_MODES.SUPABASE
        ? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co"
        : backendMode === SITE_CONTENT_BACKEND_MODES.FIREBASE
          ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
            : "https://your-project-default-rtdb.firebaseio.com"
          : "/api/site-content";

  const response = await fetch(`${baseUrl}/${section}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message ?? `Could not save ${section} content.`);
  }

  return payload.data;
}
