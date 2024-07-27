import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Map zur Speicherung der IPs, die bereits eine Anfrage gestellt haben
const ipSet = new Set<string>(); 

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const username = url.searchParams.get('username') as undefined | string;

        if (!username) {
            return new Response('Username is required', { status: 400 });
        }

        // IP-Adresse des Clients abrufen
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // Überprüfen, ob die IP-Adresse bereits eine Anfrage gestellt hat
        if (ipSet.has(ip)) {
            return new Response('Only one request per IP allowed', { status: 429 });
        }

        // IP-Adresse in das Set einfügen
        ipSet.add(ip);

        // Beginne eine Transaktion
        const updatedUser = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { username: username }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const updatedUser = await prisma.user.update({
                where: { username: username },
                data: {
                    profile_views: {
                        increment: 1
                    }
                }
            });

            return updatedUser;
        });

        return new Response(JSON.stringify( {
            profile_views: updatedUser.profile_views}), { status: 200 });
    } catch (error) {
        console.error('Error updating profile views:', error);
        return new Response('Error updating profile views', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
