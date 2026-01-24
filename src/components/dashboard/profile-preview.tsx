'use client';

import { Link2 } from 'lucide-react';
import Image from 'next/image';
import PromoFooter from '@/components/public-profile/promo-footer';
import LinkButton from '@/components/link-button';

// Icon map for preview (simplified version of the main one)
import {
    Instagram, Youtube, Twitter, Github, Linkedin, Facebook,
    Globe, Mail, MessageCircle, Send, Music2, Twitch,
    Coffee, ShoppingBag
} from 'lucide-react';

const iconMap: Record<string, any> = {
    website: Globe, instagram: Instagram, youtube: Youtube, twitter: Twitter,
    github: Github, linkedin: Linkedin, facebook: Facebook, email: Mail,
    whatsapp: MessageCircle, telegram: Send, spotify: Music2, twitch: Twitch,
    kofi: Coffee, shop: ShoppingBag, link: Link2,
};

interface ProfilePreviewProps {
    data: {
        name: string;
        username: string;
        bio: string;
        avatar: string;
        theme: string;
        links: any[];
    };
}

export default function ProfilePreview({ data }: ProfilePreviewProps) {
    const themeClass = `theme-${data.theme || 'default'}`;

    return (
        <div className="border-[12px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl max-w-[320px] mx-auto bg-gray-900 aspect-[9/19] relative">
            {/* Phone Notion */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20"></div>

            {/* Screen Content */}
            <div className={`w-full h-full overflow-y-auto hide-scrollbar ${themeClass}`} style={{ background: 'var(--theme-bg)' }}>
                <div className="px-4 py-12 flex flex-col min-h-full">

                    {/* Header */}
                    <div
                        className="text-center mb-6 p-4 rounded-3xl backdrop-blur-lg"
                        style={{
                            background: 'var(--theme-card)',
                            color: 'var(--theme-text)'
                        }}
                    >
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-white/30">
                            {data.avatar ? (
                                <Image
                                    src={data.avatar}
                                    alt="Avatar"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {(data.name || data.username || 'U')[0]?.toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <h2 className="text-lg font-bold mb-1 line-clamp-1">
                            {data.name || `@${data.username || 'username'}`}
                        </h2>
                        {data.bio && (
                            <p className="text-xs opacity-80 line-clamp-3">
                                {data.bio}
                            </p>
                        )}
                    </div>

                    {/* Links */}
                    <div className="space-y-3 flex-1">
                        {data.links?.map((link) => {
                            const IconComponent = link.icon ? iconMap[link.icon] : Link2;
                            const isCustomIcon = link.icon?.startsWith('http');

                            return (
                                <LinkButton
                                    key={link.id}
                                    link={{
                                        id: link.id,
                                        url: link.url,
                                        title: link.title
                                    }}
                                    icon={
                                        isCustomIcon && link.icon ? (
                                            <Image
                                                src={link.icon}
                                                alt=""
                                                width={20}
                                                height={20}
                                                className="w-5 h-5 object-contain"
                                            />
                                        ) : (
                                            <IconComponent className="w-5 h-5" />
                                        )
                                    }
                                />
                            );
                        })}

                        {(!data.links || data.links.length === 0) && (
                            <div className="text-center p-4 opacity-50 text-sm" style={{ color: 'var(--theme-text)' }}>
                                No links added yet
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <div className="scale-90 origin-bottom">
                            <PromoFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
