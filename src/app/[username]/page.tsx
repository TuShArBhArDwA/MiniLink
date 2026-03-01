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

interface Props {
    params: { username: string };
}

export async function generateMetadata({ params }: Props) {
    const user = await prisma.user.findUnique({
        where: { username: params.username },
        select: { name: true, bio: true, username: true },
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
                <div
                    className="text-center mb-10 p-8 rounded-[2.5rem] backdrop-blur-xl animate-fade-in-up relative overflow-hidden group"
                    style={{
                        background: 'color-mix(in srgb, var(--theme-card) 85%, transparent)',
                        color: 'var(--theme-text)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Subtle Top Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-700"></div>

                    {/* Avatar */}
                    <div className="relative w-28 h-28 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl bg-white dark:bg-gray-900 z-10">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={user.name || user.username || 'User'}
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white">
                                        {(user.name || user.username || 'U')[0].toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name & Bio */}
                    <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
                        {user.name || `@${user.username}`}
                    </h1>
                    {user.bio && (
                        <p className="text-sm sm:text-base opacity-80 max-w-sm mx-auto leading-relaxed font-medium">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* Links */}
                <ProfileLinks links={user.links} />

                {/* Footer - Promotional */}
                <PromoFooter />
            </div>
        </div>
    );
}
