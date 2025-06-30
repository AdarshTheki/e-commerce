import { NavLink } from "react-router-dom";
import { Trash2Icon } from "lucide-react";
import { errorHandler, axios } from "../helper";
import { useState } from "react";

const CartListing = ({ productId, quantity, onRemove, onQtyChange }) => {
  const { _id, thumbnail, title, price, category, brand } = productId;
  const [qty, setQty] = useState(quantity);

  const handleDelete = async () => {
    try {
      if (!_id) return;
      const res = await axios.delete(`/cart/${_id}`);
      if (res.data) {
        onRemove();
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleUpdateQty = async () => {
    try {
      if (!_id || !qty) return;
      const res = await axios.put(`/cart`, {
        productId: _id,
        quantity: qty,
      });
      if (res.data) {
        onQtyChange(qty);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex max-sm:flex-col gap-5 items-start border-b text-slate-700 border-gray-300 py-4">
      <NavLink to={`/product/${_id}`} className="bg-gray-300 max-sm:w-full">
        <img
          src={thumbnail || "https://placehold.co/120x120"}
          alt="Product"
          className="w-[200px] mx-auto object-cover rounded transition-opacity duration-300 opacity-100"
          loading="lazy"
        />
      </NavLink>
      <div className="sm:flex-1 max-sm:px-4 w-full space-y-2 capitalize">
        <h3 className="font-medium text-lg">{title || "Smartphone X Pro"}</h3>
        <p>Category : {category || "other"}</p>
        <p>Brand: {brand || "other"}</p>
        <div className="flex items-center my-1">
          <span>Unit Price:</span>
          <span className="ml-2 font-semibold">
            ${price || 79.99} x {qty}
          </span>
        </div>
        <h3>
          Totals: <span className="font-bold">${price * qty}</span>
        </h3>
        <div className="flex gap-5 items-center mt-3">
          <div className="py-1 gap-6 flex items-center justify-center px-6 border border-slate-300 rounded-full w-fit font-medium">
            <button
              className="text-center text-xl"
              onClick={() => {
                if (qty !== 1) setQty((prev) => prev - 1);
              }}>
              -
            </button>
            <button className="text-center">{qty}</button>
            <button
              className="text-center text-xl"
              onClick={() => {
                if (qty < 5) setQty((prev) => prev + 1);
              }}>
              +
            </button>
            {quantity !== qty && <button onClick={handleUpdateQty}>Set</button>}
          </div>
          <button onClick={handleDelete} className="text-red-600 svg-btn !p-2">
            <Trash2Icon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartListing;
