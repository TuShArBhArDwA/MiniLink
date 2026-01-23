import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import {
    Instagram,
    Youtube,
    Twitter,
    Github,
    Linkedin,
    Facebook,
    Globe,
    Mail,
    MessageCircle,
    Send,
    Music2,
    Twitch,
    Coffee,
    ShoppingBag,
    Link2
} from 'lucide-react';

const iconMap: Record<string, any> = {
    website: Globe,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    facebook: Facebook,
    email: Mail,
    whatsapp: MessageCircle,
    telegram: Send,
    spotify: Music2,
    twitch: Twitch,
    kofi: Coffee,
    shop: ShoppingBag,
    link: Link2,
};

interface Props {
    params: { username: string };
}

export async function generateMetadata({ params }: Props) {
    const user = await prisma.user.findUnique({
        where: { username: params.username },
        select: { name: true, bio: true, username: true },
    });

    if (!user) {
        return { title: 'User not found' };
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
        notFound();
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

    return (
        <div className={`min-h-screen ${themeClass}`} style={{ background: 'var(--theme-bg)' }}>
            <div className="max-w-lg mx-auto px-4 py-12">
                {/* Profile Header */}
                <div
                    className="text-center mb-8 p-6 rounded-3xl backdrop-blur-lg"
                    style={{
                        background: 'var(--theme-card)',
                        color: 'var(--theme-text)'
                    }}
                >
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-white/30">
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name || user.username || 'User'}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">
                                    {(user.name || user.username || 'U')[0].toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Name & Bio */}
                    <h1 className="text-2xl font-bold mb-1">
                        {user.name || `@${user.username}`}
                    </h1>
                    {user.name && (
                        <p className="text-sm opacity-70 mb-2">@{user.username}</p>
                    )}
                    {user.bio && (
                        <p className="text-sm opacity-80 max-w-xs mx-auto">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* Links */}
                <div className="space-y-3">
                    {user.links.map((link) => {
                        const IconComponent = link.icon ? iconMap[link.icon] : Link2;
                        const isCustomIcon = link.icon?.startsWith('http');

                        return (
                            <LinkButton
                                key={link.id}
                                link={link}
                                IconComponent={IconComponent}
                                isCustomIcon={isCustomIcon}
                            />
                        );
                    })}
                </div>

                {/* Footer - Promotional */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--theme-text)' }}
                    >
                        <span className="text-xs">Create your own free page</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <Link2 className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-semibold text-sm">MiniLink</span>
                        </div>
                    </Link>
                    <p className="text-xs mt-4 opacity-50" style={{ color: 'var(--theme-text)' }}>
                        made with 💙 by tushar bhardwaj
                    </p>
                </div>
            </div>
        </div>
    );
}

// Client component for tracking clicks
function LinkButton({
    link,
    IconComponent,
    isCustomIcon
}: {
    link: any;
    IconComponent: any;
    isCustomIcon: boolean;
}) {
    const handleClick = async () => {
        // Track click
        fetch(`/api/track/${link.id}`, { method: 'POST' });
    };

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="block w-full p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            style={{
                background: 'var(--theme-link-bg)',
                border: '1px solid var(--theme-link-border)',
                color: 'var(--theme-text)',
            }}
        >
            <div className="flex items-center justify-center gap-3">
                {isCustomIcon ? (
                    <Image
                        src={link.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                    />
                ) : IconComponent ? (
                    <IconComponent className="w-5 h-5" />
                ) : null}
                <span className="font-medium">{link.title}</span>
            </div>
        </a>
    );
}
