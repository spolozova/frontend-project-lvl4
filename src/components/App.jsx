import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={() => (auth.loggedIn
        ? children
        : <Redirect to="/login" />)}
    />
  );
};

const AuthButton = () => {
  const auth = useContext(authContext);

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <AuthButton />
        </Navbar>

        <Switch>
          <ChatRoute path="/">
            <ChatPage />
          </ChatRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
