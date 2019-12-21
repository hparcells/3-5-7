import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import store from './store';

import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

ReactGA.initialize('UA-134185568-7');
ReactGA.pageview('/');
