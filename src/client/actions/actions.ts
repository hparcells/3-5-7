import { MenuActionObject } from './action-types';

export function updatePlayerCount(count: number): MenuActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
export function changeUsername(username: string): MenuActionObject {
  return { type: 'CHANGE_USERNAME', username };
}
