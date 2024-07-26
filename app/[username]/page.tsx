"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicProfile } from '@/components/component/basic-profile';
import axios from 'axios';
import Snowfall from 'react-snowfall';
import { BackgroundBeams } from '@/components/component/background-beams.tsx';

interface Props {
    params: {
        username: string;
    };
}

const Page: React.FC<Props> = (props: Props) => {
    const { username } = props.params;
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernameResponse = await axios.get(`http://localhost:3000/api/get-user-display?username=${username}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                await axios.post(
                    `http://localhost:3000/api/increase-views?username=${encodeURIComponent(username)}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const { username_body, profile_views, background, avatar } = usernameResponse.data;
                setUserData({ username_body, profile_views, background, avatar });
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return (
            <LoadingContainer className='bg-black'>
                <Spinner />
                <BackgroundBeams />
            </LoadingContainer>
        );
    }

    if (error) {
        return <div>Error loading page.</div>;
    }

    return (
        <div className='bg-black'
            style={{
                backgroundImage: userData.background ? `url(/uploads/background/${userData.background})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: userData.avatar ? `url("/uploads/avatar/${userData.avatar}"), auto` : undefined
            }}
        >
            <BasicProfile
                username={userData.username_body}
                profile_views={userData.profile_views}
                error={false}
                userData={true}
                avatar={userData.avatar}
            />
            <Snowfall 
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}
            />
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
  border-top: 6px solid #FFFF00; /* Neon-gelbe Farbe */
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

export default Page;
