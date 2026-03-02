import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { userId } = auth();

        const searchParams = request.nextUrl.searchParams;
        const targetUsername = searchParams.get('username');
        const strict = searchParams.get('strict') === 'true';

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

        // If no one owns it, it's available. 
        // If someone owns it, it's only available if strict=false and the current user is the owner.
        const isAvailable = !existingUser || (!strict && existingUser.id === userId);

        return NextResponse.json({ available: isAvailable });
    } catch (error) {
        console.error('Error checking username availability:', error);
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
