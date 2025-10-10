import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import EmberfallBattle from '../../../../Battle/EmberfallBattle';
import EmberfallMonsters from '../../../../Monster/EmberfallMonsters';

import Emberfall5Entrance from '../../../../../assets/images/Emberfall5Entrance.png';
import Emberfall5Corridor from '../../../../../assets/images/Emberfall5Corridor.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

const Emberfall5Lines = {
  start: [
    {
      text: "Danny: 'Man, why does it always have to be a creepy tunnel? For once, i just want it to be a gym.'",
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Stay alert boys. We don't know what kind of monsters are down here.'",
      image: JavonFace,
    },
    {
      text: "Ethan: 'You guys smell that?? Something's burnt.. and I dont think it's Danny's pancakes this time.'",
      image: EthanFace,
    },
  ],

  notes: [
    {
      text: 'Walking through the corridors, the party finds messages written with blood.',
      image: DanielFace,
    },
    {
      text: "Ethan: 'Ummm... that's a lot of blood guys. Are we sure we want to keep going?",
      image: EthanFace,
    },
    {
      text: "Danny: 'I mean the bigger question is who names their kid 'Soul-Binder'?' Danny laughs 'I bet he got bullied in gym class.'",
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Whoever wrote these, they bought us time that we  can't let be wasted.'",
      image: JavonFace,
    },
  ],

  beforeBattle: [
    {
      text: "Ja'von: 'The glyph chamber is close. I can feel the magic pouring out of it.'",
      image: JavonFace,
    },
    {
      text: "Ethan: 'I'm right behind you guys. Way, way behind you.'",
      image: EthanFace,
    },
    {
      text: "Danny: 'When we get that glyph, first round at the inn's on me!'",
      image: DanielFace,
    },
  ],
};

const continueChoices = [
  {
    text: 'Continue',
    nextScene: '/emberfall/emberfall-6',
  },
];

export default function Emberfall5() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [battleEnd, setBattleEnd] = useState('');
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const [currentText, setCurrentText] = useState('start');
  const [currentImage, setCurrentImage] = useState(Emberfall5Entrance);

  const handleNextEvent = () => {
    if (eventIndex < Emberfall5Lines[currentText].length - 1) {
      setEventIndex((prev) => prev + 1);
    } else if (currentText === 'entrance') {
      setCurrentText('inside');
      setEventIndex(0);
      setCurrentImage(Emberfall5Corridor);
    } else if (currentText === 'relic') {
      setCurrentText('afterBattle');
      setEventIndex(0);
      setStage('battle');
    }
  };

  // Track that the user has visited Emberfall5
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEmberfall5');
    navigate(nextScene);
  };

  // Skip straight to choices if user has been to Emberfall5
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall5');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  useEffect(() => {
    if (battleEnd === 'win') {
      setCurrentImage(Emberfall5Entrance);
      setStage('options');
    }
  }, [battleEnd]);

  return (
    <div
      className='Screen Full-Screen Emberfall-Screen'
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage === 'intro' ? (
        <>
          <TextBox textBox={Emberfall5Lines[eventIndex]} />
          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
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
            EmberfallMonsters[6],
            EmberfallMonsters[6],
            EmberfallMonsters[6],
            EmberfallMonsters[6],
          ]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      )}
    </div>
  );
}
