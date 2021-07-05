// @ts-check;

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlicer';
import { closeModal } from '../../slices/modalSlicer.js';
import { useSocket } from '../../hooks';
import { validate } from '../../validation/validationScheme.js';

const AddChannelModal = () => {
  const { channelsInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { addChannel } = useSocket();
  const addChannelRef = useRef();
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      setError(null);
      const channelsNames = channelsInfo.channels.map((c) => c.name);
      const validError = validate('updateChannel', values, channelsNames);
      if (validError) {
        setError(t(`validationErrors.${validError}`));
        addChannelRef.current.focus();
        return;
      }

      const onSuccess = ({ data }) => {
        setError(null);
        dispatch(setCurrentChannel({ id: data.id }));
        dispatch(closeModal());
      };

      const onTimeout = () => {
        setError(t('authErrors.unspecific'));
        addChannelRef.current.focus();
      };

      await addChannel(values, onSuccess, onTimeout);
    },
  });

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
              ref={addChannelRef}
              className="mb-2"
              name="name"
              data-testid="add-channel"
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
              <Button
                type="submit"
                disabled={formik.isSubmitting}
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
