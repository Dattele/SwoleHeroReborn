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
import BattleResults from './Components/Battle/BattleResults';
import ForestBossScreen from './Components/FantasyWorldScreen/Components/ForestBossScreen/ForestBossScreen';
import ForestBossBattle from './Components/Battle/ForestBossBattle/ForestBossBattle';
import BronzebellScreen from './Components/FantasyWorldScreen/Components/Bronzebell/BronzebellScreen';
import IronHide from './Components/FantasyWorldScreen/Components/Bronzebell/IronHide/IronHide';
import Bartender from './Components/FantasyWorldScreen/Components/Bronzebell/IronHide/Components/Bartender';
import TrainingGrounds from './Components/FantasyWorldScreen/Components/Bronzebell/TrainingGrounds';
import RizzAndBits from './Components/FantasyWorldScreen/Components/Bronzebell/RizzAndBits/RizzAndBits';

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
          <Route path='/forest-boss' element={<ForestBossScreen />} />
          <Route path='/forest-boss/battle' element={<ForestBossBattle />} />
          <Route path='/battle-results' element={<BattleResults />} />
          <Route path='/bronzebell' element={<BronzebellScreen />} />
          <Route path='/bronzebell/rizz-and-bits' element={<RizzAndBits />} />
          <Route path='/bronzebell/ironhide' element={<IronHide />} />
          <Route path='/bronzebell/ironhide/lisa' element={<Bartender />} />
          <Route path='/bronzebell/training' element={<TrainingGrounds />} />
        </Routes>
      </Router>
    </DannyProvider>
  );
}
