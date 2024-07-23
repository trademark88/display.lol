import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const username = url.searchParams.get('username') as undefined | string;

        const updatedUser = await prisma.user.update({
            where: { username: username },
            data: {
                profile_views: {
                    increment: 1
                }
            }
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error('Error updating profile views:', error);
        return new Response('Error updating profile views', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
