import { background_effects, PrismaClient, username_effects } from '@prisma/client';
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
            where: { username: username },
            include: { customization: true, profiles: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const customization = user.customization.length > 0 ? user.customization[0] : null;
        const profiles  = user.profiles.length > 0 ? user.profiles : null;

        console.log(customization?.username_effects)

        return NextResponse.json({
            username_body: user.username,
            profile_views: user.profile_views,
            background: customization ? customization.background : null,
            avatar: customization ? customization.profile_avatar : null,
            background_effects: customization ? customization.background_effects: null,
            username_effects: customization ? customization.username_effects: null,
            description: customization ? customization.description : null,
            profiles: profiles ? profiles : null
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
