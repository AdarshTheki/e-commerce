import instance from "../helper/axiosInstance";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import errorHandler from "../helper/errorHandler";

const CartListing = ({ productId, quantity, refetch }) => {
  const { _id, thumbnail, title, price, category, brand } = productId;

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/cart/${id}`);
      if (res.data) {
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex items-start border-b border-gray-300 py-4">
      <NavLink to={`/product/${_id}`} className="bg-gray-300">
        <img
          src={thumbnail || "https://placehold.co/120x120"}
          alt="Product"
          className="sm:w-32 sm:h-32 h-24 w-24 object-cover rounded transition-opacity duration-300 opacity-100"
          loading="lazy"
        />
      </NavLink>
      <div className="flex-1 ml-6 relative">
        <h3 className="font-semibold">{title || "Smartphone X Pro"}</h3>
        <p className="capitalize">
          {category}
          {brand && (
            <span className="py-1 px-2 rounded-xl ml-2 bg-gray-200 text-xs">
              {brand}
            </span>
          )}
        </p>
        <div className="flex items-center my-1">
          <span className="text-sm text-gray-600">Unit Price:</span>
          <span className="ml-2 font-semibold">
            ${price || 79.99} x {quantity}
          </span>
        </div>
        <button
          onClick={() => handleDelete(_id)}
          className="text-gray-400 absolute top-6 sm:right-5 right-1 cursor-pointer hover:text-red-600">
          <X />
        </button>
        <h3>
          Totals: <span className="font-bold">${price * quantity}</span>
        </h3>
      </div>
    </div>
  );
};

export default CartListing;
