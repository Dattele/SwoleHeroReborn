import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';
import Bronzebell from '../../../../assets/images/Bronzebell.webp';
import BronzebellGate from '../../../../assets/images/BronzebellGate.webp';

import '../../../../scss/All.scss';

export default function BronzebellScreen() {
  const navigate = useNavigate();

  const [stage, setStage] = useState('intro');
  const [eventIndex, setEventIndex] = useState(0);

  const bronzebellIntro = [
    'After surviving EdenGrove Forest and somehow getting even sweatier, Danny finally arrives at the edge of a fortified town.',
    'The gates open without question, and the scent of roasted meat, steel, and slightly questionable herbal supplements fill the air.',
    'A guard gives Danny a quick once-over, then immediately looks away, as if unsure if he just saw a hero or a fever dream.',
  ];

  const bronzebellEvents = [
    "'Welcome to Bronzebell... maybe I'll finally find a girlfriend here,' Danny says - flexing at absolutely no one.",
    'The people in town just stop and stare at him - wondering if he is clinically insane',
    "Danny nods to himself. 'They are probably just intimidated by my gains.'",
    'He adjusts his lifting belt unnecessarily tight and struts deeper into town, confident in his delusion.',
    'Somewhere nearby, a goat bleats menacingly.',
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

  const handleNextEvent = () => {
    const dialogue = stage === 'intro' ? bronzebellIntro : bronzebellEvents;
    if (eventIndex < dialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      if (stage === 'intro') {
        setStage('events');
        setEventIndex(0);
      } else if (stage === 'events') {
        setStage('options');
        localStorage.setItem('visitedBronzebell', 'true'); // Save the visit
      }
    }
  };

  const getBackgroundImage = () => {
    if (stage === 'intro') return BronzebellGate;
    return Bronzebell;
  };

  // Skip straight to choices if user has been to Bronzebell
  useEffect(() => {
    const visited = localStorage.getItem('visitedBronzebell') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

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
            text={
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
          <TextBox text={'What would you like to check out?'} />
          <Choices options={locationChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
