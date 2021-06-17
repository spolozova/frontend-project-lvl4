// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlicer';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';
import { validate } from '../../validation/validationScheme.js';

const AddChannelModal = () => {
  const { channelsInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef();
  const [sendingStatus, setSendingStatus] = useState({ isSending: false, error: null });
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const withTimeout = (onSuccess, onTimeout, timeout) => {
    // eslint-disable-next-line functional/no-let
    let called = false;

    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);

    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      // eslint-disable-next-line functional/no-this-expression
      onSuccess.apply(this, args);
    };
  };

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
        return;
      }
      socket.volatile.emit('newChannel', values, withTimeout(({ data }) => {
        setSendingStatus({ isSending: false, error: null });
        dispatch(setCurrentChannel({ id: data.id }));
        dispatch(closeModal());
      }, () => {
        setSendingStatus({ isSending: false, error: t('authErrors.unspecific') });
        inputRef.current.focus();
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
              <Button
                type="submit"
                disabled={isSending}
                variant="primary"
              >
                {t('buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
