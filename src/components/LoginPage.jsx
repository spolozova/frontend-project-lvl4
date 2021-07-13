// @ts-check
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import { validate } from '../validation/validationScheme.js';
// @ts-ignore
import image from '../images/people-talking.png';

const LoginPage = () => {
  const { t } = useTranslation();
  // @ts-ignore
  const { logIn } = useAuth();
  const [errors, setErrors] = useState({ validationError: null, authError: null });
  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setErrors({ validationError: null, authError: null });
      const validError = validate('login', values);
      console.log(validError);
      if (validError) {
        setErrors({ validationError: validError, authError: null });
        return;
      }
      try {
        const resp = await axios.post(routes.loginPath(), values);
        logIn(JSON.stringify(resp.data));
        history.replace({ pathname: '/' });
      } catch (err) {
        setErrors({ validationError: null, authError: err.response.status });
        inputRef.current.focus();
      }
    },
  });

  const { validationError, authError } = errors;

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div style={{ maxWidth: 200 }}>
                <Card.Img src={image} alt="Войти" />
              </div>
              <Form noValidate onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('forms.loginForm.header')}</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authError || validationError}
                    required
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Label htmlFor="username">{t('forms.loginForm.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authError || validationError}
                    required
                    disabled={formik.isSubmitting}
                  />
                  <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {validationError
                      ? t(`validationErrors.${validationError}`) : t([`authErrors.${authError}`, 'authErrors.unspecific'])}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-100 mb-3 btn"
                  variant="outline-primary"
                >
                  {t('forms.loginForm.header')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">{t('forms.loginForm.noAccount')}</span>
                <a href="/signup" onClick={() => history.replace({ pathname: '/signup' })}>{t('forms.loginForm.signup')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
