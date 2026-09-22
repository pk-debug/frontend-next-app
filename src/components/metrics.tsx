"use client";

/**
 * Social-proof metrics strip.
 *
 * This section is intentionally simple but powerful: it converts abstract claims into
 * numbers that visitors can quickly scan. Proof points like these are common in
 * high-converting marketing pages because they reduce uncertainty.
 */
import { useEffect, useState } from "react";
import { fetchSiteContentSection } from "@/features/site-content/site-content-client";
import { SITE_CONTENT_BACKEND_MODES } from "@/features/site-content/site-content-backend-modes";

export function MetricsSection() {
  const [metrics, setMetrics] = useState<Array<{ value: string; label: string }>>([
    { value: "12k+", label: "Marketing teams launched" },
    { value: "4.8/5", label: "Average customer rating" },
    { value: "3x", label: "Faster campaign launches" },
    { value: "99.9%", label: "Platform uptime" },
  ]);

  useEffect(() => {
    fetchSiteContentSection("home", SITE_CONTENT_BACKEND_MODES.NEXT)
      .then((data) => setMetrics(data.metrics ?? []))
      .catch(() => undefined);
  }, []);

  return (
    <section id="results" className="border-y border-slate-800 bg-slate-900/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 text-center md:grid-cols-4 lg:px-8">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-3xl font-black text-white">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
