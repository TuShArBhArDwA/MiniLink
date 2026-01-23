'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    Link2,
    LayoutDashboard,
    LinkIcon,
    Palette,
    BarChart3,
    Settings,
    LogOut,
    ExternalLink,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface DashboardNavProps {
    user: {
        name?: string | null;
        email?: string | null;
        username?: string | null;
        image?: string | null;
    };
}

export default function DashboardNav({ user }: DashboardNavProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/dashboard/links', icon: LinkIcon, label: 'Links' },
        { href: '/dashboard/appearance', icon: Palette, label: 'Appearance' },
        { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
        { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    const profileUrl = user.username ? `/${user.username}` : null;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="h-full px-4 flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <Link2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xl hidden sm:block">MiniLink</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* View Profile Button */}
                        {profileUrl && (
                            <Link
                                href={profileUrl}
                                target="_blank"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                            >
                                View Profile
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        )}

                        {/* User menu */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name || user.email}
                                </p>
                                {user.username && (
                                    <p className="text-xs text-gray-500">@{user.username}</p>
                                )}
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center overflow-hidden">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        width={36}
                                        height={36}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-medium text-sm">
                                        {(user.name || user.email || 'U')[0].toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hidden sm:flex p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Sign out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 animate-slide-down">
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                : 'text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            {profileUrl && (
                                <Link
                                    href={profileUrl}
                                    target="_blank"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-primary-600 dark:text-primary-400"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    View Profile
                                </Link>
                            )}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-600"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
