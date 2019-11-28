import React from 'react';

import Mark from '../../Mark/Mark';

import classes from './Game.module.scss';

function Game() {
  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Mark marked={false} selected={false} onClick={() => {}} />
        <Mark marked={false} selected={false} onClick={() => {}} />
        <Mark marked={false} selected={false} onClick={() => {}} />
      </div>
    </div>
  );
}

export default Game;
