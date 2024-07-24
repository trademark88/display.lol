import { decrypt } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ "error": "Token not provided" }, { status: 400 });
    }

    const decrypted_token: string | null = await decrypt<string>(token);

    if (decrypted_token) {
      const user = await prisma.user.findUnique({
        where: {
          id: decrypted_token
        }
      });

      if (user) {
        return NextResponse.json({ "uid": user.uid });
      } else {
        return NextResponse.json({ "error": "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ "error": "Invalid or expired token" }, { status: 400 });
    }
  } catch (e) {
    console.error("Error handling request:", e);
    return NextResponse.json({ "error": "Internal server error" }, { status: 500 });
  }
}
