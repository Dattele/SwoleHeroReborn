import React, { useState } from 'react';

import TextBox from '../../../TextBox';

import DanielFace from '../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../assets/images/JavonFace.png';

export default function GlyphPuzzle({ onComplete }) {
  const [activeGlyph, setActiveGlyph] = useState(null);
  const [completedGlyphs, setCompletedGlyphs] = useState([]);
  const [dialogue, setDialogue] = useState(null);

  const glyphs = [
    { id: 'power', color: 'red', name: 'Glyph of Power', owner: 'Danny' },
    { id: 'wisdom', color: 'blue', name: 'Glyph of Wisdom', owner: "Ja'von" },
    {
      id: 'vitality',
      color: 'green',
      name: 'Glyph of Vitality',
      owner: 'Ethan',
    },
  ];

  // Handling a glyph being clicked
  const handleGlyphClick = (glyph) => {
    if (completedGlyphs?.includes(glyph.id)) return;
    setActiveGlyph(glyph);
    setDialogue({
      text: `${glyph.owner} steps forward to activate the ${glyph.name}...`,
      image: getFace(glyph.owner),
    });
  };

  // Handling a glyph being completed
  const completeGlyph = (glyphId) => {
    setCompletedGlyphs([...completedGlyphs, glyphId]);
    setActiveGlyph(null);
    setDialogue({
      text: `The ${glyphId} glyph stabilizes with a brilliant glow!`,
      image: null,
    });

    if (completedGlyphs.length + 1 === glyphs.length) {
      onComplete();
    }
  };

  const getFace = (owner) => {
    switch (owner) {
      case 'Danny':
        return DanielFace;
      case 'Ethan':
        return EthanFace;
      case "Ja'von":
        return JavonFace;
      default:
        return null;
    }
  };

  return (
    <div className='Glyph-Puzzle'>
      <TextBox
        textBox={
          dialogue || { text: 'Three glyphs hum with power before you...' }
        }
      />

      <div className='Glyph-Container'>
        {glyphs.map((g) => (
          <button
            key={g.id}
            onClick={() => handleGlyphClick(g)}
            className={`Glyph-Button ${g.color} ${
              completedGlyphs.includes(g.id) ? 'complete' : ''
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {activeGlyph && (
        <div className='MiniGame-Container'>
          <button onClick={() => completeGlyph(activeGlyph.id)}>
            Simulate Solve
          </button>
        </div>
      )}
    </div>
  );
}
