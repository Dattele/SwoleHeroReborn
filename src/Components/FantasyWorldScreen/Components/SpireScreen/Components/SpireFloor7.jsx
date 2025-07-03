import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import NPCChoices from '../../../../System/NPCChoices';
import SpireBattle from '../../../../Battle/SpireBattle';
import SpireMonsters from '../../../../Monster/SpireMonsters';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor7 from '../../../../../assets/images/SpireFloor7.png';
import spireFloor7Cleared from '../../../../../assets/images/SpireFloor7Cleared.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

const spireFloor7Events = [
  {
    text: 'Snow lashes their faces as the party pushes forward through the blinding blizzard. The wind howls like a beast unchained.',
    image: DanielFace,
  },
  {
    text: "Ethan: 'I can't feel my face... or my legs... or anything below my neck.'",
    image: EthanFace,
  },
  {
    text: "Ja'von: 'Look ahead - there's shadows in the storm. Figures... unmoving.'",
    image: DanielFace,
  },
  {
    text: "Danny: 'Yooo! You guys guarding a gym up there or just getting snowed on for fun!?'",
    image: JavonFace,
  },
  {
    text: 'The shapes remain still, yet breathing. Two armored dwarves, massive and ancient, flanking a frost-bitten figure clutching a battle-worn axe.',
    image: DanielFace,
  },
  {
    text: "Ethan: 'Okay... I don't think they're the chatty type.'",
    image: EthanFace,
  },
  {
    text: "Ja'von: 'No words. Just duty. These are the last sentinels. If we pass them... there is no turning back.'",
    image: JavonFace,
  },
  {
    text: "Danny: 'Then let's make this quick. I've got a date with a Demon King and a dumbbell!'",
    image: DanielFace,
  },
  {
    text: '** The dwarves raise their weapons in silence. Prepare for battle. **',
    image: DanielFace,
  },
];

const continueChoices = [
  {
    text: 'Flex your way to the top (Restores Party HP)',
    action: 'leave',
  },
];

const battleChoices = [
  {
    text: 'Begin the Battle!',
    action: 'battle',
  },
];

export default function SpireFloor7() {
  const { restorePartyHP } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [battleEnd, setBattleEnd] = useState('');
  const [beginBattle, setBeginBattle] = useState(false);

  const handleNextEvent = (event, setIndex) => {
    setIndex((prev) => {
      if (prev < event.length - 1) return prev + 1;
    });
  };

  // Handle the user's choice
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'battle':
        // Begin the battle
        setBeginBattle(true);
        break;
      case 'leave':
        // Navigate to the next floor after restoring HP
        restorePartyHP();
        navigate('/spire-boss');
        break;
      default:
        break;
    }
  };

  // Get the correct background image
  const getBackgroundImage = () => {
    if (battleEnd !== 'win') return spireFloor7;
    return spireFloor7Cleared;
  };

  return (
    <div
      className='Screen Full-Screen Spire-Floor-7-Screen'
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {beginBattle ? (
        <>
          {battleEnd !== 'win' && (
            <SpireBattle
              enemies={[SpireMonsters[5], SpireMonsters[5], SpireMonsters[1]]}
              battleEnd={battleEnd}
              setBattleEnd={setBattleEnd}
            />
          )}
          {battleEnd === 'win' && (
            <>
              <TextBox
                textBox={{
                  text: "Ja'von: 'I have a bad feeling about this.'",
                  image: JavonFace,
                }}
              />
              <NPCChoices
                options={continueChoices}
                onChoiceSelected={handleChoice}
              />
            </>
          )}
        </>
      ) : (
        <>
          <TextBox textBox={spireFloor7Events[eventIndex]} />

          {eventIndex === spireFloor7Events.length - 1 ? (
            <NPCChoices
              options={battleChoices}
              onChoiceSelected={handleChoice}
            />
          ) : (
            <button
              className='Next-Btn'
              onClick={() => handleNextEvent(spireFloor7Events, setEventIndex)}
            >
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
}
