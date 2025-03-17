import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HomeScreen.scss'

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className='Play-Screen Full-Screen'>
      <div className='Play-Screen-Title-Area Max-Width'>
        <h1>Swole Hero Reborn: The Quest for Gains and Girlfriends</h1>
        <p className='Play-Screen-Text'>The Chosen One</p>
      </div>
      <button className='Play-Screen-Button' onClick={() => navigate('/character')}>Begin Adventure</button>
    </div>
  )
}