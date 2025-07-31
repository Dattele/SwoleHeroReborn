import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import NPCChoices from '../../../../System/NPCChoices';
import EmberfallBattle from '../../../../Battle/EmberfallBattle';
import EmberfallMonsters from '../../../../Monster/EmberfallMonsters';

import Emberfall4Inside from '../../../../../assets/images/Emberfall4Inside.png';
import Emberfall4Sanctuary from '../../../../../assets/images/Emberfall4Sanctuary.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

const Emberfall4Lines = {
  entrance: [
    {
      text: "Ethan: 'Wow.. this place almost feels untouched. Was Emberfall really this beautiful?'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Sanctuaries like this were built to last centuries. Even the Demon King's army couldn't bring it down.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Yooo, do you guys think there's going to be a gym in there!?'",
      image: DanielFace,
    },
  ],

  inside: [
    {
      text: "Ancient statues glare down as if judging Danny's biceps and Ethan's haircut.",
      image: DanielFace,
    },
  ],

  relic: [
    {
      text: "Ethan: 'This thing feels important, should we touch it??'",
      image: EthanFace,
    },
    {
      text: "Danny: 'I don't know, but if it glows, im flexing first.'",
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Don't flex at the relic Danny..",
      image: JavonFace,
    },
    {
      text: 'Ethan, following his gut, places his hand on the relic. Suddenly, the tone shifts.',
      image: EthanFace,
    },
    {
      text: "Danny: 'Wait, do you guys feel that? The air just got cold!'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Uhh guys.. the shadows are moving.'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'We are not alone. Weapons out!'",
      image: JavonFace,
    },
  ],

  afterBattle: [
    {
      text: "Ethan: 'Whew... Is it finally over? Wait, the relic's glowing! That's never a good sign.'",
      image: EthanFace,
    },
    {
      text: "The relic rumbles and the altar shifts. Ja'von: 'Yooo! There's a secret passageway!'",
      image: JavonFace,
    },
    {
      text: "Danny: 'If there's not a gym down there, I'm suing. Or at least flexing at something.'",
      image: DanielFace,
    },
  ],
};

const choices = [
  {
    text: 'Check out the relic',
    action: 'relic',
  },
];

const continueChoices = [
  {
    text: 'Head into the passageway',
    nextScene: '/emberfall/emberfall-5',
  },
];

export default function Emberfall4() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [battleEnd, setBattleEnd] = useState('');
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const [currentText, setCurrentText] = useState('entrance');
  const [currentImage, setCurrentImage] = useState(Emberfall4Sanctuary);

  const handleNextEvent = () => {
    if (eventIndex < Emberfall4Lines[currentText].length - 1) {
      setEventIndex((prev) => prev + 1);
    } else if (currentText === 'entrance') {
      setCurrentText('inside');
      setEventIndex(0);
      setCurrentImage(Emberfall4Inside);
    } else if (currentText === 'relic') {
      setCurrentText('afterBattle');
      setEventIndex(0);
      setStage('battle');
    }
  };

  // Track that the user has visited Emberfall4
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEmberfall4');
    navigate(nextScene);
  };

  // Handle the user taking an action
  const handleAction = (choice) => {
    switch (choice.action) {
      case 'relic':
        setCurrentText('relic');
        setEventIndex(0);
        break;
      default:
        break;
    }
  };

  // Skip straight to choices if user has been to Emberfall4
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall4');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  useEffect(() => {
    if (battleEnd === 'win') {
      setStage('intro');
    }
  }, [battleEnd]);

  return (
    <div
      className={`Screen Full-Screen Emberfall-Screen  ${currentText === 'relic' && 'Zoom-Center'}`}
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage === 'intro' ? (
        <>
          <TextBox textBox={Emberfall4Lines[currentText][eventIndex]} />
          {currentText === 'inside' ? (
            <NPCChoices options={choices} onChoiceSelected={handleAction} />
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </>
      ) : stage === 'options' ? (
        <>
          <TextBox
            textBox={{
              text: "Danny: 'That's what happens when you skip arm day! Let's see what else is hiding in these ruins!",
              image: DanielFace,
            }}
          />
          <Choices
            options={continueChoices}
            onChoiceSelected={handleChoiceSelected}
          />
        </>
      ) : (
        <EmberfallBattle
          enemies={[
            EmberfallMonsters[2],
            EmberfallMonsters[4],
            EmberfallMonsters[4],
          ]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
    </div>
  );
}
