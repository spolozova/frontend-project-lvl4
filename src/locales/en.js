export default {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    forms: {
      password: 'Password',
      loginForm: {
        header: 'Log in',
        username: 'Nickname',
        authError: 'Invalid username or password',
        noAccount: 'Don`t have an account?',
        signup: 'Sign up',
      },
      signupForm: {
        signupHeader: 'Sign up',
        confirmPassword: 'Confirm the password',
        signup: 'Sign up',
        username: 'Username',
        authError: 'User already exists',
      },
    },
    validationErrors: {
      lengthError: 'From 3 to 20 characters',
      required: 'Required field',
      passwordError: 'Not less than 6 characters',
      confirmPasswordError: 'Passwords must match',
      uniqueError: 'The name must be unique',
    },
    networkError: 'Network error. Check the connection and try again',
    buttons: {
      send: 'Send',
      delete: 'Delete',
      rename: 'Rename',
      cancel: 'Cancel',
    },
    modals: {
      removeHeader: 'Delete Channel',
      addHeader: 'Add Channel',
      renameHeader: 'Rename channel',
      areYouSure: 'Are you sure?',
    },
    chatPage: {
      messagesCounter: '{{count}} message',
      messagesCounter_plural: '{{count}} messages',
      channels: 'Channels',
      loading: 'Loading...',
      messageField: 'Enter your message...',
    },
    navBar: {
      logout: 'Log out',
      chatName: 'Hexlet-Chat',
    },
    notFoundPage: 'Page not found. Click "Hexlet-Chat" to go to the main page.',
  },
};
