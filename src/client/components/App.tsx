import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';

import { updatePlayerCount } from '../actions';
import { Store } from '../store';
import { Scene } from '../reducers/game-reducer';

import Welcome from './scenes/Welcome/Welcome';
import Multiplayer from './scenes/Multiplayer/Multiplayer';

import './App.component.scss';

const scenes: { [K in Scene]: JSX.Element } = {
  WELCOME: <Welcome />,
  MULTIPLAYER: <Multiplayer />,
  GAME: null as any
};

function App(
  {
    scene,
    updatePlayerCount
  }:
  {
    scene: Scene,
    updatePlayerCount: (count: number) => void
  }
) {
  useEffect(() => {
    function handlePlayerCountChange(count: number) {
      updatePlayerCount(count);
    }
    function handleOpponentDisconnect() {
      socket.emit('leaveRoom');
    }

    socket.on('playerCount', handlePlayerCountChange);
    socket.on('opponentDisconnect', handleOpponentDisconnect);

    return () => {
      socket.removeListener('playerCount', handlePlayerCountChange);
      socket.removeListener('opponentDisconnect', handleOpponentDisconnect);
    };
  }, []);

  return scenes[scene];
}

const mapStateToProps = (state: Store) => ({
  scene: state.game.scene
});
const mapDispatchToProps = {
  updatePlayerCount
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
