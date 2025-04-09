import React, { useState } from 'react';
import { useDanny } from '../../../Context/DannyContext';

import './Menu.scss';

export default function Menu({ isOpen, onClose }) {
  const { party, inventory, gold } = useDanny();
  const [activeTab, setActiveTab] = useState('party');

  return (
    <div className={`Modal-Overlay ${!isOpen && 'Closed'}`}>
      <div className='PartyInventoryModal'>
        <div className='Modal-Header'>
          <button className='Close-Btn' onClick={onClose}>
            ✖
          </button>
          <div className='Tabs'>
            <button
              className={activeTab === 'party' ? 'active' : ''}
              onClick={() => setActiveTab('party')}
            >
              Party
            </button>
            <button
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
          </div>
        </div>

        <div className='Modal-Content'>
          {activeTab === 'party' && (
            <div className='Party-Tab'>
              {party.map((member, index) => (
                <div className='Party-Member' key={index}>
                  <img src={member.imageFace} alt={member.name} />
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                    <p>Level: {member.level} / XP: {member.xp}</p>
                    <p>HP: {member.hp}</p>
                    <p>STR: {member.strength} / DEF: {member.defense}</p>
                    <p>SPD: {member.speed} / RIZZ: {member.rizz}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className='Inventory-Tab'>
              <h2>💰 Gold: {gold}</h2>
              {inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <div className='Inventory-Item' key={index}>
                    <strong>{item.name}</strong> (x{item.quantity})
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <p>You have no items.. Broke Boy!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
