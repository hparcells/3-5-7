import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store';

import classes from './WinningOverlay.module.scss';
import clsx from 'clsx';

function WinningOverlay(
  {
    winningIndex
  }:
  {
    winningIndex: number
  }
) {
  return (
    <div
      className={clsx(
        classes.root,
        winningIndex !== null ? classes.active : null
      )}
    >
      <p>aw man</p>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  winningIndex: state.game.gameData.winner
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WinningOverlay);
