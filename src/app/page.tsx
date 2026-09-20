import { CTASection, ProcessSection } from "@/components/process-cta";
import { FeatureSection } from "@/components/feature-grid";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero";
import { MetricsSection } from "@/components/metrics";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.2),_transparent_25%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />

      <Header />
      <HeroSection />
      <MetricsSection />
      <FeatureSection />
      <ProcessSection />
      <CTASection />
    </main>
  );
}
