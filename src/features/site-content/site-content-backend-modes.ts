/**
 * Browser-safe backend mode definitions for the site-content layer.
 *
 * These constants are intentionally kept free of Node.js-only imports so client
 * components can safely reference them without pulling server-only code into the
 * browser bundle. The server-side implementation remains in the dedicated backend
 * service file, where filesystem access and provider-specific logic belong.
 */

export const SITE_CONTENT_BACKEND_MODES = {
  NEXT: "next",
  EXPRESS: "express",
  SUPABASE: "supabase",
  FIREBASE: "firebase",
} as const;

export type SiteContentBackendMode =
  (typeof SITE_CONTENT_BACKEND_MODES)[keyof typeof SITE_CONTENT_BACKEND_MODES];

export const SITE_CONTENT_BACKEND_OPTIONS = Object.values(SITE_CONTENT_BACKEND_MODES);

export function normalizeSiteContentBackendMode(value: string | null | undefined) {
  if (value === SITE_CONTENT_BACKEND_MODES.EXPRESS) return SITE_CONTENT_BACKEND_MODES.EXPRESS;
  if (value === SITE_CONTENT_BACKEND_MODES.SUPABASE) return SITE_CONTENT_BACKEND_MODES.SUPABASE;
  if (value === SITE_CONTENT_BACKEND_MODES.FIREBASE) return SITE_CONTENT_BACKEND_MODES.FIREBASE;
  return SITE_CONTENT_BACKEND_MODES.NEXT;
}
