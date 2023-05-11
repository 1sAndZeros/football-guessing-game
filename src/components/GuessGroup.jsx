import Bubble from './Bubble';

function GuessGroup({ guess, footballer }) {
 
  const guessedStats = {
    name: guess.player.name,
    photo: guess.player.photo,
    team: guess.statistics[0].team.logo,
    league: guess.statistics[0].league.logo,
    age: guess.player.age,
    nationality: guess.player.nationality,
    position: guess.statistics[0].games.position,
  };

  const correctStats = {
    name: footballer.player.name,
    photo: footballer.player.photo,
    team: footballer.statistics[0].team.logo,
    league: footballer.statistics[0].league.logo,
    age: footballer.player.age,
    nationality: footballer.player.nationality,
    position: footballer.statistics[0].games.position,
  };

  const statObj = {
    photo: {
      correct: correctStats.photo,
      guessed: guessedStats.photo,
      type: 'image',
    },
    team: {
      correct: correctStats.team,
      guessed: guessedStats.team,
      type: 'image',
    },
    league: {
      correct: correctStats.league,
      guessed: guessedStats.league,
      type: 'image',
    },
    age: {
      correct: correctStats.age,
      guessed: guessedStats.age,
      type: 'number',
    },
    nationality: {
      correct: correctStats.nationality,
      guessed: guessedStats.nationality,
      type: 'text',
    },
    position: {
      correct: correctStats.position,
      guessed: guessedStats.position,
      type: 'text',
    },
  };

  return (
    <div className="guess-group">
      {Object.keys(statObj).map((stat, index) => {
        return <Bubble key={index} name={stat} stat={statObj[stat]} />;
      })}
    </div>
  );
}

export default GuessGroup;
