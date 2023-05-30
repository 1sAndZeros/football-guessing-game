import Bubble from './Bubble';
import positions from '../data/positions';

function GuessGroup({ guess, footballer }) {
  const guessedStats = {
    id: guess.player.id,
    name: guess.player.name,
    photo: guess.player.photo,
    team: {
      name: guess.statistics[0].team.name,
      logo: guess.statistics[0].team.logo,
    },
    league: {
      name: guess.statistics[0].league.name,
      logo: guess.statistics[0].league.logo,
    },
    age: guess.player.age,
    nationality: guess.player.nationality,
    position: guess.statistics[0].games.position,
  };

  const correctStats = {
    id: footballer.player.id,
    name: footballer.player.name,
    photo: footballer.player.photo,
    team: {
      name: footballer.statistics[0].team.name,
      logo: footballer.statistics[0].team.logo,
    },
    league: {
      name: footballer.statistics[0].league.name,
      logo: footballer.statistics[0].league.logo,
    },
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
      correct: correctStats.team.logo,
      guessed: guessedStats.team.logo,
      type: 'image',
    },
    league: {
      correct: correctStats.league.logo,
      guessed: guessedStats.league.logo,
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
      correct: positions[correctStats.position],
      guessed: positions[guessedStats.position],
      type: 'text',
    },
  };

  return (
    <div className="guess-group">
      {/* {Object.keys(statObj).map((stat, index) => {
        return <Bubble key={index} name={stat} stat={statObj[stat]} />;
      })} */}
      <Bubble
        key={guessedStats.id}
        name="player"
        stat={statObj.photo}
        type="image"
        correct={guessedStats.name === correctStats.name}
      />
      <Bubble
        key="Team"
        name="team"
        stat={statObj.team}
        type="image"
        correct={guessedStats.team.name === correctStats.team.name}
      />
      {/* <Bubble
        key="League"
        name="league"
        stat={statObj.league}
        type="image"
        correct={guessedStats.league.name === correctStats.league.name}
      /> */}
      <Bubble
        key="Age"
        name="age"
        stat={statObj.age}
        type="number"
        correct={guessedStats.age === correctStats.age}
      />
      <Bubble
        key="Nationality"
        name="nationality"
        stat={statObj.nationality}
        type="text"
        correct={guessedStats.nationality === correctStats.nationality}
      />
      <Bubble
        key="Position"
        name="position"
        stat={statObj.position}
        type="text"
        correct={guessedStats.position === correctStats.position}
      />
    </div>
  );
}

export default GuessGroup;
