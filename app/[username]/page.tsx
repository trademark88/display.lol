"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicProfile } from "@/components/component/basic-profile";
import axios from "axios";
import Snowfall from "react-snowfall";
import { MatrixRainingLetters } from "react-mdr";
import { BackgroundBeams } from "@/components/component/background-beams.tsx";
import NotFound from "@/components/component/notfound";

// Importiere alle notwendigen Icons
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
  FaDiscord,
} from "react-icons/fa";

import { FaLitecoinSign, FaSquareLastfm } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

// Definiere die Schnittstellen
interface Props {
  params: {
    username: string;
  };
}

interface Profiles {
  profiles_id: string; // Beibehalten als verpflichtend
  snapchat?: string | null;
  youtube?: string | null;
  discord?: string | null;
  spotify?: string | null;
  instagram?: string | null;
  x?: string | null; // Twitter
  tiktok?: string | null;
  telegram?: string | null;
  soundcloud?: string | null;
  paypal?: string | null;
  github?: string | null;
  roblox?: string | null;
  cash_app?: string | null;
  gitlab?: string | null;
  twitch?: string | null;
  reddit?: string | null;
  namemc?: string | null;
  onlyfans?: string | null;
  linkedin?: string | null;
  steam?: string | null;
  kick?: string | null;
  pinterest?: string | null;
  lastfm?: string | null;
  buymeacoffee?: string | null;
  kofi?: string | null;
  facebook?: string | null;
  bitcoin?: string | null;
  ethereum?: string | null;
  litecoin?: string | null;
  monero?: string | null;
  email?: string | null;
  custom_social?: CustomUrl[]; // Angenommen, dies ist ein Array von URLs
}

interface CustomUrl {
  name: string;
  url: string;
}

interface UserData {
  username_body: string;
  profile_views: number;
  background?: string;
  avatar?: string;
  background_effects?: string;
  username_effects?: string;
  description?: string;
  profiles: Profiles;
}

// Funktion zur Umwandlung der Profiles
const transformProfiles = (profiles: Profiles): { [key: string]: string | null } => {
  const transformed: { [key: string]: string | null } = {};

  // Durchlaufe alle Schlüssel-Wert-Paare in profiles
  Object.entries(profiles).forEach(([key, value]) => {
    // Ignoriere das custom_social-Array, da es nicht in der Zielstruktur benötigt wird
    if (key !== "custom_social") {
      transformed[key] = value as string | null;
    }
  });

  return transformed;
};

const Page: React.FC<Props> = (props: Props) => {
  const { username } = props.params;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const usernameResponse = await axios.get(
          `http://localhost:3000/api/get-user-display?username=${username}`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const {
          username_body,
          profile_views,
          background,
          avatar,
          background_effects,
          username_effects,
          description,
          profiles,
        } = usernameResponse.data;

        setUserData({
          username_body,
          profile_views,
          background,
          avatar,
          background_effects,
          username_effects,
          description,
          profiles,
        });

        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    };

    const increaseViews = async () => {
      try {
        await axios.post(
          `http://localhost:3000/api/increase-views?username=${encodeURIComponent(
            username
          )}`,
          {},
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error);
        } else {
          console.error("Error increasing views:", error);
        }
      }
    };

    fetchData();
    increaseViews();

    return () => {
      controller.abort(); // Cleanup on component unmount
    };
  }, [username]);

  if (loading) {
    return (
      <LoadingContainer className="bg-black">
        <Spinner />
        <BackgroundBeams />
      </LoadingContainer>
    );
  }

  if (error) {
    return <NotFound />;
  }

  const renderBackgroundEffect = () => {
    switch (userData?.background_effects) {
      case "matrix":
        return (
          <MatrixWrapper key="matrix-effect">
            <MatrixRainingLetters custom_class="m-0 p-0" />
          </MatrixWrapper>
        );
      case "snowfall":
        return (
          <Snowfall
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: 0,
            }}
          />
        );
      case "backgroundbeams":
        return <BackgroundBeams />;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-black"
      style={{
        backgroundImage: userData?.background
          ? `url(/uploads/background/${userData.background})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <BasicProfile
        username={userData?.username_body ?? ""}
        profile_views={userData?.profile_views ?? 0}
        error={false}
        userData={!!userData}
        avatar={userData?.avatar ?? ""}
        username_effects={userData?.username_effects ?? ""}
        description={userData?.description ?? ""}
        socialProfiles={userData ? transformProfiles(userData.profiles) : undefined} // Transform profiles to the expected type
      />
      {renderBackgroundEffect()}
    </div>
  );
};

// Styled-components für den Ladebildschirm
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #ffff00; /* Neon-gelbe Farbe */
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const MatrixWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ensure it stays in the background but visible */
`;

export default Page;
