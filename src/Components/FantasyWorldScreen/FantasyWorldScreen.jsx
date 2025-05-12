import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../TextBox';

import DanielFace from '../../assets/images/DanielFace.png';
import fantasyBackground from '../../assets/images/Eldoria.png';
import SeraphinaFace from '../../assets/images/SeraphinaFace.png';

import '../../scss/All.scss';

const fantasyEvents = [
  {
    text: 'A soft glow surrounds Danny as he slowly regains consciousness...',
    image: DanielFace,
  },
  {
    text: "He blinks. Instead of city streets, he's lying in a vast, open field",
    image: DanielFace,
  },
  {
    text: 'A stunning Asian woman with long, flowing black hair and radiant golden robes descends gracefully from the sky.',
    image: SeraphinaFace,
  },
  {
    text: "Danny squints. 'No way... I'm alive and there's an Asian baddy!?'",
    image: DanielFace,
  },
  {
    text: "The woman chuckles. 'Welcome to Eldoria, brave warrior. I am Seraphina, the goddess of this realm.'",
    image: SeraphinaFace,
  },
  {
    text: "Danny pushes himself up, flexing instinctively. 'Damn, a literal goddess huh? So, uh… do you work out?'",
    image: DanielFace,
  },
  {
    text: "Seraphina raises an eyebrow. 'I have descended to bestow upon you a grand mission.'",
    image: SeraphinaFace,
  },
  {
    text: "Danny leans in. 'How about you bestow upon me your number first?'",
    image: DanielFace,
  },
  {
    text: "Seraphina sighs - shaking her head. 'Defeat the Demon King first, and… perhaps I will consider it.'",
    image: SeraphinaFace,
  },
  {
    text: "Danny's eyes widen. 'Wait, for real? Like, an actual date-date?'",
    image: DanielFace,
  },
  {
    text: "She smirks. 'Only if you prove yourself worthy. The fate of Eldoria - and my heart - rests in your hands.'",
    image: SeraphinaFace,
  },
  {
    text: "Danny clenches his fist, standing tall. 'Alright, bet! Time to get shredded… and get a hot Asian girlfriend!'",
    image: DanielFace,
  },
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
      className='Screen Fantasy-World-Screen Full-Screen'
      style={{
        backgroundImage: `url(${fantasyBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox textBox={fantasyEvents[eventIndex]} />
      <button onClick={handleNextEvent} className='Next-Btn'>
        {eventIndex < fantasyEvents.length - 1 ? 'Next' : 'Begin the Journey'}
      </button>
    </div>
  );
}
