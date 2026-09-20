/**
 * Shared backend mode selector for the entire app.
 *
 * For a 15-year-old:
 * This component acts like a global switch. It lets you choose which backend style the
 * app should use, and the choice is shown on all pages so the whole project feels like
 * one connected system.
 *
 * Senior engineer note:
 * This is a project-level configuration surface. Keeping the mode selector in the app
 * shell ensures every route can share the same backend configuration without duplicating
 * state in each page.
 *
 * Staff engineer note:
 * The selector uses a stable configuration contract backed by the same backend mode union
 * used by the API layer. This keeps UI state, transport selection, and server-side
 * validation aligned.
 */
"use client";

import { useEffect, useState } from "react";
import {
  CONTACT_BACKEND_MODES,
  contactBackendOptions,
  type ContactBackendMode,
} from "@/lib/contact-backend";

const STORAGE_KEY = "northstar-backend-mode";

const modeLabels: Record<ContactBackendMode, string> = {
  [CONTACT_BACKEND_MODES.NEXT]: "Next.js built-in API",
  [CONTACT_BACKEND_MODES.SUPABASE]: "Supabase cloud backend",
  [CONTACT_BACKEND_MODES.FIREBASE]: "Firebase cloud backend",
  [CONTACT_BACKEND_MODES.EXPRESS]: "Express Node server",
};

function readStoredBackendMode(): ContactBackendMode {
  if (typeof window === "undefined") {
    return CONTACT_BACKEND_MODES.NEXT;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (
    rawValue === CONTACT_BACKEND_MODES.NEXT ||
    rawValue === CONTACT_BACKEND_MODES.SUPABASE ||
    rawValue === CONTACT_BACKEND_MODES.FIREBASE ||
    rawValue === CONTACT_BACKEND_MODES.EXPRESS
  ) {
    return rawValue;
  }

  return CONTACT_BACKEND_MODES.NEXT;
}

export function BackendModeBanner() {
  const [selectedMode, setSelectedMode] = useState<ContactBackendMode>(
    CONTACT_BACKEND_MODES.NEXT,
  );

  useEffect(() => {
    setSelectedMode(readStoredBackendMode());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, selectedMode);
  }, [selectedMode]);

  return (
    <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Global backend
          </span>
          <span className="text-slate-300">Current mode: {modeLabels[selectedMode]}</span>
        </div>

        <label className="flex items-center gap-2 text-slate-300">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Mode</span>
          <select
            value={selectedMode}
            onChange={(event) => setSelectedMode(event.target.value as ContactBackendMode)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400"
            aria-label="Select backend mode"
          >
            {contactBackendOptions.map((mode) => (
              <option key={mode} value={mode}>
                {modeLabels[mode]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
