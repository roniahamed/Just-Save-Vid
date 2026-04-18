import Link from "next/link";
import { navLinks, siteDescription, siteName, supportedSources } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_0.8fr_1fr] md:px-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">
            {siteName}
          </p>
          <h2 className="max-w-md font-display text-2xl font-semibold text-slate-950">
            A sharper frontend for everyday video download workflows.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600">{siteDescription}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block transition-colors hover:text-teal-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Popular Sources</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {supportedSources.slice(0, 6).map((source) => (
              <span
                key={source}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {source}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Copyright {new Date().getFullYear()} {siteName}. Use responsibly and respect source platform rules.
          </p>
        </div>
      </div>
    </footer>
  );
};
