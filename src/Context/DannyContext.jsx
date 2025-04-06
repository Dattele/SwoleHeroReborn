import { createContext, useContext, useState } from 'react';
import Classes from '../Components/System/Classes';

import Daniel from '../assets/images/Daniel.jpeg';
import DanielFace from '../assets/images/DanielFace.png';

import Ethan from '../assets/images/Ethan.png';
import EthanFace from '../assets/images/EthanFace.png';
import Javon from '../assets/images/Javon.png';
import JavonFace from '../assets/images/JavonFace.png';

const DannyContext = createContext();

// Provide Context to the App
export function DannyProvider({ children }) {
  const bodyBuilderClass = Classes.Bodybuilder;

  const Danny = {
    name: 'Danny',
    type: 'player',
    level: 1,
    xp: 0,
    hp: 35,
    strength: 8,
    defense: 4,
    speed: 4,
    rizz: 2,
    class: bodyBuilderClass.name,
    description:
      'A man who can deadlift 400 lbs but has never lifted a single date',
    abilities: bodyBuilderClass.abilities[1],
    image: Daniel,
    imageFace: DanielFace,
  };

  const barbarianClass = Classes.Barbarian;
  const ethan = {
    name: 'Ethan, the Brute',
    type: 'player',
    level: 1,
    xp: 0,
    hp: 50,
    strength: 4,
    defense: 8,
    speed: 2,
    rizz: 1,
    class: barbarianClass.name,
    description:
      'Former Pit fighter from Stonejaw Hold - Fallen to the Demon King',
    abilities: barbarianClass.abilities[1],
    image: Ethan,
    imageFace: EthanFace,
  };

  const knightClass = Classes.Knight;
  const javon = {
    name: "Ja'von, the Rizzler",
    type: 'player',
    level: 1,
    xp: 0,
    hp: 35,
    strength: 5,
    defense: 5,
    speed: 6,
    rizz: 8,
    class: knightClass.name,
    description: 'Prince of the fallen Kingdom of Feymore. Oozes out Charisma.',
    abilities: knightClass.abilities[1],
    image: Javon,
    imageFace: JavonFace,
  };

  //const [level, setLevel] = useState(1);
  // const [xp, setXp] = useState(0);
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
  const [gold, setGold] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState([Danny, ethan, javon]);
  const [goatState, setGoatState] = useState({
    sightings: 0,
  });
  const [questFlags, setQuestFlags] = useState({
    hasParty: false,
    edenGroveQuestGiven: false,
    edenGroveCleansed: false,
  });

  // Level Up Function
  const levelUp = (name, classData) => {
    setParty((prevParty) =>
      prevParty.map((member) => {
        if (member.name === name && member.xp >= 100 * member.level) {
          return {
            ...member,
            xp: 0,
            level: member.level + 1,
            hp: member.hp + classData.statGrowth.hp,
            strength: member.strength + classData.statGrowth.strength,
            defense: member.defense + classData.statGrowth.defense,
            speed: member.speed + classData.statGrowth.speed,
            rizz: member.rizz + classData.statGrowth.rizz,
          };
        }
        return member;
      }),
    );
  };
 
  console.log('party', party);

  // Spend gold
  const spendGold = (amount) => {
    if (gold >= amount) {
      setGold((prev) => prev - amount);
      return true;
    }
    return false;
  };

  // Add item to party inventory
  const addItem = (item) => {
    setInventory((prev) => {
      const existingItem = prev.find((i) => i.name === item.name);
      if (existingItem) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Add a party member
  const addPartyMember = (newMember) => {
    setParty((prev) => [...prev, newMember]);
  };

  // Function to keep track of wolf kills
  const incrementWolfKills = () => {
    setWolfKills((prev) => prev + 1);
  };

  // Keep track of the Goat sightings
  const incrementGoatSightings = () => {
    setGoatState((prev) => prev + 1);
  };

  // Update your quests
  const updateQuestFlag = (flag, value) => {
    setQuestFlags((prev) => ({
      ...prev,
      [flag]: value,
    }));
  };

  return (
    <DannyContext.Provider
      value={{
        stats,
        levelUp,
        wolfKills,
        incrementWolfKills,
        gold,
        inventory,
        addItem,
        spendGold,
        party,
        addPartyMember,
        goatState,
        incrementGoatSightings,
      }}
    >
      {children}
    </DannyContext.Provider>
  );
}

// Custom Hook to Use Danny’s Data
export function useDanny() {
  return useContext(DannyContext);
}
