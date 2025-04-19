import slime from '../../../assets/images/slime.png';
import wolf from '../../../assets/images/wolf.png';
import golem from '../../../assets/images/golem.png';
import mosquito from '../../../assets/images/mosquito.png';
import viper from '../../../assets/images/viper.png';
import shadowsprite from '../../../assets/images/shadowsprite.png';
import alphawolf from '../../../assets/images/alphawolf.png';

const ForestMonsters = [
  {
    name: 'Slime',
    type: 'enemy',
    image: slime,
    description:
      'A small, squishy blob that bounces around. Weak, but hard to hit.',
    hp: 20,
    strength: 5,
    defense: 2,
    speed: 3,
    rizz: 1,
    xp: 9,
    gold: 1,
    loot: ['Slimy Gel', 'Minor Potion'],
    abilities: [{ name: 'Bounce Attack', type: 'attack', damage: 5 }],
  },
  {
    name: 'Forest Wolf',
    type: 'enemy',
    image: wolf,
    description: 'A fast, cunning predator that hunts in packs.',
    hp: 30,
    strength: 8,
    defense: 4,
    speed: 7,
    rizz: 5,
    xp: 15,
    gold: 2,
    loot: ['Wolf Fur', 'Basic Potion'],
    abilities: [
      { name: 'Bite', type: 'attack', damage: 8 },
      { name: 'Howl', type: 'group-buff', effect: '+4 strength' },
    ],
  },
  {
    name: 'Moss Golem',
    type: 'enemy',
    image: golem,
    description:
      'A slow-moving, ancient creature covered in vines. Hits hard but is easy to dodge.',
    hp: 50,
    strength: 12,
    defense: 8,
    speed: 2,
    rizz: 3,
    xp: 25,
    gold: 5,
    loot: ['Mossy Bark', 'Small Strength Buff'],
    abilities: [{ name: 'Heavy Slam', type: 'attack', damage: 12 }],
  },
  {
    name: 'Giant Mosquito',
    type: 'enemy',
    image: mosquito,
    description: 'Annoying, bloodsucking pest. Just irritating.',
    hp: 15,
    strength: 4,
    defense: 1,
    speed: 10,
    rizz: 1,
    xp: 6,
    gold: 1,
    loot: ['Mosquito Wings', 'HP Potion'],
    abilities: [{ name: 'Drain Life', type: 'drain', damage: 3, heal: 3 }],
  },
  {
    name: 'Venomous Viper',
    type: 'enemy',
    image: viper,
    description: 'A coiled snake hidden in the underbrush, striking suddenly.',
    hp: 25,
    strength: 10,
    defense: 3,
    speed: 8,
    rizz: 15,
    xp: 18,
    gold: 2,
    loot: ['Viper Fang', 'Venom Extract'],
    abilities: [{ name: 'Poison Bite', type: 'attack', damage: 8 }],
  },
  {
    name: 'Shadow Sprite',
    type: 'enemy',
    image: shadowsprite,
    description: 'A mischievous creature that steals items and disappears.',
    hp: 18,
    strength: 7,
    defense: 2,
    speed: 9,
    rizz: 10,
    xp: 12,
    gold: 2,
    loot: ['Stolen Item (random return)'],
    abilities: [{ name: 'Blink Strike', type: 'attack', damage: 7 }],
  },
];

export const ForestBoss = [
  {
    name: 'Fangborn',
    type: 'enemy',
    image: alphawolf,
    description:
      'A massive, battle-scarred wolf that rules the forest. It only acknowledges the strongest challengers.',
    hp: 100,
    strength: 14,
    defense: 8,
    speed: 12,
    rizz: 20,
    xp: 100,
    gold: 50,
    loot: ['Alpha Fang', 'Rare Hide', 'Strength Potion'],
    abilities: [
      {
        name: 'Savage Bite',
        type: 'smash',
        damage: 16,
        effect: '-4 defense',
      },
      {
        name: 'Pack Leader Howl',
        type: 'summon',
        effect: ForestMonsters[1],
      },
      {
        name: 'Crushing Pounce',
        type: 'attack',
        damage: 20,
      },
    ],
  },
];

export default ForestMonsters;
