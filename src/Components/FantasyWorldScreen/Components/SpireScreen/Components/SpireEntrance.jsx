import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import spireEntrance from '../../../../../assets/images/SpireEntrance.png';

import '../../../../../scss/All.scss';
import './Spire.scss';

export default function SpireEntrance() {
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');

  const spireEntranceEvents = [
    'The party pushes through the freezing wind - and there stands a crumbled stone archway carved into the mountain face.',
    "Danny: 'Yo... who built this? Giants? Dwarves? Either way, they skipped leg day.'",
    "Ethan: 'Looks abandoned... but if we go in there, we're basically signing up for a cold, crunchy death.'",
    "Ja'von: 'Strength is forged in trials, not taverns. The path forward demands courage - and better insulation.'",
    "Danny: 'Then let's get it. Ice in the veins, gains on the brain.'",
  ];

  const choices = [
    {
      text: 'Head into the archway',
      nextScene: '/spire-floor-1',
    },
    {
      text: "Ethan: 'Guys I'm tired and need some Ale.. can we head back please'",
      nextScene: '/bronzebell',
    },
  ];

  const handleNextEvent = () => {
    if (eventIndex < spireEntranceEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Skip straight to choices if user has been to the Spire Entrance
  useEffect(() => {
    const visited = localStorage.getItem('visitedSpireEntrance') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the spireEntranceEvents dialogue is complete
  useEffect(() => {
    if (eventIndex === spireEntranceEvents.length - 1) {
      localStorage.setItem('visitedSpireEntrance', 'true');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Spire-Entrance-Screen'
      style={{
        backgroundImage: `url(${spireEntrance})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox text={spireEntranceEvents[eventIndex]} />

          {eventIndex === spireEntranceEvents.length - 1 ? (
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
              'The mountains groan under their own weight. The cold bites harder this time.'
            }
          />
          <Choices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
