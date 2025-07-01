import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../Context/DannyContext';
import TextBox from '../../../TextBox';
import NPCChoices from '../../../System/NPCChoices';
import Items from '../../../System/Items';

import EmberfallEntrance from '../../../../assets/images/EmberfallEntrance.png';
import EmberfallTent from '../../../../assets/images/EmberfallTent.png';
import EmberfallNote1 from '../../../../assets/images/EmberfallNote1.png';
import EmberfallNote2 from '../../../../assets/images/EmberfallNote2.png';
import EmberfallNote3 from '../../../../assets/images/EmberfallNote3.png';
import EmberfallNote4 from '../../../../assets/images/EmberfallNote4.png';
import EmberfallNote5 from '../../../../assets/images/EmberfallNote5.png';
import DanielFace from '../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../assets/images/JavonFace.png';
import { ReactComponent as UpArrow } from '../../../../assets/images/UpArrow.svg';

import '../../../../scss/All.scss';
import './EmberfallScreen.scss';

const emberfallEvents = [
  {
    text: 'The party emerges onto plateau—crumbling pillars and weathered stone arches standing against the desert sky.',
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
  },
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
  },
  {
    text: 'Head back',
    action: 'map',
  },
];

const tentChoices = [
  {
    text: 'Sleep like a BAKA',
    action: 'sleep',
  },
  {
    text: 'Read the notes',
    action: 'notes',
  },
  {
    text: 'Head back',
    action: 'leaveTent',
  },
];

const noteChoices = [
  {
    text: 'Set the notes down',
    action: 'leaveNotes',
  },
];

export default function EmberfallScreen() {
  const { addItem, visited, visitedLocation, restorePartyHP } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [visitTent, setVisitTent] = useState(false);
  const [readNotes, setReadNotes] = useState(false);
  const [stage, setStage] = useState('intro');

  const handleNextEvent = () => {
    if (eventIndex < emberfallEvents.length - 1) {
      setEventIndex((prev) => prev + 1);
    }
  };

  // Handle the users action
  const handleAction = (choice) => {
    switch (choice.action) {
      case 'tent':
        setVisitTent(true);
        break;
      case 'crates':
        visited.includes('emberfallCrates')
          ? alert('Nice try bud.')
          : addItemsToParty();
        break;
      case 'ruins':
        navigate('/emberfall/entrance');
        break;
      case 'map':
        navigate('/world-map');
        break;
      case 'sleep':
        restorePartyHP();
        alert('Your party is now rested!');
        break;
      case 'leaveTent':
        setVisitTent(false);
        break;
      case 'notes':
        setReadNotes(true);
        break;
      case 'leaveNotes':
        setReadNotes(false);
        break;
      default:
        break;
    }

    if (!visited.includes('visitedEmberfall')) {
      visitedLocation('visitedEmberfall');
    }
  };

  // Go to the previous note - if not on the first
  const goPrev = () => {
    setNoteIndex((prev) => {
      if (prev > 0) return prev - 1;
      else return prev;
    });
  };

  // Go to the next note - if not on the last
  const goNext = () => {
    setNoteIndex((prev) => {
      if (prev < 4) return prev + 1;
      else return prev;
    });
  };

  // Get the current image based off the noteIndex
  const currentNote = () => {
    const noteImages = [
      EmberfallNote1,
      EmberfallNote2,
      EmberfallNote3,
      EmberfallNote4,
      EmberfallNote5,
    ];
    return noteImages[noteIndex];
  };

  // Add three half-rotten rations and two water flasks
  const addItemsToParty = () => {
    addItem(Items[10]);
    addItem(Items[10]);
    addItem(Items[10]);
    addItem(Items[11]);
    addItem(Items[11]);
    alert(
      'The party has gained three Half-Rotten Rations and two Water Flasks',
    );
    visitedLocation('emberfallCrates');
  };

  // Skip straight to choices if user has been to Emberfall
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  return (
    <>
      {visitTent ? (
        <div
          className='Screen Full-Screen Emberfall-Screen'
          style={{
            backgroundImage: `url(${EmberfallTent})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {readNotes ? (
            <div className='Notes-Gallery'>
              <div className='Notes'>
                <button onClick={goPrev} className='Note-Btn Note-Btn-Prev'>
                  <UpArrow />
                </button>
                <img
                  src={currentNote()}
                  alt={`Note Entry - ${noteIndex + 1}`}
                  className='Note-Image'
                />
                <button onClick={goNext} className='Note-Btn Note-Btn-Next'>
                  <UpArrow />
                </button>
              </div>
              <NPCChoices
                options={noteChoices}
                onChoiceSelected={handleAction}
              />
            </div>
          ) : (
            <>
              <TextBox
                textBox={{
                  text: "The party steps into the battered tent. Inside, there's a dirty cot, barely big enough for a post leg day nap, and some notes left behind",
                  image: DanielFace,
                }}
              />
              <NPCChoices
                options={tentChoices}
                onChoiceSelected={handleAction}
              />
            </>
          )}
        </div>
      ) : (
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
                <NPCChoices options={choices} onChoiceSelected={handleAction} />
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
              <NPCChoices options={choices} onChoiceSelected={handleAction} />
            </>
          )}
        </div>
      )}
    </>
  );
}
