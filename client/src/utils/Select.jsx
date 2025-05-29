import React, { useId } from "react";

const Select = React.forwardRef(
  (
    {
      label,
      name,
      options = [{ value: "", label: "" }],
      className = "",
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    return (
      <div>
        {label && (
          <label
            htmlFor={`${reactId}-input`}
            className={`block text-sm capitalize my-1`}>
            {label}
          </label>
        )}
        <select
          id={`${reactId}-input`}
          name={name}
          className={`peer border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 ${className}`}
          ref={ref}
          {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
