/**
 * Shared site header with responsive navigation.
 *
 * The header is used across pages and adapts its layout for desktop and mobile. On
 * small screens, it swaps the wide nav for a compact menu so the experience stays
 * accessible without overwhelming the viewport.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-8">
      <div className="flex items-center justify-between">
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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
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

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 transition hover:border-slate-500 hover:text-white md:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="mt-4 space-y-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-base text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 pt-2">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full border border-slate-700 px-4 py-2 text-center text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-cyan-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Book a demo
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
