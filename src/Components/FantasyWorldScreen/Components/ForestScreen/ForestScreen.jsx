import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';
import forestBackground from '../../../../assets/images/forest.webp';

import '../../../../scss/All.scss';

const forestEvents = [
  "Danny steps into the forest, the air thick with the scent of moss and damp earth.",
  "Sunlight barely pierces through the dense canopy, casting eerie shadows along the winding path.",
  "A distant howl echoes through the trees. Maybe coming here wasn't his smartest idea...",
  "Danny cracks his knuckles. 'Alright, do I keep pushing forward and fight something, or should I just head to town before I get wrecked?'"
];

const choices = [
  { text: "Explore deeper (Encounter a monster)", nextScene: "/forest-battle" },
  { text: "Head to town (Maybe there's a gym or females)", nextScene: "/town" }
];

export default function ForestScreen() {
  const [eventIndex, setEventIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextEvent = () => {
    if (eventIndex < forestEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    } 
  };

  return (
    <div 
      className="Screen Forest-Screen Full-Screen" 
      style={{ 
        backgroundImage: `url(${forestBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox text={forestEvents[eventIndex]} />
      
      {eventIndex === forestEvents.length - 1 ? (
        <Choices options={choices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
}