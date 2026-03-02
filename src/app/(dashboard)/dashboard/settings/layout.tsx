import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings | MiniLink',
};

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
