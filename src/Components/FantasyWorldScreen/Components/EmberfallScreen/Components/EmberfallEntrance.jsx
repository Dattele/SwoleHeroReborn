import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import emberfallEntrance from '../../../../../assets/images/SpireEntrance.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

export default function EmberfallEntrance() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');

  const emberfallEntranceEvents = [
    {
      text: 'The party pushes through the freezing wind - and there stands a crumbled stone archway carved into the mountain face.',
      image: DanielFace,
    },
    {
      text: "Danny: 'Yo... who built this? Giants? Dwarves? Either way, they skipped leg day.'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Looks abandoned... but if we go in there, we're basically signing up for a cold, crunchy death.'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Strength is forged in trials, not taverns. The path forward demands courage - and better insulation.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Then let's get it. Ice in the veins, gains on the brain.'",
      image: DanielFace,
    },
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
    if (eventIndex < emberfallEntranceEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Skip straight to choices if user has been to the Emberfall Entrance
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfallEntrance');
    if (userVisited) {
      setStage('options');
    }
  }, []);

  // Checks for when the emberfallEntranceEvents dialogue is complete
  useEffect(() => {
    if (eventIndex === emberfallEntranceEvents.length - 1) {
      visitedLocation('visitedEmberfallEntrance');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Spire-Entrance-Screen'
      style={{
        backgroundImage: `url(${emberfallEntrance})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={emberfallEntranceEvents[eventIndex]} />

          {eventIndex === emberfallEntranceEvents.length - 1 ? (
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
            textBox={{
              text: 'The mountains groan under their own weight. The cold bites harder this time.',
              image: DanielFace,
            }}
          />
          <Choices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
