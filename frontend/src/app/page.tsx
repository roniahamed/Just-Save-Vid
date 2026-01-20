'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ResultCard } from '@/components/ResultCard';
import { VideoInfo } from '@/lib/api';

export default function Home() {
  const [data, setData] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleAnalyzeSuccess = (info: VideoInfo, url: string) => {
    setData(info);
    setVideoUrl(url);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      <div className="flex flex-col">
        <Hero onAnalyzeSuccess={handleAnalyzeSuccess} />

        <div id="results" className="container mx-auto px-4 pb-20 -mt-10 relative z-20">
          {data && videoUrl && (
            <ResultCard data={data} videoUrl={videoUrl} />
          )}

          {!data && (
            <div className="pt-20 text-center text-gray-400">
              {/* Placeholder content or features section could go here */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
                <Feature
                  title="Unlimited Downloads"
                  desc="Download as many videos as you want. No limits, no restrictions."
                />
                <Feature
                  title="No Watermark"
                  desc="Save TikToks and Reels without the annoying watermark."
                />
                <Feature
                  title="All Devices"
                  desc="Works perfectly on PC, iPhone, Android, and Tablets."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-100 py-10 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Universal Downloader. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

const Feature = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 mx-auto text-teal-600 font-bold text-xl">
      {title[0]}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
  </div>
);
