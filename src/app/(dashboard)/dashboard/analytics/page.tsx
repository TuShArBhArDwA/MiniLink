import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { Eye, MousePointer, TrendingUp, BarChart3, ExternalLink } from 'lucide-react';
import AnalyticsCharts from '@/components/dashboard/analytics-charts';
import AnalyticsTimeFilter from '@/components/dashboard/analytics-time-filter';

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: { range?: string };
}) {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const range = searchParams.range || '30d';
    let daysToFetch = 30; // default
    if (range === '7d') daysToFetch = 7;
    if (range === '90d') daysToFetch = 90;

    let gteDate: Date | undefined = undefined;

    if (range !== 'all') {
        gteDate = new Date();
        gteDate.setDate(gteDate.getDate() - daysToFetch);
    } else {
        daysToFetch = 90; // Default chart width for 'all' time
    }

    const [
        totalViews,
        totalClicks,
        links,
        recentPageViews,
        recentClicks,
    ] = await Promise.all([
        prisma.pageView.count({
            where: { userId: userId },
        }),
        prisma.link.aggregate({
            where: { userId: userId },
            _sum: { clicks: true },
        }),
        prisma.link.findMany({
            where: { userId: userId },
            orderBy: { clicks: 'desc' },
            select: { id: true, title: true, clicks: true, url: true },
        }),
        prisma.pageView.findMany({
            where: {
                userId: userId,
                ...(gteDate ? { createdAt: { gte: gteDate } } : {}),
            },
            select: { createdAt: true },
            orderBy: { createdAt: 'asc' },
        }),
        prisma.click.findMany({
            where: {
                link: { userId: userId },
                ...(gteDate ? { createdAt: { gte: gteDate } } : {}),
            },
            select: { createdAt: true },
            orderBy: { createdAt: 'asc' },
        }),
    ]);

    // Aggregate data by day
    const dayData: Record<string, { views: number; clicks: number }> = {};

    // Initialize days for the chart
    for (let i = 0; i < daysToFetch; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];
        dayData[key] = { views: 0, clicks: 0 };
    }

    // If 'all' time, make sure our dayData covers older dates dynamically if they exist.
    if (range === 'all') {
        recentPageViews.forEach((view: { createdAt: Date }) => {
            const key = view.createdAt.toISOString().split('T')[0];
            if (!dayData[key]) dayData[key] = { views: 0, clicks: 0 };
        });
        recentClicks.forEach((click: { createdAt: Date }) => {
            const key = click.createdAt.toISOString().split('T')[0];
            if (!dayData[key]) dayData[key] = { views: 0, clicks: 0 };
        });
    }

    // Count views per day
    recentPageViews.forEach((view: { createdAt: Date }) => {
        const key = view.createdAt.toISOString().split('T')[0];
        if (dayData[key]) {
            dayData[key].views++;
        }
    });

    // Count clicks per day
    recentClicks.forEach((click: { createdAt: Date }) => {
        const key = click.createdAt.toISOString().split('T')[0];
        if (dayData[key]) {
            dayData[key].clicks++;
        }
    });

    // Convert to array and sort
    const chartData = Object.entries(dayData)
        .map(([date, data]) => ({
            date,
            views: data.views,
            clicks: data.clicks,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

    const stats = [
        {
            label: 'Total Views',
            value: totalViews,
            icon: Eye,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            label: 'Total Clicks',
            value: totalClicks._sum.clicks || 0,
            icon: MousePointer,
            color: 'from-purple-500 to-pink-500'
        },
        {
            label: 'CTR',
            value: totalViews > 0
                ? `${(((totalClicks._sum.clicks || 0) / totalViews) * 100).toFixed(1)}%`
                : '0%',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500'
        },
        {
            label: 'Avg. Clicks/Link',
            value: links.length > 0
                ? ((totalClicks._sum.clicks || 0) / links.length).toFixed(1)
                : '0',
            icon: BarChart3,
            color: 'from-orange-500 to-red-500'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Track your profile performance over the last 30 days
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`} />

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg shadow-${stat.color.split('-')[1]}/20`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                                {stat.value.toLocaleString()}
                            </p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 mb-8 shadow-sm">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Traffic Overview</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Unique profile views versus link clicks.</p>
                    </div>
                    <AnalyticsTimeFilter />
                </div>
                <AnalyticsCharts data={chartData} />
            </div>

            {/* Top Links */}
            <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Performing Links</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Which of your links drive the most engagement?</p>
                </div>

                {links.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No performance data yet</h3>
                        <p className="text-sm text-gray-500">Share your MiniLink to start collecting insights.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {links.map((link: { id: string; title: string; clicks: number; url: string | null }, index: number) => {
                            const percentage = totalClicks._sum.clicks
                                ? ((link.clicks / (totalClicks._sum.clicks || 1)) * 100).toFixed(1)
                                : '0';

                            // Trophies for top 3
                            const rankColor = index === 0
                                ? 'bg-yellow-100/50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50 shadow-yellow-500/10'
                                : index === 1
                                    ? 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700 shadow-gray-500/5'
                                    : index === 2
                                        ? 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50 shadow-orange-500/10'
                                        : 'bg-gray-50/50 text-gray-400 border-transparent dark:bg-gray-800/30 dark:text-gray-500';

                            return (
                                <div
                                    key={link.id}
                                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800/80 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700/50 hover:shadow-sm"
                                >
                                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border ${rankColor}`}>
                                        {index + 1}
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                                            <div className="truncate pr-4">
                                                <p className="font-semibold text-gray-900 dark:text-white text-base truncate">{link.title}</p>
                                                <a href={link.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 hover:underline mt-0.5 w-fit">
                                                    {link.url}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300">
                                                    <span>{percentage}%</span>
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                    {link.clicks.toLocaleString()} <span className="text-gray-400 dark:text-gray-500 font-normal text-sm">clicks</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-800/80 rounded-full overflow-hidden shadow-inner w-full">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 via-violet-500 to-accent-500 rounded-full transition-all duration-1000 ease-out relative"
                                                style={{ width: `${percentage}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


        </div>
    );
}
