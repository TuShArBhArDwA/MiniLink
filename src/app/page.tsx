'use client';

import { useState, useEffect } from 'react';
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

export default function HomePage() {
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
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Get Started
                            </Link>
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
                                href="/register"
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

                    {/* Phone Mockup */}
                    <div className="mt-20 max-w-sm mx-auto perspective-1000">
                        <div className="relative transform hover:rotate-y-2 transition-transform duration-700">
                            {/* Phone Frame */}
                            <div className="relative rounded-[3rem] p-3 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl shadow-black/40">
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div>
                                <div className="rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-1">
                                    <div className="rounded-[2.2rem] bg-white dark:bg-gray-900 p-6 min-h-[500px]">
                                        {/* Profile Content */}
                                        <div className="flex flex-col items-center text-center pt-4">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 mb-4 ring-4 ring-white dark:ring-gray-800 shadow-lg"></div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">@yourname</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Creator & Developer</p>

                                            <div className="w-full mt-6 space-y-3">
                                                {['Portfolio Website', 'YouTube Channel', 'Twitter / X', 'Buy Me Coffee'].map((link, i) => (
                                                    <div
                                                        key={link}
                                                        className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-[1.02] cursor-pointer border border-gray-100 dark:border-gray-700"
                                                    >
                                                        {link}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            Powerful Features, Zero Complexity
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            Everything you need to share your world with one simple link.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((feature, i) => (
                            <div
                                key={feature.title}
                                onMouseEnter={() => setHoveredFeature(i)}
                                onMouseLeave={() => setHoveredFeature(null)}
                                className={`
                  group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden
                  ${hoveredFeature === i
                                        ? 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 shadow-xl scale-[1.02]'
                                        : 'bg-gray-50/50 dark:bg-white/[0.02] border-gray-100 dark:border-white/5'
                                    }
                `}
                            >
                                {/* Hover Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="relative">
                                    <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500
                    ${hoveredFeature === i
                                            ? `bg-gradient-to-br ${feature.color}`
                                            : feature.bgColor
                                        }
                  `}>
                                        <feature.icon className={`w-6 h-6 transition-colors duration-500 ${hoveredFeature === i ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{feature.title}</h3>

                                    <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredFeature === i ? 'max-h-24 opacity-100' : 'max-h-6 opacity-70'}`}>
                                        <p className={`text-sm transition-all duration-300 ${hoveredFeature === i ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                                            {hoveredFeature === i ? feature.description : feature.shortDesc}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className={`absolute bottom-4 right-4 transition-all duration-300 ${hoveredFeature === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-3xl p-12 sm:p-16 overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

                        <div className="relative text-center">
                            <Smartphone className="w-12 h-12 mb-6 mx-auto text-white/80" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                                Ready to Share Your World?
                            </h2>
                            <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
                                Join thousands of creators who use MiniLink to connect with their audience.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-violet-600 bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="relative w-8 h-8">
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500"></div>
                                <div className="absolute inset-[2px] rounded-[6px] bg-white dark:bg-[#0a0a0f] flex items-center justify-center">
                                    <span className="text-sm font-black bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent">M</span>
                                </div>
                            </div>
                            <span className="font-semibold">MiniLink</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Made With 💙 By{' '}
                            <a
                                href="https://www.linkedin.com/in/bhardwajtushar2004/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                            >
                                Tushar Bhardwaj
                            </a>
                        </p>

                        <div className="flex items-center gap-6 text-sm">
                            <Link href="https://github.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                                GitHub
                            </Link>
                            <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
