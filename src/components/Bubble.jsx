function Bubble({ stat, name, type, correct }) {
  let answer;
  if (correct) {
    answer = 'correct';
  } else if (stat.guessed > stat.correct && type === 'number') {
    answer = 'down-arrow';
  } else if (stat.guessed < stat.correct && type === 'number') {
    answer = 'up-arrow';
  } else {
    answer = 'incorrect';
  }

  return (
    <div
      className={`placeholder avatar icon ${
        correct ? 'correct' : ''
      } ${answer} ${name}`}
    >
      <div className="bubble text-neutral-content rounded-full w-20 m-1">
        {stat.type === 'image' ? (
          <img className="w-5" alt={stat.guessed} src={stat.guessed} />
        ) : (
          <span className="text-1xl">{stat.guessed}</span>
        )}
      </div>
    </div>
  );
}

export default Bubble;
