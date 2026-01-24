'use client';

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowRight,
    Link2,
    BarChart3,
    Palette,
    Zap,
    Github,
    Sparkles,
    Moon,
    Sun,
    Shield,
    Globe,
    Smartphone,
    ChevronRight
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
    const { isSignedIn } = useUser();
    const [isDark, setIsDark] = useState(false);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    useEffect(() => {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const features = [
        {
            icon: Link2,
            title: 'Unlimited Links',
            shortDesc: 'No restrictions',
            description: 'Add as many links as you want. Organize, reorder, and customize each one with icons and descriptions.',
            color: 'from-violet-500 to-purple-600',
            bgColor: 'bg-violet-500/10',
        },
        {
            icon: BarChart3,
            title: 'Real-Time Analytics',
            shortDesc: 'Track everything',
            description: 'Monitor clicks, views, and engagement with beautiful charts. Know exactly what resonates with your audience.',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            icon: Palette,
            title: 'Custom Themes',
            shortDesc: '6+ themes',
            description: 'Express yourself with stunning themes. From minimal to neon cyberpunk, find your perfect aesthetic.',
            color: 'from-pink-500 to-rose-500',
            bgColor: 'bg-pink-500/10',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            shortDesc: 'Edge-optimized',
            description: 'Built on cutting-edge technology. Your page loads instantly from anywhere in the world.',
            color: 'from-amber-500 to-orange-500',
            bgColor: 'bg-amber-500/10',
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            shortDesc: 'Your data, protected',
            description: 'Enterprise-grade security with OAuth authentication. We never sell your data or show ads.',
            color: 'from-emerald-500 to-teal-500',
            bgColor: 'bg-emerald-500/10',
        },
        {
            icon: Globe,
            title: 'Open Source',
            shortDesc: 'Community-driven',
            description: 'Fully open source. Contribute, customize, or self-host. Built by the community, for the community.',
            color: 'from-indigo-500 to-blue-600',
            bgColor: 'bg-indigo-500/10',
        },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-[#0a0a0f]' : 'bg-[#fafafa]'}`}>
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-0 -left-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? 'bg-violet-600/20' : 'bg-violet-400/30'}`}></div>
                <div className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/20'}`}></div>
                <div className={`absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? 'bg-pink-600/10' : 'bg-pink-400/20'}`}></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0f]/70 border-b border-gray-200/50 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-9 h-9">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300"></div>
                                <div className="absolute inset-[2px] rounded-[10px] bg-white dark:bg-[#0a0a0f] flex items-center justify-center">
                                    <span className="text-lg font-black bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent">M</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                Mini<span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Link</span>
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                            </button>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </Link>
                            {isSignedIn ? (
                                <Link
                                    href="/dashboard"
                                    className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/sign-in"
                                        className="px-4 py-2 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8 border border-violet-500/20">
                            <Sparkles className="w-4 h-4" />
                            <span>100% Free • Open Source • No Ads</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            <span className="text-gray-900 dark:text-white">One Link For</span>
                            <br />
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Everything You Create
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Create your personalized link hub in seconds. Share your content,
                            track your impact, and grow your audience — completely free.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/sign-up"
                                className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                Create Your MiniLink
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                            >
                                See Features
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Device Mockups */}
                    <div className="mt-20 relative">
                        {/* Desktop/Laptop View - Hidden on mobile */}
                        <div className="hidden lg:block">
                            <div className="flex items-center justify-center gap-8">
                                {/* Laptop Mockup */}
                                <div className="relative">
                                    {/* Laptop Screen */}
                                    <div className="relative w-[600px] h-[380px] bg-gray-900 rounded-t-xl p-2 shadow-2xl mx-auto">
                                        {/* Camera */}
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
                                        {/* Screen Content */}
                                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                                            {/* Browser Chrome */}
                                            <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-3 gap-2 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                </div>
                                                <div className="flex-1 mx-2">
                                                    <div className="bg-white dark:bg-gray-700 rounded-md h-5 flex items-center px-2">
                                                        <span className="text-[10px] text-gray-400">minilink.app/yourprofile</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Dashboard Preview */}
                                            <div className="p-4">
                                                <div className="flex gap-4">
                                                    {/* Sidebar */}
                                                    <div className="w-48 space-y-2">
                                                        <div className="h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center px-3">
                                                            <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">Dashboard</span>
                                                        </div>
                                                        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                                        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                                        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                                    </div>
                                                    {/* Content */}
                                                    <div className="flex-1 space-y-3">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div className="h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                                                                <div className="text-[8px] text-white/80">Views</div>
                                                                <div className="text-sm font-bold text-white">1,234</div>
                                                            </div>
                                                            <div className="h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-2">
                                                                <div className="text-[8px] text-white/80">Clicks</div>
                                                                <div className="text-sm font-bold text-white">892</div>
                                                            </div>
                                                            <div className="h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg p-2">
                                                                <div className="text-[8px] text-white/80">Links</div>
                                                                <div className="text-sm font-bold text-white">12</div>
                                                            </div>
                                                        </div>
                                                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                                                            <div className="text-[10px] font-medium text-gray-500 mb-2">Analytics</div>
                                                            <div className="flex items-end gap-1 h-20">
                                                                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                                                    <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-pink-500 rounded-t" style={{ height: `${h}%` }}></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Laptop Base */}
                                    <div className="relative w-[680px] h-4 bg-gray-300 dark:bg-gray-700 rounded-b-xl -mt-1 mx-auto">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-400 dark:bg-gray-600 rounded-b"></div>
                                    </div>
                                    <div className="w-[700px] h-2 bg-gray-200 dark:bg-gray-800 rounded-b-3xl mx-auto shadow-lg"></div>
                                </div>

                                {/* iPhone Mockup - More spacing */}
                                <div className="relative ml-8 mt-16">
                                    {/* iPhone Frame */}
                                    <div className="relative w-[280px] h-[570px] bg-gray-900 rounded-[50px] p-3 shadow-2xl border-4 border-gray-800">
                                        {/* Dynamic Island */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10"></div>
                                        {/* Screen */}
                                        <div className="w-full h-full rounded-[38px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 overflow-hidden">
                                            {/* Profile Content */}
                                            <div className="w-full h-full bg-white dark:bg-gray-900 mt-1 rounded-t-[38px] p-6 pt-12">
                                                <div className="flex flex-col items-center text-center">
                                                    {/* Avatar with pulse animation */}
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 via-purple-400 to-pink-400 mb-3 ring-4 ring-white dark:ring-gray-800 shadow-xl flex items-center justify-center overflow-hidden animate-pulse">
                                                        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-pink-500"></div>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">@creator</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Full Stack Developer</p>

                                                    {/* Interactive Links with animations */}
                                                    <div className="w-full mt-5 space-y-2.5">
                                                        {/* Portfolio */}
                                                        <a
                                                            href="https://linktr.ee/codewithtusharbhardwaj"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.1s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">Portfolio</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* YouTube */}
                                                        <a
                                                            href="https://youtube.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.2s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">YouTube</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* Twitter/X */}
                                                        <a
                                                            href="https://x.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.3s' }}
                                                        >
                                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">Twitter / X</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* GitHub */}
                                                        <a
                                                            href="https://github.com/TuShArBhArDwA"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.4s' }}
                                                        >
                                                            <svg className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* Buy Me Coffee */}
                                                        <a
                                                            href="https://buymeacoffee.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:border-amber-300 dark:hover:border-amber-600 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.5s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-amber-500 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">Buy Me Coffee</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Home Indicator */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile View - Only Phone */}
                        <div className="lg:hidden flex justify-center">
                            {/* iPhone Mockup */}
                            <div className="relative">
                                <div className="relative w-[300px] h-[610px] bg-gray-900 rounded-[55px] p-3 shadow-2xl border-4 border-gray-800">
                                    {/* Dynamic Island */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10"></div>
                                    {/* Screen */}
                                    <div className="w-full h-full rounded-[42px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 overflow-hidden">
                                        <div className="w-full h-full bg-white dark:bg-gray-900 mt-1 rounded-t-[42px] p-6 pt-14">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 via-purple-400 to-pink-400 mb-3 ring-4 ring-white dark:ring-gray-800 shadow-xl"></div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">@creator</h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Full Stack Developer</p>

                                                <div className="w-full mt-5 space-y-2.5">
                                                    <a href="https://linktr.ee/codewithtusharbhardwaj" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:scale-[1.02] transition-all group">
                                                        <svg className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                        <span>Portfolio</span>
                                                    </a>
                                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-[1.02] transition-all group">
                                                        <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                        <span>YouTube</span>
                                                    </a>
                                                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all group">
                                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                                        <span>Twitter / X</span>
                                                    </a>
                                                    <a href="https://github.com/TuShArBhArDwA" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all group">
                                                        <svg className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                                        <span>GitHub</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Home Indicator */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4 border border-violet-500/20">
                            <Zap className="w-4 h-4" />
                            <span>Features</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Everything You Need
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            Build your perfect link hub with powerful features designed for creators
                        </p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Large Feature Card */}
                        <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Real-Time Analytics</h3>
                                <p className="text-white/80 text-lg max-w-md">
                                    Track every click and view with beautiful charts. Understand your audience and optimize your reach.
                                </p>
                                <div className="mt-6 flex gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">10K+</div>
                                        <div className="text-white/60 text-sm">Daily Clicks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">99.9%</div>
                                        <div className="text-white/60 text-sm">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">50ms</div>
                                        <div className="text-white/60 text-sm">Response</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Card 1 */}
                        <div className="group relative p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Link2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Unlimited Links</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Add as many links as you want. Drag and drop to reorder.
                                </p>
                            </div>
                        </div>

                        {/* Small Card 2 */}
                        <div className="group relative p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Palette className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">6+ Themes</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    From minimal to neon cyberpunk. Express your unique style.
                                </p>
                            </div>
                        </div>

                        {/* Small Card 3 */}
                        <div className="group relative p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Edge-optimized. Loads instantly from anywhere in the world.
                                </p>
                            </div>
                        </div>

                        {/* Wide Card */}
                        <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.15),transparent_50%)]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.15),transparent_50%)]"></div>
                            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Secure, Private & Open Source</h3>
                                    <p className="text-gray-400">
                                        Your data is protected with enterprise-grade security. Fully open source — contribute, customize, or self-host.
                                    </p>
                                </div>
                                <Link href="https://github.com/TuShArBhArDwA/MiniLink" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                                    <Github className="w-5 h-5" />
                                    <span>View on GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0">
                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-10 left-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rotate-12 animate-float">
                                <Link2 className="w-8 h-8 text-white/80" />
                            </div>
                            <div className="absolute top-20 right-16 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center -rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>
                                <BarChart3 className="w-6 h-6 text-white/80" />
                            </div>
                            <div className="absolute bottom-16 left-20 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rotate-6 animate-float" style={{ animationDelay: '1s' }}>
                                <Palette className="w-7 h-7 text-white/80" />
                            </div>
                            <div className="absolute bottom-10 right-10 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center -rotate-6 animate-float" style={{ animationDelay: '1.5s' }}>
                                <Zap className="w-5 h-5 text-white/80" />
                            </div>
                        </div>

                        <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20">
                                <Sparkles className="w-4 h-4" />
                                <span>Join 10,000+ Creators</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                                Ready to Share
                                <br />
                                <span className="text-white/90">Your World?</span>
                            </h2>

                            <p className="text-white/80 mb-10 text-lg sm:text-xl max-w-2xl mx-auto">
                                Create your personalized MiniLink in under 60 seconds. No credit card required.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/sign-up"
                                    className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-violet-600 bg-white rounded-2xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="https://github.com/TuShArBhArDwA/MiniLink"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-4 text-white/90 hover:text-white transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>Star on GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
