import React from "react";
import { NavLink } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <h1>Order Placed Successfully 🎉</h1>
        <p className="mb-10">Thank you for your order!</p>
        <NavLink
          to="/product"
          className="border p-2 text-blue-600 border-blue-500 rounded-lg">
          Back to Products
        </NavLink>
      </div>
    </div>
  );
};

export default OrderSuccess;
