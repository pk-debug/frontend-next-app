import Link from "next/link";
import { navItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
          N
        </div>
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">
          Northstar
        </p>
      </Link>

      <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white sm:inline-flex"
        >
          Log in
        </Link>
        <Link
          href="/pricing"
          className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Book a demo
        </Link>
      </div>
    </header>
  );
}
