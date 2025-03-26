import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSteps, setShippingMethod } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";

const items = [
  { title: "standard shipping", time: "4-5 business days", type: 0 },
  { title: "express shipping", time: "2-3 business days", type: 4.99 },
  {
    title: "Today shipping",
    time: "4 hours - 6 hours business days",
    type: 9.99,
  },
];

const ShippingMethod = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(null);

  const handleMethod = () => {
    if (select) {
      dispatch(setShippingMethod(select));
      dispatch(setSteps(3));
    } else {
      toast.error("Please Select Shipping Method");
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium">Shipping Method</h2>
      {/* Shipping Method Listing */}
      {items.map((method) => (
        <div
          onClick={() => setSelect(method.type)}
          key={method.type}
          className={`flex justify-between cursor-pointer items-center p-4 border  rounded-lg ${
            select === method.type
              ? "border-blue-600 bg-blue-100"
              : "border-gray-200"
          }`}>
          <div>
            <h4 className="font-medium capitalize">{method.title}</h4>
            <p>{method.time}</p>
          </div>
          <h2 className="font-medium">
            {method.type ? `$ ${method.type}` : "Free"}
          </h2>
        </div>
      ))}

      <div className="flex gap-5 w-[250px] font-semibold">
        <button
          className="w-full border py-2 !border-red-600 text-red-500"
          onClick={() => dispatch(setSteps(1))}>
          Go Back
        </button>
        <button
          className="w-full py-2 text-white bg-indigo-600"
          onClick={handleMethod}>
          Save Next
        </button>
      </div>
    </>
  );
};

export default ShippingMethod;
