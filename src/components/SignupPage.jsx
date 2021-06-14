// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
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

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signupSchema = yup.object({
    username: yup.string().trim()
      .required()
      .min(3)
      .max(20),
    password: yup.string().trim()
      .required()
      .min(6),
    confirmPassword: yup.string().trim()
      .required()
      .oneOf([yup.ref('password'), null]),
  });

  const formik = useFormik({
    validationSchema: signupSchema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
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
        history.push({ pathname: '/' });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setState({ isAuthorized: false, isSending: false, authError: 'Такой пользователь уже существует' });
          inputRef.current.focus();
          return;
        }
        setState({
          isSending: false,
          isAuthorized: false,
          authError: 'ошибка сети',
        });
      }
    },
  });
  const { isSending, isAuthorized, authError } = signupState;

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
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    placeholder="Имя пользователя"
                    autoComplete="username"
                    isInvalid={formik.errors.username ? true : !isAuthorized}
                    ref={inputRef}
                    disabled={isSending}
                    required
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={formik.errors.password ? true : !isAuthorized}
                    disabled={isSending}
                    placeholder="Пароль"
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 position-relative">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    isInvalid={formik.errors.confirmPassword ? true : !isAuthorized}
                    disabled={isSending}
                    placeholder="Подтвердите пароль"
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {authError || formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={isSending} className="w-100 mb-3 btn" variant="outline-primary">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
