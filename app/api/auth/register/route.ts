'use server'
import { encrypt } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return new Response(JSON.stringify({ error: 'Missing email, username, or password' }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        profile_views: 0,
      },
    });

    const token = await encrypt(newUser);

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

    return new Response(JSON.stringify({ message: 'User created successfully', token }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
