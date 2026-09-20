/**
 * Process and CTA storytelling section.
 *
 * This component combines two persuasive patterns: showing how the system works and
 * ending with a conversion-focused prompt. Together they help the visitor understand
 * the experience and take the intended next step.
 */
import { workflowSteps } from "@/data/site";

export function ProcessSection() {
  return (
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
            {workflowSteps.map((step, index) => (
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
  );
}

export function CTASection() {
  return (
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
  );
}
