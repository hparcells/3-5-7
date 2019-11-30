import { error } from 'log-type';

import { GameActionObject } from '../actions';

import socket from '../socket';

import { Game, MarkArray } from '../../shared/types';

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
      ],
      activeRow: null as any
    };

    return newState;
  }
  if(action.type === 'CLICK_MARK') {
    const newState = { ...state };

    // If we are in an online game.
    if(newState.gameData.roomCode !== 'LOCAL') {
      // TODO:
      return newState;
    }

    // If we already marked this mark during this turn.
    if(newState.gameData.marks[action.row][action.index].isSelected) {
      return newState;
    }
    // If this mark is already marked in this game.
    if(newState.gameData.marks[action.row][action.index].isMarked) {
      return newState;
    }

    // Check if we have marked a mark this turn.
    if(newState.gameData.activeRow === null) {
      newState.gameData.activeRow = action.row;
    }else {
      if(newState.gameData.activeRow !== action.row) {
        return newState;
      }
    }

    const newMarks = [ ...newState.gameData.marks ] as MarkArray;

    newMarks[action.row][action.index].isSelected = true;
    newState.gameData.marks = newMarks;

    // TODO: Check win.

    return newState;
  }
  if(action.type === 'END_TURN') {
    const newState = { ...state };

    // Check if we can even.
    if(!newState.gameData.marks.flat().map((mark) => {
      return mark.isSelected;
    }).includes(true)) {
      error('Cannot end a turn if nothing was marked.');
      return newState;
    }

    // Change our marks to marked marks.
    const newMarks = [ ...newState.gameData.marks ] as MarkArray;
    newMarks.forEach((markRow) => {
      markRow.forEach((mark) => {
        if(mark.isSelected) {
          mark.isSelected = false;
          mark.isMarked = true;
        }
      });
    });
    newState.gameData.marks = newMarks;

    // Change the turn;
    if(newState.gameData.turn === 0) {
      newState.gameData.turn++;
    }else {
      newState.gameData.turn--;
    }

    // Reset some values.
    newState.gameData.activeRow = null as any;

    return newState;
  }

  return state;
}
