'use client';

import { useState, useEffect } from 'react';

export function GeneralCustomization() {
  const [description, setDescription] = useState('');
  const [backgroundEffect, setBackgroundEffect] = useState('None');
  const [username_effects, setUsernameEffect] = useState('None');
  
  // Zustände für die nicht benötigten Einstellungen
  const [discordPresence, setDiscordPresence] = useState(false);
  const [profileOpacity, setProfileOpacity] = useState(100);
  const [profileBlur, setProfileBlur] = useState(0);
  const [swapBoxColors, setSwapBoxColors] = useState(false);
  const [socialsGlow, setSocialsGlow] = useState(false);
  const [usernameGlow, setUsernameGlow] = useState(false);
  const [badgeGlow, setBadgeGlow] = useState(false);

  // Zustände für Änderungen
  const [changedBackgroundEffect, setChangedBackgroundEffect] = useState(false);
  const [changedUsernameEffect, setChangedUsernameEffect] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      console.log('Fetching settings...');

      try {
        // Nur relevante API-Calls
        const [
          descriptionResponse,
          backgroundEffectResponse,
          usernameEffectResponse
        ] = await Promise.all([
          fetch("/api/getuser/description"),
          fetch("/api/getuser/background-effect"),
          fetch("/api/getuser/name-effect")
        ]);

        const descriptionData = await descriptionResponse.json();
        const backgroundEffectData = await backgroundEffectResponse.json();
        const usernameEffectData = await usernameEffectResponse.json();

        console.log('Description Data:', descriptionData);
        console.log('Background Effect Data:', backgroundEffectData);
        console.log('Username Effect Data:', usernameEffectData);

        setDescription(descriptionData.description || '');
        setBackgroundEffect(backgroundEffectData.background_effects || 'None');
        setUsernameEffect(usernameEffectData.username_effects || 'None');

      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Description changed:', e.target.value);
    setDescription(e.target.value);
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => {
      const newValue = !prev;
      console.log('Toggled value:', newValue);
      return newValue;
    });
  };

  const handleBackgroundEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Background effect changed:', e.target.value);
    setBackgroundEffect(e.target.value);
    setChangedBackgroundEffect(true);
  };

  const handleUsernameEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Username effect changed:', e.target.value);
    setUsernameEffect(e.target.value);
    setChangedUsernameEffect(true);
  };

  const saveBackgroundEffect = async () => {
    console.log('Saving background effect:', backgroundEffect);
    const response = await fetch("/api/customize/general/background-effect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ background_effect: backgroundEffect })
    });
    if (!response.ok) {
      console.error('Error saving background effect:', await response.text());
    }
    return response;
  };

  const saveUsernameEffect = async () => {
    console.log('Saving username effect:', username_effects);
    const response = await fetch("/api/customize/general/username-effect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username_effects: username_effects })
    });
    if (!response.ok) {
      console.error('Error saving username effect:', await response.text());
    }
    return response;
  };

  const saveDescription = async () => {
    console.log('Saving description:', description);
    const response = await fetch("/api/customize/general/description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description: description })
    });
    if (!response.ok) {
      console.error('Error saving description:', await response.text());
    }
    return response;
  };

  const handleSave = async () => {
    console.log('Saving settings...');
    try {
      if (changedBackgroundEffect) {
        await saveBackgroundEffect();
        setChangedBackgroundEffect(false);
      }

      if (changedUsernameEffect) {
        await saveUsernameEffect();
        setChangedUsernameEffect(false);
      }

      await saveDescription();

      console.log({
        description,
        backgroundEffect,
        username_effects,
      });

      alert('Settings saved!');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-800 rounded-2xl text-white relative">
      <h2 className="mb-4 text-2xl font-bold">General Customization</h2>

      <div className="space-y-4 flex-grow">
        {/* Description */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>

        {/* Background Effects */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Background Effects</span>
          <select
            value={backgroundEffect}
            onChange={handleBackgroundEffectChange}
            className="bg-gray-700 border border-gray-600 rounded-md"
          >
            <option value="None">None</option>
            <option value="backgroundbeams">Background Beams</option>
            <option value="snowfall">Snowfall</option>
            <option value="matrix">Matrix</option>
          </select>
        </div>

        {/* Username Effects */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Username Effects</span>
          <select
            value={username_effects}
            onChange={handleUsernameEffectChange}
            className="bg-gray-700 border border-gray-600 rounded-md"
          >
            <option value="None">None</option>
            <option value="glowing">Glowing</option>
            <option value="typing">Typing</option>
            <option value="shaking">Shaking</option>
            <option value="color_changing">Color Changing</option>
            <option value="font_changing">Font Changing</option>
          </select>
        </div>

        {/* Profile Opacity */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Profile Opacity</span>
          <input
            type="range"
            min="0"
            max="100"
            value={profileOpacity}
            onChange={(e) => setProfileOpacity(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md"
          />
          <span className="ml-2">{profileOpacity}%</span>
        </div>

        {/* Profile Blur */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Profile Blur</span>
          <input
            type="range"
            min="0"
            max="100"
            value={profileBlur}
            onChange={(e) => setProfileBlur(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md"
          />
          <span className="ml-2">{profileBlur}px</span>
        </div>

        {/* Swap Box Colors */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Swap Box Colors</span>
          <input
            type="checkbox"
            checked={swapBoxColors}
            onChange={() => handleToggle(setSwapBoxColors)}
          />
        </div>

        {/* Socials Glow */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Socials Glow</span>
          <input
            type="checkbox"
            checked={socialsGlow}
            onChange={() => handleToggle(setSocialsGlow)}
          />
        </div>

        {/* Username Glow */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Username Glow</span>
          <input
            type="checkbox"
            checked={usernameGlow}
            onChange={() => handleToggle(setUsernameGlow)}
          />
        </div>

        {/* Badge Glow */}
        <div className="flex items-center space-x-4">
          <span className="flex-1">Badge Glow</span>
          <input
            type="checkbox"
            checked={badgeGlow}
            onChange={() => handleToggle(setBadgeGlow)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"
        >
          Save
        </button>
      </div>
    </div>
  );
}
