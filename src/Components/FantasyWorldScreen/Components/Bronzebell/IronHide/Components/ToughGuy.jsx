import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../../Context/DannyContext';
import TextBox from '../../../../../TextBox';
import Choices from '../../../../../Choices';
import ToughGuyScene from '../../../../../../assets/images/ToughGuyScene.png';

import './Components.scss';
import '../../../../../../scss/All.scss';

export default function ToughGuy() {
  const { gainGold } = useDanny();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const navigate = useNavigate();

  const toughGuyDialogue = [
    'You spot a bulky man at the end of the bar, cracking his knuckles and glaring at a mug like it owes him money.',
    "'You look like trouble,' he growls. 'Wanna lose in an arm wrestle to someone with calluses older than you?'",
    "Danny just laughs - 'Buddy, my biceps have biceps. Let's go.'",
    "You lock arms. 'Three... two... one—GO!' There's tension. Sweat. And dramatic grunts.",
    'A loud THWACK echoes as Danny slams the guys hand down through the table',
    "Tough Guy grimaces in pain as Danny stands up - 'I train arms every day that ends in Y.'",
    'The man groans and tosses you a small coin pouch. [ You earned 5 gold 💰 ]',
  ];

  const choices = [
    {
      text: "Kiss your biceps before leaving - 'you babies never let me down'",
      nextScene: '/bronzebell/ironhide',
    },
    {
      text: 'Congratulate him for holding his own and head out',
      nextScene: '/bronzebell/ironhide',
    },
  ];

  const secondTimeChoices = [
    {
      text: 'You decide to give him some space when he starts crying..',
      nextScene: '/bronzebell/ironhide',
    },
  ];

  const handleNextEvent = () => {
    if (eventIndex < toughGuyDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    }
    if (eventIndex + 1 === toughGuyDialogue.length - 1) {
      console.log('adding 5 gold');
      gainGold(5);
    }
  };

  // Skip straight to choices if user has been to the Tough Guy
  useEffect(() => {
    const visited = localStorage.getItem('visitedToughGuy') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the toughGuy dialogue is complete
  useEffect(() => {
    if (eventIndex === toughGuyDialogue.length - 1) {
      localStorage.setItem('visitedToughGuy', 'true');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Tough-Guy-Screen'
      style={{
        backgroundImage: `url(${ToughGuyScene})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox text={toughGuyDialogue[eventIndex]} />

          {eventIndex === toughGuyDialogue.length - 1 ? (
            <Choices options={choices} onChoiceSelected={navigate} />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : (
        <>
          <TextBox text={"Let's go cheer him up (by reminding him who won)."} />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
