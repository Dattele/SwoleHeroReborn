import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';

import DanielFace from '../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../assets/images/JavonFace.png';
import spireBackground from '../../../../assets/images/Spire.png';

import '../../../../scss/All.scss';

export default function SpireScreen() {
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('spireEvents');

  const spireDialogue = {
    spireEvents: [
      { text: 'The party steps through a narrow mountain pass into the vast frozen ridge of the Spire Mountains. Snow falls gently. Wind howls through the peaks.', image: DanielFace },
      { text: "Ethan: 'Damn, it's freezing. Feels like my nipples could cut steel.'", image: EthanFace },
      { text: "Ja'von: 'Charming visual. Remind me to never fight shirtless beside you.'", image: JavonFace },
      { text: "Danny: 'Snow on the ground and no pump in sight? This place is cursed.'", image: DanielFace },
      { text: "A distant voice echoes throughout the mountains - 'Turn back, surface-dwellers or be buried beneath the frost.'", image: DanielFace },
      { text: "Ja'von: 'Well that didn't sound like a welcome party..'", image: JavonFace },
      { text: "Ethan: 'If that was the welcome, I really don't wanna meet the bouncer.'", image: EthanFace },
      { text: "Danny: 'Alright. No gyms? No girls? Just mountains and monsters? Let's get to work boys.'", image: DanielFace },
    ],

    spireInteriorEvents: [
      { text: 'The path narrows as the party descends between the jagged cliffs, the snow crunching under their boots.', image: DanielFace },
      { text: "Danny: 'Man, I feel like I'm walking into a protein-shake commercial gone wrong.'", image: DanielFace },
      { text: "Ethan: 'Something's off... No birds. No sound. Just wind and rocks.'", image: EthanFace },
      { text: "Ja'von: 'Eyes sharp. I've read about ambushes in places like this. The cold isn't the only thing that bites up here.'", image: JavonFace },
      { text: "Danny: 'Alright, bros. Are we pressing on or heading back for hot meat and warmer company?'", image: DanielFace },
    ],
  };

  const spireChoices = [
    {
      text: '💪 Press onwards',
      nextScene: '/spire-entrance',
    },
    {
      text: '🍖 Head back to Bronzebell (hot meat and warm company)',
      nextScene: '/bronzebell',
    },
  ];

  const secondTimeChoices = [
    {
      text: '💪 Climb deeper into the cold',
      nextScene: '/spire-entrance',
    },
    {
      text: "🔥 'Bros, I miss warm food and warmer taverns.' - Ethan",
      nextScene: '/bronzebell',
    },
  ];

  const handleNextEvent = () => {
    if (eventIndex < spireDialogue[stage].length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Change to the next dialogue options
  const handleNextDialogue = () => {
    setStage(stage === 'spireEvents' && 'spireInteriorEvents');
    setEventIndex(0);
  };

  // Skip straight to choices if user has been to the Spire Mountains
  useEffect(() => {
    const visited = localStorage.getItem('visitedSpire') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the spireInteriorEvents dialogue is complete
  useEffect(() => {
    if (
      eventIndex === spireDialogue.spireInteriorEvents.length - 1 &&
      stage === 'spireInteriorEvents'
    ) {
      localStorage.setItem('visitedSpire', 'true');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Spire-Screen'
      style={{
        backgroundImage: `url(${spireBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={spireDialogue[stage][eventIndex]} />

          {eventIndex === spireDialogue[stage].length - 1 ? (
            stage === 'spireEvents' ? (
              <button className='Btn' onClick={handleNextDialogue}>
                Head into the mountains
              </button>
            ) : (
              <Choices options={spireChoices} onChoiceSelected={navigate} />
            )
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : (
        <>
          <TextBox
            textBox={{
              text: 'The mountains groan under their own weight. The cold bites harder this time.',
              image: DanielFace,
            }}
          />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
