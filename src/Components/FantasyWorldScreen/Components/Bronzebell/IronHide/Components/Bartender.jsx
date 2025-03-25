import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import TextBox from '../../../../../TextBox';
import NPCChoices from "../../../../../System/NPCChoices";
import Shop from "../../../../../System/Shop";
import Rest from "../../../../../System/Rest";
import Items from "../../../../../System/Items";
import { useDanny } from "../../../../../../Context/DannyContext";

import IronhideBartender from '../../../../../../assets/images/IronhideBartender.webp';

import '../../../../../../scss/All.scss';

export default function Bartender() {
  const { spendGold, addItemToInventory, party } = useDanny();
  const navigate = useNavigate();

  const [showShop, setShowShop] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showDemonKing, setShowDemonKing] = useState(false);

  const choices = [
    { text: '🍺 Buy Food or Drinks', action: 'shop' },
    { text: '🛏 Rent a room', action: 'rest' },
    { text: '💘 Rizz her Up', action: 'rizz' },
    { text: '😈 Ask about the Demon King', action: 'demon-king' },
    { text: '🪑 Go back to your seat', action: 'leave' }
  ];

  const danny = party.find(member => member.name === 'Danny');
  const dannyRizz = danny?.rizz ?? 0;
  const shopItems = [Items[0], Items[1], Items[2]];

  const handleChoice = (choice) => {
    switch (choice.action) {
      case 'shop':
        // Open shop modal, change mode, etc.
        setShowShop(true);
        console.log("Opening shop menu...");
        break;
      case 'rest':
        // Show rest confirmation modal
        setShowRest(true);
        console.log("Opening rest confirmation...");
        break;
      case 'rizz':
        // Do rizz check
        console.log("Attempting to Rizz Lisa...");
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

  const handleBuy = (item) => {
    if (spendGold(item.price)) {
      addItemToInventory(item);
      console.log(`Bought ${item.name}`);
    } else {
      console.log('Not enough gold!');
    }
  };

  const handleRest = (item) => {
    console.log('handling rest');
  }

  const handleRizz = () => {

  }

  return (
    <>
      {showShop ? (
        <Shop title='🍻 Ironhide Inn & Tavern' items={shopItems} onClose={() => setShowShop(false)} onBuy={handleBuy} />
      ) : showRest ? (
        <Rest title='🛏 Ironhide Inn' text="Beds so sturdy, even Ethan hasn't broken one… yet." onRest={handleRest} onClose={() => setShowRest(false)} />
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
          <TextBox text={"The Demon King? Word is he just took Caldrith Port - one of Eldoria's last strongholds. You want my advice, tough guy? Stay out of it - Dead men don't lift"} />
          <button className='Btn' onClick={() => setShowDemonKing(false)}>I am scared of no man.. I can bench 225!</button>
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