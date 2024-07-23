
"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
      if(response.status){

        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
      <LogOutIcon className="h-5 w-5" />
      <span className="sr-only">Logout</span>
    </Button>
  );
}

function LogOutIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    )
  }
