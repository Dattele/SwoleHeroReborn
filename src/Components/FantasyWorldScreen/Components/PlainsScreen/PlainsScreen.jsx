import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';
import plainsBackground from '../../../../assets/images/plains.png';

//import './PlainsScreen.scss';
import '../../../../scss/All.scss';

const plainsEvents = [
  'With newfound purpose (and still no girlfriend), Danny steps onto the open road.',
  'Rolling green hills stretch out before him, the path winding towards his next destination.',
  "Danny takes a deep breath, flexes for no reason, and grins. 'Alright, time to get this party started!'",
  'In the distance, he sees a town — his first stop in Eldoria. Maybe they have a gym. Maybe they have single women. Or maybe both!?',
  'To his right, a dense forest hums with the sounds of creatures, adventure… and potential EXP gains.',
  "Danny cracks his knuckles. 'Alright, I’ve got two options. Do I roll up to town looking like a total newbie, or do I hit the forest, grind some levels, and show up jacked?'",
];

const choices = [
  { text: 'Head straight to town (Maybe they have a gym)', nextScene: '/bronzebell' },
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
      <TextBox text={plainsEvents[eventIndex]} />
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
