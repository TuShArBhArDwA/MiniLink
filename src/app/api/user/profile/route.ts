import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET user profile
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                bio: true,
                avatar: true,
                theme: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

// PUT update profile
export async function PUT(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, bio, avatar, theme, username } = await request.json();

        // If username is being changed, check uniqueness
        if (username) {
            const existing = await prisma.user.findFirst({
                where: {
                    username,
                    NOT: { id: session.user.id },
                },
            });

            if (existing) {
                return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
            }
        }

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...(name !== undefined && { name }),
                ...(bio !== undefined && { bio }),
                ...(avatar !== undefined && { avatar }),
                ...(theme !== undefined && { theme }),
                ...(username !== undefined && { username }),
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
