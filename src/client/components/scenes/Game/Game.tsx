import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../../socket';

import { Mark } from '../../../../shared/types';
import { Store } from '../../../store';
import { changeScene, clickMark } from '../../../actions';

import MarkComponent from '../../Mark/Mark';

import { Scene } from '../../../reducers/game-reducer';

import classes from './Game.module.scss';

function Game(
  {
    marks,
    currentTurnName,
    changeScene,
    clickMark
  }:
  {
    marks: Mark[][],
    currentTurnName: string,
    changeScene: (scene: Scene) => void,
    clickMark: (row: number, index: number) => void
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

  function handleMarkClick(row: number, index: number) {
    clickMark(row, index);
  }

  return (
    <div className={classes.root}>
      <div style={{ margin: 'auto' }}>
        <p className={classes.turnLabel}>{currentTurnName}'s Turn</p>
        {
          marks.map((markRow, rowIndex) => {
            return (
              <div className={classes.markWrapper} key={rowIndex}>
                {
                  markRow.map((mark, markIndex) => {
                    return (
                      <MarkComponent
                        key={markIndex}
                        marked={mark.isMarked}
                        selected={mark.isSelected}
                        onClick={handleMarkClick}
                        row={rowIndex}
                        index={markIndex}
                      />
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  marks: state.game.gameData.marks,
  currentTurnName: state.game.gameData.players[state.game.gameData.turn]
});
const mapDispatchToProps = {
  changeScene,
  clickMark
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
