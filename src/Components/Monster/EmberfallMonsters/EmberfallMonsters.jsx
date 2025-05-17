import AshborneKnight from '../../../assets/images/AshborneKnight.png';
import DarkAcolyte from '../../../assets/images/DarkAcolyte.png';
import DreadedKnight from '../../../assets/images/DreadedKnight.png';
import Esharion from '../../../assets/images/Esharion.png';
import LordMalak from '../../../assets/images/LordMalak.png';
import NetherArcher from '../../../assets/images/NetherArcher.png';
import SoulBinder from '../../../assets/images/SoulBinder.png';
import HellForgedBrute from '../../../assets/images/HellForgedBrute.png';
import MoltenImp from '../../../assets/images/MoltenImp.png';

const SpireMonsters = [
  {
    // 0
    name: 'Ashborne Knight',
    type: 'enemy',
    image: AshborneKnight,
    description:
      "Charred, undead warriors clad in scorched plate. Served as the frontline of Emberfall's guard.",
    hp: 90,
    strength: 14,
    defense: 10,
    speed: 8,
    rizz: 2,
    xp: 40,
    gold: 20,
    abilities: [
      { name: 'Flaming Slash', type: 'attack', damage: 20 },
      { name: 'Sword Bash', type: 'attack-stun', damage: 12, chance: 25 },
    ],
  },
  {
    // 1
    name: 'Dark Acolyte',
    type: 'enemy',
    image: DarkAcolyte,
    description:
      "Fanatical cultists who wield dark magic to carry out the Demon King's will.",
    hp: 70,
    strength: 8,
    defense: 6,
    speed: 10,
    rizz: 10,
    xp: 40,
    gold: 20,
    abilities: [
      { name: 'Hexfire', type: 'attack', damage: 15 },
      {
        name: 'Shadow Mend',
        type: 'heal',
        heal: 20,
      },
      { name: 'Malefic Chant', type: 'debuff-all', effect: '-3 strength' },
    ],
  },
  {
    // 2
    name: 'Dreaded Paladin',
    type: 'enemy',
    image: DreadedKnight,
    description:
      'Elite corrupted paladins, former paladins of Emberfall turned enforcers of dread under the Demon King.',
    hp: 110,
    strength: 16,
    defense: 12,
    speed: 6,
    rizz: 3,
    xp: 55,
    gold: 30,
    abilities: [
      { name: 'Dread Cleave', type: 'attack-all', damage: 18 },
      {
        name: 'Fear Stare',
        type: 'stun-debuff',
        effect: '-2 attack, -1 rizz',
        chance: 20,
      },
    ],
  },
  {
    // 3
    name: 'Nether Archer',
    type: 'enemy',
    image: NetherArcher,
    description:
      'Shadowy archers that strike from afar with cursed arrows and vanish into black smoke.',
    hp: 75,
    strength: 8,
    defense: 8,
    speed: 20,
    rizz: 4,
    xp: 40,
    gold: 20,
    abilities: [
      {
        name: 'Piercing Shot',
        type: 'attack-def',
        damage: 15,
      },
      {
        name: 'Smoke Veil',
        type: 'buff',
        effect: '+4 defense',
      },
    ],
  },
  {
    // 4
    name: 'Soul-Binder',
    type: 'enemy',
    image: SoulBinder,
    description:
      'Grim reapers that corrupt souls and drain life, feared for their mental corruption as much as their spells.',
    hp: 85,
    strength: 10,
    defense: 10,
    speed: 10,
    rizz: 12,
    xp: 55,
    gold: 30,
    abilities: [
      { name: 'Soul Flame', type: 'drain', damage: 15, heal: 15 },
      { name: 'Bind Souls', type: 'bind' },
    ],
  },
  {
    // 5
    name: 'Hell-Forged Brute',
    type: 'enemy',
    image: HellForgedBrute,
    description:
      'A towering behemoth of molten steel. Moves slow, but hits with earth shattering force.',
    hp: 85,
    strength: 16,
    defense: 16,
    speed: 2,
    rizz: 2,
    xp: 65,
    gold: 35,
    abilities: [
      { name: 'Ground Slam', type: 'attack-all', damage: 15 },
      { name: 'Obsidian Bash', type: 'attack', damage: 22 },
    ],
  },
  {
    // 6
    name: 'Molten Imp',
    type: 'enemy',
    image: MoltenImp,
    description:
      'Hyperactive and unpredictable, these tiny demons fling fireballs and love chaos.',
    hp: 40,
    strength: 9,
    defense: 5,
    speed: 15,
    rizz: 6,
    xp: 55,
    gold: 30,
    abilities: [
      { name: 'Fireball', type: 'attack', damage: 15 },
      { name: 'Self Destruct', type: 'attack-all', damage: 20 },
    ],
  },
  {
    // 7
    name: 'Esharion, Flame of Malak',
    type: 'enemy',
    image: Esharion,
    description:
      'Second in command to Lord Malak - a warlord infused with infernal might, slaying all in his path.',
    hp: 160,
    strength: 11,
    defense: 8,
    speed: 7,
    rizz: 2,
    xp: 100,
    gold: 70,
    abilities: [
      { name: 'Inferno Brand', type: 'attack', damage: 22 },
      { name: 'Blazing Fury', type: 'attack-all', damage: 16 },
      {
        name: 'Demonic Roar',
        type: 'debuff-all',
        effect: '-3 strength, -1 rizz',
      },
    ],
    passive: {
      name: 'Volcanic Recovery',
      type: 'heal',
      heal: 30,
      condition: 'hp <= 80',
    },
  },
];

export const SpireBossMonster = [
  {
    name: 'Balrog, Flame of the Spire',
    type: 'enemy',
    image: LordMalak,
    description:
      "A cursed flame elemental sealed deep in the Spire's heart. Its roar melts steel, and its hatred fuels its rebirth",
    hp: 200,
    strength: 25,
    defense: 14,
    speed: 18,
    rizz: 25,
    xp: 150,
    gold: 100,
    abilities: [
      {
        name: 'Infernal Whip',
        type: 'smash-all',
        damage: 10,
        effect: '-4 defense',
      },
      {
        name: 'Dark Descent',
        type: 'drain',
        damage: 20,
        heal: 20,
      },
      {
        name: 'Molten Roar',
        type: 'buff',
        effect: '+8 strength',
      },
    ],
  },
];

export default SpireMonsters;
