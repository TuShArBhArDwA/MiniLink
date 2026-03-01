'use client';

import { useState } from 'react';
import {
    Globe,
    Mail,
    ShoppingBag,
    Link2,
    Upload,
    X
} from 'lucide-react';

import { CldUploadButton } from 'next-cloudinary';
import {
    XIcon,
    InstagramIcon,
    YoutubeIcon,
    LinkedinIcon,
    GithubIcon,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
    SpotifyIcon,
    TwitchIcon,
    KofiIcon,
    MediumIcon,
    TopmateIcon
} from '@/components/icons';

const PRESET_ICONS = [
    { name: 'website', icon: Globe, label: 'Website' },
    { name: 'instagram', icon: InstagramIcon, label: 'Instagram' },
    { name: 'youtube', icon: YoutubeIcon, label: 'YouTube' },
    { name: 'twitter', icon: XIcon, label: 'Twitter / X' },
    { name: 'github', icon: GithubIcon, label: 'GitHub' },
    { name: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn' },
    { name: 'facebook', icon: FacebookIcon, label: 'Facebook' },
    { name: 'medium', icon: MediumIcon, label: 'Medium' },
    { name: 'topmate', icon: TopmateIcon, label: 'Topmate' },
    { name: 'whatsapp', icon: WhatsappIcon, label: 'WhatsApp' },
    { name: 'telegram', icon: TelegramIcon, label: 'Telegram' },
    { name: 'spotify', icon: SpotifyIcon, label: 'Spotify' },
    { name: 'twitch', icon: TwitchIcon, label: 'Twitch' },
    { name: 'kofi', icon: KofiIcon, label: 'Ko-fi' },
    { name: 'email', icon: Mail, label: 'Email' },
    { name: 'shop', icon: ShoppingBag, label: 'Shop' },
    { name: 'link', icon: Link2, label: 'Custom Link' },
];

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    const isCustom = value && value.startsWith('http');

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                    Preset Icons
                </label>
                <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                    {PRESET_ICONS.map(({ name, icon: Icon, label }) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => onChange(name)}
                            className={`
                                flex items-center justify-center w-10 h-10 rounded-lg border transition-all
                                ${value === name
                                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-2 ring-violet-500/20'
                                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0f] text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-500/30'
                                }
                            `}
                            title={label}
                        >
                            <Icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                    Custom Icon
                </label>
                <div className="flex items-center gap-3">
                    {isCustom ? (
                        <div className="relative w-12 h-12 rounded-xl border border-violet-500/50 bg-violet-50 dark:bg-violet-500/10 p-1.5 ring-2 ring-violet-500/10 overflow-hidden group">
                            <img src={value} alt="Custom icon" className="w-full h-full object-contain" />
                            <button
                                onClick={() => onChange('')}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                title="Remove item"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400">
                            <Upload className="w-5 h-5" />
                        </div>
                    )}

                    <div className="flex-1">
                        <CldUploadButton
                            uploadPreset="minilink_preset"
                            onUpload={(result: any) => {
                                if (result.info?.secure_url) {
                                    onChange(result.info.secure_url);
                                }
                            }}
                            className="w-full h-12 flex items-center justify-center gap-2 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0f] hover:bg-gray-50 dark:hover:bg-white/[0.05] text-gray-900 dark:text-white font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <Upload className="w-4 h-4" />
                            <span>Upload Custom Icon</span>
                        </CldUploadButton>
                        <p className="text-[10px] text-gray-500 mt-1.5 ml-1">
                            Recommended: 64x64 PNG or SVG
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function getIconComponent(iconName: string | null) {
    if (!iconName) return Link2;

    const preset = PRESET_ICONS.find(i => i.name === iconName);
    if (preset) return preset.icon;

    // If it's a URL, return Link2 (will use img tag)
    if (iconName.startsWith('http')) return Link2;

    return Link2;
}
