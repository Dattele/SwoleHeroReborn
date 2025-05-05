import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../TextBox';
import NPCChoices from '../../../../System/NPCChoices';
import Items from '../../../../System/Items';
import { useDanny } from '../../../../../Context/DannyContext';

import spireFloor3 from '../../../../../assets/images/SpireFloor3.png';

import '../../../../../scss/All.scss';

export default function SpireFloor3() {
  const { addItem, gainGold, restorePartyHP } = useDanny();
  const navigate = useNavigate();

  const [eventIndex, setEventIndex] = useState(0);
  const [fountainIndex, setFountainIndex] = useState(0);
  const [chestIndex, setChestIndex] = useState(0);
  const [showFountain, setShowFountain] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [openChest, setOpenChest] = useState(false);
  const [drinkWater, setDrinkWater] = useState(false);
  const [batheWater, setBatheWater] = useState(false);
  const [openedChest, setOpenedChest] = useState(localStorage.getItem('floor3Chest') === 'true');

  const spireFloor3Events = [
    'The stone floor dips gently into a shattered sanctuary. At its center, a strange frost-covered fountain emits a soft blue glow.',
    "Ethan: 'Whoa... you guys seeing this? It's like an ice bath made by angels.'",
    "Ja'von: 'A place of healing. The old dwarves believed strength was sacred — and the body had to be honored.'",
    "Danny: 'You had me at ice bath. Let's soak, heal, and maybe flex a little on these ancient ghosts.'",
  ];

  const drinkEvents = [
    "You cup the freezing water and take a cautious sip. It stings your throat—then spreads warmth through your entire body. You feel refreshed and focused.",
    "Ja'von: 'A sacred spring... the dwarves did not build this for thirst alone.'",
    "** The Party's HP has been restored **",
  ];

  const batheEvents = [
    "Danny cannonballs in without warning, splashing icy water everywhere. The cold burns like fire, but your muscles stop aching. You emerge... stronger somehow.",
    "Ethan: 'Coldest bath of my life... but my spine feels aligned again.'",
    "** The Party's HP has been restored **",
  ];

  const chestEvents = [
    "In the corner of the sanctuary sits a lone chest - as if the mountain itself forgot it.",
    "Ethan: 'Hold up... that's not a mimic, is it? I read a scroll once that said if it blinks, run.'",
    "Danny: 'Nah, bro. That's not a mimic. It's worse... it's a mime.'",
    "Ja'von: 'A... mime?'",
    "Danny: 'Yeah. Just silently judging your form while you die.'",
    "Ethan: '...Now I'm actually scared.'",
    "Ja'von: 'Be wary. But if the dwarves left this behind, it may hold more than coin.'",
    "Danny: 'Alright, let's open this thing. If it kills us, at least my last words will be “Chest Day.”'",
  ]

  const choices = [
    {
      text: 'Is that water?',
      action: 'fountain',
    },
    {
      text: 'Bathe in the Fountain',
      action: 'fountain',
    },
    ...(!openedChest ? 
      [{ 
        text: 'Open the Chest',
        action: 'chest',
      }]
      : [{
        text: 'Chest has been Opened',
        action: 'nothing',
      }]
    ),
    {
      text: 'No Rest for the Swole',
      action: 'continue',
    },
  ];

  const fountainChoices = [
    {
      text: 'Drink the water',
      action: 'drink',
    },
    {
      text: 'Bathe in the Fountain',
      action: 'bathe',
    },
    {
      text: 'Head Back',
      action: 'leave',
    },
  ];

  const chestChoices = [
    {
      text: 'Open the chest',
      action: 'open',
    },
    {
      text: 'Leave it be (in case its a mime)',
      action: 'leave',
    },
  ];

  const openChestChoices = [
    {
      text: 'Head Back',
      action: 'leave',
    },
  ];

  const handleNextEvent = (event, setIndex) => {
    setIndex(prev => {
      if (prev < event.length - 1) return prev + 1;
  
      // Auto-reset at end
      setDrinkWater(false);
      setBatheWater(false);
      return 0;
    });
  };

  // Handle the user's choice
  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'fountain':
        // Go to the fountain
        setShowFountain(true);
        break;
      case 'chest':
        // Go to the chest
        setShowChest(true);
        break;
      case 'continue':
        // Navigate to the next floor
        navigate('/spire-floor-4');
        break;
      case 'drink':
        // Drink the water to restore party HP
        setDrinkWater(true);
        restorePartyHP();
        break;
      case 'bathe':
        // Bathe in the water to restore party HP
        setBatheWater(true);
        restorePartyHP();
        break;
      case 'open':
        // Open the treasure chest and get Dwarven wrist straps and 50 gold
        setOpenChest(true);
        addItem(Items[9]);
        gainGold(50);
        setOpenedChest(true);
        localStorage.setItem('floor3Chest', true);
        break;
      case 'leave':
        // Resetting the states
        setDrinkWater(false);
        setBatheWater(false);
        setShowFountain(false);
        setShowChest(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`Screen Full-Screen Spire-Floor-3-Screen 
        ${showFountain ? 'Zoom-Center' : showChest ? 'Zoom-Right' : ''}`}
      style={{
        backgroundImage: `url(${spireFloor3})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {showFountain ? (
        <>
          {drinkWater ? (
            <>
              <TextBox text={drinkEvents[fountainIndex]} />
              <button className='Next-Btn' onClick={() => handleNextEvent(drinkEvents, setFountainIndex)}>
                Next
              </button>
            </>
          ) : batheWater ? (
            <>
              <TextBox text={batheEvents[fountainIndex]} />
              <button className='Next-Btn' onClick={() => handleNextEvent(batheEvents, setFountainIndex)}>
                Next
              </button>
            </>
          ) : (
            <>
              <TextBox text={"Danny: 'Alright boys.. do we sip the water like Gentlemen or go full baptism mode?'" } />
              <NPCChoices options={fountainChoices} onChoiceSelected={handleChoice} />
            </>
          )}
        </>
      ) : showChest ? (
        <>
          {openChest ? (
            <> 
              <TextBox text={`You pry open the frost-covered lid.
              \n** Item Received: ${Items[9].name} - +2 strength **
              \n** Gold Received: 50 **`} />
              <NPCChoices options={openChestChoices} onChoiceSelected={handleChoice} />
            </>
          ) : (
            <>
            <TextBox text={chestEvents[chestIndex]} />
            {chestIndex === chestEvents.length - 1 ? (
              <NPCChoices options={chestChoices} onChoiceSelected={handleChoice} />
            ) : (
              <button className='Next-Btn' onClick={() => handleNextEvent(chestEvents, setChestIndex)}>
                Next
              </button>
            )}
            </>
          )}
        </>
      ) : (
        <>
          <TextBox text={spireFloor3Events[eventIndex]} />

          {eventIndex === spireFloor3Events.length - 1 ? (
            <NPCChoices options={choices} onChoiceSelected={handleChoice} />
          ) : (
            <button className='Next-Btn' onClick={() => handleNextEvent(spireFloor3Events, setEventIndex)}>
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
}
