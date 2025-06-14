import Label from "./Label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { id: string; title: string }[];
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = (
  {
    label,
    name,
    options,
    className = "block  w-full text-base px-4 py-2 ",
    ...rest
  },
  props
) => {
  return (
    <div {...props}>
      {label && <Label text={label} htmlFor={name} />}
      <select
        {...rest}
        id={name}
        name={name}
        className={`cursor-pointer capitalize border bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}>
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
