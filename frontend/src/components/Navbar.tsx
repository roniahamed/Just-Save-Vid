"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadCloud } from "lucide-react";
import { navLinks, siteName } from "@/lib/site";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(255,250,242,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-teal-600/15 transition-transform duration-300 group-hover:-translate-y-0.5">
            <DownloadCloud className="h-5 w-5" />
          </span>
          <div>
            <span className="block font-display text-lg font-semibold tracking-tight text-slate-950">
              {siteName}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Video toolkit
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-black/5 bg-white/80 p-1.5 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:text-teal-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
