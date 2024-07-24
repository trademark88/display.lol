import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Animierte Border Keyframes
const borderAnimation = `
@keyframes borderAnimation {
  0% {
    border-color: rgba(255, 255, 255, 0);
  }
  50% {
    border-color: rgba(255, 255, 255, 0.7);
  }
  100% {
    border-color: rgba(255, 255, 255, 0);
  }
}
`;

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

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function BasicProfile({
    username,
    profile_views,
    error,
    userData,
    background // neuer Prop für den Hintergrund
}: any) {
    if (error) {
        return (
            <Card className="w-full max-w-md mx-auto bg-primary text-primary-foreground rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="text-center text-red-500">{error}</div>
                </CardHeader>
            </Card>
        );
    }

    if (!userData) {
        return (
            <Card className="w-full max-w-md mx-auto bg-primary text-primary-foreground rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="text-center">Loading...</div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="relative w-full max-w-md mx-auto">
            {background && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(/uploads/${background})` }}
                />
            )}
            <style>
                {borderAnimation}
            </style>
            <Card
                className="relative z-10 bg-primary text-primary-foreground overflow-hidden rounded-2xl"
                style={{
                    border: '2px solid rgba(255, 255, 255, 0)',
                    animation: 'borderAnimation 3s infinite' // Animation anwenden
                }}
            >
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-16 h-16 mb-4 rounded-full">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-2xl font-bold">{username}</div>
                    </div>
                </CardHeader>
                <CardContent className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <EyeIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{profile_views.toString()}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
