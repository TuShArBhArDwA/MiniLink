'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

interface ChartData {
    date: string;
    views: number;
    clicks: number;
}

interface AnalyticsChartsProps {
    data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-4 rounded-xl shadow-xl">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any) => (
                        <div key={entry.name} className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {entry.name}: <span className="font-bold text-gray-900 dark:text-white">{entry.value.toLocaleString()}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
    if (data.length === 0) {
        return (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-500 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Awaiting Traffic</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">We&apos;ll show your charts once you get some visitors.</p>
            </div>
        );
    }

    // Format dates for display
    const formattedData = data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }),
    }));

    return (
        <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={formattedData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.2} />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '5 5' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', paddingBottom: '10px' }} />
                    <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        name="Profile Views"
                        filter="url(#glow)"
                    />
                    <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="#ec4899"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorClicks)"
                        name="Link Clicks"
                        filter="url(#glow)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
