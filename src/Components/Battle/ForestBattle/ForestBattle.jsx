import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useDanny } from '../../../Context/DannyContext';

import Battle from '../Battle';
import ForestMonsters from '../../Monster/ForestMonsters/ForestMonsters';
import TextBox from '../../TextBox';
import Choices from '../../Choices/Choices';
// import dannyImage from '../../../assets/images/Daniel.jpeg';

export default function ForestBattle() {
  const { stats, wolfKills, incrementWolfKills } = useDanny(); // Pulling in Danny's stats
  const navigate = useNavigate();
  const [eventIndex, setEventIndex] = useState(0);
  const forestBossEvent = wolfKills >= 3; // Triggers at 3+ wolf kills

  // Get the enemy
  const GetRandomMonster = () => {
    const weightedMonsters = [];
  
    ForestMonsters.forEach((monster) => {
      const weight = Math.max(1, Math.floor(100 / monster.xp)); // Higher XP = Lower Chance
      for (let i = 0; i < weight; i++) {
        weightedMonsters.push(monster);
      }
    });
  
    return weightedMonsters[Math.floor(Math.random() * weightedMonsters.length)];
  };
  const enemy = GetRandomMonster();

  const handleBattleEnd = (result, enemyHPs) => {
    enemyHPs.forEach(enemy => {
      if (enemy.name === "Forest Wolf" && result === "win") {
        incrementWolfKills(); // Count wolf kills
        console.log('incrementing wolf kills by 1');
      }
    });
    //navigate("/forest"); // Return to forest after battle
  };

  if (forestBossEvent) {
    const handleNextEvent = () => {
      if (eventIndex < alphaEvents.length - 1) {
        setEventIndex(eventIndex + 1);
      } 
    };

    const alphaEvents = [
      "The remaining wolves stop attacking, watching you in silence.",
      "Danny cracks his knuckles, feeling unstoppable after taking them down.",
      "He notices the wolves exchanging glances... almost like they're waiting for something.",
      "A smirk creeps across his face. 'What, that's it? Guess no one here has the alpha mindset, huh?'",
      "The wolves shift uncomfortably, their ears twitching at his words.",
    ];

    const choices = [
      { text: "Yell out - 'Wow, you guys are weaker than my Tinder matches!'", nextScene: "/alpha-battle" },
      { text: "Shrug - 'Well, I gotta get back to leveling up to impress girls!'", nextScene: "/forest" }
    ];

    return (
      <div className='Forest-Event'>
        <TextBox text={alphaEvents[eventIndex]} />
      
        {eventIndex === alphaEvents.length - 1 ? (
          <Choices options={choices} onChoiceSelected={navigate} />
        ) : (
          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
        )}
      </div>
    );
  }

  return <Battle players={[stats]} enemies={[enemy]} onBattleEnd={handleBattleEnd} />;
}
