import React, { useContext } from 'react';
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/index.jsx';

const LanguageButton = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  return (
    <Nav className="mr-auto">
      <NavDropdown title={t(`languages.${lng}`)} id="basic-nav-dropdown">
        <NavDropdown.Item active={false} href="#" onClick={() => i18n.changeLanguage('ru')}>{t('languages.ru')}</NavDropdown.Item>
        <NavDropdown.Item active={false} href="#" onClick={() => i18n.changeLanguage('en')}>{t('languages.en')}</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} className="ms-auto">{t('navBar.logout')}</Button>
      : null
  );
};

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand>
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('navBar.chatName')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <LanguageButton />
          <AuthButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
