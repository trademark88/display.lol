"use client"
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

export function BasicProfile({
    username,
    profile_views,
    error,
    userData,
    background,
    avatar
}: any) {
    if (error) {
        return (
            <Card className="w-full max-w-lg mx-auto bg-primary text-primary-foreground rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="text-center text-red-500">{error}</div>
                </CardHeader>
            </Card>
        );
    }

    if (!userData) {
        return (
            <Card className="w-full max-w-lg mx-auto bg-primary text-primary-foreground rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="text-center">Loading...</div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {background && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(/uploads/background/${background})` }}
                />
            )}
            <Card
                className="relative z-10 bg-primary text-primary-foreground overflow-hidden rounded-2xl"
                style={{ 
                    border: 'none', // Keine Border und Animation
                    backdropFilter: 'blur(10px)', // Hintergrund verschwommen machen
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Transparente schwarze Hintergrundfarbe
                }}
            >
                <CardHeader className="bg-primary-foreground/10 py-6">
                    <div className="flex flex-col items-center justify-center">
                        {avatar && (
                            <Avatar className="w-16 h-16 mb-4 rounded-full">
                                <AvatarImage src={`/uploads/avatar/${avatar}`} />
                                <AvatarFallback className='text-gray-800 font-bold bg-gray-500'>{username[0]}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="text-2xl font-bold">{username}</div>
                    </div>
                </CardHeader>
                <CardContent className="px-6 py-4 flex items-center justify-between bg-primary-foreground/10" >
                    <div className="flex items-center gap-2">
                        <EyeIcon className="w-5 h-5 text-primary-foreground" />
                        <span className="text-sm text-primary-foreground">{profile_views.toString()}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
