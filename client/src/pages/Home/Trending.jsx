import React from "react";
import { useSelector } from "react-redux";
import { ProductItem } from "../../components";
import { NavLink } from "react-router-dom";

const Trending = ({ heading = "Trending Products", size = 8 }) => {
  const { items } = useSelector((s) => s.product);

  // Shuffle items array and pick a random subset (e.g., 8 items)
  const shuffledItems = React.useMemo(() => {
    if (!items) return [];
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, size);
  }, [items, size]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl md:text-2xl font-semibold">{heading}</p>
        <NavLink
          to="/product"
          className="text-indigo-600 hover:text-indigo-800 flex items-center transition duration-300">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shuffledItems.map((item, i) => (
          <ProductItem key={item._id} {...item} delay={i + 1 + "00ms"} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
