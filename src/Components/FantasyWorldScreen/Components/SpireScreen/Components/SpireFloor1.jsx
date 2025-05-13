import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';

import spireFloor1 from '../../../../../assets/images/SpireFloor1.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

export default function SpireFloor1() {
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const continueChoices = [
    {
      text: 'Continue Climbing',
      nextScene: '/spire-floor-2',
    },
  ];

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor1})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd !== 'win' && (
        <SpireBattle
          enemies={[SpireMonsters[0], SpireMonsters[0], SpireMonsters[1]]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
      {battleEnd === 'win' && (
        <>
          <TextBox textBox={{ text: "Ja'von: 'At this rate, we'll be more shredded than Danny's shorts.'", image: JavonFace }} />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
