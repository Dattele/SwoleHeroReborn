import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../../TextBox';
import NPCChoices from '../../../../../System/NPCChoices';
import Shop from '../../../../../System/Shop';
import Rest from '../../../../../System/Rest';
import Items from '../../../../../System/Items';
import { useDanny } from '../../../../../../Context/DannyContext';

import IronhideBartender from '../../../../../../assets/images/IronhideBartender.webp';

import '../../../../../../scss/All.scss';

export default function Bartender() {
  const { party, decreaseHP } = useDanny();
  const navigate = useNavigate();

  const [showShop, setShowShop] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showDemonKing, setShowDemonKing] = useState(false);
  const [showRizz, setShowRizz] = useState(false);
  const [rizzIndex, setRizzIndex] = useState(0);
  const [rizzText, setRizzText] = useState([]);

  const choices = [
    { text: '🍺 Buy Food or Drinks', action: 'shop' },
    { text: '🛏 Rent a room', action: 'rest' },
    { text: '💘 Rizz her Up', action: 'rizz' },
    { text: '😈 Ask about the Demon King', action: 'demon-king' },
    { text: '🪑 Go back to your seat', action: 'leave' },
  ];

  console.log('partyy', party);
  const danny = party?.find((member) => member.name === 'Danny');
  const dannyRizz = danny?.rizz ?? 0;

  const shopItems = [Items[0], Items[1], Items[2]];

  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'shop':
        // Open shop modal, change mode, etc.
        setShowShop(true);
        console.log('Opening shop menu...');
        break;
      case 'rest':
        // Show rest confirmation modal
        setShowRest(true);
        console.log('Opening rest confirmation...');
        break;
      case 'rizz':
        // Do rizz check
        handleRizz(dannyRizz);
        setShowRizz(true);
        console.log('Attempting to Rizz Lisa...');
        break;
      case 'demon-king':
        setShowDemonKing(true);
        break;
      case 'leave':
        navigate('/bronzebell/ironhide');
        break;
      default:
        break;
    }
  };

  const handleRizz = (rizz) => {
    if (rizz >= 8) {
      // if (!alreadyRizzedLisa) {
      //   incrementRizz(1);
      //   setAlreadyRizzedLisa(true);
      // }
      //Smooth talker
      setRizzText([
        "You lean in with the confidence of a man who curls his emotions - 'One drink from you and I'm already dizzy.'",
        "Lisa pauses, smirks, and says, 'Careful. I might just like idiots with big biceps.'",
        "You feel your confidence swell as your aura surges outward - It's glowing... and kind of swole? (+1 rizz)",
      ]);
      //changeRizz(1)
    } else if (rizz >= 4) {
      //Awkward
      setRizzText([
        'Bartenders like strong drinks, right? Good thing I come in bulk.',
        "Lisa hands him a glass of water - 'Hydrate. That was painful.'",
      ]);
    } else {
      //Terrible
      setRizzText([
        "Danny: 'Did it hurt when you fell from the protein shelf?'",
        "Lisa just stares. 'Wow. That pickup line just made me file for worker's comp.'",
        'You lose 1 HP from emotional damage.',
      ]);
      const danny = party.find((member) => member.name === 'Danny');
      decreaseHP(danny, 1);
    }
  };

  const handleNextEvent = () => {
    if (rizzIndex < rizzText.length - 1) {
      setRizzIndex(rizzIndex + 1);
    }
  };

  const resetRizz = () => {
    setShowRizz(false);
    setRizzIndex(0);
    setRizzText([]);
  };

  return (
    <>
      {showShop ? (
        <Shop
          title='🍻 Ironhide Inn & Tavern'
          items={shopItems}
          onClose={() => setShowShop(false)}
        />
      ) : showRest ? (
        <Rest
          title='🛏 Ironhide Inn'
          text="Beds so sturdy, even Ethan hasn't broken one… yet."
          onClose={() => setShowRest(false)}
        />
      ) : showDemonKing ? (
        <div
          className='Screen Full-Screen Bartender-Screen'
          style={{
            backgroundImage: `url(${IronhideBartender})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <TextBox
            text={
              "The Demon King? Word is he just took Caldrith Port - one of Eldoria's last strongholds. You want my advice, tough guy? Stay out of it - Dead men don't lift"
            }
          />
          <button className='Btn' onClick={() => setShowDemonKing(false)}>
            I am scared of no man.. I can bench 225!
          </button>
        </div>
      ) : showRizz ? (
        <div
          className='Screen Full-Screen Bartender-Screen'
          style={{
            backgroundImage: `url(${IronhideBartender})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <TextBox text={rizzText[rizzIndex]} />
          {rizzIndex === rizzText.length - 1 ? (
            <button className='Btn' onClick={() => resetRizz()}>
              Go back
            </button>
          ) : (
            <button className='Next-Btn' onClick={handleNextEvent}>
              Next
            </button>
          )}
        </div>
      ) : (
        <div
          className='Screen Full-Screen Bartender-Screen'
          style={{
            backgroundImage: `url(${IronhideBartender})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <TextBox text={'Welcome to Ironhide, what can I do for you?'} />
          <NPCChoices options={choices} onChoiceSelected={handleChoice} />
        </div>
      )}
    </>
  );
}
