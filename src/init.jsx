import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

const init = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('chat'),
  );
};

export default init;
