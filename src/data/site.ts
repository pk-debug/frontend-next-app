/**
 * Shared content model for the marketing site.
 *
 * This file centralizes nearly-static content used across multiple pages. Keeping it
 * here prevents content duplication and gives the team one place to update product
 * claims, navigation, or page copy. This is a common pattern in scalable frontend
 * apps where copy changes often.
 */

export const metrics = [
  { value: "12k+", label: "Marketing teams launched" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "3x", label: "Faster campaign launches" },
  { value: "99.9%", label: "Platform uptime" },
];

export const featureItems = [
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

export const workflowSteps = [
  "Map the offer, audience, and primary conversion goal.",
  "Design the experience around clear messaging and trust signals.",
  "Deploy with measurable performance insights and iteration loops.",
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];
