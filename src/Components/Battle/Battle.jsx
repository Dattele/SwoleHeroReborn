import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDanny } from '../../Context/DannyContext';

import TargetSelection from './TargetSelection';
import TargetSelectionAlly from './TargetSelectionAlly';

import death from '../../assets/sounds/death.mp3';
import fortniteDeath from '../../assets/sounds/fortnite-death.mp3';
import yodaDeath from '../../assets/sounds/lego-yoda-death.mp3';
import marioDeath from '../../assets/sounds/mario-death.mp3';
import minecraftDeath from '../../assets/sounds/minecraft-death.mp3';
import minecraftHorse from '../../assets/sounds/minecraft-horse-death.mp3';
import phasDeath from '../../assets/sounds/phas-death.mp3';
import robloxDeath from '../../assets/sounds/roblox-death.mp3';
import rotmgDeath from '../../assets/sounds/rotmg-death.mp3';
import stormDeath from '../../assets/sounds/stormtrooper-death.mp3';
import warioDeath from '../../assets/sounds/wario-death.mp3';
import werehogDeath from '../../assets/sounds/werehog-death.mp3';

import './Battle.scss';
import '../../scss/All.scss';

export default function Battle({ players, enemies, onBattleEnd = null }) {
  const { updateXP, updateHP, gainGold } = useDanny();

  const deathSounds = [
    death,
    fortniteDeath,
    yodaDeath,
    marioDeath,
    minecraftDeath,
    minecraftHorse,
    phasDeath,
    robloxDeath,
    rotmgDeath,
    stormDeath,
    warioDeath,
    werehogDeath,
  ];

  const logRef = useRef(null);
  const lastEntryRef = useRef(null); // Ref for the last log entry
  const hasEnded = useRef(false); // Ref for checking when the battle is over

  const playersClone = structuredClone(players).map((player) => ({
    ...player,
    id: uuidv4(),
    statusEffects: [],
  }));
  const enemiesClone = structuredClone(enemies).map((enemy) => ({
    ...enemy,
    id: uuidv4(),
    statusEffects: [],
  }));

  // Play a death sound audio
  const playRandomDeathSound = () => {
    const randomSound =
      deathSounds[Math.floor(Math.random() * deathSounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 0.3;
    audio.play();
  };

  const initialState = {
    turnOrder: [...playersClone, ...enemiesClone].sort(
      (a, b) => b.speed - a.speed,
    ),
    turnIndex: 0,
    battleLog: [],
    isTargetingAlly: false,
    isTargetingEnemy: false,
    selectedAttack: {},
    xpGained: 0,
    goldGained: 0,
    deadEnemies: [],
    isEnemyTurn: null,
    battleOutcome: null,
    activePlayerIndex: 0,
    skipTurn: false,
  };

  const BattleReducer = (state, action) => {
    switch (action.type) {
      case 'END_BATTLE': {
        return { ...state, battleOutcome: action.payload };
      }
      case 'NEXT_TURN': {
        console.log('next turn alive turn order', state.turnOrder);
        const nextTurnIndex = (state.turnIndex + 1) % state.turnOrder.length;
        const nextFighter = state.turnOrder[nextTurnIndex];
        let updatedTurnOrder = [...state.turnOrder];
        let logs = [];
        let skipTurn = false;
        console.log('next turn combatant:', state.turnOrder[nextTurnIndex]);

        // Check to see if the active fighter has the stun effect
        const stunEffect = nextFighter.statusEffects.findIndex(
          (e) => e.type === 'stun',
        );

        if (stunEffect !== -1) {
          // Fighter is stunned: log it, then decrement/remove stun
          logs.push(`${nextFighter.name} is stunned and can't move!`);

          const newEffects = [...nextFighter.statusEffects];
          if (newEffects[stunEffect].turns <= 1) {
            newEffects.splice(stunEffect, 1);
          } else {
            newEffects[stunEffect].turns -= 1;
          }

          updatedTurnOrder = updatedTurnOrder.map((element, id) =>
            id === nextTurnIndex
              ? { ...element, statusEffects: newEffects }
              : element,
          );

          // Update the skipTurn to true
          skipTurn = true;
        }

        // Increase player index if the fighter was a player
        let playerIndex = state.activePlayerIndex;
        if (nextFighter.type === 'player') {
          const alivePlayers = state.turnOrder.filter(
            (p) => p.type === 'player' && p.hp > 0,
          );
          playerIndex = alivePlayers.findIndex((p) => p.id === nextFighter.id);
        }

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          turnIndex: nextTurnIndex,
          battleLog: [...state.battleLog, ...logs],
          isEnemyTurn: nextFighter.type === 'enemy',
          activePlayerIndex: playerIndex,
          skipTurn: skipTurn,
        };
      }
      case 'HANDLE_ATTACK': {
        const { attacker, attack, target, ignoreDefense } = action.payload;
        let newLog;

        // Calculate damage
        let damage = attack?.damage;
        let addDamage = Math.floor(attacker?.strength / 2);
        if (!ignoreDefense) addDamage -= Math.floor(target?.defense / 2);
        damage += addDamage;

        // Critical hit chance
        const critChance = 2 + attacker.rizz;
        const isCrit = Math.random() * 100 < critChance;

        if (isCrit) {
          damage = Math.floor(damage * 1.5);
          newLog = `🔥 CRITICAL HIT 🔥 ${attacker.name} unleashes a devastating ${attack.name} attack on ${target.name} for ${damage} damage!`;
        } else {
          newLog = `${attacker.name} POUNDS ${target.name} for ${damage} damage with ${attack.name}!`;
        }

        let updatedTurnOrder = state.turnOrder.map((element) =>
          element.id === target.id
            ? { ...element, hp: Math.max(0, element.hp - damage) }
            : element,
        );

        // Getting the nextTurnIndex
        let nextTurnIndex = state.turnIndex;

        // Subtract 1 from the nextTurnIndex if someone died that goes before the current fighter in the turn order
        const targetIndex = updatedTurnOrder.findIndex(
          (e) => e.id === target.id,
        );
        if (target.hp - damage <= 0 && targetIndex < nextTurnIndex) {
          nextTurnIndex = state.turnIndex - 1;
          console.log('target died and next turnIndex is now', nextTurnIndex);
        }

        updatedTurnOrder = updatedTurnOrder.filter((element) => element.hp > 0); // Remove the dead enemies/players

        // Add to deathLog
        let deathLog;
        if (updatedTurnOrder.length < state.turnOrder.length) {
          playRandomDeathSound();
          if (attacker.name === 'Danny') {
            deathLog = `${target.name} has been crushed by ${attacker.name}'s massive Biceps! 💀`;
          } else {
            deathLog = `${target.name} has been slaughtered by ${attacker.name}! 💀`;
          }
        }

        // Add an xp log and add to xp if an enemy died
        // Also add the gold gained to the party and to the xpLog
        let xpLog;
        let xp = state.xpGained;
        let gold = state.goldGained;
        if (
          updatedTurnOrder.length < state.turnOrder.length &&
          target.type === 'enemy'
        ) {
          xp += Math.floor(target.xp / players.length);
          gold += target.gold;
          xpLog = `Party members have gained ${Math.floor(target.xp / players.length)} xp and ${target.gold} gold!`;
        }

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          turnIndex: nextTurnIndex,
          battleLog: deathLog
            ? [...state.battleLog, newLog, deathLog, xpLog]
            : [...state.battleLog, newLog],
          xpGained: xp,
          goldGained: gold,
        };
      }
      case 'HANDLE_ATTACK_ALL': {
        const { attacker, attack } = action.payload;

        // Initializing the log, xp, gold, nextTurnIndex, and turnOrder variables
        let updatedTurnOrder = [...state.turnOrder];
        let nextTurnIndex = state.turnIndex;
        let logs = [];
        let xp = state.xpGained;
        let gold = state.goldGained;

        // Determine if attacking the players or the enemies
        const isTargetingPlayers = attacker.type === 'enemy';
        const targets = updatedTurnOrder.filter((target) =>
          isTargetingPlayers
            ? target.type === 'player'
            : target.type === 'enemy',
        );

        for (const target of targets) {
          // Calculate damage
          let damage = attack?.damage;
          const addDamage =
            Math.floor(attacker?.strength / 2) -
            Math.floor(target?.defense / 2);
          damage += addDamage;

          // Critical hit chance
          const critChance = 2 + attacker.rizz;
          const isCrit = Math.random() * 100 < critChance;

          if (isCrit) {
            damage = Math.floor(damage * 1.5);
            logs.push(
              `🔥 CRITICAL HIT 🔥 ${attacker.name} unleashes a devastating ${attack.name} attack on ${target.name} for ${damage} damage!`,
            );
          } else {
            logs.push(
              `${attacker.name} POUNDS ${target.name} for ${damage} damage with ${attack.name}!`,
            );
          }

          // Update the HP of the target that got hit
          updatedTurnOrder = updatedTurnOrder.map((element) =>
            element.id === target.id
              ? { ...element, hp: Math.max(0, element.hp - damage) }
              : element,
          );

          // Subtract 1 from the nextTurnIndex if someone died that goes before the current fighter in the turn order
          const targetIndex = updatedTurnOrder.findIndex(
            (e) => e.id === target.id,
          );
          if (target.hp - damage <= 0 && targetIndex < nextTurnIndex) {
            nextTurnIndex = state.turnIndex - 1;
            console.log('target died and next turnIndex is now', nextTurnIndex);
          }

          // Remove the dead enemies/players
          updatedTurnOrder = updatedTurnOrder.filter(
            (element) => element.hp > 0,
          );

          // Add to deathLog
          if (updatedTurnOrder.length < state.turnOrder.length) {
            playRandomDeathSound();
            if (attacker.name === 'Danny') {
              logs.push(
                `${target.name} has been crushed by ${attacker.name}'s massive Biceps! 💀`,
              );
            } else {
              logs.push(
                `${target.name} has been slaughtered by ${attacker.name}! 💀`,
              );
            }
          }

          // Gain xp and gold if an enemy is killed
          if (
            updatedTurnOrder.length < state.turnOrder.length &&
            target.type === 'enemy'
          ) {
            xp += Math.floor(target.xp / players.length);
            gold += target.gold;
            logs.push(
              `Party members have gained ${Math.floor(target.xp / players.length)} xp and ${target.gold} gold!`,
            );
          }
        }

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          turnIndex: nextTurnIndex,
          battleLog: [...state.battleLog, ...logs],
          xpGained: xp,
          goldGained: gold,
        };
      }
      case 'HANDLE_BUFF': {
        const { attacker, attack, target } = action.payload;
        const effects = attack.effect.split(',').map((e) => e.trim());

        const applyBuff = (ally) => {
          let newStats = { ...ally };

          effects.forEach((effect) => {
            if (effect.includes('strength'))
              newStats.strength +=
                parseInt(effect.replace('strength', ',', '').trim()) || 0;
            if (effect.includes('defense'))
              newStats.defense +=
                parseInt(effect.replace('defense', ',', '').trim()) || 0;
            if (effect.includes('speed'))
              newStats.speed +=
                parseInt(effect.replace('speed', ',', '').trim()) || 0;
            if (effect.includes('rizz'))
              newStats.rizz +=
                parseInt(effect.replace('rizz', ',', '').trim()) || 0;
          });

          return newStats;
        };

        const updatedTurnOrder = state.turnOrder.map((element) =>
          element.id === target.id ? applyBuff(element) : element,
        );

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          battleLog: [
            ...state.battleLog,
            `${target.name} has received a buff of ${attack.effect} from ${attacker.name}`,
          ],
        };
      }
      case 'HANDLE_SMASH': {
        const { attacker, attack, target } = action.payload;

        // If the attack is a debuff then set true - else false
        const debuff = attack.effect.includes('-');

        // Initializing the log, xp, gold, nextTurnIndex, and turnOrder variables
        let updatedTurnOrder = [...state.turnOrder];
        let nextTurnIndex = state.turnIndex;
        let logs = [];
        let xp = state.xpGained;
        let gold = state.goldGained;

        // Calculate damage
        let damage = attack?.damage;
        const addDamage =
          Math.floor(attacker?.strength / 2) - Math.floor(target?.defense / 2);
        damage += addDamage;
        damage = Math.max(0, damage); // Ensure attack doesn't go below 0 damage

        // Critical hit chance
        const critChance = 2 + attacker.rizz;
        const isCrit = Math.random() * 100 < critChance;

        if (isCrit) {
          damage = Math.floor(damage * 1.5);
          logs.push(
            `🔥 CRITICAL HIT 🔥 ${attacker.name} unleashes a devastating ${attack.name} attack on ${target.name} for ${damage} damage!`,
          );
        } else {
          logs.push(
            `${attacker.name} POUNDS ${target.name} for ${damage} damage with ${attack.name}!`,
          );
        }

        // If its a debuff log the action to the enemy, if buff log the action to yourself
        if (debuff) {
          logs.push(`${target.name} receives a debuff of ${attack.effect}!`);
        } else {
          logs.push(`${attacker.name} receives a buff of ${attack.effect}!`);
        }

        // Update the HP of the target that got hit
        const updatedHP = Math.max(0, target.hp - damage);
        updatedTurnOrder = updatedTurnOrder.map((element) =>
          element.id === target.id ? { ...element, hp: updatedHP } : element,
        );

        // Subtract 1 from the nextTurnIndex if someone died that goes before the current fighter in the turn order
        const targetIndex = updatedTurnOrder.findIndex(
          (e) => e.id === target.id,
        );
        if (updatedHP === 0 && targetIndex < nextTurnIndex) {
          nextTurnIndex = state.turnIndex - 1;
          console.log('target died and next turnIndex is now', nextTurnIndex);
        }

        // Peform these actions when target has been killed
        if (updatedHP === 0) {
          playRandomDeathSound();

          // Add to deathLog
          if (attacker.name === 'Danny') {
            logs.push(
              `${target.name} has been crushed by ${attacker.name}'s massive Biceps! 💀`,
            );
          } else {
            logs.push(
              `${target.name} has been slaughtered by ${attacker.name}! 💀`,
            );
          }

          // If target is an enemy, gain xp and gold
          if (target.type === 'enemy') {
            xp += Math.floor(target.xp / players.length);
            gold += target.gold;
            logs.push(
              `Party members have gained ${Math.floor(target.xp / players.length)} xp and ${target.gold} gold!`,
            );
          }
        }

        // Apply the debuff to the target/attacker
        const effects = attack.effect.split(',').map((e) => e.trim());

        const applyBuff = (ally) => {
          let newStats = { ...ally };

          effects.forEach((effect) => {
            if (effect.includes('strength'))
              newStats.strength +=
                parseInt(effect.replace('strength', ',', '').trim()) || 0;
            if (effect.includes('defense'))
              newStats.defense +=
                parseInt(effect.replace('defense', ',', '').trim()) || 0;
            if (effect.includes('speed'))
              newStats.speed +=
                parseInt(effect.replace('speed', ',', '').trim()) || 0;
            if (effect.includes('rizz'))
              newStats.rizz +=
                parseInt(effect.replace('rizz', ',', '').trim()) || 0;
          });

          return newStats;
        };

        // If debuff apply the effect to the enemy, if buff apply to attacker
        if (debuff) {
          updatedTurnOrder = updatedTurnOrder.map((element) =>
            element.id === target.id ? applyBuff(element) : element,
          );
        } else {
          updatedTurnOrder = updatedTurnOrder.map((element) =>
            element.id === attacker.id ? applyBuff(element) : element,
          );
        }
        console.log('updatedTurnOrder after buff/debuff', updatedTurnOrder);

        // Remove the dead enemies/players
        updatedTurnOrder = updatedTurnOrder.filter((element) => element.hp > 0);

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          turnIndex: nextTurnIndex,
          battleLog: [...state.battleLog, ...logs],
          xpGained: xp,
          goldGained: gold,
        };
      }
      case 'HANDLE_HEAL': {
        const { attacker, attack, target } = action.payload;
        const heal = attack.heal;
        const isEnemy = attacker.type === 'enemy';

        console.log('enemies in HANDLE_HEAL', enemies);
        console.log('logging the target', target);
        console.log('total heal', heal);
        console.log('loggin the attacker', attacker);

        let originalHP = isEnemy
          ? enemies.find((e) => e?.name === target?.name)
          : players.find((p) => p?.name === target?.name);

        const updatedTurnOrder = state.turnOrder.map((element) =>
          element.id === target.id
            ? { ...element, hp: Math.min(originalHP.hp, target.hp + heal) }
            : element,
        );

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          battleLog: [
            ...state.battleLog,
            `${attacker.name} healed ${target.name} for ${heal} hp`,
          ],
        };
      }
      case 'APPLY_STUN': {
        const { target, duration } = action.payload;
        // Adding the stun status effect to the target
        const updatedTurnOrder = state.turnOrder.map((element) =>
          element.id === target.id
            ? {
                ...element,
                statusEffects: [
                  ...target.statusEffects,
                  { type: 'stun', turns: duration },
                ],
              }
            : element,
        );

        // Add the stun to the logs
        const log = `${target.name} has been put in a stun-lock for ${duration} turn. Good luck buddy!`;

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          battleLog: [...state.battleLog, log],
        };
      }
      case 'SET_TARGETING': {
        return {
          ...state,
          isTargetingEnemy: action.payload.enemy,
          isTargetingAlly: action.payload.ally,
        };
      }
      case 'SELECT_ATTACK': {
        const { attack } = action.payload;
        return {
          ...state,
          selectedAttack: attack,
        };
      }
      case 'CHECK_WIN_CONDITIONS': {
        const aliveCombatants = state.turnOrder.filter(
          (element) => element.hp > 0,
        );

        const aliveEnemies = aliveCombatants.filter(
          (element) => element.type === 'enemy',
        );
        const alivePlayers = aliveCombatants.filter(
          (element) => element.type === 'player',
        );

        let outcome = null;

        console.log('Check end - EnemyHPs', aliveEnemies);
        console.log('Check end - playerHPs', alivePlayers);

        if (aliveEnemies.length === 0) outcome = 'win';
        if (alivePlayers.length === 0) outcome = 'lose';

        return {
          ...state,
          battleOutcome: outcome,
          turnOrder: aliveCombatants,
        };
      }
      case 'ADD_ENEMY': {
        const newEnemy = action.payload;
        newEnemy.id = uuidv4();

        const updatedTurnOrder = [...state.turnOrder, newEnemy].sort(
          (a, b) => b.speed - a.speed,
        );
        console.log(updatedTurnOrder);

        return {
          ...state,
          turnOrder: updatedTurnOrder,
          battleLog: [
            ...state.battleLog,
            `${newEnemy.name} has been summoned into battle!`,
          ],
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(BattleReducer, {
    ...initialState,
  });

  /** Helper Functions */

  // Sets a timeout to wait before performing any other actions
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Function to advance turn
  const NextTurn = useCallback(() => {
    if (state.battleOutcome) return;

    dispatch({
      type: 'NEXT_TURN',
    });
  }, [state.battleOutcome]);

  // Adding an enemy to battle
  const AddEnemyToBattle = (newEnemy) => {
    dispatch({
      type: 'ADD_ENEMY',
      payload: newEnemy,
    });
  };

  // Select enemy to attack
  const SelectTarget = (attack) => {
    // Get selected attack
    dispatch({ type: 'SELECT_ATTACK', payload: { attack } });

    if (
      attack.type === 'attack' ||
      attack.type === 'smash' ||
      attack.type === 'drain' ||
      attack.type === 'attack-all' ||
      attack.type === 'attack-def' ||
      attack.type === 'attack-stun'
    ) {
      dispatch({
        type: 'SET_TARGETING',
        payload: { enemy: true, ally: false },
      });
    } else {
      dispatch({
        type: 'SET_TARGETING',
        payload: { enemy: false, ally: true },
      });
    }
  };

  // Handling clicking on a target
  const HandleTargetSelection = (target) => {
    // Close pop-up
    dispatch({ type: 'SET_TARGETING', payload: { enemy: false, ally: false } });

    // Execute attack after the modal closes
    const { selectedAttack } = state;

    if (selectedAttack.type === 'attack' && target) {
      HandleAttack(selectedAttack, target);
    } else if (selectedAttack.type === 'buff' && target) {
      HandleBuff(selectedAttack, target);
    } else if (selectedAttack.type === 'heal' && target) {
      HandleHeal(selectedAttack, target);
    } else if (selectedAttack.type === 'smash' && target) {
      HandleSmash(selectedAttack, target);
    } else if (selectedAttack.type === 'group-buff') {
      state.turnOrder
        .filter((player) => player.type === 'player')
        .forEach((playerTarget) => {
          HandleBuff(selectedAttack, playerTarget);
        });
    } else if (selectedAttack.type === 'chug' && target) {
      HandleChug(selectedAttack, target);
    } else if (selectedAttack.type === 'attack-all') {
      HandleAttackAll(selectedAttack);
    } else if (selectedAttack.type === 'attack-def' && target) {
      HandleAttack(selectedAttack, target, true);
    } else if (selectedAttack.type === 'attack-stun' && target) {
      HandleStunAttack(
        selectedAttack,
        target,
        selectedAttack?.chance,
        selectedAttack?.duration,
      );
    }

    // Reset attack state
    dispatch({ type: 'SELECT_ATTACK', payload: {} });

    const goNextTurn = async () => {
      await sleep(2000);
      NextTurn();
    };
    goNextTurn();
  };

  /** Main Functions */

  // Handle player attack
  const HandleAttack = useCallback(
    (attack, target, ignoreDefense = false) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching an attack
      dispatch({
        type: 'HANDLE_ATTACK',
        payload: { attacker, attack, target, ignoreDefense },
      });

      // Check if battle has ended
      CheckBattleEnd();
    },
    [state],
  );

  const HandleBuff = useCallback(
    (attack, target) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching a buff
      dispatch({
        type: 'HANDLE_BUFF',
        payload: { attacker, attack, target },
      });
    },
    [state],
  );

  const HandleHeal = useCallback(
    (attack, target) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching a heal
      dispatch({
        type: 'HANDLE_HEAL',
        payload: { attacker, attack, target },
      });
    },
    [state],
  );

  const HandleLifeDrain = useCallback(
    (attack, target, ignoreDefense = false) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      const attackerCopy = { ...attacker };

      if (!attacker) return;

      // Dispatching an attack and heal for Life Drain
      dispatch({
        type: 'HANDLE_ATTACK',
        payload: { attacker, attack, target, ignoreDefense },
      });
      dispatch({
        type: 'HANDLE_HEAL',
        payload: { attacker, attack, target: attackerCopy },
      });
    },
    [state],
  );

  const HandleSmash = useCallback(
    (attack, target) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching an attack then a debuff on target
      dispatch({
        type: 'HANDLE_SMASH',
        payload: { attacker, attack, target },
      });

      // Check if battle has ended
      CheckBattleEnd();
    },
    [state],
  );

  const HandleChug = useCallback(
    (attack, target) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching an heal then a buff on target
      dispatch({
        type: 'HANDLE_HEAL',
        payload: { attacker, attack, target },
      });
      dispatch({
        type: 'HANDLE_BUFF',
        payload: { attacker, attack, target },
      });
    },
    [state],
  );

  const HandleAttackAll = useCallback(
    (attack) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatch an attack to every enemy
      dispatch({
        type: 'HANDLE_ATTACK_ALL',
        payload: { attacker, attack },
      });

      // Check if battle has ended
      CheckBattleEnd();
    },
    [state],
  );

  const HandleStunAttack = useCallback(
    (attack, target, stunChance = 0.25, duration = 1) => {
      const { turnOrder, turnIndex } = state;
      const attacker = turnOrder[turnIndex]; // Get the current attacker

      if (!attacker) return;

      // Dispatching an attack and heal for Life Drain
      dispatch({
        type: 'HANDLE_ATTACK',
        payload: { attacker, attack, target },
      });

      // If stun succeeds, then apply the stun
      if (Math.random() < stunChance)
        dispatch({
          type: 'APPLY_STUN',
          payload: { target, duration },
        });
    },
    [state],
  );

  // Enemy turn logic
  const EnemyTurn = useCallback(
    (enemy) => {
      // Selecting a random attack
      const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
      const randomAttack = enemy.abilities[randomIndex];

      // Select a random target from turnOrder
      let targets;
      let newEnemy;
      if (
        randomAttack.type === 'attack' ||
        randomAttack.type === 'drain' ||
        randomAttack.type === 'smash' ||
        randomAttack.type === 'debuff' ||
        randomAttack.type === 'attack-all' ||
        randomAttack.type === 'attack-def' ||
        randomAttack.type === 'attack-stun'
      ) {
        targets = state.turnOrder.filter(
          (element) => element.type === 'player',
        ); // Attack or debuff players
      } else {
        targets = state.turnOrder.filter((element) => element.type === 'enemy'); // Buff or heal enemies
      }
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];

      if (randomAttack.type === 'summon') {
        newEnemy = { ...randomAttack.effect };
        console.log('new enemy added', newEnemy);
      }

      console.log('random target selected', randomTarget);
      console.log('random attack selected', randomAttack);

      switch (randomAttack.type) {
        case 'attack': {
          HandleAttack(randomAttack, randomTarget);
          break;
        }
        case 'buff': {
          HandleBuff(randomAttack, randomTarget);
          break;
        }
        case 'heal': {
          HandleHeal(randomAttack, enemy);
          break;
        }
        case 'drain': {
          HandleLifeDrain(randomAttack, randomTarget);
          break;
        }
        case 'group-buff': {
          state.turnOrder
            .filter((enemy) => enemy.type === 'enemy')
            .forEach((enemyTarget) => {
              HandleBuff(randomAttack, enemyTarget);
            });
          break;
        }
        case 'smash': {
          HandleSmash(randomAttack, randomTarget);
          break;
        }
        case 'summon': {
          AddEnemyToBattle(newEnemy);
          break;
        }
        case 'attack-all': {
          HandleAttackAll(randomAttack);
          break;
        }
        case 'debuff': {
          HandleBuff(randomAttack, randomTarget);
          break;
        }
        case 'attack-def': {
          HandleAttack(randomAttack, randomTarget, true);
          break;
        }
        case 'attack-stun': {
          HandleStunAttack(
            randomAttack,
            randomTarget,
            randomAttack?.chance,
            randomAttack?.duration,
          );
          break;
        }
        default: {
          console.log('Unknown attack type:', randomAttack.type);
          break;
        }
      }

      // Move to next turn
      NextTurn();
    },
    [
      HandleAttack,
      HandleBuff,
      HandleHeal,
      HandleLifeDrain,
      HandleSmash,
      HandleAttackAll,
      HandleStunAttack,
      state.turnOrder,
      NextTurn,
    ],
  );

  // Check to see if the battle end conditions have been met
  const CheckBattleEnd = () => {
    dispatch({
      type: 'CHECK_WIN_CONDITIONS',
    });
  };

  /* Helper function for when the battle ends
   * Calls onBattleEnd with the result and the enemies
   */
  const BattleEnd = useCallback(
    (result, xp, gold) => {
      console.log('xp gained from battle', xp);
      console.log('gold gained from battle', gold);
      updateXP(xp);
      updateHP(state.turnOrder);
      gainGold(gold);

      if (onBattleEnd !== null) onBattleEnd(result, enemies);
    },
    [updateHP, updateXP, gainGold, state.turnOrder, onBattleEnd, enemies],
  );

  // Get the attack description for the players attack buttons
  const getAttackDescription = (attack) => {
    switch (attack.type) {
      case 'attack':
        return `${attack.damage} DMG`;
      case 'attack-all':
        return `${attack.damage} DMG to all`;
      case 'smash':
        return `${attack.damage} DMG & ${attack.effect}`;
      case 'heal':
        return `${attack.heal} HP`;
      case 'chug':
        return `${attack.heal} HP & ${attack.effect}`;
      case 'group-buff':
        return `${attack.effect} to all`;
      default:
        return attack.effect;
    }
  };

  // Check for when the battle ends
  useEffect(() => {
    if (
      (state.battleOutcome === 'win' || state.battleOutcome === 'lose') &&
      !hasEnded.current
    ) {
      BattleEnd(state.battleOutcome, state.xpGained, state.goldGained);
      hasEnded.current = true;
    }
  }, [state.battleOutcome, state.xpGained, state.goldGained, BattleEnd]);

  // Smooth scroll to newest battleLog entry
  useEffect(() => {
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.battleLog]);

  /* If the fastest combatant is an enemy they go first
   * Checks for when its the enemy's turn
   */
  useEffect(() => {
    if (state.battleOutcome === null) {
      const attacker = state.turnOrder[state.turnIndex];

      if (attacker.type === 'enemy') {
        const enemysMove = async () => {
          await sleep(2500); // wait 2.5 seconds
          EnemyTurn(attacker);
        };

        enemysMove();
      }
    }
  }, [
    state.isEnemyTurn,
    state.turnIndex,
    state.turnOrder,
    state.battleOutcome,
    EnemyTurn,
  ]);

  // Skip turn if current fighter is stunned
  useEffect(() => {
    if (state.skipTurn) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_TURN' });
      }, 1500);
    }
  }, [state.skipTurn, state.turnIndex]);

  return (
    <div className='Screen Battle-Screen Full-Screen'>
      {/* Enemy Display */}
      <div className='Section Enemy-Section'>
        {state.turnOrder && state.turnOrder.length > 0 ? (
          state.turnOrder
            .filter((enemy) => enemy.type === 'enemy')
            .map((enemy, index) => (
              <div key={index} className='Enemy'>
                <h3>
                  {enemy?.name} (HP: {enemy.hp})
                </h3>
                <img src={enemy?.image} alt={enemy?.name} />
              </div>
            ))
        ) : (
          <h3>No enemies remain</h3>
        )}
      </div>

      {/* Battle Log */}
      <div className='Battle-Log' ref={logRef}>
        {state.battleLog && state.battleLog.length > 0 ? (
          state.battleLog.map((entry, index) => (
            <p
              key={index}
              ref={index === state.battleLog.length - 1 ? lastEntryRef : null}
            >
              {entry}
            </p>
          ))
        ) : (
          <div>
            <p>Begin Battle</p>
            <p>{state.turnOrder[0]?.name} goes first</p>
          </div>
        )}
      </div>

      {/* Pop-up for selecting enemy */}
      {state.isTargetingEnemy && (
        <TargetSelection
          enemies={state.turnOrder.filter((enemy) => enemy.type === 'enemy')}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Pop-up for selecting ally */}
      {state.isTargetingAlly && (
        <TargetSelectionAlly
          allies={state.turnOrder.filter((player) => player.type === 'player')}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Player Display */}
      <div className='Section Player-Section'>
        {state.turnOrder
          .filter((player) => player?.type === 'player')
          .map((player, index) => (
            <div key={index} className='Player'>
              <h3>
                {player?.name} (HP: {player.hp})
              </h3>
              {console.log('active player index', state.activePlayerIndex)}
              {index === state.activePlayerIndex ? (
                <div className='Attack-Buttons'>
                  <img
                    src={player?.imageFace}
                    alt={player?.name}
                    className='Attack-Image'
                  />
                  {player?.abilities.map((attack, i) => (
                    <button
                      key={i}
                      disabled={state.isEnemyTurn}
                      className='Attack-Btn'
                      onClick={() => SelectTarget(attack)}
                    >
                      {attack?.name} ({getAttackDescription(attack)})
                    </button>
                  ))}
                </div>
              ) : (
                <div className='Non-Attack-Images'>
                  <img
                    src={player?.imageFace}
                    alt={player?.name}
                    className='Attack-Image'
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
