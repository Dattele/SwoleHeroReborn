import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import Shop from '../../../../System/Shop';
import Items from '../../../../System/Items';

export default function RizzAndBits() {
  const { spendGold, addItem } = useDanny();
  const navigate = useNavigate();

  const shopItems = [Items[7], Items[6], Items[8], Items[4], Items[5]]; // Set the stores items

  const handleBuy = (item) => {
    if (spendGold(item.price)) {
      addItem(item);
      console.log(`Bought ${item.name}`);
    } else {
      console.log('Not enough gold!');
    }
  };

  return (
    <Shop
      title='🛍 Rizz & Bits Market'
      items={shopItems}
      onClose={() => navigate('/bronzebell')}
      onBuy={handleBuy}
    />
  );
}
