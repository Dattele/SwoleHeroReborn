import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import NPCChoices from '../../../../System/NPCChoices';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor6 from '../../../../../assets/images/SpireFloor6.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

export default function SpireFloor6() {
  const { restorePartyHP } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);

  const spireFloor6Events = [
    {
      text: 'The wind eases. The air, though cold, feels calm. The path levels out into a quiet ridge - a rare plateau near the summit.',
      image: DanielFace,
    },
    {
      text: "Ethan: 'This snow's getting deeper… at this rate we'll be buried before we reach the top.'",
      image: EthanFace,
    },
    {
      text: "Danny: 'Good. Maybe it'll freeze off my soreness.'",
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Strange... the wind carries no threat here. It's as if the mountain itself lets us rest.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Or it's just catching its breath before our bench-off'",
      image: DanielFace,
    },
    {
      text: "Danny stretches with a loud groan. 'Alright boys. Quick break. We eat some protein, then finish this climb and crush whatever's waiting up there.'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Please let it be a women's spa. Or a planet fitness. Or a women's spa inside a planet fitness!'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Unlikely. But let us enjoy one last silence before the storm.'",
      image: JavonFace,
    },
    {
      text: '** The party starts a fire and rests overnight after Danny defeated Ethan in an arm-wrestling match for the right to sleep on the bench. **',
      image: DanielFace,
    },
    { text: '** Party HP has been restored. **', image: DanielFace },
  ];

  const choices = [
    {
      text: '⛰️ Keep Climbing',
      action: 'leave',
    },
  ];

  const handleNextEvent = (event, setIndex) => {
    setIndex((prev) => {
      if (prev < event.length - 1) return prev + 1;
    });
  };

  // Handle the user's choice
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'leave':
        // Navigate to the next floor after restoring HP
        restorePartyHP();
        navigate('/spire-floor-7');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className='Screen Full-Screen Spire-Floor-6-Screen'
      style={{
        backgroundImage: `url(${spireFloor6})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox textBox={spireFloor6Events[eventIndex]} />

      {eventIndex === spireFloor6Events.length - 1 ? (
        <NPCChoices options={choices} onChoiceSelected={handleChoice} />
      ) : (
        <button
          className='Next-Btn'
          onClick={() => handleNextEvent(spireFloor6Events, setEventIndex)}
        >
          Next
        </button>
      )}
    </div>
  );
}
