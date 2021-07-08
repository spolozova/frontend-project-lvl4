import React, { useState } from 'react';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState(localStorage.userData);
  const logIn = (data) => {
    localStorage.setItem('userData', data);
    setuserData(data);
  };
  const logOut = () => {
    localStorage.removeItem('userData');
    setuserData(null);
  };
  const getAuthHeader = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token) {
      return { Authorization: `Bearer ${data.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      userData,
      logIn,
      logOut,
      getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
