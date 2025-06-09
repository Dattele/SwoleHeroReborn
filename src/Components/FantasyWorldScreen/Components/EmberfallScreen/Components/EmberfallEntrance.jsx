import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import emberfall1 from '../../../../../assets/images/Emberfall1.png';
import emberfall1Clear from '../../../../../assets/images/Emberfall1Clear.png';
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
      text:`The party walks through the entrance and steps foot into Emberfall. 
        Danny: 'So this is Emberfall? I have seen cleaner locker rooms than this place.`,
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Even the Demon King's armies couldn't destroy the stench of your socks, Danny.'",
      image: JavonFace,
    },
    {
      text: "Ethan: 'This is really bad guys.. I can still taste the sand in my mouth.'",
      image: EthanFace,
    },
    {
      text: "Danny and Ja'von pause and look at each other then at Ethan. Ja'von: 'You good bro? Stop eating the sand'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Yoo lets focus up, take some pre-workout, and see what we can find around here.'",
      image: DanielFace,
    },
    {
      text: "*** Choose a party member for a perception check ***",
      image: DanielFace,
    },
  ];

  const perceptionChoices = [
    {
      text: 'Ethan',
      action: 'ethan',
    },
    {
      text: 'Danny',
      action: 'danny',
    },
    {
      text: "Ja'von",
      action: 'javon',
    },
  ]

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

  // Calulcate the chance of the perception succeeding 
  const perceptionCheck = (bonusChance) => {
    // 10% chance to start with each point adding 10%
    const chance = 0.1 + bonusChance * 0.1; 

    return Math.random() < chance;
  }

  // Handle the perception event
  const handlePerception = (choice) => {
    switch (choice.action) {
      case 'ethan': {
        const check = perceptionCheck(3.5);
        break;
      } case 'danny': {
        const check = perceptionCheck(4);
        break;
      } case 'javon': {
        const check = perceptionCheck(6.5);
        break;
      } default:
        break;
    }
  }

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
        backgroundImage: `url(${emberfall1Clear})`,
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
