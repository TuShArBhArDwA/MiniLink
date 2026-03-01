'use client';

import Image from 'next/image';
import { Link2 } from 'lucide-react';

interface LinkButtonProps {
    link: {
        id: string;
        url: string;
        title: string;
    };
    icon: React.ReactNode;
}

export default function LinkButton({
    link,
    icon
}: LinkButtonProps) {
    const handleClick = async () => {
        // Track click - fire and forget
        try {
            fetch(`/api/track/${link.id}`, { method: 'POST' });
        } catch (error) {
            console.error('Failed to track click', error);
        }
    };

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group relative flex items-center w-full p-2 rounded-[1.25rem] transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] hover:z-20 overflow-hidden bg-[var(--theme-link-bg)] hover:bg-[var(--theme-link-hover)] border border-[var(--theme-link-border)] text-[var(--theme-text)] backdrop-blur-xl shadow-lg hover:shadow-2xl"
            style={{
                boxShadow: '0 4px 15px -3px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            }}
        >
            {/* Shimmer Effect Sweep */}
            <div className="absolute inset-0 scale-[2.0] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[shimmer_2s_ease-out_infinite] pointer-events-none" />

            {/* Inner glow border (Subtle) */}
            <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

            {/* Icon Container */}
            <div
                className="relative shrink-0 w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-500 overflow-hidden"
                style={{
                    background: 'color-mix(in srgb, var(--theme-text) 8%, transparent)',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }}
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 flex justify-center pr-[3.5rem]">
                <span className="font-bold text-[15px] sm:text-[17px] tracking-wide group-hover:tracking-widest transition-all duration-500 truncate px-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    {link.title}
                </span>
            </div>
        </a>
    );
}
