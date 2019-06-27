import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { makeStyles } from '@material-ui/core/styles';
import { numberIsOrBetweeen } from 'utils/number-utils';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import Mark from './Mark';

const SlideUpTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em'
  },
  row: {
    width: 'max-content',
    margin: 'auto'
  }
}));

function Local() {
  const classes = useStyles();

  const [game, setGame] = useState({
    marks: Array(15).fill(false),
    turn: 0
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [turnModifiedRow, setTurnModifiedRow] = useState(0);
  const [someoneWon, setSomeoneWon] = useState(false);

  function handleMarkClick(index) {
    let rowModified;
    let firsTurnModifiedRow;

    // If the user has not clicked any marks before.
    if(turnModifiedRow === 0) {
      if(numberIsOrBetweeen(index + 1, 1, 3)) {
        setTurnModifiedRow(1);
        firsTurnModifiedRow = 1;
      }
      if(numberIsOrBetweeen(index + 1, 4, 8)) {
        setTurnModifiedRow(2);
        firsTurnModifiedRow = 2;
      }
      if(numberIsOrBetweeen(index + 1, 9, 15)) {
        setTurnModifiedRow(3);
        firsTurnModifiedRow = 3;
      }
    }

    if(numberIsOrBetweeen(index + 1, 1, 3)) {
      rowModified = 1;
    }
    if(numberIsOrBetweeen(index + 1, 4, 8)) {
      rowModified = 2;
    }
    if(numberIsOrBetweeen(index + 1, 9, 15)) {
      rowModified = 3;
    }

    if(game.marks[index] || rowModified !== firsTurnModifiedRow && rowModified !== turnModifiedRow) {
      return;
    }

    const newGameMarks = game.marks.concat();

    newGameMarks[index] = true;
    setGame({
      ...game,
      marks: newGameMarks
    });

    setCanSubmit(true);
  }
  function handleSubmit() {
    setCanSubmit(false);
    setTurnModifiedRow(0);

    let newTurn = game.turn;

    if(game.turn === 0) {
      newTurn++;
    }else {
      newTurn--;
    }

    setGame({
      ...game,
      turn: newTurn
    });
  }

  useEffect(() => {
    if(!game.marks.includes(false)) {
      setSomeoneWon(true);

      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  }, [ game ]);

  return (
    <div className={classes.root}>
      <div className={classes.row} style={{
        marginBottom: '15px'
      }}>
        <Typography variant='h4'>Player {game.turn + 1}'s Turn</Typography>
      </div>
      <div className={classes.row}>
        {
          game.marks.map((mark, index) => {
            if(numberIsOrBetweeen(index + 1, 1, 3)) {
              return <Mark key={index} onClick={() => handleMarkClick(index)} marked={game.marks[index]} />;
            }
          })
        }
      </div>
      <div className={classes.row}>
        {
          game.marks.map((mark, index) => {
            if(numberIsOrBetweeen(index + 1, 4, 8)) {
              return <Mark key={index} onClick={() => handleMarkClick(index)} marked={game.marks[index]} />;
            }
          })
        }
      </div>
      <div className={classes.row}>
        {
          game.marks.map((mark, index) => {
            if(numberIsOrBetweeen(index + 1, 9, 15)) {
              return <Mark key={index} onClick={() => handleMarkClick(index)} marked={game.marks[index]} />;
            }
          })
        }
      </div>
      <div className={classes.row} style={{ marginTop: '10px' }}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          End Turn
        </Button>
      </div>

      <Dialog open={someoneWon} TransitionComponent={SlideUpTransition}>
        <DialogTitle>{
          game.turn === 0
            ? 'Player 2 Won'
            : 'Player 1 Won'
        }</DialogTitle>
        <DialogContent>
          <DialogContentText>You will be redirected to the homepage in five seconds.</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default hot(Local);
