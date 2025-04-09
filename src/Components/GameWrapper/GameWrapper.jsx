import React from 'react';
import { useLocation } from 'react-router-dom';
import GameUI from '../GameUI';

export default function GameWrapper() {
  const location = useLocation();

  const showMenuRoutes = [
    '/forest',
    '/bronzebell',
    '/lustralis',
  ];

  const showMenu = showMenuRoutes.includes(location.pathname); 

  return <GameUI showMenu={showMenu} />;
}