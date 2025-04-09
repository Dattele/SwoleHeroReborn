import React, { createContext, useContext, useState, useReducer } from 'react';
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
      'Former Gladiator from Stonejaw Hold. Big, muscular Beast',
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
    description: 'Prince of the fallen Kingdom of Feymore. Oozes out Charisma',
    abilities: knightClass.abilities[1],
    image: Javon,
    imageFace: JavonFace,
  };

  const initialState = {
    wolfKills: 0,
    gold: 0,
    inventory: [],
    party: [Danny, ethan, javon],
    goatState: { sightings: 0, },
    questFlags: {
      hasParty: false,
      edenGroveQuestGiven: false,
      edenGroveCleansed: false,
    },
  };

  const DannyReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_XP': {
        const xpGained = action.payload;
        return {
          ...state,
          party: state.party.map((member) => {
            return {
              ...member,
              xp: member.xp + xpGained,
            };
          }),
        }
      }
      case 'LEVEL_UP': {
        return {
          ...state,
          party: state.party.map((member) => 
            member.name === action.payload.name && 
            member.xp >= 100 * member.level
              ? {
                  ...member,
                  xp: 0,
                  level: member.level + 1,
                  hp: member.hp + action.payload.classData.statGrowth.hp,
                  strength: member.strength + action.payload.classData.statGrowth.strength,
                  defense: member.defense + action.payload.classData.statGrowth.defense,
                  speed: member.speed + action.payload.classData.statGrowth.speed,
                  rizz: member.rizz + action.payload.classData.statGrowth.rizz,
                }
              : member
          ),
        }
      }
      case 'SPEND_GOLD': {
        const spentGold = action.payload;
        return {
          ...state,
          gold: state.gold - spentGold
        }
      }
      case 'GAIN_GOLD': {
        const gainedGold = action.payload;
        return {
          ...state,
          gold: state.gold + gainedGold
        }
      }
      case 'ADD_ITEM': {
        const item = action.payload;
        const existingItem = state.inventory.find((i) => i.name === item.name);

        let updatedInventory;
        if (existingItem) {
          updatedInventory = state.inventory.map((i) =>
            i.name === item.name
              ? { ...i, quantity: (i.quantity || 1) + 1 }
              : i
          );
        } else {
          updatedInventory = [...state.inventory, { ...item, quantity: 1 }];
        }

        return {
          ...state,
          inventory: updatedInventory,
        }
      }
      case 'REMOVE_ITEM': {
        const itemToRemove = action.payload;

        const updatedInventory = state.inventory.map((item) => {
          if (item.name === itemToRemove.name) {
            if ((item.quantity || 1) > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null; // Removal
          }
          return item;
        }).filter(Boolean); // Removes null values

        return {
          ...state,
          inventory: updatedInventory,
        }
      }
      case 'ADD_PARTY_MEMBER': {
        const newMember = action.payload;
        return {
          ...state,
          party: [...state.party, newMember]
        }
      }
      case 'INCREMENT_GOAT': {
        return {
          ...state,
          goatState: {
            sightings: state.goatState.sightings + 1,
          }
        }
      }
      case 'INCREMENT_WOLF_KILLS': {
        return {
          ...state,
          wolfKills: state.wolfKills + 1,
        }
      }
      case 'UPDATE_QUEST_FLAG': {
        return {
          ...state,
          questFlags: {
            ...state.questFlags,
            [action.payload.flag]: action.payload.value,
          },
        };
      }
      default: {
        return state;
      }
    }
  }

  // const [wolfKills, setWolfKills] = useState(0);
  // const [gold, setGold] = useState(0);
  // const [inventory, setInventory] = useState([]);
  // const [party, setParty] = useState([Danny, ethan, javon]);
  // const [goatState, setGoatState] = useState({
  //   sightings: 0,
  // });
  // const [questFlags, setQuestFlags] = useState({
  //   hasParty: false,
  //   edenGroveQuestGiven: false,
  //   edenGroveCleansed: false,
  // });

  const [state, dispatch] = useReducer(DannyReducer, {
    ...initialState,
  });

  // Level Up Function
  // const levelUp = (name, classData) => {
  //   setParty((prevParty) =>
  //     prevParty.map((member) => {
  //       if (member.name === name && member.xp >= 100 * member.level) {
  //         return {
  //           ...member,
  //           xp: 0,
  //           level: member.level + 1,
  //           hp: member.hp + classData.statGrowth.hp,
  //           strength: member.strength + classData.statGrowth.strength,
  //           defense: member.defense + classData.statGrowth.defense,
  //           speed: member.speed + classData.statGrowth.speed,
  //           rizz: member.rizz + classData.statGrowth.rizz,
  //         };
  //       }
  //       return member;
  //     }),
  //   );
  // };
  const levelUp = (name, classData) => {
    dispatch({
      type: 'LEVEL_UP',
      payload: { name, classData },
    })
  }
 
  console.log('party', state.party);

  // Spend gold
  // const spendGold = (amount) => {
  //   if (gold >= amount) {
  //     setGold((prev) => prev - amount);
  //     return true;
  //   }
  //   return false;
  // };
  const spendGold = (amount) => {
    dispatch({
      type: 'SPEND_GOLD',
      payload: amount,
    })
  }

  // Gain gold
  const gainGold = (amount) => {
    dispatch({
      type: 'GAIN_GOLD',
      payload: amount,
    })
  }

  // Add item to party inventory
  // const addItem = (item) => {
  //   setInventory((prev) => {
  //     const existingItem = prev.find((i) => i.name === item.name);
  //     if (existingItem) {
  //       return prev.map((i) =>
  //         i.name === item.name ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
  //       );
  //     } else {
  //       return [...prev, { ...item, quantity: 1 }];
  //     }
  //   });
  // };
  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  // Removing an item - typically from using it
  const removeItem = (item) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    })
  }

  // Add a party member
  // const addPartyMember = (newMember) => {
  //   setParty((prev) => [...prev, newMember]);
  // };
  const addPartyMember = (newMember) => {
    dispatch({
      type: 'ADD_PARTY_MEMBER',
      payload: newMember,
    })
  }

  // Function to keep track of wolf kills
  // const incrementWolfKills = () => {
  //   setWolfKills((prev) => prev + 1);
  // };
  const incrementWolfKills = () => {
    dispatch({
      type: 'INCREMENT_WOLF_KILLS',
    })
  };

  // Keep track of the Goat sightings
  // const incrementGoatSightings = () => {
  //   setGoatState((prev) => prev + 1);
  // };
  const incrementGoatSightings = () => {
    dispatch({
      type: 'INCREMENT_GOAT',
    })
  };

  // Update your quests
  const updateQuestFlag = (flag, value) => {
    dispatch({
      type: 'UPDATE_QUEST_FLAG',
      payload: { flag, value },
    })
  };

  // Update everyone in the party's xp
  // const updateXP = (xpGained) => {
  //   setParty((prevParty) =>
  //     prevParty.map((member) => {
  //       return {
  //         ...member,
  //         xp: member.xp + xpGained,
  //       };
  //     }),
  //   );
  //   console.log('updated party xp', party);
  // };
  const updateXP = (xpGained) => {
    dispatch({
      type: 'UPDATE_XP',
      payload: xpGained,
    })
    console.log('updated party xp', state.party);
  };

  return (
    <DannyContext.Provider
      value={{
        ...state,
        levelUp,
        incrementWolfKills,
        addItem,
        removeItem,
        spendGold,
        gainGold,
        addPartyMember,
        incrementGoatSightings,
        updateXP,
        updateQuestFlag,
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
