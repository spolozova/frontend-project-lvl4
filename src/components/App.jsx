import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import io from 'socket.io-client';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ModalComponent from './modals/index.jsx';
import SignupPage from './SignupPage.jsx';
import { SocketContext, AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';

const socket = io({ autoConnect: false });

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    socket.disconnect();
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
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
  const auth = useContext(AuthContext);
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
            <div className="container">
              <Navbar.Brand as={Link} className="d-flex align-items-center" to="/">Hexlet-Chat</Navbar.Brand>
              <AuthButton />
            </div>
          </Navbar>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <ChatRoute path="/">
              <ChatPage />
            </ChatRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ModalComponent />
    </SocketContext.Provider>
  </AuthProvider>
);

export default App;
