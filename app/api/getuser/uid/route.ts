import { decrypt } from '@/lib/jwt';
import { User } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token') as string;

    const decrypted_token = await decrypt<User>(token);

    if (decrypted_token) {
      return NextResponse.json({ "uid": decrypted_token.uid});
    } else {
      return NextResponse.json({ "error": "Invalid or expired token" }, { status: 400 });
    }
  } catch (e) {
    console.error("Error handling request:", e);
    return NextResponse.json({ "error": "Internal server error" }, { status: 500 });
  }
}
