import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import Battle from '../../../../Battle';
import SpireMonsters from '../../../../Monster/SpireMonsters';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor3 from '../../../../../assets/images/SpireFloor3.png'

import '../../../../../scss/All.scss';

export default function SpireFloor3() {
  const { party } = useDanny();
  const navigate = useNavigate();

  const [battleWon, setBattleWon] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const continueChoices = [
    {
      text: 'Flex Onward',
      nextScene: '/spire-floor-4',
    }
  ];

  const handleBattleEnd = async (result, enemies) => {
    if (result === 'win') {
      setBattleWon(true);
      setShowDialogue(true);
    }
  };

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor3})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {!battleWon && (
        <Battle 
          players={party.filter(p => p.hp > 0)}
          enemies={[SpireMonsters[2], SpireMonsters[2], SpireMonsters[2]]} 
          onBattleEnd={handleBattleEnd} 
        />
      )}
      {showDialogue && (
        <>
          <TextBox text="Ethan: 'Bro, once we survive this, we're gonna be so jacked even the statues will look jealous.'" />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}