import { GameActionObject } from '../actions';

export type Scene = 'WELCOME';

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

  return state;
}
