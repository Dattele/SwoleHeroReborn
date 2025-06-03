import React, { useState, useEffect, useRef } from 'react';

import './Choices.scss';

export default function Choices({ options, onChoiceSelected }) {
  const [buttonHeight, setButtonHeight] = useState('auto');
  const buttonRefs = useRef([]);

  // useEffect(() => {
  //   if (buttonRefs.current.length > 0) {
  //     const maxHeight = Math.max(
  //       ...buttonRefs.current.map((btn) => btn?.offsetHeight || 0),
  //     );
  //     setButtonHeight(`${maxHeight}px`);
  //   }
  // }, [options]);

  return (
    <div className='Choices'>
      {options.map((choice, index) => (
        <button
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
          className='Next-Btn'
          onClick={() => onChoiceSelected(choice.nextScene)}
          style={{
            height: buttonHeight,
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
