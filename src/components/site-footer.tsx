export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 Northstar. Built for forward-thinking teams.</p>
        <div className="flex gap-6">
          <a href="/about" className="hover:text-white">
            About
          </a>
          <a href="/pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="/contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
