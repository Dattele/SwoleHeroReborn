import DwarvenJuggernaut from '../../../assets/images/DwarvenJuggernaut.png';
import Troll from '../../../assets/images/Troll.png';
import FrostDwarf from '../../../assets/images/FrostDwarf.png';
import FrostWidow from '../../../assets/images/FrostWidow.png';
import FrostWolf from '../../../assets/images/FrostWolf.png';
import GoatMinotaur from '../../../assets/images/GoatMinotaur.png';
import MoltenCrawler from '../../../assets/images/MoltenCrawler.png';
import Balrog from '../../../assets/images/Balrog.png';

const SpireMonsters = [
  {
    name: 'Molten Crawler',
    type: 'enemy',
    image: MoltenCrawler,
    description:
      'A lava-blooded insect that oozes molten fluid from its carapace. It sears its enemies with burning bites and drips embers with each step.',
    hp: 40,
    strength: 9,
    defense: 4,
    speed: 6,
    rizz: 2,
    xp: 22,
    gold: 5,
    abilities: [
      { name: 'Sear Bite', type: 'attack', damage: 11 },
      { name: 'Molten Slap', type: 'attack-all', damage: 6 },
    ],
  },
  {
    name: 'Frost-Bitten Dwarf',
    type: 'enemy',
    image: FrostDwarf,
    description:
      "A miner who refused to leave the Spire's frozen depths, now cursed by frost. His hatred burns colder than the mountain wind.",
    hp: 50,
    strength: 9,
    defense: 7,
    speed: 3,
    rizz: 2,
    xp: 30,
    gold: 6,
    abilities: [
      { name: 'Pickaxe Throw', type: 'attack', damage: 13 },
      { name: 'Bitter Grudge', type: 'buff', effect: '+3 strength, +3 defense' },
    ],
  },
  {
    name: 'Goat Minotaur',
    type: 'enemy',
    image: GoatMinotaur,
    description:
      "A wild, bipedal goat creature with horns sharp enough to split boulders. Mad from altitude sickness and rage.",
    hp: 20,
    strength: 12,
    defense: 1,
    speed: 12,
    rizz: 5,
    xp: 27,
    gold: 6,
    abilities: [
      { name: 'Rampage', type: 'attack', damage: 16 },
    ],
  },
  {
    name: 'Glacial Hound',
    type: 'enemy',
    image: FrostWolf,
    description:
      "A spectral hound born of howling snowstorms. Tracks heat with eerie precision and disappears into ice fog.",
    hp: 45,
    strength: 9,
    defense: 4,
    speed: 6,
    rizz: 3,
    xp: 27,
    gold: 6,
    abilities: [
      { name: 'Frostbite Chomp', type: 'smash', damage: 10, effect: '-2 speed' },
    ],
  },
  {
    name: 'Troll',
    type: 'enemy',
    image: Troll,
    description:
      "A massive, hulking brute with skin like mountain rock. Slow to act, but when he swings, it's like an avalanche.",
    hp: 65,
    strength: 12,
    defense: 10,
    speed: 1,
    rizz: 1,
    xp: 40,
    gold: 8,
    abilities: [
      { name: 'Boulder Bash', type: 'attack', damage: 16 },
      { name: 'Rock Concert', type: 'group-buff', effect: '+4 defense' },
    ],
  },
  {
    name: 'Dwarven Juggernaut',
    type: 'enemy',
    image: DwarvenJuggernaut,
    description:
      "A former champion of the forge, now a living battering ram. Covered head to toe in enchanted dwarven steel.",
    hp: 55,
    strength: 11,
    defense: 8,
    speed: 2,
    rizz: 2,
    xp: 35,
    gold: 6,
    abilities: [
      { name: 'Forge Slam', type: 'smash', damage: 12, effect: '-3 defense' },
      { name: 'Reinforced Will', type: 'buff', effect: '+6 defense' },
    ],
  },
  {
    name: 'Frost Widow',
    type: 'enemy',
    image: FrostWidow,
    description:
      "A venomous spider the size of a carriage wheel. Its webs are laced with frost magic and paralytic poison.",
    hp: 30,
    strength: 6,
    defense: 2,
    speed: 8,
    rizz: 6,
    xp: 20,
    gold: 6,
    abilities: [
      { name: 'Venom Fang', type: 'attack', damage: 10 },
      { name: 'Icy Thread', type: 'buff', effect: '-2 speed, -2 rizz' },
    ],
  },
];

export const SpireBoss = [
  {
    name: 'Balrog, Flame of the Spire',
    type: 'enemy',
    image: Balrog,
    description:
      "A cursed flame elemental sealed deep in the Spire's heart. Its roar melts steel, and its hatred fuels its rebirth",
    hp: 150,
    strength: 14,
    defense: 8,
    speed: 12,
    rizz: 20,
    xp: 150,
    gold: 50,
    loot: ['Alpha Fang', 'Rare Hide', 'Strength Potion'],
    abilities: [
      {
        name: 'Infernal Whip',
        type: 'smash-all',
        damage: 10,
        effect: '-2 defense',
      },
      {
        name: 'Dark Descent',
        type: 'drain',
        damage: 20,
      },
      { 
        name: 'Molten Roar', 
        type: 'group-buff', 
        effect: '+4 strength',
      },
    ],
  },
];

export default SpireMonsters;
