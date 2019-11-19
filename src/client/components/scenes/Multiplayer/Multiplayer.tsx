import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import {
  changeScene,
  changeGameCreationType,
  changeUsername,
  changeRoomCode,
  joinGame,
  triggerOnlineError,
  setInitialRoomData
} from '../../../actions';

import socket from '../../../socket';

import Title from '../../Title/Title';
import Button from '../../Button/Button';
import TransButton from '../../TransButton/TransButton';
import TextField from '../../TextField/TextField';

import { GameCreationType } from '../../../reducers/menu-reducer';
import { Scene } from '../../../reducers/game-reducer';
import { Room } from '../../../../shared/types';

import classes from './Multiplayer.module.scss';

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
    joinGame,
    triggerOnlineError,
    setInitialRoomData
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
    joinGame: (gameCreationType: GameCreationType) => void,
    triggerOnlineError: (error: string) => void,
    setInitialRoomData: (roomData: Room) => void
  }
) {
  useEffect(() => {
    function handleServerLoginError(message: string) {
      triggerOnlineError(message);
    }
    function handleInitialRoomData(roomData: Room) {
      setInitialRoomData(roomData);
    }

    socket.on('loginError', handleServerLoginError);
    socket.on('getInitalRoomData', handleInitialRoomData);

    return () => {
      socket.removeListener('loginError', handleServerLoginError);
      socket.removeListener('getInitialRoomData', handleInitialRoomData);
    };
  }, []);

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
                // Dont talk about it.
                opacity: onlineError === 'NO_ERROR'
                  ? '0'
                  : gameCreationType === 'HOST_GAME' && onlineError.toLowerCase().includes('room')
                    ? '0'
                    : '1'
              }}
            >
              {onlineError || 'NO_ERROR'}
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
  joinGame,
  triggerOnlineError,
  setInitialRoomData
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
