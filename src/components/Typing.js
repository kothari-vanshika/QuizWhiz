import React from 'react';
import Typical from 'react-typical';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  typingEffect: {
    color: 'white',
    marginTop: '15px',
    // textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
    transition: 'color 0.3s, text-shadow 0.3s',
  }
}));

const TypingEffect = () => {
  const classes = useStyles();

  return (
    <Typical
      steps={['Welcome To QuizWhiz', 1500, '', 1000]}
      loop={Infinity}
      wrapper="h1"
      className={classes.typingEffect} // Apply class name from useStyles
    />
  );
};

export default TypingEffect;
