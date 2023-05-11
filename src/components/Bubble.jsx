function Bubble({ stat, name }) {
  let answer;
  if (stat.guessed === stat.correct) {
    answer = 'correct';
  } else if (stat.guessed > stat.correct && stat.type === 'number') {
    answer = 'down-arrow';
  } else if (stat.guessed < stat.correct && stat.type === 'number') {
    answer = 'up-arrow';
  } else {
    answer = 'incorrect';
  }

  return (
    <div className={`placeholder avatar icon ${answer} ${name}`}>
      <div className="bg-neutral text-neutral-content rounded-full w-20 m-1">
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
