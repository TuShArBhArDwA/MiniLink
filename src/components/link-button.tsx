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
            className="group relative flex items-center w-full p-2 mb-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 overflow-hidden"
            style={{
                background: 'var(--theme-link-bg)',
                border: '1px solid var(--theme-link-border)',
                color: 'var(--theme-text)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-shine pointer-events-none" />

            {/* Inner glow border (Subtle) */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />

            {/* Icon Container */}
            <div
                className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner group-hover:scale-110 transition-all duration-300"
                style={{
                    background: 'color-mix(in srgb, var(--theme-text) 10%, transparent)',
                }}
            >
                {icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 flex justify-center pr-12">
                <span className="font-semibold text-sm sm:text-base tracking-wide group-hover:tracking-wider transition-all duration-300 truncate px-2">
                    {link.title}
                </span>
            </div>
        </a>
    );
}
