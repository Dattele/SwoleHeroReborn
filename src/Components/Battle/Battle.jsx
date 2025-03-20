import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import TargetSelection from './TargetSelection';
import TargetSelectionAlly from './TargetSelectionAlly';
import BattleResults from './BattleResults';

import './Battle.scss';
import '../../scss/All.scss';

export default function Battle({ players, enemies, onBattleEnd }) {
  let navigate = useNavigate();
  const logRef = useRef(null);
  const lastEntryRef = useRef(null); // Ref for the last log entry

  const playersClone = structuredClone(players).map(player => ({
    ...player,
    id: uuidv4(),
  }));
  const enemiesClone = structuredClone(enemies).map(enemy => ({
    ...enemy,
    id: uuidv4(),
  }));

  const initialState = {
    // playerHPs: playersClone,
    // enemyHPs: enemiesClone,
    turnOrder: [...playersClone, ...enemiesClone].sort(
      (a, b) => b.speed - a.speed,
    ),
    turnIndex: 0,
    battleLog: [],
    isTargetingAlly: false,
    isTargetingEnemy: false,
    selectedAttack: {},
    xpGained: 0,
    deadEnemies: [],
    isEnemyTurn: null,
    battleOutcome: null,
  };

  const BattleReducer = (state, action) => {
    switch (action.type) {
      case 'END_BATTLE': {
        return { ...state, battleOutcome: action.payload };
      }
      case 'NEXT_TURN': {
        if (state.battleOutcome) return state; // Stop turn progression

        const nextTurnIndex = (state.turnIndex + 1) % state.turnOrder.length;
        const nextFighter = state.turnOrder[nextTurnIndex];
        console.log('next turn combatant:', state.turnOrder[nextTurnIndex]);

        return {
          ...state,
          turnIndex: nextTurnIndex,
          isEnemyTurn: nextFighter.type === 'enemy',
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

        // const updatedEnemies = state.enemyHPs.map((enemy) =>
        //   enemy.id === target.id
        //     ? { ...enemy, hp: Math.max(0, enemy.hp - damage) }
        //     : enemy,
        // );
        // const updatedPlayers = state.playerHPs.map((player) =>
        //   player.id === target.id
        //     ? { ...player, hp: Math.max(player.hp - damage, 0) }
        //     : player,
        // );

        const updatedTurnOrder = state.turnOrder.map(element =>
          element.id === target.id
            ? { ...element, hp: Math.max(0, element.hp - damage) }
            : element,
        ).filter(
          (element) => element.hp > 0
        );;

        // Filter out dead enemies from turn order
        // const updatedTurnOrder = state.turnOrder.filter(
        //   (entity) => entity.hp > 0
        // );

        let xp = state.xpGained;

        // add dead enemies to deadEnemies
        let deathLog;
        let DeadTargets = state.deadEnemies;
        if (target.hp === 0) {
          DeadTargets.push(target);
          xp += target.xp;
          deathLog = `${target.name} has been crushed by ${attacker}'s massive Biceps! 💀`;
        }

        return {
          ...state,
          // playerHPs: updatedPlayers,
          // enemyHPs: updatedEnemies,
          turnOrder: updatedTurnOrder,
          battleLog: deathLog 
            ? [...state.battleLog, newLog, deathLog]
            : [...state.battleLog, newLog],
          xpGained: xp,
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

        //const isEnemy = attacker.type === 'enemy';

        // const updatedList = isEnemy
        //   ? state.enemyHPs.map((enemy) =>
        //       enemy.id === target.id ? applyBuff(enemy) : enemy,
        //     )
        //   : state.playerHPs.map((player) =>
        //       player.id === target.id ? applyBuff(player) : player,
        //     );

        const updatedTurnOrder = state.turnOrder.map(element =>
          element.id === target.id ? applyBuff(element) : element,
        );

        return {
          ...state,
          // playerHPs: isEnemy ? state.playerHPs : updatedList,
          // enemyHPs: isEnemy ? updatedList : state.enemyHPs,
          turnOrder: updatedTurnOrder,
          battleLog: [
            ...state.battleLog,
            `${target} has received a buff of ${attack.effect} from ${attacker}`,
          ],
        };
      }
      case 'HANDLE_HEAL': {
        const { attacker, attack, target } = action.payload;
        const heal = attack.effect;
        const isEnemy = attacker.type === 'enemy';

        console.log('enemies in HANDLE_HEAL', enemies);
        console.log('logging the target', target);
        console.log('enemyHPS in HANDLE_HEAL', state.enemyHPs);
        console.log('total heal', heal);
        console.log('loggin the attacker', attacker);

        let originalHP = isEnemy
          ? enemies.find((e) => e?.name === target?.name)
          : players.find((p) => p?.name === target?.name);

        // const updatedEnemies = state.enemyHPs.map((enemy) =>
        //   enemy.id === target.id
        //     ? { ...enemy, hp: Math.min(originalHP.hp, target.hp + heal) }
        //     : enemy,
        // );
        // const updatedPlayers = state.playerHPs.map((player) =>
        //   player.id === target.id
        //     ? { ...player, hp: Math.min(originalHP.hp, target.hp + heal) }
        //     : player,
        // );
        const updatedTurnOrder = state.turnOrder.map(element =>
          element.id === target.id
            ? { ...element, hp: Math.min(originalHP.hp, target.hp + heal) }
            : element,
        );

        return {
          ...state,
          // playerHPs: updatedPlayers,
          // enemyHPs: updatedEnemies,
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
          element => element.hp > 0,
        );

        const aliveEnemies = aliveCombatants.filter(
          element => element.type === 'enemy',
        );
        const alivePlayers = aliveCombatants.filter(
          element => element.type === 'player',
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
          // enemyHPs: checkAliveEnemies, 
          // playerHPs: checkAlivePlayers 
        };
      }
      case 'ADD_ENEMY': {
        const { newEnemy } = action.payload;
        return {
          ...state,
          enemyHPs: [
            ...state.enemyHPs,
            { ...newEnemy, id: uuidv4() }, // assign new ID
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
      payload: newEnemy
    });
  };

  // Select enemy to attack
  const SelectTarget = (attack) => {
    // Get selected attack
    dispatch({ type: 'SELECT_ATTACK', payload: attack })

    if (attack.type === 'attack') {
      dispatch({ type: 'SET_TARGETING', payload: { enemy: true, ally: false } });
    } else {
      dispatch({ type: 'SET_TARGETING', payload: { enemy: false, ally: true } });
    }
  };

  // Handling clicking on a target
  const HandleTargetSelection = (target) => {
    console.log('target', target);
    // Close pop-up
    dispatch({ type: 'SET_TARGETING', payload: { enemy: false, ally: false } });

    // Execute attack after the modal closes
    setTimeout(() => {
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
      }
      goNextTurn();
    }, 1000);
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

  const HandleLifeDrain = async (attack, target) => {
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
      payload: { attacker, attack,  target: attackerCopy },
    });
  };

  // Enemy turn logic
  const EnemyTurn = (enemy) => {
    // const { turnOrder, turnIndex } = state;
    // const attacker = turnOrder[turnIndex]; // Get the current attacker

    // Selecting a random attack
    const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
    const randomAttack = enemy.abilities[randomIndex];

    // Select a random target from turnOrder
    let targets;
    if (randomAttack.type === 'attack' || randomAttack.type === 'drain') {
      targets = state.turnOrder.filter(element => element.type === 'player'); // Attack players
    } else {
      targets = state.turnOrder.filter(element => element.type === 'enemy'); // Buff or heal enemies
    }
    const randomTarget = targets[Math.floor(Math.random() * targets.length)];

    console.log('random target selected', randomTarget);
    console.log('random attack selected', randomAttack);

    if (randomAttack.type === 'attack' && randomTarget) {
      HandleAttack(randomAttack, randomTarget);
    } else if (randomAttack.type === 'buff' && randomTarget) {
      HandleBuff(randomAttack, randomTarget);
    } else if (randomAttack.type === 'heal' && randomTarget) {
      HandleHeal(randomAttack, enemy);
    } else if (randomAttack.type === 'drain' && randomTarget) {
      HandleLifeDrain(randomAttack, randomTarget);
      // HandleAttack(randomAttack, randomTarget);
      // HandleHeal(enemyHPs, setEnemyHPs, randomAttack, enemy);
    } else if (randomAttack.type === 'group-buff') {
      state.turnOrder.filter(enemy => enemy.type === 'enemy').forEach(enemyTarget => {
        HandleBuff(randomAttack, enemyTarget);
      })
    }

    // Move to next turn
    setTimeout(() => {
      NextTurn();
    }, 3000); // 3 second delay
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
    })
  }
  const BattleEnd = (result, xp) => {
    console.log('xp gained from battle', xp);

    //navigate('/battle-results', { state: { result, xp } });
  };

  useEffect(() => {
    if (state.battleOutcome === 'win' || state.battleOutcome === 'lose') 
      BattleEnd(state.battleOutcome, state.xpGained)
  }, [state.battleOutcome])

  // Smooth scroll to newest battleLog entry
  useEffect(() => {
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.battleLog]);

  /* If the fastest combatant is an enemy they go first
   * Checks for when its the enemy's turn
   */
  useEffect(() => {
    const attacker = state.turnOrder[state.turnIndex];

    if (attacker.type === 'enemy') {
      const enemysMove = async () => {
        await sleep(2500); // wait 2.5 seconds
        EnemyTurn(attacker);
      };

      enemysMove();
    }
  }, [state.isEnemyTurn]);

  return (
    <div className='Screen Battle-Screen Full-Screen'>
      {/* Enemy Display */}
      <div className='Section Enemy-Section'>
        {state.turnOrder && state.turnOrder.length > 0 ? (
          state.turnOrder.filter(
            enemy => enemy.type === 'enemy'
          ).map((enemy, index) => (
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
          state.battleLog.map((entry, index) => <p key={index} 
            ref={index === state.battleLog.length - 1 ? lastEntryRef : null}>{entry}</p>)
        ) : (
          <p>Begin Battle</p>
        )}
      </div>

      {/* Pop-up for selecting enemy */}
      {state.isTargetingEnemy && (
        <TargetSelection
          enemies={state.turnOrder.filter(enemy => enemy.type === 'enemy')}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Pop-up for selecting ally */}
      {state.isTargetingAlly && (
        <TargetSelectionAlly
          allies={state.turnOrder.filter(player => player.type === 'player')}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Player Display */}
      <div className='Section Player-Section'>
        {state.turnOrder.filter(
          player => player.type === 'player'
        ).map((player, index) => (
          <div key={index} className='Player'>
            <h3>
              {player.name} (HP: {player.hp})
            </h3>
            <div className='Attack-Buttons'>
              <img
                src={player.image}
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
                    : attack.effect}
                  )
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
