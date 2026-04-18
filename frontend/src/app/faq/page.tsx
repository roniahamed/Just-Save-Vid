import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { faqItems, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers about ${siteName}, supported sources, queue-backed downloads, and local network usage.`,
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/90 p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">FAQ</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl">
          Straight answers about the frontend, the backend queue, and what to expect.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          This app works best when the backend environment is complete and the source link is
          public. The points below cover the common failure modes and setup questions.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {faqItems.map((item) => (
          <article
            key={item.question}
            className="rounded-[1.9rem] border border-black/5 bg-white/90 p-6 shadow-[0_22px_70px_-48px_rgba(15,23,42,0.35)]"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(240,253,250,0.95),rgba(255,247,237,0.95))] p-8 md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">
            Need the working surface
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">
            Return to the homepage to analyze another link.
          </h2>
        </div>
        <Link
          href="/#analyzer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 md:mt-0"
        >
          Open analyzer
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
