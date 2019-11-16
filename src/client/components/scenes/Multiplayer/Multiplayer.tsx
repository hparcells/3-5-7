import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import { changeScene, changeGameCreationType } from '../../../actions';
import { Scene, GameCreationType } from '../../../reducers/game-reducer';

import Title from '../../Title/Title';
import Button from '../../Button/Button';
import TransButton from '../../TransButton/TransButton';
import TextField from '../../TextField/TextField';

import classes from './Multiplayer.module.scss';

function Multiplayer(
  {
    gameCreationType,
    changeScene,
    changeGameCreationType
  }:
  {
    gameCreationType: GameCreationType
    changeScene: (scene: Scene) => void,
    changeGameCreationType: (gameCreationType: GameCreationType) => void
  }
) {
  function handleBackClick() {
    changeScene('WELCOME');
  }
  function handleHostClick() {
    changeGameCreationType('HOST_GAME');
  }
  function handleJoinClick() {
    changeGameCreationType('JOIN_GAME');
  }

  return (
    <div className={classes.root}>
      <Title style={{ marginBottom: '0px' }} />

      <div className={classes.restOfPage}>
        <div className={classes.multiplayerBox}>
          <div className={classes.multiplayerTitle}>
            <p>Play Online</p>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              onClick={handleHostClick}
              style={{ marginLeft: '30px', marginRight: '10px' }}
              selected={gameCreationType === 'HOST_GAME'}
            >
                Host Game
              </Button>
            <Button
              onClick={handleJoinClick}
              style={{ marginLeft: '10px', marginRight: '30px' }}
              selected={gameCreationType === 'JOIN_GAME'}
            >
              Join Game
            </Button>
          </div>
          <div className={classes.restOfBox}>
            <TextField>Username</TextField>
            {
              gameCreationType === 'JOIN_GAME'
                ? <TextField>Room Code</TextField>
                : null
            }
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

const mapStateToProps = (state: Store) => ({
  gameCreationType: state.game.gameCreationType
});
const mapDispatchToProps = {
  changeScene,
  changeGameCreationType
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
