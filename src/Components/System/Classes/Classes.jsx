const Classes = {
  Bodybuilder: {
    name: 'BodyBuilder',
    description: 'A warrior of strength and gains. Prioritizes brute force over finesse.',
    statGrowth: {
      hp: 10, // Gains 10 HP per level
      strength: 6, // Gains 6 Strength per level
      defense: 2, // Gains 2 Defense per level
      speed: 2, // Gains 2 Speed per level
      rizz: 2, // Gains 2 Rizz per level
    },
    abilities: {
      1: [
        { name: 'Bench Press Smash', type: 'attack', damage: 10 },
        {
          name: 'Bicep Flex',
          type: 'buff',
          effect: '+4 strength, +2 rizz, -1 speed',
        },
      ],
      3: [
        { name: 'Dumbbell Throw', type: 'attack', damage: 15 }, // Unlocks at level 3
      ],
      5: [
        {
          name: 'Arnold Flex',
          type: 'stun',
          effect: 'All enemies stunned in awe',
        }, // Unlocks at level 5
        { name: 'Protein Shake Chug', type: 'heal', heal: 25 },
      ],
    },
  },
  Barbarian: {
    name: 'Barbarian',
    description: 'A brutal warrior with fists of steel and a heart full of rage.',
    statGrowth: {
      hp: 15,
      strength: 3,
      defense: 5,
      speed: 1,
      rizz: 1,
    },
    abilities: {
      1: [
        { name: 'Gut Slam', type: 'attack', damage: 12}
      ],
      3: [
        { name: '🍻 Bottoms Up', type: 'chug', heal: 20, effect: '+2 strength' },
        { name: 'Cleaver', type: 'aoe', damage: '10' }
      ],
      5: [
        { name: 'Skull Bash', type: 'smash', damage: '16' }
      ],
      7: [
        { name: 'Fury Slame', type: 'strength', damage: '25' }
      ]
    }
  },
};

export default Classes;
