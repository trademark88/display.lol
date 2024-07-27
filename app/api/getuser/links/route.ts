import { decrypt } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const cookiestore = cookies();
        const token = cookiestore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const decrypted_token: string | null = await decrypt<string>(token);

        if (!decrypted_token) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: decrypted_token },
            include: { profiles: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const profiles = user.profiles.length > 0 ? user.profiles[0] : null;

        return NextResponse.json({
            profiles: profiles || ''
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
