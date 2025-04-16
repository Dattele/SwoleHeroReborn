import React from 'react';

import { useDanny } from '../../../Context/DannyContext';

import './Shop.scss';
import '../../../scss/All.scss';

export default function Shop({ title, items, onClose }) {
  const { spendGold, addItem } = useDanny();

  const handleBuy = (item) => {
    if (spendGold(item.price)) {
      addItem(item);
      console.log(`Bought ${item.name}`);
    } else {
      console.log('Not enough gold!');
      alert('Not enough gold!')
    }
  };

  return (
    <div className='Screen Full-Screen Shop-Screen'>
      <h2>{title}</h2>
      <p>Looking for gains? We've got 'em — for the right price.</p>

      <div className='Shop-Screen-Items'>
        {items.map((item, index) => (
          <div key={index} className='Shop-Items'>
            <div className='Shop-Items-Text'>
              <span className='Item-Title'>{item.name}</span>
              <span className='Item-Text'>{item.description}</span>
            </div>
            <button onClick={() => handleBuy(item)} className='Btn'>
              Buy - {item.price} Gold
            </button>
          </div>
        ))}
      </div>

      <button className='Btn Btn-Exit' onClick={onClose}>
        Exit Shop
      </button>
    </div>
  );
}
