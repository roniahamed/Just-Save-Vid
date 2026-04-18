"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { ResultCard } from "@/components/ResultCard";
import { VideoInfo } from "@/lib/api";
import {
  faqItems,
  processSteps,
  supportedSources,
  trustHighlights,
} from "@/lib/site";

export default function Home() {
  const [data, setData] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleAnalyzeSuccess = (info: VideoInfo, url: string) => {
    setData(info);
    setVideoUrl(url);

    window.setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  return (
    <main className="pb-20">
      <Hero onAnalyzeSuccess={handleAnalyzeSuccess} />

      <div id="results" className="mx-auto max-w-6xl px-4 md:px-6">
        {data && videoUrl ? <ResultCard data={data} videoUrl={videoUrl} /> : null}
      </div>

      <section className="mx-auto mt-16 max-w-6xl px-4 md:px-6">
        <div className="rounded-[2.25rem] border border-black/5 bg-white/85 p-6 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.35)] md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {trustHighlights.map((item, index) => (
              <div key={item.title} className="rounded-[1.5rem] bg-slate-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  {index === 0 ? <Layers3 className="h-5 w-5" /> : null}
                  {index === 1 ? <ShieldCheck className="h-5 w-5" /> : null}
                  {index === 2 ? <Sparkles className="h-5 w-5" /> : null}
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
              Supported flow
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">
              Built around real download decisions
            </h2>
          </div>
          <Link
            href="/how-to-download"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-teal-700"
          >
            See the full walkthrough
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.75rem] border border-black/5 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)]"
            >
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-800">
                Step {index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
        <div className="rounded-[2.25rem] bg-slate-950 p-8 text-white md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">
                Source coverage
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
                Common platforms up front, broader extractor support underneath.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                The UI does not pretend every provider behaves the same. Availability depends on
                public access, regional restrictions, and what the backend extractor can access at
                the moment you request it.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {supportedSources.map((source) => (
                <div
                  key={source}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-slate-100"
                >
                  {source}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
              FAQ highlights
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">
              The answers people usually need before they click download
            </h2>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-teal-700"
          >
            Open full FAQ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqItems.slice(0, 4).map((item) => (
            <div
              key={item.question}
              className="rounded-[1.75rem] border border-black/5 bg-white/90 p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-950">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
        <div className="rounded-[2.25rem] border border-teal-200 bg-[linear-gradient(135deg,rgba(240,253,250,0.95),rgba(255,247,237,0.95))] p-8 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">
              Ready to use it
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950">
              Start with the analyzer, then explore the rest of the app when you need context.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The home page is the working surface. The support pages explain the flow, the
              backend requirements, and the reasoning behind the rebuild.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Learn about ClipHarbor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
