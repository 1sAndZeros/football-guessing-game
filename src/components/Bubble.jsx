import { motion } from 'framer-motion';

function Bubble(props) {
  const { stat, name, type, correct, delay } = props;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: [0, 1.5, 1],
      }}
      transition={{ duration: 1, delay }}
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
    </motion.div>
  );
}

export default Bubble;
