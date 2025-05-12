import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../TextBox';

import DanielFace from '../../assets/images/DanielFace.png';
import world from '../../assets/images/world.png';

export default function WorldScreen() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const worldEvents = [
    {
      text: "Danny stumbles out of his house after a grueling night of Rocket League, where he lost a lot more than he'd care to admit.",
      image: DanielFace,
    },
    {
      text: "He stretches, cracks his knuckles, and confidently declares, 'Today is the day I finally get a girlfriend!'",
      image: DanielFace,
    },
    {
      text: 'He walks down the street like a man on a mission - armed with protein powder and misplaced confidence.',
      image: DanielFace,
    },
    {
      text: 'Suddenly, a loud honk fills the air. A truck barrels toward him at an alarming speed!',
      image: DanielFace,
    },
    {
      text: "Danny's eyes widen. 'No way… I can't die like this… without ever touching—'",
      image: DanielFace,
    },
    {
      text: 'Before he can react, the truck OBLITERATES him like a pancake. Everything goes black.',
      image: DanielFace,
    },
    {
      text: "Somewhere in the void, Danny hears an asian woman's voice: 'Young warrior... your new journey begins now...'",
      image: DanielFace,
    },
  ];

  const handleNextEvent = () => {
    if (eventIndex < worldEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      navigate('/fantasy-world');
    }
  };

  return (
    <div
      className='Screen World-Screen Full-Screen'
      style={{
        backgroundImage: `url(${world})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox textBox={worldEvents[eventIndex]} />
      <button className='Next-Btn' onClick={handleNextEvent}>
        {eventIndex < worldEvents.length - 1 ? 'Next' : 'Wake up'}
      </button>
    </div>
  );
}
