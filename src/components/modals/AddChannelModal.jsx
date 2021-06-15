// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlicer';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';

const AddChannelModal = () => {
  const { channelsInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef();
  const [sendingStatus, setSendingStatus] = useState({ isSending: false, errors: null });
  const { t } = useTranslation();

  const validate = (values, names) => {
    const validationSchema = yup.object({
      name: yup.string().trim().required(t('validationErrors.required'))
        .min(3, t('validationErrors.nameLengthError'))
        .max(20, t('validationErrors.nameLengthError'))
        .notOneOf(names, t('validationErrors.uniqueError')),
    });
    try {
      validationSchema.validateSync(values);
      return null;
    } catch (e) {
      return e.message;
    }
  };

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
      setSendingStatus({ isSending: true, errors: null });
      const channelsNames = channelsInfo.channels.map((c) => c.name);
      const error = validate(values, channelsNames);
      if (error) {
        setSendingStatus({ isSending: false, errors: error });
        inputRef.current.focus();
        return;
      }
      socket.volatile.emit('newChannel', values, withTimeout(({ data }) => {
        setSendingStatus({ isSending: false, errors: null });
        dispatch(setCurrentChannel({ id: data.id }));
        dispatch(closeModal());
      }, () => {
        setSendingStatus({ isSending: false, errors: t('networkError') });
        inputRef.current.focus();
      }, 1000));
    },
  });

  const { isSending, errors } = sendingStatus;

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
              isInvalid={errors}
              required
              disabled={isSending}
            />
            <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
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
