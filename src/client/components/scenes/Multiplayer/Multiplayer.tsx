import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import { changeScene, changeGameCreationType, changeUsername, changeRoomCode, joinGame } from '../../../actions';
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
    onlineError,
    changeScene,
    changeUsername,
    changeRoomCode,
    changeGameCreationType,
    joinGame
  }:
  {
    gameCreationType: GameCreationType,
    username: string,
    roomCode: string,
    onlineError: string,
    changeScene: (scene: Scene) => void,
    changeUsername: (username: string) => void,
    changeRoomCode: (roomCode: string) => void,
    changeGameCreationType: (gameCreationType: GameCreationType) => void,
    joinGame: (gameCreationType: GameCreationType) => void
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
  function handleGoClick() {
    joinGame(gameCreationType);
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
                ? <TextField onChange={handleRoomCodeChange} value={roomCode || ''}>Room Code</TextField>
                : null
            }
            <p
              style={{
                color: 'red',
                textAlign: 'center',
                opacity: (onlineError === 'Room codes must be four characters.' && gameCreationType === 'JOIN_GAME')
                  ? '1'
                  : onlineError === 'Username must be at least three characters.'
                    ? '1'
                    : '0'
              }}
            >
              {onlineError || 'yes'}
            </p>
          </div>
          <div className={classes.buttonWrapper}>
            <TransButton onClick={handleBackClick} style={{ marginLeft: '30px', marginRight: '10px' }}>Back</TransButton>
            <Button
              onClick={handleGoClick}
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
  roomCode: state.menu.roomCode,
  onlineError: state.menu.onlineError
});
const mapDispatchToProps = {
  changeScene,
  changeUsername,
  changeRoomCode,
  changeGameCreationType,
  joinGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
