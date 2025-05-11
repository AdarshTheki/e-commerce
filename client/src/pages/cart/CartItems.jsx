import React from "react";
import instance from "../../helper/axiosInstance";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSteps } from "../../redux/checkoutSlice";

const CartItems = ({ items, getAllCarts }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/cart/${id}`);
      if (res.data) {
        getAllCarts();
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] gap-5">
        <h2>Empty cart items</h2>
        <NavLink to="/product" className="btn border text-indigo-600">
          Go to Products
        </NavLink>
      </div>
    );
  }

  return (
    <>
      {items?.map((item) => {
        const { _id, thumbnail, title, price, category, brand } =
          item.productId;
        return (
          <div key={item._id} className="border-b border-gray-300 py-4">
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
          className="text-red-600 btn text-nowrap border">
          Go Product
        </NavLink>
        <button
          type="submit"
          className="bg-indigo-600 text-white btn"
          onClick={() => dispatch(setSteps(1))}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartItems;
