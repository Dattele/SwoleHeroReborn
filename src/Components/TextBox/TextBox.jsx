import React from 'react';

import './TextBox.scss';

export default function TextBox({ textBox }) {
  return (
    <div className='Text-Box'>
      <img src={textBox?.image} alt="Character's Face" />
      <p>{textBox?.text}</p>
    </div>
  );
}
