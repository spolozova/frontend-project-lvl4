// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import store from './store.js';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.getElementById('chat');
const init = () => {
  console.log(container);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
  );
};

export default init;
