import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import {
  setInitialRoomData,
  menuUpdatedGameData
} from '../../../actions';

import socket from '../../../socket';

import Title from '../../Title/Title';

import { Game } from '../../../../shared/types';

import Hub from './Hub/Hub';
import WaitingForOpponent from './WaitingForOpponent/WaitingForOpponent';

import classes from './Multiplayer.module.scss';

function Multiplayer(
  {
    isWaitingForOpponent,
    setInitialRoomData,
    menuUpdatedGameData
  }:
  {
    isWaitingForOpponent: boolean,
    setInitialRoomData: (roomData: Game) => void,
    menuUpdatedGameData: () => void
  }
) {
  useEffect(() => {
    function handleInitialRoomData(roomData: Game) {
      setInitialRoomData(roomData);
      menuUpdatedGameData();
    }
    socket.on('getInitalRoomData', handleInitialRoomData);

    return () => {
      socket.removeListener('getInitialRoomData', handleInitialRoomData);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Title style={{ marginBottom: '0px' }} />

      <div className={classes.restOfPage}>
        <div className={classes.multiplayerBox}>
          {
            !isWaitingForOpponent
              ? <Hub />
              : <WaitingForOpponent />
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  isWaitingForOpponent: state.menu.isWaitingForOpponent
});
const mapDispatchToProps = {
  setInitialRoomData,
  menuUpdatedGameData
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
