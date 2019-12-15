import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Store } from '../../store';
import { resetGame, prepareLocalGame } from '../../actions';

import classes from './WinningOverlay.module.scss';
import Button from '../Button/Button';

function WinningOverlay(
  {
    players,
    winningIndex,
    resetGame,
    prepareLocalGame
  }:
  {
    players: string[],
    winningIndex: number,
    resetGame: () => void,
    prepareLocalGame: () => void
  }
) {
  return (
    <div
      className={clsx(
        classes.root,
        winningIndex !== null ? classes.active : null
      )}
    >
      <p className={classes.winningText}>{players[winningIndex]} Wins</p>

      <Button
        style={{ width: '180px', marginTop: '93px' }}
        onClick={prepareLocalGame}
      >
        Rematch
      </Button>
      <Button
        style={{ width: '180px', marginTop: '17px' }}
        onClick={resetGame}
      >
        Exit
      </Button>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  players: state.game.gameData.players,
  winningIndex: state.game.gameData.winner
});
const mapDispatchToProps = {
  resetGame,
  prepareLocalGame
};

export default connect(mapStateToProps, mapDispatchToProps)(WinningOverlay);
