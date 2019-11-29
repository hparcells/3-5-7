import { error } from 'log-type';

import { GameActionObject } from '../actions';

import socket from '../socket';

import { Game } from '../../shared/types';

export type Scene = 'WELCOME' | 'MULTIPLAYER' | 'GAME';

/** The state of the game. */
export interface GameState {
  /** The scene that is being displayed. */
  scene: Scene;
  /** The game data. */
  gameData: Game;
}

const initialState: GameState = {
  scene: 'WELCOME',
  gameData: null as any
};

export default function(state: GameState = initialState, action: GameActionObject) {
  if(action.type === 'CHANGE_SCENE') {
    const newState = { ...state };

    newState.scene = action.scene;

    return newState;
  }
  if(action.type === 'SET_INTIAL_ROOM_DATA') {
    const newState = { ...state };

    newState.gameData = action.gameData;

    return newState;
  }
  if(action.type === 'LEAVE_ROOM') {
    const newState = { ...state };

    // Tell the server we want to leave.
    socket.emit('leaveRoom');

    // Reset our data.
    /**
     * FIXME: This causes problems, but might be useful to reset in the future.
     * For now, it works, so let's not touch it.
     */
    // newState.gameData = null as any;

    return newState;
  }
  if(action.type === 'SET_ROOM_DATA') {
    const newState = { ...state };

    // Set the data.
    newState.gameData = action.gameData;

    // Set some values if we haven't already.
    newState.scene = 'GAME';

    return newState;
  }
  if(action.type === 'PREPARE_LOCAL_GAME') {
    const newState = { ...state };

    newState.gameData = {
      roomCode: 'LOCAL',
      players: ['Player 1', 'Player 2'],
      turn: 0,
      marks: [
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ],
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ],
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ]
      ]
    };

    return newState;
  }
  if(action.type === 'CLICK_MARK') {
    const newState = { ...state };

    // If we are in an online game.
    if(newState.gameData.roomCode !== 'LOCAL') {
      return newState;
    }

    // If we already marked this mark during this turn.
    if(newState.gameData.marks[action.row][action.index].isSelected) {
      return newState;
    }
    if(newState.gameData.marks[action.row][action.index].isMarked) {
      error('Cannot mark an already marked mark.');
      return newState;
    }

    newState.gameData.marks[action.row][action.index].isSelected = true;

    return newState;
  }

  return state;
}
