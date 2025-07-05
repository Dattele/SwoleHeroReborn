import React from 'react';

import { ReactComponent as CloseIcon } from '../../../assets/images/icon_close.svg';

import './TargetSelection.scss';

export default function TargetSelection({ targets, onSelectTarget, onClose }) {
  return (
    <div className='Target-Modal'>
      <div className='Modal-Content'>
        <h3>Select a Target</h3>
        <div className='Enemy-List'>
          {targets.map((target, index) => (
            <button
              key={index}
              className='Selection-Btn'
              onClick={() => {
                onSelectTarget(target);
              }}
            >
              <span>
                {target?.name} (HP: {target?.hp})
              </span>
              <span>{target?.description}</span>
            </button>
          ))}
        </div>
        <CloseIcon onClick={onClose} />
      </div>
    </div>
  );
}
