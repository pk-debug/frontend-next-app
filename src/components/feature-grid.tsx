"use client";

/**
 * Feature grid section.
 *
 * This component turns key product benefits into a scannable card layout. It is a
 * reusable pattern for explaining the core value proposition without overwhelming the
 * viewer with long paragraphs.
 */
import { useEffect, useState } from "react";
import { fetchSiteContentSection } from "@/features/site-content/site-content-client";
import { SITE_CONTENT_BACKEND_MODES } from "@/features/site-content/site-content-backend-modes";

export function FeatureSection() {
  const [features, setFeatures] = useState<Array<{ title: string; description: string }>>([
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
  ]);

  useEffect(() => {
    fetchSiteContentSection("home", SITE_CONTENT_BACKEND_MODES.NEXT)
      .then((data) => setFeatures(data.featureItems ?? []))
      .catch(() => undefined);
  }, []);

  return (
    <section id="solutions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          Why teams choose Northstar
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built to turn roadmaps into repeatable growth.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-lg font-bold text-cyan-200">
              0{index + 1}
            </div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
