// @ts-check
import React, { useEffect } from 'react';
import {
  Col,
  Nav,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlicer.js';
import { openModal } from '../slices/modalSlicer.js';
import { useSocket } from '../hooks/index.jsx';

const Channels = () => {
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel({ channel }));
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel({ id }));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, socket]);

  const renderChannelsList = (channel) => {
    const { id, name, removable } = channel;
    const variant = currentChannelId === id ? 'secondary' : 'light';
    const channelButton = (
      <Button
        type="button"
        variant={variant}
        className="w-100 px-4 rounded-0 text-start"
        onClick={() => dispatch(setCurrentChannel({ id }))}
      >
        <span className="me-3">#  </span>
        {name}
      </Button>
    );

    if (removable) {
      return (
        <Nav.Item key={id} as="li">
          <Dropdown className="d-flex" as={ButtonGroup}>
            {channelButton}
            <Dropdown.Toggle split variant={variant} className="flex-grow-0" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => dispatch(openModal({ type: 'removeChannel', channelId: id }))}
              >
                Удалить
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => dispatch(openModal({ type: 'renameChannel', channelId: id }))}
              >
                Переименовать
              </Dropdown.Item>
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
    <Col className="col-2 px-0 pt-5 border-end bg-light overflow-hidden">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(openModal({ type: 'addChannel' }))}>
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
