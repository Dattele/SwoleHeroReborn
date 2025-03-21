import React from "react";
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';

import Battle from "../Battle";
import { ForestBoss } from "../../Monster/ForestMonsters/ForestMonsters";

export default function ForestBossBattle() {
  const { stats } = useDanny(); // Pulling in Danny's stats
  const navigate = useNavigate();

  const enemy = ForestBoss[0];
  console.log(enemy);

  return (
    <Battle players={[stats]} enemies={[enemy]} />
  );
}