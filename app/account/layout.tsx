import React from 'react';
import Sidenav from "@/components/component/sidenav";
import { cookies } from 'next/headers';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const cookiestore = cookies();
  const cookie = cookiestore.get("token");

  const token = cookie ? cookie.value : null;

  return (
    <div className="flex">
      <div className="w-1/5 border-r bg-background">
        {token && <Sidenav token={token} />}
      </div>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
