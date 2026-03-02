import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Links | MiniLink',
};

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
