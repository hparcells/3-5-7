import { Scene } from '../reducers/game-reducer';
import { GameCreationType } from '../reducers/menu-reducer';
import { Game } from '../../shared/types';

/** Contains actions for the menu reducer. */
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

/** Contains actions for the game reducer. */
export type GameActionObject
  = { type: 'CHANGE_SCENE', scene: Scene }
  | { type: 'SET_INTIAL_ROOM_DATA', gameData: Game }
  | { type: 'LEAVE_ROOM' }
  | { type: 'SET_ROOM_DATA', gameData: Game }
  | { type: 'PREPARE_LOCAL_GAME' }
  | { type: 'CLICK_MARK', row: number, index: number };

export type ActionObject = MenuActionObject | GameActionObject;
