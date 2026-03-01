import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Link2 } from 'lucide-react';
import LinkButton from '@/components/link-button';
import ProfileLinks from '@/components/public-profile/profile-links';
import PromoFooter from '@/components/public-profile/promo-footer';
import UnclaimedProfile from '@/components/public-profile/unclaimed-profile';
import ProfileAvatar from '@/components/public-profile/profile-avatar';

interface Props {
    params: { username: string };
}

export async function generateMetadata({ params }: Props) {
    const user = await prisma.user.findUnique({
        where: { username: params.username },
        select: { name: true, bio: true, username: true, avatar: true },
    });

    if (!user) {
        return {
            title: `Claim /${params.username} | MiniLink`,
            description: `The username /${params.username} is available! Claim it now on MiniLink to build your perfect profile.`,
        };
    }

    return {
        title: `${user.name || user.username} | MiniLink`,
        description: user.bio || `Check out ${user.name || user.username}'s links`,
        openGraph: {
            title: `${user.name || user.username} | MiniLink`,
            description: user.bio || `Check out ${user.name || user.username}'s links`,
        },
        icons: {
            icon: user.avatar || '/favicon.ico',
        },
    };
}

export default async function ProfilePage({ params }: Props) {
    const user = await prisma.user.findUnique({
        where: { username: params.username },
        include: {
            links: {
                where: { isActive: true },
                orderBy: { order: 'asc' },
            },
        },
    });

    if (!user) {
        return <UnclaimedProfile username={params.username} />;
    }

    // Record page view
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || null;
    const referer = headersList.get('referer') || null;

    await prisma.pageView.create({
        data: {
            userId: user.id,
            userAgent,
            referer,
        },
    });

    const themeClass = `theme-${user.theme || 'default'}`;

    const customStyles = user.theme === 'custom' ? {
        '--theme-bg': user.customThemeBg || '#05010d',
        '--theme-card': user.customThemeCard || 'rgba(20, 15, 35, 0.7)',
        '--theme-text': user.customThemeText || '#ffffff',
        '--theme-link-bg': 'color-mix(in srgb, var(--theme-card) 50%, transparent)',
        '--theme-link-border': 'color-mix(in srgb, var(--theme-text) 20%, transparent)',
        '--theme-link-hover': 'color-mix(in srgb, var(--theme-card) 80%, transparent)',
        background: 'var(--theme-bg)'
    } as React.CSSProperties : { background: 'var(--theme-bg)' };

    return (
        <div className={`min-h-screen ${themeClass}`} style={customStyles}>
            <div className="max-w-lg mx-auto px-4 py-12">
                {/* Profile Header */}
                <div className="relative mb-12 animate-fade-in-up">
                    {/* Background Glass Card */}
                    <div
                        className="absolute inset-x-0 top-12 bottom-0 rounded-[3rem] backdrop-blur-2xl transition-all duration-500 hover:shadow-2xl"
                        style={{
                            background: 'color-mix(in srgb, var(--theme-card) 60%, transparent)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Ambient Glows Inside Card */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    <div className="relative pt-4 px-6 pb-10 text-center z-10">
                        {/* Avatar */}
                        <ProfileAvatar user={user} />

                        {/* Name & Bio */}
                        <h1
                            className="text-3xl font-extrabold mb-3 tracking-tight"
                            style={{ color: 'var(--theme-text)', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        >
                            {user.name || `@${user.username}`}
                        </h1>
                        {user.bio && (
                            <p
                                className="text-base sm:text-lg max-w-sm mx-auto leading-relaxed font-medium"
                                style={{ color: 'color-mix(in srgb, var(--theme-text) 85%, transparent)' }}
                            >
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Links */}
                <ProfileLinks links={user.links} />

                {/* Footer - Promotional */}
                <PromoFooter />
            </div>
        </div>
    );
}
