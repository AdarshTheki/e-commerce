import Label from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, name, className = '', ...rest }) => {
  return (
    <div className=''>
      {label && <Label text={label} htmlFor={name} />}
      <input
        id={name}
        name={name}
        className={`block w-full px-4 sm:py-2 py-1 sm:text-base text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
