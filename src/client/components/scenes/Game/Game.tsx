import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../../socket';

import { Mark } from '../../../../shared/types';
import { Store } from '../../../store';
import { changeScene } from '../../../actions';

import MarkComponent from '../../Mark/Mark';

import { Scene } from '../../../reducers/game-reducer';

import classes from './Game.module.scss';

function Game(
  {
    marks,
    currentTurnName,
    changeScene
  }:
  {
    marks: Mark[][],
    currentTurnName: string,
    changeScene: (scene: Scene) => void
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
    console.log(`Clicked at Row: ${row}, Index: ${index}`);
  }

  return (
    <div className={classes.root}>
      <div style={{ margin: 'auto' }}>
        <p className={classes.turnLabel}>{currentTurnName}'s Turn</p>
        <div className={classes.markWrapper}>
          {
            marks[0].map((mark, index) => {
              return <MarkComponent
                key={index}
                marked={mark.isMarked}
                selected={mark.isSelected}
                onClick={handleMarkClick}
                row={0}
                index={index}
              />;
            })
          }
        </div>
        <div className={classes.markWrapper}>
          {
            marks[1].map((mark, index) => {
              return <MarkComponent
                key={index}
                marked={mark.isMarked}
                selected={mark.isSelected}
                onClick={handleMarkClick}
                row={1}
                index={index}
              />;
            })
          }
        </div>
        <div className={classes.markWrapper}>
          {
            marks[2].map((mark, index) => {
              return <MarkComponent
                key={index}
                marked={mark.isMarked}
                selected={mark.isSelected}
                onClick={handleMarkClick}
                row={3}
                index={index}
              />;
            })
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  marks: state.game.gameData.marks,
  currentTurnName: state.game.gameData.players[state.game.gameData.turn]
});
const mapDispatchToProps = {
  changeScene
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
