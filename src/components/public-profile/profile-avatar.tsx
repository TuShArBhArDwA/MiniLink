'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';

interface ProfileAvatarProps {
    user: {
        name: string | null;
        username: string | null;
        avatar: string | null;
    };
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <>
            <div
                className="relative w-32 h-32 mx-auto mb-8 group cursor-pointer"
                onClick={toggleOpen}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* 1. Outer Lens Glow (Breathing) */}
                <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>

                {/* 2. Slow Outer Ring (Faint) */}
                <div className="absolute -inset-2 border border-white/10 rounded-full animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-80 transition-opacity"></div>

                {/* 3. Fast Inner Ring (Vibrant) */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-violet-500/40 via-white/20 to-fuchsia-500/40 rounded-full blur-sm opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 animate-[spin_4s_linear_infinite]"></div>

                {/* 4. Frosted Glass Border */}
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-full scale-[1.04] backdrop-blur-md border border-white/50 shadow-2xl"></div>

                {/* 5. Avatar Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-950 shadow-inner group-hover:scale-[0.97] transition-transform duration-700 z-10 ring-1 ring-white/10">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={user.name || user.username || 'User'}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="128px"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                            <span className="text-5xl font-black text-white drop-shadow-md">
                                {(user.name || user.username || 'U')[0].toUpperCase()}
                            </span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white/80" />
                    </div>
                </div>

                {/* Click Label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[11px] font-bold tracking-wider ring-1 ring-white/20 shadow-xl whitespace-nowrap">
                        CLICK TO VIEW
                    </span>
                </div>
            </div>

            {/* Lightbox / Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-hidden"
                    onClick={toggleOpen}
                >
                    {/* Floating Close Button */}
                    <button
                        className="absolute top-6 right-6 p-4 text-white hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-2xl rounded-full transition-all duration-300 z-[110] border border-white/20 hover:border-white/40 group hover:scale-110 shadow-2xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleOpen();
                        }}
                    >
                        <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
                    </button>

                    {/* Main Image Container */}
                    <div
                        className="relative w-full max-w-xl aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-500 ease-out z-[105]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name || user.username || 'User'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 800px"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                <span className="text-9xl font-black text-white">
                                    {(user.name || user.username || 'U')[0].toUpperCase()}
                                </span>
                            </div>
                        )}

                        {/* Glassmorphic Caption Footer */}
                        <div className="absolute bottom-0 inset-x-0 p-10 pt-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-1">
                            <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
                                {user.name || `@${user.username}`}
                            </h2>
                        </div>
                    </div>

                    {/* Backdrop Click Hint */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-medium tracking-widest animate-pulse">
                        CLICK OUTSIDE TO CLOSE
                    </div>
                </div>
            )}
        </>
    );
}
