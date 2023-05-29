function PlayerCard({ player, gameOver }) {
  return (
    <div
      className={`player-card flex justify-center align-middle ${
        !gameOver && 'hidden'
      }`}
    >
      <div className="player">
        <img src={player.player.photo} alt={player.player.name} />
        <div className="player-name">{player.player.name}</div>
      </div>
      <div className="details">
        <h3>{`${player.statistics[0].team.name}`}</h3>
        <h3>{`Age: ${player.player.age}`}</h3>
        <h3>{`${player.player.nationality}`}</h3>
        <h3>{`${player.statistics[0].games.position}`}</h3>
      </div>
    </div>
  );
}

export default PlayerCard;
