/**
 * Site content backend modes.
 *
 * This file defines the backend transport options the app can use to fetch screen data.
 * The UI does not care which provider is chosen; it only asks for a section payload.
 * The system keeps a consistent contract while allowing Next.js, Express, Supabase,
 * and Firebase-style providers to be plugged in.
 */

import fs from "node:fs";
import path from "node:path";

export const SITE_CONTENT_BACKEND_MODES = {
  NEXT: "next",
  EXPRESS: "express",
  SUPABASE: "supabase",
  FIREBASE: "firebase",
} as const;

export type SiteContentBackendMode =
  (typeof SITE_CONTENT_BACKEND_MODES)[keyof typeof SITE_CONTENT_BACKEND_MODES];

export const SITE_CONTENT_BACKEND_OPTIONS = Object.values(SITE_CONTENT_BACKEND_MODES);

export function getSiteContentBackendUrl(mode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT) {
  switch (mode) {
    case SITE_CONTENT_BACKEND_MODES.EXPRESS:
      return process.env.NEXT_PUBLIC_EXPRESS_SITE_URL ?? "http://localhost:4000";
    case SITE_CONTENT_BACKEND_MODES.SUPABASE:
      return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co";
    case SITE_CONTENT_BACKEND_MODES.FIREBASE:
      return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
        : "https://your-project-default-rtdb.firebaseio.com";
    case SITE_CONTENT_BACKEND_MODES.NEXT:
    default:
      return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  }
}

export function normalizeSiteContentBackendMode(value: string | null | undefined) {
  if (value === SITE_CONTENT_BACKEND_MODES.EXPRESS) return SITE_CONTENT_BACKEND_MODES.EXPRESS;
  if (value === SITE_CONTENT_BACKEND_MODES.SUPABASE) return SITE_CONTENT_BACKEND_MODES.SUPABASE;
  if (value === SITE_CONTENT_BACKEND_MODES.FIREBASE) return SITE_CONTENT_BACKEND_MODES.FIREBASE;
  return SITE_CONTENT_BACKEND_MODES.NEXT;
}

const contentFiles: Record<SiteContentBackendMode, string> = {
  next: "site-content.json",
  express: "express-site-content.json",
  supabase: "supabase-site-content.json",
  firebase: "firebase-site-content.json",
};

const defaultSectionData = {
  home: {
    eyebrow: "Built for modern growth teams",
    headline: "Turn attention into momentum.",
    description:
      "Northstar helps ambitious teams design, launch, and optimize digital experiences that convert visitors into customers faster.",
    primaryCta: { label: "Start free trial", href: "#pricing" },
    secondaryCta: { label: "See platform", href: "#solutions" },
    trustLabel: "Trusted by teams at",
    logos: ["Vercel", "Stripe", "Notion", "GitHub", "Figma", "Linear"],
    metrics: [
      { value: "12k+", label: "Marketing teams launched" },
      { value: "4.8/5", label: "Average customer rating" },
      { value: "3x", label: "Faster campaign launches" },
      { value: "99.9%", label: "Platform uptime" },
    ],
    featureItems: [
      {
        title: "Launch product stories faster",
        description:
          "Turn strategy into launch-ready experiences with modular landing pages built to convert visitors and communicate value quickly.",
      },
      {
        title: "Bring data and design together",
        description:
          "Connect product, campaign, and conversion insights in one system so marketing and product teams move in sync.",
      },
      {
        title: "Scale without friction",
        description:
          "Ship content updates, test ideas, and expand pages globally with a flexible architecture that grows alongside your business.",
      },
    ],
    workflowSteps: [
      "Map the offer, audience, and primary conversion goal.",
      "Design the experience around clear messaging and trust signals.",
      "Deploy with measurable performance insights and iteration loops.",
    ],
    ctaPanel: {
      eyebrow: "Ready to launch",
      title: "Build the next chapter of your brand.",
      description:
        "A modern frontend stack gives your team the speed to prototype, the quality to scale, and the flexibility to keep learning.",
    },
  },
  about: {
    eyebrow: "About Northstar",
    title: "We turn product momentum into measurable growth.",
    description:
      "Northstar helps modern companies connect product strategy, marketing clarity, and digital execution in one consistent system.",
    values: [
      {
        title: "Strategy-first thinking",
        description:
          "We help teams align product, brand, and campaigns around meaningful market moments.",
      },
      {
        title: "Human-centered design",
        description: "Every experience is designed to feel clear, useful, and easy to trust.",
      },
      {
        title: "Fast iteration",
        description:
          "We validate messaging and experiences early so teams can adjust before scale begins.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing built for momentum.",
    plans: [
      {
        name: "Starter",
        price: "$29",
        description: "For early-stage teams building a clear digital narrative.",
        features: ["Landing page builder", "Basic analytics", "Email support"],
      },
      {
        name: "Growth",
        price: "$79",
        description: "For product teams shipping campaigns and experiments.",
        features: ["Advanced analytics", "A/B testing", "Priority support"],
        highlight: true,
      },
      {
        name: "Scale",
        price: "$149",
        description: "For larger operations managing multiple growth loops.",
        features: ["Custom workflows", "Team collaboration", "Dedicated onboarding"],
      },
    ],
  },
} as const;

function getDataDirectory() {
  return path.join(process.cwd(), "src", "server", "data");
}

function ensureJsonFile(mode: SiteContentBackendMode) {
  const directory = getDataDirectory();
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const filePath = path.join(directory, contentFiles[mode]);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultSectionData, null, 2), "utf8");
  }

  return filePath;
}

function readJsonStore(mode: SiteContentBackendMode) {
  const filePath = ensureJsonFile(mode);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as typeof defaultSectionData;
}

function writeJsonStore(mode: SiteContentBackendMode, data: typeof defaultSectionData) {
  const filePath = ensureJsonFile(mode);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getSectionContentByMode(
  section: string,
  mode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const store = readJsonStore(mode);
  const selected = (store as Record<string, unknown>)[section] ?? (defaultSectionData as Record<string, unknown>)[section];

  return {
    ok: true,
    backend: mode,
    section,
    data: selected,
    updatedAt: new Date().toISOString(),
  };
}

export async function saveSectionContentByMode(
  section: string,
  data: unknown,
  mode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const store = readJsonStore(mode);
  (store as Record<string, unknown>)[section] = data;
  writeJsonStore(mode, store);

  return {
    ok: true,
    backend: mode,
    section,
    data,
    updatedAt: new Date().toISOString(),
  };
}

export async function updateSectionContentByMode(
  section: string,
  data: Record<string, unknown>,
  mode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const store = readJsonStore(mode);
  const current = ((store as Record<string, unknown>)[section] ?? {}) as Record<string, unknown>;
  (store as Record<string, unknown>)[section] = { ...current, ...data };
  writeJsonStore(mode, store);

  return {
    ok: true,
    backend: mode,
    section,
    data: (store as Record<string, unknown>)[section],
    updatedAt: new Date().toISOString(),
  };
}

export async function deleteSectionContentByMode(
  section: string,
  mode: SiteContentBackendMode = SITE_CONTENT_BACKEND_MODES.NEXT,
) {
  const store = readJsonStore(mode);
  const exists = Object.prototype.hasOwnProperty.call(store, section);
  if (exists) {
    delete (store as Record<string, unknown>)[section];
    writeJsonStore(mode, store);
  }

  return {
    ok: true,
    backend: mode,
    section,
    deleted: exists,
    updatedAt: new Date().toISOString(),
  };
}
