

import { decrypt } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
      const cookiestore = cookies();
      const token = cookiestore.get("token");
  
      if (!token) {
        return NextResponse.json({ error: "Token not provided" }, { status: 400 });
      }
  
      const decrypted_token: string | null = await decrypt<string>(token.value);
  
      if (decrypted_token) {
        const user = await prisma.user.findUnique({
          where: {
            id: decrypted_token
          },
          include: { customization: true }
        });
  
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
  
        const customization = user.customization.length > 0 ? user.customization[0] : null;
  
        return NextResponse.json({ avatar: customization?.profile_avatar || null });
      } else {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
      }
    } catch (e) {
      console.error("Error handling request:", e);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
