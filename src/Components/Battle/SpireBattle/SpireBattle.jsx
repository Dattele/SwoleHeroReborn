import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import TextBox from '../../TextBox';
import Choices from '../../Choices';

import './SpireBattle.scss';

export default function SpireBattle({ enemies, battleEnd, setBattleEnd }) {
  const { party } = useDanny();
  const navigate = useNavigate();

  const loseChoices = [
    { text: 'Fall to the bottom', nextScene: '/bronzebell' },
  ];

  // Sets a timeout to wait before performing any other actions
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Handling the end of the battle
  const handleBattleEnd = async (result, enemies) => {
    await sleep(2000); // Wait two seconds;
    if (result === 'win') {
      setBattleEnd('win');
    } else if (result === 'lose') {
      setBattleEnd('lose');
    }
  };

  return (
    <div className='Spire-Battle'>
      <Battle
        players={party.filter((p) => p.hp > 0)}
        enemies={enemies}
        onBattleEnd={handleBattleEnd}
      />
      {battleEnd === 'lose' && (
        <div className='Choices-Container'>
          <TextBox
            text={
              'Your party has fallen down to the bottom of the mountain. They black out on the way to Bronzebell'
            }
          />
          <Choices options={loseChoices} onChoiceSelected={navigate} />
        </div>
      )}
    </div>
  );
}
