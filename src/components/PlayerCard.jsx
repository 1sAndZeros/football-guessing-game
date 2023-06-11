import positions from '../data/positions';
import flags from '../data/flags.json';

function PlayerCard({ player, gameOver }) {
  const { logo } = player.statistics[0].team;
  const { age, nationality, photo, name } = player.player;
  const position = positions[player.statistics[0].games.position];

  let flag = {};
  Object.keys(flags).forEach((key) => {
    if (flags[key].name === nationality) {
      flag = flags[key];
    }
  });

  return (
    <div
      className={`player-card flex justify-center align-middle ${
        !gameOver ? 'hidden' : ''
      }`}
    >
      <div className="player mx-14">
        <img className="w-40" src={photo} alt={name} />
        <div className="player-name mt-2">{name}</div>
      </div>
      <img
        className={`absolute ${!gameOver ? 'invisible' : ''} top-2 left-2 w-16`}
        src={logo}
        alt="team-logo"
      />
      <h3
        className={`grid place-items-center absolute ${
          !gameOver ? 'invisible' : ''
        } bottom-2 right-2 bg-slate-600 w-16 h-16 rounded-full`}
      >
        {age}
      </h3>
      <div
        className={`grid place-items-center absolute ${
          !gameOver ? 'invisible' : ''
        } bottom-2 left-2 bg-slate-600 w-16 h-16 rounded-full`}
      >
        <h3 className="">{position}</h3>
      </div>
      <img
        className={`absolute ${
          !gameOver ? 'invisible' : ''
        } top-2 right-2 w-16`}
        src={flag.image}
        alt="flag-img"
      />
    </div>
  );
}

export default PlayerCard;
