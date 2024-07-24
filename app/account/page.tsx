// app/account/page.tsx

import { cookies } from 'next/headers';
import { AccountSektionGeneral } from '@/components/component/account-sektion-general';
import fetch from 'node-fetch';

// Funktion zum Abrufen der Daten
async function fetchData(token: string) {
  const [uidResponse, usernameResponse, profileViewsResponse, aliasResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/getuser/uid?token=${token}`),
    fetch(`http://localhost:3000/api/getuser/name?token=${token}`),
    fetch(`http://localhost:3000/api/getuser/profileviews?token=${token}`),
    fetch(`http://localhost:3000/api/getuser/alias?token=${token}`),
  ]);

  const uid = await uidResponse.json();
  const username = await usernameResponse.json();
  const profile_views = await profileViewsResponse.json();
  const alias = await aliasResponse.json();

  return {
    username: username.username, // Sicherstellen, dass der Name existiert
    uid: uid.uid,                // Sicherstellen, dass UID existiert
    profile_views: profile_views.profile_views, // Sicherstellen, dass die Views existieren
    alias: alias.alias,          // Sicherstellen, dass der Alias existiert
  };
}

// Server-Komponente
export default async function Page() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return <p>Not authenticated. Please log in.</p>;
  }

  const data = await fetchData(token);

  return (
    <>
      <h5>Account Overview</h5>
      <AccountSektionGeneral 
        username={data.username} 
        uid={data.uid} 
        profile_views={data.profile_views} 
        alias={data.alias} 
      />
      
    </>
  );
}
