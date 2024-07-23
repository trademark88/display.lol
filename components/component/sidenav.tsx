"use client"
import React, { useState, useEffect } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";

interface SidenavProps {
  token: string | null;
}

const Sidenav: React.FC<SidenavProps> = ({ token }) => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:3000/api/getuser/name?token=${token}`, {
            method: 'GET'
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const { username, email } = await response.json();
          setUser({ username, email });
        } catch (error) {
          console.error('Fetch error:', error);
          setError('Error fetching user data.');
        }
      } else {
        console.error("Token is not available");
        setError('User is not authenticated.');
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <div className="flex h-full flex-col border-r bg-background">
        <nav className="flex flex-col gap-4 px-4 py-6">
          <div className="space-y-2">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring [&[data-state=open]>svg]:rotate-90">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5" />
                  <span>Account</span>
                </div>
                <ChevronRightIcon className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 px-3">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <ViewIcon className="h-5 w-5" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              <ReplaceIcon className="h-5 w-5" />
              <span>Customize</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              <LinkIcon className="h-5 w-5" />
              <span>Links</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              <CrownIcon className="h-5 w-5" />
              <span>Premium</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              <ImageIcon className="h-5 w-5" />
              <span>Image Host</span>
            </Link>
          </div>
        </nav>
        <div className="mt-auto flex items-center gap-4 border-t px-4 py-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{user?.username}</div>
              <LogoutButton />
            </div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
            {error && <div className="text-xs text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;

function ChevronRightIcon(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CrownIcon(props: any) {
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
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  );
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function LinkIcon(props: any) {
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
      <path d="M9 11V9a5 5 0 0 1 8.66-3.54M15 13v2a5 5 0 0 1-8.66 3.54M8 12h8" />
    </svg>
  );
}

function ReplaceIcon(props: any) {
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
      <path d="m3 7 3-3 3 3" />
      <path d="M6 20V4" />
      <path d="m21 17-3 3-3-3" />
      <path d="M18 4v16" />
    </svg>
  );
}

function SettingsIcon(props: any) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ViewIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}
