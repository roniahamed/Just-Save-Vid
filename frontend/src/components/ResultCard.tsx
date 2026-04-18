"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  MonitorSmartphone,
  Video,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  VideoFormat,
  VideoInfo,
  checkStatus,
  retrieveFile,
  startDownload,
} from "@/lib/api";

interface ResultCardProps {
  data: VideoInfo;
  videoUrl: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, videoUrl }) => {
  return (
    <section className="mx-auto w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/92 shadow-[0_32px_90px_-40px_rgba(15,23,42,0.45)]">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-slate-100">
              {data.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.18),transparent_40%),linear-gradient(135deg,#dbeafe,#f8fafc)] text-slate-500">
                  <Video className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="space-y-4 rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1">{data.source}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {data.duration || "Duration unavailable"}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {data.formats.length} formats
                </span>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold leading-tight">{data.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Pick a format below. Higher-quality sources may take longer because the backend
                  has to merge video and audio before returning the file.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<CheckCircle2 className="h-5 w-5 text-teal-600" />}
                title="Background task flow"
                description="Downloads run asynchronously, so the interface can poll cleanly until the file is ready."
              />
              <InfoCard
                icon={<MonitorSmartphone className="h-5 w-5 text-amber-600" />}
                title="Device-aware choices"
                description="Choose small files for phones or larger merged formats for desktop playback."
              />
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50/80">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-white text-slate-600">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Quality</th>
                      <th className="px-5 py-4 font-semibold">Type</th>
                      <th className="px-5 py-4 font-semibold">Size</th>
                      <th className="px-5 py-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.formats.map((format) => (
                      <DownloadRow key={format.format_id} format={format} url={videoUrl} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
    {icon}
    <p className="mt-3 text-sm font-semibold text-slate-950">{title}</p>
    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
  </div>
);

const DownloadRow = ({ format, url }: { format: VideoFormat; url: string }) => {
  const [status, setStatus] = useState<
    "idle" | "starting" | "polling" | "success" | "error"
  >("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
      if (resetRef.current) {
        clearTimeout(resetRef.current);
      }
    };
  }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const handleDownload = async () => {
    if (status === "polling" || status === "starting") {
      return;
    }

    stopPolling();

    try {
      setStatus("starting");
      const taskId = await startDownload(url, format.format_id);
      setStatus("polling");

      pollRef.current = setInterval(async () => {
        try {
          const task = await checkStatus(taskId);

          if (task.status === "SUCCESS") {
            stopPolling();
            await retrieveFile(taskId);
            setStatus("success");
            resetRef.current = setTimeout(() => setStatus("idle"), 5000);
          } else if (task.status === "FAILURE") {
            stopPolling();
            console.error(task.error);
            setStatus("error");
          }
        } catch (error) {
          stopPolling();
          console.error(error);
          setStatus("error");
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      stopPolling();
      setStatus("error");
    }
  };

  return (
    <tr className="bg-white/70 transition-colors hover:bg-white">
      <td className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-950">{format.resolution}</span>
          {format.note ? (
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
              {format.note}
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
        {format.ext}
      </td>
      <td className="px-5 py-4 text-slate-600">{format.filesize}</td>
      <td className="px-5 py-4 text-right">
        <button
          onClick={handleDownload}
          disabled={status === "starting" || status === "polling"}
          className={twMerge(
            "inline-flex min-w-[126px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            status === "idle" && "bg-slate-950 text-white hover:bg-teal-700",
            (status === "starting" || status === "polling") &&
              "cursor-not-allowed bg-slate-100 text-slate-400",
            status === "success" && "bg-emerald-600 text-white",
            status === "error" && "bg-rose-50 text-rose-700",
          )}
        >
          {status === "idle" ? (
            <>
              Download
              <Download className="h-4 w-4" />
            </>
          ) : null}
          {status === "starting" || status === "polling" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {status === "starting" ? "Starting" : "Building"}
            </>
          ) : null}
          {status === "success" ? (
            <>
              Ready
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : null}
          {status === "error" ? (
            <>
              Retry
              <AlertCircle className="h-4 w-4" />
            </>
          ) : null}
        </button>
      </td>
    </tr>
  );
};
