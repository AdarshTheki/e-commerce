import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

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

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
