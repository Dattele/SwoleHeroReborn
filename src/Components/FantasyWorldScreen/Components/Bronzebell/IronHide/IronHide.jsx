import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices/Choices';
import Classes from '../../../../System/Classes';
import { useDanny } from '../../../../../Context/DannyContext';

import Ironhide from '../../../../../assets/images/Ironhide.webp';
import IronhideIntro from '../../../../../assets/images/IronhideIntro.webp';

import DanielFace from '../../../../../assets/images/DanielFace.png';
import Ethan from '../../../../../assets/images/Ethan.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';

import '../../../../../scss/All.scss';

export default function IronHide() {
  const { party, addPartyMember, visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [stage, setStage] = useState('intro');
  const [eventIndex, setEventIndex] = useState(0);

  const barbarianClass = Classes.Barbarian;
  const ethan = {
    name: 'Ethan, the Brute',
    type: 'player',
    level: 1,
    xp: 0,
    maxHP: 45,
    hp: 45,
    strength: 4,
    defense: 8,
    speed: 2,
    rizz: 1,
    class: barbarianClass.name,
    description: 'Former Gladiator from Stonejaw Hold - Big, Muscular Beast',
    abilities: barbarianClass.abilities[1],
    image: Ethan,
    imageFace: EthanFace,
  };

  const ethanIntro = [
    {
      text: 'You walk into the tavern and chaos surrounds you. Two men are flying across a table. A third is unconscious in the corner.',
      image: EthanFace,
    },
    {
      text: 'A huge man slams another patron head-first into a plate of boiled potatoes.',
      image: EthanFace,
    },
    { text: "'THAT'S FOR INSULTING MY ARM HAIR!' he roars.", image: EthanFace },
    {
      text: "The bartender sighs. 'Ethan, that's the third table today.'",
      image: EthanFace,
    },
    { text: "Ethan shrugs. 'Build stronger tables then.'", image: EthanFace },
    {
      text: "Danny approaches cautiously. 'Hey, you single? Asking for a friend..'",
      image: DanielFace,
    },
    {
      text: "Ethan turns to you, red-faced and towering. 'Who are you and why do you smell like chalk?'",
      image: EthanFace,
    },
    {
      text: "'Danny. Hero. Lifter. Looking for a hot girlfriend.'",
      image: DanielFace,
    },
    {
      text: "Ethan raises an eyebrow. 'You look like a protein shake with abandonment issues.'",
      image: EthanFace,
    },
    {
      text: "Danny grins. 'And you look like a keg with daddy issues.'",
      image: DanielFace,
    },
    {
      text: "Ethan lets out a loud laugh. 'Alright, you've got guts, I will give you that'",
      image: EthanFace,
    },
    {
      text: "He drops into a chair and gestures for you to sit. 'You ever watch everything you love burn?'",
      image: EthanFace,
    },
    {
      text: "'My homeland's gone. The Demon King took it. All I've got left now are my fists and my liver.'",
      image: EthanFace,
    },
    {
      text: "Danny nods. 'Same. Except I lost my gym membership, not my homeland.'",
      image: DanielFace,
    },
    {
      text: "Ethan stares at you. '...Man you really are an idiot, aren't you?'",
      image: EthanFace,
    },
    {
      text: "Danny - 'And yet... here you are - standing in front of a living legend with beer breath and trauma issues.'",
      image: DanielFace,
    },
    {
      text: "Ethan just stares at Danny then lets out a short laugh - 'you are insane'",
      image: EthanFace,
    },
    {
      text: "Danny shrugs - 'Insanity is just confidence without limits. Now Come with me - I'll need someone to spot me while I out-bench the Demon King.'",
      image: DanielFace,
    },
    {
      text: "Ethan sighs. 'Fine. I guess it will be fun watching you die.'",
      image: EthanFace,
    },
    { text: '[ Ethan has joined your party! 🎉 ]', image: EthanFace },
  ];

  const ironhideNPCs = [
    { text: 'Lisa the Bartender', nextScene: '/bronzebell/ironhide/lisa' },
    { text: 'Drunk Scholar', nextScene: '/bronzebell/ironhide/drunk-scholar' },
    {
      text: 'Local Tough Guy',
      nextScene: '/bronzebell/ironhide/local-tough-guy',
    },
    { text: 'Go to Town Square', nextScene: '/bronzebell' },
  ];

  const getBackgroundImage = () => {
    if (stage === 'intro') return IronhideIntro;
    return Ironhide;
  };

  const handleNextEvent = () => {
    if (eventIndex < ethanIntro.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      console.log('setting local storage to visited Ironhide');
      addPartyMember(ethan);
      setStage('options');
      visitedLocation('visitedIronhide'); // Save the visit
    }
  };

  // Skip straight to choices if user has been to Ironhide
  useEffect(() => {
    const userVisited = visited.includes('visitedIronhide');
    if (userVisited) {
      setStage('options');
    }
  }, []);

  return (
    <div
      className='Screen Full-Screen Ironhide-Screen'
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={ethanIntro[eventIndex]} />
          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
        </>
      ) : (
        <>
          <TextBox
            textBox={{
              text: "Danny looks around the tavern - 'All right, who should I grace with my presence.'",
              image: DanielFace,
            }}
          />
          <Choices options={ironhideNPCs} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
