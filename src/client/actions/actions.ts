import { MenuActionObject, GameActionObject } from './action-types';

import { Scene } from '../reducers/game-reducer';
import { GameCreationType } from '../reducers/menu-reducer';
import { Game } from '../../shared/types';

export function updatePlayerCount(count: number): MenuActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
export function changeGameCreationType(gameCreationType: GameCreationType): MenuActionObject {
  return { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType };
}
export function changeUsername(username: string): MenuActionObject {
  return { type: 'CHANGE_USERNAME', username };
}
export function changeRoomCode(roomCode: string): MenuActionObject {
  return { type: 'CHANGE_ROOM_CODE', roomCode };
}
export function joinGame(gameCreationType: GameCreationType): MenuActionObject {
  return { type: 'JOIN_GAME', gameCreationType };
}
export function triggerOnlineError(error: string): MenuActionObject {
  return { type: 'TRIGGER_ONLINE_ERROR', error };
}

export function changeScene(scene: Scene): GameActionObject {
  return { type: 'CHANGE_SCENE', scene };
}
export function setInitialRoomData(gameData: Game): GameActionObject {
  return { type: 'SET_INTIAL_ROOM_DATA', gameData };
}
