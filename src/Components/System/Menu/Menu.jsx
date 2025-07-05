import React, { useState } from 'react';
import { useDanny } from '../../../Context/DannyContext';

import TargetSelection from '../../Battle/TargetSelection';

import './Menu.scss';

export default function Menu({ isOpen, onClose }) {
  const { party, inventory, gold, useItem } = useDanny();
  const [activeTab, setActiveTab] = useState('party');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTargetingAlly, setIsTargetingAlly] = useState(false);

  // Handling using an item
  const handleItem = (item) => {
    console.log('handleItem received:', item);
    setIsTargetingAlly(true);
    setSelectedItem(item);
  };

  // Selecting which ally to use the item on
  const HandleTargetSelection = (target) => {
    console.log('Target selected', target);
    console.log('item selected', selectedItem);
    setIsTargetingAlly(false);
    useItem(target, selectedItem);
  };

  return (
    <div className={`Menu-Overlay ${!isOpen ? 'Closed' : ''}`}>
      <div className='Menu'>
        <div className='Menu-Header'>
          <div className='Tabs'>
            <button
              className={`GameUI-Btn ${activeTab === 'party' && 'Active'}`}
              onClick={() => setActiveTab('party')}
            >
              Party
            </button>
            <button
              className={`GameUI-Btn ${activeTab === 'inventory' && 'Active'}`}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
            <button className='GameUI-Btn' onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className='Menu-Content'>
          {activeTab === 'party' && (
            <div className='Party-Tab'>
              {party.map((member, index) => (
                <div className='Party-Member' key={index}>
                  <div className='Party-Image-Wrapper'>
                    <img
                      src={member.imageFace}
                      alt={member.name}
                      className='Party-Image'
                    />
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                    <p>
                      Level: {member.level} / XP: {member.xp}
                    </p>
                    <p>
                      HP: {member.hp}/{member.maxHP}
                    </p>
                    <p>
                      STR: {member.strength} / DEF: {member.defense}
                    </p>
                    <p>
                      SPD: {member.speed} / RIZZ: {member.rizz}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className='Inventory-Tab'>
              <h2>💰 Gold: {gold}</h2>
              <div className='Inventory-Items-Wrapper'>
                {inventory.length > 0 ? (
                  inventory.map((item, index) => (
                    <div className='Inventory-Container' key={index}>
                      <div className='Inventory-Item'>
                        <strong>{item.name}</strong> (x{item.quantity})
                        <p>{item.description}</p>
                      </div>
                      <button
                        className='Inventory-Btn Btn'
                        onClick={() => handleItem(item)}
                      >
                        Use Item
                      </button>
                    </div>
                  ))
                ) : (
                  <p>You have no items.. Broke Boy!</p>
                )}
              </div>
            </div>
          )}

          {/* Pop-up for selecting ally */}
          {isTargetingAlly && (
            <TargetSelection
              targets={party.filter((player) => player.type === 'player')}
              onSelectTarget={HandleTargetSelection}
              onClose={() => setIsTargetingAlly(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
