import React from "react";

const Label = ({ text, htmlFor, optionals }, props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm capitalize my-1`}
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
