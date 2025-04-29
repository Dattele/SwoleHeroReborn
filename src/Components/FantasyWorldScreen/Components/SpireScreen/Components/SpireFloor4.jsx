import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor4 from '../../../../../assets/images/SpireFloor4.png'

import '../../../../../scss/All.scss';

export default function SpireFloor4() {
  const { gainGold, restorePartyHP } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);

  const spireFloor4Events = [
    'The stone floor dips gently into a shattered sanctuary. At its center, a strange frost-covered fountain emits a soft blue glow.',
    "Ethan: 'Whoa... you guys seeing this? It's like an ice bath made by angels.'",
    "Ja'von: 'A place of healing. The old dwarves believed strength was sacred — and the body had to be honored.'",
    "Danny: 'You had me at ice bath. Let's soak, heal, and maybe flex a little on these ancient ghosts.'",
  ];

  const continueChoices = [
    {
      text: 'No Rest for the Swole',
      nextScene: '/spire-floor-5',
    }
  ];

  const handleNextEvent = () => {
    if (eventIndex < spireFloor4Events.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  return (
    <div
      className='Screen Full-Screen Spire-Floor-Screen'
      style={{
        backgroundImage: `url(${spireFloor4})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox text={spireFloor4Events[eventIndex]} />

      {eventIndex === spireFloor4Events.length - 1 ? (
        <Choices options={continueChoices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
}