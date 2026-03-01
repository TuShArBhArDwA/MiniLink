'use client';

import Link from 'next/link';
import { Link2, Heart } from 'lucide-react';

export default function PromoFooter() {
    return (
        <div className="mt-16 pb-8 flex justify-center opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
            <div>
                <Link
                    href="/"
                    className="pointer-events-auto relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:scale-95 group rounded-[1.25rem] overflow-hidden"
                    style={{
                        background: 'color-mix(in srgb, var(--theme-card) 60%, transparent)',
                        color: 'var(--theme-text)',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid color-mix(in srgb, var(--theme-text) 15%, transparent)',
                    }}
                >
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 scale-[2.0] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[shimmer_2s_ease-out_infinite] pointer-events-none" />

                    <div className="flex relative z-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[0.6rem] p-1.5 mr-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                        <span className="text-white font-black text-sm px-1.5 leading-none self-center drop-shadow-sm">M</span>
                    </div>
                    <span className="relative z-10 font-extrabold tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
                        Create your MiniLink
                    </span>
                </Link>
            </div>
        </div>
    );
}

