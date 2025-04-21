import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';
import Battle from '../Battle';
import TextBox from '../../TextBox';
import Choices from '../../Choices';
import { ForestBoss } from '../../Monster/ForestMonsters/ForestMonsters';

import './ForestBossBattle.scss';

export default function ForestBossBattle() {
  const { party, gold } = useDanny(); // Pulling in the party
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const enemy = ForestBoss[0];

  const choices = [
    { text: 'Head back to Bronzebell', nextScene: '/bronzebell' },
  ];

  const loseChoices = [
    { text: 'Hurry to Bronzebell', nextScene: '/bronzebell' },
  ];

  // After defeating Fangborn, set the quest to complete
  const handleBattleEnd = async (result, enemies) => {
    setBattleEnd(result);
    localStorage.setItem('Cleanse EdenGrove Forest', 'completed');
  };

  return (
    <div className='Forest-Boss-Battle'>
      <Battle players={party.filter(p => p.hp > 0)} enemies={[enemy]} onBattleEnd={handleBattleEnd} />
      {battleEnd === 'win' && (
        <div className='Choices-Container'>
          <TextBox text={'**[ Quest Complete: Cleanse EdenGrove Forest ✅ ]**'} />
          <Choices options={choices} onChoiceSelected={navigate} />
        </div>
      )}
      {battleEnd === 'lose' && (
        <div className='Choices-Container'>
          <TextBox text={'Your party has fallen. Hopefully you have at least 5 gold.. or else this is goodbye loser'}/>
          {gold >= 5 ? (
            <Choices options={loseChoices} onChoiceSelected={navigate} />
          ) : (
            <TextBox text={'Loser! The Demon King will now conquer Eldoria and you will die single! Clear cache to try again.'}/>
          )}
        </div>
      )}
    </div>
  );
}
