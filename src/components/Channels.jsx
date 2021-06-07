// @ts-check
import React from 'react';
import {
  Col,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

  const renderChannelsList = (channel) => {
    const { id, name, removable } = channel;
    const buttonClasses = {
      btn: true,
      'w-100': true,
      'px-4': true,
      'rounded-0': true,
      'text-start': true,
      'btn-secondary': currentChannelId === id,
    };

    const channelButton = (
      <button type="button" className={cn(buttonClasses)}>
        <span className="me-3">#  </span>
        {name}
      </button>
    );

    if (removable) {
      return (
        <Nav.Item key={id} as="li">
          <Dropdown as={ButtonGroup}>
            {channelButton}
            <Dropdown.Toggle split className="flex-grow-0" />
            <Dropdown.Menu>
              <Dropdown.Item href="#">Удалить</Dropdown.Item>
              <Dropdown.Item href="#">Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item key={id} as="li">
        {channelButton}
      </Nav.Item>
    );
  };
  return (
    <Col className="col-2 px-0 pt-5 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <Nav className="flex-column nav-pills nav-fill" as="ul">
        {channels.map(renderChannelsList)}
      </Nav>
    </Col>
  );
};

export default Channels;
