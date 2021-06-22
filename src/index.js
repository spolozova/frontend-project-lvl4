// @ts-check
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import init from './init.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// не используется проверка на NODE_ENV т.к. Rollbar access token существует только в production
const rollbar = new Rollbar();
rollbar.configure({
  accessToken: '3304fc7414d24faabb91eb38a1e718da',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const render = async () => {
  const dom = await init();

  ReactDOM.render(dom, document.getElementById('chat'));
};

render();
