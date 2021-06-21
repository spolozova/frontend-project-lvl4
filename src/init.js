// @ts-check
import Rollbar from 'rollbar';
import init from './index.jsx';

// не используется проверка на NODE_ENV т.к. Rollbar access token существует только в production
const rollbar = new Rollbar({
  accessToken: '3304fc7414d24faabb91eb38a1e718da',
  captureUncaught: true,
  captureUnhandledRejections: true,
});
rollbar.log('Hello world!');

init();
