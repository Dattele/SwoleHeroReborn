import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../Context/DannyContext';
import Map from '../../../assets/images/Map.png';

import './WorldMap.scss';
import '../../../scss/All.scss';

export default function WorldMap() {
  const { locations } = useDanny();

  const navigate = useNavigate();

  return (
    <div className='Screen Full-Screen Map-Screen'>
      <div
        className='Map-Container'
        style={{
          backgroundImage: `url(${Map})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
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
