import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import EmberfallBattle from '../../../../Battle/EmberfallBattle';
import EmberfallMonsters from '../../../../Monster/EmberfallMonsters';

import Emberfall2Image from '../../../../../assets/images/Emberfall2.png';
import Emberfall2Clear from '../../../../../assets/images/Emberfall2Clear.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

const Emberfall2Lines = [
  {
    text: "The party steps from the dusty, golden light of Emberfall's streets into a plaza swallowed by unnatural darkness.",
    image: DanielFace,
  },
  {
    text: 'Hooded cultists chant around flickering runes while Nether Archers chant from the top of the ledges.',
    image: DanielFace,
  },
  {
    text: "Danny: 'Whoaa, it just got really dark, did someone forget to pay the electric?'",
    image: DanielFace,
  },
  {
    text: "Ja'von: 'Careful, that's not shade, thats sorcery. Those cultists are up to something foul.",
    image: JavonFace,
  },
  {
    text: "Ethan: 'Umm why are they looking at us like we are the main course..?",
    image: EthanFace,
  },
];

const continueChoices = [
  {
    text: 'Continue',
    nextScene: '/emberfall/emberfall-3',
  },
];

export default function Emberfall2() {
  const { visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [battleEnd, setBattleEnd] = useState('');
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const [currentImage, setCurrentImage] = useState(Emberfall2Image);

  const handleNextEvent = () => {
    if (eventIndex < Emberfall2Lines.length - 1) {
      setEventIndex((prev) => prev + 1);
    } else {
      setStage('battle');
    }
  };

  // Track that the user has visited Emberfall2
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEmberfall2');
    navigate(nextScene);
  };

  // Skip straight to choices if user has been to Emberfall2
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfall2');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  useEffect(() => {
    if (battleEnd === 'win') {
      setCurrentImage(Emberfall2Clear);
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
          <TextBox textBox={Emberfall2Lines[eventIndex]} />
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
          <Choices options={continueChoices} onChoiceSelected={navigate} />
        </>
      ) : battleEnd !== 'win' ? (
        <EmberfallBattle
          enemies={[
            EmberfallMonsters[1],
            EmberfallMonsters[1],
            EmberfallMonsters[3],
          ]}
          battleEnd={battleEnd}
          setBattleEnd={setBattleEnd}
        />
      ) : (
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
      )}
    </div>
  );
}
