// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';
import { validate } from '../../validation/validationScheme.js';
import withTimeout from '../../utils.js';

const RemoveChannelModal = () => {
  const { channelsInfo, modal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef();
  const [sendingStatus, setSendingStatus] = useState({ isSending: false, error: null });
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      setSendingStatus({ isSending: true, error: null });
      const channelsNames = channelsInfo.channels.map((c) => c.name);
      const validError = validate('updateChannel', values, channelsNames);
      if (validError) {
        setSendingStatus({ isSending: false, error: t(`validationErrors.${validError}`) });
        inputRef.current.focus();
        inputRef.current.select();
        return;
      }
      const data = { name: values.name, id: modal.extra.channelId };
      socket.volatile.emit('renameChannel', data, withTimeout(() => {
        setSendingStatus({ isSending: false, error: null });
        dispatch(closeModal());
      }, () => {
        setSendingStatus({ isSending: false, error: t('authErrors.unspecific') });
        inputRef.current.focus();
        inputRef.current.select();
      }, 1000));
    },
  });

  const { isSending, error } = sendingStatus;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.addHeader')}
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              className="mb-2"
              name="name"
              data-testid="add-channel"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={error}
              required
              disabled={isSending}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2"
                variant="secondary"
                disabled={isSending}
                onClick={() => dispatch(closeModal())}
              >
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" disabled={isSending} variant="primary">{t('buttons.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
