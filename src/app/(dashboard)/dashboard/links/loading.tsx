export default function LinksLoading() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
            </div>

            {/* Quick Add Form Skeleton */}
            <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 mb-8 shadow-sm">
                <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <div className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Links List Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
                    >
                        {/* Drag Handle Skeleton */}
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></div>

                        {/* Content Skeleton */}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 sm:gap-5 w-full">
                                {/* Icon Skeleton */}
                                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

                                {/* Text Skeleton */}
                                <div className="space-y-2 flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                        <div className="hidden sm:block h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-56 sm:w-64 bg-gray-100 dark:bg-gray-800/80 rounded animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Stats Badge Skeleton */}
                                <div className="hidden sm:block h-7 w-24 bg-gray-100 dark:bg-gray-800/80 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Actions Skeleton */}
                        <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0 w-full justify-end sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800/50">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse"></div>
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse"></div>
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
