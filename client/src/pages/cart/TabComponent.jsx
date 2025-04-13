import React from "react";
import { useSelector } from "react-redux";

const Tabs = ({ tabs, totals, items }) => {
  const { steps, shippingMethod, payment } = useSelector(
    (state) => state.checkout
  );

  return (
    <div className="w-full flex gap-5">
      <div className="space-y-4 w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({items.length || 0} items)
          </span>
          <span className="font-semibold">${totals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment</span>
          <span className="font-semibold">{payment || "COD"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">
            {shippingMethod ? `$ ${shippingMethod}` : "Free"}
          </span>
        </div>

        {/* <!-- Total --> */}
        <div className="border-t pt-2 border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">
              $
              {totals > 1
                ? parseInt(
                    shippingMethod ? totals + shippingMethod : totals
                  ).toFixed(2)
                : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:flex-3/2 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {tabs[steps]?.content}
      </div>
    </div>
  );
};

export default Tabs;
