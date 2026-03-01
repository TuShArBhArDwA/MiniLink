export default function AnalyticsLoading() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
                {/* Time Filter Skeleton */}
                <div className="hidden sm:flex bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-2xl h-11 w-64 animate-pulse"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-1"></div>
                    </div>
                ))}
            </div>

            {/* Area Chart Skeleton */}
            <div className="bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 mb-8 shadow-sm">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>
                </div>
                <div className="w-full h-[300px] bg-gray-100/50 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
            </div>

            {/* Top Links Skeleton */}
            <div className="bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="mb-6">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-72 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/50 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center justify-center w-8 h-8 font-black text-gray-300 dark:text-gray-700 bg-gray-100 dark:bg-gray-800/80 rounded-lg shadow-sm">
                                    {i}
                                </div>
                                <div className="space-y-2">
                                    <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                    <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-end sm:self-auto">
                                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
