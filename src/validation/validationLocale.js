import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'required',
    notOneOf: 'unique',
    oneOf: 'confirmPassword',
  },
  string: {
    required: 'required',
    min: ({ min }) => (min === 6 ? 'passwordLength' : 'nameLength'),
    max: 'nameLength',
  },
});

export default yup;
