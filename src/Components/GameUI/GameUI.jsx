import React, { useState } from 'react';
import Menu from '../System/Menu';

export default function GameUI({ showMenu = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='GameUI'>
      {showMenu && (
        <button
          className='Inventory-Open-Btn'
          onClick={() => setModalOpen((prev) => (prev === true ? false : true))}
        >
          📦 Party / Inventory
        </button>
      )}

      <Menu isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
