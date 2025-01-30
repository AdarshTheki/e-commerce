import React, { TextareaHTMLAttributes } from 'react';
import Label from './Label';

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  text?: string;
  className?: string;
  maxChar?: number;
  optionals?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  className = '',
  maxChar = 50,
  optionals,
  ...props
}) => {
  return (
    <div>
      <Label text={label} htmlFor={name} optionals={optionals} />
      <textarea
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...props}
      />
      {maxChar && (
        <p className='text-xs text-gray-500 text-right'>
          Character from {props.value?.toString()?.length} to {maxChar}
        </p>
      )}
    </div>
  );
};

export default CustomTextarea;
