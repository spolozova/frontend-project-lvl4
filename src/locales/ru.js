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
        noAccount: 'Нет aккаунта?',
        signup: 'Регистрация',
      },
      signupForm: {
        header: 'Регистрация',
        confirmPassword: 'Подтвердите пароль',
        signup: 'Зарегистрироваться',
        username: 'Имя пользователя',
      },
    },
    validationErrors: {
      nameLength: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      passwordLength: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      unique: 'Название должно быть уникальным',
    },
    authErrors: {
      401: 'Неверные имя пользователя или пароль.',
      409: 'Такой пользователь уже существует.',
      unspecific: 'Что-то пошло не так. Повторите попытку позже.',
    },
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
