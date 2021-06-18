// @ts-check

import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import React from 'react';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import store from './store.js';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
