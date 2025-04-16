import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import Choices from '../../Choices';
import { ForestBoss } from '../../Monster/ForestMonsters/ForestMonsters';

export default function ForestBossBattle() {
  const { party } = useDanny(); // Pulling in the party
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState(false);

  const enemy = ForestBoss[0];

  const choices = [
    { text: 'Head back to Bobby in Bronzebell', nextScene: '/bronzebell' },
  ];

  const handleBattleEnd = async (result, enemies) => {
    setBattleEnd(true);
  };

  return (
    <div className='Forest-Boss-Battle'>
      <Battle players={party} enemies={[enemy]} onBattleEnd={handleBattleEnd} />
      {battleEnd && (
        <div className='Choices-Container'>
          <Choices options={choices} onChoiceSelected={navigate} />
        </div>
      )}
    </div>
  );
}
