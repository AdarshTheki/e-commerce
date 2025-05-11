import Label from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  optionals?: string;
}

const Input: React.FC<InputProps> = (
  { label, name, error, className = "", optionals, ...rest },
  props
) => {
  return (
    <div className="flex-1" {...props}>
      {label && <Label text={label} htmlFor={name} optionals={optionals} />}
      <input
        id={name}
        name={name}
        className={`block w-full px-4 py-2 text-base peer border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
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
