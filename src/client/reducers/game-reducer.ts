import { GameActionObject } from '../actions';

import { Game } from '../../shared/types';

export type Scene = 'WELCOME' | 'MULTIPLAYER' | 'GAME';

export interface GameState {
  scene: Scene;
  waitingForJoin: boolean;
  gameData: Game;
}

const initialState: GameState = {
  scene: 'WELCOME',
  waitingForJoin: false,
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
    newState.waitingForJoin = true;

    return newState;
  }

  return state;
}
