export function Header() {
  return (
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
  );
}
