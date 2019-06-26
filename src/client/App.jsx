import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Menu from './components/Menu';
import Local from './components/Local';
import Online from './components/Online';

import './css/global.css';

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

  return (
    <ThemeProvider theme={theme}>
      {
        mode === 'menu'
          ? <Menu setMode={setMode} />
          : mode === 'local'
            ? <Local />
            : <Online />
      }
    </ThemeProvider>
  );
}
export default hot(App);
