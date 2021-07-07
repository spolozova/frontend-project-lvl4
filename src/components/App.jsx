import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ModalComponent from './modals/index.jsx';
import SignupPage from './SignupPage.jsx';
import NavBar from './NavBar.jsx';
import { AuthContext } from '../contexts';
import { useAuth } from '../hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.userData);
  const logIn = (data) => {
    localStorage.setItem('userData', data);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };
  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const { loggedIn } = useAuth(AuthContext);
  return (
    <Route
      path={path}
      render={() => (loggedIn
        ? children
        : <Redirect to="/login" />)}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <ChatRoute exact path="/">
            <ChatPage />
          </ChatRoute>
          <Route path="">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
    <ModalComponent />
  </AuthProvider>
);

export default App;
