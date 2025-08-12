import React, { useId } from 'react';

const Input = React.forwardRef(
  (
    {
      label = '',
      name = '',
      error = '',
      className = '',
      optional = '',
      ...rest
    },
    ref
  ) => {
    const reactId = useId();

    return (
      <div className="flex-1">
        {label && (
          <label
            htmlFor={`${reactId}-input`}
            className={`block text-sm capitalize my-1`}>
            {label}
            {optional && (
              <span className="text-xs pl-1 lowercase font-light text-gray-500">
                {optional}
              </span>
            )}
          </label>
        )}
        <input
          id={`${reactId}-input`}
          name={name}
          className={`peer border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 ${className}`}
          ref={ref}
          required
          type={rest.type || 'text'}
          {...rest}
        />
        {error && (
          <p className="invisible peer-invalid:visible pl-2 py-1 text-red-600 text-xs">
            Please provide a valid &quot;{name}&quot;
          </p>
        )}
      </div>
    );
  }
);

export default Input;
