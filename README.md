# Swole Hero Reborn: The Quest for Gains and Girlfriends - Phase 1

## Overview

**Swole Hero Reborn** is a text-based fantasy RPG where you play as Danny — a gym bro reincarnated into the magical world **Eldoria**, filled with monsters, dungeons, and the occasional romantic hope.

This phase includes:

- The **Forest of EdenGrove** and **Bronzebell Town**
- Encounters with monsters
- Recruiting party members
- Introduction to Eldoria and the Demon King's Generals
- Facing Edengrove's boss **Fangborn**, the Alpha Werewolf

---

## Technologies Used

- **React.js**
- **React Router**
- **Custom useReducer + Context API**
- **SCSS for styling**
- **Custom Sound Assets + AI Generated Art**
- **Modular Components**

---

## Game Systems Implemented

### Complex Battle System

- `useReducer` logic handles turn order, abilties (current abilities: attacks, heals, buffs, group-buffs, smash attacks, & life-drain), & enemy AI
- Speed-based combat turn order
- Supports 1–3 enemies & 1-3 players per encounter
- Death sound effects on kills
- XP and gold from each kill
- Random enemy abilities

### Quest & Progress Tracking

- Quest logic
  - Quest stages update dynamically based on game state
- Progress tracking through `localStorage`
  - `receivedQuest`, `visitedEdenGrove`, `edenGroveCleansed`, etc.

### Party System

- Add party members
- Display stats, portraits, and level
- Level-up system with class-based stat growth
- Uses `Context` for global access and updates

### Inventory System

- Items stored in reducer-managed inventory
- Dynamic item addition and removal
- Tracks the quantity of items
- Gold system integrated with shop and battles

### Dialogue & Choices

- Dynamic dialogue trees
- Branching logic based on quest flags, location, and party
- Uses `localStorage` to check if the party has been to the location before
- Story interactions with town NPCs like:
  - Bobby the Monk (EdenGrove Quest)
  - Lisa the Bartender
  - Drunk Scholar
  - The Goat

---

## Current Game Map

| Region             | Actions                   |
| ------------------ | ------------------------- |
| EdenGrove Forest   | Explorable, Battle-ready  |
| Bronzebell Town    | Town Hub                  |
| World Map          | Travel                    |
| Spire Mountains    | Explorable, Battle-ready  |
| Emberfall Ruins    | Explorable, Battle-ready  |

---

## Playing the Game (NEW WAY TO PLAY)

Swole Hero Reborn now has an official domain

Play Swole Hero Reborn online @ https://swoleheroreborn.netlify.app/

## Running the Game (OLD WAY TO PLAY - IN CASE YOU ALREADY HAVE PROGRESS)

### Clone the repo

git clone [url]

### Navigate to repository

cd swole-hero-rpg-game

### Install dependencies

npm install

### Start development server

npm start

---

## Updating the Game (OLD WAY TO PLAY - IN CASE YOU ALREADY HAVE PROGRESS)

### Navigate to repository

cd path/to/swole-hero-rpg-game

### Pull in the updates

git pull

### Update dependencies

npm install

### Start development server

npm start

---

## Plans for Phase II

- Add **Spire Mountains**, **Emberfall Ruins**, and **Lustralis Kingdom**
- Create a save file using `localStorage`
- Add a prop for the dialogue images, so that the images change based off who's talking
- More side quests and branching dialogues
- Expand on the lore of **Eldoria**
- Get more info on the Demon King's armies/generals
- Create a boss for **Spire Mountains** and create a main questline boss for the **Emberfall Ruins**
- Full **prophecy arc** with Danny’s fate unfolding
- Flesh out **Lustralis Kingdom** as the World's central hub
