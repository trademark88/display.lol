"use client"
import React from 'react';

interface AccountSektionGeneralProps {
  username: string | null;
  uid: number | null;
  profile_views: number | null;
  alias: string | null;
}

export const AccountSektionGeneral: React.FC<AccountSektionGeneralProps> = ({ username, uid, profile_views, alias }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-background p-4 rounded-lg shadow-sm flex flex-col items-center gap-2">
        <div className="bg-muted rounded-full p-2">
          <UserIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{username || 'Nicht verfügbar'}</h3>
      </div>
      <div className="bg-background p-4 rounded-lg shadow-sm flex flex-col items-center gap-2">
        <div className="bg-muted rounded-full p-2">
          <TagIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{alias || 'Nicht verfügbar'}</h3>
      </div>
      <div className="bg-background p-4 rounded-lg shadow-sm flex flex-col items-center gap-2">
        <div className="bg-muted rounded-full p-2">
          <KeyIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{uid !== null ? uid.toString() : 'Nicht verfügbar'}</h3>
      </div>
      <div className="bg-background p-4 rounded-lg shadow-sm flex flex-col items-center gap-2">
        <div className="bg-muted rounded-full p-2">
          <EyeIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{profile_views !== null ? profile_views.toString() : 'Nicht verfügbar'}</h3>
      </div>
    </div>
  );
};

// SVG Icons (Unverändert)
function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function KeyIcon(props: any) {
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
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}

function TagIcon(props: any) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
