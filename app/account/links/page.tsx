"use client"; // Notwendig für Next.js, um dies als Client-Komponente zu behandeln

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
  FaTimes, // Importiere das X-Icon
} from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLitecoinSign, FaSquareLastfm } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { CiLink } from "react-icons/ci";

// Definiere einen Typ für das Icon-Array
type IconData = {
  icon: JSX.Element;
  key: string;
  name: string;
  urlPrefix: string;
};

// Liste der Social Media Icons
const icons: IconData[] = [
  { icon: <SiSnapchat className="text-yellow-300 text-4xl" />, key: "snapchat", name: "Snapchat", urlPrefix: "snapchat.com/" },
  { icon: <FaYoutube className="text-red-600 text-4xl" />, key: "youtube", name: "YouTube", urlPrefix: "youtube.com/" },
  { icon: <FaDiscord className="text-indigo-600 text-4xl" />, key: "discord", name: "Discord", urlPrefix: "discord.com/" },
  { icon: <FaSpotify className="text-green-500 text-4xl" />, key: "spotify", name: "Spotify", urlPrefix: "spotify.com/" },
  { icon: <FaInstagram className="text-pink-500 text-4xl" />, key: "instagram", name: "Instagram", urlPrefix: "instagram.com/" },
  { icon: <FaTwitter className="text-blue-400 text-4xl" />, key: "x", name: "X", urlPrefix: "twitter.com/" },
  { icon: <FaTiktok className="text-black text-4xl" />, key: "tiktok", name: "TikTok", urlPrefix: "tiktok.com/" },
  { icon: <FaTelegram className="text-blue-500 text-4xl" />, key: "telegram", name: "Telegram", urlPrefix: "telegram.org/" },
  { icon: <FaSoundcloud className="text-orange-500 text-4xl" />, key: "soundcloud", name: "SoundCloud", urlPrefix: "soundcloud.com/" },
  { icon: <FaPaypal className="text-blue-700 text-4xl" />, key: "paypal", name: "PayPal", urlPrefix: "paypal.me/" },
  { icon: <FaGithub className="text-gray-800 text-4xl" />, key: "github", name: "GitHub", urlPrefix: "github.com/" },
  { icon: <SiRoblox className="text-red-500 text-4xl" />, key: "roblox", name: "Roblox", urlPrefix: "roblox.com/" },
  { icon: <SiCashapp className="text-green-500 text-4xl" />, key: "cash_app", name: "CashApp", urlPrefix: "cash.app/" },
  { icon: <FaGitlab className="text-orange-400 text-4xl" />, key: "gitlab", name: "GitLab", urlPrefix: "gitlab.com/" },
  { icon: <FaTwitch className="text-purple-600 text-4xl" />, key: "twitch", name: "Twitch", urlPrefix: "twitch.tv/" },
  { icon: <FaReddit className="text-orange-500 text-4xl" />, key: "reddit", name: "Reddit", urlPrefix: "reddit.com/" },
  { icon: <SiNamemc className="text-blue-600 text-4xl" />, key: "namemc", name: "NameMC", urlPrefix: "namemc.com/" },
  { icon: <SiOnlyfans className="text-blue-400 text-4xl" />, key: "onlyfans", name: "OnlyFans", urlPrefix: "onlyfans.com/" },
  { icon: <FaLinkedin className="text-blue-700 text-4xl" />, key: "linkedin", name: "LinkedIn", urlPrefix: "linkedin.com/in/" },
  { icon: <FaSteam className="text-gray-700 text-4xl" />, key: "steam", name: "Steam", urlPrefix: "steamcommunity.com/id/" },
  { icon: <SiKick className="text-green-500 text-4xl" />, key: "kick", name: "Kick", urlPrefix: "kick.com/" },
  { icon: <FaPinterest className="text-red-600 text-4xl" />, key: "pinterest", name: "Pinterest", urlPrefix: "pinterest.com/" },
  { icon: <FaSquareLastfm className="text-red-600 text-4xl" />, key: "lastfm", name: "Last.fm", urlPrefix: "last.fm/user/" },
  { icon: <SiBuymeacoffee className="text-yellow-500 text-4xl" />, key: "buymeacoffee", name: "Buy Me a Coffee", urlPrefix: "buymeacoffee.com/" },
  { icon: <SiKofi className="text-blue-500 text-4xl" />, key: "kofi", name: "Ko-fi", urlPrefix: "ko-fi.com/" },
  { icon: <FaFacebook className="text-blue-700 text-4xl" />, key: "facebook", name: "Facebook", urlPrefix: "facebook.com/" },
  { icon: <FaBitcoin className="text-orange-500 text-4xl" />, key: "bitcoin", name: "Bitcoin", urlPrefix: "bitcoin.org/" },
  { icon: <FaEthereum className="text-gray-700 text-4xl" />, key: "ethereum", name: "Ethereum", urlPrefix: "ethereum.org/" },
  { icon: <FaLitecoinSign className="text-blue-600 text-4xl" />, key: "litecoin", name: "Litecoin", urlPrefix: "litecoin.org/" },
  { icon: <FaMonero className="text-orange-500 text-4xl" />, key: "monero", name: "Monero", urlPrefix: "getmonero.org/" },
  { icon: <IoMail className="text-gray-800 text-4xl" />, key: "email", name: "Email", urlPrefix: "mailto:" },
  { icon: <CgWebsite className="text-gray-800 text-4xl" />, key: "website", name: "Website", urlPrefix: "https://" },
];

const Page: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null); // Verfolge, welches Modal geöffnet ist
  const [inputs, setInputs] = useState<{ [key: string]: string }>({}); // Verfolge Benutzer-Eingaben
  const [customLinks, setCustomLinks] = useState<{ [key: string]: string }>({}); // Verfolge angepasste Links
  const [error, setError] = useState<string | null>(null); // Verfolge Übermittlungsfehler
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Verfolge Erfolgsmeldung

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getuser/links");
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        const data = await response.json();
        
        // Annahme, dass Ihre Datenstruktur so aussieht:
        // { profiles: { snapchat: "test", youtube: "test", ... } }
        const { profiles } = data;
        
        // Initialisiere Eingaben mit abgerufenen Profildaten
        setInputs(profiles);
        
        // Setze auch anfängliche benutzerdefinierte Links, die unter den Icons angezeigt werden sollen
        const initialCustomLinks = Object.keys(profiles).reduce((links, key) => {
          if (profiles[key]) {
            links[key] = `${getUrlPrefix(key)}${profiles[key]}`;
          }
          return links;
        }, {} as { [key: string]: string });
        
        setCustomLinks(initialCustomLinks);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchData();
  }, []); // leeres Array bedeutet, dass dieser Effekt nur einmal beim Mounten ausgeführt wird

  const handleIconClick = (key: string) => {
    setOpenModal(key);
    setError(null);
    setSuccessMessage(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [openModal!]: e.target.value, // Non-null assertion, da openModal vorher überprüft wird
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      brand: openModal,
      profilelink: inputs[openModal!], // Profil-Link, der zur ausgewählten Marke gehört
    };

    console.log("Payload an den Server gesendet:", payload);

    try {
      const response = await fetch("/api/customize/updatelinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Das Aktualisieren des Profil-Links ist fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }

      const data = await response.json();

      setCustomLinks((prev) => ({
        ...prev,
        [openModal!]: `${getUrlPrefix(openModal!)}${inputs[openModal!]}`,
      }));

      setSuccessMessage(`Ihr ${data.brand} Link wurde erfolgreich aktualisiert!`);
      setOpenModal(null); // Schließe das Modal bei erfolgreicher Übermittlung
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleRemoveLink = async (key: string) => {
    setCustomLinks((prev) => {
      const updatedLinks = { ...prev };
      delete updatedLinks[key];
      return updatedLinks;
    });

    try {
      const response = await fetch("/api/customize/removelink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand: key }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Entfernen des Links. Bitte versuchen Sie es erneut.");
      }

      setSuccessMessage(`Ihr ${key} Link wurde erfolgreich entfernt!`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getUrlPrefix = (key: string): string => {
    const selectedIcon = icons.find((icon) => icon.key === key);
    return selectedIcon ? selectedIcon.urlPrefix : "";
  };

  return (
    <div className="bg-primary w-11/12 mx-auto rounded-2xl flex flex-col items-center justify-center text-center p-6">
      <h1 className="font-bold text-white text-xl mb-6">
        Verlinken Sie Ihre Social-Media-Profile. 
      </h1>
      <div className="flex flex-wrap justify-center">
        {icons.map(({ icon, key, name }) => (
          <div key={key} className="flex flex-col items-center mx-4 my-2 relative">
            <div
              className="cursor-pointer p-4 bg-white rounded-full hover:bg-gray-100 transition-all"
              onClick={() => handleIconClick(key)}
            >
              {icon}
            </div>
            <p className="text-white mt-2 font-bold">{name}</p>
            {customLinks[key] && (
              <div className="">
                <a
                  href={`https://${customLinks[key]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline mt-2 hover:text-blue-500 transition-all"
                >
                  {customLinks[key]}
                </a>
                <FaTimes
                  onClick={() => handleRemoveLink(key)}
                  className="absolute top-0 right-0 mt-1 mr-1 text-red-600 cursor-pointer text-xl"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Geben Sie Ihren {openModal} Benutzernamen ein:</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-4">
                <label className="mr-2 font-medium text-gray-700">{getUrlPrefix(openModal)}</label>
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputs[openModal] || ""}
                  onChange={handleInputChange}
                  placeholder={`Geben Sie Ihren ${openModal} Benutzernamen ein`}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-all"
                  onClick={() => setOpenModal(null)}
                >
                  Abbrechen
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                  Bestätigen
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
