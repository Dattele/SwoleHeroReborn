import React from 'react';

import './TargetSelection.scss';

export default function TargetSelection({ enemies, onSelectTarget }) {
  return (
    <div className='Target-Modal'>
      <div className='Modal-Content'>
        <h3>Select a Target</h3>
        <div className='Enemy-List'>
          {enemies.map((enemy, index) => (
            <button
              key={index}
              className='Selection-Btn'
              onClick={() => {
                onSelectTarget(enemy);
              }}
            >
              <span>
                {enemy?.name} (HP: {enemy?.hp})
              </span>
              <span>{enemy?.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
