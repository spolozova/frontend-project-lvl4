export default {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    forms: {
      password: 'Пароль',
      loginForm: {
        header: 'Войти',
        username: 'Ваш ник',
        authError: 'Неверные имя пользователя или пароль',
        noAccount: 'Нет aккаунта?',
        signup: 'Регистрация',
      },
      signupForm: {
        header: 'Регистрация',
        confirmPassword: 'Подтвердите пароль',
        signup: 'Зарегистрироваться',
        username: 'Имя пользователя',
        authError: 'Такой пользователь уже существует',
      },
    },
    validationErrors: {
      nameLengthError: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      passwordLengthError: 'Не менее 6 символов',
      confirmPasswordError: 'Пароли должны совпадать',
      uniqueError: 'Название должно быть уникальным',
    },
    networkError: 'Ошибка сети. Проверьте соединение и повторите попытку',
    buttons: {
      send: 'Отправить',
      delete: 'Удалить',
      rename: 'Переименовать',
      cancel: 'Отменить',
    },
    modals: {
      removeHeader: 'Удалить канал',
      addHeader: 'Добавить канал',
      renameHeader: 'Переименовать канал',
      areYouSure: 'Уверены?',
    },
    chatPage: {
      messagesCounter_0: '{{count}} сообщение',
      messagesCounter_1: '{{count}} сообщения',
      messagesCounter_2: '{{count}} сообщений',
      channels: 'Каналы',
      loading: 'Загружается...',
      messageField: 'Введите сообщение...',
    },
    navBar: {
      logout: 'Выйти',
      chatName: 'Hexlet-Chat',
    },
    notFoundPage: 'Страница не найдена. Нажмите "Hexlet-Chat", чтобы перейти на главную страницу.',
  },
};
