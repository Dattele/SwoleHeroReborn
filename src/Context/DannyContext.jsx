import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
    maxHP: 35,
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
    maxHP: 45,
    hp: 45,
    strength: 4,
    defense: 8,
    speed: 2,
    rizz: 1,
    class: barbarianClass.name,
    description: 'Former Gladiator from Stonejaw Hold - Big, Muscular Beast',
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
    maxHP: 35,
    hp: 35,
    strength: 5,
    defense: 5,
    speed: 6,
    rizz: 8,
    class: knightClass.name,
    description: 'Prince of the fallen Kingdom of Feymore - Oozes out Charisma',
    abilities: knightClass.abilities[1],
    image: Javon,
    imageFace: JavonFace,
  };

  const initialState = {
    wolfKills: 0,
    gold: 0,
    inventory: [],
    party: [Danny, ethan, javon],
    goatState: { sightings: 0 },
    questFlags: {},
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
        };
      }
      case 'UPDATE_HP': {
        const players = action.payload;
        console.log('playerrs passed in at end of battle', players);
        return {
          ...state,
          party: state.party.map((member) => {
            const player = players.find((p) => p.name === member.name);
            console.log('player found', player);
            return {
              ...member,
              hp: player?.hp ?? 0,
            };
          }),
        };
      }
      case 'INCREASE_HP': {
        const { player, amount } = action.payload;
        console.log('player and amount', player, amount);
        return {
          ...state,
          party: state.party.map((member) => {
            if (member.name === player.name) {
              const newHP = Math.min(member.maxHP, member.hp + amount);
              console.log('newHP', newHP);
              return {
                ...member,
                hp: newHP,
              };
            } else return member;
          }),
        };
      }
      case 'DECREASE_HP': {
        const { player, amount } = action.payload;
        return {
          ...state,
          party: state.party.map((member) => {
            if (member.name === player.name) {
              const newHP = Math.max(member.hp - amount, 0);
              return {
                ...member,
                hp: newHP,
              };
            } else return member;
          }),
        };
      }
      case 'RESTORE_PARTY_HP': {
        return {
          ...state,
          party: state.party.map((member) => ({
            ...member,
            hp: member.maxHP,
          })),
        };
      }
      case 'LEVEL_UP': {
        return {
          ...state,
          party: state.party.map((member) =>
            member.name === action.payload.name &&
            member.xp >= 50 * member.level
              ? {
                  ...member,
                  xp: 0,
                  level: member.level + 1,
                  maxHP:
                    member.maxHP + action.payload.classData.statGrowth.maxHP,
                  hp: member.hp + action.payload.classData.statGrowth.hp,
                  strength:
                    member.strength +
                    action.payload.classData.statGrowth.strength,
                  defense:
                    member.defense +
                    action.payload.classData.statGrowth.defense,
                  speed:
                    member.speed + action.payload.classData.statGrowth.speed,
                  rizz: member.rizz + action.payload.classData.statGrowth.rizz,
                }
              : member,
          ),
        };
      }
      case 'SPEND_GOLD': {
        const spentGold = action.payload;
        return {
          ...state,
          gold: state.gold - spentGold,
        };
      }
      case 'GAIN_GOLD': {
        const gainedGold = action.payload;
        return {
          ...state,
          gold: state.gold + gainedGold,
        };
      }
      case 'ADD_ITEM': {
        const item = action.payload;
        const existingItem = state.inventory.find((i) => i.name === item.name);

        let updatedInventory;
        if (existingItem) {
          updatedInventory = state.inventory.map((i) =>
            i.name === item.name
              ? { ...i, quantity: (i.quantity || 1) + 1 }
              : i,
          );
        } else {
          updatedInventory = [...state.inventory, { ...item, quantity: 1 }];
        }

        return {
          ...state,
          inventory: updatedInventory,
        };
      }
      case 'REMOVE_ITEM': {
        const itemToRemove = action.payload;

        const updatedInventory = state.inventory
          .map((item) => {
            if (item.name === itemToRemove.name) {
              if ((item.quantity || 1) > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return null;
            }
            return item;
          })
          .filter(Boolean); // Removes null values

        return {
          ...state,
          inventory: updatedInventory,
        };
      }
      case 'ADD_PARTY_MEMBER': {
        const newMember = action.payload;
        return {
          ...state,
          party: [...state.party, newMember],
        };
      }
      case 'INCREMENT_GOAT': {
        return {
          ...state,
          goatState: {
            sightings: state.goatState.sightings + 1,
          },
        };
      }
      case 'INCREMENT_WOLF_KILLS': {
        return {
          ...state,
          wolfKills: state.wolfKills + 1,
        };
      }
      case 'UPDATE_QUEST_FLAG': {
        const { flag, value } = action.payload;
        return {
          ...state,
          questFlags: {
            ...state.questFlags,
            [flag]: value,
          },
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(DannyReducer, {
    ...initialState,
  });

  console.log('party', state.party);
  console.log('gold', state.gold);

  // Level Up Function
  const levelUp = (name, classData) => {
    dispatch({
      type: 'LEVEL_UP',
      payload: { name, classData },
    });
  };

  // Spend gold
  const spendGold = (amount) => {
    if (state.gold >= amount) {
      dispatch({
        type: 'SPEND_GOLD',
        payload: amount,
      });
    }
  };

  // Gain gold
  const gainGold = (amount) => {
    dispatch({
      type: 'GAIN_GOLD',
      payload: amount,
    });
    console.log('party has gained gold -', amount);
  };

  // Add item to party inventory
  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  // Using an item
  const useItem = (player, item) => {
    console.log('use item - player and item', player, item);
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    });
    if (item.hasOwnProperty('heal')) {
      const amount = item.heal;
      console.log('heal', amount);
      dispatch({
        type: 'INCREASE_HP',
        payload: { player, amount },
      });
    }
  };

  // Add a party member
  const addPartyMember = (newMember) => {
    dispatch({
      type: 'ADD_PARTY_MEMBER',
      payload: newMember,
    });
  };

  // Function to keep track of wolf kills
  const incrementWolfKills = () => {
    dispatch({
      type: 'INCREMENT_WOLF_KILLS',
    });
  };

  // Keep track of the Goat sightings
  const incrementGoatSightings = () => {
    dispatch({
      type: 'INCREMENT_GOAT',
    });
  };

  // Update your quests
  const updateQuestFlag = (flag, value) => {
    dispatch({
      type: 'UPDATE_QUEST_FLAG',
      payload: { flag, value },
    });
  };

  // Update everyone in the party's xp
  const updateXP = (xpGained) => {
    dispatch({
      type: 'UPDATE_XP',
      payload: xpGained,
    });
    console.log('updated party xp', state.party);

    // state.party.forEach((member) => {
    //   levelUp(member.name, member.classData)
    // })
    levelUp('Danny', bodyBuilderClass);
    levelUp("Ja'von, the Rizzler", knightClass);
    levelUp('Ethan, the Brute', barbarianClass);
  };

  // Update everyone in the party's hp
  const updateHP = (combatants) => {
    const players = combatants.filter((e) => e.type === 'player');
    dispatch({
      type: 'UPDATE_HP',
      payload: players,
    });
    console.log('updated party hp', state.party);
  };

  // Decrease the specified player's HP
  const decreaseHP = (player, amount) => {
    dispatch({
      type: 'DECREASE_HP',
      payload: { player, amount },
    });
    console.log("decreasing part member's hp", state.party);
  };

  // Restore every party member to full HP
  const restorePartyHP = () => {
    dispatch({
      type: 'RESTORE_PARTY_HP',
    });
  };

  // Creating a useEffect to pass my functions into the window to be used for testing
  useEffect(() => {
    window.levelUp = levelUp;
    window.spendGold = spendGold;
    window.gainGold = gainGold;
    window.addItem = addItem;
    window.useItem = useItem;
    window.addPartyMember = addPartyMember;
    window.incrementWolfKills = incrementWolfKills;
    window.updateQuestFlag = updateQuestFlag;
    window.updateXP = updateXP;
    window.updateHP = updateHP;
    window.decreaseHP = decreaseHP;
    window.restorePartyHP = restorePartyHP;
    window.Classes = Classes;
  }, []);

  return (
    <DannyContext.Provider
      value={{
        ...state,
        levelUp,
        incrementWolfKills,
        addItem,
        useItem,
        spendGold,
        gainGold,
        addPartyMember,
        incrementGoatSightings,
        updateXP,
        updateHP,
        decreaseHP,
        restorePartyHP,
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
