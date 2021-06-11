// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks/index.jsx';

const validate = (values, names) => {
  const validationSchema = yup.object({
    name: yup.string().trim().required().min(3)
      .max(20)
      .notOneOf(names),
  });
  try {
    validationSchema.validateSync(values);
    return null;
  } catch (e) {
    return e.message;
  }
};

const RemoveChannelModal = () => {
  const { channelsInfo, modal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef();
  const [sendingStatus, setSendingStatus] = useState({ isSending: false, errors: null });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

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
        inputRef.current.select();
        return;
      }
      const data = { name: values.name, id: modal.extra.channelId };
      socket.volatile.emit('renameChannel', data, withTimeout(() => {
        setSendingStatus({ isSending: false, errors: null });
        dispatch(closeModal());
      }, () => {
        setSendingStatus({ isSending: false, errors: 'ошибка сети' });
        inputRef.current.focus();
        inputRef.current.select();
      }, 1000));
    },
  });

  const { isSending, errors } = sendingStatus;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить канал
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
                Отменить
              </Button>
              <Button type="submit" disabled={isSending} variant="primary">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
