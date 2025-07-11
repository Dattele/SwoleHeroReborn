import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../TextBox';
import Choices from '../../../Choices/Choices';
import { useDanny } from '../../../../Context/DannyContext';

import DanielFace from '../../../../assets/images/DanielFace.png';
import forestBackground from '../../../../assets/images/EdenGrove.png';

import '../../../../scss/All.scss';

const forestEvents = [
  {
    text: 'Danny steps into the forest, the air thick with the scent of moss and damp earth.',
    image: DanielFace,
  },
  {
    text: 'Sunlight barely pierces through the dense canopy, casting eerie shadows along the winding path.',
    image: DanielFace,
  },
  {
    text: "A distant howl echoes through the trees. Maybe coming here wasn't his smartest idea...",
    image: DanielFace,
  },
  {
    text: "Danny cracks his knuckles. 'Alright, do I keep pushing forward and fight something, or should I just head to town before I get wrecked?'",
    image: DanielFace,
  },
];

const choices = [
  {
    text: 'Explore deeper (Encounter a monster)',
    nextScene: '/forest-battle',
  },
  {
    text: "Head to town (Maybe there's a gym.. or girls)",
    nextScene: '/bronzebell',
  },
];

const secondTimeChoices = [
  {
    text: '⚔️ Clear the path ahead (Another round with forest freaks)',
    nextScene: '/forest-battle',
  },
  {
    text: "🍻 'Town's got ale and women. Just sayin.' - Ethan",
    nextScene: '/bronzebell',
  },
];

export default function ForestScreen() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');

  const handleNextEvent = () => {
    if (eventIndex < forestEvents.length - 1) {
      setEventIndex((prev) => prev + 1);
    }
  };

  // Track that the user has visited EdenGrove
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEdenGrove');
    navigate(nextScene);
  };

  // Skip straight to choices if user has been to Ironhide
  useEffect(() => {
    const userVisited = visited.includes('visitedEdenGrove');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  return (
    <div
      className='Screen Forest-Screen Full-Screen'
      style={{
        backgroundImage: `url(${forestBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={forestEvents[eventIndex]} />

          {eventIndex === forestEvents.length - 1 ? (
            <Choices
              options={choices}
              onChoiceSelected={handleChoiceSelected}
            />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : (
        <>
          <TextBox
            textBox={{
              text: "The boys are back in the woods - What's the move?",
              image: DanielFace,
            }}
          />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
