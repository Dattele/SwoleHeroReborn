import React, { useState } from 'react';

import PlayScreen from '../HomeScreen';
import CreateHero from '../CreateHero';

import './Game.scss';

export default function Game() {
  const [preGameScreen, setPreGameScreen] = useState(0);
  return (
    <div className='Game'>
      {preGameScreen === 0 && (
        <PlayScreen setPreGameScreen={setPreGameScreen} />
      )}
      {preGameScreen === 1 && (
        <CreateHero setPreGameScreen={setPreGameScreen} />
      )}
    </div>
  );
}
