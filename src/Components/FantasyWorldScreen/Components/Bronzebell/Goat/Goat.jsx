import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import NPCChoices from '../../../../System/NPCChoices';
import Choices from '../../../../Choices';

import danielFace from '../../../../../assets/images/DanielFace.png';
import ethanFace from '../../../../../assets/images/EthanFace.png';
import goatFace from '../../../../../assets/images/GoatFace.png';
import javonFace from '../../../../../assets/images/JavonFace.png';
import goat from '../../../../../assets/images/Goat.png';

import './Goat.scss';
import '../../../../../scss/All.scss';

export default function Goat() {
  const { party } = useDanny();

  const [eventIndex, setEventIndex] = useState(0);
  const [showAttack, setShowAttack] = useState(false);
  const [showIgnore, setShowIgnore] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [stage, setStage] = useState('intro');
  const navigate = useNavigate();

  const goatDialogue = [
    {
      text: 'As you approach the Town Square, a bone-chilling bleat echoes through the air.',
      image: goatFace,
    },
    {
      text: 'A Goat is standing in the middle of the street. Menacing. Still. Unblinking.',
      image: goatFace,
    },
    {
      text: "Townfolk whisper in terror — 'Don't make eye contact...' 'It's got plans...' 'It once snuck into the inn and stole a beer.'",
      image: goatFace,
    },
    {
      text: 'Something deep inside you says this Goat is not normal. This Goat is trouble.',
      image: goatFace,
    },
    {
      text: "A desperate farmer rushes up. 'Good sirs - please. That creature has haunted our lives long enough!'",
      image: danielFace,
    },
    { text: '**Quest: Remove the Goat**', image: danielFace },
  ];

  const attackDialogue = [
    {
      text: "Danny, Ja'von, and Ethan charge forward. Danny leads with a fist full of vengeance.",
      image: danielFace,
    },
    {
      text: "The Goat locks eyes with Danny, lets out a menacing 'BLEEEAAT' — and sidesteps like a master.",
      image: goatFace,
    },
    {
      text: "It stomps on Danny's foot causing him to fall onto the ground, then it *launches* itself at Ja'von and Ethan, kicking them both in the face.",
      image: goatFace,
    },
    {
      text: 'They hit the ground with a grunt. The Goat lands, flicks its tail, and vanishes into the crowd.',
      image: goatFace,
    },
    { text: "Danny: 'What the hell was that!?'", image: danielFace },
    { text: "Ja'von: 'That was no ordinary goat.'", image: javonFace },
  ];

  const ignoreDialogue = [
    {
      text: 'The group looks at the Goat… then at each other.',
      image: danielFace,
    },
    {
      text: "Danny: 'Nah. We're heroes. We don't have time for barnyard drama.'",
      image: danielFace,
    },
    {
      text: 'They laugh and walk off — but Danny pauses. He turns around slowly and the Goat is no longer there.',
      image: danielFace,
    },
    {
      text: "Danny stares in disbelief - '...Guys? It was just staring at me a second ago and now its gone. I swear.'",
      image: danielFace,
    },
    { text: "Ethan: 'You're just dehydrated.. Again.'", image: ethanFace },
  ];

  const npcChoices = [
    {
      text: '✅ Accept the quest and confront the Goat - for Bronzebell!',
      action: 'attack',
    },
    { text: "❌ Deny the Goat's influence (like a coward)", action: 'ignore' },
  ];

  const choices = [{ text: 'Scream and run', nextScene: '/bronzebell' }];

  const secondTimeChoices = [
    { text: 'Head back to safety', nextScene: '/bronzebell' },
  ];

  // Get the current dialogue
  const getCurrentDialogue = () => {
    if (showAttack) return attackDialogue;
    if (showIgnore) return ignoreDialogue;
    return goatDialogue;
  };

  // Handle the choice the user makes
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'attack':
        // Open shop modal, change mode, etc.
        setShowAttack(true);
        console.log('Opening shop menu...');
        break;
      case 'ignore':
        // Show rest confirmation modal
        setShowIgnore(true);
        console.log('Opening rest confirmation...');
        break;
      default:
        break;
    }
  };

  // Handle the next event
  const handleNextEvent = () => {
    const dialogue = getCurrentDialogue();

    if (eventIndex < dialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      console.log('next', showAttack);
      if (!showAttack && !showIgnore) {
        setEventIndex(0);
        setShowChoices(true);
      }
    }
  };

  // Sets the stage for the interaction with the Goat
  useEffect(() => {
    const ethan = party.find((member) => member.name === 'Ethan, the Brute');
    const javon = party.find((member) => member.name === "Ja'von, the Rizzler");
    const visited = localStorage.getItem('visitedGoat') === 'true';

    if (!ethan || !javon) {
      setStage('notReady');
    } else if (visited) {
      setStage('options');
    }
  }, []);

  // Checks for when the current dialogue is complete
  useEffect(() => {
    const dialogue = getCurrentDialogue();
    if (eventIndex === dialogue.length - 1) {
      localStorage.setItem('visitedGoat', 'true');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Goat-Screen'
      style={{
        backgroundImage: `url(${goat})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage === 'notReady' ? (
        <>
          <TextBox
            textBox={{
              text: "You feel uneasy - as if you aren't ready to continue onwards",
              image: danielFace,
            }}
          />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      ) : stage !== 'options' ? (
        showAttack ? (
          <>
            <TextBox textBox={attackDialogue[eventIndex]} />

            {eventIndex === attackDialogue.length - 1 ? (
              <Choices options={choices} onChoiceSelected={navigate} />
            ) : (
              <button className='Next-Btn' onClick={handleNextEvent}>
                Next
              </button>
            )}
          </>
        ) : showIgnore ? (
          <>
            <TextBox textBox={ignoreDialogue[eventIndex]} />

            {eventIndex === ignoreDialogue.length - 1 ? (
              <Choices options={choices} onChoiceSelected={navigate} />
            ) : (
              <button className='Next-Btn' onClick={handleNextEvent}>
                Next
              </button>
            )}
          </>
        ) : (
          <>
            <TextBox textBox={goatDialogue[eventIndex]} />

            {showChoices ? (
              <NPCChoices
                options={npcChoices}
                onChoiceSelected={handleChoice}
              />
            ) : (
              <button className='Next-Btn' onClick={handleNextEvent}>
                Next
              </button>
            )}
          </>
        )
      ) : (
        <>
          <TextBox
            textBox={{
              text: 'You shiver as if someone.. or something is watching you',
              image: goatFace,
            }}
          />
          <Choices options={secondTimeChoices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
