import { decrypt } from '@/lib/jwt';
import { User } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token') as string;

    const decrypted_token = await decrypt<User>(token);

    if (decrypted_token.alias) {
      return NextResponse.json({ "alias": decrypted_token.alias});
    } else {
      return NextResponse.json({ "alias": "No Alias set" }, { status: 400 });
    }
  } catch (e) {
    console.error("Error handling request:", e);
    return NextResponse.json({ "error": "Internal server error" }, { status: 500 });
  }
}
