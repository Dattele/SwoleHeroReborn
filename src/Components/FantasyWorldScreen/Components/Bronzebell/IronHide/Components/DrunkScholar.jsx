import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../../TextBox';
import Choices from '../../../../../Choices';
import drunkscholar from '../../../../../../assets/images/drunkscholar.png';

import './Components.scss';
import '../../../../../../scss/All.scss';

export default function DrunkScholar() {
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const navigate = useNavigate();

  const drunkScholarDialogue = [
    'You approach a scholar hunched over the bar, mumbling at his drink.',
    "'He doesn't just conquer... he consumes. Cities vanish. No names, no rubble. It's like history itself fears him.'",
    "He swirls his drink, staring off into the distance - 'Wes leads his armies now. Bright kid. Smarter than me. Now he whispers in the dark like it's a language.'",
    "Danny just looks at him - 'Right... so, the Demon King is, what? Hungry for attention?'",
    "'The scholar slams his glass down 'NO! He's hungry for blood. Have you ever seen a whole town just vanish? With no survivors?'",
    "Danny: 'I mean, I forgot leg day once and that still haunts me, so I get it.'",
    "'There are no victories, only death, like they never existed.'",
    "Danny laughs - 'Sounds like my dating history.'",
    "The scholar starts slamming his head against the table. 'You're all gonna burn! We're already dead! You just don't know it yet!'",
    "Danny looks around in shock - 'Well that guy needs to take a chill pill!'",
  ];

  const choices = [
    { text: 'Get away from that weirdo', nextScene: '/bronzebell/ironhide' },
    { text: 'Leave at once', nextScene: '/bronzebell/ironhide' },
  ];

  const secondTimeChoices = [
    {
      text: 'Beer, biceps, and bad decisions await',
      nextScene: '/bronzebell/ironhide',
    },
  ];

  const handleNextEvent = () => {
    if (eventIndex < drunkScholarDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Skip straight to choices if user has been to the Drunk Scholar
  useEffect(() => {
    const visited = localStorage.getItem('visitedDrunkScholar') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the drunkScholar dialogue is complete
  useEffect(() => {
    if (eventIndex === drunkScholarDialogue.length - 1) {
      localStorage.setItem('visitedDrunkScholar', 'true');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Drunk-Scholar-Screen'
      style={{
        backgroundImage: `url(${drunkscholar})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox text={drunkScholarDialogue[eventIndex]} />

          {eventIndex === drunkScholarDialogue.length - 1 ? (
            <Choices options={choices} onChoiceSelected={navigate} />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : (
        <>
          <TextBox
            text={
              'The scholar mutters something about cheese wheels and teleportation. Best not to ask.'
            }
          />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
