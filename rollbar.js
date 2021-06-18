// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar');

const rollbar = new Rollbar({
  accessToken: '1c02bd50715348bf9fb1a3b86c528980',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log('Hello world!');
