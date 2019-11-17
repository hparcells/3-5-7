import { Scene } from '../reducers/game-reducer';
import { GameCreationType } from '../reducers/menu-reducer';

export type MenuActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType: GameCreationType }
  | { type: 'CHANGE_USERNAME', username: string }
  | { type: 'CHANGE_ROOM_CODE', roomCode: string }
  | { type: 'JOIN_GAME', gameCreationType: GameCreationType }
  | { type: 'TRIGGER_ONLINE_ERROR', error: string };

// tslint:disable-next-line: interface-over-type-literal
export type GameActionObject
  = { type: 'CHANGE_SCENE', scene: Scene };

export type ActionObject = MenuActionObject | GameActionObject;
