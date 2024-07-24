import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticate, setAuthenticate, userName, children }) => {
  return authenticate === true ? children : <Navigate to="/login" />
};

export default PrivateRoute