import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Appearance | MiniLink',
};

export default function AppearanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
