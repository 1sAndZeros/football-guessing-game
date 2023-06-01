import { motion, stagger, animate } from 'framer-motion';
import { useEffect } from 'react';

function Bubble({ stat, name, type, correct }) {
  useEffect(() => {
    animate(
      '.avatar',
      {
        opacity: 1,
        scale: [0, 1.5, 1],
        transition: {
          staggerChildren: 0.5,
        },
      },
      { delay: stagger(0.2) }
    );
  }, []);

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
      className={`placeholder avatar icon ${
        correct ? 'correct' : ''
      } ${answer} ${name}`}
      // initial={{ opacity: 0 }}
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
