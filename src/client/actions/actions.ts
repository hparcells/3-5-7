import { MenuActionObject, GameActionObject } from './action-types';
import { Scene, GameCreationType } from '../reducers/game-reducer';

export function updatePlayerCount(count: number): MenuActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
export function changeUsername(username: string): MenuActionObject {
  return { type: 'CHANGE_USERNAME', username };
}

export function changeScene(scene: Scene): GameActionObject {
  return { type: 'CHANGE_SCENE', scene };
}
export function changeGameCreationType(gameCreationType: GameCreationType): GameActionObject {
  return { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType };
}
