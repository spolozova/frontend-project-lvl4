// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import { getSchema } from '../validation/validationScheme.js';

// @ts-ignore
import image from '../images/puzzle.png';

const SignupPage = () => {
  const inputRef = useRef(null);
  const [signupState, setState] = useState({
    isSending: false,
    isAuthorized: true,
    authError: null,
  });
  // @ts-ignore
  const { logIn } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    validationSchema: getSchema('signup'),
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      setState({
        isSending: true,
        isAuthorized: true,
        authError: null,
      });
      try {
        const resp = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(resp.data));
        logIn();
        setState({
          isSending: false,
          isAuthorized: true,
          authError: null,
        });
        history.replace({ pathname: '/' });
      } catch (err) {
        setState({
          isSending: false,
          isAuthorized: false,
          authError: t([`authErrors.${err.response.status}`, 'authErrors.unspecific']),
        });
        inputRef.current.focus();
      }
    },
  });
  const { isSending, isAuthorized, authError } = signupState;
  const {
    handleSubmit,
    values,
    handleBlur,
    errors,
    handleChange,
  } = formik;
  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div style={{ maxWidth: 200 }}>
                <Card.Img src={image} alt="Войти" />
              </div>
              <Form noValidate onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('forms.signupForm.header')}</h1>
                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    name="username"
                    id="username"
                    placeholder={t('forms.signupForm.username')}
                    autoComplete="username"
                    isInvalid={errors.username ? true : !isAuthorized}
                    ref={inputRef}
                    disabled={isSending}
                    required
                  />
                  <Form.Label htmlFor="username">{t('forms.signupForm.username')}</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {t(`validationErrors.${errors.username}`)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={errors.password ? true : !isAuthorized}
                    disabled={isSending}
                    placeholder={t('forms.password')}
                    required
                  />
                  <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {t(`validationErrors.${errors.password}`)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    isInvalid={errors.confirmPassword ? true : !isAuthorized}
                    disabled={isSending}
                    placeholder={t('forms.signupForm.confirmPassword')}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('forms.signupForm.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {authError || t(`validationErrors.${errors.confirmPassword}`)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-100 mb-3 btn"
                  variant="outline-primary"
                >
                  {t('forms.signupForm.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
