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
    changeScene
  }:
  {
    marks: Mark[][],
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
  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          marks[0].map((mark, index) => {
            return <MarkComponent key={index} marked={mark.isMarked} selected={mark.isSelected} onClick={() => {}} />;
          })
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          marks[1].map((mark, index) => {
            return <MarkComponent key={index} marked={mark.isMarked} selected={mark.isSelected} onClick={() => {}} />;
          })
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          marks[2].map((mark, index) => {
            return <MarkComponent key={index} marked={mark.isMarked} selected={mark.isSelected} onClick={() => {}} />;
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  marks: state.game.gameData.marks
});
const mapDispatchToProps = {
  changeScene
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
