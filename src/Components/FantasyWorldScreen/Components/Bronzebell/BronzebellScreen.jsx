import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Bronzebell from '../../../../assets/images/Bronzebell.webp';
import BronzebellGate from '../../../../assets/images/BronzebellGate.webp';

export default function BronzebellScreen() {
  const navigate = useNavigate();

  const [firstVisit, setFirstVisit] = useState(() => {
    return !localStorage.getItem('visitedBronzebell');
  })
  const [showOptions, setShowOptions] = useState(false);

  const bronzebellIntro = [
    'After surviving VerdenGrove Forest and somehow getting even sweatier, Danny finally arrives at the edge of a fortified town.',
    'The gates open without question, and the scent of roasted meat, steel, and slightly questionable herbal supplements fill the air.',
    "A guard gives Danny a quick once-over, then immediately looks away, as if unsure if he just saw a hero or a fever dream.",
  ];

  const bronebellEvents = [
    "'Welcome to Bronzebell... maybe I'll finally find a girlfriend here,' Danny says - flexing at absolutely no one.",
    'The people in town just stop and stare at him - wondering if he is clinically insane',
    "Danny nods to himself. 'They are probably just intimidated by my gains.",
    'He adjusts his lifting belt unnecessarily tight and struts deeper into town, confident in his delusion.',
    'Somewhere nearby, a goat bleats menacingly.',
  ];

  const goToLocation = (location) => {
    console.log(`Navigating to: ${location}`);
    //navigate(`/bronzebell/${location}`);
  }

  useEffect(() => {
    if (firstVisit) {
      localStorage.setItem('visitedBronzebell', 'true');
    } else {
      setShowOptions(true);
    }
  }, [firstVisit]);
}