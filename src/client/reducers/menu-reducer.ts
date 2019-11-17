import syncReducer from 'sync-reducer';

import { MenuActionObject } from '../actions';

export type GameCreationType = 'HOST_GAME' | 'JOIN_GAME';

export interface MenuState {
  online: number;
  username: string;
  roomCode: string;
  gameCreationType: GameCreationType;
}

const initialState: MenuState = {
  online: 0,
  username: '',
  roomCode: '',
  gameCreationType: 'HOST_GAME'
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

    if(/^[A-Za-z0-9-_]*$/gm.test(action.username)) {
      newState.username = action.username;
    }

    return newState;
  }
  if(action.type === 'CHANGE_ROOM_CODE') {
    const newState = { ...state };

    const newRoomCode = action.roomCode.toUpperCase();

    if(newRoomCode.length <= 4 && /^[A-Z0-9]*$/gm.test(newRoomCode)) {
      newState.roomCode = newRoomCode;
    }

    return newState;
  }

  return state;
}

export default syncReducer(menuReducer, '357-menu', { ignore: ['online', 'roomCode'] });
