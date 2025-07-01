import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import shrine from '../../../../../assets/images/Shrine.png';
import BobbyFace from '../../../../../assets/images/BobbyFace.png';
import DanielFace from '../../../../../assets/images/DanielFace.png';
import EthanFace from '../../../../../assets/images/EthanFace.png';
import JavonFace from '../../../../../assets/images/JavonFace.png';

import './Shrine.scss';
import '../../../../../scss/All.scss';

const bobbyDialogue = {
  notReady: [
    {
      text: 'The shrine is still. Bobby opens one eye as you approach... alone.',
      image: BobbyFace,
    },
    {
      text: "'You are eager, but not yet ready.. Come back when you're surrounded by strength'",
      image: BobbyFace,
    },
    {
      text: "'Until then, I will wait... and the world will worsen.'",
      image: BobbyFace,
    },
  ],

  giveQuest: [
    {
      text: 'The shrine is quiet. You see a young monk in deep meditation.',
      image: BobbyFace,
    },
    {
      text: "As you approach, he opens one eye. 'So... the one who reeks of chalk and protein finally arrives.'",
      image: BobbyFace,
    },
    {
      text: "'I am Bobby. Keeper of stories, seer of truths, and undefeated town chess champion.'",
      image: BobbyFace,
    },
    {
      text: "He gestures for your party to kneel. 'Much has changed, brave ones. Eldoria is breaking.'",
      image: BobbyFace,
    },
    {
      text: "'The Demon King has conquered half the continent. Cities burn. Hope flickers.'",
      image: BobbyFace,
    },
    {
      text: "'Two generals now carry out his will. Brenden, the Necromancer — whose armies do not breathe.'",
      image: BobbyFace,
    },
    {
      text: "'And Wes… the Dark Wizard. Once known as 'The Sage of Solace.' The most powerful sorcerer Eldoria ever knew.'",
      image: BobbyFace,
    },
    {
      text: "Ja'von: 'I've heard legends of Wes. He could bend light, time, and shadow itself.'",
      image: JavonFace,
    },
    {
      text: "Bobby nods solemnly. 'He was corrupted. Twisted by the Demon King. Now he whispers madness into the ears of kings.'",
      image: BobbyFace,
    },
    {
      text: "Ethan: 'Sounds like a wizard with daddy issues.'",
      image: EthanFace,
    },
    {
      text: "Bobby ignores the comment. 'There is a more pressing concern. The forest of EdenGrove has fallen under a dark shadow.'",
      image: BobbyFace,
    },
    {
      text: "'The corruption must be cleansed. Return there. Find its heart. Purge the darkness before it spreads further.'",
      image: BobbyFace,
    },
    {
      text: '**[ Quest Received: Cleanse EdenGrove Forest 🌿 ]**',
      image: DanielFace,
    },
  ],

  stillCorrupted: [
    {
      text: "Bobby greets you with a heavy gaze. 'The forest still suffers.'",
      image: BobbyFace,
    },
    {
      text: "'You carry strength, but action defines purpose. Return only when EdenGrove breathes clean again.'",
      image: BobbyFace,
    },
    {
      text: "'The trees are whispering, and they do not sound hopeful.'",
      image: BobbyFace,
    },
  ],

  edenGroveCompleted: [
    {
      text: "Bobby steps forward, a rare look of hope in his eyes. 'It is done.'",
      image: BobbyFace,
    },
    {
      text: "'The corruption is purged. EdenGrove breathes once more. You have done a great thing... though you still smell like gym socks.'",
      image: BobbyFace,
    },
    {
      text: "'Now, your path leads beyond Bronzebell. Beyond the familiar. Toward the broken edge of Eldoria - Emberfall Ruins. Climb through the Spire Mountains, and you shall arive.'",
      image: BobbyFace,
    },
    {
      text: "He pauses - 'The Spire is no ordinary climb. It is a cursed place - one where the mountains themselves reject the unworthy. Many have tried to cross... few have returned.'",
      image: BobbyFace,
    },
    {
      text: "'Legends speak of a flame that sleeps beneath the peaks. A force so ancient and furious, it melted the bones of those who dared disturb it.'",
      image: BobbyFace,
    },
    {
      text: "'To survive the Spire, you'll need more than just bulging biceps. You'll need heart, grit, and a squad that can actually spot you without dropping the bar.'",
      image: BobbyFace,
    },
    {
      text: "'The world trembles. But perhaps... just perhaps... it trembles in your favor.'",
      image: BobbyFace,
    },
    {
      text: "**[ Quest Received: The Spire's Crucible ]**",
      image: DanielFace,
    },
    {
      text: "He pauses... then speaks with a gravity you haven't heard before.",
      image: BobbyFace,
    },
    {
      text: "'There is one more truth I've held back. A prophecy. As old as the roots of the world.'",
      image: BobbyFace,
    },
    {
      text: "'It tells of a time where Eldoria falls — when darkness consumes light, and gains must be made.'",
      image: BobbyFace,
    },
    {
      text: "He turns towards Danny. 'Then shall rise The One Who Lifts.'",
      image: BobbyFace,
    },
    {
      text: "'He will bring strength where there is weakness, hope where there is doubt, and pecs where there is despair.'",
      image: BobbyFace,
    },
    {
      text: "Danny: 'Wait, that sounds like me! Right guys? Right?'",
      image: DanielFace,
    },
    {
      text: "Ja'von and Ethan glance at each other, slowly shaking their heads.",
      image: JavonFace,
    },
    {
      text: "Bobby smiles. 'Perhaps. Or perhaps the prophecy meant someone a little less sweaty..'",
      image: BobbyFace,
    },
    {
      text: "'Go now. Your journey begins anew. And the fate of Eldoria rests upon your absurdly large shoulders.'",
      image: BobbyFace,
    },
    {
      text: "He returns to meditation. 'May your strength remain... and your squats remain deep.'",
      image: BobbyFace,
    },
  ],

  spireStarted: [
    {
      text: "Bobby greets you with a heavy gaze. 'Eldoria still suffers.'",
      image: BobbyFace,
    },
    {
      text: "'You carry strength, but Eldoria runs out of time. You must move quickly!'",
      image: BobbyFace,
    },
  ],

  spireCompleted: [
    {
      text: "Bobby stands at the edge of the shrine - turned away from the party, as if he felt the Balrog's fall from miles away.",
      image: BobbyFace,
    },
    {
      text: "Danny: 'We bench-pressed a demon made of fire, bro.'",
      image: DanielFace,
    },
    {
      text: "Ethan: 'I nearly died of heatstroke, snowburn, and self-doubt - in that order.'",
      image: EthanFace,
    },
    {
      text: "Ja'von: 'But we endured. The Spire bows to no one... and yet it was still no match for us.'",
      image: JavonFace,
    },
    {
      text: "Bobby turns towards the party, smiling faintly. 'Then the legend is true. You've passed the Crucible. You've proven your strength. It's time.'",
      image: BobbyFace,
    },
    { text: "Danny: 'Umm... time for what, old man?'", image: DanielFace },
    {
      text: "Bobby: 'Time for you to take back the kingdom that burned from within - a ruin left behind by the Demon King himself.'",
      image: BobbyFace,
    },
    {
      text: "Bobby: 'Follow the path. Through ash and ruin. Through memory and mistake. To where your real journey begins'",
      image: BobbyFace,
    },
    {
      text: "Danny: 'Is there at least protein in Emberfall?'",
      image: DanielFace,
    },
    {
      text: "Bobby: 'No, but there will be answers... and pain. A lot of pain.'",
      image: BobbyFace,
    },
    {
      text: "He stands, eyes steady. 'Go now, before the flame awakes again. Your next rep awaits.'",
      image: BobbyFace,
    },
    {
      text: '**[ Quest Received: Explore the Ruins of Emberfall ]**',
      image: DanielFace,
    },
    { text: '**[ New Area Unlocked: Emberfall Ruins ]**', image: DanielFace },
  ],

  emberfallStarted: [
    {
      text: "Bobby: 'The time for you to leave has come. GO. NOW.'",
      image: BobbyFace,
    },
  ],
};

const choices = [{ text: 'Head back', nextScene: '/bronzebell' }];

export default function Shrine() {
  const { party, questFlags, updateQuestFlag, unlockLocation } = useDanny();

  const navigate = useNavigate();
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState('giveQuest');

  const handleNextEvent = () => {
    if (eventIndex < bobbyDialogue[stage].length - 1) {
      setEventIndex((prev) => prev + 1);
    }
  };

  // UseEffect that sets the stage for the interaction with Bobby
  useEffect(() => {
    const ethan = party?.find((member) => member.name === 'Ethan, the Brute');
    const javon = party?.find(
      (member) => member.name === "Ja'von, the Rizzler",
    );
    if (!ethan || !javon) {
      setStage('notReady');
    } else if (questFlags['emberfall'] === 'in-progress') {
      setStage('emberfallStarted');
    } else if (questFlags['spire'] === 'in-progress') {
      setStage('spireStarted');
    } else if (questFlags['spire'] === 'completed') {
      setStage('spireCompleted');
    } else if (questFlags['edenGrove'] === 'in-progress') {
      setStage('stillCorrupted');
    } else if (questFlags['edenGrove'] === 'completed') {
      setStage('edenGroveCompleted');
    }
    // eslint-disable-next-line
  }, []);

  /* Checks for when the giveQuest dialogue is complete
   * Add the Spire location and quest when the edenGroveCompleted dialogue is complete
   * Unlock Emberfall Ruins and start the quest when the Spire quest is completed
   */
  useEffect(() => {
    if (
      stage === 'giveQuest' &&
      eventIndex === bobbyDialogue.giveQuest.length - 1
    ) {
      updateQuestFlag('edenGrove', 'in-progress');
    }

    if (
      stage === 'edenGroveCompleted' &&
      eventIndex === bobbyDialogue.edenGroveCompleted.length - 1
    ) {
      updateQuestFlag('spire', 'in-progress');
      unlockLocation('Spire Mountains');
    }

    if (
      stage === 'spireCompleted' &&
      eventIndex === bobbyDialogue.spireCompleted.length - 1
    ) {
      updateQuestFlag('emberfall', 'in-progress');
      unlockLocation('Emberfall Ruins');
    }
  }, [eventIndex, stage, unlockLocation, updateQuestFlag]);

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
      <TextBox textBox={bobbyDialogue[stage][eventIndex]} />

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
