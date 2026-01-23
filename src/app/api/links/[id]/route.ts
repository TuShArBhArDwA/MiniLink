import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single link
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const link = await prisma.link.findUnique({
            where: { id: params.id, userId: session.user.id },
        });

        if (!link) {
            return NextResponse.json({ error: 'Link not found' }, { status: 404 });
        }

        return NextResponse.json(link);
    } catch (error) {
        console.error('Error fetching link:', error);
        return NextResponse.json({ error: 'Failed to fetch link' }, { status: 500 });
    }
}

// PUT update link
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, url, icon, isActive } = await request.json();

        const link = await prisma.link.update({
            where: { id: params.id, userId: session.user.id },
            data: {
                ...(title !== undefined && { title }),
                ...(url !== undefined && { url }),
                ...(icon !== undefined && { icon }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        return NextResponse.json(link);
    } catch (error) {
        console.error('Error updating link:', error);
        return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
    }
}

// DELETE link
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.link.delete({
            where: { id: params.id, userId: session.user.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting link:', error);
        return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
    }
}
