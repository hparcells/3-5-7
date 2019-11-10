import syncReducer from 'sync-reducer';

import { MenuActionObject } from '../actions';

export interface MenuState {
  online: number;
  username: string;
}

const initialState: MenuState = {
  online: 0,
  username: ''
};

function menuReducer(state: MenuState = initialState, action: MenuActionObject) {
  if(action.type === 'UPDATE_PLAYER_COUNT') {
    const newState = { ...state };

    newState.online = action.count;

    return newState;
  }
  if(action.type === 'CHANGE_USERNAME') {
    const newState = { ...state };

    newState.username = action.username;

    return newState;
  }

  return state;
}

export default syncReducer(menuReducer, '357-menu', { ignore: ['online'] });
