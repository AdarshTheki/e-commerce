import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className = '', ...rest }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-800 capitalize my-1 ${className}`}
      {...rest}>
      {text}
    </label>
  );
};

export default Label;
