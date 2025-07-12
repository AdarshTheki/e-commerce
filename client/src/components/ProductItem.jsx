import React from "react";
import HeartFavorite from "./HeartFavorite";
import { NavLink } from "react-router-dom";
import { LazyImage } from "../utils";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { axios, errorHandler } from "../helper";
import { toast } from "react-toastify";

export default function Item({ delay = "100ms", ...item }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const types = [
    { name: "bestseller", bg: "bg-green-100", text: "text-green-800" },
    { name: "new", bg: "bg-pink-100", text: "text-pink-800" },
    { name: "popular", bg: "bg-blue-100", text: "text-blue-800" },
    { name: "limited", bg: "bg-indigo-100", text: "text-indigo-800" },
    { name: "sale", bg: "bg-red-100", text: "text-red-800" },
  ];

  const handleAddToCart = async (productId) => {
    try {
      if (!user?._id) return toast.error("Un-Authorized User");
      const res = await axios.post(`/cart`, { productId, quantity: 1 });
      if (res.data) {
        toast.success("Add to cart success");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const randomType = types[Math.floor(Math.random() * types.length)];

  return (
    <div
      className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 group animate-fadeIn"
      style={{ animationDelay: delay }}>
      <div className="relative overflow-hidden rounded-t-lg">
        <NavLink to={`/product/${item._id}`}>
          <LazyImage
            src={item.thumbnail}
            fallback={"/placeholder.jpg"}
            alt={item.title}
            className="w-full h-[200px] object-cover transform group-hover:scale-105 transition duration-500"
          />
        </NavLink>
        <HeartFavorite
          id={item._id}
          className="absolute top-2 right-2 p-1.5 bg-white/80"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${randomType.bg} ${randomType.text} capitalize`}>
            {randomType.name}
          </span>
          <div className="ml-auto flex items-center text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="ml-1 text-sm text-gray-600">{item?.rating}</span>
          </div>
        </div>
        <p className="text-lg font-medium line-clamp-1">{item.title}</p>
        <p className="text-gray-600 text-sm mb-3 flex gap-2 justify-between capitalize">
          <span>{item.category && "#" + item.category}</span>
          <span>{item.brand && "#" + item.brand}</span>
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${item.price}</span>
          <button
            onClick={() => {
              dispatch(addItem(item));
              handleAddToCart(item._id);
            }}
            className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300 flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
