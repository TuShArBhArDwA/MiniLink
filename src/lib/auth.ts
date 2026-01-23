import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { generateUsername } from './utils';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    throw new Error('Invalid credentials');
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) {
                    throw new Error('Invalid credentials');
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // For OAuth, auto-generate username if not exists
            if (account?.provider !== 'credentials' && user.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (existingUser && !existingUser.username) {
                    const username = generateUsername(user.email);
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: { username },
                    });
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session) {
                token.username = session.username;
                token.name = session.name;
            }

            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                    select: { id: true, username: true, name: true, avatar: true },
                });

                if (dbUser) {
                    token.id = dbUser.id;
                    token.username = dbUser.username;
                    token.name = dbUser.name;
                    token.picture = dbUser.avatar;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string | null;
                session.user.name = token.name as string | null;
            }
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            // Auto-generate username for new OAuth users
            if (user.email && user.id) {
                const username = generateUsername(user.email);
                await prisma.user.update({
                    where: { id: user.id },
                    data: { username },
                });
            }
        },
    },
});
