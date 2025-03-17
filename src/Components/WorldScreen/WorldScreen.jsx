import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../TextBox';
import './WorldScreen.scss';
import world from '../../assets/images/world.png';

export default function WorldScreen() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const worldEvents = [
    "Danny stumbles out of his house after a grueling night of Rocket League, where he lost a lot more than he'd care to admit.",
    "He stretches, cracks his knuckles, and confidently declares, 'Today is the day I finally get a girlfriend!'",
    "He walks down the street like a man on a mission - armed with protein powder and misplaced confidence.",
    "Suddenly, a loud honk fills the air. A truck barrels toward him at an alarming speed!",
    "Danny's eyes widen. 'No way… I can't die like this… without ever touching—'",
    "Before he can react, the truck OBLITERATES him like a pancake. Everything goes black.",
    "Somewhere in the void, Danny hears an asian woman's voice: 'Young warrior... your new journey begins now...'"
  ];

  const handleNextEvent = () => {
    if (eventIndex < worldEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      navigate('/fantasy-world');
    }
  };

  return (
    <div className="World-Screen Full-Screen"  style={{ 
      backgroundImage: `url(${world})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <TextBox text={worldEvents[eventIndex]} />
      <button className='Next-Btn' onClick={handleNextEvent}>
        {eventIndex < worldEvents.length - 1 ? "Next" : "Wake up"}
      </button>
    </div>
  );
}