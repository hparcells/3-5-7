import { Scene } from '../reducers/game-reducer';

export type MenuActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'CHANGE_USERNAME', username: string };

// tslint:disable-next-line: interface-over-type-literal
export type GameActionObject
  = { type: 'CHANGE_SCENE', scene: Scene };

export type ActionObject = MenuActionObject | GameActionObject;
