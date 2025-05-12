import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices/Choices';
import Classes from '../../../../System/Classes';
import { useDanny } from '../../../../../Context/DannyContext';

import DanielFace from '../../../../../assets/images/DanielFace.png';
import Grounds from '../../../../../assets/images/TrainingGrounds.webp';
import Javon from '../../../../../assets/images/Javon.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';

export default function TrainingGrounds() {
  const { addPartyMember } = useDanny();
  const navigate = useNavigate();

  const [stage, setStage] = useState('intro');
  const [eventIndex, setEventIndex] = useState(0);

  const knightClass = Classes.Knight;
  const javon = {
    name: "Ja'von, the Rizzler",
    type: 'player',
    level: 1,
    xp: 0,
    maxHP: 35,
    hp: 35,
    strength: 5,
    defense: 5,
    speed: 6,
    rizz: 8,
    class: knightClass.name,
    description: 'Prince of the fallen Kingdom of Feymore - Oozes out Charisma',
    abilities: knightClass.abilities[1],
    image: Javon,
    imageFace: JavonFace,
  };

  const trainingGroundsIntro = [
    {
      text: 'You arrive at the Bronzebell Training Grounds - you hear the clashing of steel and the shouts of a small crowd.',
      image: DanielFace,
    },
    {
      text: 'Two fighters circle each other - one in battered armor, the other moving with regal precision.',
      image: JavonFace,
    },
    {
      text: "The armored figure lunges - but in a flash, he's disarmed. His weapon clatters to the ground. The crowd gasps.",
      image: JavonFace,
    },
    {
      text: "'And that is why posture matters,' the victor says, smoothly sheathing his blade.",
      image: JavonFace,
    },
    {
      text: "He turns towards you - tall, poised, and disgustingly attractive. 'Ja'von, Prince of Feymere. And you are?'",
      image: JavonFace,
    },
    {
      text: "You step forward. 'Danny. Professional lifter. Big time hero. On a quest to defeat the Demon King... and maybe get a girlfriend out of it.'",
      image: DanielFace,
    },
  ];

  const javonDialogue = [
    {
      text: "'A noble mission,' Ja'von says with a slight smirk. 'Even if your fashion sense is... outdated.'",
      image: JavonFace,
    },
    {
      text: "Danny flexes. 'What about it? Flexing is universal anyways.'",
      image: DanielFace,
    },
    {
      text: "'So is courage,' Ja'von replies, stepping into the dueling circle. 'But strength without refinement is meaningless. Shall we see if you are more than just muscle?'",
      image: JavonFace,
    },
    {
      text: "Danny cracks his neck. 'Just a warning - I once broke a squat rack with emotional baggage alone.'",
      image: DanielFace,
    },
    {
      text: "They square off. A few light clashes - Ja'von's blade precise, Danny's power unrelenting.",
      image: DanielFace,
    },
    {
      text: "Eventually, Ja'von disarms Danny… but Danny managed to make him step back twice throughout the fight.",
      image: DanielFace,
    },
    {
      text: "'You fight like a storm in a tavern,' Ja'von says, lowering his blade. 'Chaotic and loud, but effective.'",
      image: JavonFace,
    },
    {
      text: "'Feymere fell to the Demon King. My people are gone, my throne is ash - but my sword is still mine, and I will lend it to your cause.'",
      image: JavonFace,
    },
    {
      text: "'Let me fight beside you, that monster needs to be taken down. I offer strength... and Rizz.'",
      image: JavonFace,
    },
    {
      text: "Danny hesitates for a second - scared that he will take all the girls - 'Fine, just know I can still out-bench you though'",
      image: DanielFace,
    },
    { text: "[ Ja'von has joined your party! 🗡️✨ ]", image: JavonFace },
  ];

  const fullDialogue = [
    ...trainingGroundsIntro,
    // ...(ethan ? [ethanLine] : []),
    ...javonDialogue,
  ];

  const choices = [{ text: 'Go to Town Square', nextScene: '/bronzebell' }];

  const handleNextEvent = () => {
    if (eventIndex < fullDialogue.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      console.log('setting local storage to visited the training grounds');
      addPartyMember(javon);
      setStage('options');
      localStorage.setItem('visitedTrainingGrounds', 'true'); // Save the visit
    }
  };

  // Skip straight to choices if user has been to Training Grounds
  useEffect(() => {
    const visited = localStorage.getItem('visitedTrainingGrounds') === 'true';
    if (visited) {
      setStage('options');
    }
  }, []);

  return (
    <div
      className='Screen Full-Screen'
      style={{
        backgroundImage: `url(${Grounds})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {stage !== 'options' ? (
        <>
          <TextBox textBox={fullDialogue[eventIndex]} />
          <button className='Next-Btn' onClick={handleNextEvent}>
            Next
          </button>
        </>
      ) : (
        <Choices options={choices} onChoiceSelected={navigate} />
      )}
    </div>
  );
}
