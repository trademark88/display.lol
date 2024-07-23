'use server'
import { encrypt } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const token = await encrypt(user);

    if (!token) {
      return new Response('Failed to encrypt data', { status: 500 });
    }

    const cookieStore = cookies();
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    });

    return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
