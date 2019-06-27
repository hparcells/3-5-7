import React, { useState, useEffect, useCallback } from 'react';
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
import socket from 'client/socket';

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

function Online({ username }) {
  const classes = useStyles();

  const [game, setGame] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [turnModifiedRow, setTurnModifiedRow] = useState(0);
  const [someoneWon, setSomeoneWon] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(null);

  function handleMarkClick(index) {
    const playerIndex = game.players.findIndex((player) => player === username);
    if(playerIndex !== game.turn) {
      return;
    }

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

    socket.emit('updatedMarks', newGameMarks);

    setCanSubmit(true);
  }
  function handleSubmit() {
    setCanSubmit(false);
    setTurnModifiedRow(0);

    socket.emit('nextTurn');
  }

  useEffect(() => {
    function roomDestroyed() {
      location.reload();
    }
    function updatedGameData(gameData) {
      setGame(gameData);
    }
    function winner(theWinnerIndex) {
      setSomeoneWon(true);
      setWinnerIndex(theWinnerIndex);

      setTimeout(() => {
        location.reload();
      }, 5000);
    }
    
    socket.on('roomDestroyed', roomDestroyed);
    socket.on('updatedGameData', updatedGameData);
    socket.on('winner', winner);

    return () => {
      socket.removeListener('roomDestroyed', roomDestroyed);
      socket.removeListener('updatedGameData', updatedGameData);
      socket.removeListener('winner', winner);
    };
  }, []);

  useEffect(() => {
    socket.emit('requestFirstTimeGameData');
  }, []);

  return game
    && <div className={classes.root}>
      <div className={classes.row} style={{
        marginBottom: '15px'
      }}>
        <Typography variant='h4'>{game.players[game.turn]}'s Turn</Typography>
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
        <DialogTitle>{game.players[winnerIndex]} Won</DialogTitle>
        <DialogContent>
          <DialogContentText>You will be redirected to the homepage in five seconds.</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>;
}

export default hot(Online);
