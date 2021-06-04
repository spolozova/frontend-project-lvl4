import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const validate = (values) => {
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(5).max(10).required(),
  });
  try {
    validationSchema.validateSync(values);
    return null;
  } catch (e) {
    return new Error('Неверные имя пользователя или пароль');
  }
};

const LoginPage = () => {
  const auth = useAuth();
  const [authState, setAuthState] = useState({ isInvalid: false, validError: '', authError: '' });
  const history = useHistory();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: async (values) => {
      setAuthState({ isInvalid: false, error: '' });
      const error = validate(values);
      if (error) {
        setAuthState({ isInvalid: true, validError: error.message });
      }

      try {
        const resp = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(resp.data.token));
        auth.logIn();
        history.replace({ pathname: '/' });
      } catch (err) {
        if (err.isAxiosError) {
          setAuthState({ isInvalid: false, networkError: err.message });
          inputRef.current.focus();
        }
      }
    },
  });

  const { isInvalid, validError, authError } = authState;

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
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
                    isInvalid={isInvalid}
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
                    isInvalid={isInvalid}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{validError}</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{authError}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" class="w-100 mb-3 btn" variant="outline-primary">Войти</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
// END
};

export default LoginPage;
