// @ts-check
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const validate = (values) => {
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  try {
    validationSchema.validateSync(values);
    return null;
  } catch (e) {
    return e.message;
  }
};

const LoginPage = () => {
  // @ts-ignore
  const { logIn, logOut } = useAuth();
  const [authError, setAuthState] = useState(null);
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
      setAuthState(null);
      const error = validate(values);
      if (error) {
        setAuthState('Неверные имя пользователя или пароль');
        return;
      }
      try {
        const resp = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(resp.data));
        logIn();
        history.push({ pathname: '/' });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthState('Неверные имя пользователя или пароль');
          logOut();
          inputRef.current.focus();
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <Form onSubmit={formik.handleSubmit} className="w-50">
          <h1 className="text-center mb-4">Войти</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Label htmlFor="username">Ваш ник</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="username"
              name="username"
              id="username"
              autoComplete="username"
              isInvalid={authError}
              required
              ref={inputRef}
            />
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="password"
              name="password"
              id="password"
              autoComplete="current-password"
              isInvalid={authError}
              required
            />
            <Form.Control.Feedback type="invalid">{authError}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="w-100 mb-3 btn" variant="outline-primary">Войти</Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
