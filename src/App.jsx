import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Title from './components/Title';
import GuessGroup from './components/GuessGroup';
import SearchBox from './components/SearchBox';
import PlayerCard from './components/PlayerCard';
import useCustomFetch from './utils/useCustomFetch';
// import apiCall from './utils/apiCall';

function App() {
  const [footballer, setFootballer] = useState();
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [players, setPlayers] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [noOfGuesses, setNoOfGuesses] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function fetchPlayers() {
    const url = import.meta.env.VITE_FOOTBALLERS_URL;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (v, i, a) => a.findIndex((v2) => v2.player.id === v.player.id) === i
        );
        filteredData.sort((a, b) => (a.player.name > b.player.name ? 1 : -1));
        setPlayers(filteredData);
      })
      .catch((err) => setError(err));
    setLoading(false);
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  function randomFootballer() {
    const i = getRandomInt(players.length);
    setFootballer(players[i]);
  }

  useEffect(() => {
    randomFootballer();
  }, [players]);

  useEffect(() => {
    if (noOfGuesses >= 6) {
      setGameOver(true);
    }
  }, [noOfGuesses]);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (!loading && footballer && lastGuess === footballer.player.name) {
      console.log(`YOU WON IN ${noOfGuesses} GUESSES`);
      setWon(true);
    } else if (noOfGuesses >= 6) {
      console.log('YOU LOSE!');
    }
  }, [guesses, footballer, noOfGuesses, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setGuess(e.target.elements[0].value);
    const name = e.target.elements[0].value;
    const guessedPlayer = players.find((player) => player.player.name === name);
    if (guessedPlayer.player.name === footballer.player.name) {
      setWon(true);
    }
    setGuesses((prevGuesses) => [...prevGuesses, guessedPlayer]);
    setNoOfGuesses((prev) => {
      return prev + 1;
    });
  };

  function playAgain() {
    setWon(false);
    setGameOver(false);
    setGuesses([]);
    setNoOfGuesses(0);
    setFootballer();
    randomFootballer();
  }

  return (
    <div className="App">
      <Title />
      {!footballer ? (
        <h3>Loading...</h3>
      ) : (
        <PlayerCard gameOver={won || gameOver} player={footballer} />
      )}
      <div className="flex flex-col gap-2 mb-6">
        {guesses.length > 0 &&
          // map guesses and pass info to guess group
          guesses.map((guess, i) => {
            return <GuessGroup key={i} guess={guess} footballer={footballer} />;
          })}
      </div>
      {!won && !gameOver && !loading && (
        <SearchBox players={players} handleSubmit={handleSubmit} />
      )}
      {noOfGuesses >= 6 ? (
        <>
          {won ? (
            <h2 className="won">{`CONGRATS, YOU WON IN ${noOfGuesses} ${
              noOfGuesses > 1 ? 'GUESSES' : 'GUESS'
            }`}</h2>
          ) : (
            <h2 className="lost">SORRY, YOU LOST</h2>
          )}
          <button type="button" className="btn" onClick={playAgain}>
            Play Again
          </button>
        </>
      ) : (
        <h3 className="guess-number">{`Guesses: ${noOfGuesses}`}</h3>
      )}
    </div>
  );
}

export default App;
