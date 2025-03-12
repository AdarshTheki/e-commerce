import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  optionals?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, optionals }, props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium capitalize my-1`}
      {...props}>
      {text}
      {optionals && (
        <span className="text-xs pl-1 lowercase font-light text-gray-500">
          {optionals}
        </span>
      )}
    </label>
  );
};

export default Label;
