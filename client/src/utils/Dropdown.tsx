import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  value: string;
  onFetch?: (option: string | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  value = 'Select Option',
  onFetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='px-3 py-1.5 hover:bg-blue-50 border capitalize text-sm rounded-md flex gap-2 items-center'>
        {value} {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className='absolute z-20 left-0 mt-2 w-fit bg-white border rounded-md shadow-lg'>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
                if (onFetch) onFetch(option);
              }}
              className='block text-sm w-full capitalize px-4 py-2 text-left hover:bg-gray-100'>
              {option.split('-').join(' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
