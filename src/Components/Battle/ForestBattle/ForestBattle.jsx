import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import Choices from '../../Choices';
import ForestMonsters from '../../Monster/ForestMonsters/ForestMonsters';

import './ForestBattle.scss';

export default function ForestBattle() {
  const { party, wolfKills, incrementWolfKills } = useDanny(); // Pulling in Danny's stats
  console.log('party', party);
  const navigate = useNavigate();
  const [battleEnd, setBattleEnd] = useState(false);
  //const forestBossEvent = wolfKills >= 0; // Triggers at 3+ wolf kills
  
  const choices = [
    { text: 'Stay in EdenGrove Forest', nextScene: '/forest' },
    { text: 'Retreat to Bronzebell', nextScene: '/bronzebell' },
  ];

  // Get the amount of enemies
  const NumberOfEnemies = () => {
    const number = Math.floor((Math.random() * 3) + 1);
    return number;
  }

  // Get the enemy
  const GetRandomMonsters = () => {
    const weightedMonsters = [];

    ForestMonsters.forEach((monster) => {
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
  }

  // Sets a timeout to wait before performing any other actions
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  const enemies = getEnemies();

  const handleBattleEnd = async (result, enemies) => {
    enemies.forEach((enemy) => {
      if (enemy.name === 'Forest Wolf' && result === 'win') {
        incrementWolfKills(); // Count wolf kills
        console.log('incrementing wolf kills by 1');
      }
    });
    console.log('Handling battle end', wolfKills);
    await sleep(2000); // Wait 2 seconds
    wolfKills >= 3 && navigate('/forest-boss');
    setBattleEnd(true);
  };

  return (
    <div className='Forest-Battle'>
      <Battle players={party} enemies={enemies} onBattleEnd={handleBattleEnd} />
      {battleEnd && (
        <div className='Choices-Container'>
          <Choices options={choices} onChoiceSelected={navigate} />
        </div>
      )}
    </div>
  );
}
