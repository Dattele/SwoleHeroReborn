import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';
import NPCChoices from '../../../../System/NPCChoices';
import EmberfallBattle from '../../../../Battle/EmberfallBattle';
import EmberfallMonsters from '../../../../Monster/EmberfallMonsters';

import emberfall1Enemies from '../../../../../assets/images/Emberfall1Enemies.png';
import emberfall1Clear from '../../../../../assets/images/Emberfall1Clear.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import '../../../../../scss/All.scss';
import './Emberfall.scss';

const emberfallEnemies = [
  EmberfallMonsters[0],
  EmberfallMonsters[0],
  EmberfallMonsters[3],
];

const emberfallEntranceEvents = [
  {
    text: `The party walks through the entrance and steps foot into Emberfall. 
      Danny: 'So this is Emberfall? I have seen cleaner locker rooms than this place.`,
    image: DanielFace,
  },
  {
    text: "Ja'von: 'Even the Demon King's armies couldn't destroy the stench of your socks, Danny.'",
    image: JavonFace,
  },
  {
    text: "Ethan: 'This is really bad guys.. I can still taste the sand in my mouth.'",
    image: EthanFace,
  },
  {
    text: "Danny and Ja'von pause and look at each other then at Ethan. Ja'von: 'You good bro? Stop eating the sand'",
    image: JavonFace,
  },
  {
    text: "Danny: 'Yoo lets focus up, take some pre-workout, and see what we can find around here.'",
    image: DanielFace,
  },
  {
    text: '*** Choose a party member for a perception check ***',
    image: DanielFace,
  },
];

const perceptionSuccessLines = {
  ethan: [
    {
      text: "Ethan: 'Wait, you guys see that? There - behind those rocks! We've got company!'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Not bad, Ethan. Looks like your eyes finally woke up.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'For once, you spotted trouble before it smacked you in the face.'",
      image: DanielFace,
    },
    {
      text: '*** Embrace for battle - enemies receive -2 defense ***',
      image: DanielFace,
    },
  ],
  javon: [
    {
      text: "Ja'von: 'Hold up - there's movement by the rubble. Knights in the shadows, just waiting for us.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Good catch, Ja'von!! You got the best eyes.. and face.. in the squad!'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Glad you're here, man. I was just admiring the view' *** Note: Ethan is in the back of the group. ***",
      image: EthanFace,
    },
    {
      text: '*** Embrace for battle - enemies receive -2 defense ***',
      image: DanielFace,
    },
  ],
  danny: [
    {
      text: "Danny: 'Whoa, guys! There's something shiny over there. Is it a shiny pokemon?!",
      image: DanielFace,
    },
    {
      text: "Ethan: 'Not unless those shiny things are monsters trying to kill us. Look out!'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'Danny, focus. Not everything that glimmers is a prize.'",
      image: JavonFace,
    },
    {
      text: '*** Embrace for battle - enemies receive -2 defense ***',
      image: DanielFace,
    },
  ],
};

const perceptionFailLines = {
  ethan: [
    {
      text: 'Ethan: WHOA - where did they come from?! I thought those were just statues or something!',
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Maybe if you hadn't been drinking all day, you would have been able to see them.'",
      image: JavonFace,
    },
    {
      text: "Danny: 'Duck! Those arrows aren't made of rubber!'",
      image: DanielFace,
    },
    {
      text: '*** Embrace for battle - players receive -5 HP ***',
      image: DanielFace,
    },
  ],
  javon: [
    {
      text: "Ja'von: Gah! I didn't even hear them coming. I must be slipping.",
      image: JavonFace,
    },
    {
      text: "Ethan: 'Even the best miss a beat sometimes, right?'",
      image: EthanFace,
    },
    {
      text: "Danny: 'HAHA!! I knew I was the best in the squad! Loser!!'",
      image: DanielFace,
    },
    {
      text: '*** Embrace for battle - players receive -5 HP ***',
      image: DanielFace,
    },
  ],
  danny: [
    {
      text: 'Danny is standing at the entrance of Emberfall flexing then all of a sudden undead Knights appear',
      image: DanielFace,
    },
    {
      text: "Ja'von: 'Maybe next time you should keep your eyes on the shadows instead of your biceps.'",
      image: JavonFace,
    },
    {
      text: "Ethan: Oh no guys, help!! I'm scared, they are charging us! Ja'von please!'",
      image: EthanFace,
    },
    {
      text: '*** Embrace for battle - players receive -5 HP ***',
      image: DanielFace,
    },
  ],
};

const perceptionChoices = [
  {
    text: 'Ethan',
    action: 'Ethan',
  },
  {
    text: 'Danny',
    action: 'Danny',
  },
  {
    text: "Ja'von",
    action: "Ja'von",
  },
];

const choices = [
  {
    text: 'Explore deeper',
    nextScene: '/emberfall/emberfall-2',
  },
  {
    text: 'Head back',
    nextScene: '/world-map',
  },
];

export default function EmberfallEntrance() {
  const { party, decreaseHP, visited, visitedLocation } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('intro');
  const [currentDialogue, setCurrentDialogue] = useState(
    emberfallEntranceEvents,
  );
  const [currentImage, setCurrentImage] = useState(emberfall1Clear);
  const [battleEnd, setBattleEnd] = useState('');
  const [perceptionResult, setPerceptionResult] = useState('');

  const danny = party?.find((member) => member.name === 'Danny');
  const ethan = party?.find((member) => member.name === 'Ethan, the Brute');
  const javon = party?.find((member) => member.name === "Ja'von, the Rizzler");

  const handleNextEvent = () => {
    if (eventIndex < currentDialogue.length - 1) {
      setEventIndex((prev) => prev + 1);
    }
  };

  // Track that the user has visited EmberfallEntrance
  const handleChoiceSelected = (nextScene) => {
    visitedLocation('visitedEmberfallEntrance');
    navigate(nextScene);
  };

  // Calulcate the chance of the perception succeeding
  const perceptionCheck = (bonusChance) => {
    // 10% chance to start with each point adding 10%
    const chance = 0.1 + bonusChance * 0.1;

    return Math.random() < chance;
  };

  // Handle the perception check
  const handlePerception = (choice) => {
    let check;
    let selectedPlayer = '';
    setEventIndex(0); // Set the index to 0

    switch (choice.action) {
      case 'Ethan': {
        check = perceptionCheck(3.5);
        selectedPlayer = 'ethan';
        break;
      }
      case "Ja'von": {
        check = perceptionCheck(6);
        selectedPlayer = 'javon';
        break;
      }
      case 'Danny': {
        check = perceptionCheck(4);
        selectedPlayer = 'danny';
        break;
      }
      default:
        break;
    }

    if (check) {
      setCurrentDialogue(perceptionSuccessLines[selectedPlayer]);
      setPerceptionResult('-2 defense');
    } else {
      setCurrentDialogue(perceptionFailLines[selectedPlayer]);
      decreaseHP(danny, 5);
      decreaseHP(ethan, 5);
      decreaseHP(javon, 5);
    }

    setCurrentImage(emberfall1Enemies);
    setStage('perceptionResult');
  };

  // Skip straight to choices if user has been to the Emberfall Entrance
  useEffect(() => {
    const userVisited = visited.includes('visitedEmberfallEntrance');
    if (userVisited) {
      setStage('options');
    }
  }, [visited]);

  useEffect(() => {
    if (battleEnd === 'win') {
      setCurrentImage(emberfall1Clear);
    }
  }, [battleEnd]);

  return (
    <div
      className='Screen Full-Screen Emberfall-Entrance-Screen'
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {battleEnd === 'win' ? (
        <>
          <TextBox
            textBox={{
              text: "Danny: 'That's what happens when you skip arm day! Let's see what else is hiding in these ruins!",
              image: DanielFace,
            }}
          />
          <Choices options={choices} onChoiceSelected={handleChoiceSelected} />
        </>
      ) : stage === 'battle' ? (
        perceptionResult === '-2 defense' ? (
          <EmberfallBattle
            enemies={emberfallEnemies.map((enemy) => ({
              ...enemy,
              defense: enemy.defense - 2,
            }))}
            battleEnd={battleEnd}
            setBattleEnd={setBattleEnd}
          />
        ) : (
          <EmberfallBattle
            enemies={emberfallEnemies}
            battleEnd={battleEnd}
            setBattleEnd={setBattleEnd}
          />
        )
      ) : stage !== 'options' ? (
        <>
          <TextBox textBox={currentDialogue[eventIndex]} />

          {eventIndex === currentDialogue.length - 1 ? (
            <>
              {stage === 'perceptionResult' ? (
                <button className='Next-Btn' onClick={() => setStage('battle')}>
                  Go to Battle
                </button>
              ) : (
                <NPCChoices
                  options={perceptionChoices}
                  onChoiceSelected={handlePerception}
                />
              )}
            </>
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
              text: "Ethan: 'I can't believe we're back here again. At least there aren't any more creepy knights lurking around.. right?'",
              image: EthanFace,
            }}
          />
          <NPCChoices options={choices} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
