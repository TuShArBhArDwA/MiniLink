import Link from 'next/link';
import { RocketIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

interface UnclaimedProfileProps {
    username: string;
}

export default function UnclaimedProfile({ username }: UnclaimedProfileProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col pt-20 px-4">
            <div className="max-w-md w-full mx-auto relative group">
                {/* Decorative background blur */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative bg-white dark:bg-gray-950 px-8 py-12 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">

                    {/* Icon container */}
                    <div className="w-20 h-20 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6 relative shadow-inner">
                        <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full"></div>
                        <RocketIcon className="w-10 h-10 text-violet-600 dark:text-violet-400 relative z-10" />
                        <Sparkles className="w-5 h-5 text-fuchsia-500 absolute -top-2 -right-2 animate-pulse" />
                    </div>

                    {/* Headline */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6 shadow-sm border border-green-200 dark:border-green-800/50">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available Now
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Whoops! This link is <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">unclaimed</span>.
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                        The premium username <strong className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">{username}</strong> is up for grabs. Claim it before someone else builds their brand here!
                    </p>

                    {/* CTA Button */}
                    <Link
                        href={`/sign-up`}
                        className="w-full relative group/btn"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-200"></div>
                        <button className="relative w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl">
                            <LinkIcon className="w-5 h-5" />
                            Claim {username} Now
                        </button>
                    </Link>

                    {/* Social proof / urgency */}
                    <p className="text-sm text-gray-500 mt-6 flex items-center gap-1">
                        Over 10,000+ creators trust MiniLink.
                    </p>
                </div>
            </div>

            <div className="mt-auto py-8 text-center mt-12 z-10">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 transition-all shadow-sm hover:shadow hover:text-gray-900 dark:hover:text-white group"
                >
                    Create your own{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 ml-1 group-hover:opacity-80 transition-opacity">
                        MiniLink
                    </span>
                </Link>
            </div>
        </div>
    );
}
