// @ts-check
import React from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import _ from 'lodash';
// import axios from 'axios';
import { useSelector } from 'react-redux';

const getMessagesList = (messages, currentId) => {
  if (messages.length === 0) {
    return null;
  }
  return messages.filter(({ id }) => id === currentId)
    .map(({ username, body, id }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        :
        {body}
      </div>
    ));
};

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesInfo);
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { name } = channels.length === 0 ? null : _.find(channels, ['id', currentChannelId]);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: () => {},
  });

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {name}
            </b>
          </p>
          <span className="text-muted">сообщения</span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          {getMessagesList(messages, currentChannelId)}
        </div>
        <div className="border-top mt-auto py-3 px-5">
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup>
              <FormControl
                name="body"
                data-testid="new-message"
                placeholder="Введите сообщение..."
                className="border-0"
                value={formik.values.body}
                onChange={formik.handleChange}
              />
              <button className="btn btn-group-vertical" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                  <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
