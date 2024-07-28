import React, { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Import der Icons
import {
  SiSnapchat,
  SiRoblox,
  SiCashapp,
  SiNamemc,
  SiOnlyfans,
  SiKick,
  SiBuymeacoffee,
  SiKofi,
} from "react-icons/si";

import {
  FaBitcoin,
  FaEthereum,
  FaEye,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaMonero,
  FaPaypal,
  FaPinterest,
  FaReddit,
  FaSoundcloud,
  FaSpotify,
  FaSteam,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { FaDiscord } from "react-icons/fa";
import { FaLitecoinSign, FaSquareLastfm } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { CiLink } from "react-icons/ci";

// Definiere die Keyframes für Animationen
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

// Definiere die Styles für die Komponente
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#222",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  effect: {
    margin: "0 20px",
    textAlign: "center" as "center",
  },
  glow: {
    fontSize: "2.5em",
    color: "#fff",
    textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
    animation: "glow-animation 1.5s infinite alternate",
  },
  typing: {
    fontSize: "2.5em",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    borderRight: "0.15em solid #ff00ff",
    animation: "typing 4s steps(30, end), blink-caret 0.75s step-end infinite",
    width: "fit-content", // Anpassung der Breite
  },
  shake: {
    fontSize: "2.5em",
    display: "inline-block",
    animation: "shake 0.5s ease-in-out infinite",
  },
  colorChange: {
    fontSize: "2.5em",
    animation: "color-change 3s infinite",
  },
  fontChange: {
    fontSize: "2.5em",
    animation: "font-change 6s infinite",
  },
};

// Hilfsfunktion, um das Styling basierend auf dem `username_effects` Wert zu bestimmen
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

// Mapping der Social Media Icons zu deren JSX-Komponenten
const socialMediaIcons: { [key: string]: JSX.Element } = {
  snapchat: <SiSnapchat size={30} />,
  youtube: <FaYoutube size={30} />,
  discord: <FaDiscord size={30} />,
  spotify: <FaSpotify size={30} />,
  instagram: <FaInstagram size={30} />,
  x: <FaTwitter size={30} />, // "x" für Twitter
  tiktok: <FaTiktok size={30} />,
  telegram: <FaTelegram size={30} />,
  soundcloud: <FaSoundcloud size={30} />,
  paypal: <FaPaypal size={30} />,
  github: <FaGithub size={30} />,
  roblox: <SiRoblox size={30} />,
  cash_app: <SiCashapp size={30} />,
  gitlab: <FaGitlab size={30} />,
  twitch: <FaTwitch size={30} />,
  reddit: <FaReddit size={30} />,
  namemc: <SiNamemc size={30} />,
  onlyfans: <SiOnlyfans size={30} />,
  linkedin: <FaLinkedin size={30} />,
  steam: <FaSteam size={30} />,
  kick: <SiKick size={30} />,
  pinterest: <FaPinterest size={30} />,
  lastfm: <FaSquareLastfm size={30} />,
  buymeacoffee: <SiBuymeacoffee size={30} />,
  kofi: <SiKofi size={30} />,
  facebook: <FaFacebook size={30} />,
  bitcoin: <FaBitcoin size={30} />,
  ethereum: <FaEthereum size={30} />,
  litecoin: <FaLitecoinSign size={30} />,
  monero: <FaMonero size={30} />,
  email: <IoMail size={30} />,
  custom_social: <CgWebsite size={30} />,
};

interface BasicProfileProps {
  username: string;
  profile_views: number;
  error: boolean;
  userData: boolean;
  background?: string;
  avatar?: string;
  username_effects?: string;
  description?: string;
  socialProfiles?: { [key: string]: string | null }; // Updated Prop für Social Media Benutzernamen
}

// Funktion zur Erstellung der Social Media URL basierend auf dem Platform-Namen und dem Benutzernamen
const getSocialMediaUrl = (platform: string, username: string): string => {
  const baseUrls: { [key: string]: string } = {
    snapchat: `https://www.snapchat.com/add/${username}`,
    youtube: `https://www.youtube.com/${username}`,
    discord: `https://discordapp.com/users/${username}`,
    spotify: `https://open.spotify.com/user/${username}`,
    instagram: `https://www.instagram.com/${username}`,
    x: `https://twitter.com/${username}`,
    tiktok: `https://www.tiktok.com/@${username}`,
    telegram: `https://t.me/${username}`,
    soundcloud: `https://soundcloud.com/${username}`,
    paypal: `https://www.paypal.me/${username}`,
    github: `https://github.com/${username}`,
    roblox: `https://www.roblox.com/users/${username}`,
    cash_app: `https://cash.app/${username}`,
    gitlab: `https://gitlab.com/${username}`,
    twitch: `https://www.twitch.tv/${username}`,
    reddit: `https://www.reddit.com/user/${username}`,
    namemc: `https://namemc.com/profile/${username}`,
    onlyfans: `https://onlyfans.com/${username}`,
    linkedin: `https://www.linkedin.com/in/${username}`,
    steam: `https://steamcommunity.com/id/${username}`,
    kick: `https://kick.com/${username}`,
    pinterest: `https://pinterest.com/${username}`,
    lastfm: `https://www.last.fm/user/${username}`,
    buymeacoffee: `https://www.buymeacoffee.com/${username}`,
    kofi: `https://ko-fi.com/${username}`,
    facebook: `https://www.facebook.com/${username}`,
    bitcoin: `bitcoin:${username}`,
    ethereum: `ethereum:${username}`,
    litecoin: `litecoin:${username}`,
    monero: `monero:${username}`,
    email: `mailto:${username}`,
    custom_social: `${username}`, // Direkt als URL
  };

  return baseUrls[platform] || "#";
};

// Definiere die BasicProfile Komponente
export function BasicProfile({
  username,
  profile_views,
  error,
  userData,
  background,
  avatar,
  username_effects = "none", // Standardwert, um undefined zu vermeiden
  description = "",
  socialProfiles,
}: BasicProfileProps) {
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
          border: "none", // Keine Border und Animation
          backdropFilter: "blur(10px)", // Hintergrund verschwommen machen
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparente schwarze Hintergrundfarbe
        }}
      >
        <CardHeader className="bg-primary-foreground/10 py-6">
          <div className="flex flex-col items-center justify-center">
            {avatar && (
              <Avatar className="w-16 h-16 mb-4 rounded-full">
                <AvatarImage src={`/uploads/avatar/${avatar}`} />
                <AvatarFallback className="text-gray-800 font-bold bg-gray-500">
                  {username[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className="text-2xl font-bold"
              style={{
                ...getUsernameEffectStyle(username_effects),
                width: username_effects === "typing" ? textWidth : "auto",
              }}
              ref={textRef}
            >
              {username}
            </div>
            <div className="text-center mt-2 text-lg font-bold">
            <hr className="border-white w-full mt-3"/>

              {description}
            </div>

            {/* Rendere Social Media Icons unter der Beschreibung */}
            <div
              className="flex justify-center gap-4 mt-4 flex-wrap max-w-full"
              style={{
                gap: "1rem",
              }}
            >
                          <hr className="border-white w-full mt-3"/>

              {socialProfiles &&
                Object.entries(socialProfiles).map(([platform, username]) => {
                  if (username && socialMediaIcons[platform]) {
                    return (
                      <a
                        href={getSocialMediaUrl(platform, username)}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={platform}
                        className="text-white hover:text-gray-400 transition-colors duration-300"
                      >
                        {socialMediaIcons[platform]}
                      </a>
                    );
                  }
                  return null; // Wenn der Benutzername `null` ist, rendere nichts
                })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4 flex items-center justify-between bg-primary-foreground/10">
          <div className="flex items-center gap-2">
            <FaEye className="w-5 h-5 text-primary-foreground"/>

            <span className="text-sm text-primary-foreground">
              {profile_views.toString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <style>{getKeyframes()}</style>
    </div>
  );
}
