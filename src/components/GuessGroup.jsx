import { useEffect } from 'react';
import { motion, animate, stagger } from 'framer-motion';
import Bubble from './Bubble';
import positions from '../data/positions';
import flags from '../data/flags.json';
import useTraceUpdate from '../utils/useTraceUpdate';

function GuessGroup({ guess, footballer }) {
  let flag = '';
  Object.keys(flags).forEach((key) => {
    if (flags[key].name === guess.player.nationality) {
      flag = flags[key].image;
    }
  });

  useTraceUpdate({ guess, footballer });

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
    nationality: {
      name: guess.player.nationality,
      logo: flag,
    },

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
    nationality: {
      name: footballer.player.nationality,
    },
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
      correct: correctStats.nationality.logo,
      guessed: guessedStats.nationality.logo,
      type: 'image',
    },
    position: {
      correct: positions[correctStats.position],
      guessed: positions[guessedStats.position],
      type: 'text',
    },
  };

  return (
    <motion.div className="guess-group">
      {/* {Object.keys(statObj).map((stat, index) => {
        return <Bubble key={index} name={stat} stat={statObj[stat]} />;
      })} */}
      <Bubble
        key={`${guessedStats.id}-player`}
        name="player"
        stat={statObj.photo}
        type="image"
        correct={guessedStats.name === correctStats.name}
      />
      <Bubble
        key={`${guessedStats.id}-team`}
        name="team"
        stat={statObj.team}
        type="image"
        correct={guessedStats.team.name === correctStats.team.name}
      />
      <Bubble
        key={`${guessedStats.id}-age`}
        name="age"
        stat={statObj.age}
        type="number"
        correct={guessedStats.age === correctStats.age}
      />
      <Bubble
        key={`${guessedStats.id}-nationality`}
        name="nationality"
        stat={statObj.nationality}
        type="text"
        correct={
          guessedStats.nationality.name === correctStats.nationality.name
        }
      />
      <Bubble
        key={`${guessedStats.id}-position`}
        name="position"
        stat={statObj.position}
        type="text"
        correct={guessedStats.position === correctStats.position}
      />
    </motion.div>
  );
}

export default GuessGroup;
