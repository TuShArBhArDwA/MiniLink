import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const targetUsername = searchParams.get('username');

        if (!targetUsername) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Check if the username is taken
        const existingUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: targetUsername,
                    mode: 'insensitive', // Case insensitive check
                },
            },
        });

        // If no one owns it, or the current user owns it, it is "available" to them
        const isAvailable = !existingUser || existingUser.id === userId;

        return NextResponse.json({ available: isAvailable });
    } catch (error) {
        console.error('Error checking username availability:', error);
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
