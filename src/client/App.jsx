import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Menu from './components/Menu';
import Local from './components/Local';
import Online from './components/Online';

import './css/global.css';
import socket from './socket';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3d5afe'
    },
    secondary: {
      main: '#3f51b5'
    }
  }
});

function App() {
  // menu || local || online
  const [mode, setMode] = useState('menu');
  const [username, setUsername] = useState('');

  function handleUsernameChange(newUsername) {
    setUsername(newUsername);
  }

  useEffect(() => {
    function gameStart(newGame) {
      setMode('online');
    }

    socket.on('gameStart', gameStart);

    return () => {
      socket.removeListener('gameStart', gameStart);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {
        mode === 'menu'
          ? <Menu setMode={setMode} handleAppUsernameChange={handleUsernameChange} />
          : mode === 'local'
            ? <Local />
            : <Online username={username} />
      }
    </ThemeProvider>
  );
}
export default hot(App);
