import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { DannyProvider } from './Context/DannyContext';
import HomeScreen from './Components/HomeScreen';
import HeroScreen from './Components/HeroScreen';
import WorldScreen from './Components/WorldScreen';
import FantasyWorldScreen from './Components/FantasyWorldScreen';
import PlainsScreen from './Components/FantasyWorldScreen/Components/PlainsScreen';
import ForestScreen from './Components/FantasyWorldScreen/Components/ForestScreen/ForestScreen';
import ForestBattle from './Components/Battle/ForestBattle/ForestBattle';

export default function App() {
  return (
    <DannyProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/character' element={<HeroScreen />} />
          <Route path='/world' element={<WorldScreen />} />
          <Route path='/fantasy-world' element={<FantasyWorldScreen />} />
          <Route path='/plains' element={<PlainsScreen />} />
          <Route path='/forest' element={<ForestScreen />} />
          <Route path='/forest-battle' element={<ForestBattle />} />
        </Routes>
      </Router>
    </DannyProvider>
  );
}
