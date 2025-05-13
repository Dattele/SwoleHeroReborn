import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import NPCChoices from '../../../../System/NPCChoices';
import SpireBattle from '../../../../Battle/SpireBattle';
import { useDanny } from '../../../../../Context/DannyContext';
import { SpireBossMonster } from '../../../../Monster/SpireMonsters/SpireMonsters';

import ascendScene from '../../../../../assets/images/AscendScene.png';
import balrogScene from '../../../../../assets/images/BalrogScene.png';
import BalrogFace from '../../../../../assets/images/BalrogFace.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

export default function SpireBoss() {
  const { updateQuestFlag } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [battleEnd, setBattleEnd] = useState('');
  const [stage, setStage] = useState('ascend');

  const finalAscendEvents = [
    { text: 'The blizzard fades. The wind dies. A stillness settles over the mountain - unnatural, heavy, almost... afraid.', image: DanielFace },
    { text: "Ethan: 'Why'd the snow stop? I don't like that... Snow doesn't just quit.'", image: EthanFace },
    { text: "Danny: 'Either we reached the summit... or we're about to get grilled harder than my protein steaks.'", image: DanielFace },
    { text: "Ja'von: 'The air itself recoils. This silence... it is not peace. It is fear.'", image: JavonFace },
    { text: 'A faint red glow pulses beyond the final ridge — like a heartbeat beneath stone.', image: DanielFace },
    { text: "Danny: 'Alright. Deep breath, boys. One last climb. One last rep!'", image: DanielFace },
  ];

  const balrogEvents = [
    { text: 'The party reaches the summit... and the world changes.', image: DanielFace },
    { text: 'Flames crack through the cracked stone beneath them. The air shimmers. Heat blisters the frost-bitten rocks. There is no snow — only scorched earth.', image: DanielFace },
    { text: 'A colossal shadow rises from the crater ahead, wreathed in fire with eyes like molten coals.', image: BalrogFace },
    { text: "Ethan: 'Uhhh... did anyone else just involuntarily flex in fear?'", image: EthanFace },
    { text: "Ja'von: 'A Balrog. A flame of the ancient world - forged in rage and shadow.'", image: JavonFace },
    { text: "Danny: 'That's... that's a LOT of gym memberships worth of muscle.'", image: DanielFace },
    { text: 'The creature steps forward. The mountain trembles.', image: BalrogFace },
    { text: 'The Balrog roars - not a sound, but a force - and the flames behind it rise like a curtain unveiling death.', image: BalrogFace },
    { text: '** Boss Battle: Balrog, Flame of the Spire - BEGIN ! **', image: BalrogFace },
  ];

  const choices = [
    {
      text: '⚔️ Confront the Flame',
      action: 'battle',
    },
    {
      text: '⬅️ Head back and re-think life',
      action: 'leave',
    },
  ];

  const leaveChoices = [
    {
      text: 'Inform Bobby',
      nextScene: '/bronzebell/shrine',
    },
  ];

  const handleNextEvent = (event, setIndex) => {
    setIndex((prev) => {
      if (prev < event.length - 1) return prev + 1;
      else if (prev === event.length - 1 && stage === 'ascend') {
        // Advance the stage to balrog and set index to 0
        setStage('balrog');
        return 0;
      }
    });
  };

  // Handle the user's choice
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'battle':
        // Begin the battle
        setStage('battle');
        break;
      case 'leave':
        // Navigate to the next floor after restoring HP
        alert('Dont be a pussy!');
        break;
      default:
        break;
    }
  };

  // Get the correct background image
  const getBackgroundImage = () => {
    if (stage === 'ascend') return ascendScene;
    return balrogScene;
  };

  // When the battle ends and the party win then set the spire quest to complete
  useEffect(() => {
    if (battleEnd === 'win') {
      updateQuestFlag('spire', 'completed');
    }
  }, [battleEnd]);

  return (
    <div
      className='Screen Full-Screen Spire-Boss-Screen'
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage === 'ascend' ? (
        <>
          <TextBox textBox={finalAscendEvents[eventIndex]} />
          <button
            className='Next-Btn'
            onClick={() => handleNextEvent(finalAscendEvents, setEventIndex)}
          >
            Next
          </button>
        </>
      ) : stage === 'balrog' ? (
        <>
          <TextBox textBox={balrogEvents[eventIndex]} />

          {eventIndex === balrogEvents.length - 1 ? (
            <NPCChoices options={choices} onChoiceSelected={handleChoice} />
          ) : (
            <button
              className='Next-Btn'
              onClick={() => handleNextEvent(balrogEvents, setEventIndex)}
            >
              Next
            </button>
          )}
        </>
      ) : (
        <>
          {battleEnd !== 'win' && (
            <SpireBattle
              enemies={[SpireBossMonster[0]]}
              battleEnd={battleEnd}
              setBattleEnd={setBattleEnd}
            />
          )}
          {battleEnd === 'win' && (
            <>
              <TextBox textBox={{ text: "The Balrog collapses in fire and fury. The summit belongs to the swole. **[ Quest Completed: The Spire's Crucible ]**", image: DanielFace }} />
              <Choices options={leaveChoices} onChoiceSelected={navigate} />
            </>
          )}
        </>
      )}
    </div>
  );
}
