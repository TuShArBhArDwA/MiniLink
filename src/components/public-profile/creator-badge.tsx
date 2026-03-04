'use client';

import { BadgeCheck } from 'lucide-react';

export default function CreatorBadge() {
    return (
        <span className="relative inline-flex items-center ml-2 align-middle" title="Premium Creator">
            {/* Glow behind icon */}
            <span className="absolute inset-0 bg-violet-500/30 rounded-full blur-sm animate-pulse" />
            <BadgeCheck
                className="relative w-7 h-7 drop-shadow-lg"
                style={{
                    color: '#a855f7',
                    filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.5))',
                }}
                strokeWidth={2.2}
            />
        </span>
    );
}
