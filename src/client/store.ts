import { createStore } from 'redux';

import rootReducer from './reducers';
import { MenuState } from './reducers/menu-reducer';
import { GameState } from './reducers/game-reducer';

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
  rootReducer,
  reduxDevTools ? reduxDevTools() : undefined
);

export default store;

export interface Store {
  menu: MenuState;
  game: GameState;
}
