import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const username = url.searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({
            username_body: user.username,
            profile_views: user.profile_views
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
