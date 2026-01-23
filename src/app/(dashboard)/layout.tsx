import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardNav from '@/components/dashboard/dashboard-nav';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <DashboardNav user={session.user} />
            <main className="pt-16">
                {children}
            </main>
        </div>
    );
}
