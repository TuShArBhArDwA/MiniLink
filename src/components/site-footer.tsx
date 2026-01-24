import Link from 'next/link';

export function SiteFooter() {
    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-white/5 bg-white dark:bg-[#0a0a0f]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500"></div>
                            <div className="absolute inset-[2px] rounded-[6px] bg-white dark:bg-[#0a0a0f] flex items-center justify-center">
                                <span className="text-sm font-black bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent">M</span>
                            </div>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">MiniLink</span>
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
                        {/* 
                          Context-aware link: if we are in the dashboard, we probably don't need a login link in the footer.
                          But for simplicity/consistency, we can leave it or make it conditional.
                          Given this is a shared footer, a Login link is fine for public pages, but maybe redundant for dashboard.
                          However, the user asked for the footer "which is there on the homepage".
                        */}
                        <Link href="/sign-in" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
