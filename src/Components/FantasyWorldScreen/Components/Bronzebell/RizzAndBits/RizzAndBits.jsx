import React from 'react';
import { useNavigate } from 'react-router-dom';

import Shop from '../../../../System/Shop';
import Items from '../../../../System/Items';

const shopItems = [Items[7], Items[6], Items[8], Items[4], Items[5]]; // Set the stores items

export default function RizzAndBits() {
  const navigate = useNavigate();

  return (
    <Shop
      title='🛍 Rizz & Bits Market'
      items={shopItems}
      onClose={() => navigate('/bronzebell')}
    />
  );
}
