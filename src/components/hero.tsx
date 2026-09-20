/**
 * Hero section for the main marketing page.
 *
 * This section communicates the most important business value immediately: who the
 * company is, what value it creates, and what action the visitor should take next.
 * It follows classic SaaS marketing patterns: strong headline, proof, CTA, and a
 * dashboard-style visual.
 */
const logos = ["Vercel", "Stripe", "Notion", "GitHub", "Figma", "Linear"];

export function HeroSection() {
  return (
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
  );
}
