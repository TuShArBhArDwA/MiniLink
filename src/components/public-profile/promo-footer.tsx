'use client';

import Link from 'next/link';
import { Link2, Heart } from 'lucide-react';

export default function PromoFooter() {
    return (
        <div className="mt-16 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Link
                href="/"
                className="group inline-flex flex-col items-center gap-2"
                style={{ color: 'var(--theme-text)' }}
            >
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <span className="text-xs font-medium">Create your own free page</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300"></div>
                        <div className="absolute inset-[2px] rounded-[10px] bg-white dark:bg-[#0a0a0f] flex items-center justify-center">
                            <span className="text-lg font-black bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent">M</span>
                        </div>
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        Mini<span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Link</span>
                    </span>
                </div>
            </Link>
        </div>
    );
}
