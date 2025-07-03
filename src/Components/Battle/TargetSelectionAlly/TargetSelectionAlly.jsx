import React from 'react';

import './TargetSelectionAlly.scss';

export default function TargetSelectionAlly({ allies, onSelectTarget }) {
  return (
    <div className='Target-Modal'>
      <div className='Modal-Content'>
        <h3>Select a Target</h3>
        <div className='Ally-List'>
          {allies.map((ally, index) => (
            <button
              key={index}
              className='Selection-Btn'
              onClick={() => {
                onSelectTarget(ally);
              }}
            >
              <span>
                {ally?.name} (HP: {ally?.hp})
              </span>
              <span>{ally?.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
