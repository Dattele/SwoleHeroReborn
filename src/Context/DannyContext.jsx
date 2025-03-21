import { createContext, useContext, useState } from 'react';
import Classes from '../Components/System/Classes';

import DanielFace from '../assets/images/DanielFace.png';

const DannyContext = createContext();

// Provide Context to the App
export function DannyProvider({ children }) {
  const bodyBuilderClass = Classes.Bodybuilder;

  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState({
    name: 'Danny',
    type: 'player',
    hp: 35,
    strength: 8,
    defense: 4,
    speed: 4,
    rizz: 2,
    class: bodyBuilderClass.name,
    description:
      'A man who can deadlift 400 lbs but has never lifted a single date',
    abilities: bodyBuilderClass.abilities[1],
    image: DanielFace,
  });
  const [wolfKills, setWolfKills] = useState(0);

  // Level Up Function
  const levelUp = () => {
    if (xp >= 100 * level) {
      setLevel(level + 1);
      setXp(0);
      setStats((prevStats) => ({
        hp: prevStats.hp + bodyBuilderClass.statGrowth.hp,
        strength: prevStats.strength + bodyBuilderClass.statGrowth.strength,
        defense: prevStats.defense + bodyBuilderClass.statGrowth.defense,
        speed: prevStats.speed + bodyBuilderClass.statGrowth.speed,
        rizz: prevStats.rizz + bodyBuilderClass.statGrowth.rizz,
      }));
    }
  };

  // Function to keep track of wolf kills
  const incrementWolfKills = () => {
    setWolfKills((prev) => prev + 1);
  };

  return (
    <DannyContext.Provider
      value={{ stats, level, xp, levelUp, wolfKills, incrementWolfKills }}
    >
      {children}
    </DannyContext.Provider>
  );
}

// Custom Hook to Use Danny’s Data
export function useDanny() {
  return useContext(DannyContext);
}
