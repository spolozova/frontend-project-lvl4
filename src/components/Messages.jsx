// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSocketApi, useAuth } from '../hooks';
import { validate } from '../validation/validationScheme.js';

const getMessagesList = (messages, currentId) => messages
  .filter(({ channelId }) => channelId === currentId)
  .map(({ username, body, id }) => (
    <div key={id} className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  ));

const Messages = () => {
  // @ts-ignore
  const { messages } = useSelector((state) => state.messagesInfo);
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { isOpened } = useSelector((state) => state.modal);
  const currentChannel = channels.length === 0 ? null : _.find(channels, ['id', currentChannelId]);
  const messageInputRef = useRef(null);
  const messagesListRef = useRef(null);
  const { sendNewMessage } = useSocketApi();
  const { userData } = useAuth();
  const { username } = JSON.parse(userData);
  const { t } = useTranslation();
  const currentMessagesList = getMessagesList(messages, currentChannelId);

  useEffect(() => {
    if (messages.length !== 0) {
      const scroll = messagesListRef.current.scrollHeight - messagesListRef.current.clientHeight;
      messagesListRef.current?.scrollTo?.(0, scroll);
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpened) {
      messageInputRef.current.focus();
    }
  }, [isOpened, currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: async ({ body }) => {
      const validError = validate('message', body);
      if (validError) {
        messageInputRef.current.focus();
        return;
      }
      const outgoingMessage = {
        body,
        channelId: currentChannelId,
        username,
      };

      const onSuccess = () => {
        formik.resetForm();
        messageInputRef.current.focus();
      };

      const onTimeout = () => {
        messageInputRef.current.focus();
      };
      await sendNewMessage(outgoingMessage, onSuccess, onTimeout);
    },
  });

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel && currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {currentMessagesList && t('chatPage.messagesCounter', { count: currentMessagesList.length })}
          </span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5" ref={messagesListRef}>
          {currentMessagesList}
        </div>
        <div className="mt-auto py-3 px-5">
          <Form className="py-1 border rounded-2" autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <InputGroup>
              <FormControl
                autoComplete="off"
                required
                ref={messageInputRef}
                name="body"
                data-testid="new-message"
                placeholder={t('chatPage.messageField')}
                className="border-0"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              <div className="input-group-append">
                <Button variant="group-vertical" type="submit" name="Отправить" disabled={formik.isSubmitting}>
                  <ArrowRightSquare width="30" height="30" />
                  <span className="visually-hidden">{t('buttons.send')}</span>
                </Button>
              </div>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
