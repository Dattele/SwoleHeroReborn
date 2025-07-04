const Classes = {
  Bodybuilder: {
    name: 'BodyBuilder',
    description:
      'A warrior of strength and gains. Prioritizes brute force over finesse.',
    statGrowth: {
      maxHP: 10, // Gains 10 HP per level
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
          effect: '+4 strength, +3 rizz, -1 speed',
        },
      ],
      3: [
        { name: 'Dumbbell Throw', type: 'attack', damage: 15 }, // Unlocks at level 3
      ],
      5: [{ name: 'Protein Shake Chug', type: 'heal', heal: 25 }],
      7: [
        {
          name: 'Arnold Flex',
          type: 'stun',
          effect: 'All enemies stunned in awe',
        },
      ],
    },
  },
  Barbarian: {
    name: 'Barbarian',
    description:
      'A brutal warrior with fists of steel and a heart full of rage.',
    statGrowth: {
      maxHP: 15,
      hp: 15,
      strength: 3,
      defense: 5,
      speed: 1,
      rizz: 1,
    },
    abilities: {
      1: [{ name: 'Gut Slam', type: 'attack', damage: 12 }],
      3: [
        {
          name: '🍻 Bottoms Up',
          type: 'chug',
          heal: 10,
          effect: '+2 strength',
        },
        { name: 'Cleaver', type: 'attack-all', damage: 8 },
      ],
      5: [
        { name: 'Skull Bash', type: 'smash', damage: 16, effect: '-3 defense' },
      ],
      7: [{ name: 'Fury Slam', type: 'strength', damage: 25 }],
    },
  },
  Knight: {
    name: 'Knight',
    description:
      'A disciplined warrior trained in swordplay and honor. Fights with elegance, defends with pride, and flirts with nobility.',
    statGrowth: {
      maxHP: 12,
      hp: 12,
      strength: 3,
      defense: 3,
      speed: 2,
      rizz: 3,
    },
    abilities: {
      1: [
        { name: 'Riposte', type: 'attack', damage: 10 },
        { name: 'Stand Firm', type: 'group-buff', effect: '+3 defense' },
      ],
      3: [
        {
          name: 'Radiant Slash',
          type: 'smash',
          damage: 14,
          effect: '+2 rizz',
        },
      ],
      5: [
        {
          name: 'Blade of Feymere',
          type: 'attack-def',
          damage: 20,
          effect: 'Ignores enemy defense',
        },
      ],
      7: [
        {
          name: 'Royal Decree',
          type: 'group-buff',
          effect: '+5 strength, +5 rizz',
        },
      ],
    },
  },
};

export default Classes;
