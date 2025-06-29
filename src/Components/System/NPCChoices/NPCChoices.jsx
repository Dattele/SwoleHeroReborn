import React from 'react';

import './NPCChoices.scss';

export default function NPCChoices({ options, onChoiceSelected }) {
  return (
    <div className='NPC-Choices'>
      {options.map((choice, index) => (
        <button
          key={index}
          className='Next-Btn'
          onClick={() => onChoiceSelected(choice)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
