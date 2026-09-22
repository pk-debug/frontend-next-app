/**
 * Express backend for screen content data.
 *
 * This server exposes GET/POST/PUT/DELETE routes to manage site content, which gives the
 * project a Node.js backend example that behaves like a real CRUD API for screen data.
 */

const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const port = Number(process.env.EXPRESS_SITE_PORT ?? 4000);
const filePath = path.join(__dirname, "..", "src", "server", "data", "site-content.json");

const defaultContent = {
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

function ensureStore() {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2), "utf8");
  }
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeStore(data) {
  ensureStore();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

app.use(cors());
app.use(express.json());

app.get("/health", (_, response) => {
  response.json({ ok: true, backend: "express", status: "healthy" });
});

app.get("/api/site-content", (_, response) => {
  response.json({ ok: true, backend: "express", sections: Object.keys(readStore()) });
});

app.get("/api/site-content/:section", (request, response) => {
  const section = request.params.section;
  const store = readStore();

  if (!store[section]) {
    return response.status(404).json({ ok: false, backend: "express", message: "Section not found" });
  }

  return response.json({ ok: true, backend: "express", section, data: store[section] });
});

app.post("/api/site-content/:section", (request, response) => {
  const section = request.params.section;
  const store = readStore();
  store[section] = request.body;
  writeStore(store);

  return response.status(201).json({ ok: true, backend: "express", section, data: store[section] });
});

app.put("/api/site-content/:section", (request, response) => {
  const section = request.params.section;
  const store = readStore();
  store[section] = { ...store[section], ...request.body };
  writeStore(store);

  return response.json({ ok: true, backend: "express", section, data: store[section] });
});

app.delete("/api/site-content/:section", (request, response) => {
  const section = request.params.section;
  const store = readStore();

  if (!store[section]) {
    return response.status(404).json({ ok: false, backend: "express", message: "Section not found" });
  }

  delete store[section];
  writeStore(store);

  return response.json({ ok: true, backend: "express", section, deleted: true });
});

app.listen(port, () => {
  console.log(`Express site-content backend is running at http://localhost:${port}`);
});
