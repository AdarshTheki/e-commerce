import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

type PrivateRouteProp = {
  isAuth: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProp> = ({ isAuth }) => {
  if (
    isAuth &&
    (window.location.pathname === '/login' || window.location.pathname === '/register')
  ) {
    return <Navigate to='/' />;
  }

  return isAuth ? <Layout /> : <Navigate to='/login' />;
};

export default PrivateRoute;
