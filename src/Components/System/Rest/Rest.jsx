import React from 'react';

import './Rest.scss';
import '../../../scss/All.scss';

export default function Rest({ title, text, onRest, onClose }) {
  return (
    <div className='Screen Full-Screen Rest-Screen'>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>Resting restores your parties HP</p>
      <button className='Btn' onClick={onRest}>
        Rent Room (25 Gold)
      </button>
      <button className='Btn' onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
