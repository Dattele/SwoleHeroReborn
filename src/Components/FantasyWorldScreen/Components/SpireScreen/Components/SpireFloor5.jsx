import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';

import spireFloor5 from '../../../../../assets/images/SpireFloor5.png';

import '../../../../../scss/All.scss';

export default function SpireFloor5() {
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const continueChoices = [
    {
      text: 'Flex Onward',
      nextScene: '/spire-floor-6',
    },
  ];

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor5})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd !== 'win' && (
        <SpireBattle
          enemies={[SpireMonsters[4], SpireMonsters[4]]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
      {battleEnd === 'win' && (
        <>
          <TextBox text="Ethan: 'Bro, once we survive this, we're gonna be so jacked even the statues will look jealous.'" />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
