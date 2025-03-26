import React from "react";
import instance from "../../helper/axiosInstance";
import { toast } from "react-toastify";
import errorHandler from "../../helper/errorHandler";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSteps } from "../../redux/checkoutSlice";

const CartItems = ({ items, getAllCarts }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/api/v1/cart/${id}`);
      if (res.data) {
        getAllCarts();
        toast.success("Delete cart successfully");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <div className="flex justify-between p-6 items-center border-b border-gray-300">
        <h1 className="text-xl font-medium">Shopping Cart</h1>
        <button className="text-gray-600 hover:text-red-600">Clear Cart</button>
      </div>
      {items?.map((item) => {
        const { _id, thumbnail, title, price, category, brand } =
          item.productId;
        return (
          <div key={item._id} className="sm:p-6 p-2 border-b border-gray-300">
            <div className="flex items-start">
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
                    ${price || 79.99} x {item.quantity}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(_id)}
                  className="text-gray-400 absolute top-6 sm:right-5 right-1 cursor-pointer hover:text-red-600">
                  <X />
                </button>
                <h3>
                  Totals:{" "}
                  <span className="font-bold">${price * item.quantity}</span>
                </h3>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex gap-5 w-[250px] font-semibold">
        <NavLink
          to={"/product"}
          className="w-full text-red-600 text-center border py-2">
          Go Product
        </NavLink>
        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600"
          onClick={() => dispatch(setSteps(1))}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartItems;
