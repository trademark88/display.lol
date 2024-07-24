import React from 'react';
import { BasicProfile } from '@/components/component/basic-profile';
import axios from 'axios';

interface Props {
    params: {
        username: string;
    };
}

const Page: React.FC<Props> = async (props: Props) => {
    const { username } = props.params;

    try {
        // Holen Sie sich die Benutzer- und Hintergrunddaten
        const usernameResponse = await axios.get(`http://localhost:3000/api/get-user-display?username=${username}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await axios.post(
            `http://localhost:3000/api/increase-views?username=${encodeURIComponent(username)}`,
            {}, // leeres Objekt für POST-Daten, da keine spezifischen Daten benötigt werden
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const { username_body, profile_views, background } = await usernameResponse.data;

        return (
            <div
                style={{
                    backgroundImage: background ? `url(/uploads/${background})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh', // Höhe auf 100% der Viewport-Höhe setzen
                    padding: '20px', // Optional: Innenabstand hinzufügen
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <BasicProfile
                    username={username_body}
                    profile_views={profile_views}
                    error={false}
                    userData={true}
                />
            </div>
        );
    } catch (error) {
        return <div>Error loading page.</div>;
    }
};

export default Page;
