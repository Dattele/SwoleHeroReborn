import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import NPCChoices from '../../../../System/NPCChoices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor7 from '../../../../../assets/images/SpireFloor7.png';

import '../../../../../scss/All.scss';

export default function SpireFloor7() {
  const { restorePartyHP } = useDanny();

  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const continueChoices = [
    {
      text: 'Flex your way to the top (Restores Party HP)',
      action: 'leave',
    }
  ];

  // Handle the user's choice
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'leave':
        // Navigate to the next floor after restoring HP
        restorePartyHP();
        navigate('/spire-floor-8');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className='Screen Full-Screen Spire-Floor-7-Screen'
      style={{
        backgroundImage: `url(${spireFloor7})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd !== 'win' && (
        <SpireBattle 
          enemies={[SpireMonsters[5], SpireMonsters[5], SpireMonsters[1]]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
      {battleEnd === 'win' && (
        <>
          <TextBox text="Ethan: 'Bro, once we survive this, we're gonna be so jacked even the statues will look jealous.'" />
          <NPCChoices options={continueChoices} onChoiceSelected={handleChoice} />
        </>
      )}
    </div>
  );
}
