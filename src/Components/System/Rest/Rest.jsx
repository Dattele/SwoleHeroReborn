import React from 'react';

import { useDanny } from '../../../Context/DannyContext';

import './Rest.scss';
import '../../../scss/All.scss';

export default function Rest({ title, text, onClose }) {
  const { gold, spendGold, restorePartyHP} = useDanny();

  const handleRest = (item) => {
    console.log('handling rest');
    if (gold >= 5) {
      spendGold(5);
      console.log('party gold', gold);
      restorePartyHP();
    } else {
      alert('Not enough Gold!');
    }
  };

  return (
    <div className='Screen Full-Screen Rest-Screen'>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>Resting restores your parties HP</p>
      <button className='Btn' onClick={handleRest}>
        Rent Room (5 Gold)
      </button>
      <button className='Btn' onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
