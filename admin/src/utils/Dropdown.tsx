import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
  name: string;
  position?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  name,
  position = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 cursor-pointer py-1.5 hover:bg-blue-50 border capitalize text-sm rounded-md flex gap-2 items-center">
        {name} {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </span>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 w-fit bg-white border rounded-md shadow-lg ${
            position === "left" ? "left-0" : "right-0"
          }`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
