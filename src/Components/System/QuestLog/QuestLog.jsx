import React from 'react';
import { useDanny } from '../../../Context/DannyContext';

import './QuestLog.scss';

export default function QuestLog({ isOpen }) {
  const { questFlags } = useDanny();

  function formatQuestName(id) {
    const titles = {
      edenGrove: 'Cleanse EdenGrove Forest',
      spire: "The Spire's Crucible",
    };
    return titles[id] || id;
  }

  function formatStatus(status) {
    const statuses = {
      'in-progress': '🟡 In Progress',
      'completed': '✅ Completed',
    };
    return statuses[status] || status;
  }

  return (
    <div className={`Quest-Overlay ${!isOpen ? 'Closed' : ''}`}>
      <div className='Quest-Content'>
        <h2>Quests</h2>
        {Object.entries(questFlags).map(([quest, status]) => (
          <p key={quest}>
            {formatQuestName(quest)}: {formatStatus(status)}
          </p>
        ))}
      </div>
    </div>
  );
}
