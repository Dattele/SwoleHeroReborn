import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../TextBox';
import fantasyBackground from '../../assets/images/map.webp';

//import './FantasyWorldScreen.scss';
import '../../scss/All.scss';

const fantasyEvents = [
  "A soft glow surrounds Danny as he slowly regains consciousness...",
  "He blinks. Instead of city streets, he's lying in a vast, open field",
  "A stunning Asian woman with long, flowing black hair and radiant golden robes descends gracefully from the sky.",
  "Danny squints. 'No way... I'm alive and there's an Asian baddy!?'",
  "The woman chuckles. 'Welcome to Eldoria, brave warrior. I am Seraphina, the goddess of this realm.'",
  "Danny pushes himself up, flexing instinctively. 'Damn, a literal goddess huh? So, uh… do you work out?'",
  "Seraphina raises an eyebrow. 'I have descended to bestow upon you a grand mission.'",
  "Danny leans in. 'How about you bestow upon me your number first?'",
  "Seraphina sighs - shaking her head. 'Defeat the Demon King first, and… perhaps I will consider it.'",
  "Danny's eyes widen. 'Wait, for real? Like, an actual date-date?'",
  "She smirks. 'Only if you prove yourself worthy. The fate of Eldoria —and my heart— rests in your hands.'",
  "Danny clenches his fist, standing tall. 'Alright, bet! Time to get shredded… and get a hot Asian girlfriend!'"
];

export default function FantasyWorldScreen() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextEvent = () => {
    if (eventIndex < fantasyEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      navigate('/plains');
    }
  };

  return (
    <div 
      className="Screen Fantasy-World-Screen Full-Screen" 
      style={{ 
        backgroundImage: `url(${fantasyBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox text={fantasyEvents[eventIndex]} />
      <button onClick={handleNextEvent} className='Next-Btn'>
        {eventIndex < fantasyEvents.length - 1 ? "Next" : "Begin the Journey"}
      </button>
    </div>
  );
}