import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../Context/DannyContext';
import TextBox from '../../../TextBox';
import NPCChoices from '../../../System/NPCChoices';
import Choices from '../../../Choices';

import EmberfallEntrance from '../../../../assets/images/EmberfallEntrance.png';
import DanielFace from '../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../assets/images/JavonFace.png';

import '../../../../scss/All.scss';
import './EmberfallScreen.scss';

export default function EmberfallScreen() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [visitTent, setVisitTent] = useState(false);
  const [visitCrates, setVisitCrates] = useState(false);
  const [stage, setStage] = useState('intro');

  const emberfallEvents = [
    {
      text: "The party emerges onto plateau—crumbling pillars and weathered stone arches standing against the desert sky.",
      image: DanielFace,
    },
    {
      text: "Danny: 'So this is Emberfall? Looks like the gym closed a few hundred years ago.'",
      image: DanielFace,
    },
    {
      text: "Ethan brushes dust off a toppled crate. 'Looks like someone camped here recently, but they left in a hurry.'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Abandoned supplies, maps, and notes in a language I don't know. Were they searching for something or running from something?'",
      image: JavonFace,
    },
    {
      text: "Danny grins and flexes. 'Whatever it is, it wont outrun these gains.'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Well, all I know is I'm not sleeping in that tent. I bet it's full of spiders the size of kettlebells.'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'You will be fine. Just keep your eyes sharp. The Demon King's forces could be lurking anywhere.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Alright bros, let's loot some knowledge and find a protein stash.'",
      image: DanielFace,
    }
  ];

  const choices = [
    {
      text: 'Check out the tent',
      action: 'tent',
    },
    {
      text: 'Investigate the crates',
      action: 'crates',
    },
    {
      text: 'Head into the ruins',
      action: 'ruins',
    }
  ];


  const handleNextEvent = () => {
    if (eventIndex < emberfallEvents.length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // Handle the users action
  const handleAction = (action) => {
    switch (action) {
      case 'tent': 
        setVisitTent(true);
        break;
      case 'crates':
        setVisitCrates(true);
        break;
      case 'ruins':
        break;
      default:
        break;
    }

  }

  // Skip straight to choices if user has been to Emberfall
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall');
    if (userVisited) {
      setStage('options');
    }
  }, []);

  // Checks for when the emberfallEvents dialogue is complete
  useEffect(() => {
    if (eventIndex === emberfallEvents.length - 1) {
      visitedLocation('visitedEmberfall');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Emberfall-Screen'
      style={{
        backgroundImage: `url(${EmberfallEntrance})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={emberfallEvents[eventIndex]} />

          {eventIndex === emberfallEvents.length - 1 ? (
            <NPCChoices options={choices} onChoiceSelected={navigate} />
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
              text: "Ethan: 'Guys, can we take a nap in the tent.. please?'",
              image: EthanFace,
            }}
          />
          <NPCChoices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
