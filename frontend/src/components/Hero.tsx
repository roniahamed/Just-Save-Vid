"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Clipboard,
  Link2,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { analyzeVideo, VideoInfo } from "@/lib/api";
import { siteName, siteTagline, stats, supportedSources } from "@/lib/site";

interface HeroProps {
  onAnalyzeSuccess: (data: VideoInfo, url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeSuccess }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
      setError("Clipboard access was blocked. Paste the link manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Paste a video URL to continue.");
      return;
    }

    try {
      const parsedUrl = new URL(trimmedUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      setError("Enter a valid http or https video URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeVideo(trimmedUrl);
      onAnalyzeSuccess(data, trimmedUrl);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze video. Check the URL and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-10 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pt-16">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Rebuilt experience
        </div>

        <div className="space-y-5">
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-slate-950 md:text-7xl">
            {siteName}
            <span className="block text-balance text-teal-700">{siteTagline}</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Inspect a public video link, review the format list, and trigger a clean download
            workflow through a proper queue-backed backend.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {supportedSources.slice(0, 6).map((source) => (
            <span
              key={source}
              className="rounded-full border border-black/5 bg-white/85 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
            >
              {source}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)]"
            >
              <p className="font-display text-2xl font-semibold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        id="analyzer"
        className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-slate-950 p-1 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.7)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_35%)]" />
        <div className="relative rounded-[1.85rem] border border-white/10 bg-slate-950/95 p-6 text-white md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                Analyzer
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Paste a link and fetch the available formats
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              API-driven
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-200" htmlFor="video-url">
              Video URL
            </label>
            <div className="relative">
              <Link2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                id="video-url"
                type="text"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Clipboard className="h-4 w-4" />
                Paste link
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:bg-teal-400/70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    Analyze video
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="h-5 w-5 text-teal-300" />
              <p className="mt-3 text-sm font-semibold text-white">Clear status feedback</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                You see format choices and task progress instead of a blind one-click flow.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Sparkles className="h-5 w-5 text-amber-300" />
              <p className="mt-3 text-sm font-semibold text-white">LAN-friendly setup</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                The client can adapt local API URLs when you open the app from another device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
