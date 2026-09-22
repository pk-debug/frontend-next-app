import fs from "node:fs";
import path from "node:path";

type SiteContentStore = {
  home: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustLabel: string;
    logos: string[];
    metrics: Array<{ value: string; label: string }>;
    featureItems: Array<{ title: string; description: string }>;
    workflowSteps: string[];
    ctaPanel: { eyebrow: string; title: string; description: string };
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    values: Array<{ title: string; description: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
      highlight?: boolean;
    }>;
  };
  navigation: {
    primary: Array<{ label: string; href: string }>;
    actions: {
      login: { label: string; href: string };
      cta: { label: string; href: string };
    };
  };
  footer: {
    links: Array<{ label: string; href: string }>;
  };
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    footerCopyright: string;
  };
};

export const defaultSiteContent: SiteContentStore = {
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
  navigation: {
    primary: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    actions: {
      login: { label: "Log in", href: "/contact" },
      cta: { label: "Book a demo", href: "/pricing" },
    },
  },
  footer: {
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  brand: {
    name: "Northstar",
    shortName: "N",
    tagline: "Built for modern growth teams",
    footerCopyright: "© 2026 Northstar. Built for forward-thinking teams.",
  },
};

const storePath = path.join(process.cwd(), "src", "server", "data", "site-content.json");

function ensureStoreFile() {
  const directory = path.dirname(storePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify(defaultSiteContent, null, 2), "utf8");
  }
}

function readStore() {
  ensureStoreFile();
  const raw = fs.readFileSync(storePath, "utf8");
  return JSON.parse(raw) as SiteContentStore;
}

function writeStore(data: SiteContentStore) {
  ensureStoreFile();
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
}

export async function listSiteContentSections() {
  return Object.keys(readStore()) as Array<keyof SiteContentStore>;
}

export async function getSiteContentSection(section: keyof SiteContentStore) {
  const store = readStore();
  const selected = (store as Record<string, unknown>)[section as string] ?? (defaultSiteContent as Record<string, unknown>)[section as string];

  return {
    ok: true,
    section,
    data: selected as SiteContentStore[keyof SiteContentStore],
    updatedAt: new Date().toISOString(),
    backend: "next",
  };
}

export async function saveSiteContentSection(
  section: keyof SiteContentStore,
  data: SiteContentStore[keyof SiteContentStore],
) {
  const store = readStore();
  (store as Record<string, unknown>)[section as string] = data as Record<string, unknown>;
  writeStore(store);

  return {
    ok: true,
    section,
    data,
    updatedAt: new Date().toISOString(),
    backend: "next",
  };
}

export async function updateSiteContentSection(
  section: keyof SiteContentStore,
  data: Partial<SiteContentStore[keyof SiteContentStore]>,
) {
  const store = readStore();
  const current = ((store as Record<string, unknown>)[section as string] ?? {}) as Record<string, unknown>;
  const next = { ...current, ...(data as Record<string, unknown>) } as Record<string, unknown>;
  (store as Record<string, unknown>)[section as string] = next;
  writeStore(store);

  return {
    ok: true,
    section,
    data: next as SiteContentStore[keyof SiteContentStore],
    updatedAt: new Date().toISOString(),
    backend: "next",
  };
}

export async function deleteSiteContentSection(section: keyof SiteContentStore) {
  const store = readStore();
  if (!(section in store)) {
    return { ok: true, section, deleted: false, backend: "next" };
  }

  delete store[section];
  writeStore(store);

  return {
    ok: true,
    section,
    deleted: true,
    backend: "next",
  };
}

export async function resetSiteContentStore() {
  writeStore(defaultSiteContent);
  return defaultSiteContent;
}

export async function getSiteContentSnapshot() {
  return readStore();
}
