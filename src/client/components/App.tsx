import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';

import { updatePlayerCount } from '../actions';
import { Store } from '../store';
import { Scene } from '../reducers/game-reducer';

import Welcome from './scenes/Welcome/Welcome';

import './App.component.scss';

const scenes: { [K in Scene]: JSX.Element } = {
  WELCOME: <Welcome />
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

    socket.on('playerCount', handlePlayerCountChange);
    return () => {
      socket.removeListener('playerCount', handlePlayerCountChange);
    };
  }, []);

  return (
    <div>
      {scenes[scene]}
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  scene: state.game.scene
});
const mapDispatchToProps = {
  updatePlayerCount
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
