import { GameActionObject } from '../actions';

import socket from '../socket';

import { Game } from '../../shared/types';

export type Scene = 'WELCOME' | 'MULTIPLAYER' | 'GAME';

export interface GameState {
  scene: Scene;
  gameData: Game;
}

const initialState: GameState = {
  scene: 'WELCOME',
  gameData: null as any
};

export default function(state: GameState = initialState, action: GameActionObject) {
  if(action.type === 'CHANGE_SCENE') {
    const newState = { ...state };

    newState.scene = action.scene;

    return newState;
  }
  if(action.type === 'SET_INTIAL_ROOM_DATA') {
    const newState = { ...state };

    newState.gameData = action.gameData;

    return newState;
  }
  if(action.type === 'LEAVE_ROOM') {
    const newState = { ...state };

    // Tell the server we want to leave.
    socket.emit('leaveRoom');

    // Reset our data.
    /**
     * FIXME: This causes problems, but might be useful to reset in the future.
     * For now, it works, so let's not touch it.
     */
    // newState.gameData = null as any;

    return newState;
  }

  if(action.type === 'SET_ROOM_DATA') {
    const newState = { ...state };

    // Set the data.
    newState.gameData = action.gameData;

    // Set some values if we haven't already.
    newState.scene = 'GAME';

    return newState;
  }

  return state;
}
