import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';
import Battle from '../Battle';
import TextBox from '../../TextBox';
import Choices from '../../Choices';

import DanielFace from '../../../assets/images/DanielFace.png';

export default function EmberfallBattle({ enemies, battleEnd, setBattleEnd }) {
  const { party } = useDanny();
  const navigate = useNavigate();

  const loseChoices = [{ text: 'Retreat', nextScene: '/emberfall' }];

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
    <div className='Emberfall-Battle'>
      <Battle
        players={party.filter((p) => p?.hp > 0)}
        enemies={enemies}
        onBattleEnd={handleBattleEnd}
      />
      {battleEnd === 'lose' && (
        <div className='Choices-Container'>
          <TextBox
            textBox={{
              text: "Your party has been defeated by the Demon King's army.",
              image: DanielFace,
            }}
          />
          <Choices options={loseChoices} onChoiceSelected={navigate} />
        </div>
      )}
    </div>
  );
}
