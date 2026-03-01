export default function SettingsLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="mb-8 pl-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            </div>

            <div className="space-y-6">
                {/* Username Section Skeleton */}
                <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="mb-6 max-w-xl">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-3"></div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="h-11 flex-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                            <div className="h-11 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    <div className="h-16 max-w-xl bg-gray-50/80 dark:bg-gray-800/50 rounded-xl animate-pulse mt-4"></div>
                </div>

                {/* Account Section Skeleton */}
                <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="space-y-4 max-w-xl">
                        {[1, 2].map((i) => (
                            <div key={i}>
                                <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                                <div className="h-11 w-full bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100/50 dark:border-gray-800/50 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danger Zone Skeleton */}
                <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/50">
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                        </div>
                        <div className="h-11 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
