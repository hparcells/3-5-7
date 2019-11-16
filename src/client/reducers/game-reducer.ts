import { GameActionObject } from '../actions';

export type Scene = 'WELCOME' | 'MULTIPLAYER' | 'GAME';
export type GameCreationType = 'HOST_GAME' | 'JOIN_GAME';

export interface GameState {
  scene: Scene;
  gameCreationType: GameCreationType;
}

const initialState: GameState = {
  scene: 'WELCOME',
  gameCreationType: 'HOST_GAME'
};

export default function(state: GameState = initialState, action: GameActionObject) {
  if(action.type === 'CHANGE_SCENE') {
    const newState = { ...state };

    newState.scene = action.scene;

    return newState;
  }
  if(action.type === 'CHANGE_GAME_CREATION_TYPE') {
    const newState = { ...state };

    newState.gameCreationType = action.gameCreationType;

    return newState;
  }

  return state;
}
