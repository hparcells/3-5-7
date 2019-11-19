import { GameActionObject } from '../actions';

export type Scene = 'WELCOME' | 'MULTIPLAYER' | 'GAME';

export interface GameState {
  scene: Scene;
}

const initialState: GameState = {
  scene: 'WELCOME'
};

export default function(state: GameState = initialState, action: GameActionObject) {
  if(action.type === 'CHANGE_SCENE') {
    const newState = { ...state };

    newState.scene = action.scene;

    return newState;
  }
  if(action.type === 'SET_INTIAL_ROOM_DATA') {
    const newState = { ...state };

    // TODO: Everything

    return newState;
  }

  return state;
}
