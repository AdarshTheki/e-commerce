import { Check } from "lucide-react";
import React from "react";

const Select = ({ list = [], onSelected, selected, label }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (item) => {
    onSelected(item);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-fit px-2 text-sm relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2.5 text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
        <span>{label || selected}</span>
        <svg
          className={`w-4 h-4 inline float-right transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
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
        <div
          className=" fixed inset-0 bg-black/5"
          onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <ul className="w-full top-10 absolute z-30 bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
          {list.map((country) => (
            <li
              key={country}
              className="px-4 capitalize py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex items-center gap-1"
              onClick={() => handleSelect(country)}>
              {country === selected ? (
                <Check size={12} />
              ) : (
                <Check size={12} style={{ visibility: "hidden" }} />
              )}
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
