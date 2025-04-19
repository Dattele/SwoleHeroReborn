import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import shrine from '../../../../../assets/images/Shrine.png';

import './Shrine.scss';
import '../../../../../scss/All.scss';

export default function Shrine() {
  const { party } = useDanny();

  const navigate = useNavigate();
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('giveQuest');

  const bobbyDialogue = {
    notReady: [
      'The shrine is still. Bobby opens one eye as you approach... alone.',
      "'You are eager, but not yet ready.. Come back when you're surrounded by strength'",
      "'Until then, I will wait... and the world will worsen.'",
    ],

    giveQuest: [
      'The shrine is quiet. You see a young monk in deep meditation.',
      "As you approach, he opens one eye. 'So... the one who reeks of chalk and protein finally arrives.'",
      "'I am Bobby. Keeper of stories, seer of truths, and undefeated town chess champion.'",
      "He gestures for your party to kneel. 'Much has changed, brave ones. Eldoria is breaking.'",
      "'The Demon King has conquered half the continent. Cities burn. Hope flickers.'",
      "'Two generals now carry out his will. Brenden, the Necromancer — whose armies do not breathe.'",
      "'And Wes… the Dark Wizard. Once known as 'The Sage of Solace.' The most powerful sorcerer Eldoria ever knew.'",
      "Ja'von: 'I've heard legends of Wes. He could bend light, time, and shadow itself.'",
      "Bobby nods solemnly. 'He was corrupted. Twisted by the Demon King. Now he whispers madness into the ears of kings.'",
      "Ethan: 'Sounds like a wizard with daddy issues.'",
      "Bobby ignores the comment. 'There is a more pressing concern. The forest of EdenGrove has fallen under a dark shadow.'",
      "'The corruption must be cleansed. Return there. Find its heart. Purge the darkness before it spreads further.'",
      '**[ New Quest: Cleanse EdenGrove Forest 🌿 ]**',
    ],

    stillCorrupted: [
      "Bobby greets you with a heavy gaze. 'The forest still suffers.'",
      "'You carry strength, but action defines purpose. Return only when EdenGrove breathes clean again.'",
      "'The trees are whispering, and they do not sound hopeful.'",
    ],

    completed: [
      "Bobby steps forward, a rare look of hope in his eyes. 'It is done.'",
      "'The corruption is purged. EdenGrove breathes once more. You have done a great thing... though you still smell like gym socks.'",
      "'Now, your path leads beyond Bronzebell. Beyond the familiar. Toward the broken edge of Eldoria - Emberfall Ruins. Climb through the Spire Mountains, and you shall arive.'",
      "'The world trembles. But perhaps... just perhaps... it trembles in your favor.'",
      "He pauses... then speaks with a gravity you haven't heard before.",
      "'There is one more truth I've held back. A prophecy. As old as the roots of the world.'",
      "'It tells of a time where Eldoria falls — when darkness consumes light, and gains must be made.'",
      "He turns towards Danny. 'Then shall rise The One Who Lifts.'",
      "'He will bring strength where there is weakness, hope where there is doubt, and pecs where there is despair.'",
      "Danny: 'Wait, that sounds like me! Right guys? Right?'",
      "Ja'von and Ethan glance at each other, slowly shaking their heads.",
      "Bobby smiles. 'Perhaps. Or perhaps the prophecy meant someone a little less sweaty..'",
      "'Go now. Your journey begins anew. And the fate of Eldoria... may just rest on your absurdly large shoulders.'",
      "He returns to meditation. 'May your strength remain... and your squats remain deep.'",
      // '**[ Quest Complete: EdenGrove Forest ✅ ]**',
    ],
  };

  const choices = [{ text: 'Head back', nextScene: '/bronzebell' }];

  const handleNextEvent = () => {
    if (eventIndex < bobbyDialogue[stage].length - 1) {
      setEventIndex(eventIndex + 1);
    }
  };

  // UseEffect that sets the stage for the interaction with Bobby
  useEffect(() => {
    const ethan = party.find((member) => member.name === 'Ethan, the Brute');
    const javon = party.find((member) => member.name === "Ja'von, the Rizzler");
    if (!ethan || !javon) {
      setStage('notReady');
    } else if (localStorage.getItem('Cleanse EdenGrove Forest') === 'received') {
      setStage('stillCorrupted');
    } else if (localStorage.getItem('Cleanse EdenGrove Forest') === 'completed') {
      setStage('completed');
    }
  }, []);

  // Checks for when the giveQuest dialogue is complete
  useEffect(() => {
    if (
      stage === 'giveQuest' &&
      eventIndex === bobbyDialogue.giveQuest.length - 1
    ) {
      localStorage.setItem('Cleanse EdenGrove Forest', 'received');
    }
  }, [eventIndex]);

  return (
    <div
      className='Screen Full-Screen Shrine-Screen'
      style={{
        backgroundImage: `url(${shrine})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TextBox text={bobbyDialogue[stage][eventIndex]} />

      {eventIndex === bobbyDialogue[stage].length - 1 ? (
        <Choices options={choices} onChoiceSelected={navigate} />
      ) : (
        <button className='Next-Btn' onClick={handleNextEvent}>
          Next
        </button>
      )}
    </div>
  );
}
