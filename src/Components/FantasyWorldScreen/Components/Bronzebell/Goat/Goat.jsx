import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextBox from "../../../../TextBox";
import NPCChoices from "../../../../System/NPCChoices";
import goat from '../../../../../assets/images/Goat.png';

import './Goat.scss';
import '../../../../../scss/All.scss';

export default function Goat() {
  const [eventIndex, setEventIndex] = useState(0);
  const [showAttack, setShowAttack] = useState(false);
  const [showIgnore, setShowIgnore] = useState(false);
  const navigate = useNavigate();

  const goatDialogue = [
    "As you approach the Town Square, a bone-chilling bleat echoes through the air.",
    "A Goat is standing in the middle of the street. Menacing. Still. Unblinking.",
    "Townfolk whisper in terror — 'Don't make eye contact...' 'It's got plans...' 'It once snuck into the inn and stole a beer.'",
    "Something deep inside you says this Goat is not normal. This Goat is trouble.",
    "A desperate farmer rushes up. 'Good sirs - please. That creature has haunted our lives long enough!'",
    "**Quest: Remove the Goat**",
  ];

  const attackDialogue = [
    "Danny, Ja'von, and Ethan charge forward. Danny leads with a fist full of vengeance.",
    "The Goat locks eyes with Danny, lets out a menacing 'BLEEEAAT' — and sidesteps like a master.",
    "It stomps on Danny's foot causing him to fall onto the ground, then it *launches* itself at Ja'von and Ethan, kicking them both in the face.",
    "They hit the ground with a grunt. The Goat lands, flicks its tail, and vanishes into the crowd.",
    "Danny: 'What the hell was that?!'",
    "Ja'von: 'That was no ordinary goat.'",
  ];

  const ignoreDialogue = [
    "The group looks at the Goat… then at each other.",
    "Danny: 'Nah. We're heroes. We don't have time for barnyard drama.'",
    "They laugh and walk off — but Danny pauses. He turns around slowly and the Goat is no longer there.",
    "Danny stares in disbelief - '...Guys? It was just staring at me a second ago and now its gone. I swear.'",
    "Ethan: 'You're just dehydrated. Again.'",
  ];

  const choices = [
    { text: '🍺 Buy Food or Drinks', action: 'attack' },
    { text: '🛏 Rent a room', action: 'ignore' },
  ];

  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'attack':
        // Open shop modal, change mode, etc.
        setShowAttack(true);
        console.log("Opening shop menu...");
        break;
      case 'ignore':
        // Show rest confirmation modal
        setShowIgnore(true);
        console.log("Opening rest confirmation...");
        break;
      default:
        break;
    }
  };

  const handleNextEvent = () => {
    let dialogue;
    if (showAttack) dialogue = attackDialogue;
    else if (showIgnore) dialogue = ignoreDialogue;
    else dialogue = goatDialogue;

    if (eventIndex < dialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      setEventIndex(0);
      // if (showAttack) {
      //   setSecondDialogue(attackDialogue);
      // } else if (showIgnore) {
      //   setSecondDialogue(ignoreDialogue);
      // }
    }
  };

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
      {showAttack ? (
        <>
          <TextBox text={attackDialogue[eventIndex]} />

          {eventIndex === attackDialogue.length - 1 ? (
            <NPCChoices options={choices} onChoiceSelected={handleChoice} />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : showIgnore ? (
        <>
          <TextBox text={ignoreDialogue[eventIndex]} />

          {eventIndex === ignoreDialogue.length - 1 ? (
            <NPCChoices options={choices} onChoiceSelected={handleChoice} />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : (
        <>
          <TextBox text={goatDialogue[eventIndex]} />

          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
        </>
      )}
    </div>
  );
}