export default function AppearanceLoading() {
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="mb-8 pl-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column - Editor Skeleton */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Profile Section Skeleton */}
                    <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Avatar Image Upload Skeleton */}
                        <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                            <div className="relative group w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                                <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Inputs Skeleton */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                <div className="h-24 w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Theme Section Skeleton */}
                    <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Preview Skeleton */}
                <div className="hidden lg:block lg:col-span-5">
                    <div className="sticky top-6">
                        <div className="flex items-center justify-between mb-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-2 shadow-sm">
                            <div className="flex items-center gap-2 pl-4">
                                <div className="h-2.5 w-2.5 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            </div>
                            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Phone Container Skeleton */}
                        <div className="relative mx-auto w-[300px] h-[600px] bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border-4 border-gray-200 dark:border-gray-800/50 flex flex-col pt-8">
                            <div className="absolute top-0 inset-x-0 h-6 bg-gray-100 dark:bg-gray-800 rounded-b-xl mx-auto w-32 animate-pulse"></div>
                            <div className="flex flex-col items-center mt-6">
                                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mb-4"></div>
                                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                                <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-8"></div>
                                <div className="w-full space-y-3 px-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
