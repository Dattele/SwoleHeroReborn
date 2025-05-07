import React, { useState } from 'react';

import Menu from '../System/Menu';
import QuestLog from '../System/QuestLog';

import '../../scss/All.scss';
import './GameUI.scss';

export default function GameUI({ showMenu = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [questOpen, setQuestOpen] = useState(false);

  return (
    <div className='GameUI'>
      {showMenu && (
        <div className='GameUI-Btn-Container'>
          <button
            className='GameUI-Btn'
            onClick={() =>
              setModalOpen((prev) => (prev === true ? false : true))
            }
          >
            📦 Party / Inventory
          </button>
          <button
            className='GameUI-Btn'
            onClick={() =>
              setQuestOpen((prev) => (prev === true ? false : true))
            }
          >
            📜 Quest Log
          </button>
        </div>
      )}

      <Menu isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <QuestLog isOpen={questOpen} />
    </div>
  );
}
