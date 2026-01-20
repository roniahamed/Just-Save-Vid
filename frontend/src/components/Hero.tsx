'use client';

import React, { useState } from 'react';
import { analyzeVideo, VideoInfo } from '@/lib/api';
import { Search, Loader2, ArrowRight, Clipboard } from 'lucide-react';

interface HeroProps {
    onAnalyzeSuccess: (data: VideoInfo, url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeSuccess }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError('');

        try {
            const data = await analyzeVideo(url);
            onAnalyzeSuccess(data, url);
        } catch (err: any) {
            console.error(err);
            setError('Failed to analyze video. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-gradient-to-b from-teal-50 to-white py-20 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Download Videos from <span className="text-teal-600">Anywhere</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                The fastest way to save videos from YouTube, TikTok, Facebook, and Instagram.
                Best quality, free, and secure.
            </p>

            <div className="max-w-3xl mx-auto relative group">
                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>

                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste video URL here..."
                            className="w-full h-16 pl-14 pr-36 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none text-lg shadow-sm transition-all text-gray-700"
                        />

                        <button
                            type="button"
                            onClick={handlePaste}
                            className="absolute right-32 md:right-36 p-2 text-gray-400 hover:text-teal-600 transition-colors"
                            title="Paste from clipboard"
                        >
                            <Clipboard className="w-5 h-5" />
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="hidden md:inline">Processing</span>
                                </>
                            ) : (
                                <>
                                    Download <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Decorative shadow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            </div>

            {error && (
                <div className="mt-6 text-red-500 bg-red-50 inline-block px-4 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                    {error}
                </div>
            )}
        </div>
    );
};
