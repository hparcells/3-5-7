import syncReducer from 'sync-reducer';
import { error } from 'log-type';

import { MenuActionObject } from '../actions';
import socket from '../socket';

export type GameCreationType = 'HOST_GAME' | 'JOIN_GAME';

export interface MenuState {
  online: number;
  username: string;
  roomCode: string;
  gameCreationType: GameCreationType;
  isWaitingForOpponent: boolean;
  onlineError: string;
  isProcessing: boolean;
}

const initialState: MenuState = {
  online: 0,
  username: '',
  roomCode: '',
  gameCreationType: 'HOST_GAME',
  isWaitingForOpponent: false,
  onlineError: 'NO_ERROR',
  isProcessing: false
};

function menuReducer(state: MenuState = initialState, action: MenuActionObject) {
  if(action.type === 'UPDATE_PLAYER_COUNT') {
    const newState = { ...state };

    newState.online = action.count;

    return newState;
  }
  if(action.type === 'CHANGE_GAME_CREATION_TYPE') {
    const newState = { ...state };

    newState.gameCreationType = action.gameCreationType;

    return newState;
  }
  if(action.type === 'CHANGE_USERNAME') {
    const newState = { ...state };

    // Check if the username is at most 16 characters and doesn't have any funky characters.
    if(action.username.length <= 16 && /^[A-Za-z0-9-_]*$/gm.test(action.username)) {
      newState.username = action.username;

      if(newState.onlineError && newState.username.length >= 3) {
        newState.onlineError = 'NO_ERROR';
      }
    }

    return newState;
  }
  if(action.type === 'CHANGE_ROOM_CODE') {
    const newState = { ...state };

    const newRoomCode = action.roomCode.toUpperCase();

    // Check if the room code is at most four characters and is alphanumeric.
    if(newRoomCode.length <= 4 && /^[A-Z0-9]*$/gm.test(newRoomCode)) {
      newState.roomCode = newRoomCode;

      if(
        (newState.onlineError === 'Room codes must be four characters.' && newState.roomCode.length === 4)
        || newState.onlineError === 'Room does not exist.'
      ) {
        newState.onlineError = 'NO_ERROR';
      }
    }

    return newState;
  }
  if(action.type === 'JOIN_GAME') {
    const newState = { ...state };

    // Check if we are waiting for opponent.
    if(newState.isWaitingForOpponent) {
      error('Cannot join a game when waiting for a opponent. This should never happen.');
      return newState;
    }

    // If the username is less than three characters long.
    if(newState.username.length < 3) {
      newState.onlineError = 'Username must be at least three characters.';

      return newState;
    }

    // If we want to join an existing room.
    if(action.gameCreationType === 'JOIN_GAME') {
      // If the provided room code is less than four characters.
      if(newState.roomCode.length < 4) {
        newState.onlineError = 'Room codes must be four characters.';

        return newState;
      }

      socket.emit('joinRoom', newState.username, newState.roomCode);
      newState.isProcessing = true;
    }
    // If we want to host a new game.
    if(action.gameCreationType === 'HOST_GAME') {
      socket.emit('createRoom', newState.username);
      newState.isProcessing = true;
    }

    return newState;
  }
  if(action.type === 'TRIGGER_ONLINE_ERROR') {
    const newState = { ...state };

    newState.onlineError = action.error;
    newState.isProcessing = false;

    return newState;
  }
  if(action.type === 'MENU_UPDATED_GAME_DATA') {
    const newState = { ...state };

    newState.isWaitingForOpponent = true;

    return newState;
  }
  if(action.type === 'CLEAN_UP_MENU') {
    const newState = { ...state };

    newState.isProcessing = false;
    newState.isWaitingForOpponent = false;
    newState.roomCode = '';

    return newState;
  }
  if(action.type === 'TRANSITION_TO_GAME') {
    const newState = { ...state };

    // Set some values.
    newState.isProcessing = false;
    newState.isWaitingForOpponent = false;

    return newState;
  }

  return state;
}

export default syncReducer(
  menuReducer,
  '357-menu',
  {
    transformFunction: (state: MenuState) => ({
      online: 0,
      username: state.username,
      roomCode: '',
      gameCreationType: state.gameCreationType,
      isWaitingForOpponent: false,
      onlineError: 'NO_ERROR',
      isProcessing: false
    })
  }
);
