/**
 * Landing page data source.
 *
 * This file stores static product and marketing content used by the home page. The UI
 * components consume this data so the screen logic stays focused on rendering instead
 * of copy management.
 */

export const landingMetrics = [
  { value: "12k+", label: "Marketing teams launched" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "3x", label: "Faster campaign launches" },
  { value: "99.9%", label: "Platform uptime" },
];

export const landingFeatureItems = [
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
];

export const landingWorkflowSteps = [
  "Map the offer, audience, and primary conversion goal.",
  "Design the experience around clear messaging and trust signals.",
  "Deploy with measurable performance insights and iteration loops.",
];

export const landingBrandLogos = ["Vercel", "Stripe", "Notion", "GitHub", "Figma", "Linear"];

export const landingNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];
