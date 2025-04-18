import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices/Choices';

import mayorHall from '../../../../../assets/images/MayorHall.png';

import './MayorHall.scss';
import '../../../../../scss/All.scss';

export default function Mayor() {
  const navigate = useNavigate();

  // const [visited, setVisited] = useState(() => {
  //   return localStorage.getItem('visitedMayorHall') === 'true';
  // });
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');

  // const edenGroveCleansed =
  //   localStorage.getItem('edenGroveCleansed') === 'true';
  // const hasParty = localStorage.getItem('hasParty') === 'true';

  const firstVisitDialogue = [
    "You enter the Mayor's Hall — it smells like stress and burnt ink.",
    "A balding man buried in parchment looks up. 'Ah, another hero. Wonderful. Let me guess — you're here about the goat?'",
    "Danny: 'No. Well, kind of. But also I'm saving the world.'",
    "'Right. Add that to the pile. I'm Mayor Guffin, professional paper-pusher and part-time panic manager.'",
    "'Bronzebell's barely hanging on. Trade routes are closed, EdenGrove was rotting, and don't get me started on the economy.'",
    "'We used to be a hub for travelers, you know. Before the corruption, before the King fell silent, before...' he sighs. 'Before the fear set in.'",
    "He leans back in his chair. 'Just... be careful out there. People are starting to believe the Demon King can't be stopped.'",
    'Danny flexes silently as paperwork flutters off the desk.',
    "'...Right. Try not to break anything on your way out.'",
  ];

  // const midQuestDialogue = [
  //   "'Back again?' Mayor Guffin mutters without looking up.",
  //   "'We're still alive, so I assume you're doing something right. Or at least not causing property damage.'",
  //   "'If you find a way to tax goats, let me know. That beast owes this town three benches and one identity crisis.'",
  // ];

  const choices = [{ text: 'Return to Town Square', nextScene: '/bronzebell' }];

  // let currentDialogue;
  // if (!visited) {
  //   currentDialogue = firstVisitDialogue;
  // } else {
  //   currentDialogue = midQuestDialogue;
  // }

  const handleNextEvent = () => {
    if (eventIndex < firstVisitDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Skip straight to choices if user has been to the Mayor Hall
  useEffect(() => {
    const visited = localStorage.getItem('visitedMayorHall') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the firstVisit dialogue is complete
  useEffect(() => {
    if (eventIndex === firstVisitDialogue.length - 1) {
      localStorage.setItem('visitedMayorHall', 'true');
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
          <TextBox text={firstVisitDialogue[eventIndex]} />

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
            text={
              "What are you doing back here? Go talk to Bobby if you haven't already"
            }
          />
          <Choices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
