import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';

import DanielFace from '../../../../assets/images/DanielFace.png';
import ForestBossImage from '../../../../assets/images/EdenGroveBoss.png';

import '../../../../scss/All.scss';

const alphaEvents = [
  {
    text: 'The remaining wolves stop attacking, watching you in silence.',
    image: DanielFace,
  },
  {
    text: 'Danny cracks his knuckles, feeling unstoppable after taking them down.',
    image: DanielFace,
  },
  {
    text: "He notices the wolves exchanging glances... almost like they're waiting for something.",
    image: DanielFace,
  },
  {
    text: "A smirk creeps across his face. 'What, that's it? Guess no one here has the alpha mindset, huh?'",
    image: DanielFace,
  },
  {
    text: 'The wolves shift uncomfortably, their ears twitching at his words.',
    image: DanielFace,
  },
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

const ForestBossScreen = () => {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextEvent = () => {
    if (eventIndex < alphaEvents.length - 1) {
      setEventIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      className='Screen Full-Screen Forest-Boss-Screen'
      style={{
        backgroundImage: `url(${ForestBossImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox textBox={alphaEvents[eventIndex]} />

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
