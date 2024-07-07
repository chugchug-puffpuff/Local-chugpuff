import React from 'react'
import { Navigate } from 'react-router-dom';
import AIInterviewPage from '../AIInterviewPage/AIInterviewPage';

const PrivateRoute = ({ authenticate, setAuthenticate, userName }) => {
  return authenticate === true ? <AIInterviewPage authenticate={authenticate} setAuthenticate={setAuthenticate} userName={userName} /> : <Navigate to="/login" />
};

export default PrivateRoute