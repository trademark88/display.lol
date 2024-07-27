import React, { useRef, useEffect, useState } from 'react';
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

const getKeyframes = () => `
  @keyframes glow-animation {
    from { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
    to { text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff; }
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink-caret {
    0%, 100% { border-color: transparent; }
    50% { border-color: #ff00ff; }
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  @keyframes color-change {
    0% { color: #ff00ff; }
    50% { color: #00ffff; }
    100% { color: #ff00ff; }
  }
  @keyframes font-change {
    0% { font-family: 'Arial', sans-serif; }
    50% { font-family: 'Courier New', Courier, monospace; }
    100% { font-family: 'Georgia', serif; }
  }
`;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#222',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  effect: {
    margin: '0 20px',
    textAlign: 'center' as 'center',
  },
  glow: {
    fontSize: '2.5em',
    color: '#fff',
    textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
    animation: 'glow-animation 1.5s infinite alternate',
  },
  typing: {
    fontSize: '2.5em',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    borderRight: '0.15em solid #ff00ff',
    animation: 'typing 4s steps(30, end), blink-caret 0.75s step-end infinite',
    width: 'fit-content', // Adjust width to fit the content
  },
  shake: {
    fontSize: '2.5em',
    display: 'inline-block',
    animation: 'shake 0.5s ease-in-out infinite',
  },
  colorChange: {
    fontSize: '2.5em',
    animation: 'color-change 3s infinite',
  },
  fontChange: {
    fontSize: '2.5em',
    animation: 'font-change 6s infinite',
  },
};

// Helper function to determine style based on username_effects
const getUsernameEffectStyle = (effect: string) => {
  const effectMapping: { [key: string]: React.CSSProperties } = {
    none: {},
    glowing: styles.glow,
    typing: styles.typing,
    shaking: styles.shake,
    color_changing: styles.colorChange,
    font_changing: styles.fontChange,
  };

  return effectMapping[effect] || {};
};

export function BasicProfile({
  username,
  profile_views,
  error,
  userData,
  background,
  avatar,
  username_effects,
  description
}: any) {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.scrollWidth);
    }
  }, [username]);

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

  const effectStyle = getUsernameEffectStyle(username_effects);

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
            <div 
              className="text-2xl font-bold" 
              style={{ ...effectStyle, width: username_effects === 'typing' ? textWidth : 'auto' }}
              ref={textRef}
            >
              {username}
            </div>
            <div className="text-center mt-2 text-lg font-bold">
              {description}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4 flex items-center justify-between bg-primary-foreground/10" >
          <div className="flex items-center gap-2">
            <EyeIcon className="w-5 h-5 text-primary-foreground" />
            <span className="text-sm text-primary-foreground">{profile_views.toString()}</span>
          </div>
        </CardContent>
      </Card>
      <style>
        {getKeyframes()}
      </style>
    </div>
  );
}
