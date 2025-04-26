import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import TextBox from '../../TextBox';
import Choices from '../../Choices';
import SpireMonsters from '../../Monster/SpireMonsters';

//import './SpireBattle.scss';

export default function SpireBattle() {
  const { party, gold, questFlags } = useDanny(); // Pulling in Danny's stats
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState('');

  const choices = [
    { text: 'Stay in the Spire Mountains', nextScene: '/spire' },
    { text: 'Retreat to Bronzebell', nextScene: '/bronzebell' },
  ];

  const loseChoices = [
    { text: 'Hurry to Bronzebell', nextScene: '/bronzebell' },
  ]

  // Get the amount of enemies
  const NumberOfEnemies = () => {
    const number = Math.floor(Math.random() * 2 + 2);
    return number;
  };

  // Get the enemy
  const GetRandomMonsters = () => {
    const weightedMonsters = [];

    SpireMonsters.forEach((monster) => {
      const weight = Math.max(1, Math.floor(100 / monster.xp)); // Higher XP = Lower Chance
      for (let i = 0; i < weight; i++) {
        weightedMonsters.push(monster);
      }
    });

    return weightedMonsters[
      Math.floor(Math.random() * weightedMonsters.length)
    ];
  };

  // Get all the enemies
  const getEnemies = () => {
    const numberOfEnemies = NumberOfEnemies();
    const enemies = [];

    for (let i = 0; i < numberOfEnemies; i++) {
      enemies.push(GetRandomMonsters());
    }

    return enemies;
  };

  // Sets a timeout to wait before performing any other actions
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const enemies = getEnemies();

  // Increase the wolf kill count for each wolf killed
  const handleBattleEnd = async (result, enemies) => {
    // enemies.forEach((enemy) => {
    //   if (enemy.name === 'Forest Wolf' && result === 'win') {
    //     incrementWolfKills(); // Count wolf kills
    //     console.log('incrementing wolf kills by 1');
    //   }
    // });

    // console.log('Handling battle end', wolfKills);
    // await sleep(2000); // Wait 2 seconds
    // if (wolfKills >= 3 && questFlags['edenGrove'] === 'in-progress') {
    //   navigate('/forest-boss');
    // }
    
    setBattleEnd(result);
  };

  return (
    <div className='Forest-Battle'>
      <Battle players={party.filter(p => p.hp > 0)} enemies={enemies} onBattleEnd={handleBattleEnd} />
      {battleEnd === 'win' && (
        <div className='Choices-Container'>
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
