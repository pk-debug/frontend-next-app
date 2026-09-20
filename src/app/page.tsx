/**
 * Home page entry point.
 *
 * This page is intentionally thin: it composes the major landing-page sections into
 * a single narrative flow. Keeping the page file small makes the app easier to
 * reason about and keeps each section reusable in future work.
 */
import { CTASection, ProcessSection } from "@/components/process-cta";
import { FeatureSection } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero";
import { MetricsSection } from "@/components/metrics";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <HeroSection />
      <MetricsSection />
      <FeatureSection />
      <ProcessSection />
      <CTASection />
    </main>
  );
}
