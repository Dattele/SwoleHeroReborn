import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDanny } from '../../../../../Context/DannyContext';
import TextBox from '../../../../TextBox';
import Choices from '../../../../Choices';

import shrine from '../../../../../assets/images/Shrine.png';

import './Shrine.scss';
import '../../../../../scss/All.scss';

export default function Shrine() {
  const { party, questFlags, updateQuestFlag, unlockLocation } = useDanny();

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
      '**[ Quest Received: Cleanse EdenGrove Forest 🌿 ]**',
    ],

    stillCorrupted: [
      "Bobby greets you with a heavy gaze. 'The forest still suffers.'",
      "'You carry strength, but action defines purpose. Return only when EdenGrove breathes clean again.'",
      "'The trees are whispering, and they do not sound hopeful.'",
    ],

    edenGroveCompleted: [
      "Bobby steps forward, a rare look of hope in his eyes. 'It is done.'",
      "'The corruption is purged. EdenGrove breathes once more. You have done a great thing... though you still smell like gym socks.'",
      "'Now, your path leads beyond Bronzebell. Beyond the familiar. Toward the broken edge of Eldoria - Emberfall Ruins. Climb through the Spire Mountains, and you shall arive.'",
      "He pauses - 'The Spire is no ordinary climb. It is a cursed place - one where the mountains themselves reject the unworthy. Many have tried to cross... few have returned.'",
      "'Legends speak of a flame that sleeps beneath the peaks. A force so ancient and furious, it melted the bones of those who dared disturb it.'",
      "'To survive the Spire, you'll need more than just bulging biceps. You'll need heart, grit, and a squad that can actually spot you without dropping the bar.'",
      "'The world trembles. But perhaps... just perhaps... it trembles in your favor.'",
      "**[ Quest Received: The Spire's Crucible ]**",
      "He pauses... then speaks with a gravity you haven't heard before.",
      "'There is one more truth I've held back. A prophecy. As old as the roots of the world.'",
      "'It tells of a time where Eldoria falls — when darkness consumes light, and gains must be made.'",
      "He turns towards Danny. 'Then shall rise The One Who Lifts.'",
      "'He will bring strength where there is weakness, hope where there is doubt, and pecs where there is despair.'",
      "Danny: 'Wait, that sounds like me! Right guys? Right?'",
      "Ja'von and Ethan glance at each other, slowly shaking their heads.",
      "Bobby smiles. 'Perhaps. Or perhaps the prophecy meant someone a little less sweaty..'",
      "'Go now. Your journey begins anew. And the fate of Eldoria rests upon your absurdly large shoulders.'",
      "He returns to meditation. 'May your strength remain... and your squats remain deep.'",
    ],

    spireStarted: [
      "Bobby greets you with a heavy gaze. 'Eldoria still suffers.'",
      "'You carry strength, but Eldoria runs out of time. You must move quickly!'",
    ],

    spireCompleted: [
      "Bobby stands at the edge of the shrine - turned away from the party, as if he felt the Balrog's fall from miles away.",
      "Danny: 'We bench-pressed a demon made of fire, bro.'",
      "Ethan: 'I nearly died of heatstroke, snowburn, and self-doubt - in that order.'",
      "Ja'von: 'But we endured. The Spire bows to no one... and yet it was still no match for us.'",
      "Bobby turns towards the party, smiling faintly. 'Then the legend is true. You've passed the Crucible. You've proven your strength. It's time.'",
      "Danny: 'Umm... time for what, old man?'",
      "Bobby: 'Time for you to take back the kingdom that burned from within - a ruin left behind by the Demon King himself.'",
      "Bobby: 'Follow the path. Through ash and ruin. Through memory and mistake. To where your real journey begins'",
      "Danny: 'Is there at least protein in Emberfall?'",
      "Bobby: 'No, but there will be answers... and pain. A lot of pain.'",
      "He stands, eyes steady. 'Go now, before the flame awakes again. Your next rep awaits.'",
      "**[ New Area Unlocked: Emberfall Ruins ]**",
      '**[ Quest Received: Explore the Ruins of Emberfall ]**',
    ],

    emberfallStarted: [
      "Bobby: 'The time for you to leave has arrived. GO. NOW.'",
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
    } else if (questFlags['emberfall'] === 'in-progress') {
      setStage('emberfallStarted');
    } else if (questFlags['spire'] === 'in-progress') {
      setStage('spireStarted');
    } else if (questFlags['spire'] === 'completed') {
      setStage('spireCompleted');
    }else if (questFlags['edenGrove'] === 'in-progress') {
      setStage('stillCorrupted');
    } else if (questFlags['edenGrove'] === 'completed') {
      setStage('edenGroveCompleted');
    } 
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
