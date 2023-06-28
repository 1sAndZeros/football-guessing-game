import positions from '../data/positions';
import flags from '../data/flags.json';

function PlayerCard({ player, gameOver, ref }) {
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
    <div className={`player-card ${!gameOver ? 'hidden' : ''}`}>
      <div className="player" ref={ref}>
        <img src={photo} alt={name} />
        <div className="player-name">{name}</div>
      </div>
      <img
        className={`${!gameOver ? 'invisible' : ''} left-2`}
        src={logo}
        alt="team-logo"
      />
      <img
        className={`${!gameOver ? 'invisible' : ''} right-2`}
        src={flag.image}
        alt={nationality}
      />
      <h3 className={`${!gameOver ? 'invisible' : ''} right-2`}>{age}</h3>
      <h3 className={`${!gameOver ? 'invisible' : ''} left-2`}>{position}</h3>
    </div>
  );
}

export default PlayerCard;
