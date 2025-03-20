const Classes = {
  Bodybuilder: {
    name: 'BodyBuilder',
    description:
      'A warrior of strength and gains. Prioritizes brute force over finesse.',
    statGrowth: {
      hp: 10, // Gains 10 HP per level
      strength: 4, // Gains 4 Strength per level
      defense: 2, // Gains 2 Defense per level
      speed: 1, // Gains 1 Speed per level
      rizz: 1, // Gains 1 Rizz per level
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
        { name: 'Protein Shake Chug', type: 'heal', effect: '25' },
      ],
    },
  },
};

export default Classes;
