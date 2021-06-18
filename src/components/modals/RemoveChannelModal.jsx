// @ts-check;

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';
import withTimeout from '../../utils.js';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { extra } = useSelector((state) => state.modal);
  const socket = useSocket();
  const [isSending, setSendingStatus] = useState(false);
  const { t } = useTranslation();

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
          {t('modals.removeHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.areYouSure')}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          type="button"
          className="me-2"
          variant="secondary"
          onClick={() => dispatch(closeModal())}
          disabled={isSending}
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          type="button"
          variant="danger"
          disabled={isSending}
          onClick={handleRemove}
        >
          {t('buttons.delete')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
