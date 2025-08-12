import React from 'react';

const Button = ({ svg = '', name = '', className = '', ...prop }) => {
  return (
    <button
      {...prop}
      className={`flex items-center gap-2.5 border rounded-lg px-4 py-2 text-sm active:scale-95 hover:opacity-90 transition ${className}`}>
      {!!svg && svg}
      {!!name && name}
    </button>
  );
};

export default Button;
