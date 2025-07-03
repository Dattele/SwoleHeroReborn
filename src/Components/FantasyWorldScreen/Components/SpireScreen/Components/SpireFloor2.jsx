import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';

import spireFloor2 from '../../../../../assets/images/SpireFloor2.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';

import '../../../../../scss/All.scss';

const continueChoices = [
  {
    text: 'Next Floor: More Gains',
    nextScene: '/spire-floor-3',
  },
];

export default function SpireFloor2() {
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor2})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd !== 'win' && (
        <SpireBattle
          enemies={[SpireMonsters[3], SpireMonsters[3], SpireMonsters[6]]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
      {battleEnd === 'win' && (
        <>
          <TextBox
            textBox={{
              text: "Ethan: 'Bro, once we survive this, we're gonna be so jacked even the statues will look jealous.'",
              image: EthanFace,
            }}
          />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
