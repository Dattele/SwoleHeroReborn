import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';

import spireFloor4 from '../../../../../assets/images/SpireFloor4.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';

import '../../../../../scss/All.scss';

export default function SpireFloor4() {
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const continueChoices = [
    {
      text: 'Head out of the cave',
      nextScene: '/spire-floor-5',
    },
  ];

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor4})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd !== 'win' && (
        <SpireBattle
          enemies={[SpireMonsters[2], SpireMonsters[2], SpireMonsters[2]]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
      {battleEnd === 'win' && (
        <>
          <TextBox textBox={{ text: "Ethan: 'Bro, once we survive this, we're gonna be so jacked even the statues will look jealous.'", image: EthanFace }} />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
