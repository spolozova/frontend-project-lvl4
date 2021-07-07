// @ts-check
import React from 'react';
import {
  Col,
  Nav,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelsSlicer.js';
import { openModal } from '../slices/modalSlicer.js';

const Channels = () => {
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const renderChannelsList = (channel) => {
    const { id, name, removable } = channel;
    const variant = currentChannelId === id ? 'secondary' : 'light';

    if (removable) {
      return (
        <Nav.Item key={id} as="li">
          <Dropdown className="d-flex" as={ButtonGroup}>
            <Button
              type="button"
              variant={variant}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => dispatch(setCurrentChannel({ id }))}
              style={{
                textOverflow: 'ellipsis',
                maxWidth: '185px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <Dropdown.Toggle split variant={variant} className="flex-grow-0" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item
                active={false}
                href="#"
                onClick={() => dispatch(openModal({ type: 'removeChannel', channelId: id }))}
              >
                {t('buttons.delete')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                active={false}
                onClick={() => dispatch(openModal({ type: 'renameChannel', channelId: id, name }))}
              >
                {t('buttons.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item key={id} as="li">
        <Button
          type="button"
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => dispatch(setCurrentChannel({ id }))}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      </Nav.Item>
    );
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 px-4">
        <span>{t('chatPage.channels')}</span>
        <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={() => dispatch(openModal({ type: 'addChannel' }))}>
          <PlusSquare width="20" height="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="flex-column nav-pills nav-fill" as="ul">
        {channels.map(renderChannelsList)}
      </Nav>
    </Col>
  );
};

export default Channels;
