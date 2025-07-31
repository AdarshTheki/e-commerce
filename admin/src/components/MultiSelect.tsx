import { Check } from 'lucide-react';
import React from 'react';

type SelectProp = {
  onSelected: (v: string) => void;
  selected: string;
  list?: string[];
  listOption?: { value: string; label: string }[];
  label?: string;
  className?: string;
};

const Select: React.FC<SelectProp> = ({
  list = [],
  listOption,
  onSelected,
  selected,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (item: string) => {
    onSelected(item);
    setIsOpen(false);
  };

  return (
    <div className="relative text-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2.5 text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
        <span className="text-nowrap capitalize">{label || selected}</span>
        <svg
          className={`w-4 h-4 inline float-right transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <ul
          className={`top-10 absolute max-h-[300px] overflow-y-auto z-30 bg-white border border-gray-300 w-full rounded shadow-md mt-1 py-2 ${className}`}>
          {list?.length
            ? list.map((country) => (
                <li
                  key={country}
                  className="px-4 capitalize py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex items-center gap-1"
                  onClick={() => handleSelect(country)}>
                  {country === selected ? (
                    <Check size={16} />
                  ) : (
                    <Check size={16} style={{ visibility: 'hidden' }} />
                  )}
                  {country}
                </li>
              ))
            : null}
          {listOption?.length
            ? listOption?.map((li) => (
                <li
                  key={li.value}
                  className="px-4 capitalize py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex items-center gap-1"
                  onClick={() => handleSelect(li.value)}>
                  {li.label === selected ? (
                    <Check size={16} className="text-indigo-600" />
                  ) : (
                    <Check size={16} style={{ visibility: 'hidden' }} />
                  )}
                  {li.label}
                </li>
              ))
            : null}
        </ul>
      )}
    </div>
  );
};

export default Select;
