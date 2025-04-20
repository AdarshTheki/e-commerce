import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const StarSelected = ({
  totalStars = 5,
  defaultRating = 0,
  onChange = () => {},
  className = "",
}) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(defaultRating);
  }, [defaultRating]);

  const handleClick = (index) => {
    setSelected(index + 1);
    onChange?.(index + 1);
  };

  return (
    <div className={`flex gap-1 cursor-pointer ${className}`}>
      {Array.from({ length: totalStars }, (_, index) => {
        const isActive = (hovered ?? selected) > index;

        return (
          <Star
            size={26}
            key={index}
            onMouseEnter={() => setHovered(index + 1)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(index)}
            className={`transition-all ${
              isActive ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={isActive ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
};

export default StarSelected;
