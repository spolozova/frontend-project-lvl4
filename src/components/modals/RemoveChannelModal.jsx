// @ts-check;

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocketApi } from '../../hooks';
import { setCurrentChannel } from '../../slices/channelsSlicer';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { extra } = useSelector((state) => state.modal);
  const { removeChannel } = useSocketApi();
  const [isSending, setSendingStatus] = useState(false);
  const { t } = useTranslation();

  const onSuccess = ({ data }) => {
    setSendingStatus(false);
    dispatch(setCurrentChannel({ id: data.id }));
    dispatch(closeModal());
  };

  const onTimeout = () => setSendingStatus(false);

  const handleRemove = () => {
    setSendingStatus(true);
    removeChannel({ id: extra.channelId }, onSuccess, onTimeout);
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
