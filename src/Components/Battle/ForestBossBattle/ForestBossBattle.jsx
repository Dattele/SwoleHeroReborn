import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import TextBox from '../../TextBox';
import Choices from '../../Choices';
import { ForestBoss } from '../../Monster/ForestMonsters/ForestMonsters';

import './ForestBossBattle.scss';

export default function ForestBossBattle() {
  const { party } = useDanny(); // Pulling in the party
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState(false);

  const enemy = ForestBoss[0];

  const choices = [
    { text: 'Head back to Bronzebell', nextScene: '/bronzebell' },
  ];

  // After defeating Fangborn, set the quest to complete
  const handleBattleEnd = async (result, enemies) => {
    setBattleEnd(true);
    localStorage.setItem('Cleanse EdenGrove Forest', 'completed');
  };

  return (
    <div className='Forest-Boss-Battle'>
      <Battle players={party} enemies={[enemy]} onBattleEnd={handleBattleEnd} />
      {battleEnd && (
        <div className='Choices-Container'>
          <TextBox text={'**[ Quest Complete: EdenGrove Forest ✅ ]**'} />
          <Choices options={choices} onChoiceSelected={navigate} />
        </div>
      )}
    </div>
  );
}
