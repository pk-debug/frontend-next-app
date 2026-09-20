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
