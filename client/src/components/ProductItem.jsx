import React from "react";
import HeartFavorite from "./HeartFavorite";
import { NavLink } from "react-router-dom";
import { LazyImage } from "../utils";
import { Star } from "lucide-react";
import { classNames, getRandomTailwindColorWithHex } from "../helper";

const ProductItem = ({ ...item }) => {
  let color = getRandomTailwindColorWithHex("dark");

  return (
    <div className={`group card w-full max-sm:grid gap-2 grid-cols-2`}>
      <div className="relative sm:min-h-[200px]">
        <NavLink to={`/product/${item._id}`}>
          <LazyImage
            src={item.thumbnail}
            fallback={`https://placehold.co/200x150/eeee/${color.hex.replace("#", "")}?text=${item.title.substring(0, 10)}`}
            alt="Product"
            className="w-full object-contain aspect-[1/0.8] transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
        </NavLink>
        <div className="absolute top-2 right-1 space-y-2">
          <HeartFavorite id={item._id} />
        </div>
        <div className="absolute top-2 left-1">
          <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
            {item.discount}%
          </span>
        </div>
      </div>
      <div className="capitalize p-2">
        <h3
          style={{ color: color.hex }}
          className={classNames(
            "font-medium max-sm:text-xl line-clamp-2 mb-3"
          )}>
          {item.title}
        </h3>
        <p className="flex mt-4 justify-between">
          <span className="text-xl">${item.price}</span>{" "}
          <span className="flex gap-1 items-center">
            {item.rating} <Star className="text-yellow-400" size={18} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
