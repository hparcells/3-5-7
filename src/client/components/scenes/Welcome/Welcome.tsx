import React from 'react';
import { connect } from 'react-redux';
import { Store } from '../../../store';

import Button from '../../Button/Button';

import classes from './Welcome.module.scss';
import { changeScene } from '../../../actions';
import { Scene } from '../../../reducers/game-reducer';

import Title from '../../Title/Title';

function Welcome(
  {
    online,
    changeScene
  }:
  {
    online: number,
    changeScene: (scene: Scene) => void
  }
) {
  function handleLocalClick() {
    changeScene('GAME');
  }
  function handleOnlineClick() {
    changeScene('MULTIPLAYER');
  }

  return (
    <div className={classes.root}>
      <Title />

      <p className={classes.online}>Players Online: {online || 'Fetching...'}</p>

      <div className={classes.restOfPage}>
        <div className={classes.buttonWrapper}>
          <Button onClick={handleLocalClick}>Play Locally</Button>
          <Button onClick={handleOnlineClick}>Play Online</Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  online: state.menu.online
});
const mapDispatchToProps = {
  changeScene
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
