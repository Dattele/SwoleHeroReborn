import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import ForestMonsters from '../../Monster/ForestMonsters/ForestMonsters';
// import dannyImage from '../../../assets/images/Daniel.jpeg';

export default function ForestBattle() {
  const { party, wolfKills, incrementWolfKills } = useDanny(); // Pulling in Danny's stats
  console.log(party);
  const navigate = useNavigate();
  //const forestBossEvent = wolfKills >= 0; // Triggers at 3+ wolf kills

  // Get the enemy
  const GetRandomMonster = () => {
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
  const enemy = GetRandomMonster();

  const handleBattleEnd = (result, enemies) => {
    enemies.forEach((enemy) => {
      if (enemy.name === 'Forest Wolf' && result === 'win') {
        incrementWolfKills(); // Count wolf kills
        console.log('incrementing wolf kills by 1');
      }
    });
    console.log('Handling battle end', wolfKills);
    setTimeout(wolfKills >= 3 && navigate('/forest-boss'), 3000);
  };

  return (
    <Battle players={party} enemies={[enemy]} onBattleEnd={handleBattleEnd} />
  );
}
