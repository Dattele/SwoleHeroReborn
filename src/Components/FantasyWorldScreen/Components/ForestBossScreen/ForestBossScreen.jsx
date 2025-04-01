import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';
import ForestBossIntro from '../../../../assets/images/ForestBossIntro.webp';

import '../../../../scss/All.scss';

const ForestBossScreen = () => {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextEvent = () => {
    if (eventIndex < alphaEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  const alphaEvents = [
    'The remaining wolves stop attacking, watching you in silence.',
    'Danny cracks his knuckles, feeling unstoppable after taking them down.',
    "He notices the wolves exchanging glances... almost like they're waiting for something.",
    "A smirk creeps across his face. 'What, that's it? Guess no one here has the alpha mindset, huh?'",
    'The wolves shift uncomfortably, their ears twitching at his words.',
  ];

  const choices = [
    {
      text: "Yell out - 'Wow, you guys are weaker than my Tinder matches!'",
      nextScene: 'battle',
    },
    {
      text: "Shrug - 'Well, I gotta get back to leveling up to impress girls!'",
      nextScene: '/forest',
    },
  ];

  return (
    <div
      className='Screen Full-Screen Forest-Boss-Screen'
      style={{
        backgroundImage: `url(${ForestBossIntro})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox text={alphaEvents[eventIndex]} />

      {eventIndex === alphaEvents.length - 1 ? (
        <Choices options={choices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
};

export default ForestBossScreen;
