import { ContentSection } from "@/components/sections/content-section";

const values = [
  {
    title: "Strategy-first thinking",
    description: "We help teams align product, brand, and campaigns around meaningful market moments.",
  },
  {
    title: "Human-centered design",
    description: "Every experience is designed to feel clear, useful, and easy to trust.",
  },
  {
    title: "Fast iteration",
    description: "We validate messaging and experiences early so teams can adjust before scale begins.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          About Northstar
        </p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
          We turn product momentum into measurable growth.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Northstar helps modern companies connect product strategy, marketing clarity, and digital execution in one consistent system.
        </p>
      </div>

      <ContentSection
        eyebrow="Our principles"
        title="A framework that balances storytelling and performance."
        items={values}
        columns={3}
        centered
      />
    </main>
  );
}
