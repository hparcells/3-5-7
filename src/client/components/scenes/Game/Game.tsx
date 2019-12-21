import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../../socket';

import { Mark, MarkArray, MarkRowIndex, RowIndex } from '../../../../shared/types';
import { Store } from '../../../store';
import { changeScene, clickMark, endTurn } from '../../../actions';

import MarkComponent from '../../Mark/Mark';

import { Scene } from '../../../reducers/game-reducer';

import classes from './Game.module.scss';
import Button from '../../Button/Button';
import WinningOverlay from '../../WInningOverlay/WinningOverlay';

function Game(
  {
    marks,
    currentTurnName,
    activeRow,
    username,
    roomCode,
    changeScene,
    clickMark,
    endTurn
  }:
  {
    marks: MarkArray,
    currentTurnName: string,
    activeRow: RowIndex,
    username: string,
    roomCode: string,
    changeScene: (scene: Scene) => void,
    clickMark: (row: RowIndex, index: MarkRowIndex) => void,
    endTurn: () => void
  }
) {
  useEffect(() => {
    function handleOpponentDisconnect() {
      // Ask to leave the room.
      socket.emit('leaveRoom');

      // Go back to the menu.
      changeScene('MULTIPLAYER');
    }

    socket.on('opponentDisconnect', handleOpponentDisconnect);

    return () => {
      socket.removeListener('opponentDisconnect', handleOpponentDisconnect);
    };
  }, []);

  function handleMarkClick(row: RowIndex, index: MarkRowIndex) {
    // Check if we can even make our turn.
    if(roomCode !== 'LOCAL' && currentTurnName !== username) {
      return;
    }

    clickMark(row, index);
  }
  function handleEndTurn() {
    endTurn();
  }

  return (
    <div className={classes.root}>
      <WinningOverlay />

      <div style={{ margin: 'auto' }}>
        <p className={classes.turnLabel}>{currentTurnName}'s Turn</p>
        {
          marks.map((markRow: Mark[], rowIndex: number) => {
            return (
              <div className={classes.markWrapper} key={rowIndex}>
                {
                  markRow.map((mark: Mark, markIndex: number) => {
                    return (
                      <MarkComponent
                        key={markIndex}
                        marked={mark.isMarked}
                        selected={mark.isSelected}
                        onClick={handleMarkClick}
                        row={rowIndex as RowIndex}
                        index={markIndex as MarkRowIndex}
                        selectable={activeRow === null || activeRow === rowIndex}
                      />
                    );
                  })
                }
              </div>
            );
          })
        }
        <Button
          style={{ marginTop: '10px' }}
          disabled={activeRow === null || (roomCode !== 'LOCAL' && currentTurnName !== username)}
          onClick={handleEndTurn}
        >
          End Turn
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  marks: state.game.gameData.marks,
  currentTurnName: state.game.gameData.players[state.game.gameData.turn],
  activeRow: state.game.gameData.activeRow,
  username: state.menu.username,
  roomCode: state.game.gameData.roomCode
});
const mapDispatchToProps = {
  changeScene,
  clickMark,
  endTurn
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
