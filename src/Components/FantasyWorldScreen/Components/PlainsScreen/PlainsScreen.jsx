import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';

import DanielFace from '../../../../assets/images/DanielFace.png';
import plainsBackground from '../../../../assets/images/plains2.png';

import '../../../../scss/All.scss';

const plainsEvents = [
  {
    text: 'With newfound purpose (and still no girlfriend), Danny steps onto the open road.',
    image: DanielFace,
  },
  {
    text: 'Rolling green hills stretch out before him, the path winding towards his next destination.',
    image: DanielFace,
  },
  {
    text: "Danny takes a deep breath, flexes for no reason, and grins. 'Alright, time to get this party started!'",
    image: DanielFace,
  },
  {
    text: 'In the distance, he sees a town — his first stop in Eldoria. Maybe they have a gym. Maybe they have single women. Or maybe both!?',
    image: DanielFace,
  },
  {
    text: 'To his right, a dense forest hums with the sounds of creatures, adventure… and potential EXP gains.',
    image: DanielFace,
  },
  {
    text: "Danny cracks his knuckles. 'Alright, I've got two options. Do I roll up to town looking like a total newbie, or do I hit the forest, grind some levels, and show up jacked?'",
    image: DanielFace,
  },
];

const choices = [
  {
    text: 'Head straight to town (Maybe they have a gym)',
    nextScene: '/bronzebell',
  },
  { text: 'Train in the forest (Time to grind EXP)', nextScene: '/forest' },
];

export default function PlainsScreen() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextEvent = () => {
    if (eventIndex < plainsEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  return (
    <div
      className='Screen Plains-Screen Full-Screen'
      style={{
        backgroundImage: `url(${plainsBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox textBox={plainsEvents[eventIndex]} />
      {eventIndex === plainsEvents.length - 1 ? (
        <Choices options={choices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
}
