import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

// GET all links for current user
export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const links = await prisma.link.findMany({
            where: { userId: userId },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(links);
    } catch (error) {
        console.error('Error fetching links:', error);
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
    }
}

// POST create new link
export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, url, icon } = await request.json();

        if (!title || !url) {
            return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 });
        }

        // Get the highest order number
        const lastLink = await prisma.link.findFirst({
            where: { userId: userId },
            orderBy: { order: 'desc' },
        });

        const newOrder = (lastLink?.order ?? -1) + 1;

        const link = await prisma.link.create({
            data: {
                title,
                url,
                icon: icon || null,
                order: newOrder,
                userId: userId,
            },
        });

        return NextResponse.json(link, { status: 201 });
    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }
}

// PATCH update link order (bulk)
export async function PATCH(request: NextRequest) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { links } = await request.json();

        if (!Array.isArray(links)) {
            return NextResponse.json({ error: 'Links array required' }, { status: 400 });
        }

        // Update order for each link
        await Promise.all(
            links.map((link: { id: string; order: number }) =>
                prisma.link.update({
                    where: { id: link.id, userId: userId },
                    data: { order: link.order },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating link order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
