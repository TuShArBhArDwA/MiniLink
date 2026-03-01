export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0A0A0A] relative pb-20 sm:pb-0">
            {/* Main Content Area */}
            <main className="lg:ml-64 min-h-screen transition-all duration-300">
                <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Profile URL Card Skeleton */}
                    <div className="relative overflow-hidden mb-8 p-6 lg:p-8 rounded-2xl bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse w-12 h-12"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                    <div className="h-4 w-48 sm:w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800/50 p-6 rounded-2xl shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1"></div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions & Top Links Skeletons */}
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Quick Actions Skeleton */}
                        <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-transparent">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
                                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Links Skeleton */}
                        <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse self-end sm:self-auto"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
