import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  className?: string;
  optionals?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className = '', optionals, ...rest }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium capitalize my-1 ${className}`}
      {...rest}>
      {text}
      {optionals && (
        <span className='text-xs pl-1 lowercase font-light text-gray-500'>{optionals}</span>
      )}
    </label>
  );
};

export default Label;
