import { BasicProfile } from '@/components/component/basic-profile';
import React from 'react';
import axios from 'axios';


interface Props {
    params: {
        username: string;
    };
}


const Page: React.FC<Props> = async (props: Props) => {
    const { username } = props.params;

        const usernameResponse = await axios.get(`http://localhost:3000/api/get-user-display?username=${username}`, {
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const response = await axios.post(
            `http://localhost:3000/api/increase-views?username=${encodeURIComponent(username)}`,
            {}, // leeres Objekt für POST-Daten, da keine spezifischen Daten benötigt werden
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const {username_body, profile_views} = await usernameResponse.data

        
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <BasicProfile username={username_body} profile_views={profile_views} error={false} userData={true} />
            </div>
        );
};

export default Page;
