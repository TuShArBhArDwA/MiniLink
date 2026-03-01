'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarDays } from 'lucide-react';

export default function AnalyticsTimeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRange = searchParams.get('range') || '30d';

    const ranges = [
        { label: '7 Days', value: '7d' },
        { label: '30 Days', value: '30d' },
        { label: '90 Days', value: '90d' },
        { label: 'All Time', value: 'all' },
    ];

    const handleFilterChange = (range: string) => {
        const params = new URLSearchParams(searchParams);
        if (range === '30d') {
            params.delete('range'); // 30d is default
        } else {
            params.set('range', range);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex bg-gray-100/80 dark:bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-fit">
            <div className="hidden sm:flex items-center pl-3 pr-2 text-gray-400 border-r border-gray-200 dark:border-gray-700 mr-1">
                <CalendarDays className="w-4 h-4" />
            </div>
            {ranges.map((range) => (
                <button
                    key={range.value}
                    onClick={() => handleFilterChange(range.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${currentRange === range.value
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-600/50'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                        }`}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
}
