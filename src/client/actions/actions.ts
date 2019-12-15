import { MenuActionObject, GameActionObject } from './action-types';

import { Scene } from '../reducers/game-reducer';
import { GameCreationType } from '../reducers/menu-reducer';
import { Game, RowIndex, MarkRowIndex } from '../../shared/types';

/**
 * Sets the new player count.
 * @param count The new player count.
 */
export function updatePlayerCount(count: number): MenuActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
/**
 * Changes the game creation type.
 * @param gameCreationType The game creation type to change to.
 */
export function changeGameCreationType(gameCreationType: GameCreationType): MenuActionObject {
  return { type: 'CHANGE_GAME_CREATION_TYPE', gameCreationType };
}
/**
 * Sets a new username,
 * @param username The new username.
 */
export function changeUsername(username: string): MenuActionObject {
  return { type: 'CHANGE_USERNAME', username };
}
/**
 * Sets a new room code.
 * @param roomCode The new room code.
 */
export function changeRoomCode(roomCode: string): MenuActionObject {
  return { type: 'CHANGE_ROOM_CODE', roomCode };
}
/**
 * Tries to join a game.
 * @param gameCreationType The way to handle joining the game.
 */
export function joinGame(gameCreationType: GameCreationType): MenuActionObject {
  return { type: 'JOIN_GAME', gameCreationType };
}
/**
 * Displays an online error.
 * @param error The error to display.
 */
export function triggerOnlineError(error: string): MenuActionObject {
  return { type: 'TRIGGER_ONLINE_ERROR', error };
}
/** Changes some values on the menu reducer when we recieve new game data. */
export function menuUpdatedGameData(): MenuActionObject {
  return { type: 'MENU_UPDATED_GAME_DATA' };
}
/** Cleans up the menu when we leave a game. */
export function cleanUpMenu(): MenuActionObject {
  return { type: 'CLEAN_UP_MENU' };
}
/** Changes values on the menu when a player joins our room. */
export function transitionToGame(): MenuActionObject {
  return { type: 'TRANSITION_TO_GAME' };
}

/**
 * Sets a new scene.
 * @param scene The scene to change to.
 */
export function changeScene(scene: Scene): GameActionObject {
  return { type: 'CHANGE_SCENE', scene };
}
/**
 * Sets some values along with setting the intial room data.
 * @param gameData The intial game data.
 */
export function setInitialRoomData(gameData: Game): GameActionObject {
  return { type: 'SET_INTIAL_ROOM_DATA', gameData };
}
/** Leaves the room that you are in. */
export function leaveRoom(): GameActionObject {
  return { type: 'LEAVE_ROOM' };
}
/**
 * Simply updates the room data.
 * @param gameData The new game data.
 */
export function setRoomData(gameData: Game): GameActionObject {
  return { type: 'SET_ROOM_DATA', gameData };
}
/** Creates an offline object to play with. */
export function prepareLocalGame(): GameActionObject {
  return { type: 'PREPARE_LOCAL_GAME' };
}
/**
 * Handles logic for clicking marks.
 * @param row The row that the mark is in.
 * @param index The index of the mark in the row.
 */
export function clickMark(row: RowIndex, index: MarkRowIndex): GameActionObject {
  return { type: 'CLICK_MARK', row, index };
}
/** Ends your turn. */
export function endTurn(): GameActionObject {
  return { type: 'END_TURN' };
}
/** Resets the game data and returns to the menu. */
export function resetGame(): GameActionObject {
  return { type: 'RESET_GAME' };
}
