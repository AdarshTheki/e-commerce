import React from "react";
import HeartFavorite from "./HeartFavorite";
import { NavLink } from "react-router-dom";

const ProductItem = ({ ...item }) => {
  return (
    <div key={item._id} className={`bg-white overflow-hidden group`}>
      <div className="relative min-h-[200px] bg-black/20">
        <NavLink to={`/product/${item._id}`}>
          <img
            src={
              item.thumbnail || item.images[0] || "https://placehold.co/200x140"
            }
            alt="Product"
            className="w-full max-h-[200px] object-contain transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
        </NavLink>
        <div className="absolute top-2 right-2 space-y-2">
          <HeartFavorite id={item._id} />
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
            {item.discount}%
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2 capitalize">
        <p className="space-x-3">
          <span className="text-gray-600 text-sm">{item.brand}</span>
          <span className="bg-gray-200 px-3 text-xs rounded-2xl py-1 w-fit">
            {item.category}
          </span>
        </p>
        <h3 className="font-semibold mb-2 text-gray-700 line-clamp-2">
          {item.title}
        </h3>

        <p className="flex justify-between">
          <span className="text-gray-600 text-xl">${item.price}</span>{" "}
          <span>
            {item.rating} <span className="text-xl text-yellow-400">★</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
