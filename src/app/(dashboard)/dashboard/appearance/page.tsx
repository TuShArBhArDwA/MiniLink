'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, Check, Upload } from 'lucide-react';
import Image from 'next/image';

const THEMES = [
    { id: 'default', name: 'Clean', preview: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { id: 'dark', name: 'Dark', preview: 'bg-gradient-to-br from-gray-900 to-gray-800' },
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 'glass', name: 'Glass', preview: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { id: 'neon', name: 'Neon', preview: 'bg-gradient-to-br from-indigo-900 to-purple-900' },
    { id: 'minimal', name: 'Minimal', preview: 'bg-white border-2 border-gray-900' },
];

export default function AppearancePage() {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        avatar: '',
        theme: 'default',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/user/profile');
            const data = await res.json();
            setProfile({
                name: data.name || '',
                bio: data.bio || '',
                avatar: data.avatar || '',
                theme: data.theme || 'default',
            });
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                // Update session
                await update({ name: profile.name });
            }
        } catch (error) {
            console.error('Failed to save profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Appearance
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Customize how your profile looks
                </p>
            </div>

            {/* Profile Section */}
            <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Profile</h2>

                <div className="flex items-start gap-6 mb-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-accent-400">
                            {profile.avatar ? (
                                <Image
                                    src={profile.avatar}
                                    alt="Avatar"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                                    {(profile.name || session?.user?.email || 'U')[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Avatar URL</label>
                        <input
                            type="url"
                            className="input-field"
                            placeholder="https://res.cloudinary.com/..."
                            value={profile.avatar}
                            onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload your image to Cloudinary and paste the URL
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Display Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Your Name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                            className="input-field min-h-[100px] resize-none"
                            placeholder="Tell the world about yourself..."
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            maxLength={200}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {profile.bio.length}/200 characters
                        </p>
                    </div>
                </div>
            </div>

            {/* Theme Section */}
            <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Theme</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setProfile({ ...profile, theme: theme.id })}
                            className={`
                relative p-4 rounded-xl border-2 transition-all
                ${profile.theme === theme.id
                                    ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            <div className={`w-full h-20 rounded-lg mb-3 ${theme.preview}`}></div>
                            <p className="text-sm font-medium">{theme.name}</p>
                            {profile.theme === theme.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
                made with 💙 by tushar bhardwaj
            </div>
        </div>
    );
}
