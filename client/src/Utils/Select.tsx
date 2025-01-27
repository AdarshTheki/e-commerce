import Label from './Label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { title: string; _id: string }[];
  label?: string;
  className?: string;
  data?: {
    _id: string;
    title: string;
  };
}

const Select: React.FC<SelectProps> = ({ label, name, options, className = '', data, ...rest }) => {
  return (
    <div className=''>
      {label && <Label text={label} htmlFor={name} />}
      <select
        id={name}
        name={name}
        className={`block cursor-pointer w-full sm:text-base text-sm px-4 sm:py-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}>
        {data?._id && <option value={data?._id}>{data?.title}</option>}
        {!!data?._id && <option value={''}>All {name}</option>}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.title?.substring(0, 20)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
