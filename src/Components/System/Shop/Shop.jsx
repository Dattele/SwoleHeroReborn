import React from 'react';

import './Shop.scss';
import '../../../scss/All.scss';

export default function Shop({ title, items, onClose, onBuy }) {
  return (
    <div className="Screen Full-Screen Shop-Screen">
      <h2>{title}</h2>
      <p>Looking for gains? We've got 'em — for the right price.</p>

      {items.map((item, index) => (
        <div key={index} className='Shop-Items'>
          <span>{item.name} - {item.description}</span>
          <button onClick={() => onBuy(item)} className='Btn'>
            Buy - {item.price} Gold
          </button>
        </div>
      ))}

      <button className='Btn' onClick={onClose}>
        Exit Shop
      </button>
    </div>
  );
}