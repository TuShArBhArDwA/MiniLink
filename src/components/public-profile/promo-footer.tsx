'use client';

import Link from 'next/link';
import { Link2, Heart } from 'lucide-react';

export default function PromoFooter() {
    return (
        <div className="mt-16 pb-8 flex justify-center opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
            <div>
                <Link
                    href="/"
                    className="pointer-events-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 group rounded-full"
                    style={{
                        background: 'color-mix(in srgb, var(--theme-card) 90%, transparent)',
                        color: 'var(--theme-text)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="flex bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg p-1.5 mr-1 shadow-inner group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-white font-black text-sm px-1 leading-none self-center">M</span>
                    </div>
                    <span className="opacity-90 font-bold tracking-wide">
                        Create your MiniLink
                    </span>
                </Link>
            </div>
        </div>
    );
}

