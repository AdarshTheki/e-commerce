import React from 'react';
import { NavLink } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div>
        <NavLink to={'/admin'}>Home</NavLink>
      </div>
    </div>
  );
};

export default Notfound;
