import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../../TextBox';
import Choices from '../../../../../Choices';
import ToughGuyScene from '../../../../../../assets/images/ToughGuyScene.png';

import './Components.scss';
import '../../../../../../scss/All.scss';

export default function ToughGuy() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const toughGuyDialogue = [
    'You spot a bulky man at the end of the bar, cracking his knuckles and glaring at a mug like it owes him money.',
    "'You look like trouble,' he growls. 'Wanna lose in an arm wrestle to someone with calluses older than you?'",
    "Danny just laughs - 'Buddy, my biceps have biceps. Let's go.'",
    "You lock arms. 'Three... two... one—GO!' There's tension. Sweat. A dramatic grunt off.",
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

  const handleNextEvent = () => {
    if (eventIndex < toughGuyDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    }
    if (eventIndex + 1 === toughGuyDialogue.length - 1) {
      console.log('adding 5 gold');
      // addGold(5);
    }
  };

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
      <TextBox text={toughGuyDialogue[eventIndex]} />

      {eventIndex === toughGuyDialogue.length - 1 ? (
        <Choices options={choices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
}
