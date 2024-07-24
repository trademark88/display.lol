"use client"
import { Register } from '@/components/component/register';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  return (
    <div className="flex items-center justify-center h-screen">
      <Register usernameparam={username} />
    </div>
  );
}

export default Page;
