import React from 'react';
import { motion } from 'framer-motion';

const WaveText = ({ text, style, className }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.5 }
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.h2
      style={{ 
        display: "inline-flex", 
        flexWrap: "wrap",
        overflow: "visible", 
        verticalAlign: 'top',
        letterSpacing: '0.01em',
        ...style 
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          custom={index}
          key={index}
          style={{ 
            display: "inline-block", 
            whiteSpace: "pre",
            willChange: "transform"
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default WaveText;
