import yup from './validationLocale.js';

const validationScheme = {
  login: () => yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
  updateChannel: (list) => yup.object({
    name: yup.string().trim().required()
      .min(3)
      .max(20)
      .notOneOf(list),
  }),
  signup: () => yup.object({
    username: yup.string().trim()
      .required()
      .min(3)
      .max(20),
    password: yup.string().trim()
      .required()
      .min(6),
    confirmPassword: yup.string().trim()
      .oneOf([yup.ref('password'), null]),
  }),
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
