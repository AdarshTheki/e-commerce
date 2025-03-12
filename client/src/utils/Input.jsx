import Label from "./Label";

const Input = (
  {
    label = "",
    name = "",
    error = "",
    className = "block w-full px-4 py-2 text-base",
    optionals,
    ...rest
  },
  props
) => {
  return (
    <div className="flex-1" {...props}>
      {label && <Label text={label} htmlFor={name} optionals={optionals} />}
      <input
        id={name}
        name={name}
        className={`peer border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}
      />
      {error && (
        <p className="invisible peer-invalid:visible pl-2 py-1 text-red-600 text-xs">
          Please provide a valid &quot;{name}&quot;
        </p>
      )}
    </div>
  );
};

export default Input;
