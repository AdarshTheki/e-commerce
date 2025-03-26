import React from "react";
import { useSelector } from "react-redux";
import * as SVG from "../../utils/Svgs";

const Tabs = ({ tabs, totals, items }) => {
  const { steps, shippingMethod, payment } = useSelector(
    (state) => state.checkout
  );

  console.log(shippingMethod, payment);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3 sm:p-6 p-3 space-y-6 bg-white shadow-lg rounded-lg">
        {tabs[steps]?.content}
      </div>

      {/* <!-- Order Summary --> */}
      <div className="lg:w-1/3">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal ({items.length || 0} items)
              </span>
              <span className="font-semibold">${totals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{payment || "COD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">
                {shippingMethod ? `$ ${shippingMethod}` : "Free"}
              </span>
            </div>

            {/* <!-- Total --> */}
            <div className="border-t pt-4">
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
        </div>

        {/* <!-- Accepted Payment Methods --> */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Accepted Payment Methods</h3>
          <div className="flex space-x-4">
            <SVG.AmexCard />
            <SVG.MasterCard />
            <SVG.PaypalCard />
            <SVG.VistaCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
