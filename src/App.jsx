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
import DrunkScholar from './Components/FantasyWorldScreen/Components/Bronzebell/IronHide/Components/DrunkScholar';
import ToughGuy from './Components/FantasyWorldScreen/Components/Bronzebell/IronHide/Components/ToughGuy';
import Goat from './Components/FantasyWorldScreen/Components/Bronzebell/Goat';
import Shrine from './Components/FantasyWorldScreen/Components/Bronzebell/Shrine';
import Mayor from './Components/FantasyWorldScreen/Components/Bronzebell/MayorHall/MayorHall';
import WorldMap from './Components/System/WorldMap/WorldMap';
import GameWrapper from './Components/GameWrapper';

export default function App() {
  return (
    <DannyProvider>
      <Router>
        <GameWrapper />
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
          <Route
            path='/bronzebell/ironhide/drunk-scholar'
            element={<DrunkScholar />}
          />
          <Route
            path='/bronzebell/ironhide/local-tough-guy'
            element={<ToughGuy />}
          />
          <Route path='/bronzebell/shrine' element={<Shrine />} />
          <Route path='/bronzebell/training' element={<TrainingGrounds />} />
          <Route path='/bronzebell/mayor' element={<Mayor />} />
          <Route path='/bronzebell/goat' element={<Goat />} />
          <Route path='/world-map' element={<WorldMap />} />
        </Routes>
      </Router>
    </DannyProvider>
  );
}
