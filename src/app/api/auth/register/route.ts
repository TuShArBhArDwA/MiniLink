import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateUsername } from '@/lib/utils';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate username
        const username = generateUsername(email);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
                username,
            },
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
                username: user.username,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
