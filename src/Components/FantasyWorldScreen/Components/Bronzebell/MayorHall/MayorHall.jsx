import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices/Choices';

import DanielFace from '../../../../../assets/images/DanielFace.png';
import mayorHall from '../../../../../assets/images/MayorHall.png';
import MayorFace from '../../../../../assets/images/MayorFace.png';

import './MayorHall.scss';
import '../../../../../scss/All.scss';

export default function Mayor() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');

  const firstVisitDialogue = [
    {
      text: "You enter the Mayor's Hall — it smells like stress and burnt ink.",
      image: DanielFace,
    },
    {
      text: "A balding man buried in parchment looks up. 'Ah, another hero. Wonderful. Let me guess — you're here about the goat?'",
      image: MayorFace,
    },
    {
      text: "Danny: 'No. Well, kind of. But also I'm saving the world.'",
      image: DanielFace,
    },
    {
      text: "'Right. Add that to the pile. I'm Mayor Guffin, professional paper-pusher and part-time panic manager.'",
      image: MayorFace,
    },
    {
      text: "'Bronzebell's barely hanging on. Trade routes are closed, EdenGrove was rotting, and don't get me started on the economy.'",
      image: MayorFace,
    },
    {
      text: "'We used to be a hub for travelers, you know. Before the corruption, before the King fell silent, before...' he sighs. 'Before the fear set in.'",
      image: MayorFace,
    },
    {
      text: "He leans back in his chair. 'Just... be careful out there. People are starting to believe the Demon King can't be stopped.'",
      image: MayorFace,
    },
    {
      text: 'Danny flexes silently as paperwork flutters off the desk.',
      image: DanielFace,
    },
    {
      text: "'...Right. Try not to break anything on your way out.'",
      image: MayorFace,
    },
  ];

  const choices = [{ text: 'Return to Town Square', nextScene: '/bronzebell' }];

  const handleNextEvent = () => {
    if (eventIndex < firstVisitDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Skip straight to choices if user has been to the Mayor Hall
  useEffect(() => {
    const userVisited = visited.includes('visitedMayorHall');
    if (userVisited) {
      setStage('options');
    }
  }, []);

  // Checks for when the firstVisit dialogue is complete
  useEffect(() => {
    if (eventIndex === firstVisitDialogue.length - 1) {
      visitedLocation('visitedMayorHall');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Mayor-Screen'
      style={{
        backgroundImage: `url(${mayorHall})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={firstVisitDialogue[eventIndex]} />

          {eventIndex === firstVisitDialogue.length - 1 ? (
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
              text: "What are you doing back here? Go talk to Bobby if you haven't already",
              image: MayorFace,
            }}
          />
          <Choices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
