'use client';

import React, { useState, useEffect } from 'react';
import { VideoInfo, startDownload, checkStatus, retrieveFile, VideoFormat } from '@/lib/api';
import { Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ResultCardProps {
    data: VideoInfo;
    videoUrl: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, videoUrl }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Left: Thumbnail */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-video w-full relative rounded-lg overflow-hidden shadow-md group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={data.thumbnail}
                            alt={data.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            {data.duration}
                        </div>
                        <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded shadow-sm font-bold capitalize">
                            {data.source}
                        </div>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-gray-800 line-clamp-2 leading-snug md:hidden">
                        {data.title}
                    </h2>
                </div>

                {/* Right: Info & Table */}
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2 leading-snug hidden md:block">
                        {data.title}
                    </h2>

                    <div className="border rounded-xl overflow-hidden border-gray-100 shadow-sm bg-gray-50/50">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-100 text-gray-700 font-medium border-b border-gray-200">
                                    <tr>
                                        <th className="p-3 pl-4">Quality</th>
                                        <th className="p-3">Size</th>
                                        <th className="p-3 text-right pr-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.formats.map((format) => (
                                        <DownloadRow
                                            key={format.format_id}
                                            format={format}
                                            url={videoUrl}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Separate component for Row to manage individual download state
const DownloadRow = ({ format, url }: { format: VideoFormat, url: string }) => {
    const [status, setStatus] = useState<'idle' | 'starting' | 'polling' | 'success' | 'error'>('idle');

    // Cleanup interval on unmount
    useEffect(() => {
        return () => { }; // Helper cleanup if we stored interval ref, but we use local vars in handler mainly.
    }, []);

    const handleDownload = async () => {
        if (status === 'polling' || status === 'starting') return;

        try {
            setStatus('starting');
            // 1. Start Task using the passed URL props
            const taskId = await startDownload(url, format.format_id);

            setStatus('polling');

            // 2. Poll Status
            const pollInterval = setInterval(async () => {
                try {
                    const task = await checkStatus(taskId);
                    if (task.status === 'SUCCESS') {
                        clearInterval(pollInterval);
                        setStatus('success');
                        retrieveFile(taskId);
                        // Reset to idle after a delay so user can download again if needed
                        setTimeout(() => setStatus('idle'), 8002);
                    } else if (task.status === 'FAILURE') {
                        clearInterval(pollInterval);
                        setStatus('error');
                        console.error(task.error);
                    }
                    // Else: processing
                } catch (e) {
                    clearInterval(pollInterval);
                    setStatus('error');
                }
            }, 2000);

        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <tr className="hover:bg-white transition-colors group">
            <td className="p-3 pl-4">
                <span className="font-bold text-gray-800">{format.resolution}</span>
                {format.note && (
                    <span className="ml-2 text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                        {format.note}
                    </span>
                )}
            </td>
            <td className="p-3 text-gray-500 font-mono text-xs">{format.filesize}</td>
            <td className="p-3 text-right pr-4">
                <button
                    onClick={handleDownload}
                    disabled={status === 'starting' || status === 'polling'}
                    className={twMerge(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm min-w-[120px] justify-center",
                        status === 'idle' && "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md active:scale-95",
                        (status === 'starting' || status === 'polling') && "bg-gray-100 text-gray-400 cursor-not-allowed",
                        status === 'success' && "bg-green-600 text-white",
                        status === 'error' && "bg-red-50 text-red-600 border border-red-200"
                    )}
                >
                    {status === 'idle' && (
                        <>
                            Download <Download className="w-4 h-4" />
                        </>
                    )}
                    {(status === 'starting' || status === 'polling') && (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {status === 'starting' ? 'Starting' : 'Building'}
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            Done <CheckCircle2 className="w-4 h-4" />
                        </>
                    )}
                    {status === 'error' && (
                        <>
                            Failed <AlertCircle className="w-4 h-4" />
                        </>
                    )}
                </button>
            </td>
        </tr>
    );
};
