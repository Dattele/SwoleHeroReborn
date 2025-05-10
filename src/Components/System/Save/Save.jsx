import React from 'react';

import { useDanny } from '../../../Context/DannyContext';

import './Save.scss';

export default function Save({ isOpen }) {
  const { playTime, questFlags, saveGame, loadGame } = useDanny();

  // Get the user's last save if it exists
  const lastSave = JSON.parse(localStorage?.getItem('saveSlot1'));
  //console.log(lastSave);

  // Get the user's location
  const location = window.location.pathname.split('/').filter(Boolean).pop() || 'Unknown';

  // Get the current Date
  const timestamp = Date.now();
  const date = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get the active quest
  const activeQuest = Object.keys(questFlags).find(
    key => questFlags[key] === 'in-progress'
  ) || "No Active Quests";

  // Format the playTime into hrs, mins, and secs
  function formatPlayTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  }

  // Format the quest name to match the quest log 
  function formatQuestName(id) {
    const titles = {
      edenGrove: 'Cleanse EdenGrove Forest',
      spire: "The Spire's Crucible",
      emberfall: "Explore the Ruins of Emberfall"
    };
    return titles[id] || id;
  }

  return (
    <div className={`Save-Overlay ${!isOpen ? 'Closed' : ''}`}>
      <div className='Content Save-Content'>
        <h2>💾 Save File</h2>

        <div className="Save-Snapshot">
          <p className='Save-Location-Text'><strong>📍 Location:</strong> {location || "Unknown"}</p>
          <p><strong>🎯 Quest:</strong> {formatQuestName(activeQuest) || "None"}</p>
          <p><strong>🕒 Playtime:</strong> {formatPlayTime(playTime) || "00:00"}</p>
          <p><strong>🗓️ Date:</strong> {date}</p>
        </div>

        <button className='Btn' onClick={saveGame}>💾 Create Save</button>
      </div>
      <div className='Content Load-Content'>
        <h2>💾 Load Save</h2>

        <div className="Load-Snapshot">
          <p className='Save-Location-Text'><strong>📍 Location:</strong> {lastSave.location || "Unknown"}</p>
          <p><strong>🎯 Quest:</strong> {formatQuestName(lastSave.activeQuest) || "None"}</p>
          <p><strong>🕒 Playtime:</strong> {formatPlayTime(lastSave.playTime) || "00:00"}</p>
          <p><strong>🗓️ Date:</strong> {lastSave.date}</p>
        </div>

        <button className='Btn' onClick={loadGame}>💾 Load Save</button>
      </div>
    </div>
  );
}
