import React, { useState } from 'react';
import Classes from '../Classes';

export default function Danny() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState({
    hp: 35,
    strength: 8,
    defense: 4,
    speed: 4,
    rizz: 2,
  });

  const classData = Classes.Bodybuilder; // Danny's class

  // Level up function
  const levelUp = () => {
    if (xp >= 100 * level) {
      setLevel(level + 1);
      setXp(0); // Reset XP after level up

      setStats((prevStats) => ({
        hp: prevStats.hp + classData.statGrowth.hp,
        strength: prevStats.strength + classData.statGrowth.strength,
        defense: prevStats.defense + classData.statGrowth.defense,
        speed: prevStats.speed + classData.statGrowth.speed,
        rizz: prevStats.rizz + classData.statGrowth.rizz,
      }));
    }
  };

  return (
    <div className='Character-Sheet'>
      <h2>Danny (Level {level})</h2>
      <p>Class: {classData.name}</p>
      <p>HP: {stats.hp}</p>
      <p>Strength: {stats.strength}</p>
      <p>Defense: {stats.defense}</p>
      <p>Speed: {stats.speed}</p>
      <p>Rizz: {stats.rizz}</p>
      <p>
        XP: {xp}/{100 * level}
      </p>

      <button onClick={levelUp}>Level Up</button>
    </div>
  );
}
