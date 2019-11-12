import React from 'react';
import { connect } from 'react-redux';

import { changeScene } from '../../../actions';
import { Scene } from '../../../reducers/game-reducer';

import Title from '../../Title/Title';
import Button from '../../Button/Button';
import TransButton from '../../TransButton/TransButton';

import classes from './Multiplayer.module.scss';

function Multiplayer(
  {
    changeScene
  }:
  {
    changeScene: (scene: Scene) => void
  }
) {
  function handleBackClick() {
    changeScene('WELCOME');
  }

  return (
    <div className={classes.root}>
      <Title style={{ marginBottom: '0px' }} />

      <div className={classes.restOfPage}>
        <div className={classes.multiplayerBox}>
          <div className={classes.multiplayerTitle}>
            <p>Play Online</p>
          </div>
          <div className={classes.restOfBox}>
            AW MAN
          </div>
          <div className={classes.buttonWrapper}>
            <TransButton onClick={handleBackClick} style={{ marginLeft: '30px', marginRight: '10px' }}>Back</TransButton>
            <Button onClick={handleBackClick} style={{ marginLeft: '10px', marginRight: '30px' }}>Join Room</Button>
          </div>
        </div>
      </div>

    </div>
  );
}

const mapDispatchToProps = {
  changeScene
};

export default connect(null, mapDispatchToProps)(Multiplayer);
