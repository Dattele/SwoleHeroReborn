import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  let navigate = useNavigate();
  const logRef = useRef(null);
  const lastEntryRef = useRef(null); // Ref for the last log entry

  const playersClone = structuredClone(players).map((player) => ({
    ...player,
    id: uuidv4(),
  }));
  const enemiesClone = structuredClone(enemies).map((enemy) => ({
    ...enemy,
    id: uuidv4(),
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
  };

  const BattleReducer = (state, action) => {
    switch (action.type) {
      case 'END_BATTLE': {
        return { ...state, battleOutcome: action.payload };
      }
      case 'NEXT_TURN': {
        if (state.battleOutcome) return state; // Stop turn progression

        console.log('next turn alive turn order', state.turnOrder);

        const nextTurnIndex = (state.turnIndex + 1) % state.turnOrder.length;
        const nextFighter = state.turnOrder[nextTurnIndex];
        console.log('next turn combatant:', state.turnOrder[nextTurnIndex]);

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
          turnIndex: nextTurnIndex,
          isEnemyTurn: nextFighter.type === 'enemy',
          activePlayerIndex: playerIndex,
        };
      }
      case 'HANDLE_ATTACK': {
        const { attacker, attack, target } = action.payload;
        let newLog;

        // Calculate damage
        let damage = attack.damage;
        const addDamage =
          Math.floor(attacker.strength / 2) - Math.floor(target.defense / 2);
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
          // playerHPs: isEnemy ? state.playerHPs : updatedList,
          // enemyHPs: isEnemy ? updatedList : state.enemyHPs,
          turnOrder: updatedTurnOrder,
          battleLog: [
            ...state.battleLog,
            `${target.name} has received a buff of ${attack.effect} from ${attacker.name}`,
          ],
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
      case 'SET_TARGETING': {
        return {
          ...state,
          isTargetingEnemy: action.payload.enemy,
          isTargetingAlly: action.payload.ally,
        };
      }
      case 'SELECT_ATTACK': {
        return { ...state, selectedAttack: action.payload || {} };
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
        console.log(newEnemy);

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
    dispatch({ type: 'SELECT_ATTACK', payload: attack });

    if (attack.type === 'attack') {
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
    console.log('target', target);
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
  const HandleAttack = (attack, target) => {
    const { turnOrder, turnIndex } = state;
    const attacker = turnOrder[turnIndex]; // Get the current attacker

    if (!attacker) return;

    // Dispatching an attack
    dispatch({
      type: 'HANDLE_ATTACK',
      payload: { attacker, attack, target },
    });

    // Check if battle has ended
    CheckBattleEnd();
  };

  const HandleBuff = (attack, target) => {
    const { turnOrder, turnIndex } = state;
    const attacker = turnOrder[turnIndex]; // Get the current attacker

    if (!attacker) return;

    // Dispatching a buff
    dispatch({
      type: 'HANDLE_BUFF',
      payload: { attacker, attack, target },
    });
  };

  const HandleHeal = (attack, target) => {
    const { turnOrder, turnIndex } = state;
    const attacker = turnOrder[turnIndex]; // Get the current attacker

    if (!attacker) return;

    // Dispatching a heal
    dispatch({
      type: 'HANDLE_HEAL',
      payload: { attacker, attack, target },
    });
  };

  const HandleLifeDrain = (attack, target) => {
    const { turnOrder, turnIndex } = state;
    const attacker = turnOrder[turnIndex]; // Get the current attacker

    const attackerCopy = { ...attacker };

    if (!attacker) return;

    // Dispatching an attack and heal for Life Drain
    dispatch({
      type: 'HANDLE_ATTACK',
      payload: { attacker, attack, target },
    });
    dispatch({
      type: 'HANDLE_HEAL',
      payload: { attacker, attack, target: attackerCopy },
    });
  };

  const HandleSmash = (attack, target) => {
    const { turnOrder, turnIndex } = state;
    const attacker = turnOrder[turnIndex]; // Get the current attacker
    console.log('Smash attacker', attacker);
    console.log('smash target', target);

    if (!attacker) return;

    // Dispatching an attack then a debuff on target
    dispatch({
      type: 'HANDLE_ATTACK',
      payload: { attacker, attack, target },
    });
    dispatch({
      type: 'HANDLE_BUFF',
      payload: { attacker, attack, target },
    });
  };

  // Enemy turn logic
  const EnemyTurn = (enemy) => {
    // Selecting a random attack
    const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
    const randomAttack = enemy.abilities[randomIndex];

    // Select a random target from turnOrder
    let targets;
    let newEnemy;
    if (
      randomAttack.type === 'attack' ||
      randomAttack.type === 'drain' ||
      randomAttack.type === 'smash'
    ) {
      targets = state.turnOrder.filter((element) => element.type === 'player'); // Attack players
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
      default: {
        console.log('Unknown attack type:', randomAttack.type);
        break;
      }
    }

    // Move to next turn
    NextTurn();
  };

  // Function to advance turn
  const NextTurn = () => {
    if (state.battleOutcome) return;

    dispatch({
      type: 'NEXT_TURN',
    });
  };

  const CheckBattleEnd = () => {
    dispatch({
      type: 'CHECK_WIN_CONDITIONS',
    });
  };

  /* Helper function for when the battle ends
   * Calls onBattleEnd with the result and the enemies
   */
  const BattleEnd = (result, xp, gold) => {
    console.log('xp gained from battle', xp);
    console.log('gold gained from battle', gold);
    updateXP(xp);
    updateHP(state.turnOrder);
    gainGold(gold);
    if (onBattleEnd !== null) onBattleEnd(result, enemies);
    //navigate('/battle-results', { state: { result, xp } });
  };

  // Check for when the battle ends
  useEffect(() => {
    if (state.battleOutcome === 'win' || state.battleOutcome === 'lose')
      BattleEnd(state.battleOutcome, state.xpGained, state.goldGained);
  }, [state.battleOutcome]);

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
  }, [state.isEnemyTurn, state.turnIndex]);

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
                  {enemy.name} (HP: {enemy.hp})
                </h3>
                <img src={enemy.image} alt={enemy.name} />
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
            <p>{state.turnOrder[0].name} goes first</p>
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
          .filter((player) => player.type === 'player')
          .map((player, index) => (
            <div key={index} className='Player'>
              <h3>
                {player.name} (HP: {player.hp})
              </h3>
              {console.log('active player index', state.activePlayerIndex)}
              {index === state.activePlayerIndex ? (
                <div className='Attack-Buttons'>
                  <img
                    src={player.imageFace}
                    alt={player.name}
                    className='Attack-Image'
                  />
                  {player.abilities.map((attack, i) => (
                    <button
                      key={i}
                      disabled={state.isEnemyTurn}
                      className='Attack-Btn'
                      onClick={() => SelectTarget(attack)}
                    >
                      {attack.name} (
                      {attack.type === 'attack'
                        ? `${attack.damage} DMG`
                        : attack.type === 'heal'
                          ? attack.heal
                          : attack.effect}
                      )
                    </button>
                  ))}
                </div>
              ) : (
                <div className='Non-Attack-Images'>
                  <img
                    src={player.imageFace}
                    alt={player.name}
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
