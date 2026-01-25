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
    ChevronRight,
    ChevronDown
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { Plus, Check, ExternalLink, Copy, MousePointer2 } from 'lucide-react';

// Animated Laptop Demo Component
function LaptopDemo({ isDark }: { isDark: boolean }) {
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 300, y: 150 });
    const [hoveredLink, setHoveredLink] = useState(-1);
    const [isClicking, setIsClicking] = useState(false);

    const steps = [
        { title: 'Create your profile', subtitle: 'Choose your username' },
        { title: 'Add your first link', subtitle: 'Connect your socials' },
        { title: 'Your links are ready', subtitle: 'All connected!' },
        { title: 'Share your MiniLink!', subtitle: 'Copy & share' },
    ];

    const username = 'tushar';

    // SVG icons for each link
    const linkIcons = {
        portfolio: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
        linkedin: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
        twitter: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
        github: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
    };

    const links = [
        { name: 'Portfolio', icon: linkIcons.portfolio, color: 'from-blue-500 to-cyan-500' },
        { name: 'LinkedIn', icon: linkIcons.linkedin, color: 'from-blue-600 to-blue-700' },
        { name: 'Twitter/X', icon: linkIcons.twitter, color: 'from-gray-700 to-gray-900' },
        { name: 'GitHub', icon: linkIcons.github, color: 'from-purple-600 to-purple-800' },
    ];

    // Step 0: Typing animation with cursor following
    useEffect(() => {
        if (step === 0) {
            setTypedText('');
            setHoveredLink(-1);
            setIsClicking(false);
            setCursorPos({ x: 320, y: 155 });
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < username.length) {
                    setTypedText(username.slice(0, i + 1));
                    setCursorPos({ x: 320 + (i * 8), y: 155 });
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 200);
            return () => clearInterval(typingInterval);
        }
    }, [step]);

    // Step 1: Cursor moves to Add Link button
    useEffect(() => {
        if (step === 1) {
            setHoveredLink(-1);
            setIsClicking(false);
            const timer = setTimeout(() => {
                setCursorPos({ x: 310, y: 225 });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Step 2: Cursor hovers over each link sequentially
    useEffect(() => {
        if (step === 2) {
            setIsClicking(false);
            let currentLink = 0;
            // Adjusted positions to align with the link cards (centered on each link row)
            const linkPositions = [
                { x: 420, y: 175 },
                { x: 420, y: 210 },
                { x: 420, y: 245 },
                { x: 420, y: 280 },
            ];

            setHoveredLink(0);
            setCursorPos(linkPositions[0]);

            const hoverInterval = setInterval(() => {
                currentLink = (currentLink + 1) % 4;
                setHoveredLink(currentLink);
                setCursorPos(linkPositions[currentLink]);
            }, 600);

            return () => clearInterval(hoverInterval);
        }
    }, [step]);

    // Step 3: Show congratulations
    useEffect(() => {
        if (step === 3) {
            setHoveredLink(-1);
            setIsClicking(false);
            // Center cursor near the celebration area
            setCursorPos({ x: 300, y: 200 });
        }
    }, [step]);

    useEffect(() => {
        // Cursor blink for typing
        const cursorInterval = setInterval(() => setShowCursor(s => !s), 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        // Auto-cycle through steps
        const stepInterval = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 3500);
        return () => clearInterval(stepInterval);
    }, []);

    return (
        <div className="relative">
            {/* Step indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-violet-500' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`}
                    />
                ))}
            </div>

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
                                <span className="text-[10px] text-gray-400">minianonlink.vercel.app/dashboard</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 h-[calc(100%-2rem)]">
                        {/* Step Title */}
                        <div className="text-center mb-4">
                            <div className="text-xs text-violet-600 dark:text-violet-400 font-medium mb-1">Step {step + 1} of 4</div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{steps[step].title}</h3>
                            <p className="text-xs text-gray-500">{steps[step].subtitle}</p>
                        </div>

                        {/* Step 0: Username Input */}
                        {step === 0 && (
                            <div className="flex flex-col items-center animate-fadeIn">
                                <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-xl px-4 py-3 shadow-lg border-2 border-violet-500 w-80">
                                    <span className="text-gray-400 text-xs">minianonlink.vercel.app/</span>
                                    <span className="text-gray-900 dark:text-white font-medium text-sm">{typedText}</span>
                                    <span className={`w-0.5 h-4 bg-violet-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-green-500 text-xs">
                                    <Check className="w-3 h-3" />
                                    <span>Username available!</span>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Add first link */}
                        {step === 1 && (
                            <div className="flex flex-col items-center gap-3 animate-fadeIn">
                                <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-600 w-72">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                                            {links[0].icon}
                                        </div>
                                        <input className="flex-1 bg-gray-50 dark:bg-gray-600 rounded-lg px-2 py-1 text-sm text-gray-700 dark:text-gray-200" defaultValue="Portfolio" readOnly />
                                    </div>
                                    <input className="w-full bg-gray-50 dark:bg-gray-600 rounded-lg px-2 py-1 text-xs text-gray-500" defaultValue="https://tushar-bhardwaj.vercel.app" readOnly />
                                </div>
                                <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                                    <Plus className="w-4 h-4" />
                                    Add Link
                                </button>
                            </div>
                        )}

                        {/* Step 2: Multiple links with hover effect */}
                        {step === 2 && (
                            <div className="space-y-2 animate-fadeIn">
                                {links.map((link, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm border transition-all duration-200 ${hoveredLink === i ? 'border-violet-500 scale-[1.02] shadow-lg' : 'border-gray-200 dark:border-gray-600'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center text-white text-sm`}>
                                            {link.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{link.name}</span>
                                        <Check className={`w-4 h-4 ml-auto transition-colors ${hoveredLink === i ? 'text-violet-500' : 'text-green-500'}`} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Congratulations */}
                        {step === 3 && (
                            <div className="flex flex-col items-center gap-4 animate-fadeIn">
                                {/* Celebration emoji burst */}
                                <div className="text-4xl animate-bounce">🎉</div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                                    Congratulations!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                                    Your MiniLink is ready to share
                                </p>
                                <div className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg px-4 py-2 shadow-lg">
                                    <span className="text-sm font-medium">minianonlink.vercel.app/tushar</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {links.map((link, i) => (
                                        <div key={i} className={`w-10 h-10 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center text-white shadow-lg animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }}>
                                            {link.icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animated Cursor */}
            <div
                className={`absolute pointer-events-none z-20 transition-all duration-300 ease-out ${isClicking ? 'scale-90' : ''}`}
                style={{ left: cursorPos.x, top: cursorPos.y }}
            >
                <MousePointer2 className="w-5 h-5 text-gray-800 dark:text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </div>

            {/* Laptop Base */}
            <div className="relative w-[680px] h-4 bg-gray-300 dark:bg-gray-700 rounded-b-xl -mt-1 mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-400 dark:bg-gray-600 rounded-b"></div>
            </div>
            <div className="w-[700px] h-2 bg-gray-200 dark:bg-gray-800 rounded-b-3xl mx-auto shadow-lg"></div>
        </div>
    );
}

// Collapsing Logos Animation Component - shows social icons collapsing into one link
function CollapsingLogosAnimation() {
    const [phase, setPhase] = useState(0); // 0: scattered, 1: collapsing, 2: merged

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase(p => (p + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const socialIcons = [
        { icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, color: 'from-blue-600 to-blue-700', name: 'LinkedIn', pos: { x: -120, y: -80 } },
        { icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>, color: 'from-gray-700 to-gray-900', name: 'GitHub', pos: { x: 120, y: -80 } },
        { icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, color: 'from-gray-800 to-black', name: 'X', pos: { x: -100, y: 80 } },
        { icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>, color: 'from-pink-500 to-purple-500', name: 'Instagram', pos: { x: 100, y: 80 } },
        { icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>, color: 'from-red-500 to-red-600', name: 'YouTube', pos: { x: 0, y: -100 } },
        { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>, color: 'from-blue-400 to-cyan-400', name: 'Portfolio', pos: { x: 0, y: 100 } },
    ];

    return (
        <div className="relative w-[400px] h-[300px] mx-auto">
            {/* Scattered/Collapsing icons */}
            {socialIcons.map((social, i) => (
                <div
                    key={i}
                    className={`absolute left-1/2 top-1/2 transition-all duration-1000 ease-in-out ${phase === 2 ? 'opacity-0 scale-0' : 'opacity-100'}`}
                    style={{
                        transform: phase === 0
                            ? `translate(calc(-50% + ${social.pos.x}px), calc(-50% + ${social.pos.y}px)) rotate(${i * 15}deg)`
                            : 'translate(-50%, -50%) rotate(0deg) scale(0.5)',
                        transitionDelay: phase === 1 ? `${i * 100}ms` : '0ms',
                    }}
                >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg`}>
                        {social.icon}
                    </div>
                </div>
            ))}

            {/* Center MiniLink logo that appears */}
            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${phase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                        <span className="text-3xl font-black text-white">M</span>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                            Mini<span className="text-violet-500">Link</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">All your links in one place</div>
                    </div>
                </div>
            </div>

            {/* Decorative connecting lines during collapse */}
            {phase === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-violet-300 dark:border-violet-700 animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
            )}
        </div>
    );
}

// Typewriter Effect Component
function TypewriterEffect({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink(!blink);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    // Typing effect
    useEffect(() => {
        if (index >= words.length) {
            setIndex(0);
            return;
        }

        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
            {`${words[index].substring(0, subIndex)}`}
            <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1 text-violet-600`}>|</span>
        </span>
    );
}

// FAQ Accordion Item Component
function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div
            className={`bg-gray-100 dark:bg-gray-800/50 rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-violet-500/50 shadow-lg shadow-violet-500/10' : 'border-gray-200 dark:border-gray-700/50 hover:border-violet-400/30'}`}
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-violet-600 dark:text-violet-400' : 'text-gray-900 dark:text-white'}`}>{question}</span>
                <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 ${isOpen ? 'rotate-180 text-violet-600 dark:text-violet-400' : 'text-gray-400 dark:text-gray-500'}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const { isSignedIn, isLoaded } = useUser();
    const [isDark, setIsDark] = useState(false);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
                                {mounted ? (
                                    isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />
                                ) : (
                                    <Moon className="w-5 h-5 text-slate-600" />
                                )}
                            </button>
                            {!isLoaded ? (
                                <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                            ) : isSignedIn ? (
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
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="text-center lg:text-left">
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

                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                                Create your personalized link hub in seconds. Share your content,
                                track your impact, and grow your audience — completely free.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

                        {/* Collapsing Logos Animation - Right Column */}
                        <div className="hidden lg:flex justify-center flex-col items-center">
                            <div className="relative scale-110">
                                <div className="text-center mb-6">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">All your platforms</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">→ One Link</p>
                                </div>
                                <CollapsingLogosAnimation />
                                <div className="mt-8 text-center h-12">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trusted by</p>
                                    <div className="text-2xl font-bold">
                                        <TypewriterEffect words={[
                                            "creators", "influencers", "small businesses", "athletes", "models", "monetizers",
                                            "health educators", "streamers", "vloggers", "fitness coaches", "ecommerce sellers",
                                            "retailers", "products", "wellness leaders", "musicians", "bands", "podcasters",
                                            "fashion designers", "culture creators", "merch sellers", "writers", "DJs"
                                        ]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Live Demo Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                            See It In Action
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Watch how easily you can build and customize your page in real-time.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Desktop View */}
                        <div className="hidden lg:block">
                            <div className="flex items-center justify-center gap-12">
                                {/* Laptop Mockup */}
                                <div>
                                    <LaptopDemo isDark={isDark} />
                                </div>

                                {/* iPhone Mockup */}
                                <div className="relative mt-8">
                                    {/* Live Preview Label */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full shadow-lg">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-white whitespace-nowrap">Live Preview</span>
                                    </div>
                                    {/* iPhone Frame */}
                                    <div className="relative w-[280px] h-[570px] bg-gray-900 rounded-[50px] p-3 shadow-2xl border-4 border-gray-800">
                                        {/* Dynamic Island */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10"></div>
                                        {/* Screen */}
                                        <div className="w-full h-full rounded-[38px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 overflow-hidden">
                                            {/* Profile Content */}
                                            <div className="w-full h-full bg-white dark:bg-gray-900 mt-1 rounded-t-[38px] p-6 pt-12">
                                                <div className="flex flex-col items-center text-center">
                                                    {/* Avatar with actual photo */}
                                                    <div className="w-20 h-20 rounded-full mb-3 ring-4 ring-white dark:ring-gray-800 shadow-xl overflow-hidden">
                                                        <img src="/me.jpeg" alt="Tushar Bhardwaj" className="w-full h-full object-cover" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tushar Bhardwaj</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 text-[10px] mt-0.5 px-2 leading-relaxed">Ex - SWE Intern Microsoft | Top 0.1% Club Topmate | Sharing Tech & Career Insights with 23K+ Linkedin</p>

                                                    {/* Interactive Links with animations */}
                                                    <div className="w-full mt-5 space-y-2.5">
                                                        {/* Portfolio */}
                                                        <a
                                                            href="https://tushar-bhardwaj.vercel.app/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.1s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">Portfolio</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* LinkedIn */}
                                                        <a
                                                            href="https://www.linkedin.com/in/bhardwajtushar2004/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.2s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                        {/* Twitter/X */}
                                                        <a
                                                            href="https://x.com/Tusharab2004"
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
                                                        {/* Sponsor */}
                                                        <a
                                                            href="https://github.com/sponsors/TuShArBhArDwA"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:border-pink-300 dark:hover:border-pink-600 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                            style={{ animationDelay: '0.5s' }}
                                                        >
                                                            <svg className="w-5 h-5 text-pink-500 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                                            <span className="group-hover:translate-x-1 transition-transform">Sponsor Me</span>
                                                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Large Feature Card */}
                        <div className="lg:col-span-2 group relative p-8 rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-400/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                                    <BarChart3 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Real-Time Analytics</h3>
                                <p className="text-violet-100 text-lg max-w-lg mb-8 leading-relaxed">
                                    Track every click and view with beautiful interactive charts. Understand your audience and optimize your reach with data-driven insights.
                                </p>
                                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                                    <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-300 delay-0">
                                        <div className="text-3xl font-bold text-white mb-1">10K+</div>
                                        <div className="text-violet-200 text-sm font-medium">Daily Clicks</div>
                                    </div>
                                    <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-300 delay-75">
                                        <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                                        <div className="text-violet-200 text-sm font-medium">Uptime</div>
                                    </div>
                                    <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-300 delay-150">
                                        <div className="text-3xl font-bold text-white mb-1">50ms</div>
                                        <div className="text-violet-200 text-sm font-medium">Response</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Card 1 */}
                        <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-blue-500/20">
                                    <Link2 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Unlimited Links</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Add as many links as you want. Drag and drop to reorder in seconds.
                                </p>
                            </div>
                        </div>

                        {/* Small Card 2 */}
                        <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all shadow-lg shadow-pink-500/20">
                                    <Palette className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6+ Themes</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    From minimal to neon cyberpunk. Express your unique style instantly.
                                </p>
                            </div>
                        </div>

                        {/* Small Card 3 */}
                        <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-amber-500/20">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Edge-optimized infrastructure. Loads instantly from anywhere in the world.
                                </p>
                            </div>
                        </div>

                        {/* Wide Card */}
                        <div className="lg:col-span-2 group relative p-8 rounded-[2.5rem] bg-gray-900 dark:bg-gray-800 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.2),transparent_50%)] group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.2),transparent_50%)] group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
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

            {/* FAQ Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative" id="faq">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Questions? <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Answered</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to know about MiniLink
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Why do I need a link in bio tool?",
                                a: "Social media platforms typically only allow one clickable link in your bio. MiniLink lets you share all your important links — your website, social profiles, online store, and more — through a single, customizable landing page."
                            },
                            {
                                q: "Is MiniLink the original link in bio tool?",
                                a: "MiniLink is a modern, open-source alternative to other link-in-bio tools. We focus on simplicity, speed, and giving you full control over your online presence without any ads or hidden costs."
                            },
                            {
                                q: "Can you get paid and sell things from a MiniLink?",
                                a: "Yes! You can add links to your online store, payment platforms like PayPal or Stripe, or any e-commerce solution. MiniLink helps you direct traffic to wherever you want to monetize."
                            },
                            {
                                q: "Is MiniLink safe to use on all of my social media profiles?",
                                a: "Absolutely! MiniLink is 100% safe and trusted by thousands of creators. Our links work seamlessly across Instagram, TikTok, Twitter, YouTube, and all other major platforms."
                            },
                            {
                                q: "What makes MiniLink better than other link in bio options?",
                                a: "MiniLink is completely free, open-source, and ad-free. We offer beautiful themes, real-time analytics, and lightning-fast load times. Plus, you can self-host it if you want complete control."
                            },
                            {
                                q: "How can I drive more traffic to and through my MiniLink?",
                                a: "Share your MiniLink URL everywhere — in your social bios, email signatures, business cards, and content. Use our analytics to understand what links perform best and optimize accordingly."
                            },
                            {
                                q: "How many links should I have on my MiniLink?",
                                a: "There's no limit! However, we recommend keeping it focused. 5-10 links is ideal for most creators. Prioritize your most important destinations at the top for maximum engagement."
                            },
                            {
                                q: "Do I need a website to use MiniLink?",
                                a: "Not at all! MiniLink can serve as your complete online presence. Many creators use their MiniLink page as their primary hub without needing a separate website."
                            }
                        ].map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFAQ === index}
                                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                            />
                        ))}
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

                        {/* Floating Social Icons */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* YouTube */}
                            <div className="absolute top-10 left-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rotate-12 animate-float">
                                <svg className="w-7 h-7 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </div>
                            {/* LinkedIn */}
                            <div className="absolute top-20 right-16 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center -rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>
                                <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </div>
                            {/* GitHub */}
                            <div className="absolute bottom-16 left-20 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rotate-6 animate-float" style={{ animationDelay: '1s' }}>
                                <Github className="w-7 h-7 text-white/80" />
                            </div>
                            {/* X (Twitter) */}
                            <div className="absolute bottom-10 right-10 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center -rotate-6 animate-float" style={{ animationDelay: '1.5s' }}>
                                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </div>
                            {/* Instagram */}
                            <div className="absolute top-1/2 left-6 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rotate-3 animate-float" style={{ animationDelay: '0.8s' }}>
                                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </div>
                            {/* Twitch */}
                            <div className="absolute top-1/3 right-8 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center -rotate-3 animate-float" style={{ animationDelay: '1.2s' }}>
                                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                            </div>
                        </div>

                        <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">

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
