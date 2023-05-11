import { useEffect, useState } from 'react';
import './App.css';
import Title from './components/Title';
import GuessGroup from './components/GuessGroup';
import SearchBox from './components/SearchBox';
import PlayerCard from './components/PlayerCard';

function App() {
  const [footballer, setFootballer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [noOfGuesses, setNoOfGuesses] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3004/response')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        const i = getRandomInt(data.length);
        setFootballer(data[i]);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (footballer && lastGuess === footballer.player.name) {
      console.log(`YOU WON IN ${noOfGuesses} GUESSES`);
    } else if (noOfGuesses >= 6) {
      console.log('YOU LOSE!');
    }
  }, [guesses, footballer, noOfGuesses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setGuess(e.target.elements[0].value);
    const name = e.target.elements[0].value;
    const guessedPlayer = players.find((player) => player.player.name === name);
    setGuesses((prevGuesses) => [...prevGuesses, guessedPlayer]);
    setNoOfGuesses((prev) => {
      return prev + 1;
    });
  };

  return (
    <div className="App">
      <Title />
      {!loading ? <PlayerCard player={footballer} /> : <h3>Loading...</h3>}
      <div className="flex flex-col gap-4 mb-6">
        {guesses.length > 0 &&
          // map guesses and pass info to guess group
          guesses.map((guess, i) => {
            return <GuessGroup key={i} guess={guess} footballer={footballer} />;
          })}
      </div>
      <SearchBox players={players} handleSubmit={handleSubmit} />
      <h3 className="guess-number">{`Guesses: ${noOfGuesses}`}</h3>
    </div>
  );
}

export default App;
