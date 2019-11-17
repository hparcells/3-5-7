import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import { changeScene, changeGameCreationType, changeUsername, changeRoomCode } from '../../../actions';
import { Scene } from '../../../reducers/game-reducer';

import Title from '../../Title/Title';
import Button from '../../Button/Button';
import TransButton from '../../TransButton/TransButton';
import TextField from '../../TextField/TextField';

import classes from './Multiplayer.module.scss';
import { GameCreationType } from '../../../reducers/menu-reducer';

function Multiplayer(
  {
    gameCreationType,
    username,
    roomCode,
    changeScene,
    changeUsername,
    changeRoomCode,
    changeGameCreationType
  }:
  {
    gameCreationType: GameCreationType,
    username: string,
    roomCode: string,
    changeScene: (scene: Scene) => void,
    changeUsername: (username: string) => void,
    changeRoomCode: (roomCode: string) => void,
    changeGameCreationType: (gameCreationType: GameCreationType) => void
  }
) {
  function handleHostClick() {
    changeGameCreationType('HOST_GAME');
  }
  function handleJoinClick() {
    changeGameCreationType('JOIN_GAME');
  }
  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    changeUsername(event.target.value);
  }
  function handleRoomCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    changeRoomCode(event.target.value);
  }
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
            <TextField onChange={handleUsernameChange} value={username}>Username</TextField>
            {
              gameCreationType === 'JOIN_GAME'
                ? <TextField onChange={handleRoomCodeChange} value={roomCode}>Room Code</TextField>
                : null
            }
          </div>
          <div className={classes.buttonWrapper}>
            <TransButton onClick={handleBackClick} style={{ marginLeft: '30px', marginRight: '10px' }}>Back</TransButton>
            <Button
              onClick={handleBackClick}
              style={{ marginLeft: '10px', marginRight: '30px' }}
            >
              {
                gameCreationType === 'HOST_GAME'
                  ? 'Create Room'
                  : 'Join Room'
              }
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  gameCreationType: state.menu.gameCreationType,
  username: state.menu.username,
  roomCode: state.menu.roomCode
});
const mapDispatchToProps = {
  changeScene,
  changeUsername,
  changeRoomCode,
  changeGameCreationType
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
