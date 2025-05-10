import React from 'react';

import DanielFace from '../../assets/images/DanielFace.png';

import './TextBox.scss';

export default function TextBox({ textBox }) {
  return (
    <div className='Text-Box'>
      <img src={textBox.image} alt="Daniel's Face" />
      <p>{textBox.text}</p>
    </div>
  );
}
