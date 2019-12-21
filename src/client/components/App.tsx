import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';

import { updatePlayerCount, cleanUpMenu, setRoomData, transitionToGame } from '../actions';
import { Store } from '../store';
import { Scene } from '../reducers/game-reducer';

import Welcome from './scenes/Welcome/Welcome';
import Multiplayer from './scenes/Multiplayer/Multiplayer';
import GameScene from './scenes/Game/Game';

import './App.component.scss';
import { Game } from '../../shared/types';

const scenes: { [K in Scene]: JSX.Element } = {
  WELCOME: <Welcome />,
  MULTIPLAYER: <Multiplayer />,
  GAME: <GameScene />
};

function App(
  {
    scene,
    updatePlayerCount,
    cleanUpMenu,
    setRoomData,
    transitionToGame
  }:
  {
    scene: Scene,
    updatePlayerCount: (count: number) => void,
    cleanUpMenu: () => void,
    setRoomData: (gameData: Game) => void,
    transitionToGame: () => void
  }
) {
  useEffect(() => {
    function handlePlayerCountChange(count: number) {
      updatePlayerCount(count);
    }
    function handleCleanUpClientMenu() {
      cleanUpMenu();
    }
    function handleUpdatedRoomData(roomData: Game) {
      setRoomData(roomData);

      // Transition if we are on the menu.
      if(scene === 'MULTIPLAYER') {
        transitionToGame();
      }
    }

    socket.on('playerCount', handlePlayerCountChange);
    socket.on('cleanUpClientMenu', handleCleanUpClientMenu);
    socket.on('updatedRoomData', handleUpdatedRoomData);

    return () => {
      socket.removeListener('playerCount', handlePlayerCountChange);
      socket.removeListener('cleanUpClientMenu', handleCleanUpClientMenu);
      socket.removeListener('updatedRoomData', handleUpdatedRoomData);
    };
  }, []);

  return scenes[scene];
}

const mapStateToProps = (state: Store) => ({
  scene: state.game.scene
});
const mapDispatchToProps = {
  updatePlayerCount,
  cleanUpMenu,
  setRoomData,
  transitionToGame
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
