import Label from './Label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: [{ id: string; title: string }];
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ label, name, options, className = '', ...rest }) => {
  return (
    <div>
      {label && <Label text={label} htmlFor={name} />}
      <select
        id={name}
        name={name}
        className={`block cursor-pointer w-full text-base px-4 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
