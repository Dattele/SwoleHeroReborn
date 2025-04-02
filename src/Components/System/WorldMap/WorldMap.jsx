import React from 'react';
import { useNavigate } from 'react-router-dom';

import Map from '../../../assets/images/Map.png';

import './WorldMap.scss';
import '../../../scss/All.scss';

export default function WorldMap() {
  const navigate = useNavigate();

  const locations = [
    {
      name: 'EdenGrove Forest',
      top: '23%',
      left: '23%',
      unlocked: true,
      path: '/forest',
    },
    {
      name: 'Bronzebell Town',
      top: '37%',
      left: '37%',
      unlocked: true,
      path: '/bronzebell',
    },
    {
      name: 'Iron-Spire Mountains',
      top: '25%',
      left: '52%',
      unlocked: false,
      path: '/ironspire',
    },
    {
      name: 'Emberfall Ruins',
      top: '45%',
      left: '58%',
      unlocked: false,
      path: '/emberfall',
    },
    {
      name: 'Lustralis Kingdom',
      top: '34%',
      left: '73%',
      unlocked: false,
      path: '/lustralis',
    },
    {
      name: 'Gloamreach Hollow',
      top: '64%',
      left: '25%',
      unlocked: false,
      path: '/gloamreach',
    },
    {
      name: 'Stonejaw Hold',
      top: '50%',
      left: '38%',
      unlocked: false,
      path: '/stonejaw',
    },
    {
      name: 'Dreadmire Swamp',
      top: '59%',
      left: '50%',
      unlocked: false,
      path: '/dreadmire',
    },
    {
      name: 'Ruins of Feymere',
      top: '78%',
      left: '21%',
      unlocked: false,
      path: '/feymere',
    },
    {
      name: "Demon King's Citadel",
      top: '79%',
      left: '75%',
      unlocked: false,
      path: '/citadel',
    },
  ];

  return (
    <div
      className='Screen Full-Screen Map-Screen'
    >
      <div className='Map-Container'       style={{
        backgroundImage: `url(${Map})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
        {locations.map((loc, index) =>
          loc.unlocked ? (
            <button
              key={index}
              className='Map-Location'
              style={{ top: loc.top, left: loc.left }}
              onClick={() => navigate(loc.path)}
            >
              {loc.name}
            </button>
          ) : (
            <div
              key={index}
              className='Map-Location Locked'
              style={{ top: loc.top, left: loc.left }}
            >
              ???
            </div>
          ),
        )}
      </div>
    </div>
  );
}
