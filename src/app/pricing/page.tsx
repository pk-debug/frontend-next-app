"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchSiteContentSection } from "@/features/site-content/site-content-client";
import { SITE_CONTENT_BACKEND_MODES } from "@/features/site-content/site-content-backend-modes";

export default function PricingPage() {
  const [pricing, setPricing] = useState({
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
  });

  useEffect(() => {
    fetchSiteContentSection("pricing", SITE_CONTENT_BACKEND_MODES.NEXT)
      .then((data) => setPricing(data))
      .catch(() => undefined);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
        <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          {pricing.eyebrow}
        </p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
          {pricing.title}
        </h1>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3 lg:px-8">
        {pricing.plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.highlight ? "border-cyan-500/40 bg-cyan-500/5" : ""}
            eyebrow={plan.name}
            title={`${plan.price}/month`}
            description={plan.description}
          >
            <ul className="space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button as="link" href="/contact" variant={plan.highlight ? "primary" : "secondary"}>
                Choose {plan.name}
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
