import React, { useState } from 'react';
import Menu from '../System/Menu';

import '../../scss/All.scss';
import './GameUI.scss';

export default function GameUI({ showMenu = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='GameUI'>
      {showMenu && (
        <button
          className='GameUI-Btn'
          onClick={() => setModalOpen((prev) => (prev === true ? false : true))}
        >
          📦 Party / Inventory
        </button>
      )}

      <Menu isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
