const metrics = [
  { value: "12k+", label: "Marketing teams launched" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "3x", label: "Faster campaign launches" },
  { value: "99.9%", label: "Platform uptime" },
];

const logos = ["Vercel", "Stripe", "Notion", "GitHub", "Figma", "Linear"];

const features = [
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

const workflow = [
  "Map the offer, audience, and primary conversion goal.",
  "Design the experience around clear messaging and trust signals.",
  "Deploy with measurable performance insights and iteration loops.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.2),_transparent_25%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
            N
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">
              Northstar
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#solutions" className="transition hover:text-white">
            Solutions
          </a>
          <a href="#results" className="transition hover:text-white">
            Results
          </a>
          <a href="#process" className="transition hover:text-white">
            Process
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white sm:inline-flex">
            Log in
          </button>
          <button className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Book a demo
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-cyan-200 uppercase">
              Built for modern growth teams
            </span>

            <h1 className="mt-6 max-w-xl text-5xl font-black tracking-tight text-white sm:text-6xl">
              Turn attention into momentum.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Northstar helps ambitious teams design, launch, and optimize digital
              experiences that convert visitors into customers faster.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Start free trial
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                See platform
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-300">
              <span>Trusted by teams at</span>
              <div className="flex flex-wrap gap-4">
                {logos.map((logo) => (
                  <span key={logo} className="text-slate-400">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                    Live demo
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 p-4">
                    <p className="text-sm text-slate-300">Pipeline growth</p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-3xl font-bold text-white">+142%</p>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">
                        +18.4% MoM
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Qualified leads</p>
                      <p className="mt-2 text-2xl font-bold text-white">8.4k</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Conversion rate</p>
                      <p className="mt-2 text-2xl font-bold text-white">7.8%</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-slate-300">Campaign overview</p>
                      <span className="text-xs text-cyan-300">Updated 4m ago</span>
                    </div>
                    <div className="space-y-3">
                      {[64, 72, 58, 86, 92].map((bar, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-8 text-xs text-slate-400">Q{idx + 1}</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                              style={{ width: `${bar}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <p className="mt-4 text-base leading-7 text-slate-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                A growth system that stays clear, fast, and measurable.
              </h2>
            </div>

            <div className="space-y-5">
              {workflow.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 font-semibold text-cyan-300">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-base leading-7 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/8 via-slate-900 to-violet-500/10 p-8 text-center sm:p-12">
          <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
            Ready to launch
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Build the next chapter of your brand.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            A modern frontend stack gives your team the speed to prototype, the quality to scale, and the flexibility to keep learning.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start your project
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
