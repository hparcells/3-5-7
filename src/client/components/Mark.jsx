import React from 'react';
import { hot } from 'react-hot-loader/root';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mark: {
    width: '40px',
    height: '110px',
    background: 'green',
    display: 'inline-block',
    borderRadius: '6px',
    marginLeft: '2px',
    marginRight: '2px'
  },
  markedMark: {
    width: '40px',
    height: '110px',
    background: 'red',
    display: 'inline-block',
    borderRadius: '6px',
    marginLeft: '2px',
    marginRight: '2px'
  }
}));

function Mark({ onClick, marked }) {
  const classes = useStyles();

  return <div className={
    marked
      ? classes.markedMark
      : classes.mark
  } onClick={onClick}></div>;
}

export default hot(Mark);
