import React, { TextareaHTMLAttributes } from 'react';
import Label from './Label';

const CustomTextarea = (
  { name, label, className = 'mt-1 block w-full px-3 py-2', maxChar = 50, optionals, ...rest },
  props
) => {
  return (
    <div {...props}>
      <Label text={label} htmlFor={name} optionals={optionals} />
      <textarea
        className={`border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}
      />
      {maxChar && (
        <p className='text-xs text-gray-500 text-right'>
          Character from {rest.value?.toString()?.length} to {maxChar}
        </p>
      )}
    </div>
  );
};

export default CustomTextarea;
