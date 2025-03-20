import { useNavigate, useLocation } from 'react-router-dom';

import Choices from '../../Choices/Choices';

import '../../../scss/All.scss';

export default function BattleResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, xp } = location.state || {}; // Getting result and xp from state

  const choices = [
    { text: 'Continue Journey', nextScene: '/campaign-map' },
    {
      text: "Fight again - Your biceps weren't used enough",
      nextScene: '/forest-battle',
    },
  ];

  const mainMenu = [{ text: 'Return to the main menu loser', nextScene: '/' }];

  return (
    <div className='Screen End-Battle-Screen Fade-In'>
      {result === 'win' ? (
        <>
          <h1>Victory!</h1>
          <p>You earned {xp} XP.</p>
          <Choices options={choices} onChoiceSelected={navigate} />
        </>
      ) : (
        <>
          <h1>Defeat...</h1>
          <p>You are so weak! Get back in the gym loser!</p>
          <Choices options={mainMenu} onChoiceSelected={navigate} />
        </>
      )}
    </div>
  );
}
