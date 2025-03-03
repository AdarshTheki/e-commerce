import React from 'react';

const Loading = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className ? className : 'min-h-screen'}`}>
      <div className='flex space-x-2'>
        <div className='w-3 h-3 bg-indigo-500 rounded-full animate-pulse'></div>
        <div
          className='w-3 h-3 bg-indigo-500 rounded-full animate-pulse'
          style={{ animationDelay: '0.2s' }}></div>
        <div
          className='w-3 h-3 bg-indigo-500 rounded-full animate-pulse'
          style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default Loading;
