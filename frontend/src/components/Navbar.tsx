import React from 'react';
import { DownloadCloud } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-teal-600">
                    <DownloadCloud className="w-8 h-8" />
                    <span>SnapSave Clone</span>
                </Link>
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <Link href="#" className="hover:text-teal-600 transition-colors">How to Download</Link>
                    <Link href="#" className="hover:text-teal-600 transition-colors">FAQ</Link>
                    <Link href="#" className="hover:text-teal-600 transition-colors">About</Link>
                </div>
            </div>
        </nav>
    );
};
