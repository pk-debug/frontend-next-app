/**
 * Site content contract for the product marketing app.
 *
 * This file is intentionally treated like the backend-owned source of truth for the
 * marketing pages. The UI layer reads from this structure instead of defining its own
 * page copy, which keeps copy changes centralized and easier to manage as the product grows.
 *
 * Staff engineer note:
 * In a production system, this object would be replaced by database-backed content with
 * a repository and caching layer. For the current app, it acts as the canonical content
 * source and keeps the architecture ready for a real data provider.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const siteContent = {
  brand: {
    name: "Northstar",
    shortName: "N",
    tagline: "Built for modern growth teams",
    footerCopyright: "© 2026 Northstar. Built for forward-thinking teams.",
  },
  navigation: {
    primary: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ] as NavItem[],
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
    ] as NavItem[],
  },
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
    ] as MetricItem[],
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
    ] as FeatureItem[],
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
    ] as ValueItem[],
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
    ] as PricingPlan[],
  },
};

export const navItems = siteContent.navigation.primary;
export const footerLinks = siteContent.footer.links;
export const metrics = siteContent.home.metrics;
export const featureItems = siteContent.home.featureItems;
export const workflowSteps = siteContent.home.workflowSteps;
export const aboutValues = siteContent.about.values;
export const pricingPlans = siteContent.pricing.plans;
