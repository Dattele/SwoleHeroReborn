import React from 'react';

import './Shop.scss';
import '../../../scss/All.scss';

export default function Shop({ title, items, onClose, onBuy }) {
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
            <button onClick={() => onBuy(item)} className='Btn'>
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
