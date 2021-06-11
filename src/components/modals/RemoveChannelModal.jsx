// @ts-check;

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { extra } = useSelector((state) => state.modal);
  const socket = useSocket();
  const [isSending, setSendingStatus] = useState(false);

  const withTimeout = (onSuccess, onTimeout, timeout) => {
    let called = false;

    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);

    return () => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      onSuccess.apply(this);
    };
  };

  const handleRemove = () => {
    setSendingStatus(true);
    socket.volatile.emit('removeChannel', { id: extra.channelId }, withTimeout(() => {
      setSendingStatus(false);
      dispatch(closeModal());
    }, () => {
      setSendingStatus(false);
    }, 1000));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          type="button"
          className="me-2"
          variant="secondary"
          onClick={() => dispatch(closeModal())}
          disabled={isSending}
        >
          Отменить
        </Button>
        <Button
          type="button"
          variant="danger"
          disabled={isSending}
          onClick={handleRemove}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
