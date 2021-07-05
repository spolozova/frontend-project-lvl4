// @ts-check

import { useContext } from 'react';

import { AuthContext, SocketApiContext } from '../contexts/index.jsx';

export const useAuth = () => useContext(AuthContext);
export const useSocketApi = () => useContext(SocketApiContext);
