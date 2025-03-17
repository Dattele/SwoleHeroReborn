import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TargetSelection from './TargetSelection';
import TargetSelectionAlly from './TargetSelectionAlly';

import './Battle.scss';
import '../../scss/All.scss';

export default function Battle({ players, enemies, onBattleEnd }) {
  const fighters = players.concat(enemies);

  console.log('fighters sorted', fighters.sort(fighter => fighter.speed));

  const [battleLog, setBattleLog] = useState([]); // Log of battle actions
  const [turnOrder, setTurnOrder] = useState(fighters.sort(fighter => fighter.speed)); // Stores all players and enemies based off speed
  //const [turnIndex, setTurnIndex] = useState(0); // Keeps track of whose turn it is
  const [playerHPs, setPlayerHPs] = useState(
    structuredClone(players).map(player => ({
      ...player,
      id: uuidv4(),
    }))
  ); // Keeps track of all players HPs
  const [enemyHPs, setEnemyHPs] = useState(
    structuredClone(enemies).map(enemy => ({
      ...enemy,
      id: uuidv4(),
    }))
  ); // Keeps track of all enemy HPs
  // const [playersAlive, setPlayersAlive] = useState(players); // Array that contains an object of each player
  // const [enemiesAlive, setEnemiesAlive] = useState(enemies); // Array that contains an object of each enemy
  //const [enemyState, setEnemyState] = useState(enemies);
  const [isEnemyTurn, setIsEnemyTurn] = useState(false); // If its enemies turn then disable player's buttons
  const [isTargetingEnemy, setIsTargetingEnemy] = useState(false); // For when user is selecting a target to attack
  const [isTargetingAlly, setIsTargetingAlly] = useState(false); // For when user is selecting an ally to buff or heal
  const [selectedAttack, setSelectedAttack] = useState({}); // Stores which attack the user selected
  //const [deadEnemies, setDeadEnemies] = useState([]); // Keeps track of dead enemies
  const [turnEnded, setTurnEnded] = useState(); // Keeps track of if the turn ended

  let turnIndex = 0; // Keeps track of whose turn it is
  const deadEnemies = [];

  // Check if current turn belongs to a player or an enemy
  //const isPlayerTurn = turnIndex < players.length;

  /** Helper Functions */

  // Adding an enemy to battle
  const AddEnemyToBattle = (newEnemy) => {
    setEnemyHPs(prevEnemies => [
      ...prevEnemies,
      { ...newEnemy, id: uuidv4() } // Assign new ID
    ]);
  };

  // Select enemy to attack
  const SelectTarget = (attack) => {
    setSelectedAttack(attack);
    attack.type === 'attack' ? setIsTargetingEnemy(true) : setIsTargetingAlly(true);
  }

  // Handling clicking on a target
  const HandleTargetSelection = (target) => {
    console.log('target', target);
    setIsTargetingEnemy(false); // Close pop-up
    setIsTargetingAlly(false); // Close pop-up
    console.log('selected attack', selectedAttack);
    
    // Execute attack after the modal closes
    setTimeout(() => {
      if (selectedAttack.type === 'attack' && target) {
        HandleAttack(selectedAttack, target);
      } else if (selectedAttack.type === 'buff' && target) {
        HandleBuff(selectedAttack, target);
      } else if (selectedAttack.type === 'heal' && target) {
        HandleHeal(playerHPs, setPlayerHPs, selectedAttack, target);
      }
      setSelectedAttack({}); // Reset attack state
    }, 1000); 

    // Move to next turn
    setTimeout(() => {
      NextTurn();
    }, 3000); // 3 second delay
  };

  // Change the HP of the target
  const ChangeHP = (obj, setHP, target, action, total) => {
    setHP(prevEnemies =>
      prevEnemies.map(enemy => {
        if (enemy.id !== target.id) return enemy; // If not the target, return unchanged

        if (action === 'lowerHP') {
          return { ...enemy, hp: Math.max(0, enemy.hp - total) };
        } 

        if (action === 'raiseHP') {
          let originalHP = (obj === playerHPs)
            ? players.find(p => p.name === target.name)
            : enemies.find(e => e.name === target.name);
          
          return { ...enemy, hp: Math.min(originalHP.hp, target.hp + total) };
        }

        return enemy; // default
      })
    );
  }

  // Find the HP of the target
  const FindHP = (obj, name) => {
    const found = obj.find((element) => element.name === name);
    return found ? found.hp : null;
  }

  /** Main Functions */

  // Handle player attack
  const HandleAttack = (attack, enemy) => {
    const attacker = turnOrder[turnIndex];
    console.log(`attacker`, attacker);
    console.log('attack', attack);
    console.log(enemy);

    let newLog = [];
    
    // Calculate damage
    const strengthBonus = Math.floor(attacker.strength / 2); // Scale damage with strength
    const defense = Math.floor(enemy.defense / 2); // Lower damage based off enemies defense
    let damage = attack.damage + strengthBonus - defense;

    // Critical hit chance
    const critChance = 2 + attacker.rizz;
    const isCrit = Math.random() * 100 < critChance;


    if (isCrit) {
      damage = Math.floor(damage * 1.5);
      newLog.push(`🔥 CRITICAL HIT! ${attacker.name} unleashes a devastating ${attack.name} attack on ${enemy.name} for ${damage} damage!`);
    } else {
      newLog.push(`${attacker.name} POUNDS ${enemy.name} for ${damage} damage with ${attack.name}!`);
    }
    
    // Calculate HP of enemy
    if (enemy.type === 'enemy') {
      ChangeHP(enemyHPs, setEnemyHPs, enemy, 'lowerHP', damage);
      console.log("Enemy HPs after attack:", enemyHPs);
      console.log('enemys enemy.hp', enemy.hp);
      // Remove element from enemiesAlive and add to deadEnemies
      if (enemy.hp === 0) {
        // Remove enemies with 0 hp;
        const aliveEnemies = enemies.filter(enemy => enemy.hp > 0);
        setEnemyHPs(aliveEnemies);

        deadEnemies.push(enemy);
        newLog.push(`${enemy.name} has been crushed by Danny's massive Biceps! 💀`);
        console.log('dead enemies', deadEnemies);
      }
    } else if (enemy.type === 'player') {
      ChangeHP(playerHPs, setPlayerHPs, enemy, 'lowerHP', damage);
      console.log("Player HPs after attack:", playerHPs);
    }

    // Update the Battle Log's state
    setBattleLog(newLog);

    // Check if battle has ended
    CheckBattleEnd();
  };

  const HandleBuff = (attack, ally) => {
    const effects = attack.effect.split(',').map(e => e.trim());
    console.log('split', effects);
    effects.forEach(element => {
      if (element.includes('strength')) ally.strength += parseInt(element.replace('strength', ',', '').trim());
      if (element.includes('defense')) ally.defense += parseInt(element.replace('defense', ',', '').trim());
      if (element.includes('speed')) ally.speed += parseInt(element.replace('speed', ',', '').trim());
      if (element.includes('rizz')) ally.rizz += parseInt(element.replace('rizz', ',', '').trim())
    });
    console.log('buffed players', playerHPs);
    setBattleLog(`${ally} has received a buff of ${attack.effect}`);
  }

  const HandleHeal = (object, setHPs, attack, ally) => {
    // Calculate new HP
    ChangeHP(object, setHPs, ally, 'raiseHP', attack.effect);
    setBattleLog([`${ally.name} was healed for ${attack.effect} hp`])
  }

  // Enemy turn logic
  const EnemyTurn = (enemy) => {
    //let newLog = [];
    // if (turnOrder[turnIndex] !== enemy) return;  
    console.log('enemy abilities', enemy.abilities);
    // Selecting a random attack
    const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
    const randomAttack = enemy.abilities[randomIndex];

    // Select a random target
    const randomTargetIndex = Math.floor(Math.random() * playerHPs.length);
    const randomTarget = playerHPs[randomTargetIndex];
    console.log('random target selected', randomTarget);

    if (randomAttack.type === 'attack' && randomTarget) {
      HandleAttack(randomAttack, randomTarget);
    } else if (randomAttack.type === 'buff' && randomTarget) {
      HandleBuff(randomAttack, randomTarget);
    } else if (randomAttack.type === 'heal' && randomTarget) {
      HandleHeal(enemyHPs, setEnemyHPs, randomAttack, enemy);
    } else if (randomAttack.type === 'drain' && randomTarget) {
      HandleAttack(randomAttack, randomTarget);
      HandleHeal(enemyHPs, setEnemyHPs, randomAttack, enemy);
    } else if (randomAttack.type === 'group-buff' && randomTarget) {
      enemyHPs.forEach(enemyTarget => {
        HandleBuff(randomAttack, enemyTarget);
      })
    }

    // Move to next turn
    setTimeout(() => {
      NextTurn();
    }, 3000); // 3 second delay
  }

  // Function to advance turn
  const NextTurn = () => {
    const nextTurnIndex = (turnIndex + 1) % turnOrder.length;
    console.log('next turn combatant:', turnOrder[nextTurnIndex]);
    setTimeout(() => {
      turnIndex = nextTurnIndex;
      //setTurnIndex(nextTurnIndex);
      if (turnOrder[nextTurnIndex].type === 'enemy') {
        //setIsEnemyTurn(true);
        setTimeout(() => EnemyTurn(turnOrder[nextTurnIndex]), 2000); 
      } else {
        console.log("Player's turn starts...");
        setIsEnemyTurn(false);
      }
    }, 1000);
  }

  const CheckBattleEnd = () => {
    const checkAliveEnemies = enemyHPs.filter(element => element.hp > 0);
    console.log('Check end - EnemyHPs', checkAliveEnemies);
    if (checkAliveEnemies.length === 0) onBattleEnd('win', checkAliveEnemies);
  }

  // If the fastest combatant is an enemy then they go first;
  useEffect(() => {
    if (turnOrder[0].type === 'enemy') {
      setIsEnemyTurn(true);
      EnemyTurn(turnOrder[0]);
    }
  }, [])

  return (
    <div className="Screen Battle-Screen Full-Screen">

      {/* Enemy Display */}
      <div className="Section Enemy-Section">
        {enemyHPs && enemyHPs.length > 0 ? enemyHPs.map((enemy, index) => (
          <div key={index} className="Enemy">
            <h3>{enemy.name} (HP: {enemy.hp})</h3>
            <img src={enemy.image} alt={enemy.name} />
          </div>
        )) : <h3>No enemies remain</h3>}
      </div>

      {/* Battle Log */}
      <div className="Battle-Log">
        {battleLog && battleLog.length > 0 ? battleLog.map((entry, index) => (
          <h3 key={index}>{entry}</h3>
        )) : <h3>Begin Battle</h3>}
      </div>

      {/* Pop-up for selecting enemy */}
      {isTargetingEnemy && (
        <TargetSelection
          enemies={enemyHPs}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Pop-up for selecting ally */}
      {isTargetingAlly && (
        <TargetSelectionAlly
          allies={playerHPs}
          onSelectTarget={HandleTargetSelection}
        />
      )}

      {/* Player Display */}
      <div className="Section Player-Section">
        {playerHPs.map((player, index) => (
          <div key={index} className="Player">
            <h3>{player.name} (HP: {player.hp})</h3>
            <div className="Attack-Buttons">
              <img src={player.image} alt={player.name} className="Attack-Image" />
              {player.abilities.map((attack, i) => (
                <button key={i} disabled={isEnemyTurn} className='Attack-Btn' onClick={() => SelectTarget(attack)}>
                  {attack.name} ({attack.type === 'attack' ? `${attack.damage} DMG` : attack.effect})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
