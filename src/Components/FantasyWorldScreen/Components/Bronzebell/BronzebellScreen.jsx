import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../Context/DannyContext';
import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';

import Bronzebell from '../../../../assets/images/Bronzebell.webp';
import BronzebellGate from '../../../../assets/images/BronzebellGate.webp';
import bronzeGuard from '../../../../assets/images/BronzeGuard.png';
import danielFace from '../../../../assets/images/DanielFace.png';

import '../../../../scss/All.scss';

const bronzebellIntro = [
  {
    text: 'After surviving EdenGrove Forest and somehow getting even sweatier, Danny finally arrives at the edge of a fortified town.',
    image: danielFace,
  },
  {
    text: 'The gates open without question, and the scent of roasted meat, steel, and slightly questionable herbal supplements fill the air.',
    image: bronzeGuard,
  },
  {
    text: 'A guard gives Danny a quick once-over, then immediately looks away, as if unsure if he just saw a hero or a fever dream.',
    image: bronzeGuard,
  },
];

const bronzebellEvents = [
  {
    text: "'Welcome to Bronzebell... maybe I'll finally find a girlfriend here,' Danny says - flexing at absolutely no one.",
    image: danielFace,
  },
  {
    text: 'The people in town just stop and stare at him - wondering if he is clinically insane',
    image: danielFace,
  },
  {
    text: "Danny nods to himself. 'They are probably just intimidated by my gains.'",
    image: danielFace,
  },
  {
    text: 'He adjusts his lifting belt unnecessarily tight and struts deeper into town, confident in his delusion.',
    image: danielFace,
  },
  { text: 'Somewhere nearby, a goat bleats menacingly.', image: danielFace },
];

const locationChoices = [
  { text: '🛍 Rizz & Bits Market', nextScene: '/bronzebell/rizz-and-bits' },
  { text: '🍻 Ironhide Inn & Tavern', nextScene: '/bronzebell/ironhide' },
  { text: "🧘 Bobby's Shrine", nextScene: '/bronzebell/shrine' },
  { text: '⚔️ Training Grounds', nextScene: '/bronzebell/training' },
  { text: "🏛 Mayor's Hall", nextScene: '/bronzebell/mayor' },
  { text: '🐐 Goat', nextScene: '/bronzebell/goat' },
  { text: '🌍 World Map', nextScene: '/world-map' },
];

export default function BronzebellScreen() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [stage, setStage] = useState('intro');
  const [eventIndex, setEventIndex] = useState(0);

  const handleNextEvent = () => {
    const dialogue = stage === 'intro' ? bronzebellIntro : bronzebellEvents;
    if (eventIndex < dialogue.length - 1) {
      setEventIndex((prev) => prev + 1);
    } else {
      if (stage === 'intro') {
        setStage('events');
        setEventIndex(0);
      } else if (stage === 'events') {
        setStage('options');
        visitedLocation('visitedBronzebell');
      }
    }
  };

  const getBackgroundImage = () => {
    if (stage === 'intro') return BronzebellGate;
    return Bronzebell;
  };

  // Skip straight to choices if user has been to Bronzebell
  useEffect(() => {
    const userVisited = visited.includes('visitedBronzebell');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  return (
    <div
      className='Screen Full-Screen Bronzebell-Screen'
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox
            textBox={
              stage === 'intro'
                ? bronzebellIntro[eventIndex]
                : bronzebellEvents[eventIndex]
            }
          />
          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
        </>
      ) : (
        <>
          <TextBox
            textBox={{
              text: 'What would you like to check out?',
              image: danielFace,
            }}
          />
          <Choices options={locationChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
