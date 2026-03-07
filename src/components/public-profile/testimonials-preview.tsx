'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const testimonials = [
    {
        quote: "Tushar builds genuinely useful tools for developers.",
        author: "Developer",
    },
    {
        quote: "One of the most consistent builders in the dev community.",
        author: "Founder",
    },
    {
        quote: "His projects are simple, practical, and well executed.",
        author: "Student",
    },
];

export default function TestimonialsPreview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            setIsVisible(false);

            // After fade-out completes, switch testimonial and fade back in
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                setIsVisible(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const current = testimonials[currentIndex];

    return (
        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Section Header */}
            <div className="flex items-center justify-center mb-6">
                <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105"
                    style={{
                        background: 'color-mix(in srgb, var(--theme-card) 30%, transparent)',
                        borderColor: 'color-mix(in srgb, var(--theme-text) 10%, transparent)'
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    <span
                        className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"
                        style={{ color: 'color-mix(in srgb, var(--theme-text) 70%, transparent)' }}
                    >
                        Testimonials
                    </span>
                </div>
            </div>

            {/* Testimonial Card */}
            <div
                className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl"
                style={{
                    background: 'color-mix(in srgb, var(--theme-card) 50%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--theme-text) 15%, transparent)',
                    boxShadow: '0 4px 24px -4px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 20px -8px color-mix(in srgb, var(--theme-text) 10%, transparent)',
                }}
            >
                {/* Inner glow ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />

                {/* Ambient glow */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                {/* Quote Content */}
                <div
                    className="relative z-10 text-center transition-opacity duration-500 ease-in-out min-h-[120px] flex flex-col items-center justify-center"
                    style={{ opacity: isVisible ? 1 : 0 }}
                >
                    {/* Quote mark */}
                    <div
                        className="text-4xl font-serif leading-none mb-3 select-none"
                        style={{ color: 'color-mix(in srgb, var(--theme-text) 20%, transparent)' }}
                    >
                        &ldquo;
                    </div>

                    {/* Testimonial text */}
                    <p
                        className="text-base sm:text-lg font-medium leading-relaxed mb-3 italic"
                        style={{ color: 'color-mix(in srgb, var(--theme-text) 90%, transparent)' }}
                    >
                        {current.quote}
                    </p>

                    {/* Author */}
                    <p
                        className="text-sm font-bold tracking-wide"
                        style={{ color: 'color-mix(in srgb, var(--theme-text) 50%, transparent)' }}
                    >
                        — {current.author}
                    </p>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center justify-center gap-1.5 mt-4 relative z-10">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                            style={{
                                background: index === currentIndex
                                    ? 'var(--theme-text)'
                                    : 'color-mix(in srgb, var(--theme-text) 25%, transparent)',
                                transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* CTA Link */}
            <div className="flex justify-center mt-6">
                <a
                    href="https://minianonvouch.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all duration-500 hover:scale-105 active:scale-95 group"
                    style={{
                        background: 'color-mix(in srgb, var(--theme-card) 40%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--theme-text) 10%, transparent)',
                        color: 'color-mix(in srgb, var(--theme-text) 80%, transparent)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    <span>Read all stories</span>
                    <div
                        className="p-1 rounded-lg transition-transform duration-300 group-hover:bg-white/10"
                    >
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                </a>
            </div>
        </div>
    );
}
