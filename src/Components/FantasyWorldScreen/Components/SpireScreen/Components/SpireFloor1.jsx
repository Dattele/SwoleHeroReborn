import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import Battle from '../../../../Battle';
import SpireMonsters from '../../../../Monster/SpireMonsters';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor1 from '../../../../../assets/images/SpireFloor1.png'

import '../../../../../scss/All.scss';

export default function SpireFloor1() {
  const { party } = useDanny();
  const navigate = useNavigate();

  const [battleWon, setBattleWon] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const continueChoices = [
    {
      text: 'Continue Climbing',
      nextScene: '/spire-floor-2',
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
        backgroundImage: `url(${spireFloor1})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {!battleWon && (
        <Battle 
          players={party.filter(p => p.hp > 0)}
          enemies={[SpireMonsters[0], SpireMonsters[0], SpireMonsters[1]]} 
          onBattleEnd={handleBattleEnd} 
        />
      )}
      {showDialogue && (
        <>
          <TextBox text="Ja'von: 'At this rate, we'll be more shredded than Danny's shorts.'" />
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}