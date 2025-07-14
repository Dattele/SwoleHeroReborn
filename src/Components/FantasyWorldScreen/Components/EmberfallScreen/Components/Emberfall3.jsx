import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import EmberfallBattle from '../../../../Battle/EmberfallBattle';
import EmberfallMonsters from '../../../../Monster/EmberfallMonsters';

import Emberfall3Image from '../../../../../assets/images/Emberfall3.png';
import Emberfall3Clear from '../../../../../assets/images/Emberfall3Clear.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';
import MoltenImp from '../../../../../assets/images/MoltenImp.png';

import '../../../../../scss/All.scss';

const Emberfall3Lines = [
  {
    text: "Danny: 'This place is a lot less crispy back here. Feels weird, like the Demon King forgot to finish the job.'",
    image: DanielFace,
  },
  {
    text: "Ethan: 'Wait, do you guys think anyone from Emberfall still lives here, hiding?'",
    image: EthanFace,
  },
  {
    text: "Ja'von: 'We don't have time for that - we must move quickly. The longer we linger, the more time their army has to surround us.'",
    image: JavonFace,
  },
  {
    text: 'Suddenly, small fiery imps leap from the shadows, cackling as they fling fireballs across the alleyway!',
    image: MoltenImp,
  },
];

const continueChoices = [
  {
    text: 'Continue',
    nextScene: '/emberfall/emberfall-4',
  },
];

export default function Emberfall3() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [battleEnd, setBattleEnd] = useState('');
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const [currentImage, setCurrentImage] = useState(Emberfall3Clear);

  const handleNextEvent = () => {
    if (eventIndex < Emberfall3Lines.length - 2) {
      setEventIndex((prev) => prev + 1);
    } else if (eventIndex < Emberfall3Lines.length - 1) {
      setEventIndex((prev) => prev + 1);
      setCurrentImage(Emberfall3Image);
    } else {
      setStage('battle');
    }
  };

  // Track that the user has visited Emberfall2
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEmberfall3');
    navigate(nextScene);
  };

  // Skip straight to choices if user has been to Emberfall2
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall3');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  useEffect(() => {
    if (battleEnd === 'win') {
      setCurrentImage(Emberfall3Clear);
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
          <TextBox textBox={Emberfall3Lines[eventIndex]} />
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
