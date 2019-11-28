import { Scene } from '../reducers/game-reducer';
import { GameCreationType } from '../reducers/menu-reducer';
import { Game } from '../../shared/types';

export type MenuActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType: GameCreationType }
  | { type: 'CHANGE_USERNAME', username: string }
  | { type: 'CHANGE_ROOM_CODE', roomCode: string }
  | { type: 'JOIN_GAME', gameCreationType: GameCreationType }
  | { type: 'TRIGGER_ONLINE_ERROR', error: string }
  | { type: 'MENU_UPDATED_GAME_DATA' }
  | { type: 'CLEAN_UP_MENU' }
  | { type: 'TRANSITION_TO_GAME' };

export type GameActionObject
  = { type: 'CHANGE_SCENE', scene: Scene }
  | { type: 'SET_INTIAL_ROOM_DATA', gameData: Game }
  | { type: 'LEAVE_ROOM' }
  | { type: 'SET_ROOM_DATA', gameData: Game };

export type ActionObject = MenuActionObject | GameActionObject;
