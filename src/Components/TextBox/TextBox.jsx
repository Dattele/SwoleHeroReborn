import React from 'react';

import DanielFace from '../../assets/images/DanielFace.png';

import './TextBox.scss';

export default function TextBox({ text, image = DanielFace }) {
  return (
    <div className='Text-Box'>
      <img src={image} alt="Daniel's Face"/>
      <p>{text}</p>
    </div>
  );
}