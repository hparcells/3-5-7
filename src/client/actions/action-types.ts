import { Scene, GameCreationType } from '../reducers/game-reducer';

export type MenuActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'CHANGE_USERNAME', username: string };

export type GameActionObject
  = { type: 'CHANGE_SCENE', scene: Scene }
  | { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType: GameCreationType };

export type ActionObject = MenuActionObject | GameActionObject;
