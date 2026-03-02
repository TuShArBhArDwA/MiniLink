'use client';

import { useState, useEffect } from 'react';
import { Share2, Sparkles } from 'lucide-react';
import JoinModal from './join-modal';
import ShareModal from './share-modal';

interface ProfileActionsProps {
    user: {
        name: string | null;
        username: string | null;
        avatar: string | null;
        theme: string;
        customThemeBg: string | null;
        customThemeCard: string | null;
        customThemeText: string | null;
    };
    isInline?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export default function ProfileActions({ user, isInline = false, onOpenChange }: ProfileActionsProps) {
    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    // Lock scroll when any modal is open
    useEffect(() => {
        const isAnyOpen = isJoinOpen || isShareOpen;

        // Callback for preview scaling/locking
        onOpenChange?.(isAnyOpen);

        // Body scroll lock for real profile (only if not in preview/inline mode)
        if (!isInline && typeof document !== 'undefined') {
            if (isAnyOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        }

        return () => {
            if (!isInline && typeof document !== 'undefined') {
                document.body.classList.remove('overflow-hidden');
            }
        };
    }, [isJoinOpen, isShareOpen, isInline, onOpenChange]);

    return (
        <>
            {/* Top Left - Join Button */}
            <div className={`${isInline ? 'absolute top-4 left-4' : 'fixed top-6 left-6'} z-50`}>
                <button
                    onClick={() => setIsJoinOpen(true)}
                    className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:bg-white/20 dark:hover:bg-black/40 hover:scale-110 hover:shadow-violet-500/20 transition-all shadow-lg active:scale-95 group"
                    aria-label="Join MiniLink"
                >
                    <span className="text-xl font-black bg-gradient-to-r from-violet-500 to-pink-500 dark:from-violet-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">M</span>
                </button>
            </div>

            {/* Top Right - Share Button */}
            <div className={`${isInline ? 'absolute top-4 right-4' : 'fixed top-6 right-6'} z-50`}>
                <button
                    onClick={() => setIsShareOpen(true)}
                    className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-black/40 hover:scale-110 hover:shadow-violet-500/20 transition-all shadow-lg active:scale-95 group"
                    aria-label="Share Profile"
                >
                    <Share2 className="w-5 h-5 text-gray-800 dark:text-white group-hover:rotate-12 transition-transform drop-shadow-sm" />
                </button>
            </div>

            {/* Modals */}
            <JoinModal
                isOpen={isJoinOpen}
                onClose={() => setIsJoinOpen(false)}
                isInline={isInline}
            />
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                user={user}
                isInline={isInline}
            />
        </>
    );
}
