import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../../../socket';

import {
  changeScene,
  changeGameCreationType,
  changeUsername,
  changeRoomCode,
  joinGame,
  triggerOnlineError
} from '../../../../actions';

import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import TransButton from '../../../TransButton/TransButton';

import { Store } from '../../../../store';
import { Scene } from '../../../../reducers/game-reducer';
import { GameCreationType } from '../../../../reducers/menu-reducer';

import classes from '../MultiplayerBoxContent.module.scss';

function Hub(
  {
    gameCreationType,
    username,
    roomCode,
    onlineError,
    isProcessing,
    changeScene,
    changeUsername,
    changeRoomCode,
    changeGameCreationType,
    joinGame,
    triggerOnlineError
  }:
  {
    gameCreationType: GameCreationType,
    username: string,
    roomCode: string,
    onlineError: string,
    isProcessing: boolean,
    changeScene: (scene: Scene) => void,
    changeUsername: (username: string) => void,
    changeRoomCode: (roomCode: string) => void,
    changeGameCreationType: (gameCreationType: GameCreationType) => void,
    joinGame: (gameCreationType: GameCreationType) => void,
    triggerOnlineError: (error: string) => void
  }
) {
  useEffect(() => {
    function handleServerLoginError(message: string) {
      triggerOnlineError(message);
    }

    socket.on('loginError', handleServerLoginError);

    return () => {
      socket.removeListener('loginError', handleServerLoginError);
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
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div className={classes.multiplayerTitle}>
        <p>Play Online</p>
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          onClick={handleHostClick}
          style={{ marginLeft: '30px', marginRight: '10px' }}
          selected={gameCreationType === 'HOST_GAME'}
          disabled={isProcessing}
        >
            Host Game
          </Button>
        <Button
          onClick={handleJoinClick}
          style={{ marginLeft: '10px', marginRight: '30px' }}
          selected={gameCreationType === 'JOIN_GAME'}
          disabled={isProcessing}
        >
          Join Game
        </Button>
      </div>
      <div className={classes.restOfBox}>
        <TextField
          onChange={handleUsernameChange}
          value={username}
          onBlur={scrollToTop}
        >
          Username
        </TextField>
        {
          gameCreationType === 'JOIN_GAME'
            ? <TextField
                onChange={handleRoomCodeChange}
                value={roomCode || ''}
                onBlur={scrollToTop}
              >
                Room Code
              </TextField>
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
        <TransButton
          onClick={handleBackClick}
          style={{ marginLeft: '30px', marginRight: '10px' }}
          disabled={isProcessing}
        >
          Back
        </TransButton>
        <Button
          onClick={handleGoClick}
          style={{ marginLeft: '10px', marginRight: '30px' }}
          disabled={isProcessing}
        >
          {
            gameCreationType === 'HOST_GAME'
              ? 'Create Room'
              : 'Join Room'
          }
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  gameCreationType: state.menu.gameCreationType,
  username: state.menu.username,
  roomCode: state.menu.roomCode,
  onlineError: state.menu.onlineError,
  isProcessing: state.menu.isProcessing
});
const mapDispatchToProps = {
  changeScene,
  changeUsername,
  changeRoomCode,
  changeGameCreationType,
  joinGame,
  triggerOnlineError
};

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
