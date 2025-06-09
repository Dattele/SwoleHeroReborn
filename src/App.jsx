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
import SpireScreen from './Components/FantasyWorldScreen/Components/SpireScreen';
import SpireBattle from './Components/Battle/SpireBattle';
import SpireEntrance from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireEntrance';
import SpireFloor1 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor1';
import SpireFloor2 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor2';
import SpireFloor3 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor3';
import SpireFloor4 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor4';
import SpireFloor5 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor5';
import SpireFloor6 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor6';
import SpireFloor7 from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireFloor7';
import SpireBoss from './Components/FantasyWorldScreen/Components/SpireScreen/Components/SpireBoss';
import EmberfallScreen from './Components/FantasyWorldScreen/Components/EmberfallScreen';
import EmberfallEntrance from './Components/FantasyWorldScreen/Components/EmberfallScreen/Components/EmberfallEntrance';

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
          <Route path='/spire' element={<SpireScreen />} />
          <Route path='/spire-battle' element={<SpireBattle />} />
          <Route path='/spire-entrance' element={<SpireEntrance />} />
          <Route path='/spire-floor-1' element={<SpireFloor1 />} />
          <Route path='/spire-floor-2' element={<SpireFloor2 />} />
          <Route path='/spire-floor-3' element={<SpireFloor3 />} />
          <Route path='/spire-floor-4' element={<SpireFloor4 />} />
          <Route path='/spire-floor-5' element={<SpireFloor5 />} />
          <Route path='/spire-floor-6' element={<SpireFloor6 />} />
          <Route path='/spire-floor-7' element={<SpireFloor7 />} />
          <Route path='/spire-boss' element={<SpireBoss />} />
          <Route path='/emberfall' element={<EmberfallScreen />} />
          <Route path='/emberfall/entrance' element={<EmberfallEntrance />} />
        </Routes>
      </Router>
    </DannyProvider>
  );
}
