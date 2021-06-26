// @ts-check
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Messages from './Messages.jsx';
import Channels from './Channels.jsx';
import { fetchChannels } from '../slices/channelsSlicer.js';
import routes from '../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const ChatPage = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    setIsDataLoaded(false);
    const fetchContent = async () => {
      const url = routes.dataPath();
      const token = getAuthHeader();
      const { data } = await axios.get(url, { headers: token });
      dispatch(fetchChannels(data));
      setIsDataLoaded(true);
    };
    fetchContent();
  }, [dispatch]);

  if (isDataLoaded) {
    return (
      <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Channels />
          <Messages />
        </Row>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('chatPage.loading')}</span>
      </Spinner>
    </div>
  );
};

export default ChatPage;
