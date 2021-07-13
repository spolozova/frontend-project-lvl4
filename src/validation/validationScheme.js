import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'required',
    notOneOf: 'unique',
    oneOf: 'confirmPassword',
  },
  string: {
    required: 'required',
    max: 'nameLength',
  },
});

const validationScheme = {
  login: () => yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
  updateChannel: (list) => yup.object({
    name: yup.string().trim().required()
      .min(3, 'nameLength')
      .max(20)
      .notOneOf(list),
  }),
  signup: () => yup.object({
    username: yup.string().trim()
      .required()
      .min(3, 'nameLength')
      .max(20),
    password: yup.string().trim()
      .required()
      .min(6, 'passwordLength'),
    confirmPassword: yup.string().trim()
      .oneOf([yup.ref('password'), null]),
  }),
  message: () => yup.string().required(),
};

export const getSchema = (type, list = []) => validationScheme[type](list);

export const validate = (type, values, list) => {
  const schema = getSchema(type, list);
  try {
    schema.validateSync(values);
    return null;
  } catch (e) {
    return e.errors;
  }
};
