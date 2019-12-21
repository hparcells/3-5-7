import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Store } from '../../store';
import { resetGame, prepareLocalGame, handleMultiplayerRematch } from '../../actions';

import classes from './WinningOverlay.module.scss';
import Button from '../Button/Button';

function WinningOverlay(
  {
    players,
    winningIndex,
    roomCode,
    rematchVotes,
    username,
    resetGame,
    prepareLocalGame,
    handleMultiplayerRematch
  }:
  {
    players: string[],
    winningIndex: number,
    roomCode: string,
    rematchVotes: string[],
    username: string,
    resetGame: () => void,
    prepareLocalGame: () => void,
    handleMultiplayerRematch: () => void
  }
) {
  function handleRematchClick() {
    // If we are in a local game.
    if(roomCode === 'LOCAL') {
      prepareLocalGame();
      return;
    }

    // If we are not in a local game.
    handleMultiplayerRematch();
  }
  return (
    <div
      className={clsx(
        classes.root,
        winningIndex !== null ? classes.active : null
      )}
    >
      <p className={classes.winningText}>{players[winningIndex]} Wins</p>

      {/* TODO: Fix whatever this garbage is. */}
      <Button
        style={{ width: '220px', marginTop: '93px' }}
        onClick={handleRematchClick}
        disabled={rematchVotes.includes(username)}
      >
        {`Rematch (Votes: ${rematchVotes.length})`}
      </Button>
      <Button
        style={{ width: '220px', marginTop: '17px' }}
        onClick={resetGame}
      >
        Exit
      </Button>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  players: state.game.gameData.players,
  winningIndex: state.game.gameData.winner,
  roomCode: state.game.gameData.roomCode,
  rematchVotes: state.game.gameData.rematchVotes,
  username: state.menu.username
});
const mapDispatchToProps = {
  resetGame,
  prepareLocalGame,
  handleMultiplayerRematch
};

export default connect(mapStateToProps, mapDispatchToProps)(WinningOverlay);
