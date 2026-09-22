/**
 * Shared site footer.
 *
 * This component keeps the footer consistent across the app and provides easy access
 * to the main information pages. It is intentionally lightweight so it does not
 * overcomplicate the app shell.
 */
import { siteContent } from "@/server/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{siteContent.brand.footerCopyright}</p>
        <div className="flex gap-6">
          {siteContent.footer.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
