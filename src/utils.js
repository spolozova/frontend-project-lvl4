export default (onSuccess, onTimeout, timeout) => {
  // eslint-disable-next-line functional/no-let
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return () => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    // eslint-disable-next-line functional/no-this-expression
    onSuccess.apply(this);
  };
};
