'use client';

import Link from 'next/link';
import { Link2, Heart } from 'lucide-react';

interface PromoFooterProps {
    name?: string | null;
}

export default function PromoFooter({ name }: PromoFooterProps) {
    const displayName = name || 'MiniLink';

    return (
        <div className="mt-16 pb-12 flex justify-center opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
            <Link
                href="/"
                className="pointer-events-auto inline-flex items-center justify-center px-10 py-4 bg-white/10 dark:bg-black/20 backdrop-blur-md text-gray-900 dark:text-white rounded-full text-[15px] font-bold shadow-xl hover:bg-white/20 dark:hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 dark:border-white/10"
            >
                Join {displayName} on MiniLink
            </Link>
        </div>
    );
}

