import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-4xl flex-1 items-center px-4 py-20 md:px-6">
      <section className="w-full rounded-[2.4rem] border border-black/5 bg-white/90 p-10 text-center shadow-[0_28px_90px_-48px_rgba(15,23,42,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950">
          That page does not exist.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Return to the homepage and use the analyzer or one of the completed support pages.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
