import Label from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, name, error, className = '', ...rest }) => {
  return (
    <div className='pb-2'>
      {label && <Label text={label} htmlFor={name} />}
      <input
        id={name}
        name={name}
        className={`peer block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}
      />
      {error && (
        <p className='invisible peer-invalid:visible pl-2 py-1 text-red-600 text-xs'>
          Please provide a valid &quot;{name}&quot;
        </p>
      )}
    </div>
  );
};

export default Input;
