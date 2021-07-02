const TIMER = 1000;

const withTimeout = (onSuccess, onTimeout, timeout = TIMER) => {
  // eslint-disable-next-line functional/no-let
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    // eslint-disable-next-line functional/no-this-expression
    onSuccess.apply(this, args);
  };
};

const getSocketApi = (socketClient) => ({
  sendNewMessage: (outgoingMessage, onSuccess, onTimeout) => {
    socketClient.volatile.emit('newMessage', outgoingMessage, withTimeout(onSuccess, onTimeout));
  },
  addChannel: (name, onSuccess, onTimeout) => {
    socketClient.volatile.emit('newChannel', name, withTimeout(onSuccess, onTimeout));
  },
  removeChannel: ({ id }, onSuccess, onTimeout) => socketClient.volatile.emit('removeChannel', { id }, withTimeout(onSuccess, onTimeout)),
  renameChannel: (data, onSuccess, onTimeout) => socketClient.volatile.emit('renameChannel', data, withTimeout(onSuccess, onTimeout)),
});

export default getSocketApi;
