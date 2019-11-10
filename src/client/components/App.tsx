import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';
import { updatePlayerCount } from '../actions';
import { Store } from '../store';

function App(
  {
    online,
    updatePlayerCount
  }:
  {
    online: number,
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
      <p>Players Online: {online || 'Fetching...'}</p>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  online: state.menu.online
});
const mapDispatchToProps = {
  updatePlayerCount
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
