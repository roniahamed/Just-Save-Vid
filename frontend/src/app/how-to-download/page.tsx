import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clipboard, Download, Search } from "lucide-react";
import { processSteps, siteName, supportedSources } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Download",
  description: `Learn how ${siteName} analyzes links, presents formats, and retrieves completed downloads.`,
};

export default function HowToDownloadPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/90 p-8 shadow-[0_28px_90px_-48px_rgba(15,23,42,0.35)] md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">
          How it works
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl">
          A clean three-step workflow from pasted link to finished file.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {siteName} is built around visibility. You see what the backend found, what quality is
          available, and when the download task is actually finished.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {processSteps.map((step, index) => (
          <div key={step.title} className="rounded-[1.9rem] bg-slate-950 p-6 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              {index === 0 ? <Clipboard className="h-5 w-5" /> : null}
              {index === 1 ? <Search className="h-5 w-5" /> : null}
              {index === 2 ? <Download className="h-5 w-5" /> : null}
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
              Step {index + 1}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/85 p-7">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Best practices</h2>
          <div className="mt-6 space-y-4">
            {[
              "Use a direct public video link instead of a channel or profile URL.",
              "If a high-resolution option notes that it is merged, expect a slower backend task.",
              "Keep Redis and the Celery worker running if you want download buttons to finish successfully.",
              "If you open the frontend from another device, keep the backend reachable on port 8002.",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                <p className="text-sm leading-7 text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,rgba(240,253,250,0.95),rgba(255,247,237,0.95))] p-7">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Typical sources</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {supportedSources.map((source) => (
              <span
                key={source}
                className="rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {source}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Support can change over time because providers change markup, delivery formats, and
            rate limits. Treat the analyzer as the source of truth for a given link.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">
            Start here
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold">
            Open the analyzer and test the flow with a real public link.
          </h2>
        </div>
        <Link
          href="/#analyzer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 md:mt-0"
        >
          Go to analyzer
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
