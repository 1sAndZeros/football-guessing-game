import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import Title from './components/Title';
import GuessGroup from './components/GuessGroup';
import SearchBox from './components/SearchBox';
import PlayerCard from './components/PlayerCard';
import premPlayers from './data/players';

function App() {
  const [footballer, setFootballer] = useState();
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(premPlayers);
  const [guesses, setGuesses] = useState([]);
  const [noOfGuesses, setNoOfGuesses] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [actualValue, setActualValue] = useState(null);
  const maxGuesses = 8;
  const playerCard = useRef();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // function fetchPlayers() {
  //   const url = import.meta.env.VITE_FOOTBALLERS_URL;
  //   setLoading(true);
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredData = data.filter(
  //         (v, i, a) => a.findIndex((v2) => v2.player.id === v.player.id) === i
  //       );
  //       filteredData.sort((a, b) => (a.player.name > b.player.name ? 1 : -1));
  //       setPlayers(filteredData);
  //     })
  //     .catch((err) => console.log(err));
  //   setLoading(false);
  // }

  useEffect(() => {
    // fetchPlayers();
    const filteredData = players.filter(
      (v, i, a) => a.findIndex((v2) => v2.player.id === v.player.id) === i
    );
    filteredData.sort((a, b) =>
      a.statistics[0].team.name > b.statistics[0].team.name ? 1 : -1
    );
    setPlayers(filteredData);
    setLoading(false);
  }, []);

  const randomFootballer = useCallback(() => {
    const i = getRandomInt(players.length);

    setFootballer(players[i]);
  }, [players]);

  useEffect(() => {
    randomFootballer();
  }, [players, randomFootballer]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [gameOver]);

  useEffect(() => {
    try {
      const apps = footballer.statistics[0].games.appearences;
      if (apps <= 10) {
        randomFootballer();
      }
    } catch {
      console.log('Loading...');
    }
  }, [footballer]);

  useEffect(() => {
    setInputValue('');
    if (noOfGuesses >= maxGuesses) {
      setGameOver(true);
    }
  }, [noOfGuesses]);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (!loading && footballer && lastGuess === footballer.player.name) {
      setWon(true);
    } else if (noOfGuesses >= maxGuesses) {
      setGameOver(true);
    }
  }, [guesses, footballer, noOfGuesses, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    setInputValue('');
    setActualValue(null);
    const guessedPlayer = players.find((player) => player.player.name === name);
    setPlayers((prev) => {
      const index = prev.indexOf(guessedPlayer);
      prev.splice(index, 1);
      return prev;
    });
    if (guessedPlayer.player.name === footballer.player.name) {
      setWon(true);
      setGameOver(true);
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
    setPlayers(premPlayers);
    setFootballer();
    randomFootballer();
  }

  return (
    <div className="App">
      <Title />
      {!footballer ? (
        <h3>Loading...</h3>
      ) : (
        <PlayerCard
          ref={playerCard}
          gameOver={won || gameOver}
          player={footballer}
        />
      )}
      <div className="flex flex-col gap-2 mb-6">
        {guesses.length > 0 &&
          // map guesses and pass info to guess group
          guesses.map((guess, i) => {
            return <GuessGroup key={i} guess={guess} footballer={footballer} />;
          })}
      </div>
      {!gameOver && !loading && (
        <SearchBox
          inputValue={inputValue}
          setInputValue={setInputValue}
          actualValue={actualValue}
          setActualValue={setActualValue}
          players={players}
          handleSubmit={handleSubmit}
          noOfGuesses={noOfGuesses}
          maxGuesses={maxGuesses}
        />
      )}
      {won && (
        <h2 className="won">{`CONGRATS, YOU WON IN ${noOfGuesses} ${
          noOfGuesses > 1 ? 'GUESSES' : 'GUESS'
        }`}</h2>
      )}
      {gameOver && !won && <h2 className="lost">SORRY, YOU LOST</h2>}
      {gameOver && (
        <button type="button" className="btn" onClick={playAgain}>
          Play Again
        </button>
      )}
      <p>
        <a
          target="_blank"
          href="https://icons8.com/icon/hNYQ5vbTYIrD/soccer"
          rel="noreferrer"
        >
          Soccer
        </a>{' '}
        icon by{' '}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </p>
    </div>
  );
}

export default App;
