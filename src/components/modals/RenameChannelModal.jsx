// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocketApi } from '../../hooks';
import { validate } from '../../validation/validationScheme.js';

const RemoveChannelModal = () => {
  const { channelsInfo, modal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { renameChannel } = useSocketApi();
  const inputRef = useRef();
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: modal.extra.name,
    },
    onSubmit: (values) => {
      setError(null);
      const channelsNames = channelsInfo.channels.map((c) => c.name);
      const validError = validate('updateChannel', values, channelsNames);
      if (validError) {
        setError(t(`validationErrors.${validError}`));
        inputRef.current.focus();
        inputRef.current.select();
        return;
      }
      const data = { name: values.name, id: modal.extra.channelId };
      const onSuccess = () => {
        setError(null);
        dispatch(closeModal());
      };

      const onTimeout = () => {
        setError(t('authErrors.unspecific'));
        inputRef.current.focus();
        inputRef.current.select();
      };

      renameChannel(data, onSuccess, onTimeout);
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.renameHeader')}
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              className="mb-2"
              name="name"
              data-testid="rename-channel"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={error}
              required
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2"
                variant="secondary"
                disabled={formik.isSubmitting}
                onClick={() => dispatch(closeModal())}
              >
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" disabled={formik.isSubmitting} variant="primary">{t('buttons.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
