import React from 'react';
import { BasicProfile } from '@/components/component/basic-profile';
import axios from 'axios';
import { BackgroundBeams } from '@/components/component/background-beams.tsx';

interface Props {
    params: {
        username: string;
    };
}

const Page: React.FC<Props> = async (props: Props) => {
    const { username } = props.params;

    try {
        // Fetch the user data
        const usernameResponse = await axios.get(`http://localhost:3000/api/get-user-display?username=${username}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await axios.post(
            `http://localhost:3000/api/increase-views?username=${encodeURIComponent(username)}`,
            {}, // Empty object for POST data
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const { username_body, profile_views, background, avatar } = await usernameResponse.data;

        return (
            <>
                <div className='bg-gray-900'
                    style={{
                        backgroundImage: background ? `url(/uploads/background/${background})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '100vh', // Set height to 100% of viewport height
                        padding: '20px', // Optional: add padding
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: avatar ? `url("/uploads/avatar/${avatar}"), auto` : undefined // Set custom cursor
                    }}
                >
                    <BasicProfile
                        username={username_body}
                        profile_views={profile_views}
                        error={false}
                        userData={true}
                        avatar={avatar}
                    />
                </div>
                <BackgroundBeams />
            </>
        );
    } catch (error) {
        return <div>Error loading page.</div>;
    }
};

export default Page;
