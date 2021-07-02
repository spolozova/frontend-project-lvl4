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
import { AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.userId);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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
