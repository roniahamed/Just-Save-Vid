import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, LayoutTemplate, Workflow } from "lucide-react";
import { aboutPrinciples, siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${siteName} was rebuilt, and how the frontend now maps cleanly onto the backend workflow.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/90 p-8 shadow-[0_28px_90px_-48px_rgba(15,23,42,0.35)] md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">About</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl">
          {siteName} is a cleaner frontend for a queue-backed video download stack.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{siteDescription}</p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {aboutPrinciples.map((item, index) => (
          <div key={item.title} className="rounded-[1.9rem] bg-slate-950 p-6 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              {index === 0 ? <LayoutTemplate className="h-5 w-5" /> : null}
              {index === 1 ? <Workflow className="h-5 w-5" /> : null}
              {index === 2 ? <Cpu className="h-5 w-5" /> : null}
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/90 p-7">
          <h2 className="font-display text-3xl font-semibold text-slate-950">What changed</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              The broken import path was replaced with a real API client that matches the Django
              endpoints and handles browser-based file retrieval.
            </p>
            <p>
              The placeholder landing page was rebuilt into a finished interface with a stronger
              name, a real visual identity, and complete navigation targets.
            </p>
            <p>
              The development configuration now accounts for local network usage instead of only
              localhost, which matters when the app is opened on another device.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,rgba(240,253,250,0.95),rgba(255,247,237,0.95))] p-7">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Stack shape</h2>
          <div className="mt-6 space-y-3">
            {[
              "Next.js App Router frontend for the browser interface.",
              "Django REST API for analysis, download dispatch, status polling, and retrieval.",
              "Celery plus Redis for background download tasks.",
              "yt-dlp for source analysis and file generation.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/85 px-4 py-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">
            Use the app
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold">
            The homepage is now the main workspace.
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
