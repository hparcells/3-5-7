import React from 'react';
import { connect } from 'react-redux';

import { leaveRoom } from '../../../../actions';
import { Store } from '../../../../store';

import Button from '../../../Button/Button';

import classes from '../MultiplayerBoxContent.module.scss';

function WaitingForOpponent(
  {
    roomCode,
    leaveRoom
  }:
  {
    roomCode: string,
    leaveRoom: () => void
  }
) {
  function handleLeaveRoom() {
    leaveRoom();
  }

  return (
    <div>
      <div className={classes.multiplayerTitle}>
        <p>Waiting for Opponent...</p>
      </div>
      <div className={classes.restOfBox} style={{ margin: '10px' }}>
        <p>
          You are now ready to play. Give the room code
          <code style={{ fontSize: '24px' }}> <u>{roomCode}</u> </code>
          to an opponent to start playing.
        </p>
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          style={{ marginLeft: '10px', marginRight: '10px' }}
          onClick={handleLeaveRoom}
        >
          Leave Room
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  roomCode: state.game.gameData.roomCode
});
const mapDispatchToProps = {
  leaveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForOpponent);
