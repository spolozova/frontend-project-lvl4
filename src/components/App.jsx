import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ModalComponent from './modals/index.jsx';
import SignupPage from './SignupPage.jsx';
import NavBar from './NavBar.jsx';
import { useAuth } from '../hooks';
import { AuthContext } from '../contexts';

export const PrivateRoute = ({ children, path }) => {
  const { userData } = useAuth(AuthContext);
  return (
    <Route
      path={path}
      render={() => (userData
        ? children
        : <Redirect to="/login" />)}
    />
  );
};

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <PrivateRoute exact path="/">
          <ChatPage />
        </PrivateRoute>
        <Route path="">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
    <ModalComponent />
  </>
);

export default App;
