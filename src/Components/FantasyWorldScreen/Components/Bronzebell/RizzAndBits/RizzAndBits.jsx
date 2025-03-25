import React from "react";
import { useNavigate } from "react-router-dom";

import { useDanny } from "../../../../../Context/DannyContext";
import Shop from "../../../../System/Shop";
import Items from "../../../../System/Items";

export default function RizzAndBits() {
  const { spendGold, addItemToInventory } = useDanny();
  const navigate = useNavigate();
  
  const shopItems = [Items[0]]; // Set the stores items

  const handleBuy = (item) => {
    if (spendGold(item.price)) {
      addItemToInventory(item);
      console.log(`Bought ${item.name}`);
    } else {
      console.log('Not enough gold!');
    }
  };

  return (
    <Shop title='🛍 Rizz & Bits Market' items={shopItems} onClose={() => navigate('/bronzebell')} onBuy={handleBuy} />
  );
}