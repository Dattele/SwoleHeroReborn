import React from 'react';
import { useNavigate } from 'react-router-dom';

import dannyImage from '../../assets/images/Daniel.jpeg';
import './HeroScreen.scss';

export default function HeroScreen({ setPreGameScreen }) {
  const navigate = useNavigate();

  return (
    <div className='Hero-Screen Full-Screen'>
      <h2>Danny B Dimes</h2>
      <img src={dannyImage} alt='Danny B Dev' />
      <p className='Max-Width'>
        Tired of grinding Rocket League with no results and maxing out his bench
        press with nothing to show for it, Danny has made a bold decision: it's
        time to leave his comfort zone and take on the ultimate challenge -
        finding love.
      </p>
      <button className='Next-Btn' onClick={() => navigate('/world')}>
        Continue
      </button>
    </div>
  );
}
