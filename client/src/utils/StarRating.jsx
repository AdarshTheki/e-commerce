import { Star } from "lucide-react";

const StarRating = ({ rating, size = 14, totalStars = 5, className = "" }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: totalStars }, (_, index) => {
        const filled = index < rating;
        return filled ? (
          <Star
            size={size}
            key={index}
            className="text-yellow-400"
            fill="currentColor"
          />
        ) : (
          <Star size={16} key={index} className="text-gray-300" />
        );
      })}
    </div>
  );
};

export default StarRating;
